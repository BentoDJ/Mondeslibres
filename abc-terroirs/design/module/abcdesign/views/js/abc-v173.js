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
  var NOUVEAUTE = 'Remises dégressives : <strong>-5 %</strong> dès 300 € TTC, <strong>-10 %</strong> dès 600 € TTC.';

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
  // Source : avis Google de Spi & Bi, relayés sur boucherie-mailhet.fr/abc-terroirs-spi-bi/ (relevé le 15/10/2026)
  var AVIS_CITES = [
    ['Très grand choix de bières et spiritueux, dégustation... L\'accueil du dirigeant est très agréable et il donne de bons conseils. À connaître !', 'Gilles L.', 'Spi & Bi'],
    ['Super conseil, accueil et un très large choix autant sur les bières que les spiritueux. La bonne humeur est au rendez-vous.', 'Evie V.', 'Spi & Bi'],
    ['Que des supers produits ! Accueil toujours sympathique par de vrais connaisseurs', 'Tino R.', 'Spi & Bi']
  ];

  // pos : coordonnées GPS (OpenStreetMap, 19/10/2026) pour la carte
  var BOUTIQUES = [
    { nom: 'ABC Terroirs Saint-Pierre', sous: 'Épicerie fine & cave (boutique historique)', adr: '5 place Saint-Pierre, 44000 Nantes', tel: '02 40 89 76 26', pos: [47.21787, -1.55145],
      h: [['Lundi – vendredi', '9h30 – 19h30'], ['Samedi', '9h30 – 20h'], ['Dimanche', 'Fermé']] },
    { nom: 'ABC Terroirs Franklin', sous: 'Épicerie fine & cave', adr: '9 rue Franklin, 44000 Nantes', tel: '09 86 22 05 28', pos: [47.21441, -1.56340],
      h: [['Lundi', '11h – 14h / 15h – 19h30'], ['Mardi – samedi', '10h – 14h / 15h – 19h30'], ['Dimanche', 'Fermé']] },
    { nom: 'Spi & Bi', sous: 'Cave à spiritueux, bières et cidres', adr: '5 place Paul-Émile Ladmirault, 44000 Nantes', tel: '02 55 54 79 80', pos: [47.21365, -1.56409],
      h: [['Mardi – samedi', '10h30 – 14h / 15h – 19h30'], ['Dimanche – lundi', 'Fermé']] }
  ];
  function carteBoutique(bq) {
    var tel = bq.tel.replace(/\s/g, '');
    return '<div class="abc-store"><h3>' + esc(bq.nom) + '</h3><p class="abc-store__sous">' + esc(bq.sous) + '</p>' +
      '<p><a href="https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(bq.adr) + '" target="_blank" rel="noopener">' + esc(bq.adr) + '</a></p>' +
      '<table>' + bq.h.map(function (l) { return '<tr><td>' + esc(l[0]) + '</td><td>' + esc(l[1]) + '</td></tr>'; }).join('') + '</table>' +
      '<p><a href="tel:+33' + tel.slice(1) + '">' + esc(bq.tel) + '</a></p></div>';
  }

  // Carte des 3 boutiques (Leaflet + OpenStreetMap, sans cookies ni clé). Survol ou toucher d'un repère = petite fiche.
  // Si la carte ne se charge pas, on revient aux 3 pavés.
  function blocBoutiques(titre, cls) {
    var sec = el('section', 'abc-stores ' + (cls || ''), '<h2>' + titre + '</h2>' +
      '<div class="abc-map" role="region" aria-label="Carte de nos boutiques à Nantes"></div>' +
      '<ul class="abc-map__liste">' + BOUTIQUES.map(function (bq, i) {
        return '<li><button type="button" data-i="' + i + '"><strong>' + esc(bq.nom) + '</strong><span>' + esc(bq.adr.replace(/, 44000 Nantes$/, '')) + '</span></button></li>';
      }).join('') + '</ul>');
    setTimeout(activerCartes, 0);
    return sec;
  }
  // Active les cartes présentes dans la page. Rappelée après chargement : certains thèmes recopient le contenu
  // de la page (la copie n'aurait plus de surveillance), donc on cherche les cartes dans le DOM à chaque fois.
  function activerCartes() {
    [].forEach.call(document.querySelectorAll('.abc-stores .abc-map'), function (zone) {
      if (zone.abcSuivi || zone.classList.contains('leaflet-container')) return; // propriété JS : non recopiée avec le HTML
      zone.abcSuivi = true;
      var sec = zone.closest('.abc-stores');
      function repli() {
        if (!sec.querySelector('.abc-stores__grid')) {
          zone.remove(); var li = sec.querySelector('.abc-map__liste'); if (li) li.remove();
          sec.insertAdjacentHTML('beforeend', '<div class="abc-stores__grid">' + BOUTIQUES.map(carteBoutique).join('') + '</div>');
        }
      }
      function demarrer() {
        chargerLeaflet(function (ok) { if (!document.body.contains(zone)) return; if (ok) dessinerCarte(sec, zone); else repli(); });
      }
      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (e) { if (e[0].isIntersecting) { io.disconnect(); demarrer(); } }, { rootMargin: '600px' });
        io.observe(zone);
      } else demarrer();
    });
  }
  function cartesApresChargement() { activerCartes(); setTimeout(activerCartes, 1500); }
  if (document.readyState === 'complete') cartesApresChargement(); else window.addEventListener('load', cartesApresChargement);
  var leafletEtat = null, leafletAttente = [];
  function chargerLeaflet(cb) {
    if (window.L && window.L.map) return cb(true);
    leafletAttente.push(cb);
    if (leafletEtat) return;
    leafletEtat = 'charge';
    var base = ((document.querySelector('link[href*="abcdesign/views/css"]') || {}).href || '').replace(/views\/css\/[^/?]+.*$/, 'views/lib/leaflet/');
    var fin = function (ok) { leafletEtat = ok ? 'ok' : 'ko'; leafletAttente.splice(0).forEach(function (f) { f(ok); }); };
    if (!base) return fin(false);
    var css = document.createElement('link'); css.rel = 'stylesheet'; css.href = base + 'leaflet.css'; document.head.appendChild(css);
    var js = document.createElement('script'); js.src = base + 'leaflet.js'; js.async = true;
    js.onload = function () { fin(!!(window.L && window.L.map)); }; js.onerror = function () { fin(false); };
    document.head.appendChild(js);
  }
  function ficheCarte(bq) {
    var tel = bq.tel.replace(/\s/g, '');
    return '<div class="abc-pop"><strong class="abc-pop__nom">' + esc(bq.nom) + '</strong><span class="abc-pop__sous">' + esc(bq.sous) + '</span>' +
      '<span class="abc-pop__adr">' + esc(bq.adr) + '</span>' +
      '<table>' + bq.h.map(function (l) { return '<tr><td>' + esc(l[0]) + '</td><td>' + esc(l[1]) + '</td></tr>'; }).join('') + '</table>' +
      '<span class="abc-pop__liens"><a href="tel:+33' + tel.slice(1) + '">' + esc(bq.tel) + '</a>' +
      '<a href="https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(bq.nom + ', ' + bq.adr) + '" target="_blank" rel="noopener">Itinéraire</a></span></div>';
  }
  function dessinerCarte(sec, zone) {
    var L = window.L, tactile = window.matchMedia && matchMedia('(hover: none)').matches;
    var carte = L.map(zone, { scrollWheelZoom: false, dragging: !tactile, tap: true, zoomControl: true, attributionControl: true });
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>' }).addTo(carte);
    var reperes = BOUTIQUES.map(function (bq, i) {
      var m = L.marker(bq.pos, {
        icon: L.divIcon({ className: 'abc-pin', html: '<span><b>' + (i + 1) + '</b></span>', iconSize: [30, 38], iconAnchor: [15, 36], popupAnchor: [0, -34] }),
        title: bq.nom, alt: bq.nom, riseOnHover: true
      }).addTo(carte);
      m.bindPopup(ficheCarte(bq), { maxWidth: 280, minWidth: 220, autoPanPadding: [20, 20], className: 'abc-popup' });
      if (!tactile) m.on('mouseover', function () { m.openPopup(); });
      return m;
    });
    carte.fitBounds(L.latLngBounds(BOUTIQUES.map(function (b) { return b.pos; })), { padding: tactile ? [24, 24] : [40, 40], maxZoom: 16 });
    carte.attributionControl.setPrefix('<a href="https://leafletjs.com" target="_blank" rel="noopener">Leaflet</a>');
    [].forEach.call(sec.querySelectorAll('.abc-map__liste button'), function (bt) {
      var m = reperes[+bt.getAttribute('data-i')];
      bt.addEventListener('click', function () { m.openPopup(); });
      if (!tactile) bt.addEventListener('mouseenter', function () { m.openPopup(); });
    });
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
      var exemple = window.innerWidth < 992 ? 'Coffret, muscadet, whisky…' : 'Coffret, muscadet, whisky, petit beurre…';
      s.setAttribute('placeholder', exemple);
      s.setAttribute('aria-label', 'Rechercher un produit');
      // Le thème efface l'exemple dès qu'on touche le champ : on le remet, pour qu'on sache quoi taper
      s.addEventListener('focus', function () { setTimeout(function () { if (!s.getAttribute('placeholder')) s.setAttribute('placeholder', exemple); }, 0); });
      // Téléphone : en touchant la loupe, le champ s'ouvre et le clavier sort tout de suite
      var loupe = document.querySelector('#search_widget .search_button');
      if (loupe) loupe.addEventListener('click', function () {
        if (window.innerWidth >= 992) return;
        var boite = document.querySelector('#search_widget .search_toggle');
        if (boite && getComputedStyle(boite).display !== 'none') s.focus();
      });
      // Téléphone : les suggestions s'affichent sous la barre (et non par-dessus le champ), sur toute la largeur.
      // La bibliothèque repositionne la liste à chaque lettre tapée : on la surveille pour la remettre en place.
      var placerSuggestions = function () {
        if (window.innerWidth >= 992) return;
        var liste = document.querySelector('body > .ui-autocomplete');
        var boite = document.querySelector('#search_widget .search_toggle');
        if (!liste || !boite) return;
        var haut = Math.round(boite.getBoundingClientRect().bottom + window.pageYOffset) + 'px';
        if (liste.style.top !== haut) liste.style.top = haut;
        if (liste.style.left !== '0px') liste.style.left = '0px';
        if (liste.style.width !== '100%') liste.style.width = '100%';
      };
      var surveillerListe = function () {
        var liste = document.querySelector('body > .ui-autocomplete');
        if (!liste || liste.abcSuivi) return;
        liste.abcSuivi = true;
        new MutationObserver(placerSuggestions).observe(liste, { attributes: true, attributeFilter: ['style'] });
        placerSuggestions();
      };
      s.addEventListener('focus', surveillerListe);
      s.addEventListener('input', surveillerListe);
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
      var sec = blocBoutiques('Nos 3 boutiques à Nantes');
      fc.parentNode.insertBefore(sec, fc);
    }
    if (page === 'stores') {
      var main = document.querySelector('#main .page-content, #main');
      if (main && !main.querySelector('.abc-stores--page')) {
        var sp = blocBoutiques('Nos 3 boutiques', 'abc-stores--page');
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
          im.src = IMGS + 'diapo-noel-large-v2.jpg';
          if (im.getAttribute('data-src')) im.setAttribute('data-src', IMGS + 'diapo-noel-large-v2.jpg');
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
        return '<figure class="abc-avis__cite"><blockquote>« ' + esc(c[0]) + ' »</blockquote><figcaption><span class="abc-etoiles abc-etoiles--sm" role="img" aria-label="5 sur 5"><span style="width:100%"></span></span> ' + esc(c[1]) + ' · ' + esc(c[2]) + ' · avis Google</figcaption></figure>';
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

  // 11. Fiche produit : « Référence : » vide masquée (pour les navigateurs qui ne lisent pas :has en CSS)
  function referenceVide() {
    document.querySelectorAll('.product-reference').forEach(function (r) {
      var v = r.querySelector('[itemprop="sku"]');
      r.classList.toggle('abc-vide', !v || !v.textContent.trim());
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', referenceVide); else referenceVide();

  // 12. Petites corrections de textes du thème et du pied de page (orthographe, majuscules)
  var CORRECTIONS = [
    ["Ajouter À Ma Liste D'envies", "Ajouter à ma liste d'envies"],
    ['Détails Du Produit', 'Détails du produit'],
    ['A propos de notre enseigne', 'À propos de notre enseigne'],
    ["Conditions d'utilisation", 'Conditions générales de vente'],
    ['5 Place St Pierre', '5 place Saint-Pierre'],
    ['place ladmirault', 'place Ladmirault'],
    ['ATTENTION, MAGASINS DANGEREUX POUR LES GOURMANDS !', 'Attention, magasins dangereux pour les gourmands\u00a0!'],
    ['Produits Connexes', 'Vous aimerez aussi'],
    ['Vous Aimerez Aussi', 'Vous aimerez aussi']
  ];
  function corrigerTextes(racine) {
    var w = document.createTreeWalker(racine || document.body, NodeFilter.SHOW_TEXT), n, t;
    while ((n = w.nextNode())) {
      t = n.nodeValue;
      if (!t || t.length > 200) continue;
      for (var i = 0; i < CORRECTIONS.length; i++) {
        if (t.indexOf(CORRECTIONS[i][0]) > -1) { t = t.split(CORRECTIONS[i][0]).join(CORRECTIONS[i][1]); }
      }
      if (t !== n.nodeValue) n.nodeValue = t;
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { corrigerTextes(); }); else corrigerTextes();
  if (window.prestashop && typeof window.prestashop.on === 'function') window.prestashop.on('updatedProduct', function () { setTimeout(corrigerTextes, 60); });
  if (window.prestashop && typeof window.prestashop.on === 'function') window.prestashop.on('updatedProduct', function () { setTimeout(referenceVide, 50); });

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
  // 13. Panier : barre de progression vers les remises dégressives (règles panier « REMISE COMMERCIALE »,
  //     sur le sous-total des produits TTC). Affichée sur la page panier et dans la fenêtre « Produit ajouté ».
  var PALIERS = [[300, 5], [600, 10]];   // [montant TTC, remise en %] : à garder identique aux règles panier
  var totalPanier = null;
  function euros(n) { return (Math.round(n * 100) / 100).toFixed(2).replace('.', ',').replace(',00', '') + ' €'; }
  function lireTotal(cart) {
    try { return cart.subtotals.products.amount; } catch (e) { return null; }
  }
  function blocRemise(total) {
    if (!total || total <= 0) return null;
    var max = PALIERS[PALIERS.length - 1][0], atteint = null, suivant = null;
    PALIERS.forEach(function (p) { if (total >= p[0]) atteint = p; else if (!suivant) suivant = p; });
    var txt;
    if (!atteint) txt = 'Plus que <strong>' + euros(suivant[0] - total) + '</strong> pour profiter de <strong>-' + suivant[1] + ' %</strong> sur votre commande.';
    else if (suivant) txt = 'Remise de <strong>-' + atteint[1] + ' %</strong> appliquée. Plus que <strong>' + euros(suivant[0] - total) + '</strong> pour passer à <strong>-' + suivant[1] + ' %</strong>.';
    else txt = 'Remise de <strong>-' + atteint[1] + ' %</strong> appliquée à votre commande.';
    var d = el('div', 'abc-palier' + (atteint ? ' is-ok' : ''),
      '<p class="abc-palier__txt">' + txt + '</p>' +
      '<div class="abc-palier__barre" role="progressbar" aria-valuemin="0" aria-valuemax="' + max + '" aria-valuenow="' + Math.round(Math.min(total, max)) + '" aria-label="Progression vers les remises">' +
      '<span class="abc-palier__fond" style="width:' + Math.min(100, total / max * 100).toFixed(1) + '%"></span>' +
      PALIERS.map(function (p) { return '<span class="abc-palier__cran' + (total >= p[0] ? ' is-ok' : '') + '" style="left:' + (p[0] / max * 100) + '%"><i></i><em>-' + p[1] + ' % · ' + p[0] + ' €</em></span>'; }).join('') +
      '</div>');
    return d;
  }
  function afficherRemise() {
    if (totalPanier === null) return;
    // page panier : en haut du récapitulatif
    // (placée juste au-dessus du récapitulatif, que le thème redessine à chaque changement de quantité)
    var resume = document.querySelector('#cart .cart-grid-right .cart-summary');
    if (resume) {
      document.querySelectorAll('#cart .cart-grid-right > .abc-palier').forEach(function (a) { a.remove(); });
      var b = blocRemise(totalPanier); if (b) resume.parentNode.insertBefore(b, resume);
    }
    // fenêtre « Produit ajouté avec succès »
    var modal = document.querySelector('#blockcart-modal .cart-content');
    if (modal) {
      var a2 = modal.querySelector('.abc-palier'); if (a2) a2.remove();
      var b2 = blocRemise(totalPanier);
      if (b2) { var actions = modal.querySelector('.cart-content-btn'); if (actions) modal.insertBefore(b2, actions); else modal.appendChild(b2); }
    }
  }
  function brancherRemise() {
    if (window.prestashop && window.prestashop.cart) totalPanier = lireTotal(window.prestashop.cart);
    afficherRemise();
    if (!window.prestashop || typeof window.prestashop.on !== 'function') return;
    window.prestashop.on('updateCart', function (e) {
      var t = e && e.resp && e.resp.cart ? lireTotal(e.resp.cart) : null;
      if (t !== null) { totalPanier = t; setTimeout(afficherRemise, 30); }
    });
    window.prestashop.on('updatedCart', function () { setTimeout(afficherRemise, 30); });
    // la fenêtre « Produit ajouté » arrive après coup : on la complète dès qu'elle apparaît
    new MutationObserver(function (l) {
      for (var i = 0; i < l.length; i++) for (var j = 0; j < l[i].addedNodes.length; j++) {
        var n = l[i].addedNodes[j];
        if (n.nodeType === 1 && (n.id === 'blockcart-modal' || (n.querySelector && n.querySelector('#blockcart-modal')))) { afficherRemise(); return; }
      }
    }).observe(document.body, { childList: true });
  }
  ready(brancherRemise);

  // 14. Fiche produit : « Vous aimerez aussi », 4 produits de la même catégorie, de prix proche.
  //     Chargé seulement quand on approche du bas de la fiche (rien de plus à télécharger sinon).
  function vousAimerezAussi() {
    var body = document.body;
    if (!body.classList.contains('page-product') || document.querySelector('.abc-suggest')) return;
    var idProduit = ((body.className.match(/\bproduct-id-(\d+)\b/) || [])[1]);
    // catégorie la plus précise du fil d'Ariane (avant le produit lui-même)
    var liens = [].slice.call(document.querySelectorAll('.breadcrumb a[href]')).map(function (a) { return a.href; })
      .filter(function (h) { return /\/\d+-[^\/]+$/.test(h.split(/[?#]/)[0]) && !/\.html/.test(h); });
    var url = liens.length ? liens[liens.length - 1] : null;
    if (!url) {
      var idCat = ((body.className.match(/\bproduct-id-category-(\d+)\b/) || [])[1]);
      if (!idCat || idCat === '1' || idCat === '2') return;
      url = BASE + 'index.php?id_category=' + idCat + '&controller=category';
    }
    var ancre = document.querySelector('#main .product-tabcontent') || document.querySelector('#main .abc-photos') || document.querySelector('#main .product-container');
    if (!ancre || !idProduit) return;
    var prixEl = document.querySelector('.product-prices [itemprop="price"], .product-prices .current-price-value, .current-price [content]');
    var prix = prixEl ? parseFloat(prixEl.getAttribute('content')) : NaN;

    var sec = el('section', 'abc-suggest', '<h2>Vous aimerez aussi</h2><div class="abc-suggest__rail"></div>');
    ancre.parentNode.insertBefore(sec, ancre.nextSibling);
    var rail = sec.querySelector('.abc-suggest__rail');

    var charger = function () {
      fetch(url + (url.indexOf('?') === -1 ? '?' : '&') + 'resultsPerPage=36', { headers: { Accept: 'application/json' }, credentials: 'same-origin' })
        .then(function (r) { return r.json(); })
        .then(function (j) {
          var liste = (j.products || []).filter(function (p) { return String(p.id_product) !== idProduit && p.cover; });
          if (!isNaN(prix)) liste.sort(function (a, b) { return Math.abs(a.price_amount - prix) - Math.abs(b.price_amount - prix); });
          // pas deux fois la même gamme (ex. 50 cl et 70 cl du même gin)
          var gamme = function (n) { return n.toLowerCase().split(/[\s–-]+/).slice(0, 2).join(' '); };
          var nomActuel = (document.querySelector('#main h1') || {}).textContent || '';
          var vues = {}; vues[gamme(nomActuel.trim())] = 1;
          var choix = [], reste = [];
          liste.forEach(function (p) { var g = gamme(p.name); if (!vues[g] && choix.length < 4) { vues[g] = 1; choix.push(p); } else reste.push(p); });
          while (choix.length < 4 && reste.length) choix.push(reste.shift());
          if (!choix.length) { sec.remove(); return; }
          rail.innerHTML = choix.map(function (p) {
            var img = (p.cover.bySize && (p.cover.bySize.home_default || p.cover.bySize.medium_default)) || p.cover.medium || p.cover.large;
            var ancien = p.has_discount ? '<s>' + esc(p.regular_price) + '</s> ' : '';
            return '<a class="abc-carte" href="' + esc(p.url) + '">' +
              '<span class="abc-carte__img"><img src="' + esc(img.url) + '" alt="' + esc(p.name) + '" width="' + (img.width || 250) + '" height="' + (img.height || 250) + '" loading="lazy" decoding="async"></span>' +
              '<span class="abc-carte__nom">' + esc(p.name) + '</span>' +
              '<span class="abc-carte__prix">' + ancien + esc(p.price) + '</span></a>';
          }).join('');
          requestAnimationFrame(function () { sec.classList.add('is-pret'); });
        })
        .catch(function () { sec.remove(); });
    };
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (e) { if (e[0].isIntersecting) { io.disconnect(); charger(); } }, { rootMargin: '700px 0px' });
      io.observe(sec);
    } else charger();
  }
  ready(vousAimerezAussi);

  // 15. Catégories de produits : le petit texte de présentation passe sous la liste des produits,
  //     pour qu'on arrive directement sur les produits (le texte reste lu par Google).
  var TEXTE_EN_BAS = [7, 15, 16, 20, 21, 22, 27, 28, 29, 171, 182, 183, 184, 186, 187, 188, 189, 190, 191, 192, 193, 194, 197, 205];
  function texteSousLesProduits() {
    if (!document.body.classList.contains('page-category')) return;
    var id = +((document.body.className.match(/\bcategory-id-(\d+)\b/) || [])[1]);
    if (TEXTE_EN_BAS.indexOf(id) === -1) return;
    var d = document.getElementById('category-description');
    var liste = document.getElementById('products') || document.getElementById('js-product-list');
    if (!d || !liste || !d.textContent.trim()) return;
    var bloc = el('div', 'abc-cat-texte');
    bloc.appendChild(d);
    liste.parentNode.insertBefore(bloc, liste.nextSibling);
    document.body.classList.add('abc-texte-en-bas');
  }
  ready(texteSousLesProduits);

  // 16. Fiche produit : quantité avec de gros boutons − et + (les petites flèches du thème étaient trop petites au doigt),
  //     et sur téléphone un petit bandeau « Ajouté au panier » en bas de l'écran à la place de la grande fenêtre.
  function quantiteFacile() {
    var input = document.getElementById('quantity_wanted');
    if (!input || input.abcQte) return;
    input.abcQte = true;
    var conteneur = input.closest('.qty') || input.parentNode;
    if (!conteneur || conteneur.querySelector('.abc-qte-btn')) return;
    input.setAttribute('inputmode', 'numeric');
    input.setAttribute('pattern', '[0-9]*');
    var mini = function () { return Math.max(1, parseInt(input.getAttribute('min'), 10) || 1); };
    var changer = function (delta) {
      var v = (parseInt(input.value, 10) || mini()) + delta;
      input.value = Math.max(mini(), Math.min(999, v));
      if (window.jQuery) jQuery(input).trigger('change'); else input.dispatchEvent(new Event('change', { bubbles: true }));
    };
    var moins = el('button', 'abc-qte-btn abc-qte-btn--moins', '−');
    var plus = el('button', 'abc-qte-btn abc-qte-btn--plus', '+');
    moins.type = plus.type = 'button';
    moins.setAttribute('aria-label', 'Une bouteille de moins');
    plus.setAttribute('aria-label', 'Une bouteille de plus');
    moins.addEventListener('click', function () { changer(-1); });
    plus.addEventListener('click', function () { changer(1); });
    conteneur.classList.add('abc-qte');
    conteneur.insertBefore(moins, conteneur.firstChild);
    conteneur.appendChild(plus);
  }
  function bandeauPanier(nom, qte) {
    var vieux = document.querySelector('.abc-toast'); if (vieux) vieux.remove();
    var urlPanier = (window.prestashop && prestashop.urls && prestashop.urls.pages && prestashop.urls.pages.cart) || '/panier';
    var t = el('div', 'abc-toast', '<p><strong>Ajouté au panier</strong>' + (nom ? '<span>' + esc(nom) + (qte > 1 ? ' × ' + qte : '') + '</span>' : '') + '</p>' +
      '<a class="abc-toast__btn" href="' + urlPanier + (urlPanier.indexOf('?') > -1 ? '&' : '?') + 'action=show">Voir le panier</a>' +
      '<button type="button" class="abc-toast__fermer" aria-label="Fermer">×</button>');
    t.setAttribute('role', 'status');
    document.body.appendChild(t);
    requestAnimationFrame(function () { t.classList.add('is-visible'); });
    var fermer = function () { t.classList.remove('is-visible'); setTimeout(function () { t.remove(); }, 300); };
    t.querySelector('.abc-toast__fermer').addEventListener('click', fermer);
    setTimeout(fermer, 6000);
  }
  ready(function () {
    if (document.body.id !== 'product') return;
    quantiteFacile();
    // La zone « Ajouter au panier » est redessinée quand on change de déclinaison : on remet les boutons
    if (window.prestashop && prestashop.on) prestashop.on('updatedProduct', function () { setTimeout(quantiteFacile, 50); });
    if (window.jQuery) jQuery(document).on('show.bs.modal', '#blockcart-modal', function (e) {
      if (window.innerWidth >= 768) return;
      e.preventDefault();
      var m = this;
      var nom = ((m.querySelector('.product-name') || document.querySelector('h1')) || {}).textContent || '';
      var q = parseInt(((m.textContent || '').match(/Quantit[ée]\s*:\s*(\d+)/) || [])[1], 10) || 1;
      setTimeout(function () { if (m.parentNode) m.parentNode.removeChild(m); }, 0);
      bandeauPanier(nom.trim(), q);
    });
  });
  // 16 bis. Correctif : le thème (ancien) annonce « panier modifié » sans joindre la réponse du serveur, alors que
  //         PrestaShop 1.7.8 la lit (e.resp.cart) et plante : le panier changeait bien, mais l'écran ne se mettait
  //         jamais à jour (quantités, total, ligne supprimée). On complète l'annonce avant qu'elle soit lue.
  if (window.prestashop && typeof prestashop.emit === 'function' && !prestashop.abcEmitCorrige) {
    var emitOrigine = prestashop.emit;
    prestashop.emit = function (nom, evt) {
      if (nom === 'updateCart' && evt && typeof evt === 'object' && !evt.resp) evt.resp = { cart: prestashop.cart };
      return emitOrigine.apply(this, arguments);
    };
    prestashop.abcEmitCorrige = true;
  }

  // 17. Page panier : mêmes gros boutons − et + que sur la fiche produit. Ils actionnent les boutons d'origine
  //     (cachés), donc le panier se met à jour comme avant. À 1 bouteille, « − » retire le produit du panier.
  function quantitePanier() {
    [].forEach.call(document.querySelectorAll('.cart-overview input.js-cart-line-product-quantity'), function (input) {
      var conteneur = input.closest('.qty');
      if (!conteneur || conteneur.querySelector('.abc-qte-btn')) return;
      var ligne = input.closest('.cart-item') || conteneur;
      var nom = ((ligne.querySelector('.product-line-info .label') || {}).textContent || '').trim();
      input.setAttribute('inputmode', 'numeric');
      var moins = el('button', 'abc-qte-btn abc-qte-btn--moins', '−');
      var plus = el('button', 'abc-qte-btn abc-qte-btn--plus', '+');
      moins.type = plus.type = 'button';
      var majLibelle = function () {
        var un = (parseInt(input.value, 10) || 1) <= 1;
        moins.setAttribute('aria-label', un ? 'Retirer ' + nom + ' du panier' : 'Une bouteille de moins');
        moins.title = un ? 'Retirer du panier' : '';
      };
      majLibelle();
      plus.setAttribute('aria-label', 'Une bouteille de plus');
      // Le panier du thème réagit aux événements « touchspin.on.startupspin / startdownspin » du champ
      var declencher = function (nomEvt) { if (window.jQuery) jQuery(input).trigger(nomEvt); };
      plus.addEventListener('click', function () { declencher('touchspin.on.startupspin'); });
      moins.addEventListener('click', function () {
        if ((parseInt(input.value, 10) || 1) <= 1) {
          var r = ligne.querySelector('[data-link-action="delete-from-cart"]');
          if (r) { if (window.jQuery) jQuery(r).trigger('click'); else r.click(); }
          return;
        }
        declencher('touchspin.on.startdownspin');
      });
      input.addEventListener('change', majLibelle);
      conteneur.classList.add('abc-qte');
      conteneur.insertBefore(moins, conteneur.firstChild);
      conteneur.appendChild(plus);
    });
  }
  ready(function () {
    if (document.body.id !== 'cart') return;
    quantitePanier();
    // Le panier est redessiné après chaque changement : on remet les boutons
    var attente = null;
    new MutationObserver(function () { clearTimeout(attente); attente = setTimeout(quantitePanier, 60); })
      .observe(document.getElementById('main') || document.body, { childList: true, subtree: true });
  });
})();
