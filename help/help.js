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
    },
    "ja": {
      topics: {"getting-started": "はじめに", "board-cards": "ボードとカード", "map-routes": "マップとルート", "flights-transport": "フライトと交通", "expenses": "支出", "plan-together": "一緒に計画", "weather-packing": "天気と荷造り", "guides-someday": "ガイドと「いつか」", "my-spots": "マイスポットとメダル", "widgets-watch-calendar": "ウィジェット、Watch、カレンダー", "mac-ai-plan": "Mac と AI での計画", "icloud-privacy-pro": "iCloud、プライバシー、Pro"},
      words: {"Nothing yet for “{q}”.": "「{q}」についての記事はまだありません。", "Ask me on {link} and I’ll answer.": "{link}で聞いてください。お答えします。", "Soon": "近日公開"},
      articles: [
        ["最初の旅行を作る", "getting-started", "/ja/help/create-your-first-trip/", "旅行 作成 作る 新規 はじめる 計画 最初の旅行 日付 日程 都市 行き先 目的地 デモ旅行 サンプル 旅程"],
        ["複数の都市をめぐる旅行", "getting-started", "/ja/help/trips-with-more-than-one-city/", "複数都市 周遊 2都市 都市を追加 ルート 旅程 ロードトリップ ドライブ旅行 はしご 複数の行き先"],
        ["日程に場所を追加する", "board-cards", "/ja/help/add-places-to-your-days/", "追加 場所 スポット 観光地 名所 レストラン 検索 Apple Maps マップ 地図 カード 日 プラス 新規"],
        ["カードを別の日に移動する", "board-cards", "/ja/help/move-a-card-to-another-day/", "移動 カード 日 日付変更 日程変更 別の日 未定 ドラッグ 日付を選択 予定変更 入れ替え"],
        ["その日はどれくらい埋まっている？", "board-cards", "/ja/help/how-full-is-my-day/", "忙しい ゆったり 入りきらない 詰め込みすぎ 残り時間 ペース 時間 バー 所要時間 滞在時間 どれくらい"],
        ["カードの種類", "board-cards", "/ja/help/every-kind-of-card/", "カテゴリ 種類 タイプ カード 宿泊 ホテル 食事 場所 フライト 電車 チケット 美術館 ビーチ カテゴリ変更"],
        ["メモ、ファイル、写真", "board-cards", "/ja/help/notes-files-and-photos/", "メモ ノート ファイル PDF 写真 チケット 添付 書類 カメラ 写真ライブラリ 日のメモ"],
        ["日付のないアイデア", "board-cards", "/ja/help/unplanned-ideas-without-a-day/", "未定 アイデア 日付なし あとで トレイ 候補 行きたい ウィッシュリスト 保留 決めていない"],
        ["予約番号", "board-cards", "/ja/help/confirmation-numbers/", "予約番号 確認番号 予約コード 予約 PNR 照会番号 コピー ホテル フライト ドアコード 暗証番号"],
        ["1日の順番を変える", "board-cards", "/ja/help/change-the-order-of-your-day/", "順番 並べ替え 並び替え 順序 ドラッグ 移動 上 下 最初 最後 入れ替え"],
        ["1日のルートを最適化する", "map-routes", "/ja/help/optimize-a-days-route/", "最適化 ルート 最短 順番 距離 時間短縮 鍵 ロック 固定 1日 マップ 道順 効率よく回る"],
        ["近くにあるもの", "map-routes", "/ja/help/whats-nearby/", "近く 周辺 マップ 地図 食事 カフェ コーヒー レストラン バー 観光 ATM 薬局 スーパー 場所を探す"],
        ["マップにピンを立てる", "map-routes", "/ja/help/drop-a-pin-on-the-map/", "ピン マップ 地図 長押し 住所 場所 追加 位置 地点 カスタム 待ち合わせ場所"],
        ["乗り継ぎのあるフライトを追加する", "flights-transport", "/ja/help/add-a-flight-with-layovers/", "フライト 飛行機 追加 航空便 乗り継ぎ 経由 トランジット 航空会社 便名 ターミナル ゲート 空港 時差 タイムゾーン"],
        ["電車、バス、フェリー", "flights-transport", "/ja/help/trains-buses-and-ferries/", "電車 列車 新幹線 バス 高速バス フェリー 船 号車 座席 番線 ホーム 駅 乗り換え 切符 きっぷ"],
        ["メールから予約を読み込む", "flights-transport", "/ja/help/import-a-booking-from-an-email/", "読み込み インポート 予約 メール 確認メール PDF スクリーンショット スクショ スキャン フライト ホテル レンタカー 航空券 読み取り"],
        ["支出を記録する", "expenses", "/ja/help/log-an-expense/", "支出 出費 記録 家計簿 費用 お金 支払い 予算 合計 カテゴリ CSV スプレッドシート Excel 書き出し エクスポート"],
        ["料金を自国通貨で見る", "expenses", "/ja/help/see-costs-in-your-own-money/", "通貨 為替 為替レート 換算 両替 自国通貨 現地通貨 外貨 ドル ユーロ 円 合計"],
        ["グループで費用を割り勘する", "expenses", "/ja/help/split-costs-with-your-group/", "割り勘 費用 分担 グループ 共有 精算 立て替え 貸し借り 支払い 友だち 家族 誰が払った 残高 Splitwise Walica"],
        ["旅行に人を招待する", "plan-together", "/ja/help/invite-someone-to-your-trip/", "招待 共有 旅行 一緒に 友だち 家族 パートナー 恋人 共同編集 共同で計画 シェア iCloud"],
        ["閲覧のみ？編集可能？", "plan-together", "/ja/help/can-view-or-can-edit/", "権限 閲覧 編集 閲覧のみ 読み取り専用 削除 メンバーを外す 抜ける 退出 共有を停止 オーナー"],
        ["共有されないもの", "plan-together", "/ja/help/what-stays-private/", "プライバシー 非公開 共有 共有されない 自宅 住所 荷造り 書類 支出 データ iCloud サーバー 個人情報"],
        ["荷造りリスト", "weather-packing", "/ja/help/your-packing-list/", "荷造り 持ち物 持ち物リスト パッキング スーツケース 荷物 チェックリスト バッグ 服 書類 何を持っていく 忘れ物"],
        ["プラグと電圧", "weather-packing", "/ja/help/plugs-and-voltage/", "プラグ コンセント 変換プラグ 変換アダプタ 電圧 電源 Aタイプ Cタイプ BFタイプ 充電器 変圧器 海外旅行"],
        ["例年の天気と最新の予報", "weather-packing", "/ja/help/typical-weather-and-live-forecast/", "天気 天気予報 予報 気温 雨 降水確率 気候 例年 平年 Apple Weather 傘 旅行中の天気"],
        ["ブログのリストを貼り付ける", "guides-someday", "/ja/help/paste-a-list-from-a-blog/", "貼り付け ペースト リスト ブログ ChatGPT Gemini Claude メモ 読み込み まとめて 一括 複数の場所"],
        ["ガイドから旅行を始める", "guides-someday", "/ja/help/start-a-trip-from-a-guide/", "ガイド モデルコース 旅程 テンプレート 旅行プラン おすすめ ロードトリップ ドライブ ルート コピー 開始日"],
        ["「いつか」のために場所を保存する", "guides-someday", "/ja/help/save-places-for-someday/", "いつか 保存 あとで 行きたい ウィッシュリスト バケットリスト 行きたい場所 お気に入り ブックマーク 保存済み アイデア"],
        ["行ったことのある場所を追加する", "my-spots", "/ja/help/add-places-youve-been/", "マイスポット スポット 訪問 行った国 行った都市 マップ 世界地図 ピン 旅の記録 制覇 白地図 塗りつぶし"],
        ["写真から過去の旅行を見つける", "my-spots", "/ja/help/find-past-trips-in-your-photos/", "写真 写真ライブラリ スキャン 位置情報 GPS 撮影場所 過去の旅行 行った国 自動 年 読み込み"],
        ["メダル：First Stepper から", "my-spots", "/ja/help/medals-from-first-stepper-up/", "メダル ランク バッジ レベル 称号 First Stepper Apex Traveler 国 国数 実績 旅の歩み シェア"],
        ["ロック画面に旅行を表示", "widgets-watch-calendar", "/ja/help/your-flight-on-the-lock-screen/", "ロック画面 ライブアクティビティ Dynamic Island ダイナミックアイランド 搭乗券 フライト ゲート カウントダウン 今 次 ウィジェット"],
        ["Apple Watch で Trovelo", "widgets-watch-calendar", "/ja/help/trovelo-on-apple-watch/", "Apple Watch アップルウォッチ スマートスタック 手首 watchOS ライブアクティビティ Digital Crown デジタルクラウン 今 次"],
        ["カレンダーに旅行を表示", "widgets-watch-calendar", "/ja/help/your-trip-in-calendar/", "カレンダー Apple カレンダー iCal 予定 イベント スケジュール 同期 フライト ホテル 終日"],
        ["Mac で Trovelo", "mac-ai-plan", "/ja/help/trovelo-on-mac/", "Mac MacBook パソコン デスクトップ アプリ 同期 ボード 列 キーボードショートカット サイドバー"],
        ["AIアシスタントと計画する", "mac-ai-plan", "/ja/help/plan-with-your-ai-assistant/", "AIアシスタント AI 人工知能 生成AI Claude ChatGPT Codex Cursor MCP 頼むだけ 計画 接続 つなぐ"],
        ["カードを日から日へドラッグする", "mac-ai-plan", "/ja/help/drag-cards-between-days/", "Mac ドラッグ ドロップ ドラッグ&ドロップ カード 列 日 ボード キーボード コンパクト カードの大きさ 天気"],
        ["iCloud 同期のしくみ", "icloud-privacy-pro", "/ja/help/how-icloud-sync-works/", "iCloud 同期 デバイス iPhone iPad Mac 同期されない 同期できない Apple アカウント Apple ID ストレージ 容量 いっぱい バックアップ"],
        ["すべての旅行をバックアップする", "icloud-privacy-pro", "/ja/help/back-up-all-your-trips/", "バックアップ 復元 書き出し エクスポート ダウンロード ファイル zip 機種変更 新しいiPhone 移行 データ 保存"],
        ["Trovelo Pro でできること", "icloud-privacy-pro", "/ja/help/what-trovelo-pro-includes/", "Pro 価格 値段 アップグレード プレミアム サブスク サブスクリプション 買い切り 1回払い 無料プラン 無料 制限 無制限 購入を復元 コード 引き換え"]
      ]
    },
    "pt-BR": {
      topics: {"getting-started": "Primeiros passos", "board-cards": "Quadro e cartões", "map-routes": "Mapa e rotas", "flights-transport": "Voos e transporte", "expenses": "Despesas", "plan-together": "Planejar juntos", "weather-packing": "Clima e bagagem", "guides-someday": "Guias e Algum dia", "my-spots": "Meus locais e medalhas", "widgets-watch-calendar": "Widgets, Watch e Calendário", "mac-ai-plan": "Mac e planejamento com IA", "icloud-privacy-pro": "iCloud, privacidade e Pro"},
      words: {"Nothing yet for “{q}”.": "Ainda não há nada sobre “{q}”.", "Ask me on {link} and I’ll answer.": "Pergunte no {link} e eu respondo.", "Soon": "Em breve"},
      articles: [
        ["Crie sua primeira viagem", "getting-started", "/pt-br/help/create-your-first-trip/", "criar nova viagem começar planejar planejamento primeira viagem datas cidade destino viagem de demonstração exemplo roteiro"],
        ["Viagens com mais de uma cidade", "getting-started", "/pt-br/help/trips-with-more-than-one-city/", "várias cidades multidestino dois destinos adicionar cidade rota road trip roteiro mochilão itinerário mais de uma cidade"],
        ["Adicione lugares aos seus dias", "board-cards", "/pt-br/help/add-places-to-your-days/", "adicionar incluir lugar local ponto turístico monumento restaurante buscar pesquisar apple maps mapas cartão dia mais novo"],
        ["Mova um cartão para outro dia", "board-cards", "/pt-br/help/move-a-card-to-another-day/", "mover cartão dia mudar data trocar de dia remarcar adiar outro dia sem planejar arrastar escolher uma data"],
        ["Quão cheio está meu dia?", "board-cards", "/pt-br/help/how-full-is-my-day/", "dia cheio dia tranquilo não cabe tempo livre ritmo diário horas barra duração quanto tempo leva lotado corrido"],
        ["Todos os tipos de cartão", "board-cards", "/pt-br/help/every-kind-of-card/", "categoria tipo cartão hospedagem hotel comida lugar voo trem ingresso museu praia mudar categoria trocar tipo"],
        ["Notas, arquivos e fotos", "board-cards", "/pt-br/help/notes-files-and-photos/", "nota notas arquivo pdf foto ingresso passagem bilhete anexar documento câmera fototeca nota do dia"],
        ["Ideias sem dia", "board-cards", "/pt-br/help/unplanned-ideas-without-a-day/", "sem planejar ideias sem dia depois mais tarde bandeja talvez pendente lista de desejos indeciso"],
        ["Códigos de reserva", "board-cards", "/pt-br/help/confirmation-numbers/", "código de reserva número de confirmação localizador referência pnr reserva copiar hotel voo código da porta"],
        ["Mude a ordem do seu dia", "board-cards", "/pt-br/help/change-the-order-of-your-day/", "ordem reordenar ordenar dia arrastar mover subir descer sequência primeiro último mudar a ordem"],
        ["Otimize a rota de um dia", "map-routes", "/pt-br/help/optimize-a-days-route/", "otimizar rota ordem mais curta distância economizar tempo cadeado travar fixar dia mapa trajeto percurso"],
        ["O que tem por perto", "map-routes", "/pt-br/help/whats-nearby/", "perto por perto arredores mapa comida café cafeteria restaurante bar pontos turísticos caixa eletrônico farmácia supermercado buscar um local"],
        ["Coloque um pin no mapa", "map-routes", "/pt-br/help/drop-a-pin-on-the-map/", "pin alfinete marcador mapa segurar pressionar toque longo endereço local adicionar localização ponto personalizado"],
        ["Adicione um voo com escalas", "flights-transport", "/pt-br/help/add-a-flight-with-layovers/", "voo adicionar avião escala conexão companhia aérea número do voo terminal portão aeroporto fuso horário passagem"],
        ["Trens, ônibus e balsas", "flights-transport", "/pt-br/help/trains-buses-and-ferries/", "trem ônibus balsa barco ferry vagão assento plataforma estação baldeação conexão passagem bilhete shinkansen trem-bala rodoviária"],
        ["Importe uma reserva de um e-mail", "flights-transport", "/pt-br/help/import-a-booking-from-an-email/", "importar reserva e-mail email confirmação pdf captura de tela print escanear voo hotel carro alugado passagem ler"],
        ["Registre uma despesa", "expenses", "/pt-br/help/log-an-expense/", "despesa gasto registrar anotar gastar custo dinheiro pago orçamento total categoria csv planilha excel exportar"],
        ["Os preços na sua moeda", "expenses", "/pt-br/help/see-costs-in-your-own-money/", "moeda câmbio taxa de câmbio cotação converter conversor moeda de origem dinheiro local dólar euro iene real total"],
        ["Divida os gastos com seu grupo", "expenses", "/pt-br/help/split-costs-with-your-group/", "dividir rachar gastos despesas grupo compartilhar conta dever dívida pagar pago acertar as contas amigos família quem pagou saldo splitwise tricount"],
        ["Convide alguém para sua viagem", "plan-together", "/pt-br/help/invite-someone-to-your-trip/", "convidar compartilhar viagem juntos amigos família casal colaborar planejar juntos viagem compartilhada icloud"],
        ["Pode ver ou pode editar?", "plan-together", "/pt-br/help/can-view-or-can-edit/", "permissão permissões ver editar somente leitura remover pessoa sair da viagem parar de compartilhar dono"],
        ["O que continua privado", "plan-together", "/pt-br/help/what-stays-private/", "privacidade privado compartilhado não compartilhado casa endereço bagagem documentos gastos dados icloud servidores"],
        ["Sua lista de bagagem", "weather-packing", "/pt-br/help/your-packing-list/", "lista de bagagem mala bagagem fazer a mala checklist itens bolsa mochila roupas documentos o que levar"],
        ["Tomadas e voltagem", "weather-packing", "/pt-br/help/plugs-and-voltage/", "tomada plugue plug adaptador voltagem tensão energia 110v 220v tipo a tipo c tipo n carregador adaptador de viagem"],
        ["Clima típico e previsão real", "weather-packing", "/pt-br/help/typical-weather-and-live-forecast/", "tempo clima previsão do tempo temperatura chuva clima típico média apple weather guarda-chuva dias da viagem"],
        ["Cole uma lista de um blog", "guides-someday", "/pt-br/help/paste-a-list-from-a-blog/", "colar lista blog chatgpt gemini claude notas importar vários lugares de uma vez em massa"],
        ["Comece uma viagem a partir de um guia", "guides-someday", "/pt-br/help/start-a-trip-from-a-guide/", "guias guia roteiro pronto modelo ideia de viagem road trip rota copiar data de início itinerário"],
        ["Guarde lugares para algum dia", "guides-someday", "/pt-br/help/save-places-for-someday/", "algum dia salvar guardar para depois lista de desejos bucket list lugares que quero conhecer favoritos marcador salvos ideias"],
        ["Adicione os lugares onde você já esteve", "my-spots", "/pt-br/help/add-places-youve-been/", "meus locais países visitados cidades mapa mapa de viagens pins onde já estive mundo mapa de raspar"],
        ["Encontre viagens antigas nas suas fotos", "my-spots", "/pt-br/help/find-past-trips-in-your-photos/", "fotos fototeca escanear analisar localização gps viagens antigas viagens passadas países visitados automaticamente ano importar"],
        ["Medalhas, de First Stepper para cima", "my-spots", "/pt-br/help/medals-from-first-stepper-up/", "medalhas níveis ranking insígnias conquistas first stepper apex traveler países contador vida de viagens compartilhar"],
        ["Sua viagem na Tela Bloqueada", "widgets-watch-calendar", "/pt-br/help/your-flight-on-the-lock-screen/", "tela bloqueada atividade ao vivo dynamic island cartão de embarque voo portão contagem regressiva agora próximo widget"],
        ["Trovelo no Apple Watch", "widgets-watch-calendar", "/pt-br/help/trovelo-on-apple-watch/", "apple watch relógio pilha inteligente smart stack pulso watchos atividade ao vivo digital crown agora próximo"],
        ["Sua viagem no Calendário", "widgets-watch-calendar", "/pt-br/help/your-trip-in-calendar/", "calendário apple calendar ical eventos agenda horários sincronizar voos hotéis dia inteiro"],
        ["Trovelo no Mac", "mac-ai-plan", "/pt-br/help/trovelo-on-mac/", "mac macbook computador desktop app sincronizar quadro colunas atalhos de teclado barra lateral"],
        ["Planeje com seu assistente de IA", "mac-ai-plan", "/pt-br/help/plan-with-your-ai-assistant/", "assistente de ia inteligência artificial claude chatgpt codex cursor mcp planejar pedindo conectar"],
        ["Arraste cartões entre dias", "mac-ai-plan", "/pt-br/help/drag-cards-between-days/", "mac arrastar soltar cartão coluna dia quadro teclado compacto tamanho do cartão clima"],
        ["Como funciona a sincronização com o iCloud", "icloud-privacy-pro", "/pt-br/help/how-icloud-sync-works/", "icloud sincronizar sincronização dispositivos iphone ipad mac não sincroniza conta apple id apple armazenamento cheio espaço backup"],
        ["Faça backup de todas as suas viagens", "icloud-privacy-pro", "/pt-br/help/back-up-all-your-trips/", "backup cópia de segurança restaurar exportar baixar arquivo zip iphone novo transferir passar dados salvar"],
        ["O que o Trovelo Pro inclui", "icloud-privacy-pro", "/pt-br/help/what-trovelo-pro-includes/", "pro preço upgrade premium assinatura pagamento único compra única plano gratuito grátis limite ilimitado restaurar compras resgatar código"]
      ]
    },
    "ko": {
      topics: {"getting-started": "시작하기", "board-cards": "보드와 카드", "map-routes": "지도와 동선", "flights-transport": "항공편과 교통", "expenses": "지출", "plan-together": "함께 계획하기", "weather-packing": "날씨와 짐", "guides-someday": "가이드와 ‘언젠가’", "my-spots": "내 장소와 메달", "widgets-watch-calendar": "위젯, Watch, 캘린더", "mac-ai-plan": "Mac과 AI로 계획하기", "icloud-privacy-pro": "iCloud, 개인정보, Pro"},
      words: {"Nothing yet for “{q}”.": "‘{q}’에 대한 내용은 아직 없어요.", "Ask me on {link} and I’ll answer.": "{link}에 물어보시면 답해 드릴게요.", "Soon": "곧 추가"},
      articles: [
        ["첫 여행 만들기", "getting-started", "/ko/help/create-your-first-trip/", "여행 만들기 새 여행 시작 계획 첫 여행 일정 짜기 날짜 도시 여행지 목적지 데모 여행 예시 일정표"],
        ["여러 도시를 도는 여행", "getting-started", "/ko/help/trips-with-more-than-one-city/", "여러 도시 다구간 멀티시티 두 도시 도시 추가 로드 트립 일정 경로 여행지 여러 곳 이동"],
        ["날마다 장소 추가하기", "board-cards", "/ko/help/add-places-to-your-days/", "장소 추가 명소 관광지 식당 맛집 검색 Apple 지도 애플 지도 카드 하루 일정 추가하기 플러스 새로 만들기"],
        ["카드를 다른 날로 옮기기", "board-cards", "/ko/help/move-a-card-to-another-day/", "카드 이동 옮기기 날짜 변경 일정 변경 다른 날 미정 끌기 드래그 날짜 선택 일정 바꾸기 미루기"],
        ["하루가 얼마나 찼을까요?", "board-cards", "/ko/help/how-full-is-my-day/", "빡빡한 하루 여유로운 하루 다 담을 수 없음 남은 시간 일정 강도 시간 막대 소요 시간 얼마나 걸리는지 일정 꽉 참 무리한 일정"],
        ["모든 카드 종류", "board-cards", "/ko/help/every-kind-of-card/", "카테고리 종류 유형 카드 숙소 호텔 음식 맛집 장소 항공편 기차 티켓 박물관 해변 카테고리 변경 바꾸기"],
        ["메모, 파일, 사진", "board-cards", "/ko/help/notes-files-and-photos/", "메모 노트 파일 pdf 사진 티켓 첨부 문서 카메라 사진 보관함 하루 메모 예약 확인서 바우처"],
        ["날짜 없는 아이디어", "board-cards", "/ko/help/unplanned-ideas-without-a-day/", "미정 아이디어 날짜 없음 나중에 보관함 후보 가고 싶은 곳 위시리스트 아직 안 정함 보류"],
        ["예약 번호", "board-cards", "/ko/help/confirmation-numbers/", "예약 번호 확인 번호 예약 코드 PNR 예약 확인 복사 호텔 항공편 도어 코드 바우처 컨펌 번호"],
        ["하루의 순서 바꾸기", "board-cards", "/ko/help/change-the-order-of-your-day/", "순서 순서 변경 정렬 하루 끌기 드래그 이동 위로 아래로 차례 처음 마지막 순서 바꾸기"],
        ["하루 동선 최적화하기", "map-routes", "/ko/help/optimize-a-days-route/", "최적화 동선 경로 최단 순서 거리 시간 절약 자물쇠 잠금 고정 하루 지도 루트 효율"],
        ["주변에 뭐가 있을까", "map-routes", "/ko/help/whats-nearby/", "주변 근처 지도 음식 맛집 커피 카페 식당 바 술집 명소 ATM 약국 마트 편의점 장소 찾기"],
        ["지도에 핀 꽂기", "map-routes", "/ko/help/drop-a-pin-on-the-map/", "핀 꽂기 마커 지도 길게 누르기 주소 위치 지점 추가 사용자 지정 위치 좌표 표시"],
        ["경유 항공편 추가하기", "flights-transport", "/ko/help/add-a-flight-with-layovers/", "항공편 비행기 추가 경유 환승 연결편 항공사 편명 터미널 게이트 공항 시차 시간대 레이오버"],
        ["기차, 버스, 페리", "flights-transport", "/ko/help/trains-buses-and-ferries/", "기차 열차 버스 고속버스 페리 배 객차 좌석 승강장 플랫폼 역 환승 승차권 기차표 KTX 신칸센"],
        ["이메일에서 예약 가져오기", "flights-transport", "/ko/help/import-a-booking-from-an-email/", "가져오기 예약 이메일 메일 확인서 pdf 스크린샷 캡처 스캔 항공편 호텔 렌터카 티켓 읽기 자동 입력"],
        ["지출 기록하기", "expenses", "/ko/help/log-an-expense/", "지출 기록 경비 비용 돈 결제 가계부 예산 합계 카테고리 csv 스프레드시트 엑셀 내보내기 여행 경비"],
        ["내 통화로 비용 보기", "expenses", "/ko/help/see-costs-in-your-own-money/", "통화 환율 환전 변환 계산기 기준 통화 현지 통화 원화 달러 유로 엔화 합계 얼마"],
        ["그룹과 비용 나누기", "expenses", "/ko/help/split-costs-with-your-group/", "비용 나누기 더치페이 정산 엔빵 n빵 그룹 공동 경비 갚을 돈 받을 돈 친구 가족 누가 냈는지 잔액 splitwise 모임 통장"],
        ["여행에 사람 초대하기", "plan-together", "/ko/help/invite-someone-to-your-trip/", "초대 공유 여행 공유 함께 친구 가족 연인 커플 공동 편집 같이 계획 공유 여행 icloud"],
        ["보기 가능, 편집 가능?", "plan-together", "/ko/help/can-view-or-can-edit/", "권한 보기 편집 읽기 전용 사람 제거 내보내기 여행에서 나가기 공유 중단 공유 해제 소유자 주인"],
        ["비공개로 남는 것", "plan-together", "/ko/help/what-stays-private/", "개인정보 비공개 프라이버시 공유 공유 안 됨 집 주소 짐 서류 문서 지출 데이터 icloud 서버 보안"],
        ["짐 목록", "weather-packing", "/ko/help/your-packing-list/", "짐 목록 짐 싸기 준비물 체크리스트 여행 준비물 캐리어 가방 옷 서류 챙길 것 준비물 리스트"],
        ["플러그와 전압", "weather-packing", "/ko/help/plugs-and-voltage/", "플러그 콘센트 어댑터 멀티 어댑터 돼지코 변환 플러그 전압 220v 110v 타입 a 타입 c 타입 g 충전기 여행용 어댑터"],
        ["평소 날씨와 실시간 예보", "weather-packing", "/ko/help/typical-weather-and-live-forecast/", "날씨 일기 예보 일기예보 기온 비 강수 평소 날씨 기후 평균 apple weather 우산 여행 날짜"],
        ["블로그 목록 붙여넣기", "guides-someday", "/ko/help/paste-a-list-from-a-blog/", "붙여넣기 목록 리스트 블로그 chatgpt gemini claude 메모 가져오기 여러 장소 한 번에 일괄 추가"],
        ["가이드로 여행 시작하기", "guides-someday", "/ko/help/start-a-trip-from-a-guide/", "가이드 여행 코스 추천 일정 템플릿 여행 아이디어 로드 트립 복사 시작일 루트 추천 코스"],
        ["언젠가 갈 곳 저장하기", "guides-someday", "/ko/help/save-places-for-someday/", "언젠가 나중에 저장 위시리스트 버킷리스트 가고 싶은 곳 즐겨찾기 북마크 저장한 장소 아이디어 찜"],
        ["다녀온 곳 추가하기", "my-spots", "/ko/help/add-places-youve-been/", "내 장소 방문한 나라 다녀온 나라 도시 지도 여행 지도 핀 가 본 곳 세계 지도 스크래치 맵 여행 기록"],
        ["사진에서 지난 여행 찾기", "my-spots", "/ko/help/find-past-trips-in-your-photos/", "사진 사진 보관함 스캔 분석 위치 gps 지난 여행 다녀온 나라 자동 연도 가져오기 여행 기록"],
        ["메달, First Stepper부터", "my-spots", "/ko/help/medals-from-first-stepper-up/", "메달 랭크 등급 배지 레벨 first stepper apex traveler 나라 수 국가 수 업적 여행 기록 공유"],
        ["잠금 화면에 보이는 여행", "widgets-watch-calendar", "/ko/help/your-flight-on-the-lock-screen/", "잠금 화면 실시간 현황 라이브 액티비티 다이내믹 아일랜드 dynamic island 탑승권 항공편 게이트 카운트다운 지금 다음 위젯"],
        ["Apple Watch의 Trovelo", "widgets-watch-calendar", "/ko/help/trovelo-on-apple-watch/", "apple watch 애플워치 스마트 스택 손목 watchos 실시간 현황 digital crown 디지털 크라운 지금 다음"],
        ["캘린더에서 여행 보기", "widgets-watch-calendar", "/ko/help/your-trip-in-calendar/", "캘린더 달력 apple 캘린더 ical 이벤트 일정 스케줄 동기화 항공편 호텔 종일"],
        ["Mac의 Trovelo", "mac-ai-plan", "/ko/help/trovelo-on-mac/", "mac 맥 맥북 macbook 데스크톱 컴퓨터 앱 동기화 보드 열 키보드 단축키 사이드바"],
        ["AI 어시스턴트로 계획하기", "mac-ai-plan", "/ko/help/plan-with-your-ai-assistant/", "ai 어시스턴트 인공지능 claude 클로드 chatgpt codex cursor mcp 말로 계획 연결 자동 일정"],
        ["카드를 다른 날로 끌기", "mac-ai-plan", "/ko/help/drag-cards-between-days/", "mac 끌기 드래그 앤 드롭 놓기 카드 열 날짜 보드 키보드 컴팩트 카드 크기 날씨"],
        ["iCloud 동기화 방식", "icloud-privacy-pro", "/ko/help/how-icloud-sync-works/", "icloud 동기화 싱크 기기 iphone ipad mac 동기화 안 됨 apple 계정 애플 아이디 저장 공간 가득 참 백업"],
        ["모든 여행 백업하기", "icloud-privacy-pro", "/ko/help/back-up-all-your-trips/", "백업 복원 내보내기 다운로드 파일 zip 새 iphone 기기 변경 옮기기 데이터 이전 저장"],
        ["Trovelo Pro에 포함된 것", "icloud-privacy-pro", "/ko/help/what-trovelo-pro-includes/", "pro 프로 가격 업그레이드 프리미엄 구독 일회성 결제 평생 이용 무료 플랜 제한 무제한 구입 항목 복원 코드 사용 리딤"]
      ]
    },
    "zh-Hans": {
      topics: {"getting-started": "入门", "board-cards": "看板和卡片", "map-routes": "地图和路线", "flights-transport": "航班和交通", "expenses": "支出", "plan-together": "一起规划", "weather-packing": "天气和行李", "guides-someday": "攻略和“总有一天”", "my-spots": "我的地点和奖牌", "widgets-watch-calendar": "小组件、Watch 和日历", "mac-ai-plan": "Mac 和 AI 规划", "icloud-privacy-pro": "iCloud、隐私和 Pro"},
      words: {"Nothing yet for “{q}”.": "还没有关于“{q}”的内容。", "Ask me on {link} and I’ll answer.": "在 {link} 问我，我会回答你。", "Soon": "即将推出"},
      articles: [
        ["创建你的第一个行程", "getting-started", "/zh-hans/help/create-your-first-trip/", "创建行程 新建行程 新行程 开始 规划 计划 做攻略 第一个行程 日期 城市 目的地 示例行程 演示 行程单 旅行计划"],
        ["包含多个城市的行程", "getting-started", "/zh-hans/help/trips-with-more-than-one-city/", "多个城市 多城市 多目的地 两个目的地 添加城市 加城市 自驾 公路旅行 路线 行程单 不止一个城市 联游"],
        ["把地点加到你的每一天", "board-cards", "/zh-hans/help/add-places-to-your-days/", "添加地点 加地点 添加景点 景点 餐厅 地点 搜索 苹果地图 apple 地图 卡片 某一天 加号 新建"],
        ["把卡片移到另一天", "board-cards", "/zh-hans/help/move-a-card-to-another-day/", "移动卡片 换一天 换日子 改日期 更改日期 改期 调整日期 另一天 未安排 拖动 选取日期"],
        ["我的一天排得有多满？", "board-cards", "/zh-hans/help/how-full-is-my-day/", "紧凑的一天 轻松的一天 放不下 太满 排太满 剩余时间 每日节奏 节奏 小时 横条 时长 要多久 多满 时间安排"],
        ["所有卡片类型", "board-cards", "/zh-hans/help/every-kind-of-card/", "类别 类型 种类 卡片 住宿 酒店 美食 餐饮 地点 航班 火车 门票 博物馆 海滩 更改类别 改类型"],
        ["备注、文件和照片", "board-cards", "/zh-hans/help/notes-files-and-photos/", "备注 笔记 文件 pdf 照片 图片 门票 车票 附件 添加附件 文档 相机 照片图库 当天备注"],
        ["还没定日子的灵感", "board-cards", "/zh-hans/help/unplanned-ideas-without-a-day/", "未安排 灵感 想法 没定日子 不定日期 以后再说 收纳盒 也许 待定 心愿单 还没决定"],
        ["预订号", "board-cards", "/zh-hans/help/confirmation-numbers/", "预订号 确认号 订单号 预订编号 预订代码 确认码 pnr 预订 拷贝 复制 酒店 航班 门禁密码"],
        ["调整一天的顺序", "board-cards", "/zh-hans/help/change-the-order-of-your-day/", "顺序 排序 重新排序 调整顺序 换顺序 一天 拖动 移动 上移 下移 先后 第一个 最后一个"],
        ["优化一天的路线", "map-routes", "/zh-hans/help/optimize-a-days-route/", "优化 路线 路线规划 最短 顺路 顺序 距离 节省时间 锁 锁定 固定 一天 地图"],
        ["附近有什么", "map-routes", "/zh-hans/help/whats-nearby/", "附近 周边 周围 地图 美食 吃的 咖啡 咖啡馆 餐厅 酒吧 景点 atm 取款机 药店 超市 查找地点"],
        ["在地图上放置图钉", "map-routes", "/zh-hans/help/drop-a-pin-on-the-map/", "图钉 大头针 放置图钉 标记 地图 长按 按住 地址 位置 添加 自定义地点 坐标"],
        ["添加含中转的航班", "flights-transport", "/zh-hans/help/add-a-flight-with-layovers/", "航班 添加航班 飞机 机票 中转 转机 经停 联程 航空公司 航班号 航站楼 登机口 机场 时区"],
        ["火车、巴士和渡轮", "flights-transport", "/zh-hans/help/trains-buses-and-ferries/", "火车 高铁 新干线 巴士 大巴 汽车 渡轮 轮渡 船 车厢 座位 站台 车站 换乘 车票 船票"],
        ["从邮件导入预订", "flights-transport", "/zh-hans/help/import-a-booking-from-an-email/", "导入 导入预订 预订邮件 邮件 电子邮件 确认邮件 确认函 pdf 截图 扫描 识别 航班 酒店 租车 机票 读取"],
        ["记一笔支出", "expenses", "/zh-hans/help/log-an-expense/", "支出 记账 记一笔 花费 花销 开销 费用 钱 付款 预算 总额 类别 csv 电子表格 excel 导出"],
        ["用你自己的货币看花费", "expenses", "/zh-hans/help/see-costs-in-your-own-money/", "货币 汇率 换算 兑换 本国货币 本币 人民币 当地货币 外币 美元 欧元 日元 总额"],
        ["和同行的人分摊费用", "expenses", "/zh-hans/help/split-costs-with-your-group/", "分摊 分账 aa aa制 平摊 均摊 群组 共享 账单 欠款 欠钱 还钱 付款 已付 结清 朋友 家人 谁付的 余额 splitwise"],
        ["邀请别人加入你的行程", "plan-together", "/zh-hans/help/invite-someone-to-your-trip/", "邀请 共享 共享行程 分享行程 一起 一起规划 朋友 家人 伴侣 情侣 协作 合作 共同编辑 icloud"],
        ["可查看还是可编辑？", "plan-together", "/zh-hans/help/can-view-or-can-edit/", "权限 查看 编辑 只读 可查看 可编辑 移除 移除成员 退出 退出行程 停止共享 取消共享 所有者"],
        ["哪些内容保持私密", "plan-together", "/zh-hans/help/what-stays-private/", "隐私 私密 私人 共享 不共享 住址 家庭地址 行李 文档 支出 数据 数据安全 icloud 服务器"],
        ["你的行李清单", "weather-packing", "/zh-hans/help/your-packing-list/", "行李清单 打包清单 收拾行李 打包 行李箱 箱子 行李 清单 物品 包 衣服 证件 带什么"],
        ["插头和电压", "weather-packing", "/zh-hans/help/plugs-and-voltage/", "插头 插座 转换插头 转换器 转接头 电压 电源 a型 c型 g型 充电器 旅行转换器"],
        ["往年天气和实时预报", "weather-packing", "/zh-hans/help/typical-weather-and-live-forecast/", "天气 天气预报 预报 气温 温度 下雨 降雨 往年天气 气候 平均 apple 天气 雨伞 行程日期"],
        ["粘贴博客里的清单", "guides-someday", "/zh-hans/help/paste-a-list-from-a-blog/", "粘贴 粘贴清单 清单 列表 博客 攻略 小红书 chatgpt gemini claude 备忘录 导入 批量 一次添加多个 很多地点"],
        ["从攻略开始一个行程", "guides-someday", "/zh-hans/help/start-a-trip-from-a-guide/", "攻略 旅行攻略 指南 行程单 现成 模板 行程灵感 自驾 公路旅行 复制 出发日期 开始日期 路线"],
        ["把地点存到“总有一天”", "guides-someday", "/zh-hans/help/save-places-for-someday/", "总有一天 以后再去 收藏 稍后 心愿单 愿望清单 想去的地方 书签 已保存 灵感 种草"],
        ["添加你去过的地方", "my-spots", "/zh-hans/help/add-places-youve-been/", "我的地点 去过的国家 去过的城市 足迹 足迹地图 旅行地图 打卡 图钉 去过 世界地图 刮刮地图"],
        ["从照片里找回过去的旅行", "my-spots", "/zh-hans/help/find-past-trips-in-your-photos/", "照片 照片图库 相册 扫描 扫描照片 位置 定位 gps 过去的旅行 以前的旅行 去过的国家 自动 年份 导入"],
        ["奖牌：从 First Stepper 开始", "my-spots", "/zh-hans/help/medals-from-first-stepper-up/", "奖牌 等级 徽章 级别 成就 first stepper apex traveler 国家 国家数量 去过几个国家 旅行足迹 分享"],
        ["锁定屏幕上的行程", "widgets-watch-calendar", "/zh-hans/help/your-flight-on-the-lock-screen/", "锁定屏幕 锁屏 实时活动 灵动岛 登机牌 航班 登机口 倒计时 现在 接下来 小组件"],
        ["Apple Watch 上的 Trovelo", "widgets-watch-calendar", "/zh-hans/help/trovelo-on-apple-watch/", "apple watch 手表 智能手表 智能叠放 手腕 watchos 实时活动 数码表冠 现在 接下来"],
        ["在日历中查看行程", "widgets-watch-calendar", "/zh-hans/help/your-trip-in-calendar/", "日历 apple 日历 ical 事件 日程 日程表 时间表 同步 航班 酒店 全天"],
        ["Mac 上的 Trovelo", "mac-ai-plan", "/zh-hans/help/trovelo-on-mac/", "mac macbook 电脑 桌面 桌面版 app 同步 看板 列 键盘快捷键 快捷键 边栏"],
        ["用 AI 助手规划", "mac-ai-plan", "/zh-hans/help/plan-with-your-ai-assistant/", "ai 助手 ai助手 人工智能 claude chatgpt codex cursor mcp 对话 聊天 说一句就规划 连接 智能规划"],
        ["在不同日子之间拖动卡片", "mac-ai-plan", "/zh-hans/help/drag-cards-between-days/", "mac 拖动 拖放 拖拽 卡片 列 一天 看板 键盘 快捷键 紧凑 卡片大小 天气"],
        ["iCloud 同步是怎么工作的", "icloud-privacy-pro", "/zh-hans/help/how-icloud-sync-works/", "icloud 同步 设备 iphone ipad mac 不同步 同步失败 没有同步 apple 账户 apple id 存储空间 空间已满 空间不足 账户 备份"],
        ["备份你的所有行程", "icloud-privacy-pro", "/zh-hans/help/back-up-all-your-trips/", "备份 恢复 还原 导出 下载 文件 zip 新 iphone 换手机 迁移 转移 数据 保存"],
        ["Trovelo Pro 包含什么", "icloud-privacy-pro", "/zh-hans/help/what-trovelo-pro-includes/", "pro 价格 多少钱 升级 高级版 会员 订阅 一次性付款 买断 一次性购买 免费版 免费 限制 无限 恢复购买 兑换码 兑换"]
      ]
    },
    "zh-Hant": {
      topics: {"getting-started": "入門", "board-cards": "面板和卡片", "map-routes": "地圖和路線", "flights-transport": "航班和交通", "expenses": "支出", "plan-together": "一起規劃", "weather-packing": "天氣和打包", "guides-someday": "指南和「總有一天」", "my-spots": "我的地點和獎章", "widgets-watch-calendar": "小工具、Watch 和行事曆", "mac-ai-plan": "Mac 和 AI 規劃", "icloud-privacy-pro": "iCloud、隱私和 Pro"},
      words: {"Nothing yet for “{q}”.": "還沒有關於「{q}」的內容。", "Ask me on {link} and I’ll answer.": "到 {link} 問我，我會回答你。", "Soon": "即將推出"},
      articles: [
        ["建立你的第一趟行程", "getting-started", "/zh-hant/help/create-your-first-trip/", "建立 新增 新行程 開始 規劃 第一趟 旅行 旅遊 日期 城市 目的地 範例行程 示範 行程表"],
        ["多個城市的行程", "getting-started", "/zh-hant/help/trips-with-more-than-one-city/", "多城市 多個城市 兩個目的地 加入城市 新增城市 公路旅行 自駕 行程表 路線 不只一個城市"],
        ["把地點加入你的每一天", "board-cards", "/zh-hant/help/add-places-to-your-days/", "加入 新增 地點 景點 餐廳 搜尋 Apple 地圖 卡片 一天 加號 新的"],
        ["把卡片移到另一天", "board-cards", "/zh-hant/help/move-a-card-to-another-day/", "移動 卡片 換一天 改日期 更改日期 改期 另一天 未規劃 拖移 選擇日期 調整"],
        ["我的一天排得多滿？", "board-cards", "/zh-hant/help/how-full-is-my-day/", "行程滿檔 輕鬆 太滿 放不下 剩餘時間 空閒時間 節奏 每日節奏 小時 長條 停留時間 要多久 排滿"],
        ["所有卡片類別", "board-cards", "/zh-hant/help/every-kind-of-card/", "類別 種類 類型 卡片 住宿 飯店 美食 餐廳 地點 航班 火車 門票 博物館 海灘 更改類別"],
        ["備註、檔案和照片", "board-cards", "/zh-hant/help/notes-files-and-photos/", "備註 筆記 檔案 PDF 照片 門票 票券 附件 文件 相機 照片圖庫 當日備註"],
        ["沒有日期的點子", "board-cards", "/zh-hant/help/unplanned-ideas-without-a-day/", "未規劃 點子 靈感 沒有日期 以後 收納匣 也許 待定 願望清單 還沒決定"],
        ["預訂編號", "board-cards", "/zh-hant/help/confirmation-numbers/", "預訂編號 訂位代號 確認編號 訂單編號 預約 PNR 訂房 拷貝 複製 飯店 航班 門禁密碼"],
        ["調整一天的順序", "board-cards", "/zh-hant/help/change-the-order-of-your-day/", "順序 排序 重新排序 調整順序 一天 拖移 移動 往上 往下 先後 第一個 最後"],
        ["最佳化一天的路線", "map-routes", "/zh-hant/help/optimize-a-days-route/", "最佳化 優化 路線 動線 最短 順序 距離 省時間 鎖頭 鎖定 固定 一天 地圖"],
        ["附近有什麼", "map-routes", "/zh-hant/help/whats-nearby/", "附近 周邊 周圍 地圖 美食 咖啡 咖啡廳 餐廳 酒吧 景點 提款機 ATM 藥局 超市 尋找地點"],
        ["在地圖上放置圖釘", "map-routes", "/zh-hant/help/drop-a-pin-on-the-map/", "圖釘 大頭針 標記 地圖 長按 按住 地址 地點 加入 位置 自訂 座標"],
        ["加入有轉機的航班", "flights-transport", "/zh-hant/help/add-a-flight-with-layovers/", "航班 加入 飛機 轉機 中轉 航空公司 航班編號 班機 航廈 登機門 機場 時區"],
        ["火車、巴士和渡輪", "flights-transport", "/zh-hant/help/trains-buses-and-ferries/", "火車 高鐵 新幹線 巴士 客運 公車 渡輪 船 車廂 座位 月台 車站 轉乘 車票"],
        ["從電子郵件匯入預訂", "flights-transport", "/zh-hant/help/import-a-booking-from-an-email/", "匯入 預訂 訂單 電子郵件 email 確認信 PDF 截圖 螢幕截圖 掃描 航班 飯店 租車 機票 讀取"],
        ["記錄一筆支出", "expenses", "/zh-hant/help/log-an-expense/", "支出 花費 記帳 記錄 費用 錢 付款 預算 總計 類別 CSV 試算表 Excel 輸出 匯出"],
        ["用你自己的貨幣看花費", "expenses", "/zh-hant/help/see-costs-in-your-own-money/", "貨幣 幣別 匯率 換算 轉換 主要貨幣 當地貨幣 外幣 港幣 台幣 美元 歐元 日圓 總額"],
        ["和同行的人分攤費用", "expenses", "/zh-hant/help/split-costs-with-your-group/", "分攤 分帳 拆帳 平分 均分 AA 群組 欠款 欠錢 結清 還錢 朋友 家人 誰付的 餘額 Splitwise"],
        ["邀請別人加入你的行程", "plan-together", "/zh-hant/help/invite-someone-to-your-trip/", "邀請 共享 分享 行程 一起 朋友 家人 伴侶 另一半 協作 共同編輯 一起規劃 共享行程 iCloud"],
        ["可檢視還是可編輯？", "plan-together", "/zh-hant/help/can-view-or-can-edit/", "權限 檢視 編輯 唯讀 只能看 移除 成員 離開行程 停止共享 擁有者"],
        ["哪些內容不會共享", "plan-together", "/zh-hant/help/what-stays-private/", "隱私 私人 私密 共享 不共享 住家 地址 打包 文件 花費 支出 資料 iCloud 伺服器"],
        ["你的打包清單", "weather-packing", "/zh-hant/help/your-packing-list/", "打包清單 行李清單 行李 打包 收行李 行李箱 清單 待辦 物品 衣服 證件 要帶什麼"],
        ["插頭和電壓", "weather-packing", "/zh-hant/help/plugs-and-voltage/", "插頭 插座 轉接頭 萬國轉接頭 變壓器 電壓 電源 A 型 C 型 G 型 充電器 旅行轉接頭"],
        ["常見天氣和即時預報", "weather-packing", "/zh-hant/help/typical-weather-and-live-forecast/", "天氣 氣候 預報 天氣預報 氣溫 溫度 下雨 降雨 平均 Apple 天氣 雨傘 旅行日子"],
        ["貼上部落格的清單", "guides-someday", "/zh-hant/help/paste-a-list-from-a-blog/", "貼上 清單 部落格 ChatGPT Gemini Claude 筆記 備忘錄 匯入 一次加入 多個地點 大量 批次"],
        ["從指南開始一趟行程", "guides-someday", "/zh-hant/help/start-a-trip-from-a-guide/", "指南 旅遊指南 行程表 現成 範本 模板 行程靈感 公路旅行 自駕 拷貝 開始日期 路線"],
        ["把地點存到「總有一天」", "guides-someday", "/zh-hant/help/save-places-for-someday/", "總有一天 以後 稍後 收藏 儲存 願望清單 夢想清單 想去的地方 書籤 已儲存 口袋名單 靈感"],
        ["加入你去過的地方", "my-spots", "/zh-hant/help/add-places-youve-been/", "我的地點 足跡 去過的國家 去過的城市 地圖 旅行地圖 圖釘 去過 世界地圖 刮刮地圖 打卡"],
        ["從照片找出過去的旅行", "my-spots", "/zh-hant/help/find-past-trips-in-your-photos/", "照片 照片圖庫 相簿 掃描 分析 位置 定位 GPS 過去的旅行 去過的國家 自動 年份 匯入"],
        ["獎章：從 First Stepper 開始", "my-spots", "/zh-hant/help/medals-from-first-stepper-up/", "獎章 勳章 徽章 等級 成就 First Stepper Apex Traveler 國家 數量 旅行足跡 分享"],
        ["鎖定畫面上的行程", "widgets-watch-calendar", "/zh-hant/help/your-flight-on-the-lock-screen/", "鎖定畫面 即時動態 動態島 登機證 航班 登機門 倒數 現在 接下來 小工具"],
        ["在 Apple Watch 上使用 Trovelo", "widgets-watch-calendar", "/zh-hant/help/trovelo-on-apple-watch/", "Apple Watch 手錶 智慧型堆疊 手腕 watchOS 即時動態 數位錶冠 現在 接下來"],
        ["在行事曆中查看行程", "widgets-watch-calendar", "/zh-hant/help/your-trip-in-calendar/", "行事曆 日曆 Apple 行事曆 iCal 事件 行程表 時間表 同步 航班 飯店 全天"],
        ["在 Mac 上使用 Trovelo", "mac-ai-plan", "/zh-hant/help/trovelo-on-mac/", "Mac MacBook 電腦 桌面 App 同步 面板 欄位 鍵盤快速鍵 側邊欄"],
        ["用 AI 助理規劃行程", "mac-ai-plan", "/zh-hant/help/plan-with-your-ai-assistant/", "AI 助理 人工智慧 Claude ChatGPT Codex Cursor MCP 用說的規劃 連接 連線 聊天機器人"],
        ["在日子之間拖移卡片", "mac-ai-plan", "/zh-hant/help/drag-cards-between-days/", "Mac 拖移 拖放 拖曳 卡片 欄位 一天 面板 鍵盤 精簡 卡片大小 天氣"],
        ["iCloud 同步如何運作", "icloud-privacy-pro", "/zh-hant/help/how-icloud-sync-works/", "iCloud 同步 裝置 iPhone iPad Mac 沒有同步 不同步 Apple 帳號 Apple ID 儲存空間 已滿 備份"],
        ["備份你所有的行程", "icloud-privacy-pro", "/zh-hant/help/back-up-all-your-trips/", "備份 回復 還原 恢復 輸出 匯出 下載 檔案 ZIP 新 iPhone 換手機 轉移 搬移資料 儲存"],
        ["Trovelo Pro 包含什麼", "icloud-privacy-pro", "/zh-hant/help/what-trovelo-pro-includes/", "Pro 價格 升級 付費 高級版 訂閱 一次性購買 買斷 免費方案 免費 限制 無限 回復購買 兌換代碼"]
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
