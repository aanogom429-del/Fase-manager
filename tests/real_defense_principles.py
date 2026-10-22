"""Meaningful metric controls; does not execute or alter the game engine."""
import gzip
import hashlib
import importlib.util
import json
import math
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT/'scripts'))
import analyze_real_defense as audit


def frame(time=0):
    players = [[t, n, 10+n*3, 10+n*2] for t, ns in
               [(0, [11, *range(1, 11)]), (1, [25, *range(15, 25)])] for n in ns]
    # Keep the synthetic test points inside the field.
    for p in players:
        p[2] %= 100
        p[3] %= 64
    return {'time': time, 'ball': [40, 32], 'players': players}


class RealDefense(unittest.TestCase):
    def test_same_geometry_both_directions(self):
        a = frame()
        b = {'time': 0, 'ball': [100-a['ball'][0], 64-a['ball'][1]],
             'players': [[1-p[0], (25 if p[1] == 11 else p[1]+14) if p[0] == 0
                         else (11 if p[1] == 25 else p[1]-14), 100-p[2], 64-p[3]]
                        for p in a['players']]}
        ma, mb = audit.measure(a, 0), audit.measure(b, 1)
        for key in ['nearestDistanceM', 'lengthM', 'widthM', 'goalSideCount', 'centralZoneCount']:
            self.assertAlmostEqual(ma[key], mb[key])
        for x, y in zip(ma['centroid'], mb['centroid']):
            self.assertAlmostEqual(x, y)

    def test_missing_not_filled_and_no_time_bridge(self):
        a, b = audit.measure(frame(0), 0), audit.measure(frame(.4), 0)
        f = frame(.2)
        f['players'].pop()
        self.assertIsNone(audit.measure(f, 0))
        summary = audit.summarize([a, None, b], 0, .4)
        self.assertEqual(summary['pairedObservedSeconds'], 0)
        self.assertIsNone(summary['meanObservedNearestApproachMps'])
        self.assertEqual(summary['completeFrames'], 2)

    def test_ball_motion_does_not_become_defender_approach(self):
        f, g = frame(0), frame(.2)
        g['ball'][0] += 10
        result = audit.summarize([audit.measure(f, 0), audit.measure(g, 0)], 0, .2)
        self.assertAlmostEqual(result['meanObservedNearestApproachMps'], 0)

    def test_interior_ray_is_geometry_only(self):
        self.assertEqual(audit.gap([5, 1], [0, 0], [10, 0]), 1)
        self.assertIsNone(audit.gap([-1, 0], [0, 0], [10, 0]))
        self.assertIsNone(audit.gap([0, 0], [0, 0], [0, 0]))

    def test_report_provenance_selection_and_adverse_examples(self):
        with gzip.open(ROOT/'data/real-defense-principles.json.gz', 'rt') as stream:
            data = json.load(stream)
        self.assertEqual(data['recipeSha256'], audit.sha(ROOT/'scripts/analyze_real_defense.py'))
        self.assertEqual(data['sourcesSha256']['data/metrica-analysis.json'],
                         audit.sha(ROOT/'data/metrica-analysis.json'))
        self.assertEqual(data['selection'], audit.SELECTION)
        self.assertEqual(len(data['clips']), 8)
        shots = [c for c in data['clips'] if c['kind'] == 'pre-shot']
        self.assertEqual([c['shot']['id'] for c in shots], [84, 199, 253, 298])
        self.assertEqual([c['shot']['subtype'] for c in shots],
                         ['OFF TARGET-OUT', 'ON TARGET-GOAL', 'ON TARGET-SAVED', 'BLOCKED'])
        for c in data['clips']:
            samples = [audit.measure(f, c['defendingTeam']) for f in c['frames']]
            self.assertEqual(samples, c['samples'])
            result = audit.summarize(samples, c['start'], c['end'],
                                     c['shot']['start'] if c['kind'] == 'pre-shot' else None)
            self.assertEqual(result, c['summary'])
        goal = next(c for c in shots if c['shot']['id'] == 199)['summary']['lastBeforeShot']
        self.assertLess(goal['nearestDistanceM'], 1)
        self.assertEqual(goal['geometricRaysAtRadius']['2'], 0)
        blocked = shots[-1]['summary']['lastBeforeShot']
        self.assertEqual(blocked['geometricRaysAtRadius']['1'], 0)
        self.assertEqual(blocked['geometricRaysAtRadius']['2'], 3)
        self.assertEqual(shots[0]['summary']['preShotSummary']['totalFrames'], 151)


if __name__ == '__main__':
    unittest.main()
