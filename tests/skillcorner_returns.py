import importlib.util,pathlib,unittest
root=pathlib.Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('returns',root/'scripts/skillcorner_returns.py')
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
class Tests(unittest.TestCase):
    def test_return(self):
        e=m.episodes([(0,0)]*5+[(9,0)]*3+[(2,0)]*3)
        self.assertEqual((e[0]['exit'],e[0]['returned']),(5,8))
    def test_censored(self):self.assertIsNone(m.episodes([(0,0)]*5+[(9,0)]*4)[0]['returned'])
    def test_transient(self):self.assertEqual(m.episodes([(0,0)]*5+[(9,0)]+[(0,0)]*4),[])
    def test_stationary(self):self.assertEqual(m.episodes([(5,3)]*21),[])
if __name__=='__main__':unittest.main()
