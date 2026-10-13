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

Dans l'admin PrestaShop, aller dans **Design > Pages**, ouvrir « Conditions d'utilisation », article 1, et remplacer `TVA FR68533172094` par `TVA FR06489517870`.

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
  Les modules installés (ps_emailalerts 3.0.1, ps_searchbar 2.1.3…) indiquent un PrestaShop 8.x, qui fonctionne en PHP 8.1. Chez OVH, la version se change dans l'espace client : Hébergements > Configuration > Modifier la configuration > PHP 8.1. Il faut d'abord faire une sauvegarde, puis tester le site, idéalement sur une copie.
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
