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
- des restes de copier-coller (un bloc `FicheDonnees__timeline` et des polices en dur), qui affichent un petit rond doré isolé.

Le fichier [`mentions-legales.html`](mentions-legales.html) contient une version corrigée, prête à coller dans l'éditeur (bouton `<>` code source).

## Autres points relevés dans les CGV, à faire vérifier

Je ne suis pas juriste : ce sont des écarts apparents avec le Code de la consommation, à faire confirmer.

1. **Délai de remboursement après rétractation : 30 jours (art. 11 et 12).** La loi impose **14 jours** au maximum (art. L221-24), avec le même moyen de paiement que celui utilisé par le client. Proposer un bon d'achat n'est possible qu'avec son accord.
2. **Pas de médiateur de la consommation.** Les CGV doivent en indiquer un (art. L612-1 et L616-1). Il faut ajouter le nom et le site du médiateur auquel la boutique adhère, ou en choisir un.
3. **Plateforme européenne de règlement des litiges (art. 14).** Elle a fermé en juillet 2025, cette mention peut être supprimée.
4. **Article 15, données personnelles.** Il cite la loi de 2004, la « Commission National » (sic), Criteo et Shopzilla (encore un reste de Bienmanger). Il faudrait le remplacer par un texte RGPD : finalités, durée de conservation, droits d'accès, de rectification, d'effacement et d'opposition, contact, et recours auprès de la CNIL.
5. **Renvoi erroné à l'article 12.** On y lit « hypothèses visées à l'article 10 », alors que les cas de remboursement sont à l'article 11.

## Ce qui va bien

Toutes les pages explorées répondent (aucune erreur 404 interne), il n'y a pas de contenu mixte http/https, et les anciennes URL des pages Livraison et À propos redirigent correctement.
