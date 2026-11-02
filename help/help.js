// Trovelo Help: search, the article's device tabs, its table of contents
// and the "Was this helpful?" answer. Every page works without it.
(function () {
  'use strict';

  // ── Every article in every language, written by scripts/build_help.py.
  // <index>
  var TOPICS = {
    "getting-started": ["i-sparkles", "#E3EDFF", "#2774FD"],
    "board-cards": ["i-board", "#FFE5E6", "#E23136"],
    "map-routes": ["i-map", "#FDEBD9", "#E65200"],
    "flights-transport": ["i-plane", "#E2E9FF", "#2947A0"],
    "expenses": ["i-card", "#E0F5F0", "#2A8572"],
    "plan-together": ["i-people", "#EFE6FE", "#7440C0"],
    "weather-packing": ["i-weather", "#DDF5FB", "#0377BE"],
    "guides-someday": ["i-compass", "#FBEFFF", "#C130B7"],
    "my-spots": ["i-globe", "#FEE4EE", "#C1195B"],
    "widgets-watch-calendar": ["i-watch", "#D6F0F5", "#057E97"],
    "mac-ai-plan": ["i-mac", "#ECECF1", "#1D1D1F"],
    "icloud-privacy-pro": ["i-lock", "#FFF3CC", "#8A6100"]
  };
  var LANGS = {
    en: {
      topics: {"getting-started": "Getting started", "board-cards": "Board & cards", "map-routes": "Map & routes", "flights-transport": "Flights & transport", "expenses": "Expenses", "plan-together": "Plan together", "weather-packing": "Weather & packing", "guides-someday": "Guides & Someday", "my-spots": "My Spots & medals", "widgets-watch-calendar": "Widgets, Watch & Calendar", "mac-ai-plan": "Mac & AI Plan", "icloud-privacy-pro": "iCloud, privacy & Pro"},
      words: {"Nothing yet for “{q}”.": "Nothing yet for “{q}”.", "Ask me on {link} and I’ll answer.": "Ask me on {link} and I’ll answer.", "Soon": "Soon"},
      articles: [
        ["Create your first trip", "getting-started", "/help/create-your-first-trip/", "create new trip start plan first trip dates city destination demo trip"],
        ["Trips with more than one city", "getting-started", "/help/trips-with-more-than-one-city/", "multi city several cities two destinations add city road trip itinerary more than one"],
        ["Add places to your days", "board-cards", "/help/add-places-to-your-days/", "add place sight restaurant search apple maps card day plus new"],
        ["Move a card to another day", "board-cards", "/help/move-a-card-to-another-day/", "move card day change date reschedule another day unplanned drag pick a date"],
        ["How full is my day?", "board-cards", "/help/how-full-is-my-day/", "busy day easy day doesn't fit time left pace hours bar duration how long full"],
        ["Every kind of card", "board-cards", "/help/every-kind-of-card/", "category kind type card stay food place flight train ticket museum beach change category"],
        ["Notes, files and photos", "board-cards", "/help/notes-files-and-photos/", "note notes file pdf photo ticket attach document camera photo library day note"],
        ["Ideas without a day", "board-cards", "/help/unplanned-ideas-without-a-day/", "unplanned ideas no day later tray maybe wishlist undecided"],
        ["Confirmation numbers", "board-cards", "/help/confirmation-numbers/", "confirmation number booking reference code pnr reservation copy hotel flight door code"],
        ["Change the order of your day", "board-cards", "/help/change-the-order-of-your-day/", "order reorder sort day drag move up down sequence first last"],
        ["Optimize a day’s route", "map-routes", "/help/optimize-a-days-route/", "optimize route shortest order distance save time lock pin day map"],
        ["What’s nearby", "map-routes", "/help/whats-nearby/", "nearby around map food coffee restaurant bar sights atm pharmacy supermarket find a place"],
        ["Drop a pin on the map", "map-routes", "/help/drop-a-pin-on-the-map/", "pin drop map long press hold address spot add location custom"],
        ["Add a flight with layovers", "flights-transport", "/help/add-a-flight-with-layovers/", "flight add plane layover stop connection airline terminal gate airport time zone"],
        ["Trains, buses and ferries", "flights-transport", "/help/trains-buses-and-ferries/", "train bus ferry coach seat platform station rail change transfer ticket shinkansen"],
        ["Import a booking from an email", "flights-transport", "/help/import-a-booking-from-an-email/", "import booking email confirmation pdf screenshot scan flight hotel rental car ticket read"],
        ["Log an expense", "expenses", "/help/log-an-expense/", "expense log spend cost money paid budget total category csv spreadsheet export"],
        ["See costs in your own money", "expenses", "/help/see-costs-in-your-own-money/", "currency exchange rate convert home currency local money dollars euros yen total"],
        ["Split costs with your group", "expenses", "/help/split-costs-with-your-group/", "split costs group share bill owe settle up friends family who paid balance splitwise"],
        ["Invite someone to your trip", "plan-together", "/help/invite-someone-to-your-trip/", "invite share trip together friends family partner collaborate plan together icloud"],
        ["Can view or can edit?", "plan-together", "/help/can-view-or-can-edit/", "permission view edit read only remove person leave trip stop sharing owner"],
        ["What stays private", "plan-together", "/help/what-stays-private/", "privacy private shared not shared home address packing documents spending data icloud servers"],
        ["Your packing list", "weather-packing", "/help/your-packing-list/", "packing list pack suitcase luggage checklist items bag clothes documents"],
        ["Plugs and voltage", "weather-packing", "/help/plugs-and-voltage/", "plug socket outlet adapter voltage power type a type c type g charger travel adapter"],
        ["Typical weather and live forecast", "weather-packing", "/help/typical-weather-and-live-forecast/", "weather forecast temperature rain typical climate average apple weather umbrella trip days"],
        ["Paste a list from a blog", "guides-someday", "/help/paste-a-list-from-a-blog/", "paste list blog chatgpt gemini claude notes import many places at once bulk"],
        ["Start a trip from a guide", "guides-someday", "/help/start-a-trip-from-a-guide/", "guides itinerary ready made template trip idea road trip copy start date route"],
        ["Save places for someday", "guides-someday", "/help/save-places-for-someday/", "someday save for later wishlist bucket list places want to go bookmark saved ideas"],
        ["Add places you’ve been", "my-spots", "/help/add-places-youve-been/", "my spots visited countries cities map travel map pins been there world scratch map"],
        ["Find past trips in your photos", "my-spots", "/help/find-past-trips-in-your-photos/", "photos photo library scan location gps past trips visited countries automatically year import"],
        ["Medals, from First Stepper up", "my-spots", "/help/medals-from-first-stepper-up/", "medals ranks badges levels first stepper apex traveler countries count achievements travel life share"],
        ["Your trip on the Lock Screen", "widgets-watch-calendar", "/help/your-flight-on-the-lock-screen/", "lock screen live activity dynamic island boarding pass flight gate countdown now next widget"],
        ["Trovelo on Apple Watch", "widgets-watch-calendar", "/help/trovelo-on-apple-watch/", "apple watch smart stack wrist watchos live activity digital crown now next"],
        ["Your trip in Calendar", "widgets-watch-calendar", "/help/your-trip-in-calendar/", "calendar apple calendar ical events agenda schedule sync flights hotels all-day"],
        ["Trovelo on Mac", "mac-ai-plan", "/help/trovelo-on-mac/", "mac macbook desktop app sync board columns keyboard shortcuts sidebar"],
        ["Plan with your AI assistant", "mac-ai-plan", "/help/plan-with-your-ai-assistant/", "ai assistant claude chatgpt codex cursor mcp plan by asking connect artificial intelligence"],
        ["Drag cards between days", "mac-ai-plan", "/help/drag-cards-between-days/", "mac drag drop card column day board keyboard compact card size weather"],
        ["How iCloud sync works", "icloud-privacy-pro", "/help/how-icloud-sync-works/", "icloud sync devices iphone ipad mac not syncing apple id storage full account backup"],
        ["Back up all your trips", "icloud-privacy-pro", "/help/back-up-all-your-trips/", "backup back up restore export download file zip new iphone transfer data copy save"],
        ["What Trovelo Pro includes", "icloud-privacy-pro", "/help/what-trovelo-pro-includes/", "pro price upgrade premium subscription one-time purchase free plan limit unlimited restore purchases redeem code"]
      ]
    },
    es: {
      topics: {"getting-started": "Primeros pasos", "board-cards": "Tablero y tarjetas", "map-routes": "Mapa y rutas", "flights-transport": "Vuelos y transporte", "expenses": "Gastos", "plan-together": "Planear juntos", "weather-packing": "Clima y equipaje", "guides-someday": "Guías y Algún día", "my-spots": "Mis lugares y medallas", "widgets-watch-calendar": "Widgets, Watch y Calendario", "mac-ai-plan": "Mac y plan con IA", "icloud-privacy-pro": "iCloud, privacidad y Pro"},
      words: {"Nothing yet for “{q}”.": "Todavía no hay nada sobre «{q}».", "Ask me on {link} and I’ll answer.": "Pregúntame en {link} y te respondo.", "Soon": "Pronto"},
      articles: [
        ["Crea tu primer viaje", "getting-started", "/es/help/create-your-first-trip/", "crear nuevo viaje empezar planear planificar primer viaje fechas ciudad destino viaje de ejemplo demo itinerario"],
        ["Viajes con más de una ciudad", "getting-started", "/es/help/trips-with-more-than-one-city/", "varias ciudades multidestino dos destinos añadir ciudad ruta road trip itinerario recorrido más de una ciudad"],
        ["Añade lugares a tus días", "board-cards", "/es/help/add-places-to-your-days/", "añadir agregar lugar sitio monumento restaurante buscar apple maps mapas tarjeta día más nuevo"],
        ["Mueve una tarjeta a otro día", "board-cards", "/es/help/move-a-card-to-another-day/", "mover tarjeta día cambiar fecha cambiar de día reprogramar otro día sin planificar arrastrar elegir una fecha"],
        ["¿Cómo de lleno está mi día?", "board-cards", "/es/help/how-full-is-my-day/", "día apretado día tranquilo no cabe todo tiempo libre ritmo del día horas barra duración cuánto dura lleno"],
        ["Todos los tipos de tarjeta", "board-cards", "/es/help/every-kind-of-card/", "categoría tipo clase tarjeta alojamiento hotel comida lugar vuelo tren entrada museo playa cambiar categoría"],
        ["Notas, archivos y fotos", "board-cards", "/es/help/notes-files-and-photos/", "nota notas archivo pdf foto entrada billete adjuntar documento cámara fototeca nota del día"],
        ["Ideas sin día", "board-cards", "/es/help/unplanned-ideas-without-a-day/", "sin planificar ideas sin día más tarde bandeja quizás pendiente lista de deseos sin decidir"],
        ["Códigos de reserva", "board-cards", "/es/help/confirmation-numbers/", "código de reserva número de confirmación localizador referencia pnr reserva copiar hotel vuelo código de la puerta"],
        ["Cambia el orden de tu día", "board-cards", "/es/help/change-the-order-of-your-day/", "orden reordenar ordenar día arrastrar mover subir bajar secuencia primero último cambiar el orden"],
        ["Optimiza la ruta de un día", "map-routes", "/es/help/optimize-a-days-route/", "optimizar ruta orden más corto distancia ahorrar tiempo candado bloquear fijar día mapa recorrido"],
        ["Qué hay cerca", "map-routes", "/es/help/whats-nearby/", "cerca alrededor mapa comida café cafetería restaurante bar lugares de interés cajero farmacia supermercado buscar un lugar"],
        ["Pon un pin en el mapa", "map-routes", "/es/help/drop-a-pin-on-the-map/", "pin chincheta marcador mapa mantener pulsado dirección sitio añadir ubicación punto personalizado"],
        ["Añade un vuelo con escalas", "flights-transport", "/es/help/add-a-flight-with-layovers/", "vuelo añadir avión escala conexión aerolínea número de vuelo terminal puerta aeropuerto zona horaria"],
        ["Trenes, autobuses y ferris", "flights-transport", "/es/help/trains-buses-and-ferries/", "tren autobús bus ferri ferry barco coche asiento vía andén estación transbordo billete ave shinkansen"],
        ["Importa una reserva desde un correo", "flights-transport", "/es/help/import-a-booking-from-an-email/", "importar reserva correo email confirmación pdf captura de pantalla escanear vuelo hotel coche de alquiler billete leer"],
        ["Registra un gasto", "expenses", "/es/help/log-an-expense/", "gasto registrar apuntar gastar coste dinero pagado presupuesto total categoría csv hoja de cálculo excel exportar"],
        ["Los precios, en tu moneda", "expenses", "/es/help/see-costs-in-your-own-money/", "moneda divisa tipo de cambio convertir conversor moneda de origen dinero local dólares euros yenes total"],
        ["Reparte los gastos con tu grupo", "expenses", "/es/help/split-costs-with-your-group/", "repartir dividir gastos grupo compartir cuenta deber deuda pagar pagado saldar cuentas amigos familia quién pagó saldo splitwise tricount"],
        ["Invita a alguien a tu viaje", "plan-together", "/es/help/invite-someone-to-your-trip/", "invitar compartir viaje juntos amigos familia pareja colaborar planear juntos viaje compartido icloud"],
        ["¿Puede ver o puede editar?", "plan-together", "/es/help/can-view-or-can-edit/", "permiso permisos ver editar solo lectura quitar persona salir del viaje dejar de compartir propietario"],
        ["Lo que queda en privado", "plan-together", "/es/help/what-stays-private/", "privacidad privado compartido no se comparte casa dirección equipaje documentos gastos datos icloud servidores"],
        ["Tu lista de equipaje", "weather-packing", "/es/help/your-packing-list/", "lista de equipaje maleta equipaje hacer la maleta checklist cosas bolsa ropa documentos qué llevar"],
        ["Enchufes y voltaje", "weather-packing", "/es/help/plugs-and-voltage/", "enchufe toma de corriente clavija adaptador voltaje corriente tipo a tipo c tipo g cargador adaptador de viaje"],
        ["Clima habitual y previsión real", "weather-packing", "/es/help/typical-weather-and-live-forecast/", "tiempo clima previsión pronóstico temperatura lluvia clima habitual media apple weather paraguas días del viaje"],
        ["Pega una lista de un blog", "guides-someday", "/es/help/paste-a-list-from-a-blog/", "pegar lista blog chatgpt gemini claude notas importar muchos lugares a la vez de golpe varios"],
        ["Empieza un viaje desde una guía", "guides-someday", "/es/help/start-a-trip-from-a-guide/", "guías guía itinerario ya hecho plantilla idea de viaje road trip ruta copiar fecha de inicio recorrido"],
        ["Guarda lugares para algún día", "guides-someday", "/es/help/save-places-for-someday/", "algún día guardar para más tarde lista de deseos bucket list lugares a los que quiero ir favoritos marcador guardados ideas"],
        ["Añade los lugares donde has estado", "my-spots", "/es/help/add-places-youve-been/", "mis lugares países visitados ciudades mapa mapa de viajes pins chinchetas he estado mundo mapa para rascar"],
        ["Encuentra viajes pasados en tus fotos", "my-spots", "/es/help/find-past-trips-in-your-photos/", "fotos fototeca escanear analizar ubicación gps viajes pasados países visitados automáticamente año importar"],
        ["Medallas, de First Stepper en adelante", "my-spots", "/es/help/medals-from-first-stepper-up/", "medallas rangos insignias niveles first stepper apex traveler países contador logros vida viajera compartir"],
        ["Tu viaje en la pantalla de bloqueo", "widgets-watch-calendar", "/es/help/your-flight-on-the-lock-screen/", "pantalla de bloqueo actividad en directo dynamic island tarjeta de embarque vuelo puerta cuenta atrás ahora siguiente widget"],
        ["Trovelo en el Apple Watch", "widgets-watch-calendar", "/es/help/trovelo-on-apple-watch/", "apple watch reloj pila inteligente smart stack muñeca watchos actividad en directo digital crown ahora siguiente"],
        ["Tu viaje en Calendario", "widgets-watch-calendar", "/es/help/your-trip-in-calendar/", "calendario apple calendar ical eventos agenda horario sincronizar vuelos hoteles todo el día"],
        ["Trovelo en el Mac", "mac-ai-plan", "/es/help/trovelo-on-mac/", "mac macbook ordenador escritorio app sincronizar tablero columnas atajos de teclado barra lateral"],
        ["Planifica con tu asistente de IA", "mac-ai-plan", "/es/help/plan-with-your-ai-assistant/", "asistente de ia inteligencia artificial claude chatgpt codex cursor mcp planear pidiéndolo conectar"],
        ["Arrastra tarjetas entre días", "mac-ai-plan", "/es/help/drag-cards-between-days/", "mac arrastrar soltar tarjeta columna día tablero teclado compacto tamaño de tarjeta clima"],
        ["Cómo funciona la sincronización con iCloud", "icloud-privacy-pro", "/es/help/how-icloud-sync-works/", "icloud sincronizar sincronización dispositivos iphone ipad mac no sincroniza cuenta de apple id de apple almacenamiento lleno copia"],
        ["Copia de seguridad de todos tus viajes", "icloud-privacy-pro", "/es/help/back-up-all-your-trips/", "copia de seguridad backup restaurar exportar descargar archivo zip iphone nuevo transferir pasar datos guardar"],
        ["Qué incluye Trovelo Pro", "icloud-privacy-pro", "/es/help/what-trovelo-pro-includes/", "pro precio mejorar premium suscripción pago único compra única plan gratuito gratis límite ilimitado restaurar compras canjear código"]
      ]
    }
  };
  // </index>
  var L = LANGS[document.documentElement.lang] || LANGS.en;

  var fold = function (s) {
    return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’']/g, '');
  };
  var esc = function (s) {
    return s.replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
  };
  var INDEX = L.articles.map(function (a) {
    var topic = L.topics[a[1]];
    return { title: a[0], topic: topic, tile: TOPICS[a[1]], href: a[2], hay: fold(a[0] + ' ' + topic + ' ' + a[3]) };
  });

  function search(q) {
    var words = fold(q).split(/\s+/).filter(Boolean);
    if (!words.length) return [];
    return INDEX.filter(function (a) {
      return words.every(function (w) { return a.hay.indexOf(w) !== -1; });
    }).sort(function (a, b) { return (b.href ? 1 : 0) - (a.href ? 1 : 0); }).slice(0, 8);
  }

  function row(a) {
    var t = a.tile;
    var tile = '<span class="tile" style="--tile:' + t[1] + ';--ac:' + t[2] + '"><span class="sf ' + t[0] + '"></span></span>';
    var text = '<span class="res-t"><b>' + esc(a.title) + '</b><small>' + esc(a.topic) + '</small></span>';
    if (a.href) return '<a class="res" href="' + a.href + '">' + tile + text + '<span class="sf i-chev" style="width:12px;height:12px;color:#9AA0AE"></span></a>';
    return '<div class="res soon">' + tile + text + '<span class="soon-tag">' + esc(L.words.Soon) + '</span></div>';
  }

  // ── Search on the Help home.
  var input = document.getElementById('q');
  var box = document.getElementById('results');
  if (input && box) {
    var render = function () {
      var q = input.value.trim();
      if (!q) { box.hidden = true; input.setAttribute('aria-expanded', 'false'); return; }
      var hits = search(q);
      box.innerHTML = hits.length
        ? hits.map(row).join('')
        : '<div class="res-empty">' + L.words['Nothing yet for “{q}”.'].replace('{q}', esc(q)) + '<span>' +
          L.words['Ask me on {link} and I’ll answer.'].replace('{link}', '<a href="https://www.reddit.com/r/trovelo/">r/trovelo</a>') + '</span></div>';
      box.hidden = false;
      input.setAttribute('aria-expanded', 'true');
    };
    input.addEventListener('input', render);
    input.addEventListener('focus', render);
    input.addEventListener('keydown', function (e) {
      var links = box.querySelectorAll('a.res');
      if (e.key === 'ArrowDown' && links.length) { e.preventDefault(); links[0].focus(); }
      if (e.key === 'Enter') {
        e.preventDefault();
        if (links.length) location.href = links[0].getAttribute('href');
      }
      if (e.key === 'Escape') { input.value = ''; render(); }
    });
    box.addEventListener('keydown', function (e) {
      var links = Array.prototype.slice.call(box.querySelectorAll('a.res'));
      var i = links.indexOf(document.activeElement);
      if (e.key === 'ArrowDown' && i < links.length - 1) { e.preventDefault(); links[i + 1].focus(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); (i > 0 ? links[i - 1] : input).focus(); }
      if (e.key === 'Escape') { input.focus(); }
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.search')) { box.hidden = true; input.setAttribute('aria-expanded', 'false'); }
    });
    document.addEventListener('keydown', function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); input.focus(); input.select(); }
    });
    var start = new URLSearchParams(location.search).get('q');
    if (start) {
      input.value = start;
      document.getElementById('search').scrollIntoView({ block: 'center' });
      input.focus();
      render();
    }
  }

  // ── Article: iPhone & iPad / Mac tabs. Without the script both show.
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
  var tocs = document.querySelectorAll('[data-toc]');
  var pick = function (id) {
    tabs.forEach(function (t) {
      var on = t.getAttribute('aria-controls') === id;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
    Array.prototype.forEach.call(tocs, function (n) { n.hidden = n.getAttribute('data-toc') !== id; });
    watch();
  };
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { pick(t.getAttribute('aria-controls')); });
    t.addEventListener('keydown', function (e) {
      var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!d) return;
      var next = tabs[(i + d + tabs.length) % tabs.length];
      next.focus();
      pick(next.getAttribute('aria-controls'));
    });
  });

  // ── Article: light up the step being read in the table of contents.
  var observer = null;
  function watch() {
    if (observer) observer.disconnect();
    if (!('IntersectionObserver' in window)) return;
    var links = document.querySelectorAll('.toc:not([hidden]) a');
    if (!links.length) return;
    var byId = {};
    Array.prototype.forEach.call(links, function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        Array.prototype.forEach.call(links, function (a) { a.classList.remove('on'); });
        var a = byId[en.target.id];
        if (a) a.classList.add('on');
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    Object.keys(byId).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }
  if (tabs.length) pick(tabs[0].getAttribute('aria-controls'));

  // ── Article: "Was this helpful?"
  var vote = document.querySelector('.vote');
  if (vote) {
    vote.querySelectorAll('[data-vote]').forEach(function (b) {
      b.addEventListener('click', function () {
        var v = b.getAttribute('data-vote');
        vote.querySelector('.vote-q').hidden = true;
        vote.querySelector('[data-answer="' + v + '"]').hidden = false;
        vote.querySelectorAll('.mascot img').forEach(function (img) {
          img.hidden = img.getAttribute('data-mood') !== v;
        });
        vote.querySelector('[data-answer="' + v + '"]').focus();
      });
    });
  }
})();
