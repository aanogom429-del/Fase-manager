import importlib.util
import json
import unittest
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('audit',ROOT/'scripts/analyze_game3_structure.py')
audit=importlib.util.module_from_spec(spec)
spec.loader.exec_module(audit)

class StructureTests(unittest.TestCase):
    def test_quantiles(self):
        self.assertEqual(audit.quantiles([]),{'n':0})
        self.assertEqual(audit.quantiles([0,10])['median'],5)
        self.assertEqual(audit.quantiles([10])['p90'],10)

    def test_real_result_consistency(self):
        data=json.loads((ROOT/'data/game3-structure.json').read_text())
        self.assertEqual(data['firstHalfFrames'],69661)
        self.assertEqual(len(data['windows']),203)
        for split in ['development','holdout']:
            rows=[r for r in data['windows'] if r['split']==split]
            self.assertEqual(len(rows),data['summaries'][split]['widthM']['n'])
            for r in rows:
                self.assertEqual(round(r['end']-r['start'],6),5)
                self.assertTrue(0<r['widthM']<75)
                self.assertTrue(0<r['depthM']<110)
                self.assertTrue(0<=r['rearCandidates']<=10)
                self.assertTrue(0<=r['lateralOrderSwaps']<=45)
                self.assertEqual(r['start']>=1800,split=='holdout')
        self.assertLess(data['eventTrackingErrorM']['p90'],1)

if __name__=='__main__':unittest.main()
