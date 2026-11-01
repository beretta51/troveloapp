// Trovelo Help: search, the article's device tabs, its table of contents
// and the "Was this helpful?" answer. Every page works without it.
(function () {
  'use strict';

  // ── Every article, written or planned. href is null until it exists.
  var TOPICS = {
    'Getting started': ['i-sparkles', '#E3EDFF', '#2774FD', 'getting-started'],
    'Board & cards': ['i-board', '#FFE5E6', '#E23136', 'board-cards'],
    'Map & routes': ['i-map', '#FDEBD9', '#E65200', 'map-routes'],
    'Flights & transport': ['i-plane', '#E2E9FF', '#2947A0', 'flights-transport'],
    'Expenses': ['i-card', '#E0F5F0', '#2A8572', 'expenses'],
    'Plan together': ['i-people', '#EFE6FE', '#7440C0', 'plan-together'],
    'Weather & packing': ['i-weather', '#DDF5FB', '#0377BE', 'weather-packing'],
    'Guides & Someday': ['i-compass', '#FBEFFF', '#C130B7', 'guides-someday'],
    'My Spots & medals': ['i-globe', '#FEE4EE', '#C1195B', 'my-spots'],
    'Widgets, Watch & Calendar': ['i-watch', '#D6F0F5', '#057E97', 'widgets-watch-calendar'],
    'Mac & AI Plan': ['i-mac', '#ECECF1', '#1D1D1F', 'mac-ai-plan'],
    'iCloud, privacy & Pro': ['i-lock', '#FFF3CC', '#8A6100', 'icloud-privacy-pro']
  };
  var ARTICLES = [
    ["Create your first trip", "Getting started", "/help/create-your-first-trip/", "create new trip start plan first trip dates city destination demo trip"],
    ["Trips with more than one city", "Getting started", "/help/trips-with-more-than-one-city/", "multi city several cities two destinations add city road trip itinerary more than one"],
    ["Add places to your days", "Board & cards", "/help/add-places-to-your-days/", "add place sight restaurant search apple maps card day plus new"],
    ["Move a card to another day", "Board & cards", "/help/move-a-card-to-another-day/", "move card day change date reschedule another day unplanned drag pick a date"],
    ["How full is my day?", "Board & cards", "/help/how-full-is-my-day/", "busy day easy day doesn't fit time left pace hours bar duration how long full"],
    ["Every kind of card", "Board & cards", "/help/every-kind-of-card/", "category kind type card stay food place flight train ticket museum beach change category"],
    ["Notes, files and photos", "Board & cards", "/help/notes-files-and-photos/", "note notes file pdf photo ticket attach document camera photo library day note"],
    ["Ideas without a day", "Board & cards", "/help/unplanned-ideas-without-a-day/", "unplanned ideas no day later tray maybe wishlist undecided"],
    ["Confirmation numbers", "Board & cards", "/help/confirmation-numbers/", "confirmation number booking reference code pnr reservation copy hotel flight door code"],
    ["Change the order of your day", "Board & cards", "/help/change-the-order-of-your-day/", "order reorder sort day drag move up down sequence first last"],
    ["Optimize a day’s route", "Map & routes", "/help/optimize-a-days-route/", "optimize route shortest order distance save time lock pin day map"],
    ["What’s nearby", "Map & routes", "/help/whats-nearby/", "nearby around map food coffee restaurant bar sights atm pharmacy supermarket find a place"],
    ["Drop a pin on the map", "Map & routes", "/help/drop-a-pin-on-the-map/", "pin drop map long press hold address spot add location custom"],
    ["Add a flight with layovers", "Flights & transport", "/help/add-a-flight-with-layovers/", "flight add plane layover stop connection airline terminal gate airport time zone"],
    ["Trains, buses and ferries", "Flights & transport", "/help/trains-buses-and-ferries/", "train bus ferry coach seat platform station rail change transfer ticket shinkansen"],
    ["Import a booking from an email", "Flights & transport", "/help/import-a-booking-from-an-email/", "import booking email confirmation pdf screenshot scan flight hotel rental car ticket read"],
    ["Log an expense", "Expenses", "/help/log-an-expense/", "expense log spend cost money paid budget total category csv spreadsheet export"],
    ["See costs in your own money", "Expenses", "/help/see-costs-in-your-own-money/", "currency exchange rate convert home currency local money dollars euros yen total"],
    ["Split costs with your group", "Expenses", "/help/split-costs-with-your-group/", "split costs group share bill owe settle up friends family who paid balance splitwise"],
    ["Invite someone to your trip", "Plan together", "/help/invite-someone-to-your-trip/", "invite share trip together friends family partner collaborate plan together icloud"],
    ["Can view or can edit?", "Plan together", "/help/can-view-or-can-edit/", "permission view edit read only remove person leave trip stop sharing owner"],
    ["What stays private", "Plan together", "/help/what-stays-private/", "privacy private shared not shared home address packing documents spending data icloud servers"],
    ["Your packing list", "Weather & packing", "/help/your-packing-list/", "packing list pack suitcase luggage checklist items bag clothes documents"],
    ["Plugs and voltage", "Weather & packing", "/help/plugs-and-voltage/", "plug socket outlet adapter voltage power type a type c type g charger travel adapter"],
    ["Typical weather and live forecast", "Weather & packing", "/help/typical-weather-and-live-forecast/", "weather forecast temperature rain typical climate average apple weather umbrella trip days"],
    ["Paste a list from a blog", "Guides & Someday", "/help/paste-a-list-from-a-blog/", "paste list blog chatgpt gemini claude notes import many places at once bulk"],
    ["Start a trip from a guide", "Guides & Someday", "/help/start-a-trip-from-a-guide/", "guides itinerary ready made template trip idea road trip copy start date route"],
    ["Save places for someday", "Guides & Someday", "/help/save-places-for-someday/", "someday save for later wishlist bucket list places want to go bookmark saved ideas"],
    ["Add places you’ve been", "My Spots & medals", "/help/add-places-youve-been/", "my spots visited countries cities map travel map pins been there world scratch map"],
    ["Find past trips in your photos", "My Spots & medals", "/help/find-past-trips-in-your-photos/", "photos photo library scan location gps past trips visited countries automatically year import"],
    ["Medals, from First Stepper up", "My Spots & medals", "/help/medals-from-first-stepper-up/", "medals ranks badges levels first stepper apex traveler countries count achievements travel life share"],
    ["Your trip on the Lock Screen", "Widgets, Watch & Calendar", "/help/your-flight-on-the-lock-screen/", "lock screen live activity dynamic island boarding pass flight gate countdown now next widget"],
    ["Trovelo on Apple Watch", "Widgets, Watch & Calendar", "/help/trovelo-on-apple-watch/", "apple watch smart stack wrist watchos live activity digital crown now next"],
    ["Your trip in Calendar", "Widgets, Watch & Calendar", "/help/your-trip-in-calendar/", "calendar apple calendar ical events agenda schedule sync flights hotels all-day"],
    ["Trovelo on Mac", "Mac & AI Plan", "/help/trovelo-on-mac/", "mac macbook desktop app sync board columns keyboard shortcuts sidebar"],
    ["Plan with your AI assistant", "Mac & AI Plan", "/help/plan-with-your-ai-assistant/", "ai assistant claude chatgpt codex cursor mcp plan by asking connect artificial intelligence"],
    ["Drag cards between days", "Mac & AI Plan", "/help/drag-cards-between-days/", "mac drag drop card column day board keyboard compact card size weather"],
    ["How iCloud sync works", "iCloud, privacy & Pro", "/help/how-icloud-sync-works/", "icloud sync devices iphone ipad mac not syncing apple id storage full account backup"],
    ["Back up all your trips", "iCloud, privacy & Pro", "/help/back-up-all-your-trips/", "backup back up restore export download file zip new iphone transfer data copy save"],
    ["What Trovelo Pro includes", "iCloud, privacy & Pro", "/help/what-trovelo-pro-includes/", "pro price upgrade premium subscription one-time purchase free plan limit unlimited restore purchases redeem code"]
  ];

  var fold = function (s) {
    return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’']/g, '');
  };
  var esc = function (s) {
    return s.replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
  };
  var INDEX = ARTICLES.map(function (a) {
    return { title: a[0], topic: a[1], href: a[2], hay: fold(a[0] + ' ' + a[1] + ' ' + a[3]) };
  });

  function search(q) {
    var words = fold(q).split(/\s+/).filter(Boolean);
    if (!words.length) return [];
    return INDEX.filter(function (a) {
      return words.every(function (w) { return a.hay.indexOf(w) !== -1; });
    }).sort(function (a, b) { return (b.href ? 1 : 0) - (a.href ? 1 : 0); }).slice(0, 8);
  }

  function row(a) {
    var t = TOPICS[a.topic];
    var tile = '<span class="tile" style="--tile:' + t[1] + ';--ac:' + t[2] + '"><span class="sf ' + t[0] + '"></span></span>';
    var text = '<span class="res-t"><b>' + esc(a.title) + '</b><small>' + esc(a.topic) + '</small></span>';
    if (a.href) return '<a class="res" href="' + a.href + '">' + tile + text + '<span class="sf i-chev" style="width:12px;height:12px;color:#9AA0AE"></span></a>';
    return '<div class="res soon">' + tile + text + '<span class="soon-tag">Soon</span></div>';
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
        : '<div class="res-empty">Nothing yet for “' + esc(q) + '”.<span>Ask me on <a href="https://www.reddit.com/r/trovelo/">r/trovelo</a> and I’ll answer.</span></div>';
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
