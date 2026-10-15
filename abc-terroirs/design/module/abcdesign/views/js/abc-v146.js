/**
 * ABC Terroirs : raccourcis de navigation et appels à l'action (CTA)
 * Chargé par le module abcdesign. Pour tout retirer : désactiver le module.
 * Les liens se modifient dans les listes LIENS_RAPIDES, BUDGETS et CTA ci-dessous.
 */
(function () {
  'use strict';

  var BASE = 'https://abcterroirs.com/';
  var TEL = '02 40 89 76 26';

  // Raccourcis affichés sous le menu, sur toutes les pages
  var LIENS_RAPIDES = [
    ['Noël', '172-idees-cadeaux-noel'],
    ['Coffrets cadeaux', '3-coffrets-gourmands'],
    ['Dégustations', '162-degustations-sur-mesure-'],
    ['Moins de 25 €', '30-selection-moins-de-25'],
    ['Vins', '5-vins'],
    ['Whiskies', '12-whiskies'],
    ['Bières locales', '7-bieres'],
    ['Épicerie fine', '4-epicerie'],
    ['Sans alcool', '167-sans-alcool'],
    ['Cadeaux d\'entreprise', '163-infos-pour-les-pros']
  ];

  // Encart « Nouveau » de l'accueil (laisser '' pour ne rien afficher)
  var NOUVEAUTE = 'Remises dégressives : <strong>-5 %</strong> dès 300 € HT d\'achat, <strong>-10 %</strong> dès 600 € HT.';

  // Ordinateur : une seule barre de navigation. Raccourcis affichés dans la barre (les autres restent sur mobile)
  // [texte, page, texte court pour écran moyen, priorité : 1 toujours, 2 masqué sous 1200 px]
  // (Vins, Épicerie, Alcools, Bières restent accessibles par le bouton « Catégories »)
  var LIENS_BARRE = [
    ['Noël', '172-idees-cadeaux-noel', 'Noël', 1],
    ['Coffrets cadeaux', '3-coffrets-gourmands', 'Coffrets', 1],
    ['Dégustations', '162-degustations-sur-mesure-', 'Dégustations', 1],
    ['Sans alcool', '167-sans-alcool', 'Sans alcool', 1],
    ['Vins', '5-vins', 'Vins', 2]
  ];
  // Petits menus déroulants de la barre (remplacent « Notre enseigne… / Nos prestations… / Infos pour les pros »)
  var MENUS_BARRE = [
    ['La boutique', [
      ['Notre histoire', '155-notre-enseigne-depuis-20-ans'],
      ['Nos boutiques', '157-nos-boutiques'],
      ['Dégustations sur mesure', '162-degustations-sur-mesure-'],
      ['Location de tireuse à bière', '195-location-tireuse-a-biere'],
      ['Sélection mariage', '204-selection-mariage']
    ]],
    ['Pros', [
      ['Infos pour les pros', '163-infos-pour-les-pros'],
      ['Demande de devis', '165-demande-de-devis-remises-commerciales'],
      ['Exemples de coffrets', '164-exemple-de-coffrets'],
      ['Nos partenaires', '202-exemple-de-partenaires']
    ]]
  ];

  // Réseaux sociaux (en haut de page, et Facebook ajouté en bas s'il manque)
  var SOCIAL = [
    ['Facebook', 'https://www.facebook.com/AbcTerroirs/', 'facebook'],
    ['Instagram', 'https://www.instagram.com/abcterroirs/', 'instagram']
  ];

  // Les 3 boutiques (horaires : site, PagesJaunes et Mappy, octobre 2026)
  // Avis Google des 3 boutiques (notes relevées sur Google Maps le 15/10/2026 : à mettre à jour de temps en temps)
  // [nom, adresse, note, identifiant Google de la fiche]
  var AVIS_GOOGLE = [
    ['ABC Terroirs Saint-Pierre', '5 place Saint-Pierre', '4,6', 'ChIJRRzrmaTuBUgRMVzdzQVsrQA'],
    ['ABC Terroirs Franklin', '9 rue Franklin', '4,7', 'ChIJl58IwxzsBUgRzxfxUidYYIs'],
    ['Spi & Bi', '5 place Paul-Émile Ladmirault', '4,9', 'ChIJf9l54uztBUgRlgaJeI_wpgs']
  ];
  // Quelques avis clients recopiés mot pour mot depuis Google : [texte, prénom + initiale, boutique]. Vide = rien affiché.
  var AVIS_CITES = [];

  var BOUTIQUES = [
    { nom: 'ABC Terroirs Saint-Pierre', sous: 'Épicerie fine & cave (boutique historique)', adr: '5 place Saint-Pierre, 44000 Nantes', tel: '02 40 89 76 26',
      h: [['Lundi – vendredi', '9h30 – 19h30'], ['Samedi', '9h30 – 20h'], ['Dimanche', 'Fermé']] },
    { nom: 'ABC Terroirs Franklin', sous: 'Épicerie fine & cave', adr: '9 rue Franklin, 44000 Nantes', tel: '09 86 22 05 28',
      h: [['Lundi', '11h – 14h / 15h – 19h30'], ['Mardi – samedi', '10h – 14h / 15h – 19h30'], ['Dimanche', 'Fermé']] },
    { nom: 'Spi & Bi', sous: 'Cave à spiritueux, bières et cidres', adr: '5 place Paul-Émile Ladmirault, 44000 Nantes', tel: '02 55 54 79 80',
      h: [['Mardi – samedi', '10h30 – 14h / 15h – 19h30'], ['Dimanche – lundi', 'Fermé']] }
  ];
  function carteBoutique(bq) {
    var tel = bq.tel.replace(/\s/g, '');
    return '<div class="abc-store"><h3>' + esc(bq.nom) + '</h3><p class="abc-store__sous">' + esc(bq.sous) + '</p>' +
      '<p><a href="https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(bq.adr) + '" target="_blank" rel="noopener">' + esc(bq.adr) + '</a></p>' +
      '<table>' + bq.h.map(function (l) { return '<tr><td>' + esc(l[0]) + '</td><td>' + esc(l[1]) + '</td></tr>'; }).join('') + '</table>' +
      '<p><a href="tel:+33' + tel.slice(1) + '">' + esc(bq.tel) + '</a></p></div>';
  }

  // Blocs « Un coffret pour chaque budget » de l'accueil
  var BUDGETS = [
    ['Moins de 25 €', '', '30-selection-moins-de-25'],
    ['25 à 50 €', '', '31-selection-25-a-50'],
    ['Plus de 50 €', '', '32-selection-plus-de-50'],
    ['Sur mesure', '', '165-demande-de-devis-remises-commerciales#devis']
  ];

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html) e.innerHTML = html;
    return e;
  }
  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }

  function ready(fn) {
    if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    var body = document.body;
    var page = body.id || '';
    if (page === 'checkout' || page === 'order-confirmation') return; // tunnel de commande : rien à ajouter

    // 1. Barre de recherche : un exemple concret de ce qu'on peut chercher
    var s = document.querySelector('#search_widget input[name="s"]');
    if (s) {
      s.setAttribute('placeholder', 'Coffret, muscadet, whisky, petit beurre…');
      s.setAttribute('aria-label', 'Rechercher un produit');
    }

    // 2. Raccourcis sous le menu
    var header = document.getElementById('header');
    if (header && !document.querySelector('.abc-quick, .abc-navbar')) {
      var menuBar = header.querySelector('.header-top-inner');
      var mainMenu = document.getElementById('_desktop_main_menu');
      if (menuBar && mainMenu && window.innerWidth >= 992) {
        // Ordinateur : une seule ligne « Catégories · raccourcis · La boutique ▾ · Pros ▾ · Panier »
        var nav = el('nav', 'abc-navbar');
        nav.setAttribute('aria-label', 'Navigation principale');
        LIENS_BARRE.forEach(function (l) {
          var a = el('a', 'abc-navbar__link abc-prio-' + l[3] + (l[1].indexOf('noel') > -1 ? ' abc-navbar__link--hot' : ''),
            '<span class="abc-long">' + esc(l[0]) + '</span><span class="abc-court">' + esc(l[2]) + '</span>');
          a.href = BASE + l[1];
          if (location.href.indexOf(l[1]) > -1) a.className += ' is-active';
          nav.appendChild(a);
        });
        var droite = el('div', 'abc-navbar__more');
        MENUS_BARRE.forEach(function (m, i) {
          var dd = el('div', 'abc-dd');
          var btn = el('button', 'abc-dd__btn', esc(m[0]));
          btn.type = 'button'; btn.setAttribute('aria-expanded', 'false'); btn.setAttribute('aria-controls', 'abc-dd-' + i);
          var list = el('div', 'abc-dd__list');
          list.id = 'abc-dd-' + i;
          m[1].forEach(function (l) { var a = el('a', '', esc(l[0])); a.href = BASE + l[1]; list.appendChild(a); });
          btn.addEventListener('click', function (e) {
            e.stopPropagation();
            var open = dd.classList.toggle('is-open');
            btn.setAttribute('aria-expanded', open ? 'true' : 'false');
          });
          dd.appendChild(btn); dd.appendChild(list); droite.appendChild(dd);
        });
        nav.appendChild(droite);
        document.addEventListener('click', function () {
          document.querySelectorAll('.abc-dd.is-open').forEach(function (d) { d.classList.remove('is-open'); d.querySelector('button').setAttribute('aria-expanded', 'false'); });
        });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape') document.body.click(); });
        mainMenu.parentNode.insertBefore(nav, mainMenu);
        document.body.classList.add('abc-has-navbar');
      } else {
        var bar = el('nav', 'abc-quick');
        bar.setAttribute('aria-label', 'Accès rapide');
        var inner = el('div', 'abc-quick__inner');
        LIENS_RAPIDES.forEach(function (l) {
          var a = el('a', 'abc-chip' + (l[1].indexOf('noel') > -1 ? ' abc-chip--hot' : ''), esc(l[0]));
          a.href = BASE + l[1];
          if (location.href.indexOf(l[1]) > -1) a.className += ' is-active';
          inner.appendChild(a);
        });
        bar.appendChild(inner);
        header.parentNode.insertBefore(bar, header.nextSibling);   // mobile et tablette : sous l'en-tête
      }
    }

    // 2 ter. Encart « Nouveau », tout en haut de toutes les pages, sous la barre de recherche
    //        (texte : variable NOUVEAUTE en haut de ce fichier ; '' pour le retirer)
    if (NOUVEAUTE && header && !document.querySelector('.abc-news')) {
      var news = el('div', 'abc-news', '<div class="abc-news__box"><span class="abc-news__tag">Nouveau</span><p>' + NOUVEAUTE + '</p></div>');
      var sw = document.getElementById('search_widget');
      var hc = sw && sw.parentNode;
      if (sw && hc && window.innerWidth >= 992) {
        // Ordinateur : à droite du logo, juste sous la barre de recherche, même largeur qu'elle
        news.className += ' abc-news--header';
        news.style.left = sw.offsetLeft + 'px';
        news.style.width = sw.offsetWidth + 'px';
        hc.appendChild(news);
        // Même espace au-dessus (barre de recherche) et en dessous (raccourcis Noël, Coffrets cadeaux…)
        var centrer = function () {
          var haut = sw.getBoundingClientRect().bottom;
          var cible = document.querySelector('.abc-navbar__link') || document.querySelector('.abc-quick .abc-chip') || document.querySelector('.abc-quick') || hc.parentNode;
          var bas = cible === hc.parentNode ? cible.getBoundingClientRect().bottom : cible.getBoundingClientRect().top;
          if (cible.classList && (cible.classList.contains('abc-chip') || cible.classList.contains('abc-navbar__link'))) {   // on vise le texte « Noël », pas la marge du bouton
            var r = document.createRange(); r.selectNodeContents(cible); bas = r.getBoundingClientRect().top;
          }
          var h = news.getBoundingClientRect().height;
          news.style.top = Math.round(haut + (bas - haut - h) / 2 - hc.getBoundingClientRect().top) + 'px';
        };
        centrer();
        window.addEventListener('load', centrer);
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(centrer);
      } else {
        // Mobile et tablette : bandeau sous la barre du logo
        var quick = document.querySelector('.abc-quick');
        if (quick) quick.parentNode.insertBefore(news, quick);
        else header.parentNode.insertBefore(news, header.nextSibling);
      }
    }

    // 2 bis. Icônes Facebook et Instagram en haut de page
    var top = document.querySelector('#header .header-top .container') || document.querySelector('#header .header-top');
    if (top && !document.querySelector('.abc-social-top')) {
      var box = el('div', 'abc-social-top');
      SOCIAL.forEach(function (n) {
        var a = el('a', 'abc-social abc-social--' + n[2], '<span>' + n[0] + '</span>');
        a.href = n[1]; a.target = '_blank'; a.rel = 'noopener'; a.title = n[0] + ' ABC Terroirs'; a.setAttribute('aria-label', n[0] + ' ABC Terroirs');
        box.appendChild(a);
      });
      top.appendChild(box);
    }
    // Pied de page : ajouter Facebook s'il n'est pas configuré dans le module « Liens réseaux sociaux »
    var socialUl = document.querySelector('#footer .block-social ul');
    if (socialUl && !socialUl.querySelector('li.facebook')) {
      var li = el('li', 'facebook', '<a href="' + SOCIAL[0][1] + '" target="_blank" rel="noopener"><span>Facebook</span></a>');
      socialUl.insertBefore(li, socialUl.firstChild);
    }

    // 2 ter. Nos 3 boutiques : en bas de toutes les pages, et sur la page « Magasins »
    var fc = document.querySelector('#footer .footer-container');
    if (fc && page !== 'stores' && !document.querySelector('.abc-stores')) {
      var sec = el('section', 'abc-stores', '<h2>Nos 3 boutiques à Nantes</h2><div class="abc-stores__grid">' + BOUTIQUES.map(carteBoutique).join('') + '</div>');
      fc.parentNode.insertBefore(sec, fc);
    }
    if (page === 'stores') {
      var main = document.querySelector('#main .page-content, #main');
      if (main && !main.querySelector('.abc-stores--page')) {
        var sp = el('section', 'abc-stores abc-stores--page', '<h2>Nos 3 boutiques</h2><div class="abc-stores__grid">' + BOUTIQUES.map(carteBoutique).join('') + '</div>');
        main.insertBefore(sp, main.firstChild);
        [...main.children].forEach(function (c) { if (c !== sp && !c.matches('h1, header, .page-header')) c.style.display = 'none'; });
      }
    }

    // 2 quater. Photos des dégustations (page « Dégustations sur mesure » et fiches « 1 place séance dégustation »)
    var isDeg = body.classList.contains('category-id-162') || (page === 'product' && /s[ée]ance/i.test((document.querySelector('h1') || {}).textContent || ''));
    if (isDeg && !document.querySelector('.abc-photos')) {
      var IMG = (document.querySelector('link[href*="abcdesign/views/css"]') || {}).href || '';
      IMG = IMG.replace(/views\/css\/[^/?]+.*$/, 'views/img/');
      var gal = el('section', 'abc-photos', '<h2>Nos dégustations en images</h2><p>Une soirée de dégustation de whiskies et de rhums chez Spi &amp; Bi, en octobre 2026.</p>' +
        '<div class="abc-photos__grid"><img src="' + IMG + 'degustation-1.jpg" alt="Participants levant leur verre lors d\'une dégustation chez Spi & Bi" loading="lazy">' +
        '<img src="' + IMG + 'degustation-2.jpg" alt="Animateur présentant une bouteille lors d\'une dégustation chez Spi & Bi" loading="lazy"></div>');
      var anchor = page === 'product' ? document.querySelector('.product-tabcontent, .tabs, #product-description') : document.querySelector('#js-product-list-header, .block-category, #category-description');
      if (anchor) (page === 'product' ? anchor.parentNode.insertBefore(gal, anchor) : anchor.parentNode.insertBefore(gal, anchor.nextSibling));
    }

    // 3. Accueil : boutons sous le texte de présentation + blocs par budget
    if (page === 'index') {
      // Diaporama sur ordinateur : version large et basse de la diapositive de Noël (même design, moins haute).
      // Sur mobile, l'image d'origine (presque carrée) reste mieux lisible.
      if (window.innerWidth >= 768) {
        var IMGS = ((document.querySelector('link[href*="abcdesign/views/css"]') || {}).href || '').replace(/views\/css\/[^/?]+.*$/, 'views/img/');
        document.querySelectorAll('img[src*="diapo-accueil-noel"], img[data-src*="diapo-accueil-noel"]').forEach(function (im) {
          im.src = IMGS + 'diapo-noel-large.jpg';
          if (im.getAttribute('data-src')) im.setAttribute('data-src', IMGS + 'diapo-noel-large.jpg');
        });
        document.body.classList.add('abc-slider-bas');
      }
      var intro = document.querySelector('#czbannercmsblock .container');
      if (intro && !intro.querySelector('.abc-cta-row')) {
        var row = el('div', 'abc-cta-row',
          '<a class="abc-btn abc-btn--main" href="' + BASE + '3-coffrets-gourmands">Voir tous les coffrets</a>' +
          '<a class="abc-btn abc-btn--ghost" href="' + BASE + '172-idees-cadeaux-noel">Idées cadeaux de Noël</a>' +
          '<a class="abc-btn abc-btn--ghost" href="' + BASE + '165-demande-de-devis-remises-commerciales#devis">Composer un coffret sur mesure</a>');
        intro.appendChild(row);

        var budgets = el('section', 'abc-budgets');
        budgets.appendChild(el('h2', 'abc-budgets__title', 'Un coffret pour chaque budget'));
        var grid = el('div', 'abc-budgets__grid');
        BUDGETS.forEach(function (b, i) {
          var a = el('a', 'abc-budget' + (i === BUDGETS.length - 1 ? ' abc-budget--custom' : ''),
            '<strong>' + esc(b[0]) + '</strong>' + (b[1] ? '<span>' + esc(b[1]) + '</span>' : ''));
          a.href = BASE + b[2];
          grid.appendChild(a);
        });
        budgets.appendChild(grid);
        var block = document.getElementById('czbannercmsblock');
        block.parentNode.insertBefore(budgets, block.nextSibling);

        // Bloc « Dégustations » de l'accueil
        var IMGD = ((document.querySelector('link[href*="abcdesign/views/css"]') || {}).href || '').replace(/views\/css\/[^/?]+.*$/, 'views/img/');
        var deg = el('section', 'abc-deg-home',
          '<div class="abc-deg-home__img"><img src="' + IMGD + 'degustation-1.jpg" alt="Dégustation de whiskies et de rhums chez Spi & Bi" loading="lazy"></div>' +
          '<div class="abc-deg-home__txt"><p class="abc-deg-home__k">Dégustations &amp; ateliers</p>' +
          '<h2>Venez déguster avec nous</h2>' +
          '<p>Whiskies, rhums, gins, bières… 1 à 2 heures entre amis, en famille ou entre collègues.</p>' +
          '<div class="abc-cta-row abc-cta-row--left"><a class="abc-btn abc-btn--main" href="' + BASE + '162-degustations-sur-mesure-">Voir les dégustations</a></div></div>');
        budgets.parentNode.insertBefore(deg, budgets.nextSibling);

      }
    }

    // 4 bis. Tout en bas : avis Google des boutiques
    var pied = document.getElementById('footer');
    if (pied && page !== 'cart' && page !== 'order' && !document.querySelector('.abc-avis')) {
      var cartes = AVIS_GOOGLE.map(function (a) {
        var pct = Math.round(parseFloat(a[2].replace(',', '.')) / 5 * 100);
        return '<div class="abc-avis__carte"><p class="abc-avis__nom">' + esc(a[0]) + '</p><p class="abc-avis__adr">' + esc(a[1]) + '</p>' +
          '<p class="abc-avis__note"><strong>' + a[2] + '</strong><span class="abc-etoiles" role="img" aria-label="' + a[2] + ' sur 5"><span style="width:' + pct + '%"></span></span></p>' +
          '<p class="abc-avis__liens"><a href="https://search.google.com/local/reviews?placeid=' + a[3] + '" target="_blank" rel="noopener">Lire les avis</a>' +
          '<a href="https://search.google.com/local/writereview?placeid=' + a[3] + '" target="_blank" rel="noopener">Donner mon avis</a></p></div>';
      }).join('');
      var cites = AVIS_CITES.map(function (c) {
        return '<figure class="abc-avis__cite"><blockquote>« ' + esc(c[0]) + ' »</blockquote><figcaption>' + esc(c[1]) + ' · ' + esc(c[2]) + ' · avis Google</figcaption></figure>';
      }).join('');
      var bloc = el('section', 'abc-avis',
        '<div class="abc-avis__inner"><div class="abc-avis__tete"><h2>Nos clients en parlent</h2><p>Les notes de nos trois boutiques sur Google.</p></div>' +
        '<div class="abc-avis__cartes">' + cartes + '</div>' + (cites ? '<div class="abc-avis__cites">' + cites + '</div>' : '') + '</div>');
      pied.parentNode.insertBefore(bloc, pied);
    }

    // 4. Avant le pied de page : bandeau « sur mesure / entreprises » (sauf panier)
    var footer = document.getElementById('footer');
    if (footer && page !== 'cart' && !document.querySelector('.abc-cta-band')) {
      var band = el('section', 'abc-cta-band',
        '<div class="abc-cta-band__inner">' +
          '<div class="abc-cta-band__text">' +
            '<h2>Un coffret sur mesure, pour offrir ou pour votre entreprise ?</h2>' +
            '<p>Dites-nous votre budget et vos envies : nous le confectionnons sur mesure dans nos boutiques de la place Saint-Pierre et de la rue Franklin, à Nantes.</p>' +
          '</div>' +
          '<div class="abc-cta-band__actions">' +
            '<a class="abc-btn abc-btn--light" href="' + BASE + '165-demande-de-devis-remises-commerciales#devis">Demander un devis</a>' +
            '<a class="abc-btn abc-btn--outline-light" href="tel:+33240897626">Appeler le ' + TEL + '</a>' +
          '</div>' +
        '</div>');
      footer.parentNode.insertBefore(band, footer);
    }

    // 5. Fiche produit : rappel sur mesure sous le bouton « Ajouter au panier »
    if (page === 'product') {
      var add = document.querySelector('.product-add-to-cart');
      if (add && !document.querySelector('.abc-product-help')) {
        // Dégustation : rappeler qu'après l'achat, la date se choisit par téléphone
        var help = isDeg
          ? el('div', 'abc-product-help abc-product-help--deg',
            '<strong>Comment réserver ?</strong><ol class="abc-steps"><li>Achetez vos places en ligne.</li><li>Choisissez votre date : <a href="tel:+33255547980">02 55 54 79 80</a>, <a href="mailto:abc3ladmirault@yahoo.com">e-mail</a> ou <a href="' + BASE + 'nous-contacter">message</a>.</li></ol>')
          : el('p', 'abc-product-help',
            'Envie d\'un coffret personnalisé ou d\'une commande pour votre entreprise ? ' +
            '<a href="' + BASE + 'nous-contacter">Contactez-nous</a> ou appelez le <a href="tel:+33240897626">' + TEL + '</a>.');
        add.parentNode.insertBefore(help, add.nextSibling);
      }
    }

    // 6. Page de résultats de recherche : proposer les rayons en haut (la recherche renvoie parfois des produits approchants sans rapport)
    if (page === 'search') {
      var products = document.getElementById('products');
      if (products && !document.querySelector('.abc-search-help')) {
        var tips = el('div', 'abc-search-help',
          '<p><strong>Vous ne trouvez pas votre bonheur ?</strong> Parcourez nos rayons, ou <a href="' + BASE + 'nous-contacter">demandez-nous conseil</a> : nous avons encore plus de références en magasin.</p>');
        var list = el('div', 'abc-quick__inner');
        LIENS_RAPIDES.forEach(function (l) {
          var a = el('a', 'abc-chip', esc(l[0])); a.href = BASE + l[1]; list.appendChild(a);
        });
        tips.appendChild(list);
        products.parentNode.insertBefore(tips, products);
      }
    }
  });

  // 7. Tri, filtres et pages de la liste des produits : le thème remonte tout en haut de la page
  //    après chaque mise à jour (window.scrollTo(0, 0) dans theme.js). On replace la page sur le
  //    début de la liste, juste sous l'en-tête s'il reste collé en haut de l'écran.
  function versLaListe() {
    var cible = document.getElementById('js-product-list-top') || document.getElementById('products');
    if (!cible) return;
    var haut = 0;
    document.querySelectorAll('#header, #header *').forEach(function (e) {
      var pos = getComputedStyle(e).position;
      if (pos === 'fixed' || pos === 'sticky') {
        var r = e.getBoundingClientRect();
        if (r.top <= 0 && r.bottom > haut && r.height < window.innerHeight / 2) haut = r.bottom;
      }
    });
    window.scrollTo(0, Math.max(0, cible.getBoundingClientRect().top + window.pageYOffset - haut - 12));
  }
  function brancherTri() {
    if (window.prestashop && typeof window.prestashop.on === 'function') {
      window.prestashop.on('updateProductList', function () { setTimeout(versLaListe, 50); });
    }
  }
  // 10. Page « Demande de devis » (catégorie 165) : formulaire guidé, envoyé à commercial@abcterroirs.com
  //     par controllers/front/devis.php (copie gardée dans data/devis.csv)
  function formulaireDevis() {
    if (!document.body.classList.contains('category-id-165') || document.getElementById('devis')) return;
    var cible = document.querySelector('#category-description') || document.querySelector('.block-category');
    if (!cible) return;
    var opts = function (name, list, type) {
      return list.map(function (v, i) {
        return '<label class="abc-choix"><input type="' + (type || 'radio') + '" name="' + name + '" value="' + esc(v) + '"' + (i === 0 && type !== 'checkbox' ? ' required' : '') + '><span>' + esc(v) + '</span></label>';
      }).join('');
    };
    var sec = el('section', 'abc-devis');
    sec.id = 'devis';
    sec.innerHTML =
      '<form class="abc-devis__form" novalidate>' +
        '<h2>Votre demande de devis</h2>' +
        '<fieldset><legend>Votre projet</legend>' + opts('projet', ['Cadeaux clients', 'Cadeaux salariés / CSE', 'Séminaire ou événement', 'Mariage', 'Autre']) + '</fieldset>' +
        '<div class="abc-devis__row">' +
          '<label class="abc-champ">Nombre de coffrets<input type="number" name="nombre" min="1" inputmode="numeric" required placeholder="Ex. 25"></label>' +
          '<label class="abc-champ">Date souhaitée<input type="text" name="date" placeholder="Ex. semaine du 15 décembre"></label>' +
        '</div>' +
        '<fieldset><legend>Budget par coffret</legend>' + opts('budget', ['Moins de 25 €', '25 à 50 €', '50 à 100 €', 'Plus de 100 €', 'À définir ensemble']) + '</fieldset>' +
        '<fieldset><legend>Réception</legend>' + opts('reception', ['Retrait en boutique', 'Livraison à une adresse', 'Expédition à plusieurs destinataires']) + '</fieldset>' +
        '<fieldset><legend>Préférences <small>(facultatif)</small></legend>' + opts('pref', ['Avec alcool', 'Sans alcool', 'Sans porc', 'Sucré', 'Salé', '100 % local'], 'checkbox') + '</fieldset>' +
        '<div class="abc-devis__row">' +
          '<label class="abc-champ">Entreprise<input type="text" name="entreprise" autocomplete="organization"></label>' +
          '<label class="abc-champ">Nom et prénom *<input type="text" name="nom" autocomplete="name" required></label>' +
        '</div>' +
        '<div class="abc-devis__row">' +
          '<label class="abc-champ">E-mail *<input type="email" name="email" autocomplete="email" required></label>' +
          '<label class="abc-champ">Téléphone<input type="tel" name="tel" autocomplete="tel"></label>' +
        '</div>' +
        '<label class="abc-champ">Un mot sur votre projet <small>(facultatif)</small><textarea name="message" rows="4" placeholder="Thème, contraintes, logo, message à joindre…"></textarea></label>' +
        '<label class="abc-hp" aria-hidden="true">Site web<input type="text" name="site_web" tabindex="-1" autocomplete="off"></label>' +
        '<button type="submit" class="abc-btn abc-btn--main">Envoyer ma demande</button>' +
        '<p class="abc-devis__msg" role="status" aria-live="polite"></p>' +
        '<p class="abc-devis__rgpd">Vos coordonnées servent uniquement à répondre à votre demande.</p>' +
      '</form>' +
      '<aside class="abc-devis__aside"><h3>Vous préférez en parler&nbsp;?</h3><p>Davy Lechardour<br><a href="tel:+33240897626">02 40 89 76 26</a><br><a href="tel:+33663402330">06 63 40 23 30</a><br><a href="mailto:commercial@abcterroirs.com">commercial@abcterroirs.com</a></p><p>Ou passez nous voir : 5 place Saint-Pierre, Nantes.</p></aside>';
    cible.parentNode.insertBefore(sec, cible.nextSibling);
    var form = sec.querySelector('form'), msg = sec.querySelector('.abc-devis__msg'), t0 = Math.floor(Date.now() / 1000);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var fd = new FormData(form);
      fd.append('preferences', [].map.call(form.querySelectorAll('input[name=pref]:checked'), function (c) { return c.value; }).join(', '));
      fd.append('token', (window.prestashop && prestashop.static_token) || '');
      fd.append('t0', t0);
      var btn = form.querySelector('button'); btn.disabled = true; btn.textContent = 'Envoi en cours…'; msg.className = 'abc-devis__msg';
      fetch(BASE + 'index.php?fc=module&module=abcdesign&controller=devis', { method: 'POST', body: fd, credentials: 'same-origin' })
        .then(function (r) { return r.json(); })
        .then(function (j) {
          if (j.ok) {
            form.innerHTML = '<h2>Merci, votre demande est envoyée</h2><p>Nous revenons vers vous avec une proposition. Pour toute question : <a href="tel:+33240897626">02 40 89 76 26</a>.</p>';
          } else { msg.textContent = j.message; msg.className += ' is-err'; btn.disabled = false; btn.textContent = 'Envoyer ma demande'; }
        })
        .catch(function () { msg.textContent = 'L\'envoi a échoué. Appelez-nous au 02 40 89 76 26 ou écrivez à commercial@abcterroirs.com.'; msg.className += ' is-err'; btn.disabled = false; btn.textContent = 'Envoyer ma demande'; });
    });
    if (location.hash === '#devis') setTimeout(function () { sec.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 300);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', formulaireDevis); else formulaireDevis();

  // 9. Textes du thème restés en anglais dans les listes de produits (retraduits aussi après un tri ou un filtre)
  function traduireListe() {
    document.querySelectorAll('#js-product-list-top div, .products-selection div, .products-selection p, nav.pagination div, nav.pagination p').forEach(function (e) {
      if (e.children.length) return;
      var m = e.textContent.match(/Affichage de (\d+)-(\d+) of (\d+) élément\(s\)/);
      if (m) e.textContent = m[3] === '1' ? '1 produit' : 'Produits ' + m[1] + ' à ' + m[2] + ' sur ' + m[3];
    });
    document.querySelectorAll('.products-sort-order a, .products-sort-order .select-title').forEach(function (a) {
      a.childNodes.forEach(function (t) {
        if (t.nodeType === 3) t.textContent = t.textContent.replace('Reference, A to Z', 'Référence, de A à Z').replace('Reference, Z to A', 'Référence, de Z à A');
      });
    });
    document.querySelectorAll('#grid a, #list a').forEach(function (a) {
      var fr = a.closest('#grid') ? 'Affichage en grille' : 'Affichage en liste';
      a.title = fr; a.setAttribute('aria-label', fr);
    });
  }
  function brancherTraduction() {
    traduireListe();
    if (window.prestashop && typeof window.prestashop.on === 'function') window.prestashop.on('updateProductList', function () { setTimeout(traduireListe, 60); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', brancherTraduction); else brancherTraduction();

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', brancherTri); else brancherTri();

  // 8. Catégorie sans sous-catégories (ex. Martinique), ouverte depuis un lien du site :
  //    on arrive directement sur les produits au lieu du haut de la page.
  function arriverSurLesProduits() {
    if (!document.body.classList.contains('page-category') || document.getElementById('subcategories')) return;
    if (location.hash || window.pageYOffset > 50) return;
    if (!document.referrer || document.referrer.indexOf(location.host) === -1) return;
    var nav = window.performance && performance.getEntriesByType ? performance.getEntriesByType('navigation')[0] : null;
    if (nav && nav.type !== 'navigate') return;   // pas sur « actualiser » ni « retour »
    var titre = document.querySelector('#main .block-category h1, #main h1');
    if (!titre || !document.getElementById('js-product-list-top')) return;
    // une barre peut rester collée en haut de l'écran (en-tête sur mobile) : on la compte
    var hautColle = function () {
      var h = 0;
      document.querySelectorAll('#header, #header *').forEach(function (e) {
        var pos = getComputedStyle(e).position;
        if (pos !== 'fixed' && pos !== 'sticky') return;
        var r = e.getBoundingClientRect();
        if (r.top <= 1 && r.height > 0 && r.height < window.innerHeight / 2 && r.bottom > h) h = r.bottom;
      });
      return h;
    };
    // sur mobile, la barre du logo se colle en haut (avec une petite animation) : on réserve sa hauteur
    var barreMobile = window.innerWidth < 992 ? ((document.querySelector('#header .header-top') || {}).offsetHeight || 0) : 0;
    var cible = function () {
      return window.pageYOffset + titre.getBoundingClientRect().top - Math.max(hautColle(), barreMobile) - 12;
    };
    // pas d'animation si l'appareil demande moins de mouvements (réglage d'accessibilité)
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) { window.scrollTo(0, Math.max(0, cible())); return; }
    // défilement doux (accélère puis ralentit) ; la cible est recalculée à chaque image,
    // ce qui absorbe en douceur les changements de taille de l'en-tête pendant le mouvement
    var depart = window.pageYOffset, debut = null, duree = 900, stop = false;
    var annuler = function () { stop = true; };   // l'utilisateur touche l'écran ou la molette : on le laisse faire
    ['wheel', 'touchstart', 'keydown', 'mousedown'].forEach(function (ev) { window.addEventListener(ev, annuler, { passive: true, once: true }); });
    var adoucir = function (t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };
    var image = function (now) {
      if (stop) return;
      if (debut === null) debut = now;
      var t = Math.min(1, (now - debut) / duree);
      var y = Math.max(0, depart + (cible() - depart) * adoucir(t));
      try { window.scrollTo({ top: y, behavior: 'instant' }); } catch (e) { window.scrollTo(0, y); }
      if (t < 1) requestAnimationFrame(image);
    };
    requestAnimationFrame(image);
  }
  var lancerArrivee = function () { setTimeout(arriverSurLesProduits, 150); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', lancerArrivee); else lancerArrivee();
})();
