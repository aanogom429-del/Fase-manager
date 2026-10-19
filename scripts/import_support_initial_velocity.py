"""Import only preceding 0.20 s; no future tracking used to initialize velocity."""
import argparse, hashlib, json, math
from pathlib import Path
from import_metrica import read_team

def build(directory):
    root=Path(__file__).resolve().parents[1]
    data=json.loads((root/'data/owner-holdout-windows.json').read_text())
    directory=Path(directory)
    for name in ('Home.csv','Away.csv'):
        assert hashlib.sha256((directory/name).read_bytes()).hexdigest()==data['rawSha256'][name]
    teams=[read_team(directory/name,t,max(c['start'] for c in data['clips']))[0]
           for t,name in enumerate(('Home.csv','Away.csv'))]
    clips=[]
    for c in data['clips']:
        end=round(c['start']*25)
        frames=[]
        for frame in range(end-5,end+1):
            ps=[]
            for t in (0,1):
                row=teams[t][(1,frame)]
                assert abs(row['time']-frame/25)<.001
                ps.extend([[p[0],p[1],round(100-p[2],4),round(64-p[3],4)] for p in row['players']])
            assert len(ps)==22 and len({(p[0],p[1]) for p in ps})==22
            assert all(math.isfinite(v) for p in ps for v in p)
            assert all(0<=p[2]<=100 and 0<=p[3]<=64 for p in ps)
            frames.append(dict(time=frame/25,players=ps))
        assert frames[-1]['players']==c['frames'][0]['players']
        clips.append(dict(id=c['id'],frames=frames))
    return dict(source=data['source'],rawSha256=data['rawSha256'],
                protocol='Six samples at 25 Hz from start-0.20 s through start; rotated exactly like existing windows. No future observations.',clips=clips)

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('directory');args=p.parse_args()
    result=build(args.directory)
    target=Path(__file__).resolve().parents[1]/'data/support-initial-history.json'
    target.write_text(json.dumps(result,indent=2)+'\n')
    print('Verified preceding history for',len(result['clips']),'windows')
