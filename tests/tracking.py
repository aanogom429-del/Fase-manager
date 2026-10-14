import json
import math
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from analyze_sequences import support_candidates, summarize


class TrackingTests(unittest.TestCase):
    def test_opposition_changes_support_at_same_distance(self):
        attackers = [[0, 1, 10, 32], [0, 2, 20, 32], [0, 11, 5, 32]]
        rivals = [[1, n, 90, 55] for n in range(15, 26)]
        self.assertEqual(support_candidates(attackers + rivals, 0, 1), [2])
        rivals[0][2:] = [15, 32]
        self.assertEqual(support_candidates(attackers + rivals, 0, 1), [])
        self.assertIsNone(support_candidates(attackers + rivals[:-1], 0, 1))

    def test_forward_direction_and_nonparticipants(self):
        first = {"players": [[1, 15, 80, 20], [1, 16, 75, 25], [1, 17, 90, 40], [1, 25, 95, 32]], "ball": [80, 20]}
        last = {"players": [[1, 15, 70, 20], [1, 16, 65, 25], [1, 17, 80, 40], [1, 25, 95, 32]], "ball": [65, 25]}
        events = [{"team": 1, "type": "PASS", "sender": 15, "receiver": 16, "from": [80, 20], "to": [65, 25]}]
        s = summarize([first, last], events, 1)
        self.assertEqual(s["blockAdvanceM"], 10.5)
        self.assertEqual(s["annotatedAdvanceM"], 15.75)
        self.assertEqual((s["offBallMeasured"], s["accompanying"]), (1, 1))

    def test_real_source_alignment_and_quality(self):
        data = json.loads((ROOT / "data/metrica-analysis.json").read_text())
        self.assertEqual(len(data["clips"]), 7)
        self.assertEqual(sum(c["reserved"] for c in data["clips"]), 1)
        for c in data["clips"]:
            frames = c["frames"]
            self.assertEqual(frames[0]["time"], c["start"])
            self.assertEqual(frames[-1]["time"], c["end"])
            self.assertTrue(all(a["time"] < b["time"] for a, b in zip(frames, frames[1:])))
            for f in frames:
                self.assertAlmostEqual(f["frame"] / 25, f["time"])
                self.assertEqual(len({tuple(p[:2]) for p in f["players"]}), len(f["players"]))
                self.assertTrue(all(0 <= p[2] <= 100 and 0 <= p[3] <= 64 for p in f["players"]))
            for e in c["events"]:
                f = next(f for f in frames if f["frame"] == e["startFrame"])
                self.assertAlmostEqual(f["time"], e["start"])
                if e["type"] != "PASS":
                    continue
                sender = next(p for p in f["players"] if p[:2] == [e["team"], e["sender"]])
                error = math.hypot((sender[2] - e["from"][0]) * 1.05, (sender[3] - e["from"][1]) * 68 / 64)
                self.assertLess(error, 1, "Event origin must agree with tracked sender")
                self.assertEqual(e["candidateSupports"], support_candidates(f["players"], e["team"], e["sender"]))
        loss = next(c for c in data["clips"] if c["id"] == "circulation-loss")
        self.assertTrue(any(e["type"] == "BALL LOST" for e in loss["events"]))
        self.assertLess(loss["summary"]["completeFrames"], len(loss["frames"]))


if __name__ == "__main__":
    unittest.main()
