import unittest

from ai_worker import PCUWorker


class FakeSnapshot:
    def __init__(self, doc_id, data, exists=True):
        self.id = doc_id
        self._data = data
        self.exists = exists

    def to_dict(self):
        return dict(self._data)


class FakeQuery:
    def __init__(self, snapshots):
        self.snapshots = snapshots

    def where(self, **kwargs):
        filter_value = kwargs.get("filter")
        if filter_value and filter_value.op_string == "==":
            return FakeQuery([
                snapshot for snapshot in self.snapshots
                if snapshot.to_dict().get(filter_value.field_path) == filter_value.value
            ])
        return self

    def limit(self, _count):
        return self

    def stream(self):
        return iter(self.snapshots)


class FakeDocument:
    def __init__(self, snapshot):
        self.snapshot = snapshot

    def get(self):
        return self.snapshot


class FakeCollection(FakeQuery):
    def document(self, doc_id):
        for snapshot in self.snapshots:
            if snapshot.id == doc_id:
                return FakeDocument(snapshot)
        return FakeDocument(FakeSnapshot(doc_id, {}, exists=False))


class FakeDB:
    def __init__(self, snapshots):
        self.snapshots = snapshots

    def collection(self, _name):
        return FakeCollection(self.snapshots)


class DesignLibrarySelectionTests(unittest.TestCase):
    def worker(self, snapshots):
        worker = PCUWorker.__new__(PCUWorker)
        worker.db = FakeDB(snapshots)
        return worker

    def test_only_approved_matching_track_is_selected(self):
        worker = self.worker([
            FakeSnapshot("review", {"status": "review", "track": "startup", "usageCount": 0}),
            FakeSnapshot("career", {"status": "approved", "track": "career", "usageCount": 0}),
            FakeSnapshot("startup", {"status": "approved", "track": "startup", "usageCount": 2}),
        ])
        selected = worker._select_library_design("startup", {}, {})
        self.assertEqual(selected["id"], "startup")

    def test_fit_beats_usage_when_content_has_data(self):
        worker = self.worker([
            FakeSnapshot("plain", {"status": "approved", "track": "startup", "usageCount": 0, "tags": []}),
            FakeSnapshot("evidence", {"status": "approved", "track": "startup", "usageCount": 3, "tags": ["data"]}),
        ])
        selected = worker._select_library_design("startup", {"hasData": True}, {})
        self.assertEqual(selected["id"], "evidence")

    def test_explicit_unapproved_design_is_ignored(self):
        worker = self.worker([
            FakeSnapshot("draft", {"status": "review", "track": "startup", "usageCount": 0}),
            FakeSnapshot("approved", {"status": "approved", "track": "startup", "usageCount": 1}),
        ])
        selected = worker._select_library_design("startup", {}, {"designLibraryId": "draft"})
        self.assertEqual(selected["id"], "approved")


if __name__ == "__main__":
    unittest.main()
