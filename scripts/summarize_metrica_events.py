"""Label-based diagnostic; distances are 2-D, never a proxy for airborne play."""
import argparse
import csv
import hashlib
import json
import math
from collections import Counter
from pathlib import Path

def summarize(source):
    digest = hashlib.sha256(source.read_bytes()).hexdigest()
    if digest != 'edf31a18599265b77a8baf150f2ce6d89456fb0324b62ea7a391229657a619ba':
        raise ValueError('Source differs from recorded Metrica Game 2 events')
    with source.open(newline='', encoding='utf-8-sig') as stream:
        rows = list(csv.DictReader(stream))
    def tagged(row, tag):
        return tag in row['Subtype'].split('-')
    kicks = []
    for line, row in enumerate(rows, 2):
        if tagged(row, 'GOAL KICK'):
            distance = math.hypot((float(row['End X'])-float(row['Start X']))*105,
                                  (float(row['End Y'])-float(row['Start Y']))*68)
            kicks.append(dict(csvLine=line, team=row['Team'], period=int(row['Period']),
                              startSeconds=float(row['Start Time [s]']), type=row['Type'],
                              subtype=row['Subtype'], distanceM=distance))
    return dict(source='https://github.com/metrica-sports/sample-data/tree/master/data/Sample_Game_2',
                attribution='Tracking and event data: Metrica Sports sample-data', sourceSha256=digest,
                eventCount=len(rows), typeCounts=dict(Counter(r['Type'] for r in rows)),
                headerShots=sum(r['Type']=='SHOT' and tagged(r,'HEAD') for r in rows),
                crossLabels=sum(tagged(r,'CROSS') for r in rows),
                clearanceLabels=sum(tagged(r,'CLEARANCE') for r in rows),
                goalKickLabels=len(kicks), goalKicks=kicks,
                longGoalKicksByThresholdM={str(t):sum(k['distanceM']>=t for k in kicks) for t in (30,35,40)},
                protocol='All events in Game 2; exact hyphen-separated subtype tokens. Distance from event endpoints on 105 x 68 m pitch; no coordinate clipping. Thresholds are descriptive, not calibrated football categories.',
                limitations=['One anonymized match, not representative frequencies','No ball height: long does not imply aerial','Header shots are not necessarily from crosses','Labels do not identify intention, jump ability or success probability of an attempted header','No comparison of engine frequency without equivalent exposure and event logging'])

if __name__ == '__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('events', type=Path)
    args=parser.parse_args()
    result=summarize(args.events)
    assert result['eventCount']==1935 and result['headerShots']==7 and result['goalKickLabels']==16
    target=Path(__file__).resolve().parents[1]/'data/metrica-game2-event-reference.json'
    target.write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(json.dumps({k:v for k,v in result.items() if k!='goalKicks'},ensure_ascii=False,indent=2))
