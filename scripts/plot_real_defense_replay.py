"""Scientific diagnostic figure from retained replay outputs, not generated art."""
import gzip
import json
from pathlib import Path
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

ROOT = Path(__file__).resolve().parents[1]


def main():
    with gzip.open(ROOT/'data/real-defense-replay.json.gz', 'rt') as stream:
        data = json.load(stream)
    rows = [r for r in data['rows'] if r['hypothesis'] == 'ball-facing']
    labels = ['G1 · presión / balance', 'G1 · retroceso', 'G1 · progresión rival',
              'G1 · temporización', 'G2 · antes de tiro 84', 'G2 · antes de tiro 199',
              'G2 · antes de tiro 253', 'G2 · antes de tiro 298']
    fig, (ax, bx) = plt.subplots(1, 2, figsize=(14, 7), gridspec_kw={'width_ratios': [1.5, 1]}, facecolor='#f5f7fa')
    fig.suptitle('Replay defensivo · comparación con el movimiento real', x=.055, ha='left', fontsize=18, weight='bold', color='#243746')
    fig.text(.055, .91, 'Menor error = mayor semejanza posicional; no acredita mejor defensa. Ocho secuencias de desarrollo.', fontsize=10, color='#526474')
    y = np.arange(len(rows))
    for key, label, color, marker, shift in [('stationary', 'Posición inicial fija', '#7f8b95', 's', -.17),
                                           ('initial-velocity', 'Velocidad inicial constante', '#308a78', '^', 0),
                                           ('e28', 'Motor e28 · orientación hacia balón', '#cf7a23', 'o', .17)]:
        values = [r['references'][key]['meanErrorM']['all'] if key != 'e28' else r['results']['e28']['meanErrorM']['all'] for r in rows]
        ax.scatter(values, y+shift, color=color, marker=marker, s=50, label=label, zorder=3)
    ax.set_yticks(y, labels)
    ax.invert_yaxis()
    ax.set_xlabel('Error medio por jugador (m), ponderado por tiempo')
    ax.set_title('Las referencias deben compararse caso a caso', loc='left', fontsize=11, pad=15)
    ax.grid(axis='x', color='#dce2e8', zorder=0)
    ax.legend(loc='lower right', frameon=False, fontsize=9)
    groups = ['near', 'deep', 'rest']
    values = [sum(r['results']['e28']['meanErrorM'][g] for r in rows)/len(rows) for g in groups]
    bars = bx.bar(range(3), values, color=['#698dab', '#6c9f93', '#cf7a23'], width=.6)
    bx.set_xticks(range(3), ['2 próximos\nal inicio', '4 profundos\nrestantes', '4 restantes'])
    bx.set_ylabel('Error medio (m)')
    bx.set_ylim(0, 9.5)
    bx.set_title('Mayor discrepancia en el grupo restante', loc='left', fontsize=11, pad=15)
    bx.grid(axis='y', color='#dce2e8', zorder=0)
    bx.set_axisbelow(True)
    for bar, value in zip(bars, values):
        bx.text(bar.get_x()+bar.get_width()/2, value+.15, f'{value:.2f}'.replace('.', ','), ha='center', fontsize=12, weight='bold')
    for a in [ax, bx]:
        a.set_facecolor('#f5f7fa')
        for s in a.spines.values():
            s.set_visible(False)
        a.tick_params(length=0)
    fig.text(.055, .075, 'Ataque, balón y porteros impuestos; diez defensores libres. Sin capturas ni goles simulados.\n'
             'Subgrupos fijados al inicio: no son líneas reales ni categorías automáticas de espacios de fase.\n'
             'Fuente: Metrica Sports sample-data. Velocidad inicial estimada solo con la muestra anterior.', fontsize=10, color='#526474', linespacing=1.6)
    fig.subplots_adjust(left=.19, right=.98, top=.82, bottom=.23, wspace=.38)
    destination = ROOT/'docs/assets/real-defense-replay.png'
    destination.parent.mkdir(parents=True, exist_ok=True)
    fig.savefig(destination, dpi=150, facecolor=fig.get_facecolor())
    plt.close(fig)


if __name__ == '__main__':
    main()
