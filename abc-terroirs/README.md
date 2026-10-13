# ABC Terroirs : problème trouvé sur abcterroirs.com

Audit du site du 13/10/2026 : 157 pages explorées et 1 166 liens ou ressources testés.

## Le problème : un numéro de TVA qui n'est pas celui d'ABC Terroirs

La page **Conditions d'utilisation (CGV)**, à l'article 1 « Identification de notre société », indique :

> SIRET 48951787000015 / TVA **FR68533172094**

Ce numéro ne correspond pas au SIREN d'ABC Terroirs (489 517 870). Il contient le SIREN **533 172 094**, qui est celui de **BIENMANGER.COM** (SAS, La Tieule, Lozère), d'après l'annuaire officiel des entreprises (recherche-entreprises.api.gouv.fr). Les CGV ont sans doute été reprises du site bienmanger.com sans changer ce numéro.

Vérification par la clé de TVA française, `(12 + 3 × (SIREN mod 97)) mod 97` :

| SIREN | Clé calculée | Numéro de TVA |
|---|---|---|
| 489 517 870 (ABC Terroirs) | 06 | **FR06489517870** ✔ (c'est le numéro des mentions légales) |
| 533 172 094 (Bienmanger.com) | 68 | FR68533172094 ✘ (c'est le numéro affiché dans les CGV) |

Les deux pages légales du site se contredisent donc, et les CGV, qui ont valeur de contrat, désignent une autre entreprise.

### Correction

✅ **Corrigé le 13/10/2026** (voir [journal-modifications.md](journal-modifications.md)).

Dans l'admin PrestaShop, aller dans **Apparence > Pages**, ouvrir « Conditions d'utilisation », article 1, et remplacer `TVA FR68533172094` par `TVA FR06489517870`.

## Correction n°2 : la page Mentions légales

La loi (LCEN, art. 6) impose d'indiquer le **directeur de la publication** et l'**hébergeur** (nom, adresse, téléphone). Ces informations n'apparaissent que partiellement, et seulement dans les CGV. La page contient aussi :

- le texte par défaut de PrestaShop, avec un lien vers le blog anglais de PrestaShop qui renvoie maintenant une **erreur 404** ;
- des restes de copier-coller : un bloc `FicheDonnees__timeline` qui affiche un petit carré doré isolé, et des polices en dur qui mettent la ligne « Immatriculée au RCS » dans une autre police ;
- le titre « Mentions légales » affiché deux fois (titre de la page, puis `<h2>` dans le contenu).

Le fichier [`mentions-legales.html`](mentions-legales.html) contient une version corrigée, prête à coller dans l'éditeur (bouton `<>` code source).

## Autres points relevés dans les CGV, à faire vérifier

Je ne suis pas juriste : ce sont des écarts apparents avec le Code de la consommation, à faire confirmer.

1. **Délai de remboursement après rétractation : 30 jours (art. 11 et 12).** La loi impose **14 jours** au maximum (art. L221-24), avec le même moyen de paiement que celui utilisé par le client. Proposer un bon d'achat n'est possible qu'avec son accord.
2. **Pas de médiateur de la consommation.** Les CGV doivent en indiquer un (art. L612-1 et L616-1). Il faut ajouter le nom et le site du médiateur auquel la boutique adhère, ou en choisir un.
3. **Plateforme européenne de règlement des litiges (art. 14).** Elle a fermé en juillet 2025, cette mention peut être supprimée.
4. **Article 15, données personnelles.** Il cite la loi de 2004, la « Commission National » (sic), Criteo et Shopzilla (encore un reste de Bienmanger). Il faudrait le remplacer par un texte RGPD : finalités, durée de conservation, droits d'accès, de rectification, d'effacement et d'opposition, contact, et recours auprès de la CNIL.
5. **Renvoi erroné à l'article 12.** On y lit « hypothèses visées à l'article 10 », alors que les cas de remboursement sont à l'article 11.

## Correction n°3 : sécurité du serveur (le point le plus important après la TVA)

- **Le site tourne en PHP 7.4**, comme l'annonce l'en-tête `X-Powered-By: PHP/7.4`. Cette version ne reçoit plus aucun correctif de sécurité depuis novembre 2022. Pour une boutique qui gère des comptes clients et des commandes, c'est le risque principal.
  **Correction (13/10/2026, après connexion à l'administration) : le site tourne en PrestaShop 1.7.8.11**, et non en 8.x comme je l'avais d'abord déduit des modules. Or **PrestaShop 1.7.8 ne fonctionne pas au-delà de PHP 7.4**. ⚠️ **Il ne faut donc surtout pas changer la version de PHP seule chez OVH : le site tomberait en panne.** Il faut d'abord **migrer PrestaShop en 8.x**, en vérifiant que le thème Paprica et les modules (Codezeel, PayPal, Payplug, click & collect) sont compatibles, puis passer en PHP 8.1. C'est un travail de prestataire, à faire sur une copie du site, avec une sauvegarde. Budget à prévoir : plus qu'une simple mise à jour, possiblement un changement de thème si Paprica n'existe pas en version 8.
- Il faudrait aussi masquer la version (`expose_php = Off`) et ajouter l'en-tête HSTS. Les deux s'activent dans `.htaccess` :

```apache
<IfModule mod_headers.c>
  Header always unset X-Powered-By
  Header always set Strict-Transport-Security "max-age=31536000"
  Header always set X-Content-Type-Options "nosniff"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
```

## Correction n°4 : référencement Google

- **Pas de sitemap** : `/sitemap.xml` et `/1_index_sitemap.xml` renvoient une erreur 404, et le `robots.txt` ne déclare aucun sitemap. Il suffit d'installer le module gratuit **« Google sitemap » (gsitemap)** dans Modules > Catalogue, de générer le sitemap, puis de le déclarer dans Google Search Console.
- **649 images sans texte alternatif (`alt`)** sur les pages explorées, ce qui pénalise le référencement des images et l'accessibilité. Dans PrestaShop, la « légende » de chaque image produit sert de `alt`.
- **Deux `<h1>` sur l'accueil et sur les catégories**, ce qui vient du thème Paprica.
- **Titres de pages en double** : par exemple « COFFRET 100% NANTAISES V2 » et « Cadeau idéal pour salon ou événement sur Nantes ou département 44 » apparaissent sur plusieurs pages. Ce sont des balises meta title à différencier.

## Petits défauts visibles par les clients

- **Ancienneté incohérente** : le menu affiche « NOTRE ENSEIGNE DEPUIS 20 ANS », alors que le texte d'accueil et le texte d'une image disent « depuis 18 ans ». Avec une création en 2006, c'est **20 ans**.
- **Images trop lourdes** : `coffret-decouverte-engagee.jpg` pèse 1,1 Mo, et la vignette de catégorie `img/c/5-0_thumb.jpg` 423 Ko pour une miniature. Il faudrait les réenregistrer en 1 200 px maximum, ou activer le WebP dans Paramètres avancés > Images.

## Ce qui va bien

Toutes les pages explorées répondent (aucune erreur 404 interne), il n'y a pas de contenu mixte http/https, les anciennes URL des pages Livraison et À propos redirigent correctement, et il n'y a aucune erreur JavaScript ni débordement horizontal sur mobile (vérifié dans Chromium, en vue bureau et en vue mobile).

## Deuxième passe (13/10/2026) : erreurs visibles par les clients

Exploration complète du site public : 552 pages, dont 353 fiches produits. Les captures sont dans [`captures-erreurs/`](captures-erreurs/).

| # | Erreur | Ampleur | Correction proposée |
|---|---|---|---|
| A | « Politique retours (à modifier dans le module "Réassurance") », un texte d'exemple du thème | **Les 353 fiches produits** | Remplacer le texte dans le module Réassurance |
| B | Encadré « Désolé pour le dérangement. Veuillez réessayer une autre recherche » sous les pages de présentation (Histoire, Nos boutiques, Demande de devis, Exemple de partenaires, Location tireuse…). Ce sont des catégories sans produit, que le thème traite comme une recherche vide. | 8 pages, dont 3 dans le menu principal | Masquer cet encadré par une ligne de CSS (`custom.css`), ou transformer ces pages en pages CMS |
| C | Le lien « Nouveaux produits » du bas de page mène à une page vide (« Désolé… ») | Toutes les pages | Remplacer le lien (Apparence → Lien), ou allonger la durée « nouveau produit » (Paramètres de la boutique → Produits) |
| D | Catégories vides affichées dans le menu : Whiskies américain, Bières (sans alcool), Jus et Soft, Autres vignobles (n° 198), ATTENTION MENTIONS LEGALES | 5 catégories | Les désactiver tant qu'elles sont vides, ou y mettre des produits |
| E | La catégorie racine « Accueil » (n° 2) a été renommée **« ATTENTION »**. Ce nom apparaît en titre de la colonne de gauche, et **98 adresses de produits** contiennent `/attention/`. | 98 produits | Renommer la catégorie en « Accueil ». Le nom seulement : les adresses restent identiques pour ne pas casser les liens |
| F | Produits **sans photo** (« Aucune image disponible ») | 10 produits | Ajouter une photo |
| G | Produits **sans aucune description** | 20 produits | Ajouter au moins un résumé |
| H | « Diablotine petite 37,5 cl » : le client doit **taper lui-même le parfum** dans un champ texte, sinon le bouton « Ajouter au panier » reste grisé | 1 produit | Utiliser des déclinaisons (liste de parfums) |
| I | Fautes : « Whiskies américain » (→ américains), « on ne décompte une 100aine actuellement en LA » (→ on en compte une centaine en Loire-Atlantique), « quelques uns » (→ quelques-uns) | Quelques pages | Corriger les textes |
