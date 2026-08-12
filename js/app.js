/* ============================================================
   app.js — The whole learning app's behavior.
   Sections: setup · navigation · home · picker · learn · quiz
             · rewards · settings · help · tutorial · chart
   ============================================================ */

(function () {
  "use strict";

  // ---- Setup ------------------------------------------------
  let save = loadSave();
  let activeSubject = save.currentSubject || "capitals";
  const hasGSAP = typeof gsap !== "undefined";
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));
  const on = (sel, evt, fn) => { const el = typeof sel === "string" ? $(sel) : sel; if (el) el.addEventListener(evt, fn); };

  // Safe global data aliases (prevent ReferenceError if window scope changes)
  const STATES = window.STATES || [];
  const REGIONS = window.REGIONS || [];
  const REGION_EMOJI = window.REGION_EMOJI || {};
  const RARITIES = window.RARITIES || {};
  const RARITY_ORDER = window.RARITY_ORDER || [];
  const PACKS = window.PACKS || [];
  const ALL_ANIMALS = window.ALL_ANIMALS || {};
  const TOTAL_ANIMALS = window.TOTAL_ANIMALS || 60;
  const MASTERY_THRESHOLDS = window.MASTERY_THRESHOLDS || [0, 1, 3, 5, 8];
  const MASTERY_LABELS = window.MASTERY_LABELS || [];
  const MASTERY_EMOJI = window.MASTERY_EMOJI || [];
  const SUBJECTS = window.SUBJECTS || [];
  const getSubjectItems = window.getSubjectItems || function() { return []; };
  const getSubjectGroups = window.getSubjectGroups || function() { return []; };
  const rollFromPack = window.rollFromPack || function() { return null; };

  // Small safe wrappers so the app never crashes if GSAP is missing.
  function animIn(el, opts) {
    if (!hasGSAP || !el) return;
    gsap.from(el, Object.assign({ y: 16, opacity: 0, duration: 0.4, ease: "power2.out" }, opts));
  }
  function pop(el) {
    if (!hasGSAP || !el) return;
    gsap.fromTo(el, { scale: 0.85 }, { scale: 1, duration: 0.45, ease: "back.out(2)" });
  }

  // Audio SFX player (no SFX for button tap per user request)
  const sfxCache = {};
  function playSFX(name) {
    if (save.sound === false) return;
    try {
      if (!sfxCache[name]) {
        sfxCache[name] = new Audio("audio/" + name + ".mp3");
      }
      const audio = sfxCache[name].cloneNode();
      audio.currentTime = 0;
      audio.play().catch(() => {});
    } catch (e) {
      // Audio playback blocked or unhandled
    }
  }

  // Which states the current lesson/quiz uses, and what mode we're in.
  let selected = new Set();     // set of abbreviations
  let pickerMode = "learn";     // "learn" or "quiz"
  let quizMode = "classic";     // which Blooket-style game

  // ---- Coin rewards -----------------------------------------
  // Coins are tied to ONE-TIME milestones per state, so you can never
  // farm coins by replaying the same states. Each reward fires once
  // per state, ever, then that flag stays set in the save file.
  // Learning earns NO coins on purpose — otherwise you could just flip
  // through the cards for free coins. Coins come only from quizzes.
  const COIN_FIRST_RIGHT = 2; // first time you answer a state correctly.
  const COIN_MASTER = 5;    // first time a state becomes mastered.
  let sessionCoins = 0;     // coins earned during the current lesson/quiz.

  // ---- Time on task -----------------------------------------
  let sessionStart = 0;     // when the current lesson/quiz began.
  let sessionLogged = false;// guard so we log each session only once.
  let timerId = null;       // interval that updates the live clock.
  let timerElId = null;     // element id currently being ticked.
  let hiddenAt = 0;         // Date.now() when the tab was hidden (0 = visible).

  // Turn a millisecond span into a friendly "2m 30s" / "45s" string.
  function formatDuration(ms) {
    const total = Math.max(0, Math.round(ms / 1000));
    const m = Math.floor(total / 60), s = total % 60;
    if (m === 0) return s + "s";
    return m + "m " + (s < 10 ? "0" + s : s) + "s";
  }

  // mm:ss for the live on-screen clock.
  function clockText(ms) {
    const total = Math.max(0, Math.floor(ms / 1000));
    const m = Math.floor(total / 60), s = total % 60;
    return m + ":" + (s < 10 ? "0" + s : s);
  }

  // Returns active elapsed ms, excluding any time the tab was hidden.
  function getElapsedMs() {
    if (!sessionStart) return 0;
    return (hiddenAt || Date.now()) - sessionStart;
  }

  // Start a timed session and run the live clock in `elId`. Pass
  // `offsetMs` to continue counting from time already spent (for resume).
  function startTimer(elId, offsetMs) {
    sessionStart = Date.now() - (offsetMs || 0);
    sessionLogged = false;
    timerElId = elId;
    hiddenAt = 0;
    stopTimer();
    function tick() {
      var el = $(elId);
      if (el) el.textContent = "⏱️ " + clockText(Date.now() - sessionStart);
    }
    tick();
    timerId = setInterval(tick, 1000);
  }
  function stopTimer() {
    if (timerId) { clearInterval(timerId); timerId = null; }
    timerElId = null;
    hiddenAt = 0;
  }

  // Pause/resume the timer when the user switches tabs or minimises the window.
  document.addEventListener("visibilitychange", function () {
    if (!sessionStart) return;
    if (document.hidden) {
      if (timerId) {
        clearInterval(timerId);
        timerId = null;
        hiddenAt = Date.now();
      }
    } else if (hiddenAt) {
      sessionStart += Date.now() - hiddenAt;
      hiddenAt = 0;
      if (timerElId) {
        var elId = timerElId;
        function tick() {
          var el = $(elId);
          if (el) el.textContent = "⏱️ " + clockText(Date.now() - sessionStart);
        }
        tick();
        timerId = setInterval(tick, 1000);
      }
    }
  });

  // Record how long a lesson/quiz took, plus what it covered, so it shows
  // up under Time on Task. Guarded so exiting + finishing don't double-log.
  function logActivity(type, extra) {
    if (sessionLogged || !sessionStart) return;
    sessionLogged = true;
    stopTimer();
    save.activityLog.push(Object.assign({
      type: type,
      date: Date.now(),
      durationMs: getElapsedMs(),
    }, extra || {}));
    if (save.activityLog.length > 50) save.activityLog.shift();
    persist(save);
  }

  // Grant a one-time coin reward for a milestone flag on a state.
  // Returns the amount granted (0 if it was already claimed before).
  function claimMilestone(p, flag, amount) {
    if (p[flag]) return 0;
    p[flag] = true;
    sessionCoins += amount;
    save.coins += amount;
    return amount;
  }

  // ---- Subject management -----------------------------------
  function getActiveItems() {
    return getSubjectItems("capitals");
  }

  function updateSubjectBanner() {
    const emojiEl = $("#subjectEmoji");
    const nameEl  = $("#subjectName");
    if (emojiEl) emojiEl.textContent = "🗺️";
    if (nameEl)  nameEl.textContent  = "US State Capitals";
  }

  // ---- Screen navigation ------------------------------------
  const screens = ["home", "picker", "learn", "qmode", "quiz", "results", "settings", "auth"];
  function show(name) {
    screens.forEach((s) => $("#screen-" + s).classList.toggle("hidden", s !== name));
    window.scrollTo({ top: 0, behavior: "smooth" });
    const active = $("#screen-" + name);
    animIn(active, { y: 10 });
  }

  // Generic "back" buttons on the picker/qmode screens.
  document.addEventListener("click", (e) => {
    const go = e.target.getAttribute && e.target.getAttribute("data-go");
    if (!go) return;
    if (go === "home") show("home"), renderHome();
    else if (go === "picker-quiz") openPicker("quiz");
  });

  // ============================================================
  // HOME
  // ============================================================
  function renderHome() {
    updateSubjectBanner();
    $("#statMastered").textContent = masteredCount(save);
    $("#statCoins").textContent = save.coins;
    $("#statAnimals").textContent = uniqueAnimalCount(save);
    renderShop();
    renderCollection();
    renderChart();
    renderTimeOnTask();
    renderPausedQuizzes();
  }

  // The "Resume a Quiz" widget: one row per paused quiz with Resume/Delete.
  function renderPausedQuizzes() {
    const panel = $("#resumePanel");
    const list = $("#resumeList");
    const paused = save.pausedQuizzes || [];
    panel.classList.toggle("hidden", paused.length === 0);
    list.innerHTML = "";
    // Newest first.
    paused.slice().reverse().forEach((q) => {
      const isTest = q.quizMode === "test";
      const icon = isTest ? "📝" : "🎯";
      const modeName = isTest ? "Test" : ((QUIZ_MODES.find((m) => m.id === q.quizMode) || {}).name || "Quiz");
      const total = q.order.length;
      const item = document.createElement("div");
      item.className = "resume-item neo-inset";
      item.innerHTML =
        '<span class="resume-icon">' + icon + "</span>" +
        '<div class="resume-main">' +
          "<strong>" + modeName + "</strong>" +
          '<small class="muted">Question ' + (q.idx + 1) + " of " + total +
            " · " + q.score + " right so far · ⏱️ " + formatDuration(q.elapsedMs || 0) + "</small>" +
        "</div>" +
        '<div class="resume-actions">' +
          '<button class="btn btn-accent" data-resume="' + q.id + '">Resume ▶</button>' +
          '<button class="btn resume-del" data-del="' + q.id + '" title="Delete">🗑️</button>' +
        "</div>";
      item.querySelector("[data-resume]").addEventListener("click", () => resumePausedQuiz(q.id));
      item.querySelector("[data-del]").addEventListener("click", () => {
        gameConfirm({
          emoji: "🗑️",
          title: "Delete this quiz?",
          message: "You'll lose your progress on it and start fresh next time.",
          confirmText: "Delete",
          cancelText: "Keep it",
          danger: true,
          onConfirm: () => { deletePausedQuiz(q.id); toast("Quiz deleted 🗑️"); },
        });
      });
      list.appendChild(item);
    });
  }

  // Friendly date label: "Today 3:15 PM" for today, else "Aug 4 3:15 PM".
  function dateLabel(d) {
    const now = new Date();
    const t = d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    if (d.toDateString() === now.toDateString()) return "Today " + t;
    return d.toLocaleDateString([], { month: "short", day: "numeric" }) + " " + t;
  }

  // Time on Task: total time, a count, and a tappable list of every
  // lesson/quiz. Opening a row reveals the questions it covered.
  // Show/hide the activity history list based on the saved open state.
  function applyHistoryState() {
    const open = !!save.historyOpen;
    $("#historyBody").classList.toggle("hidden", !open);
    $("#historyCaret").textContent = open ? "▾" : "▸";
    $("#historyToggle").setAttribute("aria-expanded", open ? "true" : "false");
  }

  function applyShopState() {
    const open = save.shopOpen !== false;
    $("#shopBody").classList.toggle("hidden", !open);
    $("#shopCaret").textContent = open ? "▾" : "▸";
    $("#shopToggle").setAttribute("aria-expanded", open ? "true" : "false");
  }

  function applyCollectionState() {
    const open = save.collectionOpen !== false;
    $("#collectionBody").classList.toggle("hidden", !open);
    $("#collectionCaret").textContent = open ? "▾" : "▸";
    $("#collectionToggle").setAttribute("aria-expanded", open ? "true" : "false");
  }

  function renderTimeOnTask() {
    $("#statTotalTime").textContent = formatDuration(totalTimeOnTask(save));
    const log = save.activityLog || [];
    $("#statActivities").textContent = log.length;
    applyHistoryState();
    const list = $("#activityList");
    list.innerHTML = "";
    if (!log.length) {
      list.innerHTML = '<p class="chart-empty">No activities yet. Do a lesson or quiz to start tracking your time! ⏱️</p>';
      return;
    }
    // Newest first.
    log.slice().reverse().forEach((a) => {
      const isQuiz = a.type === "quiz";
      const isTest = isQuiz && a.quizMode === "test";
      const icon = isTest ? "📝" : isQuiz ? "🎯" : "📚";
      const modeName = !isQuiz ? "Lesson"
        : isTest ? "Test"
        : ((QUIZ_MODES.find((m) => m.id === a.quizMode) || {}).name || "Quiz");
      const scoreTxt = isQuiz && typeof a.score === "number" ? " · " + a.score + "/" + a.total : "";
      const nStates = a.states ? a.states.length : 0;

      const row = document.createElement("div");
      row.className = "activity neo-inset";
      row.innerHTML =
        '<div class="activity-row">' +
          '<span class="activity-icon">' + icon + "</span>" +
          '<div class="activity-main">' +
            "<strong>" + modeName + (a.exited ? " · left early" : "") + "</strong>" +
            '<small class="muted">' + nStates + " item" + (nStates === 1 ? "" : "s") + scoreTxt + " · " + dateLabel(new Date(a.date)) + "</small>" +
          "</div>" +
          '<span class="activity-time">⏱️ ' + formatDuration(a.durationMs) + "</span>" +
          '<span class="activity-caret">▸</span>' +
        "</div>" +
        '<div class="activity-detail hidden"></div>';

      const detail = row.querySelector(".activity-detail");
      const caret = row.querySelector(".activity-caret");
      row.querySelector(".activity-row").addEventListener("click", () => {
        const nowHidden = detail.classList.toggle("hidden");
        caret.textContent = nowHidden ? "▸" : "▾";
        // Build the question list the first time it's opened.
        if (!nowHidden && !detail.dataset.built) {
          const rows = (a.states || []).map(function (ab) {
            const s = stateByAbbr(ab);
            if (s) return '<div class="qa-row"><span>' + s.state + "</span><span class=\"muted\">🏛️ " + s.capital + "</span></div>";
            // Non-capitals subject item
            return '<div class="qa-row"><span class="muted">' + ab + "</span></div>";
          }).join("");
          detail.innerHTML =
            '<p class="qa-head muted">Questions covered:</p>' +
            (rows || '<p class="muted">No details.</p>');
          detail.dataset.built = "1";
        }
      });
      list.appendChild(row);
    });
  }

  // The shop: a card per pack with its cost and a Buy button.
  function renderShop() {
    $("#shopCoins").textContent = save.coins;
    applyShopState();
    const grid = $("#shopGrid");
    grid.innerHTML = "";
    PACKS.forEach((pack) => {
      const affordable = save.coins >= pack.cost;
      const card = document.createElement("div");
      card.className = "pack-card neo";
      card.innerHTML =
        '<span class="pack-emoji">' + pack.emoji + "</span>" +
        "<h3>" + pack.name + "</h3>" +
        '<small class="muted">' + pack.blurb + "</small>" +
        '<button class="btn ' + (affordable ? "btn-accent" : "") + ' pack-buy" ' +
          (affordable ? "" : "disabled ") + '>' + pack.cost + " 🪙</button>";
      card.querySelector(".pack-buy").addEventListener("click", () => buyPack(pack));
      grid.appendChild(card);
    });
  }

  // How the collection is grouped: "pack" (default) or "rarity".
  let collectionGroupBy = "pack";

  // The collection, split into labeled sections (rows) you can browse.
  function renderCollection() {
    $("#collCount").textContent = uniqueAnimalCount(save);
    $("#collTotal").textContent = TOTAL_ANIMALS;
    applyCollectionState();
    const body = $("#zooBody");
    body.innerHTML = "";

    // Build the list of sections depending on the chosen grouping.
    let sections;
    if (collectionGroupBy === "rarity") {
      // Rarest first, so "Legendaries" sits at the top.
      sections = RARITY_ORDER.slice().reverse().map((rk) => ({
        label: RARITIES[rk].name + (rk === "legendary" ? " ✨" : "") + "s",
        color: RARITIES[rk].color,
        animals: [].concat.apply([], PACKS.map((p) => p.pool)).filter((a) => a.rarity === rk),
      }));
    } else {
      sections = PACKS.map((pack) => ({
        label: pack.emoji + " " + pack.name,
        color: null,
        animals: pack.pool,
      }));
    }

    sections.forEach((sec) => {
      if (!sec.animals.length) return;
      const ownedInSec = sec.animals.filter((a) => (save.collection[a.id] || 0) > 0).length;
      const wrap = document.createElement("div");
      wrap.className = "zoo-section";
      wrap.innerHTML =
        '<h3 class="zoo-section-title"' + (sec.color ? ' style="color:' + sec.color + '"' : "") + ">" +
        sec.label + ' <span class="zoo-section-count">' + ownedInSec + "/" + sec.animals.length + "</span></h3>";
      const grid = document.createElement("div");
      grid.className = "zoo-grid";

      sec.animals.forEach((a) => {
        const count = save.collection[a.id] || 0;
        const owned = count > 0;
        const rar = RARITIES[a.rarity];
        const el = document.createElement("div");
        el.className = "animal neo" + (owned ? "" : " locked");
        if (owned) el.style.setProperty("--glow", rar.color);
        el.title = owned ? a.name + " (" + rar.name + ") — tap for details" : "Hidden — open packs to find it!";
        el.innerHTML =
          (owned ? a.emoji : "❔") +
          (count > 1 ? '<span class="dup">×' + count + "</span>" : "") +
          '<span class="name">' + (owned ? a.name : "???") + "</span>";
        // Tapping an owned animal opens its details (and sell option).
        if (owned) {
          el.style.cursor = "pointer";
          el.addEventListener("click", () => openAnimalDetail(a.id));
        }
        grid.appendChild(el);
      });
      wrap.appendChild(grid);
      body.appendChild(wrap);
    });
  }

  // Wire the By Pack / By Rarity toggle.
  $$("#collGroupSeg button").forEach((btn) => {
    btn.addEventListener("click", () => {
      collectionGroupBy = btn.dataset.group;
      $$("#collGroupSeg button").forEach((b) => b.classList.toggle("active", b === btn));
      renderCollection();
    });
  });

  // ---- Animal details + selling -----------------------------
  function openAnimalDetail(id) {
    const a = ALL_ANIMALS[id];
    if (!a) return;
    const rar = RARITIES[a.rarity];
    const pack = PACKS.find((p) => p.id === a.pack);
    renderAnimalDetail(a, rar, pack);
    openOverlay("#animalOverlay");
  }

  function renderAnimalDetail(a, rar, pack) {
    const count = save.collection[a.id] || 0;
    const box = $("#animalBox");
    box.innerHTML =
      '<div class="reveal-card neo" style="--glow:' + rar.color + '">' +
        '<div class="rarity-badge" style="background:' + rar.color + '">' + rar.name + "</div>" +
        '<div class="reveal-emoji">' + a.emoji + "</div>" +
        '<div class="reveal-name">' + a.name + "</div>" +
        '<p class="muted" style="margin:4px 0 0">From the ' + pack.emoji + " " + pack.name + "</p>" +
        '<p class="muted" style="margin:2px 0 0">You own <strong>' + count + "</strong></p>" +
      "</div>" +
      (count > 0
        ? '<div class="sell-box">' +
            '<div class="sell-qty-row">' +
              '<label for="sellQty">Sell how many? (' + rar.sell + " 🪙 each)</label>" +
              '<input id="sellQty" class="sell-input neo-inset" type="number" inputmode="numeric" min="1" max="' + count + '" value="1" />' +
            "</div>" +
            '<div class="sell-quick">' +
              '<button class="btn sell-chip" data-q="1">Just 1</button>' +
              (count > 1 ? '<button class="btn sell-chip" data-q="' + (count - 1) + '">All but 1</button>' : "") +
              '<button class="btn sell-chip" data-q="' + count + '">All ' + count + "</button>" +
            "</div>" +
            '<button class="btn btn-accent btn-block" id="sellAnimal">Sell <span id="sellQtyLabel">1</span> for <span id="sellTotal">' + rar.sell + "</span> 🪙</button>" +
          "</div>"
        : '<p class="muted">You don\'t have this one anymore.</p>') +
      '<button class="btn btn-block" id="closeAnimal" style="margin-top:10px">Close</button>' +
      '<p class="muted sell-note">Selling gives coins back — a bit less than a pack costs.</p>';

    const qtyInput = $("#sellQty");
    const clampQty = () => {
      let v = parseInt(qtyInput.value, 10);
      if (isNaN(v) || v < 1) v = 1;
      if (v > count) v = count;
      return v;
    };
    const refreshTotal = () => {
      const v = clampQty();
      $("#sellQtyLabel").textContent = v;
      $("#sellTotal").textContent = v * rar.sell;
    };
    if (qtyInput) {
      qtyInput.addEventListener("input", () => {
        // Cap at what you own, but let the field be briefly empty while typing.
        if (qtyInput.value !== "" && parseInt(qtyInput.value, 10) > count) qtyInput.value = count;
        refreshTotal();
      });
      refreshTotal();
    }
    $$(".sell-chip").forEach((c) => c.addEventListener("click", () => {
      qtyInput.value = c.dataset.q;
      refreshTotal();
    }));

    const sell = $("#sellAnimal");
    if (sell) sell.addEventListener("click", () => sellAnimal(a, rar, pack, clampQty()));
    on("#closeAnimal", "click", () => closeOverlay("#animalOverlay"));
  }

  function sellAnimal(a, rar, pack, qty) {
    const count = save.collection[a.id] || 0;
    qty = Math.max(1, Math.min(qty || 1, count));
    if (count <= 0) return;
    save.collection[a.id] = count - qty;
    if (save.collection[a.id] <= 0) delete save.collection[a.id];
    const gained = qty * rar.sell;
    save.coins += gained;
    persist(save);
    toast("Sold " + qty + "× " + a.name + " for " + gained + " 🪙");
    // Refresh the modal (or close it if you sold them all) and the home.
    if ((save.collection[a.id] || 0) > 0) renderAnimalDetail(a, rar, pack);
    else closeOverlay("#animalOverlay");
    renderHome();
  }

  // ============================================================
  // STATE / ITEM PICKER
  // ============================================================
  function openPicker(mode) {
    pickerMode = mode;
    selected = new Set();
    $("#pickerTitle").textContent = mode === "learn"
      ? "Pick states to learn 📚"
      : mode === "test"
      ? "Pick states to test 📝"
      : "Pick states to quiz 🎯";
    $("#pickAll").textContent = "✅ Select All 50";
    buildPickerRegions();
    updatePickCount();
    show("picker");
  }

  function buildPickerRegions() {
    const wrap = $("#pickerRegions");
    wrap.innerHTML = "";

    REGIONS.forEach(function (region) {
      const block = document.createElement("div");
      block.className = "region-block neo panel";
      const states = statesInRegion(region);

      const head = document.createElement("h3");
      head.innerHTML = REGION_EMOJI[region] + " " + region +
        ' <span class="region-toggle" data-region="' + region + '" role="button" tabindex="0">Select region</span>';
      block.appendChild(head);

      const grid = document.createElement("div");
      grid.className = "chip-grid";
      states.forEach(function (s) {
        const chip = document.createElement("div");
        chip.className = "chip neo";
        chip.style.position = "relative";
        chip.setAttribute("role", "button");
        chip.setAttribute("tabindex", "0");
        chip.setAttribute("aria-label", s.state);
        chip.dataset.abbr = s.abbr;
        const p = save.progress ? save.progress[s.abbr] : null;
        const star = p && p.mastered ? '<span class="star">⭐</span>' : "";
        chip.innerHTML = star + s.state + "<small>" + s.abbr + "</small>";
        chip.addEventListener("click", function () { toggleChip(s.abbr, chip); });
        chip.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleChip(s.abbr, chip);
          }
        });
        grid.appendChild(chip);
      });
      block.appendChild(grid);
      wrap.appendChild(block);
    });

    // "Select region" quick buttons.
    $$(".region-toggle").forEach(function (btn) {
      const toggleFn = function (e) {
        e.stopPropagation();
        const region = btn.dataset.region;
        const abbrs = statesInRegion(region).map(function (s) { return s.abbr; });
        const allOn = abbrs.every(function (a) { return selected.has(a); });
        abbrs.forEach(function (a) {
          if (allOn) selected.delete(a); else selected.add(a);
        });
        syncChips();
        updatePickCount();
      };
      btn.addEventListener("click", toggleFn);
      btn.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleFn(e);
        }
      });
    });
  }

  function toggleChip(abbr, chip) {
    if (selected.has(abbr)) selected.delete(abbr);
    else { selected.add(abbr); pop(chip); }
    chip.classList.toggle("selected", selected.has(abbr));
    updatePickCount();
  }

  function syncChips() {
    $$(".chip").forEach((chip) => {
      chip.classList.toggle("selected", selected.has(chip.dataset.abbr));
    });
  }

  function updatePickCount() {
    $("#pickCount").textContent = selected.size + " picked";
  }

  on("#pickAll", "click", function () {
    getActiveItems().forEach(function (item) { selected.add(item.id); });
    syncChips();
    updatePickCount();
  });
  on("#pickNone", "click", () => {
    selected.clear();
    syncChips();
    updatePickCount();
  });

  on("#startFromPicker", "click", () => {
    if (selected.size === 0) {
      toast("Pick at least one state first! 👆");
      return;
    }
    if (pickerMode === "learn") startLearn();
    else if (pickerMode === "test") { quizMode = "test"; startQuiz(Array.from(selected)); }
    else openQuizModePicker();
  });

  // ============================================================
  // LEARN FLOW
  // ============================================================
  let learnList = [];
  let learnIdx = 0;
  let cardFlipped = false;

  function startLearn() {
    learnList = shuffle(Array.from(selected));
    learnIdx = 0;
    sessionCoins = 0;
    startTimer("#learnTimer");
    show("learn");
    renderCard();
  }

  function renderCard() {
    const id = learnList[learnIdx];
    cardFlipped = false;
    const card = $("#flashCard");

    const s = STATES.find(function (st) { return st.abbr === id; });
    if (!s) return;
    const frontText = s.state;
    const tagHTML = '<div class="region-tag">' + REGION_EMOJI[s.region] + " " + s.region + " region</div>";
    stateProgress(save, s.abbr).seen = true;
    persist(save);

    card.innerHTML =
      tagHTML +
      '<div class="state-name">' + frontText + "</div>" +
      '<div class="tap-hint">👆 Tap the card to see the answer</div>';

    $("#learnCounter").textContent = "Card " + (learnIdx + 1) + " of " + learnList.length;
    $("#learnBar").style.width = ((learnIdx) / learnList.length * 100) + "%";
    $("#learnPrev").disabled = learnIdx === 0;
    $("#learnNext").textContent = learnIdx === learnList.length - 1 ? "Finish ✅" : "Next →";
    pop(card);
  }

  function flipCard() {
    playSFX("card_flip");
    const id = learnList[learnIdx];
    const card = $("#flashCard");
    cardFlipped = !cardFlipped;
    if (cardFlipped) {
      const s = STATES.find(function (st) { return st.abbr === id; });
      if (!s) return;
      const frontText = s.state;
      const backText = s.capital;
      card.innerHTML =
        '<div class="state-name">' + frontText + "</div>" +
        '<div class="capital-name">🏛️ ' + backText + "</div>" +
        '<div class="tap-hint">The capital of ' + frontText + " is " + backText + ".</div>";
    } else {
      renderCard();
      return;
    }
    if (hasGSAP) {
      gsap.fromTo(card, { rotationY: -90 }, { rotationY: 0, duration: 0.45, ease: "power2.out" });
    }
  }

  on("#flashCard", "click", flipCard);
  on("#flashCard", "keydown", (e) => { if (e.key === "Enter" || e.key === " ") flipCard(); });

  on("#learnNext", "click", () => {
    if (learnIdx < learnList.length - 1) {
      learnIdx++;
      renderCard();
    } else {
      $("#learnBar").style.width = "100%";
      finishLearn();
    }
  });
  on("#learnPrev", "click", () => {
    if (learnIdx > 0) { learnIdx--; renderCard(); }
  });
  on("#exitLearn", "click", function () { confirmExit(function () {
    logActivity("lesson", { states: learnList.slice(), exited: true });
    show("home"); renderHome();
  }); });

  // After learning, offer an optional review quiz on the same states.
  function finishLearn() {
    logActivity("lesson", { states: learnList.slice() });
    show("results");
    const wrap = $("#resultWrap");
    wrap.innerHTML =
      '<div class="result-emoji">🎉</div>' +
      "<h2>Great studying!</h2>" +
      "<p>You looked at " + learnList.length + " item" + (learnList.length > 1 ? "s" : "") +
        " in " + formatDuration(Date.now() - sessionStart) + ". Nice work!</p>" +
      '<div class="reward-pop neo">' +
        '<div class="r-emoji">🧠</div>' +
        '<div class="r-name">Ready for a challenge?</div>' +
        "<p>Take a quick review to lock it into your memory — and earn coins!</p>" +
      "</div>" +
      '<button class="btn btn-accent btn-lg" id="reviewNow">Start review 🎯</button> ' +
      '<button class="btn btn-lg" id="reviewLater">Maybe later</button>';
    animIn(wrap);
    on("#reviewNow", "click", () => {
      // Reuse the states we just learned as the quiz set.
      quizMode = "classic";
      startQuiz(Array.from(selected));
    });
    on("#reviewLater", "click", () => { show("home"); renderHome(); });
  }

  // ============================================================
  // QUIZ MODE PICKER (Blooket-style)
  // ============================================================
  const QUIZ_MODES = [
    { id: "classic",   emoji: "🎯", name: "Classic",     desc: "Pick the right capital." },
    { id: "reverse",   emoji: "🔄", name: "Backwards",   desc: "Pick the right state." },
    { id: "streak",    emoji: "🔥", name: "Streak Rush", desc: "How long can your streak get?" },
    { id: "type",      emoji: "⌨️", name: "Type It",     desc: "Type the capital yourself." },
  ];

  function openQuizModePicker() {
    const grid = $("#qmodeGrid");
    grid.innerHTML = "";
    QUIZ_MODES.forEach(function (m) {
      const el = document.createElement("div");
      el.className = "qmode neo";
      el.setAttribute("role", "button");
      el.setAttribute("tabindex", "0");
      el.setAttribute("aria-label", m.name + ": " + m.desc);
      el.innerHTML = '<span class="big-emoji">' + m.emoji + "</span><h3>" + m.name + "</h3><small>" + m.desc + "</small>";
      const startFn = function () { quizMode = m.id; startQuiz(Array.from(selected)); };
      el.addEventListener("click", startFn);
      el.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          startFn();
        }
      });
      grid.appendChild(el);
    });
    show("qmode");
  }

  // ============================================================
  // QUIZ FLOW
  // ============================================================
  let quizList = [];
  let quizIdx = 0;
  let quizScore = 0;
  let streak = 0;
  let quizAbbrs = [];
  let resumingId = null;    // id of the paused quiz we're currently playing.

  // Weighted random pick — items with lower mastery appear more often.
  function weightedSample(ids, count) {
    const progMap = save.progress;
    const weighted = [];
    ids.forEach(function (id) {
      const correct = (progMap[id] || {}).correct || 0;
      const lvl = masteryLevel(correct);
      // Weight: mastered=1, proficient=2, familiar=3, not started=4
      const w = [4, 3, 2, 1][lvl] || 1;
      for (let i = 0; i < w; i++) weighted.push(id);
    });
    const out = [];
    const pool = shuffle(weighted);
    const seen = new Set();
    for (let i = 0; i < pool.length && out.length < count; i++) {
      if (!seen.has(pool[i])) { seen.add(pool[i]); out.push(pool[i]); }
    }
    // Fill any remaining slots from original list if weighted pool runs short
    if (out.length < count) {
      shuffle(ids).forEach(function (id) { if (!seen.has(id) && out.length < count) { seen.add(id); out.push(id); } });
    }
    return out;
  }

  function startQuiz(abbrs) {
    quizAbbrs = abbrs;
    quizList = shuffle(abbrs.slice());
    quizIdx = 0;
    quizScore = 0;
    streak = 0;
    sessionCoins = 0;
    resumingId = null;      // this is a fresh quiz, not a resumed one.
    startTimer("#quizTimer");
    show("quiz");
    renderQuestion();
  }

  // Save the current quiz so it can be resumed from home later.
  function savePausedQuiz() {
    // Nothing worth saving if it hasn't really started or is basically done.
    if (quizIdx >= quizList.length) return;
    const id = resumingId || ("q" + Date.now());
    const entry = {
      id: id,
      quizMode: quizMode,
      subjectId: activeSubject,
      order: quizList.slice(),
      idx: quizIdx,
      score: quizScore,
      streak: streak,
      sessionCoins: sessionCoins,
      elapsedMs: getElapsedMs(),
      savedAt: Date.now(),
    };
    const i = save.pausedQuizzes.findIndex((q) => q.id === id);
    if (i >= 0) save.pausedQuizzes[i] = entry; else save.pausedQuizzes.push(entry);
    persist(save);
  }

  // Resume a previously paused quiz from where it left off.
  function resumePausedQuiz(id) {
    const entry = save.pausedQuizzes.find((q) => q.id === id);
    if (!entry) return;
    quizMode = entry.quizMode;
    quizList = entry.order.slice();
    quizAbbrs = entry.order.slice();
    quizIdx = entry.idx;
    quizScore = entry.score;
    streak = entry.streak || 0;
    sessionCoins = entry.sessionCoins || 0;
    resumingId = id;
    // Continue the clock from the time already spent.
    startTimer("#quizTimer", entry.elapsedMs || 0);
    show("quiz");
    renderQuestion();
  }

  // Forget a paused quiz (its widget disappears; next time it starts fresh).
  function deletePausedQuiz(id) {
    save.pausedQuizzes = save.pausedQuizzes.filter((q) => q.id !== id);
    persist(save);
    renderPausedQuizzes();
  }

  function getWrongAnswers(correctAnswer, itemId, count) {
    const pool = STATES
      .map(function (s) { return quizMode === "reverse" ? s.state : s.capital; })
      .filter(function (v) { return v !== correctAnswer; });
    return shuffle(pool).slice(0, count);
  }

  function renderQuestion() {
    const id = quizList[quizIdx];
    $("#quizCounter").textContent = "Question " + (quizIdx + 1) + " of " + quizList.length;
    $("#quizBar").style.width = (quizIdx / quizList.length * 100) + "%";
    $("#quizStreak").textContent = "🔥 " + streak;

    const qCard = $("#questionCard");
    const grid = $("#answerGrid");
    grid.innerHTML = "";
    grid.style.gridTemplateColumns = ""; // reset any layout from a type question.

    let questionText, correctAnswer;

    const s = STATES.find(function (st) { return st.abbr === id; });
    if (!s) return;
    if (quizMode === "reverse") {
      questionText = '<p class="muted">Which state has this capital?</p><div class="q-state">🏛️ ' + s.capital + "</div>";
      correctAnswer = s.state;
    } else {
      questionText = '<p class="muted">What is the capital of…</p><div class="q-state">' + REGION_EMOJI[s.region] + " " + s.state + "</div>";
      correctAnswer = s.capital;
    }

    // "type" mode is always typed. Test mode mixes it up: each question is
    // randomly multiple-choice OR type-in, so you get both in one session.
    const typeThisQuestion = quizMode === "type" || (quizMode === "test" && Math.random() < 0.5);
    if (typeThisQuestion) {
      renderTypeQuestion(id, qCard, grid, questionText, correctAnswer);
      return;
    }

    qCard.innerHTML = questionText;
    const wrongOpts = getWrongAnswers(correctAnswer, id, 3);
    const answers = shuffle([correctAnswer].concat(wrongOpts));
    buildAnswers(answers, correctAnswer);
    pop(qCard);
    animIn(grid, { y: 8 });
  }

  function buildAnswers(options, correct) {
    const grid = $("#answerGrid");
    grid.innerHTML = "";
    options.forEach((opt) => {
      const btn = document.createElement("button");
      btn.className = "answer btn";
      btn.textContent = opt;
      btn.addEventListener("click", () => handleAnswer(btn, opt === correct, correct));
      grid.appendChild(btn);
    });
  }

  function renderTypeQuestion(id, qCard, grid, questionText, correctAnswer) {
    // If questionText/correctAnswer not passed (legacy call), compute from capitals
    if (questionText === undefined) {
      const s = STATES.find(function (st) { return st.abbr === id; });
      questionText = '<p class="muted">Type the capital of…</p><div class="q-state">' + REGION_EMOJI[s.region] + " " + s.state + "</div>";
      correctAnswer = s.capital;
    }
    qCard.innerHTML = questionText;
    grid.style.gridTemplateColumns = "1fr";
    grid.innerHTML =
      '<input id="typeInput" class="btn neo-inset" style="text-align:center;font-size:1.1rem;" placeholder="Type here…" autocomplete="off" />' +
      '<button class="btn btn-primary" id="typeSubmit">Check ✓</button>';
    const input = $("#typeInput");
    input.focus();
    const answer = correctAnswer;
    const submit = function () {
      const guess = input.value.trim().toLowerCase();
      const ok = guess === answer.toLowerCase();
      const fake = document.createElement("div");
      handleAnswer(fake, ok, answer, input);
    };
    on("#typeSubmit", "click", submit);
    input.addEventListener("keydown", function (e) { if (e.key === "Enter") submit(); });
  }

  function handleAnswer(btn, isCorrect, correct, typeInput) {
    const id = quizList[quizIdx];
    const p = stateProgress(save, id);
    p.attempts++;

    // Lock further clicks for this question.
    $$("#answerGrid .answer").forEach(function (b) { b.disabled = true; b.classList.add("dim"); });

    if (isCorrect) {
      quizScore++;
      streak++;
      p.correct++;
      if (streak >= 3 && streak % 3 === 0) {
        playSFX("streak");
      } else {
        playSFX("correct");
      }
      // One-time coin rewards — replaying earns nothing here.
      claimMilestone(p, "correctRewarded", COIN_FIRST_RIGHT);
      // Mastered = answered correctly at least twice.
      if (p.correct >= 2 && !p.mastered) p.mastered = true;
      if (p.mastered) claimMilestone(p, "masterRewarded", COIN_MASTER);

      if (streak > save.bestStreak) save.bestStreak = streak;
      if (btn.classList) { btn.classList.remove("dim"); btn.classList.add("correct"); }
      if (typeInput) typeInput.classList.add("correct");
      cheer();
    } else {
      streak = 0;
      playSFX("wrong");
      if (btn.classList) { btn.classList.remove("dim"); btn.classList.add("wrong"); }
      if (typeInput) typeInput.classList.add("wrong");
      // Highlight the correct answer for learning.
      $$("#answerGrid .answer").forEach(function (b) {
        if (b.textContent === correct) { b.classList.remove("dim"); b.classList.add("correct"); }
      });
      if (typeInput) toast("The answer was " + correct + " 🙂");
    }
    $("#quizStreak").textContent = "🔥 " + streak;
    persist(save);

    // Streak Rush ends the moment you miss.
    if (quizMode === "streak" && !isCorrect) {
      setTimeout(finishQuiz, 900);
      return;
    }
    setTimeout(nextQuestion, 950);
  }

  function nextQuestion() {
    if (quizIdx < quizList.length - 1) {
      quizIdx++;
      $("#answerGrid").style.gridTemplateColumns = "";
      renderQuestion();
    } else {
      finishQuiz();
    }
  }

  on("#exitQuiz", "click", () => {
    gameConfirm({
      emoji: "⏸️",
      title: "Leave this quiz?",
      message: "We'll save it so you can resume it from the home screen.",
      confirmText: "Leave & save",
      cancelText: "Keep going",
      onConfirm: () => {
        savePausedQuiz();
        stopTimer();
        show("home"); renderHome();
      },
    });
  });

  // ============================================================
  // RESULTS + REWARDS  (the "rewarding" part!)
  // ============================================================
  function finishQuiz() {
    playSFX("completed");
    $("#quizBar").style.width = "100%";
    // A finished quiz is no longer resumable — drop its paused entry.
    if (resumingId) { deletePausedQuiz(resumingId); resumingId = null; }
    const total = quizMode === "streak" ? quizScore : quizList.length;
    const perfect = quizMode !== "streak" && quizScore === quizList.length;

    // Coins were already granted, once each, during the quiz via
    // claimMilestone(). sessionCoins is just how many landed THIS round —
    // it's 0 if you replayed states you'd already earned from.
    const earned = sessionCoins;

    // Record for the chart (skip streak mode, which has no fixed total).
    if (quizMode !== "streak") {
      save.quizHistory.push({ date: Date.now(), score: quizScore, total: quizList.length });
      if (save.quizHistory.length > 30) save.quizHistory.shift();
    }
    logActivity("quiz", { quizMode, states: quizAbbrs, score: quizScore, total: quizList.length });
    persist(save);

    // Build the results screen.
    show("results");
    const wrap = $("#resultWrap");
    const mastered = masteredCount(save);
    const emoji = perfect ? "🏆" : quizScore > total / 2 ? "🌟" : "💪";
    const headline = perfect ? "PERFECT! You're a capitals champion!" :
      quizScore > total / 2 ? "Awesome job!" : "Good try — keep practicing!";

    const coinLine = earned > 0
      ? '<p>🪙 You earned <strong>' + earned + " coins</strong>! Spend them on animal packs. 🎁</p>"
      : '<p class="muted">No new coins this time. You earn coins the first time you get a state right — and more when you master it. Keep going! 🪙</p>';

    const masteredLine = "States mastered: " + mastered + " / 50";
    wrap.innerHTML =
      '<div class="result-emoji">' + emoji + "</div>" +
      "<h2>" + headline + "</h2>" +
      (quizMode === "streak"
        ? '<div class="result-score">🔥 ' + quizScore + "</div><p>Longest streak this round!</p>"
        : '<div class="result-score">' + quizScore + " / " + total + "</div>") +
      coinLine +
      '<p class="muted">You have ' + save.coins + " 🪙" + (masteredLine ? " · " + masteredLine : "") + "</p>";

    // Straight-to-shop button when there are coins to spend.
    wrap.insertAdjacentHTML("beforeend",
      '<div style="margin-top:16px; display:flex; gap:12px; justify-content:center; flex-wrap:wrap;">' +
      (save.coins > 0 ? '<button class="btn btn-primary btn-lg" id="goShop">Open packs 🎁</button>' : "") +
      '<button class="btn btn-accent btn-lg" id="playAgain">Play again 🔁</button>' +
      '<button class="btn btn-lg" id="backHome">Home 🏠</button>' +
      "</div>");

    animIn(wrap);
    if (perfect && hasGSAP) {
      gsap.fromTo(".result-score", { scale: 0.4 }, { scale: 1, duration: 0.6, ease: "elastic.out(1,0.4)" });
      launchConfetti();
    }

    const shopBtn = $("#goShop");
    if (shopBtn) shopBtn.addEventListener("click", () => {
      save.shopOpen = true;
      show("home"); renderHome();
      applyShopState();
      $("#shopPanel").scrollIntoView({ behavior: "smooth" });
    });
    on("#playAgain", "click", () => startQuiz(quizAbbrs));
    on("#backHome", "click", () => { show("home"); renderHome(); });
  }

  // ---- Buying + opening packs -------------------------------
  function buyPack(pack) {
    if (save.coins < pack.cost) { toast("Not enough coins yet — do a lesson or quiz! 🪙"); return; }
    save.coins -= pack.cost;
    playSFX("pack_bought");
    const animal = rollFromPack(pack);
    const newCount = addAnimal(save, animal.id);
    persist(save);
    openPackAnimation(pack, animal, newCount);
  }

  // The toy-package opening sequence: name the pack, shake the box,
  // then burst it open to reveal the animal with its rarity glow.
  function openPackAnimation(pack, animal, count) {
    const rar = RARITIES[animal.rarity];
    const overlay = $("#packOverlay");
    const box = $("#packBox");
    overlay.classList.remove("hidden");
    box.innerHTML =
      '<div class="pack-title">' + pack.emoji + " " + pack.name + "</div>" +
      '<div class="pack-parcel" id="packParcel" role="button" tabindex="0" aria-label="Tap to open package">🎁</div>' +
      '<div class="pack-tap muted" role="button" tabindex="0">Tap the package to open it!</div>';

    let opened = false;
    const parcel = $("#packParcel");
    const tapText = box.querySelector(".pack-tap");

    // Idle wiggle to invite a tap.
    if (hasGSAP) gsap.to(parcel, { rotation: 5, duration: 0.4, yoyo: true, repeat: -1, ease: "sine.inOut" });

    function reveal() {
      if (opened) return;
      opened = true;
      if (hasGSAP) gsap.killTweensOf(parcel);

      const isTop = animal.rarity === "epic" || animal.rarity === "legendary";
      playSFX("pack_open");
      setTimeout(() => {
        if (isTop) playSFX("reveal_epic");
        else if (animal.rarity === "rare") playSFX("reveal_rare");
        else playSFX("reveal_common");
      }, 250);

      box.innerHTML =
        '<div class="pack-title">' + pack.emoji + " " + pack.name + "</div>" +
        '<div class="reveal-card neo" style="--glow:' + rar.color + '">' +
          '<div class="rarity-badge" style="background:' + rar.color + '">' + rar.name + "</div>" +
          '<div class="reveal-emoji">' + animal.emoji + "</div>" +
          '<div class="reveal-name">' + animal.name + "</div>" +
          (count > 1
            ? '<div class="muted">You now have ' + count + " of these!</div>"
            : '<div class="muted">✨ New animal for your collection!</div>') +
        "</div>" +
        '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:8px;">' +
          '<button class="btn btn-accent" id="packAgain">Buy another (' + pack.cost + " 🪙)</button>" +
          '<button class="btn" id="packDone">Done</button>' +
        "</div>";

      const card = box.querySelector(".reveal-card");
      if (hasGSAP) {
        gsap.fromTo(card, { scale: 0.2, rotation: -12, opacity: 0 },
          { scale: 1, rotation: 0, opacity: 1, duration: 0.6, ease: "back.out(2)" });
        gsap.fromTo(box.querySelector(".reveal-emoji"), { scale: 0 },
          { scale: 1, duration: 0.7, delay: 0.15, ease: "elastic.out(1,0.4)" });
      }
      if (isTop) launchConfetti();

      $("#packAgain").disabled = save.coins < pack.cost;
      on("#packAgain", "click", () => {
        if (save.coins < pack.cost) { toast("Not enough coins! 🪙"); return; }
        closeOverlay("#packOverlay");
        buyPack(pack);
      });
      on("#packDone", "click", () => {
        closeOverlay("#packOverlay");
        renderHome();
      });
    }

    const triggerOpen = () => {
      if (opened) return;
      if (hasGSAP) {
        // A quick shake, then reveal.
        gsap.to(parcel, { x: -8, duration: 0.05, repeat: 5, yoyo: true,
          onComplete: () => { gsap.to(parcel, { scale: 1.4, opacity: 0, duration: 0.25, onComplete: reveal }); } });
      } else { reveal(); }
    };

    parcel.addEventListener("click", triggerOpen);
    if (tapText) tapText.addEventListener("click", triggerOpen);
    parcel.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); triggerOpen(); }
    });
  }

  // A tiny celebratory pulse on a correct answer.
  function cheer() {
    if (!hasGSAP) return;
    const streakEl = $("#quizStreak");
    gsap.fromTo(streakEl, { scale: 1.4 }, { scale: 1, duration: 0.4, ease: "back.out(3)" });
  }

  // Falling confetti made of little colored divs (no images needed).
  function launchConfetti() {
    const colors = ["#5b7cfa", "#34c98b", "#f6b73c", "#ef5f6b", "#a06bff"];
    for (let i = 0; i < 60; i++) {
      const bit = document.createElement("div");
      bit.className = "confetti";
      bit.style.left = Math.random() * 100 + "vw";
      bit.style.background = colors[i % colors.length];
      document.body.appendChild(bit);
      if (hasGSAP) {
        gsap.to(bit, {
          y: window.innerHeight + 40,
          x: (Math.random() - 0.5) * 200,
          rotation: Math.random() * 720,
          duration: 2 + Math.random() * 1.5,
          ease: "power1.in",
          onComplete: () => bit.remove(),
        });
      } else {
        bit.classList.add("confetti-fallback");
        setTimeout(() => bit.remove(), 2500);
      }
    }
  }

  // ============================================================
  // SETTINGS
  // ============================================================

  function applyTheme(theme) {
    if (theme === "auto") document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", theme);
    save.theme = theme;
    $$("#themeSeg button").forEach((b) => b.classList.toggle("active", b.dataset.theme === (theme || "auto")));
  }
  // Quiz answer layout: "grid" (2x2 squares) or "stack" (rectangles).
  function applyAnswerLayout(layout) {
    const l = layout === "stack" ? "stack" : "grid";
    save.answerLayout = l;
    document.body.classList.toggle("answers-grid", l === "grid");
    document.body.classList.toggle("answers-stack", l === "stack");
    $$("#layoutSeg button").forEach((b) => b.classList.toggle("active", b.dataset.layout === l));
  }

  // Collapse/expand the Time-on-Task history (remembered across visits).
  on("#historyToggle", "click", () => {
    save.historyOpen = !save.historyOpen;
    persist(save);
    applyHistoryState();
  });

  on("#shopToggle", "click", () => {
    save.shopOpen = save.shopOpen === false ? true : false;
    persist(save);
    applyShopState();
  });

  on("#collectionToggle", "click", () => {
    save.collectionOpen = save.collectionOpen === false ? true : false;
    persist(save);
    applyCollectionState();
  });

  on("#settingsBtn", "click", () => show("settings"));
  on("#settingsBack", "click", () => { show("home"); renderHome(); });
  on("#closeSettings", "click", () => { show("home"); renderHome(); });
    on("#profileSignOutBtn", "click", async () => {
    if (!window.FirebaseService) return;
    try {
      await window.FirebaseService.signOutUser();
      closeOverlay("#profileOverlay");
      toast("Signed out. Operating in Guest mode 👤");
    } catch (err) {
      toast("Sign-out error");
    }
  });
  on("#helpBtn", "click", () => openOverlay("#helpOverlay"));
  on("#closeHelp", "click", () => closeOverlay("#helpOverlay"));

  $$("#themeSeg button").forEach((b) => {
    b.addEventListener("click", () => { applyTheme(b.dataset.theme); persist(save); });
  });
  $$("#layoutSeg button").forEach((b) => {
    b.addEventListener("click", () => { applyAnswerLayout(b.dataset.layout); persist(save); });
  });
  const soundToggle = $("#soundToggle");
  if (soundToggle) {
    soundToggle.checked = save.sound !== false;
    soundToggle.addEventListener("change", () => {
      save.sound = soundToggle.checked;
      persist(save);
      if (save.sound) playSFX("correct");
    });
  }
  on("#replayTutorial", "click", () => {
    show("home");
    startTutorial();
  });
  on("#resetProgress", "click", () => {
    gameConfirm({
      emoji: "⚠️",
      title: "Reset everything?",
      message: "This erases ALL your coins, animals, and progress. It can't be undone.",
      confirmText: "Yes, reset",
      cancelText: "Keep it",
      danger: true,
      onConfirm: () => {
        clearSave();
        save = loadSave();
        applyTheme(save.theme || "auto");
        applyAnswerLayout(save.answerLayout || "grid");
        renderHome();
        show("home");
        toast("Progress reset. Fresh start! 🌱");
      },
    });
  });

  function openOverlay(sel) {
    const o = $(sel);
    o.classList.remove("hidden");
    animIn(o.querySelector(".modal"), { scale: 0.9, opacity: 0, y: 0 });
  }
  function closeOverlay(sel) { $(sel).classList.add("hidden"); }
  // Click on the dark backdrop closes a modal.
  $$(".overlay").forEach((o) => o.addEventListener("click", (e) => { if (e.target === o) o.classList.add("hidden"); }));

  // ============================================================
  // TUTORIAL — one-time arrow coach marks
  // ============================================================
  const TUTORIAL_STEPS = [
    { sel: "#goLearn",     title: "📚 Learn Mode", text: "Tap here to study flash cards. Great for your first time with a state!", arrow: "👆", side: "top" },
    { sel: "#goQuiz",      title: "🎯 Quiz Mode", text: "Ready to test yourself? Play a fun game and earn coins!", arrow: "👆", side: "top" },
    { sel: "#goTest",      title: "📝 Test Mode", text: "The real challenge! Every question mixes multiple-choice and typing. Pick any states or all 50.", arrow: "👆", side: "top" },
    { sel: "#shopPanel",   title: "🏪 Pack Shop", text: "Spend the coins you earn on animal packs. Each pack is a surprise — some animals are super rare! 🎁", arrow: "👇", side: "bottom" },
    { sel: "#zooPanel",    title: "🐾 My Collection", text: "Every animal you find from packs lives here. You can get doubles — try to collect them all! 🐶🦄", arrow: "👇", side: "bottom" },
    { sel: "#progressPanel", title: "📈 Your Progress", text: "This chart remembers your quiz scores so you can watch yourself get better!", arrow: "👇", side: "bottom" },
    { sel: "#helpBtn",     title: "❓ Help Anytime", text: "Stuck? Tap the question mark for a quick guide — anytime.", arrow: "👆", side: "top" },
    { sel: "#settingsBtn", title: "⚙️ Settings", text: "Change the look, switch light/dark, or replay this tour whenever you like.", arrow: "👆", side: "top" },
  ];
  let tutStep = 0;

  // Block the user from scrolling while the tutorial is up (the coach marks
  // are positioned to the current layout). Programmatic scrollIntoView still
  // works, so each step can still bring its target into view.
  const SCROLL_KEYS = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " ", "Spacebar"];
  function preventScroll(e) { e.preventDefault(); }
  function preventScrollKeys(e) {
    if (SCROLL_KEYS.indexOf(e.key) !== -1 && e.target.tagName !== "INPUT") e.preventDefault();
  }
  function lockScroll() {
    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });
    window.addEventListener("keydown", preventScrollKeys, { passive: false });
  }
  function unlockScroll() {
    window.removeEventListener("wheel", preventScroll, { passive: false });
    window.removeEventListener("touchmove", preventScroll, { passive: false });
    window.removeEventListener("keydown", preventScrollKeys, { passive: false });
  }

  function startTutorial() {
    tutStep = 0;
    show("home");
    $("#coachLayer").classList.remove("hidden");
    lockScroll();
    renderCoach();
  }

  function renderCoach() {
    const layer = $("#coachLayer");
    const step = TUTORIAL_STEPS[tutStep];
    const target = $(step.sel);
    if (!target) { endTutorial(); return; }

    const vw = window.innerWidth, vh = window.innerHeight;

    // Make sure the target is actually on screen before we measure it —
    // otherwise the arrow lands at off-screen coordinates. Instant scroll
    // (not smooth) so the rectangle we read is final. Panels can be taller
    // than the screen, so for those we scroll their TOP into view and point
    // at the heading band instead of trying to ring the whole thing.
    const tall = target.getBoundingClientRect().height > vh * 0.6;
    if (typeof target.scrollIntoView === "function") {
      target.scrollIntoView({ block: tall ? "start" : "center", inline: "nearest", behavior: "auto" });
    }
    if (tall) window.scrollBy(0, -70); // leave a little breathing room above.
    const r = target.getBoundingClientRect();

    // The region the ring hugs and the arrow points at. For tall panels
    // that's just the top slice (the heading); for normal controls it's
    // the whole element.
    const fTop = r.top;
    const fBottom = tall ? Math.min(r.top + 92, r.bottom) : r.bottom;

    layer.innerHTML =
      '<div class="coach-catch"></div>' +
      '<div class="coach-arrow"></div>' +
      '<div class="coach-bubble">' +
        "<h3>" + step.title + "</h3>" +
        "<p>" + step.text + "</p>" +
        '<div class="coach-nav">' +
          '<button class="btn" id="tutSkip">Skip</button>' +
          '<small>' + (tutStep + 1) + " / " + TUTORIAL_STEPS.length + "</small>" +
          '<button class="btn btn-primary" id="tutNext">' + (tutStep === TUTORIAL_STEPS.length - 1 ? "Done!" : "Next →") + "</button>" +
        "</div>" +
      "</div>";

    const arrow = layer.querySelector(".coach-arrow");
    const bubble = layer.querySelector(".coach-bubble");
    const cx = Math.max(30, Math.min(r.left + r.width / 2, vw - 30));

    // Put the callout wherever there's more room, and always point the
    // arrow toward the target (👆 when we're below it, 👇 when above).
    const bubbleW = 280, bubbleH = 190, gap = 8, arrowH = 44;
    const bx = Math.max(12, Math.min(cx - bubbleW / 2, vw - bubbleW - 12));
    const placeBelow = (vh - fBottom) >= fTop; // more space under the focus region?

    arrow.style.left = (cx - 20) + "px";
    let bTop;
    if (placeBelow) {
      arrow.textContent = "👆";
      arrow.style.top = (fBottom + gap) + "px";
      bTop = fBottom + gap + arrowH;
    } else {
      arrow.textContent = "👇";
      arrow.style.top = (fTop - gap - arrowH) + "px";
      bTop = fTop - gap - arrowH - bubbleH;
    }
    // Clamp the bubble fully on-screen no matter what.
    bTop = Math.max(12, Math.min(bTop, vh - bubbleH - 12));
    bubble.style.top = bTop + "px";
    bubble.style.bottom = "auto";
    bubble.style.left = bx + "px";
    bubble.style.maxWidth = Math.min(bubbleW, vw - 24) + "px";

    // Re-clamp using the bubble's real rendered height (text length varies),
    // so a taller bubble can never spill off the bottom or top.
    const realH = bubble.offsetHeight;
    let top2 = bTop;
    if (top2 + realH > vh - 12) top2 = vh - realH - 12;
    if (top2 < 12) top2 = 12;
    bubble.style.top = top2 + "px";

    animIn(bubble, { scale: 0.9, opacity: 0 });
    if (hasGSAP) {
      const dir = placeBelow ? -6 : 6; // bob toward the target
      gsap.fromTo(arrow, { y: dir }, { y: -dir, duration: 0.6, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }

    on("#tutNext", "click", () => {
      if (tutStep < TUTORIAL_STEPS.length - 1) { tutStep++; renderCoach(); }
      else endTutorial();
    });
    on("#tutSkip", "click", endTutorial);
  }

  function endTutorial() {
    unlockScroll();
    $("#coachLayer").classList.add("hidden");
    $("#coachLayer").innerHTML = "";
    save.tutorialDone = true;
    persist(save);
  }

  // Keep coach marks aligned if the window resizes mid-tutorial.
  window.addEventListener("resize", () => {
    if (!$("#coachLayer").classList.contains("hidden")) renderCoach();
  });

  // ============================================================
  // PROGRESS CHART (hand-drawn on a canvas — no libraries)
  // ============================================================
  function renderChart() {
    const canvas = $("#progressChart");
    const empty = $("#chartEmpty");
    const hist = save.quizHistory || [];
    if (!hist.length) { canvas.classList.add("hidden"); empty.classList.remove("hidden"); return; }
    canvas.classList.remove("hidden"); empty.classList.add("hidden");

    const ctx = canvas.getContext("2d");
    // Match canvas resolution to its CSS size for crisp lines.
    const rect = canvas.getBoundingClientRect();
    const width = (rect && rect.width > 50 ? rect.width : (canvas.clientWidth || 320));
    canvas.width = width * 2;
    canvas.height = 160 * 2;
    ctx.scale(2, 2);
    const W = width, H = 160, pad = 24;

    ctx.clearRect(0, 0, W, H);
    const css = getComputedStyle(document.body);
    const accent = css.getPropertyValue("--md-primary").trim() || css.getPropertyValue("--accent").trim() || "#5b7cfa";
    const accent2 = css.getPropertyValue("--md-secondary").trim() || css.getPropertyValue("--accent-2").trim() || "#34c98b";
    const soft = css.getPropertyValue("--text-soft").trim() || "#888";

    // Data = percentage score of each recorded quiz.
    const pts = hist.map((h) => (h && h.total ? Math.min(1, Math.max(0, h.score / h.total)) : 0));
    const n = pts.length;
    const x = (i) => n === 1 ? W / 2 : pad + (i / (n - 1)) * (W - pad * 2);
    const y = (v) => H - pad - v * (H - pad * 2);

    // Gridlines at 0/50/100%.
    ctx.strokeStyle = "rgba(128,128,128,0.2)";
    ctx.lineWidth = 1;
    [0, 0.5, 1].forEach((v) => {
      ctx.beginPath(); ctx.moveTo(pad, y(v)); ctx.lineTo(W - pad, y(v)); ctx.stroke();
      ctx.fillStyle = soft; ctx.font = "10px sans-serif";
      ctx.fillText(Math.round(v * 100) + "%", 2, y(v) + 3);
    });

    // Filled area under the line.
    const grad = ctx.createLinearGradient(0, pad, 0, H);
    grad.addColorStop(0, accent + "55");
    grad.addColorStop(1, accent + "00");
    ctx.beginPath();
    ctx.moveTo(x(0), y(pts[0]));
    pts.forEach((v, i) => ctx.lineTo(x(i), y(v)));
    ctx.lineTo(x(n - 1), H - pad); ctx.lineTo(x(0), H - pad); ctx.closePath();
    ctx.fillStyle = grad; ctx.fill();

    // The line itself.
    ctx.beginPath();
    ctx.moveTo(x(0), y(pts[0]));
    pts.forEach((v, i) => ctx.lineTo(x(i), y(v)));
    ctx.strokeStyle = accent; ctx.lineWidth = 3; ctx.lineJoin = "round"; ctx.stroke();

    // Dots on each point.
    pts.forEach((v, i) => {
      ctx.beginPath(); ctx.arc(x(i), y(v), 4, 0, Math.PI * 2);
      ctx.fillStyle = v === 1 ? accent2 : accent; ctx.fill();
    });
  }

  // ============================================================
  // Small utilities
  // ============================================================
  let toastTimer;
  function toast(msg) {
    let t = $(".toast");
    if (!t) { t = document.createElement("div"); t.className = "toast neo"; document.body.appendChild(t); }
    t.textContent = msg;
    clearTimeout(toastTimer);
    animIn(t, { y: 20 });
    toastTimer = setTimeout(() => t.remove(), 2200);
  }

  // In-game confirm dialog — a styled modal that replaces the browser's
  // built-in confirm() popup. Calls opts.onConfirm if the user says yes.
  function gameConfirm(opts) {
    const o = document.createElement("div");
    o.className = "overlay";
    o.innerHTML =
      '<div class="modal neo confirm-modal">' +
        '<div class="confirm-emoji">' + (opts.emoji || "🤔") + "</div>" +
        "<h2>" + (opts.title || "Are you sure?") + "</h2>" +
        (opts.message ? "<p>" + opts.message + "</p>" : "") +
        '<div class="confirm-actions">' +
          '<button class="btn" data-cf="cancel">' + (opts.cancelText || "Cancel") + "</button>" +
          '<button class="btn ' + (opts.danger ? "btn-danger" : "btn-primary") + '" data-cf="ok">' +
            (opts.confirmText || "OK") + "</button>" +
        "</div>" +
      "</div>";
    document.body.appendChild(o);
    animIn(o.querySelector(".modal"), { scale: 0.9, opacity: 0, y: 0 });

    const close = () => o.remove();
    o.querySelector('[data-cf="cancel"]').addEventListener("click", () => { close(); if (opts.onCancel) opts.onCancel(); });
    o.querySelector('[data-cf="ok"]').addEventListener("click", () => { close(); if (opts.onConfirm) opts.onConfirm(); });
    // Tapping the dark backdrop cancels.
    o.addEventListener("click", (e) => { if (e.target === o) close(); });
  }

  // A gentle confirm before leaving a lesson/quiz in progress.
  function confirmExit(onYes) {
    gameConfirm({
      emoji: "👋",
      title: "Leave now?",
      message: "Your coins and mastered states are already saved.",
      confirmText: "Leave",
      cancelText: "Keep going",
      onConfirm: onYes,
    });
  }

  // ============================================================
  // FIREBASE AUTH & CLOUD SYNC
  // ============================================================
  function setupFirebaseAuth() {
    const signInBtn = $("#googleSignInBtn");
    const settingsAuthBtn = $("#settingsAuthBtn");
    const profilePill = $("#userProfilePill");

    function updateUserAuthUI(user) {
      const authDesc = $("#settingsAuthDesc");

      if (user) {
        if (signInBtn) signInBtn.classList.add("hidden");
        if (profilePill) profilePill.classList.remove("hidden");

        const avatar = $("#userAvatar");
        if (avatar) avatar.src = getProfileAvatarSrc(user);
        const userName = $("#userName");
        if (userName) userName.textContent = user.displayName ? user.displayName.split(" ")[0] : "Learner";

        if (authDesc) authDesc.textContent = "Signed in as " + (user.displayName || user.email || "Google User");
        if (settingsAuthBtn) settingsAuthBtn.textContent = "Account";
      } else {
        if (signInBtn) signInBtn.classList.remove("hidden");
        if (profilePill) profilePill.classList.add("hidden");

        if (authDesc) authDesc.textContent = "Signed in as Guest. Sign in with Google to sync progress across devices.";
        if (settingsAuthBtn) settingsAuthBtn.textContent = "Sign In";
      }
      renderAuthPage(user);
    }

    function renderAuthPage(user) {
      const u = user !== undefined ? user : (window.FirebaseService ? window.FirebaseService.getCurrentUser() : null);
      const signedOutView = $("#authSignedOutView");
      const signedInView = $("#authSignedInView");

      if (u) {
        if (signedOutView) signedOutView.classList.add("hidden");
        if (signedInView) signedInView.classList.remove("hidden");

        const nameEl = $("#profileName");
        if (nameEl) nameEl.textContent = u.displayName || "Learner";
        const emailEl = $("#profileEmail");
        if (emailEl) emailEl.textContent = u.email || "";

        refreshProfileAvatar();

        const toggle = $("#staySignedInToggle");
        if (toggle) toggle.checked = save.staySignedIn !== false;

        const picker = $("#avatarPicker");
        if (picker) picker.classList.add("hidden");
      } else {
        if (signedOutView) signedOutView.classList.remove("hidden");
        if (signedInView) signedInView.classList.add("hidden");
      }
    }

    async function handleSignIn() {
      if (!window.FirebaseService) {
        toast("Firebase service loading...");
        return;
      }
      try {
        await window.FirebaseService.signInWithGoogle();
      } catch (err) {
        toast("Sign-in error: " + (err.message || err));
      }
    }

    async function handleSignOut() {
      if (!window.FirebaseService) return;
      try {
        await window.FirebaseService.signOutUser();
        toast("Signed out. Operating in Guest mode 👤");
        show("home");
        renderHome();
      } catch (err) {
        toast("Sign-out error");
      }
    }

    function openAuthPage() {
      const user = window.FirebaseService ? window.FirebaseService.getCurrentUser() : null;
      renderAuthPage(user);
      show("auth");
    }

    function emojiDataUri(emoji) {
      return "data:image/svg+xml," + encodeURIComponent(
        "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>" + emoji + "</text></svg>"
      );
    }

    function getProfileAvatarSrc(user) {
      if (save.profileAvatar) {
        // Find the animal emoji
        for (const pack of PACKS) {
          const animal = pack.pool.find((a) => a.id === save.profileAvatar);
          if (animal) return emojiDataUri(animal.emoji);
        }
      }
      return user && user.photoURL ? user.photoURL : emojiDataUri("👤");
    }

    function refreshProfileAvatar() {
      const user = window.FirebaseService ? window.FirebaseService.getCurrentUser() : null;
      const src = getProfileAvatarSrc(user);
      const pillAvatar = $("#userAvatar");
      if (pillAvatar) pillAvatar.src = src;
      const profAvatar = $("#profileAvatar");
      if (profAvatar) profAvatar.src = src;
    }

    // Avatar picker toggle
    const avatarWrap = $("#profileAvatarWrap");
    if (avatarWrap) {
      avatarWrap.addEventListener("click", () => {
        const picker = $("#avatarPicker");
        if (!picker) return;
        const isHidden = picker.classList.contains("hidden");
        if (isHidden) {
          renderAvatarOptions();
          picker.classList.remove("hidden");
        } else {
          picker.classList.add("hidden");
        }
      });
    }

    function renderAvatarOptions() {
      const container = $("#avatarOptions");
      if (!container) return;
      container.innerHTML = "";

      const user = window.FirebaseService ? window.FirebaseService.getCurrentUser() : null;
      const googleBtn = document.createElement("button");
      googleBtn.className = "avatar-option" + (!save.profileAvatar ? " selected" : "");
      googleBtn.title = "Google photo";
      const gImg = document.createElement("img");
      gImg.src = user && user.photoURL ? user.photoURL : emojiDataUri("👤");
      gImg.style.cssText = "width:36px;height:36px;border-radius:50%;object-fit:cover;";
      googleBtn.appendChild(gImg);
      googleBtn.addEventListener("click", () => {
        save.profileAvatar = null;
        persist(save);
        refreshProfileAvatar();
        renderAvatarOptions();
      });
      container.appendChild(googleBtn);

      Object.entries(save.collection).forEach(([id, count]) => {
        if (!count) return;
        let animal = null;
        for (const pack of PACKS) {
          animal = pack.pool.find((a) => a.id === id);
          if (animal) break;
        }
        if (!animal) return;
        const btn = document.createElement("button");
        btn.className = "avatar-option" + (save.profileAvatar === id ? " selected" : "");
        btn.title = animal.name;
        btn.textContent = animal.emoji;
        btn.addEventListener("click", () => {
          save.profileAvatar = id;
          persist(save);
          refreshProfileAvatar();
          renderAvatarOptions();
        });
        container.appendChild(btn);
      });
    }

    // Stay signed in toggle
    const stayToggle = $("#staySignedInToggle");
    if (stayToggle) {
      stayToggle.addEventListener("change", async () => {
        save.staySignedIn = stayToggle.checked;
        persist(save);
        if (window.FirebaseService && window.FirebaseService.setPersistenceMode) {
          await window.FirebaseService.setPersistenceMode(save.staySignedIn);
        }
      });
    }

    // Page action bindings
    const authBackBtn = $("#authBack");
    if (authBackBtn) authBackBtn.addEventListener("click", () => { show("home"); renderHome(); });

    const pageSignInBtn = $("#pageGoogleSignInBtn");
    if (pageSignInBtn) pageSignInBtn.addEventListener("click", handleSignIn);

    const pageSignOutBtn = $("#profileSignOutBtn");
    if (pageSignOutBtn) pageSignOutBtn.addEventListener("click", handleSignOut);

    if (signInBtn) signInBtn.addEventListener("click", openAuthPage);
    if (profilePill) profilePill.addEventListener("click", openAuthPage);
    if (settingsAuthBtn) settingsAuthBtn.addEventListener("click", openAuthPage);

    window.addEventListener("firebaseCloudSaveReceived", (e) => {
      if (e.detail && window.FirebaseService) {
        save = window.FirebaseService.mergeSaves(save, e.detail);
        renderHome();
      }
    });

    const initFB = () => {
      if (window.FirebaseService) {
        window.FirebaseService.initFirebase(async (user) => {
          updateUserAuthUI(user);
          if (user) {
            const cloudSave = await window.FirebaseService.fetchCloudSave(user.uid);
            save = window.FirebaseService.mergeSaves(save, cloudSave);
            persist(save);
            renderHome();
          }
        }, (status, details) => {
          const currentUser = window.FirebaseService ? window.FirebaseService.getCurrentUser() : null;
          updateUserAuthUI(currentUser);
        });
        if (window.FirebaseService.setPersistenceMode) {
          window.FirebaseService.setPersistenceMode(save.staySignedIn !== false);
        }
      } else {
        updateUserAuthUI(null);
      }
    };

    if (window.FirebaseService) {
      initFB();
    } else {
      window.addEventListener("load", initFB);
      window.addEventListener("firebaseServiceReady", initFB);
    }
  }

  // ============================================================
  // BOOT
  // ============================================================
  on("#goLearn", "click", function () { openPicker("learn"); });
  on("#goLearn", "keydown", function (e) { if (e.key === "Enter") openPicker("learn"); });
  on("#goQuiz", "click", function () { openPicker("quiz"); });
  on("#goQuiz", "keydown", function (e) { if (e.key === "Enter") openPicker("quiz"); });
  on("#goTest", "click", function () { openPicker("test"); });
  on("#goTest", "keydown", function (e) { if (e.key === "Enter") openPicker("test"); });

  function boot() {
    applyTheme(save.theme || "auto");
    applyAnswerLayout(save.answerLayout || "grid");
    setupFirebaseAuth();
    renderHome();
    show("home");
    // First-ever visit → run the arrow tutorial once.
    if (!save.tutorialDone) {
      setTimeout(startTutorial, 600);
    }
  }

  boot();
})();
