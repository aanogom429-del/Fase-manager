"""Import a short, synchronized Metrica CSV reference. Python standard library only.

Usage: python scripts/import_metrica.py --home home.csv --away away.csv --out data/metrica-sample.json
Download the original files from the URLs recorded in SOURCES.
Coordinates retain the source orientation; Home attacks right in this first-half excerpt.
No missing coordinates are interpolated, and no learning or motor calibration occurs.
"""
import argparse
import csv
import json
import math
from pathlib import Path

ROOT = "https://github.com/metrica-sports/sample-data"
SOURCES = {
    side: ROOT + "/blob/master/data/Sample_Game_1/Sample_Game_1_RawTrackingData_" + side + "_Team.csv"
    for side in ("Home", "Away")
}


def read_team(path, team):
    with open(path, newline="", encoding="utf-8-sig") as stream:
        rows = list(csv.reader(stream))
    headers = rows[2]
    columns = [(i, name.replace("Player", "")) for i, name in enumerate(headers) if name.startswith("Player")]
    if len(set(name for _, name in columns)) != len(columns):
        raise ValueError("Duplicate player identity")
    ball_col = headers.index("Ball")
    frames, last, quality = {}, {}, {"missingPlayerPoints": 0, "outOfBounds": 0, "speedFlags": 0}
    def point(row, col):
        try:
            x, y = float(row[col]), float(row[col + 1])
        except (ValueError, IndexError):
            return None
        if not math.isfinite(x) or not math.isfinite(y):
            return None
        if not (0 <= x <= 1 and 0 <= y <= 1):
            quality["outOfBounds"] += 1
            return None
        return [round(x * 100, 4), round(y * 64, 4)]
    for row in rows[3:]:
        if not row:
            continue
        period, frame, time = int(row[0]), int(row[1]), float(row[2])
        if period != 1 or time > 20.04:
            break
        if (period, frame) in frames:
            raise ValueError("Duplicate frame")
        players = []
        for col, number in columns:
            pos = point(row, col)
            key = (period, number)
            if pos is None:
                quality["missingPlayerPoints"] += 1
                last.pop(key, None)
                continue
            previous = last.get(key)
            last[key] = (time, pos)
            if previous:
                dt = time - previous[0]
                if dt <= 0:
                    raise ValueError("Time must increase")
                distance = math.hypot((pos[0] - previous[1][0]) * 1.05, (pos[1] - previous[1][1]) * 68 / 64)
                # Quality flag, not a physiological universal. Remove the point, do not invent a replacement.
                if distance / dt > 14:
                    quality["speedFlags"] += 1
                    continue
            players.append([team, int(number), *pos])
        frames[(period, frame)] = {"time": time, "players": players, "ball": point(row, ball_col)}
    return frames, quality


def build(home_path, away_path):
    home, hq = read_team(home_path, 0)
    away, aq = read_team(away_path, 1)
    quality = {"home": hq, "away": aq, "unsynchronizedFrames": 0, "ballDisagreements": 0}
    frames = []
    for key in sorted(home.keys() & away.keys()):
        h, a = home[key], away[key]
        if abs(h["time"] - a["time"]) > .001:
            quality["unsynchronizedFrames"] += 1
            continue
        ball = h["ball"] or a["ball"]
        if h["ball"] and a["ball"] and math.dist(h["ball"], a["ball"]) > .1:
            ball = None
            quality["ballDisagreements"] += 1
        if (key[1] - 1) % 5 == 0:
            frames.append({"frame": key[1], "time": h["time"], "players": h["players"] + a["players"], "ball": ball})
    if len(frames) < 2:
        raise ValueError("Insufficient synchronized frames")
    return {
        "schemaVersion": 1, "provider": "Metrica Sports", "match": "Sample Game 1", "period": 1,
        "sourceUrls": SOURCES, "sourcePitchMeters": [105, 68], "modelPitch": [100, 64],
        "homeAttacksRight": True, "sourceHz": 25, "displayHz": 5,
        "orientationBasis": "First-half goalkeepers Home #11 at left and Away #25 at right; not generalized to later periods.",
        "attribution": "Source: Metrica Sports sample-data. Cropped, filtered and rescaled for this reference.",
        "terms": ROOT + "#legal-stuff", "quality": quality, "frames": frames,
    }


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--home", required=True)
    parser.add_argument("--away", required=True)
    parser.add_argument("--out", required=True)
    args = parser.parse_args()
    result = build(args.home, args.away)
    Path(args.out).write_text(json.dumps(result, ensure_ascii=False, separators=(",", ":")) + "\n", encoding="utf-8")
    print(json.dumps({"frames": len(result["frames"]), "quality": result["quality"]}))
