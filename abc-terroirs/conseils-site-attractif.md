# Rendre abcterroirs.com plus attractif

Constat fait le 13/10/2026 en parcourant le site comme un client, sur ordinateur et sur mobile. Les captures du site actuel sont dans [`maquette/avant/`](maquette/avant/).

**Le timing compte : on est mi-octobre.** Les ventes de coffrets de Noël et de cadeaux d'entreprise se jouent maintenant. Les « gains rapides » ci-dessous valent la peine d'être faits **avant début novembre**.

Tout ce qui suit se fait **dans le back-office PrestaShop, sans code**, sauf mention contraire.

---

## 1. Gains rapides : environ 2 heures, gratuit

Ce sont des détails que les clients voient et qui font « site pas fini ».

| # | Problème vu sur le site | Correction | Où dans PrestaShop |
|---|---|---|---|
| 1 | Sur **chaque fiche produit**, on lit « Politique retours **(à modifier dans le module "Réassurance")** » : c'est le texte d'exemple du thème. | Remplacer par « Retours sous 14 jours, voir nos conditions ». | Modules → chercher « Réassurance » → Configurer |
| 2 | Les noms de produits contiennent **V1, V2, V3** (« COFFRET 100% NANTAISES V2 »). Pour un client, ça ne veut rien dire. | Utiliser des tailles parlantes : « Coffret 100 % Nantaises – Petit / Moyen / Grand ». Écrire les noms en minuscules (« Coffret… » plutôt que « COFFRET… ») : en majuscules, ça donne l'impression de crier. | Catalogue → Produits → chaque produit → Nom |
| 3 | L'ancienneté change selon la page : **« depuis 18 ans »** (accueil), **« 19 ans »** (page Coffrets), **« 20 ans »** (menu). | Écrire **« depuis 2006 »** partout. Ça reste juste chaque année, sans rien changer. | Accueil : Modules → bloc texte. Catégorie : Catalogue → Catégories → Coffrets gourmands → Description |
| 4 | Les sous-catégories de la page Coffrets ont des **images de banque d'images** (pouces levés, homme en costume), et « Idées cadeaux NOËL » affiche **« Aucune image disponible »**, alors que c'est la catégorie du moment. | Mettre une vraie photo de coffret dans chaque catégorie. | Catalogue → Catégories → Modifier → Image de couverture / miniature |
| 5 | Le bas de page a une **photo de nouilles asiatiques**. C'est l'image de démonstration du thème Paprica, sans rapport avec le terroir nantais. | La remplacer par une photo du magasin, ou un fond uni. | Modules → chercher « footer » ou Thème → Personnaliser (selon le thème) |
| 6 | Le bandeau « ATTENTION, MAGASINS DANGEREUX POUR LES GOURMANDS ! » a un **surlignage blanc** derrière le texte vert (un reste de copier-coller), et il est peu lisible. | Retaper le texte avec **Ctrl + Maj + V** (collage sans mise en forme). | Modules → bannière / bloc texte de l'accueil |
| 7 | La mention alcool est une **vieille image pixelisée** (un angelot qui boit), collée à gauche. | La mention est obligatoire, mais une **simple ligne de texte** en bas de page suffit : « L'abus d'alcool est dangereux pour la santé, à consommer avec modération. Vente interdite aux mineurs. » | Modules → bloc texte personnalisé du pied de page |
| 8 | Le menu « Produits » du bas de page ne contient qu'un lien, « Nouveaux produits ». | Ajouter Coffrets, Épicerie, Vins, Idées cadeaux Noël. | Modules → « Liens » (Link list) → Configurer |

## 2. La page d'accueil : le plus gros levier (une demi-journée)

Aujourd'hui, la première chose qu'on voit est une **photo de boîte « Just for you »** sans texte ni bouton. Un visiteur ne sait pas en 3 secondes **ce que vend la boutique, ni pourquoi l'acheter ici plutôt qu'ailleurs**.

Une maquette de ce qu'on peut obtenir est dans [`maquette/accueil.html`](maquette/accueil.html) (aperçus : [ordinateur](maquette/apercu-ordinateur.jpg), [mobile](maquette/apercu-mobile.jpg)). Elle utilise les **vraies photos et les vrais prix** du site. L'ordre proposé :

