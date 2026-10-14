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

  // Réseaux sociaux (en haut de page, et Facebook ajouté en bas s'il manque)
  var SOCIAL = [
    ['Facebook', 'https://www.facebook.com/AbcTerroirs/', 'facebook'],
    ['Instagram', 'https://www.instagram.com/abcterroirs/', 'instagram']
  ];

  // Les 3 boutiques (horaires : site, PagesJaunes et Mappy, octobre 2026)
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
    ['Moins de 25 €', 'Petites attentions', '30-selection-moins-de-25'],
    ['25 à 50 €', 'Les incontournables', '31-selection-25-a-50'],
    ['Plus de 50 €', 'Pour faire sensation', '32-selection-plus-de-50'],
    ['Sur mesure', 'Vous choisissez, on compose', 'nous-contacter']
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
    if (header && !document.querySelector('.abc-quick')) {
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
      var menuBar = header.querySelector('.header-top-inner');
      if (menuBar && window.innerWidth >= 992) menuBar.parentNode.insertBefore(bar, menuBar);   // ordinateur : entre logo et menu
      else header.parentNode.insertBefore(bar, header.nextSibling);                              // mobile : sous l'en-tête
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
      var intro = document.querySelector('#czbannercmsblock .container');
      if (intro && !intro.querySelector('.abc-cta-row')) {
        var row = el('div', 'abc-cta-row',
          '<a class="abc-btn abc-btn--main" href="' + BASE + '3-coffrets-gourmands">Voir tous les coffrets</a>' +
          '<a class="abc-btn abc-btn--ghost" href="' + BASE + '172-idees-cadeaux-noel">Idées cadeaux de Noël</a>' +
          '<a class="abc-btn abc-btn--ghost" href="' + BASE + 'nous-contacter">Composer un coffret sur mesure</a>');
        intro.appendChild(row);

        var budgets = el('section', 'abc-budgets');
        budgets.appendChild(el('h2', 'abc-budgets__title', 'Un coffret pour chaque budget'));
        var grid = el('div', 'abc-budgets__grid');
        BUDGETS.forEach(function (b, i) {
          var a = el('a', 'abc-budget' + (i === BUDGETS.length - 1 ? ' abc-budget--custom' : ''),
            '<strong>' + esc(b[0]) + '</strong><span>' + esc(b[1]) + '</span>');
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
            '<a class="abc-btn abc-btn--light" href="' + BASE + 'nous-contacter">Demander un devis</a>' +
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
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', brancherTri); else brancherTri();
})();
