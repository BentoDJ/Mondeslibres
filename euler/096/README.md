# Project Euler 96 — Su Doku

Énoncé : https://projecteuler.net/problem=96

Résoudre les 50 grilles de `sudoku.txt` (le fichier fourni par Project Euler) et additionner les nombres à 3 chiffres du coin supérieur gauche de chaque solution.

```
python3 euler/096/solve.py
```

Méthode : backtracking qui choisit toujours la case vide avec le moins de candidats. Chaque solution est vérifiée (lignes, colonnes, blocs, indices de départ conservés). Les 50 grilles sont résolues en environ 0,2 s.

Résultat : **24702**. La première grille donne bien 483, comme dans l'énoncé.
