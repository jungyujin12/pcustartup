const ALLOWED_PATHS = new Set(["health", "notify", "analyze-url", "remind", "analysis-status"]);
const FIREBASE_WEB_API_KEY = process.env.FIREBASE_WEB_API_KEY || "AIzaSyBgZ5pqslhIV7SVTgt3ZSc_ZGGtORM-P-A";

function response(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
    body: JSON.stringify(body),
  };
}

async function resolveServerUrl() {
  if (process.env.PCU_AI_SERVER_URL) {
    return process.env.PCU_AI_SERVER_URL.replace(/\/+$/, "");
  }

  const workerUrl = (process.env.PCU_WORKER_URL || "https://pcu-ai-proxy.jyj2315.workers.dev")
    .replace(/\/+$/, "");
  const result = await fetch(`${workerUrl}/get-url`, {
    headers: { Accept: "application/json" },
  });
  if (!result.ok) throw new Error(`AI 서버 주소 조회 실패 (${result.status})`);
  const data = await result.json();
  if (!data.url || !data.url.startsWith("https://")) {
    throw new Error("사용 가능한 AI 서버 주소가 없습니다.");
  }
  return data.url.replace(/\/+$/, "");
}

async function verifyAdminRequest(event) {
  const authorization = event.headers.authorization || event.headers.Authorization || "";
  const idToken = authorization.startsWith("Bearer ") ? authorization.slice(7).trim() : "";
  if (!idToken) return false;

  const result = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${encodeURIComponent(FIREBASE_WEB_API_KEY)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
      signal: AbortSignal.timeout(10000),
    }
  );
  if (!result.ok) return false;
  const data = await result.json();
  return Array.isArray(data.users) && data.users.length > 0;
}

exports.handler = async (event) => {
  const path = String(event.queryStringParameters?.path || "").replace(/^\/+|\/+$/g, "");
  if (!ALLOWED_PATHS.has(path)) return response(404, { detail: "지원하지 않는 API입니다." });

  const expectedMethod = path === "health" || path === "analysis-status" ? "GET" : "POST";
  if (event.httpMethod !== expectedMethod) {
    return response(405, { detail: `${expectedMethod} 요청만 허용됩니다.` });
  }

  const token = process.env.PCU_API_TOKEN;
  if (!token) return response(503, { detail: "Netlify에 PCU_API_TOKEN이 설정되지 않았습니다." });

  try {
    if (path === "remind" && !(await verifyAdminRequest(event))) {
      return response(401, { detail: "관리자 인증이 필요합니다." });
    }

    const serverUrl = await resolveServerUrl();
    const headers = {
      "x-api-token": token,
      Accept: "application/json",
    };
    if (event.headers["content-type"]) headers["content-type"] = event.headers["content-type"];

    const upstreamPath = path === "analysis-status"
      ? `analysis-status/${encodeURIComponent(event.queryStringParameters?.jobId || "")}`
      : path;
    if (path === "analysis-status" && !event.queryStringParameters?.jobId) {
      return response(400, { detail: "jobId가 필요합니다." });
    }

    const upstream = await fetch(`${serverUrl}/${upstreamPath}`, {
      method: event.httpMethod,
      headers,
      body: event.httpMethod === "GET"
        ? undefined
        : Buffer.from(event.body || "", event.isBase64Encoded ? "base64" : "utf8"),
      signal: AbortSignal.timeout(path === "analyze-url" ? 30000 : 10000),
    });
    const body = await upstream.text();
    return {
      statusCode: upstream.status,
      headers: {
        "Content-Type": upstream.headers.get("content-type") || "application/json; charset=utf-8",
        "Cache-Control": "no-store",
      },
      body,
    };
  } catch (error) {
    return response(502, { detail: error.message || "AI 서버 연결에 실패했습니다." });
  }
};
