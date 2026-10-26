# Réplicothèque

Banque de répliques de films, séries, radio et discours, avec un petit sampler intégré.

## Utilisation

Ouvre `index.html` dans ton navigateur (double-clic suffit).

- **Chercher** : barre de recherche (texte, film, acteur, année), étiquettes de situation, filtres par type et par langue.
- **Extraits fournis** : les répliques marquées `♪ WAV` ont un extrait audio dans `samples/`. Bouton « Écouter », « Ouvrir dans le sampler » ou « Télécharger le WAV ».
- **Sampler** : glisse un fichier audio ou vidéo (WAV, MP3, M4A, MP4…) dans la zone prévue, sélectionne la réplique sur la forme d'onde, puis « Exporter le WAV ». Le fichier prend le nom de la réplique sélectionnée dans la liste. Options : normalisation à −1 dB, fondus de 10 ms, conversion en mono. Tout se passe dans le navigateur, rien n'est envoyé en ligne.

Raccourcis : `/` chercher, `R` au hasard, `↑` `↓` parcourir, `C` copier, `Espace` écouter.

> Si « Ouvrir dans le sampler » ne marche pas en double-cliquant sur `index.html` (certains navigateurs bloquent la lecture de fichiers locaux), lance un petit serveur depuis ce dossier : `python3 -m http.server`, puis ouvre http://localhost:8000.

## Droits

Le texte des répliques est cité brièvement. Le son et l'image des films, séries et émissions restent la propriété de leurs ayants droit : vérifie les droits avant de publier un sample.

Les extraits audio fournis et leur statut sont listés dans [`samples/SOURCES.md`](samples/SOURCES.md).
