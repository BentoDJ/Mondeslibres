# Nouveau design d'abcterroirs.com (sans changer de thème)

`custom-abc.css` est une feuille de style qui s'ajoute **par-dessus** le thème Paprica actuel. Elle ne touche ni aux produits, ni aux commandes, ni aux modules. Pour revenir en arrière, il suffit de l'enlever.

Les comparaisons avant/après (`comparaison-*.jpg`) ont été faites sur le **vrai site**, en ajoutant la feuille de style seulement dans le navigateur de test.

## Ce qui change

- **Polices** : Fraunces (élégante) pour les titres, Inter (très lisible) pour le texte, à la place de Roboto partout.
- **Couleurs** : un vert olive plus profond et des fonds crème, à la place du vert anis et du gris.
- **Boutons** arrondis, en olive.
- **En-tête** plus aéré, barre de recherche arrondie, menu plus lisible.
- **Bandeau « Attention, magasins dangereux… »** : fond dégradé vert olive à la place de l'image de démonstration du thème (des épices sur fond noir), grand titre blanc, sans le surlignage blanc parasite.
- **Texte de présentation** de l'accueil mis en valeur dans un encadré crème.
- **Cartes produits** encadrées et arrondies, avec un léger effet au survol. Les noms ne sont plus coupés sur mobile (« COFFRET NAN… »).
- **Fiche produit** : prix mis en avant, encadrés Réassurance en crème.
- **Pages Histoire, Nos boutiques, Demande de devis…** : l'encadré « Désolé pour le dérangement » est masqué.
- **Pied de page aux couleurs de la boutique** : fond crème avec un liseré olive, titres en vert olive, et une barre olive tout en bas. Il remplace le fond noir et la photo de nouilles du thème.
- **Touches modernes** : légère ombre sous l'en-tête, soulignement animé du menu au survol, petit trait olive sous les titres de sections, photos produits sur un fond harmonisé, champs de formulaire arrondis.

## ✅ En ligne depuis le 13/10/2026, via le module « ABC Terroirs - Habillage du site »

Le design a été installé sous forme d'un petit module (`module/abcdesign.zip`), qui charge la feuille de style sur toutes les pages. **Pour revenir en arrière :** Modules → rechercher « ABC Terroirs » → Désactiver.

Pour modifier le design plus tard, il faut modifier `module/abcdesign/views/css/abc.css`, refaire le zip et réinstaller le module, ou remplacer ce fichier par FTP.

## Autre méthode : via FTP (10 minutes, compte OVH)

1. Se connecter sur **ovh.com/manager**, puis **Web Cloud → Hébergements → abcterroirs.com → onglet « FTP - SSH »**.
2. Cliquer sur **« FTP Explorer »**, et se connecter avec l'identifiant FTP indiqué sur cette page. Si le mot de passe FTP est inconnu, on peut le changer sur cette même page.
3. Aller dans **`www/themes/Paprica/assets/css/`**.
4. **Télécharger d'abord une copie de `custom.css`** sur l'ordinateur : c'est la sauvegarde.
5. Ouvrir `custom.css` pour le modifier, aller **tout en bas**, puis **coller l'intégralité de `custom-abc.css`** après le contenu existant. Enregistrer.
6. Dans PrestaShop : **Paramètres avancés → Performances → « Vider le cache »**.
7. Ouvrir le site et faire **Ctrl + F5**.

**Pour annuler :** remettre la copie sauvegardée à l'étape 4 (ou supprimer le bloc collé), puis vider le cache.

Le dossier `www` peut avoir un autre nom selon l'hébergement. C'est celui qui contient `themes`, `modules`, `img`…

## Ce que le CSS ne peut pas corriger (contenu, à faire dans l'administration)

- Les **noms de produits en MAJUSCULES** (« COFFRET 100% NANTAISES V2 »). Il faut les réécrire (Petit / Moyen / Grand).
- L'**image « angelot »** de la mention alcool. Une image propre est prête dans `../images-pretes/bandeau-mention-alcool.png`.
- La **photo « Just for you »** du diaporama. Une diapositive Noël est prête dans `../images-pretes/diapo-accueil-noel.jpg`.
- Les **photos des sous-catégories** (pouces levés, « Aucune image disponible »).