1. **Un bandeau en haut** : « Coffrets de Noël disponibles · Retrait gratuit en magasin · Expédition sous 48 h ».
2. **Un grand titre qui dit ce qu'on vend** (« Offrez Nantes en coffret gourmand ») avec **deux boutons** : « Voir les coffrets de Noël » et « Composer un coffret sur mesure ».
3. **Quatre arguments** : fait main à Nantes, retrait gratuit, expédié sous 48 h, paiement sécurisé.
4. **« Un coffret pour chaque budget »** : moins de 25 €, 25 à 50 €, plus de 50 €, sur mesure. Les catégories par budget existent déjà, il suffit de les mettre en avant.
5. **Les coffrets préférés**, avec une étiquette qui donne envie : « Créé par des Nantaises », « Exclusivité magasin », « Noël ».
6. **L'histoire** : depuis 2006, place Saint-Pierre, des producteurs qu'on connaît. C'est ce qu'Amazon ne peut pas offrir.
7. **Un bloc « Cadeaux d'entreprise & CSE »** avec un bouton « Demander un devis ». C'est souvent le plus gros panier de l'année, et aujourd'hui il est caché dans « Infos pour les pros ».
8. **« Venez nous voir »** : adresse, **horaires** (absents du site aujourd'hui !), téléphone, itinéraire.

**Comment le faire sans développeur :** le thème Paprica a déjà les modules qu'il faut. Le carrousel d'images (`cz_imageslider`) accepte un titre, un texte et un lien par image. Les blocs de texte et la bannière se configurent dans Modules. Pour une mise en page aussi proche de la maquette, un module de construction de pages comme **Creative Elements** (glisser-déposer, achat unique de quelques dizaines d'euros) permet au gérant de modifier l'accueil seul ensuite. Un prestataire peut aussi le faire en une journée environ.

## 3. Les photos : ce qui fait vendre (à étaler sur l'année)

Les coffrets sont beaux, mais les photos sont faites sur des **fonds gris différents**, avec des cadrages variés, et certaines pèsent plus de 1 Mo. Sur la page Coffrets, ça donne une grille hétérogène.

- **Une même installation pour toutes les photos** : un fond blanc ou bois clair, près d'une fenêtre (lumière du jour, sans flash), le téléphone toujours à la même distance. Un carton blanc plié en « L » suffit comme fond.
- **Format carré**, produit centré.
- **Deux photos par coffret** : le coffret fermé (« voilà ce que vous offrez ») et le contenu étalé (« voilà ce qu'il y a dedans »).
- Avant de les envoyer sur le site, les passer dans **squoosh.app** (largeur 1 200 px, qualité 75 %).
- **Une ou deux photos du magasin et de l'équipe** sur l'accueil et la page « À propos ». Les clients d'une épicerie fine achètent aussi des personnes.

## 4. Les fiches produits

- **Description courte** (sous le prix) : 2 lignes qui donnent envie. Par exemple : « Le cadeau 100 % nantais : apéritif Diablotine, rillettes de poissons de Loire et petits beurres artisanaux. »
- **Composition détaillée** dans l'onglet Description, en **liste à puces** avec les poids. C'est déjà fait sur certains coffrets : il faut généraliser.
- Mettre en avant ce qui rend la boutique unique : **les producteurs** (Maison Suzanne, Janin…), « **sans alcool** » quand c'est le cas (pratique pour les cadeaux d'entreprise), « **exclusivité magasin** ».
- **Avis clients** : le module gratuit **« Commentaires produits »** (productcomments) affiche des étoiles. Les avis rassurent plus qu'un long texte.
- **Livraison offerte à partir d'un montant** (par exemple 60 €), si la marge le permet. Le client voit dans son panier ce qui lui manque, ce qui pousse à ajouter un produit. Où : Livraison → Préférences → « Livraison gratuite à partir de ».

## 5. Être trouvé et revenir

- **Fiche Google du magasin (Google Business Profile)**, gratuite. C'est ce que les gens voient en cherchant « épicerie fine Nantes » : horaires, photos, avis, lien vers le site. Demander un avis Google aux clients satisfaits au moment de payer. **C'est probablement la meilleure action gratuite de toute cette liste.**
- **Sitemap et textes alternatifs des images** : voir le rapport d'audit ([README.md](README.md)).
- **Instagram** : un seul lien en bas de page aujourd'hui. Publier chaque nouveau coffret, avec un lien vers sa fiche.
- **Newsletter** : le module gratuit « Newsletter » de PrestaShop récolte des e-mails. Trois envois par an suffisent : Noël, fête des pères, rentrée et cadeaux de fin d'année aux entreprises.

## 6. Calendrier commercial à garder en tête

| Quand | Quoi mettre en avant sur l'accueil |
|---|---|
| **Mi-octobre → 24 décembre** | Coffrets de Noël, calendriers de l'Avent, **cadeaux d'entreprise et CSE** (à lancer dès octobre) |
| Janvier – février | Fin des stocks de Noël en promo, Saint-Valentin |
| Mars – avril | Pâques |
| Mai – juin | Fête des mères, fête des pères, cadeaux de fin d'année scolaire (instituteurs) |
| Été | Apéro nantais, bières locales, touristes (« souvenir de Nantes ») |
| Septembre | Préparer les devis entreprises de Noël |

Changer l'image principale de l'accueil à chaque saison suffit à donner l'impression d'un site vivant.

---

### Ordre conseillé

1. **Cette semaine** : les 8 gains rapides (partie 1) et la fiche Google.
2. **Avant novembre** : la page d'accueil de Noël (partie 2) et la catégorie Noël avec une image.
3. **Au fil de l'eau** : les photos (partie 3) et les fiches produits (partie 4), en commençant par les 10 coffrets qui se vendent le plus.
