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
    "en": {
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
    "es": {
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
    },
    "de": {
      topics: {"getting-started": "Erste Schritte", "board-cards": "Board und Karten", "map-routes": "Karte und Routen", "flights-transport": "Flüge und Verkehr", "expenses": "Ausgaben", "plan-together": "Gemeinsam planen", "weather-packing": "Wetter und Gepäck", "guides-someday": "Guides und „Eines Tages“", "my-spots": "Meine Spots und Medaillen", "widgets-watch-calendar": "Widgets, Watch und Kalender", "mac-ai-plan": "Mac und KI-Planung", "icloud-privacy-pro": "iCloud, Datenschutz und Pro"},
      words: {"Nothing yet for “{q}”.": "Noch nichts zu „{q}“.", "Ask me on {link} and I’ll answer.": "Frag mich auf {link}, ich antworte dir.", "Soon": "Bald"},
      articles: [
        ["Deine erste Reise erstellen", "getting-started", "/de/help/create-your-first-trip/", "reise erstellen neue reise anlegen planen erste reise datum daten stadt reiseziel demo-reise beispielreise reiseplan"],
        ["Reisen mit mehreren Städten", "getting-started", "/de/help/trips-with-more-than-one-city/", "mehrere städte rundreise zwei reiseziele stadt hinzufügen route roadtrip reiseroute städtereise mehr als eine stadt"],
        ["Orte zu deinen Tagen hinzufügen", "board-cards", "/de/help/add-places-to-your-days/", "ort hinzufügen sehenswürdigkeit restaurant suchen apple karten karte tag plus neu eintragen planen"],
        ["Karte auf einen anderen Tag verschieben", "board-cards", "/de/help/move-a-card-to-another-day/", "karte verschieben tag ändern datum ändern umplanen verlegen anderer tag ungeplant ziehen datum wählen"],
        ["Wie voll ist mein Tag?", "board-cards", "/de/help/how-full-is-my-day/", "voller tag ruhiger tag passt nicht alles verbleibende zeit tagesrhythmus stunden leiste dauer wie lange zu voll zeitplan"],
        ["Alle Kartenarten", "board-cards", "/de/help/every-kind-of-card/", "kategorie art typ kartentyp karte unterkunft hotel essen ort flug zug ticket museum strand kategorie ändern"],
        ["Notizen, Dateien und Fotos", "board-cards", "/de/help/notes-files-and-photos/", "notiz notizen datei pdf foto ticket anhängen anhang dokument kamera fotomediathek tagesnotiz"],
        ["Ideen ohne Tag", "board-cards", "/de/help/unplanned-ideas-without-a-day/", "ungeplant ideen ohne tag später fach vielleicht wunschliste offen unentschieden sammeln"],
        ["Buchungsnummern", "board-cards", "/de/help/confirmation-numbers/", "buchungsnummer bestätigungsnummer buchungscode reservierungsnummer pnr reservierung kopieren hotel flug türcode"],
        ["Reihenfolge deines Tages ändern", "board-cards", "/de/help/change-the-order-of-your-day/", "reihenfolge ändern umsortieren sortieren tag ziehen verschieben nach oben nach unten abfolge erste letzte"],
        ["Route eines Tages optimieren", "map-routes", "/de/help/optimize-a-days-route/", "optimieren route reihenfolge kürzeste strecke entfernung zeit sparen schloss sperren fixieren tag karte rundgang"],
        ["Was ist in der Nähe?", "map-routes", "/de/help/whats-nearby/", "in der nähe umgebung karte essen kaffee café restaurant bar kneipe sehenswürdigkeiten geldautomat apotheke supermarkt ort suchen"],
        ["Stecknadel auf der Karte setzen", "map-routes", "/de/help/drop-a-pin-on-the-map/", "stecknadel pin markierung karte gedrückt halten lange drücken adresse ort hinzufügen standort eigener ort"],
        ["Flug mit Zwischenstopps hinzufügen", "flights-transport", "/de/help/add-a-flight-with-layovers/", "flug hinzufügen flugzeug zwischenstopp umsteigen anschlussflug airline fluggesellschaft flugnummer terminal gate flughafen zeitzone"],
        ["Züge, Busse und Fähren", "flights-transport", "/de/help/trains-buses-and-ferries/", "zug bahn bus fernbus fähre schiff wagen sitzplatz gleis bahnsteig bahnhof umstieg umsteigen ticket fahrkarte ice shinkansen"],
        ["Buchung aus einer E-Mail importieren", "flights-transport", "/de/help/import-a-booking-from-an-email/", "importieren buchung e-mail mail bestätigung buchungsbestätigung pdf screenshot scannen flug hotel mietwagen ticket auslesen"],
        ["Ausgabe erfassen", "expenses", "/de/help/log-an-expense/", "ausgabe erfassen eintragen ausgeben kosten geld bezahlt budget reisebudget summe kategorie csv tabelle excel exportieren"],
        ["Preise in deiner Währung", "expenses", "/de/help/see-costs-in-your-own-money/", "währung wechselkurs umrechnen währungsrechner heimatwährung landeswährung geld dollar euro yen summe"],
        ["Kosten in der Gruppe aufteilen", "expenses", "/de/help/split-costs-with-your-group/", "kosten aufteilen teilen gruppe rechnung schulden abrechnen bezahlen freunde familie wer hat bezahlt saldo gruppenkasse splitwise tricount"],
        ["Jemanden zu deiner Reise einladen", "plan-together", "/de/help/invite-someone-to-your-trip/", "einladen teilen reise gemeinsam zusammen freunde familie partner partnerin zusammenarbeiten gemeinsam planen geteilte reise icloud"],
        ["Ansehen oder bearbeiten?", "plan-together", "/de/help/can-view-or-can-edit/", "berechtigung rechte ansehen bearbeiten nur lesen person entfernen reise verlassen teilen beenden besitzer eigentümer"],
        ["Was privat bleibt", "plan-together", "/de/help/what-stays-private/", "datenschutz privat privatsphäre geteilt nicht geteilt zuhause adresse packliste dokumente ausgaben daten icloud server"],
        ["Deine Packliste", "weather-packing", "/de/help/your-packing-list/", "packliste packen koffer gepäck checkliste sachen tasche kleidung dokumente was mitnehmen"],
        ["Stecker und Spannung", "weather-packing", "/de/help/plugs-and-voltage/", "stecker steckdose adapter reiseadapter spannung volt strom typ a typ c typ f typ g ladegerät steckdosenadapter"],
        ["Typisches Wetter und aktuelle Vorhersage", "weather-packing", "/de/help/typical-weather-and-live-forecast/", "wetter vorhersage wettervorhersage temperatur regen typisches wetter klima durchschnitt apple weather regenschirm reisetage"],
        ["Liste aus einem Blog einfügen", "guides-someday", "/de/help/paste-a-list-from-a-blog/", "liste einfügen blog chatgpt gemini claude notizen importieren viele orte auf einmal mehrere orte gleichzeitig"],
        ["Reise aus einem Guide starten", "guides-someday", "/de/help/start-a-trip-from-a-guide/", "guides guide reiseführer reiseplan fertige reise vorlage reiseidee roadtrip route kopieren startdatum rundreise"],
        ["Orte für „Eines Tages“ merken", "guides-someday", "/de/help/save-places-for-someday/", "eines tages merken für später wunschliste bucket list orte wohin ich will favoriten lesezeichen gemerkt ideen"],
        ["Orte hinzufügen, an denen du warst", "my-spots", "/de/help/add-places-youve-been/", "meine spots besuchte länder städte karte reisekarte weltkarte stecknadeln pins dort gewesen welt rubbelkarte"],
        ["Vergangene Reisen in deinen Fotos finden", "my-spots", "/de/help/find-past-trips-in-your-photos/", "fotos fotomediathek scannen durchsuchen standort gps ortsdaten vergangene reisen besuchte länder automatisch jahr importieren"],
        ["Medaillen, ab First Stepper", "my-spots", "/de/help/medals-from-first-stepper-up/", "medaillen ränge abzeichen level stufen first stepper apex traveler länder zähler erfolge reiseleben teilen"],
        ["Deine Reise auf dem Sperrbildschirm", "widgets-watch-calendar", "/de/help/your-flight-on-the-lock-screen/", "sperrbildschirm live-aktivität live activity dynamic island bordkarte boardingpass flug gate countdown jetzt als nächstes widget"],
        ["Trovelo auf der Apple Watch", "widgets-watch-calendar", "/de/help/trovelo-on-apple-watch/", "apple watch uhr smartwatch smart stack handgelenk watchos live-aktivität digital crown jetzt als nächstes"],
        ["Deine Reise im Kalender", "widgets-watch-calendar", "/de/help/your-trip-in-calendar/", "kalender apple kalender ical termine terminkalender zeitplan synchronisieren flüge hotels ganztägig"],
        ["Trovelo auf dem Mac", "mac-ai-plan", "/de/help/trovelo-on-mac/", "mac macbook computer desktop app synchronisieren board spalten tastaturkurzbefehle tastenkürzel seitenleiste"],
        ["Mit deinem KI-Assistenten planen", "mac-ai-plan", "/de/help/plan-with-your-ai-assistant/", "ki assistent künstliche intelligenz claude chatgpt codex cursor mcp planen per anfrage verbinden ki-reiseplanung"],
        ["Karten zwischen Tagen ziehen", "mac-ai-plan", "/de/help/drag-cards-between-days/", "mac ziehen drag and drop karte spalte tag board tastatur kompakt kartengröße wetter"],
        ["So funktioniert die iCloud-Synchronisierung", "icloud-privacy-pro", "/de/help/how-icloud-sync-works/", "icloud synchronisieren synchronisierung sync geräte iphone ipad mac synchronisiert nicht apple account apple-id speicher voll backup"],
        ["Alle deine Reisen sichern", "icloud-privacy-pro", "/de/help/back-up-all-your-trips/", "backup sicherung datensicherung wiederherstellen exportieren herunterladen datei zip neues iphone übertragen daten umziehen sichern"],
        ["Was Trovelo Pro enthält", "icloud-privacy-pro", "/de/help/what-trovelo-pro-includes/", "pro preis upgrade premium abo abonnement einmalzahlung einmaliger kauf kostenlos gratis limit grenze unbegrenzt käufe wiederherstellen code einlösen"]
      ]
    },
    "fr": {
      topics: {"getting-started": "Premiers pas", "board-cards": "Tableau et cartes", "map-routes": "Plan et itinéraires", "flights-transport": "Vols et transports", "expenses": "Dépenses", "plan-together": "Planifier à plusieurs", "weather-packing": "Météo et valise", "guides-someday": "Guides et « Un jour »", "my-spots": "Mes lieux et médailles", "widgets-watch-calendar": "Widgets, Watch et Calendrier", "mac-ai-plan": "Mac et planification avec l’IA", "icloud-privacy-pro": "iCloud, confidentialité et Pro"},
      words: {"Nothing yet for “{q}”.": "Rien pour l’instant sur « {q} ».", "Ask me on {link} and I’ll answer.": "Pose-moi la question sur {link} et je te réponds.", "Soon": "Bientôt"},
      articles: [
        ["Crée ton premier voyage", "getting-started", "/fr/help/create-your-first-trip/", "créer nouveau voyage commencer planifier organiser premier voyage dates ville destination voyage de démo exemple itinéraire"],
        ["Voyages dans plusieurs villes", "getting-started", "/fr/help/trips-with-more-than-one-city/", "plusieurs villes multi-destinations deux destinations ajouter une ville road trip circuit itinéraire étapes plus d’une ville"],
        ["Ajoute des lieux à tes journées", "board-cards", "/fr/help/add-places-to-your-days/", "ajouter lieu endroit monument restaurant chercher rechercher apple maps plans carte jour plus nouveau"],
        ["Déplace une carte vers un autre jour", "board-cards", "/fr/help/move-a-card-to-another-day/", "déplacer carte jour changer de date changer de jour reporter décaler autre jour non planifié glisser choisir une date"],
        ["Ma journée est-elle bien remplie ?", "board-cards", "/fr/help/how-full-is-my-day/", "journée chargée journée tranquille tout ne rentre pas temps libre temps restant rythme heures barre durée combien de temps remplie emploi du temps"],
        ["Tous les types de cartes", "board-cards", "/fr/help/every-kind-of-card/", "catégorie type genre carte hébergement hôtel restaurant nourriture lieu vol train billet musée plage changer de catégorie"],
        ["Notes, fichiers et photos", "board-cards", "/fr/help/notes-files-and-photos/", "note notes fichier pdf photo billet ticket joindre pièce jointe document appareil photo photothèque note du jour"],
        ["Des idées sans jour", "board-cards", "/fr/help/unplanned-ideas-without-a-day/", "non planifié idées sans jour plus tard bac peut-être en attente liste d’envies pas encore décidé"],
        ["Codes de réservation", "board-cards", "/fr/help/confirmation-numbers/", "code de réservation numéro de confirmation référence pnr dossier réservation copier hôtel vol code de la porte"],
        ["Change l’ordre de ta journée", "board-cards", "/fr/help/change-the-order-of-your-day/", "ordre réorganiser trier réordonner journée glisser déplacer monter descendre séquence premier dernier changer l’ordre"],
        ["Optimise l’itinéraire d’une journée", "map-routes", "/fr/help/optimize-a-days-route/", "optimiser itinéraire trajet ordre plus court distance gagner du temps cadenas verrouiller bloquer journée plan parcours"],
        ["Ce qu’il y a autour", "map-routes", "/fr/help/whats-nearby/", "autour à proximité près d’ici plan carte manger café restaurant bar sites distributeur pharmacie supermarché trouver un lieu"],
        ["Place une épingle sur le plan", "map-routes", "/fr/help/drop-a-pin-on-the-map/", "épingle punaise repère marqueur plan carte appui long maintenir adresse endroit ajouter position point personnalisé"],
        ["Ajoute un vol avec escales", "flights-transport", "/fr/help/add-a-flight-with-layovers/", "vol ajouter avion escale correspondance compagnie aérienne numéro de vol terminal porte aéroport fuseau horaire"],
        ["Trains, bus et ferrys", "flights-transport", "/fr/help/trains-buses-and-ferries/", "train bus car autocar ferry bateau voiture siège place voie quai gare correspondance billet tgv shinkansen"],
        ["Importe une réservation depuis un e-mail", "flights-transport", "/fr/help/import-a-booking-from-an-email/", "importer réservation e-mail mail courriel confirmation pdf capture d’écran scanner vol hôtel voiture de location billet lire"],
        ["Note une dépense", "expenses", "/fr/help/log-an-expense/", "dépense noter enregistrer dépenser coût argent payé budget total catégorie frais csv tableur excel exporter"],
        ["Les prix dans ta devise", "expenses", "/fr/help/see-costs-in-your-own-money/", "devise monnaie taux de change convertir convertisseur devise principale argent local dollars euros yens total"],
        ["Partage les dépenses avec ton groupe", "expenses", "/fr/help/split-costs-with-your-group/", "partager diviser dépenses groupe partage frais addition devoir dette rembourser payé régler les comptes amis famille qui a payé solde tricount splitwise"],
        ["Invite quelqu’un à ton voyage", "plan-together", "/fr/help/invite-someone-to-your-trip/", "inviter partager voyage ensemble à plusieurs amis famille couple collaborer planifier ensemble voyage partagé icloud"],
        ["Peut voir ou peut modifier ?", "plan-together", "/fr/help/can-view-or-can-edit/", "permission droits accès voir modifier lecture seule retirer une personne quitter le voyage arrêter le partage propriétaire"],
        ["Ce qui reste privé", "plan-together", "/fr/help/what-stays-private/", "confidentialité vie privée privé partagé non partagé domicile adresse valise documents dépenses données icloud serveurs"],
        ["Ta liste de valise", "weather-packing", "/fr/help/your-packing-list/", "liste de valise valise bagages faire sa valise checklist liste à cocher affaires sac vêtements documents quoi emporter"],
        ["Prises et tension", "weather-packing", "/fr/help/plugs-and-voltage/", "prise électrique fiche adaptateur tension voltage courant type a type c type e type g chargeur adaptateur de voyage"],
        ["Météo habituelle et prévisions", "weather-packing", "/fr/help/typical-weather-and-live-forecast/", "météo temps prévisions température pluie climat habituel moyenne apple weather parapluie jours du voyage"],
        ["Colle une liste trouvée sur un blog", "guides-someday", "/fr/help/paste-a-list-from-a-blog/", "coller liste blog chatgpt gemini claude notes importer plusieurs lieux d’un coup en masse en une fois"],
        ["Commence un voyage à partir d’un guide", "guides-someday", "/fr/help/start-a-trip-from-a-guide/", "guides guide itinéraire tout prêt modèle idée de voyage road trip circuit copier date de début parcours"],
        ["Garde des lieux pour plus tard", "guides-someday", "/fr/help/save-places-for-someday/", "un jour garder pour plus tard liste d’envies bucket list lieux où je veux aller rêves favoris signet enregistrés idées"],
        ["Ajoute les lieux que tu as visités", "my-spots", "/fr/help/add-places-youve-been/", "mes lieux pays visités villes carte carte du monde carte de voyage épingles punaises déjà visité monde carte à gratter"],
        ["Retrouve tes anciens voyages dans tes photos", "my-spots", "/fr/help/find-past-trips-in-your-photos/", "photos photothèque analyser scanner localisation gps anciens voyages pays visités automatiquement année importer"],
        ["Médailles, de First Stepper jusqu’au sommet", "my-spots", "/fr/help/medals-from-first-stepper-up/", "médailles rangs badges niveaux first stepper apex traveler pays compteur succès trophées vie de voyageur partager"],
        ["Ton voyage sur l’écran verrouillé", "widgets-watch-calendar", "/fr/help/your-flight-on-the-lock-screen/", "écran verrouillé écran de verrouillage activité en direct dynamic island carte d’embarquement vol porte compte à rebours maintenant ensuite widget"],
        ["Trovelo sur l’Apple Watch", "widgets-watch-calendar", "/fr/help/trovelo-on-apple-watch/", "apple watch montre pile intelligente smart stack poignet watchos activité en direct digital crown maintenant ensuite"],
        ["Ton voyage dans Calendrier", "widgets-watch-calendar", "/fr/help/your-trip-in-calendar/", "calendrier apple calendar ical agenda événements emploi du temps synchroniser vols hôtels journée entière"],
        ["Trovelo sur Mac", "mac-ai-plan", "/fr/help/trovelo-on-mac/", "mac macbook ordinateur bureau app synchroniser tableau colonnes raccourcis clavier barre latérale"],
        ["Planifie avec ton assistant IA", "mac-ai-plan", "/fr/help/plan-with-your-ai-assistant/", "assistant ia intelligence artificielle claude chatgpt codex cursor mcp planifier en demandant connecter"],
        ["Fais glisser les cartes d’un jour à l’autre", "mac-ai-plan", "/fr/help/drag-cards-between-days/", "mac glisser déposer glisser-déposer carte colonne jour tableau clavier compact taille des cartes météo"],
        ["Comment fonctionne la synchronisation iCloud", "icloud-privacy-pro", "/fr/help/how-icloud-sync-works/", "icloud synchroniser synchronisation appareils iphone ipad mac ne se synchronise pas compte apple identifiant apple stockage plein sauvegarde"],
        ["Sauvegarde tous tes voyages", "icloud-privacy-pro", "/fr/help/back-up-all-your-trips/", "sauvegarde sauvegarder backup restaurer exporter télécharger fichier zip nouvel iphone transférer données copie"],
        ["Ce que comprend Trovelo Pro", "icloud-privacy-pro", "/fr/help/what-trovelo-pro-includes/", "pro prix passer à pro premium abonnement paiement unique achat unique formule gratuite gratuit limite illimité restaurer les achats utiliser un code"]
      ]
    },
    "it": {
      topics: {"getting-started": "Primi passi", "board-cards": "Bacheca e schede", "map-routes": "Mappa e percorsi", "flights-transport": "Voli e trasporti", "expenses": "Spese", "plan-together": "Pianificare insieme", "weather-packing": "Meteo e bagaglio", "guides-someday": "Guide e «Un giorno»", "my-spots": "I miei luoghi e medaglie", "widgets-watch-calendar": "Widget, Watch e Calendario", "mac-ai-plan": "Mac e pianificazione con l’IA", "icloud-privacy-pro": "iCloud, privacy e Pro"},
      words: {"Nothing yet for “{q}”.": "Ancora niente su «{q}».", "Ask me on {link} and I’ll answer.": "Chiedimelo su {link} e ti rispondo.", "Soon": "In arrivo"},
      articles: [
        ["Crea il tuo primo viaggio", "getting-started", "/it/help/create-your-first-trip/", "creare nuovo viaggio iniziare pianificare organizzare primo viaggio date città destinazione viaggio demo esempio itinerario"],
        ["Viaggi con più città", "getting-started", "/it/help/trips-with-more-than-one-city/", "più città multitappa due destinazioni aggiungere città road trip itinerario giro tappe tour più di una città"],
        ["Aggiungi luoghi ai tuoi giorni", "board-cards", "/it/help/add-places-to-your-days/", "aggiungere luogo posto monumento attrazione ristorante cercare apple maps mappe scheda giorno più nuovo"],
        ["Sposta una scheda in un altro giorno", "board-cards", "/it/help/move-a-card-to-another-day/", "spostare scheda giorno cambiare data cambiare giorno riprogrammare rimandare altro giorno da pianificare trascinare scegli una data"],
        ["Quanto è pieno il mio giorno?", "board-cards", "/it/help/how-full-is-my-day/", "giornata piena giornata tranquilla non ci sta tutto tempo libero ritmo giornaliero ore barra durata quanto dura pieno troppo"],
        ["Tutti i tipi di scheda", "board-cards", "/it/help/every-kind-of-card/", "categoria tipo genere scheda alloggio hotel cibo luogo volo treno biglietto museo spiaggia cambiare categoria"],
        ["Note, file e foto", "board-cards", "/it/help/notes-files-and-photos/", "nota note file pdf foto biglietto allegare allegato documento fotocamera libreria foto nota del giorno"],
        ["Idee senza giorno", "board-cards", "/it/help/unplanned-ideas-without-a-day/", "da pianificare idee senza giorno dopo più tardi vassoio forse in sospeso lista dei desideri indeciso"],
        ["Codici di prenotazione", "board-cards", "/it/help/confirmation-numbers/", "codice di prenotazione numero di conferma pnr riferimento prenotazione copiare hotel volo codice della porta"],
        ["Cambia l’ordine del tuo giorno", "board-cards", "/it/help/change-the-order-of-your-day/", "ordine riordinare ordinare giorno trascinare spostare su giù sequenza primo ultimo cambiare ordine"],
        ["Ottimizza il percorso di un giorno", "map-routes", "/it/help/optimize-a-days-route/", "ottimizzare percorso itinerario ordine più breve distanza risparmiare tempo lucchetto bloccare fissare giorno mappa giro"],
        ["Cosa c’è nei dintorni", "map-routes", "/it/help/whats-nearby/", "vicino nei dintorni intorno mappa cibo caffè bar ristorante attrazioni bancomat farmacia supermercato trova un luogo"],
        ["Metti un pin sulla mappa", "map-routes", "/it/help/drop-a-pin-on-the-map/", "pin puntina segnaposto mappa tenere premuto indirizzo posto aggiungere posizione punto personalizzato"],
        ["Aggiungi un volo con scali", "flights-transport", "/it/help/add-a-flight-with-layovers/", "volo aggiungere aereo scalo coincidenza compagnia aerea numero di volo terminal gate aeroporto fuso orario"],
        ["Treni, autobus e traghetti", "flights-transport", "/it/help/trains-buses-and-ferries/", "treno autobus bus pullman traghetto nave carrozza posto binario stazione cambio coincidenza biglietto frecciarossa shinkansen"],
        ["Importa una prenotazione da un’email", "flights-transport", "/it/help/import-a-booking-from-an-email/", "importare prenotazione email mail conferma pdf screenshot schermata scansione volo hotel auto a noleggio biglietto leggere"],
        ["Registra una spesa", "expenses", "/it/help/log-an-expense/", "spesa spese registrare annotare spendere costo soldi pagato budget totale categoria csv foglio di calcolo excel esportare"],
        ["I prezzi, nella tua valuta", "expenses", "/it/help/see-costs-in-your-own-money/", "valuta moneta tasso di cambio cambio convertire convertitore valuta di casa soldi locali dollari euro yen totale"],
        ["Dividi le spese con il tuo gruppo", "expenses", "/it/help/split-costs-with-your-group/", "dividere spese gruppo condividere conto dovere debito pagare pagato saldare conti amici famiglia chi ha pagato saldo splitwise tricount"],
        ["Invita qualcuno al tuo viaggio", "plan-together", "/it/help/invite-someone-to-your-trip/", "invitare condividere viaggio insieme amici famiglia coppia partner collaborare pianificare insieme viaggio condiviso icloud"],
        ["Può vedere o può modificare?", "plan-together", "/it/help/can-view-or-can-edit/", "permessi permesso vedere modificare sola lettura togliere persona rimuovere uscire dal viaggio interrompere condivisione proprietario"],
        ["Cosa resta privato", "plan-together", "/it/help/what-stays-private/", "privacy privato condiviso non condiviso casa indirizzo bagaglio documenti spese dati icloud server"],
        ["La tua lista del bagaglio", "weather-packing", "/it/help/your-packing-list/", "lista bagaglio valigia bagagli fare la valigia checklist cose borsa vestiti documenti cosa portare"],
        ["Prese e voltaggio", "weather-packing", "/it/help/plugs-and-voltage/", "presa spina adattatore voltaggio tensione corrente elettrica tipo a tipo c tipo g caricabatterie adattatore da viaggio"],
        ["Meteo tipico e previsioni reali", "weather-packing", "/it/help/typical-weather-and-live-forecast/", "meteo tempo previsioni temperatura pioggia clima tipico media apple meteo ombrello giorni del viaggio"],
        ["Incolla una lista da un blog", "guides-someday", "/it/help/paste-a-list-from-a-blog/", "incollare lista elenco blog chatgpt gemini claude note importare tanti luoghi insieme in blocco tutti insieme"],
        ["Inizia un viaggio da una guida", "guides-someday", "/it/help/start-a-trip-from-a-guide/", "guide guida itinerario già pronto modello idea di viaggio road trip percorso copiare data di inizio"],
        ["Salva luoghi in «Un giorno»", "guides-someday", "/it/help/save-places-for-someday/", "un giorno salvare per dopo lista dei desideri bucket list posti dove voglio andare preferiti segnalibro salvati idee sogni"],
        ["Aggiungi i posti che hai visitato", "my-spots", "/it/help/add-places-youve-been/", "i miei luoghi paesi visitati città mappa mappa dei viaggi pin dove sono stato mondo mappa da grattare"],
        ["Trova i viaggi passati nelle tue foto", "my-spots", "/it/help/find-past-trips-in-your-photos/", "foto libreria foto scansione analizzare posizione gps viaggi passati paesi visitati in automatico anno importare"],
        ["Medaglie, da First Stepper in su", "my-spots", "/it/help/medals-from-first-stepper-up/", "medaglie gradi livelli badge distintivi first stepper apex traveler paesi contatore traguardi vita in viaggio condividere"],
        ["Il tuo viaggio sulla schermata di blocco", "widgets-watch-calendar", "/it/help/your-flight-on-the-lock-screen/", "schermata di blocco attività in tempo reale live activity dynamic island carta di imbarco volo gate conto alla rovescia ora dopo widget"],
        ["Trovelo su Apple Watch", "widgets-watch-calendar", "/it/help/trovelo-on-apple-watch/", "apple watch orologio smart stack polso watchos attività in tempo reale digital crown ora dopo"],
        ["Il tuo viaggio in Calendario", "widgets-watch-calendar", "/it/help/your-trip-in-calendar/", "calendario apple calendar ical eventi agenda orari sincronizzare voli hotel tutto il giorno"],
        ["Trovelo su Mac", "mac-ai-plan", "/it/help/trovelo-on-mac/", "mac macbook computer desktop app sincronizzare bacheca colonne abbreviazioni da tastiera scorciatoie barra laterale"],
        ["Pianifica con il tuo assistente IA", "mac-ai-plan", "/it/help/plan-with-your-ai-assistant/", "assistente ia intelligenza artificiale claude chatgpt codex cursor mcp pianificare chiedendo collegare"],
        ["Trascina le schede tra i giorni", "mac-ai-plan", "/it/help/drag-cards-between-days/", "mac trascinare rilasciare scheda colonna giorno bacheca tastiera compatta dimensione scheda meteo"],
        ["Come funziona la sincronizzazione con iCloud", "icloud-privacy-pro", "/it/help/how-icloud-sync-works/", "icloud sincronizzare sincronizzazione dispositivi iphone ipad mac non sincronizza account apple id apple spazio pieno archiviazione backup"],
        ["Fai il backup di tutti i tuoi viaggi", "icloud-privacy-pro", "/it/help/back-up-all-your-trips/", "backup copia di sicurezza ripristinare esportare scaricare file zip nuovo iphone trasferire passare dati salvare"],
        ["Cosa include Trovelo Pro", "icloud-privacy-pro", "/it/help/what-trovelo-pro-includes/", "pro prezzo upgrade premium abbonamento pagamento unico acquisto unico una tantum piano gratuito gratis limite illimitato ripristinare acquisti riscattare codice"]
      ]
    },
    "nl": {
      topics: {"getting-started": "Aan de slag", "board-cards": "Bord en kaarten", "map-routes": "Kaart en routes", "flights-transport": "Vluchten en vervoer", "expenses": "Uitgaven", "plan-together": "Samen plannen", "weather-packing": "Weer en inpakken", "guides-someday": "Gidsen en Ooit", "my-spots": "Mijn plekken en medailles", "widgets-watch-calendar": "Widgets, Watch en Agenda", "mac-ai-plan": "Mac en plannen met AI", "icloud-privacy-pro": "iCloud, privacy en Pro"},
      words: {"Nothing yet for “{q}”.": "Nog niets over “{q}”.", "Ask me on {link} and I’ll answer.": "Vraag het me op {link}, dan geef ik antwoord.", "Soon": "Binnenkort"},
      articles: [
        ["Maak je eerste reis", "getting-started", "/nl/help/create-your-first-trip/", "reis maken nieuwe reis beginnen plannen eerste reis data datums stad bestemming demoreis voorbeeldreis reisplanning"],
        ["Reizen met meer dan één stad", "getting-started", "/nl/help/trips-with-more-than-one-city/", "meerdere steden meer steden twee bestemmingen stad toevoegen rondreis road trip reisroute route stedentrip"],
        ["Voeg plekken toe aan je dagen", "board-cards", "/nl/help/add-places-to-your-days/", "toevoegen plek plaats bezienswaardigheid restaurant zoeken apple kaarten maps kaart dag plus nieuw"],
        ["Verplaats een kaart naar een andere dag", "board-cards", "/nl/help/move-a-card-to-another-day/", "kaart verplaatsen dag datum wijzigen verzetten omzetten andere dag niet gepland slepen kies een datum"],
        ["Hoe vol is mijn dag?", "board-cards", "/nl/help/how-full-is-my-day/", "drukke dag rustige dag past niet tijd over resterende tijd dagritme tempo uren balk duur hoe lang vol"],
        ["Alle soorten kaarten", "board-cards", "/nl/help/every-kind-of-card/", "categorie soort type kaart verblijf hotel eten plek vlucht trein ticket museum strand categorie wijzigen"],
        ["Notities, bestanden en foto’s", "board-cards", "/nl/help/notes-files-and-photos/", "notitie notities bestand pdf foto ticket kaartje bijlage document camera fotobibliotheek dagnotitie toevoegen"],
        ["Ideeën zonder dag", "board-cards", "/nl/help/unplanned-ideas-without-a-day/", "niet gepland ideeën zonder dag later bakje misschien wensenlijst verlanglijst nog niet besloten"],
        ["Boekingsnummers", "board-cards", "/nl/help/confirmation-numbers/", "boekingsnummer bevestigingsnummer reserveringsnummer boekingscode referentie pnr reservering kopiëren hotel vlucht deurcode"],
        ["Verander de volgorde van je dag", "board-cards", "/nl/help/change-the-order-of-your-day/", "volgorde herschikken sorteren dag slepen verplaatsen omhoog omlaag eerste laatste volgorde veranderen"],
        ["Optimaliseer de route van een dag", "map-routes", "/nl/help/optimize-a-days-route/", "optimaliseren route kortste volgorde afstand tijd besparen slotje vergrendelen vastzetten dag kaart wandelroute"],
        ["Wat is er in de buurt", "map-routes", "/nl/help/whats-nearby/", "in de buurt omgeving kaart eten koffie café restaurant bar bezienswaardigheden geldautomaat pinautomaat apotheek supermarkt plek zoeken"],
        ["Zet een pin op de kaart", "map-routes", "/nl/help/drop-a-pin-on-the-map/", "pin speld markering kaart ingedrukt houden lang drukken adres plek toevoegen locatie eigen punt"],
        ["Voeg een vlucht met tussenstops toe", "flights-transport", "/nl/help/add-a-flight-with-layovers/", "vlucht toevoegen vliegtuig tussenstop overstap aansluiting luchtvaartmaatschappij vluchtnummer terminal gate luchthaven vliegveld tijdzone"],
        ["Treinen, bussen en veerboten", "flights-transport", "/nl/help/trains-buses-and-ferries/", "trein bus veerboot ferry boot rijtuig wagon stoel zitplaats spoor perron station overstap kaartje ticket shinkansen treinreis"],
        ["Importeer een boeking uit een mail", "flights-transport", "/nl/help/import-a-booking-from-an-email/", "importeren boeking mail e-mail bevestiging pdf screenshot schermafbeelding scannen vlucht hotel huurauto ticket uitlezen"],
        ["Leg een uitgave vast", "expenses", "/nl/help/log-an-expense/", "uitgave uitgaven vastleggen noteren kosten geld betaald budget totaal categorie csv spreadsheet excel exporteren"],
        ["Kosten in je eigen valuta", "expenses", "/nl/help/see-costs-in-your-own-money/", "valuta munteenheid wisselkoers koers omrekenen eigen valuta lokaal geld dollar euro yen totaal"],
        ["Deel de kosten met je groep", "expenses", "/nl/help/split-costs-with-your-group/", "kosten delen verdelen groep rekening schuld schuldig betalen betaald verrekenen vereffenen vrienden familie wie betaalde saldo tikkie splitwise tricount"],
        ["Nodig iemand uit voor je reis", "plan-together", "/nl/help/invite-someone-to-your-trip/", "uitnodigen delen reis samen vrienden familie partner samenwerken samen plannen gedeelde reis icloud"],
        ["Kan bekijken of kan bewerken?", "plan-together", "/nl/help/can-view-or-can-edit/", "rechten toegang bekijken bewerken alleen lezen persoon verwijderen reis verlaten stoppen met delen eigenaar"],
        ["Wat privé blijft", "plan-together", "/nl/help/what-stays-private/", "privacy privé gedeeld niet gedeeld huis thuisadres adres paklijst documenten uitgaven gegevens data icloud servers"],
        ["Je paklijst", "weather-packing", "/nl/help/your-packing-list/", "paklijst inpaklijst inpakken koffer bagage checklist spullen tas kleding documenten wat moet ik meenemen"],
        ["Stekkers en voltage", "weather-packing", "/nl/help/plugs-and-voltage/", "stekker stopcontact adapter verloopstekker wereldstekker voltage spanning stroom type a type c type f type g oplader reisadapter"],
        ["Gebruikelijk weer en actuele verwachting", "weather-packing", "/nl/help/typical-weather-and-live-forecast/", "weer weersverwachting weerbericht voorspelling temperatuur regen klimaat gemiddeld apple weather paraplu reisdagen"],
        ["Plak een lijst uit een blog", "guides-someday", "/nl/help/paste-a-list-from-a-blog/", "plakken lijst blog chatgpt gemini claude notities importeren veel plekken tegelijk in één keer meerdere"],
        ["Begin een reis vanuit een gids", "guides-someday", "/nl/help/start-a-trip-from-a-guide/", "gidsen gids reisroute kant-en-klaar sjabloon template reisidee road trip rondreis route kopiëren begindatum"],
        ["Bewaar plekken voor ooit", "guides-someday", "/nl/help/save-places-for-someday/", "ooit bewaren voor later wensenlijst bucketlist verlanglijst plekken waar ik heen wil favorieten bladwijzer bewaard ideeën"],
        ["Voeg plekken toe waar je bent geweest", "my-spots", "/nl/help/add-places-youve-been/", "mijn plekken bezochte landen steden kaart wereldkaart reiskaart pins geweest wereld kraskaart scratch map"],
        ["Vind eerdere reizen in je foto’s", "my-spots", "/nl/help/find-past-trips-in-your-photos/", "foto’s fotos fotobibliotheek scannen locatie gps eerdere reizen bezochte landen automatisch jaar jaartal importeren"],
        ["Medailles, vanaf First Stepper", "my-spots", "/nl/help/medals-from-first-stepper-up/", "medailles rangen badges niveaus first stepper apex traveler landen teller prestaties reisleven delen"],
        ["Je reis op het toegangsscherm", "widgets-watch-calendar", "/nl/help/your-flight-on-the-lock-screen/", "toegangsscherm vergrendelscherm live activity live activities dynamic island instapkaart boardingpass vlucht gate aftellen nu volgende widget"],
        ["Trovelo op de Apple Watch", "widgets-watch-calendar", "/nl/help/trovelo-on-apple-watch/", "apple watch horloge slimme stapel smart stack pols watchos live activity digital crown nu volgende"],
        ["Je reis in Agenda", "widgets-watch-calendar", "/nl/help/your-trip-in-calendar/", "agenda kalender apple agenda ical afspraken activiteiten planning synchroniseren vluchten hotels hele dag"],
        ["Trovelo op de Mac", "mac-ai-plan", "/nl/help/trovelo-on-mac/", "mac macbook computer desktop app synchroniseren bord kolommen toetscombinaties sneltoetsen navigatiekolom"],
        ["Plan met je AI-assistent", "mac-ai-plan", "/nl/help/plan-with-your-ai-assistant/", "ai-assistent ai assistent kunstmatige intelligentie claude chatgpt codex cursor mcp plannen door te vragen verbinden koppelen"],
        ["Sleep kaarten tussen dagen", "mac-ai-plan", "/nl/help/drag-cards-between-days/", "mac slepen neerzetten kaart kolom dag bord toetsenbord compact kaartgrootte weer"],
        ["Hoe synchronisatie met iCloud werkt", "icloud-privacy-pro", "/nl/help/how-icloud-sync-works/", "icloud synchroniseren synchronisatie sync apparaten iphone ipad mac synchroniseert niet apple account apple id opslag vol back-up"],
        ["Maak een reservekopie van al je reizen", "icloud-privacy-pro", "/nl/help/back-up-all-your-trips/", "reservekopie back-up backup herstellen terugzetten exporteren downloaden bestand zip nieuwe iphone overzetten gegevens bewaren"],
        ["Wat Trovelo Pro je geeft", "icloud-privacy-pro", "/nl/help/what-trovelo-pro-includes/", "pro prijs upgrade premium abonnement eenmalige betaling eenmalige aankoop gratis versie gratis plan limiet onbeperkt aankopen herstellen code inwisselen"]
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

  // ── The globe in the menu at the top opens this page in other languages.
  Array.prototype.forEach.call(document.querySelectorAll('.tn-lang'), function (btn) {
    var list = document.getElementById(btn.getAttribute('aria-controls'));
    var show = function (on) {
      btn.setAttribute('aria-expanded', on ? 'true' : 'false');
      list.hidden = !on;
    };
    btn.addEventListener('click', function () { show(list.hidden); });
    document.addEventListener('click', function (e) {
      if (!list.hidden && !btn.parentNode.contains(e.target)) show(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !list.hidden) { show(false); btn.focus(); }
    });
  });

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
