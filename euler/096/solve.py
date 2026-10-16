"""Project Euler 96 — Su Doku.

Résout les 50 grilles de sudoku.txt et somme les nombres à 3 chiffres
du coin supérieur gauche de chaque solution.

Méthode : propagation de contraintes (candidats uniques) + backtracking
en choisissant toujours la case qui a le moins de candidats.
"""
import sys
from pathlib import Path

ALL = set(range(1, 10))


def peers(i):
    r, c = divmod(i, 9)
    br, bc = 3 * (r // 3), 3 * (c // 3)
    ps = {r * 9 + k for k in range(9)} | {k * 9 + c for k in range(9)}
    ps |= {(br + dr) * 9 + bc + dc for dr in range(3) for dc in range(3)}
    ps.discard(i)
    return ps


PEERS = [peers(i) for i in range(81)]


def candidates(grid, i):
    return ALL - {grid[p] for p in PEERS[i]}


def solve(grid):
    """Résout la grille (liste de 81 entiers, 0 = vide) en place. Renvoie True si résolue."""
    best, best_cands = None, None
    for i in range(81):
        if grid[i] == 0:
            cands = candidates(grid, i)
            if not cands:
                return False
            if best_cands is None or len(cands) < len(best_cands):
                best, best_cands = i, cands
                if len(cands) == 1:
                    break
    if best is None:
        return True
    for d in best_cands:
        grid[best] = d
        if solve(grid):
            return True
    grid[best] = 0
    return False


def is_valid(grid):
    units = [[r * 9 + c for c in range(9)] for r in range(9)]
    units += [[r * 9 + c for r in range(9)] for c in range(9)]
    units += [[(br + dr) * 9 + bc + dc for dr in range(3) for dc in range(3)]
              for br in (0, 3, 6) for bc in (0, 3, 6)]
    return all({grid[i] for i in u} == ALL for u in units)


def parse(text):
    lines = [l.strip() for l in text.splitlines() if l.strip()]
    grids = []
    for k in range(0, len(lines), 10):
        rows = lines[k + 1:k + 10]
        grids.append([int(ch) for row in rows for ch in row])
    return grids


def main(path):
    grids = parse(Path(path).read_text())
    total = 0
    for n, g in enumerate(grids, 1):
        clues = list(g)
        assert solve(g), f"grille {n} sans solution"
        assert is_valid(g), f"grille {n} invalide"
        assert all(c in (0, v) for c, v in zip(clues, g)), f"grille {n} modifie un indice"
        total += g[0] * 100 + g[1] * 10 + g[2]
    print(f"{len(grids)} grilles résolues")
    print(total)


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else Path(__file__).with_name("sudoku.txt"))
