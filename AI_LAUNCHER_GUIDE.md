import json
import os
import queue
import subprocess
import sys
import threading
import tkinter as tk
import urllib.request
from pathlib import Path
from tkinter import filedialog, messagebox, scrolledtext

from dotenv import load_dotenv

from ai_worker import PCUWorker


def app_dir():
    if getattr(sys, "frozen", False):
        return Path(sys.executable).resolve().parent
    return Path(__file__).resolve().parent


class Launcher:
    def __init__(self):
        self.root = tk.Tk()
        self.root.title("PCU AI 실행기")
        self.root.geometry("680x500")
        self.root.minsize(620, 430)
        self.root.protocol("WM_DELETE_WINDOW", self.close)
        self.messages = queue.Queue()
        self.worker = None
        self.worker_thread = None
        self.settings_path = app_dir() / "ai_launcher_settings.json"
        load_dotenv(app_dir() / ".env")
        self.settings = self._load_settings()
        self._build()
        self.root.after(100, self._drain_messages)
        self.root.after(300, self._initial_check)

    def _load_settings(self):
        try:
            return json.loads(self.settings_path.read_text(encoding="utf-8"))
        except Exception:
            return {}

    def _save_settings(self):
        self.settings_path.write_text(
            json.dumps(self.settings, ensure_ascii=False, indent=2), encoding="utf-8"
        )

    def _build(self):
        header = tk.Frame(self.root, bg="#0052CC", padx=22, pady=18)
        header.pack(fill="x")
        tk.Label(
            header,
            text="PCU AI 실행기",
            bg="#0052CC",
            fg="white",
            font=("Malgun Gothic", 18, "bold"),
        ).pack(anchor="w")
        tk.Label(
            header,
            text="Firebase 작업을 로컬 Ollama로 처리합니다.",
            bg="#0052CC",
            fg="#DDEBFF",
            font=("Malgun Gothic", 10),
        ).pack(anchor="w")

        body = tk.Frame(self.root, padx=22, pady=16)
        body.pack(fill="both", expand=True)
        status = tk.Frame(body)
        status.pack(fill="x")
        self.ollama_label = tk.Label(status, text="● Ollama 확인 중", fg="#777")
        self.ollama_label.pack(side="left")
        self.worker_label = tk.Label(status, text="● AI 작업 중지", fg="#777")
        self.worker_label.pack(side="right")

        key_frame = tk.LabelFrame(body, text="Firebase 서비스 계정", padx=10, pady=9)
        key_frame.pack(fill="x", pady=(14, 10))
        self.key_var = tk.StringVar(
            value=self.settings.get("serviceAccount", "")
            or os.getenv("FIREBASE_SERVICE_ACCOUNT", "")
        )
        tk.Entry(key_frame, textvariable=self.key_var).pack(side="left", fill="x", expand=True)
        tk.Button(key_frame, text="JSON 선택", command=self.select_key).pack(side="left", padx=(8, 0))

        actions = tk.Frame(body)
        actions.pack(fill="x", pady=(0, 10))
        self.start_button = tk.Button(
            actions,
            text="AI 작업 시작",
            command=self.start,
            bg="#0052CC",
            fg="white",
            activebackground="#003D99",
            activeforeground="white",
            font=("Malgun Gothic", 10, "bold"),
            padx=20,
            pady=7,
        )
        self.start_button.pack(side="left")
        self.stop_button = tk.Button(
            actions, text="중지", command=self.stop, state="disabled", padx=18, pady=7
        )
        self.stop_button.pack(side="left", padx=8)
        tk.Button(actions, text="상태 다시 확인", command=self.check_ollama, pady=7).pack(side="right")

        self.log_box = scrolledtext.ScrolledText(
            body, height=14, state="disabled", font=("Consolas", 9), wrap="word"
        )
        self.log_box.pack(fill="both", expand=True)

    def log(self, text):
        self.messages.put(str(text))

    def _drain_messages(self):
        while True:
            try:
                text = self.messages.get_nowait()
            except queue.Empty:
                break
            self.log_box.configure(state="normal")
            self.log_box.insert("end", text + "\n")
            self.log_box.see("end")
            self.log_box.configure(state="disabled")
        self.root.after(100, self._drain_messages)

    def _initial_check(self):
        self.check_ollama()
        if self.key_var.get() and Path(self.key_var.get()).is_file():
            self.start()

    def select_key(self):
        path = filedialog.askopenfilename(
            title="Firebase 서비스 계정 JSON 선택",
            filetypes=[("JSON 파일", "*.json")],
        )
        if path:
            self.key_var.set(path)
            self.settings["serviceAccount"] = path
            self._save_settings()

    def check_ollama(self):
        try:
            with urllib.request.urlopen("http://127.0.0.1:11434/api/tags", timeout=3) as response:
                models = [x.get("name", "") for x in json.loads(response.read()).get("models", [])]
            missing = [
                name for name in ("gemma3", "llava")
                if not any(model.startswith(name) for model in models)
            ]
            if missing:
                self.ollama_label.config(text=f"● 모델 누락: {', '.join(missing)}", fg="#D97706")
            else:
                self.ollama_label.config(text="● Ollama 정상", fg="#059669")
            return True
        except Exception:
            self.ollama_label.config(text="● Ollama 꺼짐", fg="#DC2626")
            return False

    def _start_ollama(self):
        if self.check_ollama():
            return
        try:
            subprocess.Popen(
                ["ollama", "serve"],
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL,
                creationflags=getattr(subprocess, "CREATE_NO_WINDOW", 0),
            )
            self.log("Ollama 시작을 요청했습니다.")
        except Exception as exc:
            self.log(f"Ollama를 자동 시작하지 못했습니다: {exc}")

    def start(self):
        if self.worker_thread and self.worker_thread.is_alive():
            return
        key_path = self.key_var.get().strip()
        if not key_path or not Path(key_path).is_file():
            self.select_key()
            key_path = self.key_var.get().strip()
            if not key_path:
                return
        self._start_ollama()
        try:
            self.worker = PCUWorker(key_path, log=self.log)
        except Exception as exc:
            messagebox.showerror("시작 실패", str(exc))
            return
        self.settings["serviceAccount"] = key_path
        self._save_settings()
        self.worker_thread = threading.Thread(target=self.worker.run, daemon=True)
        self.worker_thread.start()
        self.worker_label.config(text="● AI 작업 실행 중", fg="#059669")
        self.start_button.config(state="disabled")
        self.stop_button.config(state="normal")

    def stop(self):
        if self.worker:
            self.worker.stop()
        self.worker_label.config(text="● AI 작업 중지", fg="#777")
        self.start_button.config(state="normal")
        self.stop_button.config(state="disabled")

    def close(self):
        self.stop()
        self.root.destroy()

    def run(self):
        self.root.mainloop()


def main():
    Launcher().run()


if __name__ == "__main__":
    main()
