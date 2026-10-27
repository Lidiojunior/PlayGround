(() => {
  "use strict";

  const ALL_NUMBERS = Array.from({ length: 25 }, (_, i) => i + 1);
  const PRIMES = new Set([2, 3, 5, 7, 11, 13, 17, 19, 23]);
  const MAX_FIXED = 15;
  const MAX_EXCLUDED = 10;
  const API_ALL = "https://loteriascaixa-api.herokuapp.com/api/lotofacil";
  const STORAGE_KEY = "lotofacil-lab:prefs:v1";
  const CACHE_KEY = "lotofacil-lab:stats:v2";

  const PROFILES = {
    aleatorio: null,
    equilibrado: { sum: [170, 225], odd: [6, 9], prime: [4, 7], maxRun: 5 },
    conservador: { sum: [180, 215], odd: [7, 8], prime: [5, 6], maxRun: 4 },
  };

  const PROFILE_LABELS = {
    aleatorio: "Aleatório",
    equilibrado: "Equilibrado",
    conservador: "Conservador",
  };

  const WEIGHT_LABELS = {
    neutro: "Neutro",
    quentes: "Quentes",
    frios: "Frias",
    atrasadas: "Atrasadas",
  };

  const state = {
    fixed: new Set(),
    excluded: new Set(),
    count: 10,
    profile: "equilibrado",
    weightMode: "neutro",
    price: 3.5,
    compare: true,
    games: [],
    generatedMeta: null,
    stats: null,
    loading: false,
    loadError: false,
  };

  const el = {
    grid: document.getElementById("number-grid"),
    marks: document.getElementById("marks-summary"),
    count: document.getElementById("game-count"),
    countValue: document.getElementById("count-value"),
    profile: document.getElementById("profile"),
    weight: document.getElementById("weight-mode"),
    price: document.getElementById("price"),
    generate: document.getElementById("generate"),
    clearMarks: document.getElementById("clear-marks"),
    presets: Array.from(document.querySelectorAll(".presets button")),
    statGames: document.getElementById("stat-games"),
    statGamesNote: document.getElementById("stat-games-note"),
    statFixed: document.getElementById("stat-fixed"),
    statFixedNote: document.getElementById("stat-fixed-note"),
    statExcluded: document.getElementById("stat-excluded"),
    statExcludedNote: document.getElementById("stat-excluded-note"),
    statCost: document.getElementById("stat-cost"),
    statCostNote: document.getElementById("stat-cost-note"),
    hotList: document.getElementById("hot-list"),
    coldList: document.getElementById("cold-list"),
    delayList: document.getElementById("delay-list"),
    radarBase: document.getElementById("radar-base"),
    resultsSub: document.getElementById("results-sub"),
    games: document.getElementById("games"),
    empty: document.getElementById("empty-state"),
    copyAll: document.getElementById("copy-all"),
    downloadCsv: document.getElementById("download-csv"),
    downloadTxt: document.getElementById("download-txt"),
    compare: document.getElementById("compare-latest"),
    latestConcurso: document.getElementById("latest-concurso"),
    latestBalls: document.getElementById("latest-balls"),
    latestMeta: document.getElementById("latest-meta"),
    dataStatus: document.getElementById("data-status"),
    dataStatusText: document.getElementById("data-status-text"),
    refresh: document.getElementById("refresh-data"),
    toast: document.getElementById("toast"),
  };

  const brl = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  const pad2 = (n) => String(n).padStart(2, "0");
  const pad3 = (n) => String(n).padStart(3, "0");
  const plural = (n, singular, pluralForm) => (n === 1 ? singular : pluralForm);

  let toastTimer = 0;

  function rand() {
    if (window.crypto && window.crypto.getRandomValues) {
      const buffer = new Uint32Array(1);
      window.crypto.getRandomValues(buffer);
      return buffer[0] / 4294967296;
    }
    return Math.random();
  }

  function toast(message) {
    window.clearTimeout(toastTimer);
    el.toast.textContent = message;
    el.toast.classList.add("is-visible");
    toastTimer = window.setTimeout(() => {
      el.toast.classList.remove("is-visible");
    }, 2800);
  }

  function formatCurrency(value) {
    return brl.format(Number.isFinite(value) ? value : 0);
  }

  function baseDateLabel(stats) {
    if (!stats) return "";
    if (stats.fetchedAt) {
      const date = new Date(stats.fetchedAt);
      if (!Number.isNaN(date.getTime())) {
        return date.toLocaleDateString("pt-BR");
      }
    }
    if (stats.generatedAt && /^\d{4}-\d{2}-\d{2}$/.test(stats.generatedAt)) {
      return stats.generatedAt.split("-").reverse().join("/");
    }
    return stats.generatedAt || "";
  }

  function loadStats() {
    try {
      const raw = window.localStorage.getItem(CACHE_KEY);
      if (raw) {
        const cached = JSON.parse(raw);
        if (
          cached &&
          cached.latest &&
          Array.isArray(cached.latest.dezenas) &&
          Array.isArray(cached.freq100) &&
          cached.freq100.length === 25
        ) {
          if (!cached.windowSize) cached.windowSize = 100;
          if (!Array.isArray(cached.atraso) || cached.atraso.length !== 25) {
            cached.atraso = Array(25).fill(0);
          }
          return cached;
        }
      }
    } catch (error) {
      /* cache indisponível */
    }
    const snapshot = window.LOTOFACIL_SNAPSHOT || null;
    if (snapshot) {
      if (!snapshot.windowSize) snapshot.windowSize = 100;
      if (!Array.isArray(snapshot.atraso) || snapshot.atraso.length !== 25) {
        snapshot.atraso = Array(25).fill(0);
      }
    }
    return snapshot;
  }

  function loadPrefs() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (Array.isArray(saved.fixed)) {
        saved.fixed
          .map(Number)
          .filter((n) => ALL_NUMBERS.includes(n))
          .slice(0, MAX_FIXED)
          .forEach((n) => state.fixed.add(n));
      }
      if (Array.isArray(saved.excluded)) {
        saved.excluded
          .map(Number)
          .filter((n) => ALL_NUMBERS.includes(n) && !state.fixed.has(n))
          .slice(0, MAX_EXCLUDED)
          .forEach((n) => state.excluded.add(n));
      }
      if (Number.isFinite(saved.count)) {
        state.count = Math.min(300, Math.max(1, Math.round(saved.count)));
      }
      if (saved.profile in PROFILES) state.profile = saved.profile;
      if (saved.weightMode in WEIGHT_LABELS) state.weightMode = saved.weightMode;
      if (Number.isFinite(saved.price) && saved.price >= 0) state.price = saved.price;
      if (typeof saved.compare === "boolean") state.compare = saved.compare;
    } catch (error) {
      /* preferências antigas ou inválidas */
    }
  }

  function savePrefs() {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          fixed: [...state.fixed],
          excluded: [...state.excluded],
          count: state.count,
          profile: state.profile,
          weightMode: state.weightMode,
          price: state.price,
          compare: state.compare,
        })
      );
    } catch (error) {
      /* armazenamento indisponível */
    }
  }

  function buildGrid() {
    const fragment = document.createDocumentFragment();
    ALL_NUMBERS.forEach((n) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "number";
      button.dataset.number = String(n);
      button.innerHTML =
        '<span class="number-label">' +
        pad2(n) +
        '</span><span class="number-meta"></span>';
      button.addEventListener("click", () => toggleNumber(n));
      fragment.appendChild(button);
    });
    el.grid.appendChild(fragment);
  }

  function toggleNumber(n) {
    if (state.fixed.has(n)) {
      state.fixed.delete(n);
      if (state.excluded.size < MAX_EXCLUDED) {
        state.excluded.add(n);
      } else {
        toast("Máximo de 10 dezenas eliminadas. Esta voltou a ficar livre.");
      }
    } else if (state.excluded.has(n)) {
      state.excluded.delete(n);
    } else {
      if (state.fixed.size >= MAX_FIXED) {
        toast("Máximo de 15 dezenas fixadas.");
        return;
      }
      state.fixed.add(n);
    }
    renderMarks();
    renderNumberGrid();
    updateStats();
    savePrefs();
    markStale();
  }

  function frequencyRange() {
    if (!state.stats || !Array.isArray(state.stats.freq100)) return null;
    const values = state.stats.freq100;
    const min = Math.min(...values);
    const max = Math.max(...values);
    return { min, max, span: max - min || 1, values, size: state.stats.windowSize || 100 };
  }

  function renderNumberGrid() {
    const range = frequencyRange();
    const children = el.grid.children;
    for (let i = 0; i < children.length; i += 1) {
      const button = children[i];
      const n = i + 1;
      const fixed = state.fixed.has(n);
      const excluded = state.excluded.has(n);
      const meta = button.querySelector(".number-meta");
      const percent =
        range && !fixed && !excluded
          ? Math.round((range.values[n - 1] / range.size) * 100)
          : null;

      button.classList.toggle("is-fixed", fixed);
      button.classList.toggle("is-excluded", excluded);
      button.setAttribute("aria-pressed", fixed || excluded ? "true" : "false");
      button.setAttribute(
        "aria-label",
        "Dezena " +
          pad2(n) +
          ". " +
          (fixed ? "Fixada." : excluded ? "Eliminada." : "Livre.") +
          (range ? " Frequência de " + Math.round((range.values[n - 1] / range.size) * 100) + " por cento nos últimos " + range.size + " concursos." : "")
      );

      meta.textContent = fixed
        ? "fixa"
        : excluded
          ? "morta"
          : percent !== null
            ? percent + "%"
            : "";

      const heat = range ? (range.values[n - 1] - range.min) / range.span : 0;
      button.style.setProperty("--heat", String(Math.max(0, Math.min(1, heat))));
      button.title = range
        ? "Dezena " + pad2(n) + " · " + percent + "% nos últimos " + range.size + " concursos · atraso de " + state.stats.atraso[n - 1] + " concurso(s)"
        : "Dezena " + pad2(n);
    }
  }

  function renderMarks() {
    const fixed = [...state.fixed].sort((a, b) => a - b);
    const excluded = [...state.excluded].sort((a, b) => a - b);
    const chips = [];

    fixed.forEach((n) => {
      chips.push('<span class="mark-chip fixed">F ' + pad2(n) + "</span>");
    });
    excluded.forEach((n) => {
      chips.push('<span class="mark-chip excluded">X ' + pad2(n) + "</span>");
    });

    if (!chips.length) {
      el.marks.innerHTML =
        '<span class="marks-empty">Nenhuma dezena marcada. Clique nos números acima.</span>';
      return;
    }
    el.marks.innerHTML = chips.join("");
  }

  function syncControls() {
    el.count.value = String(state.count);
    el.countValue.textContent = String(state.count);
    el.profile.value = state.profile;
    el.weight.value = state.weightMode;
    el.price.value = state.price.toFixed(2);
    el.compare.checked = state.compare;
    updateRangeFill();
    syncPresets();
  }

  function updateRangeFill() {
    const min = Number(el.count.min) || 1;
    const max = Number(el.count.max) || 300;
    const percent = ((state.count - min) / (max - min)) * 100;
    el.count.style.setProperty("--fill", percent + "%");
  }

  function syncPresets() {
    el.presets.forEach((button) => {
      button.classList.toggle("is-active", Number(button.dataset.count) === state.count);
    });
  }

  function updateStats() {
    const generated = state.games.length;
    el.statGames.textContent = String(generated);
    if (generated && state.generatedMeta) {
      const label =
        PROFILE_LABELS[state.generatedMeta.profile] +
        " · peso " +
        WEIGHT_LABELS[state.generatedMeta.weightMode];
      el.statGamesNote.textContent =
        generated === state.count ? label : label + " · configurado: " + state.count;
    } else {
      el.statGamesNote.textContent = "configurado: " + state.count;
    }

    const fixed = [...state.fixed].sort((a, b) => a - b);
    const excluded = [...state.excluded].sort((a, b) => a - b);

    el.statFixed.textContent = String(fixed.length);
    el.statFixedNote.textContent = fixed.length ? fixed.map(pad2).join(" ") : "nenhuma dezena";

    el.statExcluded.textContent = String(excluded.length);
    el.statExcludedNote.textContent = excluded.length ? excluded.map(pad2).join(" ") : "nenhuma dezena";

    el.statCost.textContent = formatCurrency(state.count * state.price);
    el.statCostNote.textContent =
      state.count + " × " + formatCurrency(state.price) + " por jogo";
  }

  function markStale() {
    if (!state.games.length) return;
    el.resultsSub.textContent =
      state.games.length +
      " " +
      plural(state.games.length, "jogo", "jogos") +
      " na tela · configuração alterada, clique em gerar para atualizar";
  }

  function buildWeights() {
    const weights = {};
    ALL_NUMBERS.forEach((n) => {
      weights[n] = 1;
    });

    if (!state.stats || state.weightMode === "neutro") return weights;

    const values =
      state.weightMode === "atrasadas" ? state.stats.atraso : state.stats.freq100;
    if (!Array.isArray(values) || values.length !== 25) return weights;

    const min = Math.min(...values);
    const max = Math.max(...values);
    const span = max - min || 1;

    ALL_NUMBERS.forEach((n) => {
      const raw = (values[n - 1] - min) / span;
      const t = state.weightMode === "frios" ? 1 - raw : raw;
      weights[n] = 0.6 + 1.2 * Math.pow(Math.max(0, Math.min(1, t)), 1.15);
    });

    return weights;
  }

  function weightedSample(pool, weights, amount) {
    const items = pool.slice();
    const localWeights = items.map((n) => Math.max(0.0001, weights[n] || 1));
    const result = [];

    for (let picked = 0; picked < amount; picked += 1) {
      let total = 0;
      for (let i = 0; i < localWeights.length; i += 1) total += localWeights[i];

      let target = rand() * total;
      let index = 0;
      for (; index < localWeights.length; index += 1) {
        target -= localWeights[index];
        if (target <= 0) break;
      }
      if (index >= items.length) index = items.length - 1;

      result.push(items[index]);
      items.splice(index, 1);
      localWeights.splice(index, 1);
    }

    return result;
  }

  function matchesProfile(numbers, profile) {
    if (!profile) return true;

    let sum = 0;
    let odd = 0;
    let primes = 0;
    let run = 1;
    let maxRun = 1;

    for (let i = 0; i < numbers.length; i += 1) {
      const n = numbers[i];
      sum += n;
      if (n % 2 === 1) odd += 1;
      if (PRIMES.has(n)) primes += 1;
      if (i > 0) {
        if (n === numbers[i - 1] + 1) {
          run += 1;
          if (run > maxRun) maxRun = run;
        } else {
          run = 1;
        }
      }
    }

    return (
      sum >= profile.sum[0] &&
      sum <= profile.sum[1] &&
      odd >= profile.odd[0] &&
      odd <= profile.odd[1] &&
      primes >= profile.prime[0] &&
      primes <= profile.prime[1] &&
      maxRun <= profile.maxRun
    );
  }

  function combinations(n, k) {
    if (k < 0 || k > n) return 0;
    const kk = Math.min(k, n - k);
    let result = 1;
    for (let i = 0; i < kk; i += 1) {
      result = (result * (n - i)) / (i + 1);
    }
    return Math.round(result);
  }

  function generateGames(options) {
    const silent = Boolean(options && options.silent);
    const allowed = ALL_NUMBERS.filter((n) => !state.excluded.has(n));

    if (state.fixed.size > MAX_FIXED) {
      toast("Você pode fixar no máximo 15 dezenas.");
      return;
    }

    if (allowed.length < 15) {
      toast("Restam menos de 15 dezenas disponíveis. Libere alguma dezena para gerar.");
      return;
    }

    const fixed = [...state.fixed].sort((a, b) => a - b);
    const free = allowed.filter((n) => !state.fixed.has(n));
    const need = 15 - fixed.length;
    const profile = PROFILES[state.profile] || null;
    const enforceProfile = Boolean(profile) && need > 0;
    const maxUnique = combinations(free.length, need);
    const target = Math.max(1, Math.min(state.count, maxUnique));
    const weights = buildWeights();
    const games = [];
    const seen = new Set();
    let relaxed = 0;
    let limited = target < state.count;

    for (let gameIndex = 0; gameIndex < target; gameIndex += 1) {
      const blocked = new Set();
      let chosen = null;
      let chosenKey = "";

      for (let attempt = 0; attempt < 900; attempt += 1) {
        const pick = need > 0 ? weightedSample(free, weights, need) : [];
        const candidate = fixed.concat(pick).sort((a, b) => a - b);
        const key = candidate.join(",");
        if (seen.has(key) || blocked.has(key)) continue;
        if (enforceProfile && !matchesProfile(candidate, profile)) {
          blocked.add(key);
          continue;
        }
        chosen = candidate;
        chosenKey = key;
        break;
      }

      if (!chosen && enforceProfile) {
        for (let attempt = 0; attempt < 900; attempt += 1) {
          const pick = weightedSample(free, weights, need);
          const candidate = fixed.concat(pick).sort((a, b) => a - b);
          const key = candidate.join(",");
          if (seen.has(key)) continue;
          chosen = candidate;
          chosenKey = key;
          relaxed += 1;
          break;
        }
      }

      if (!chosen) {
        limited = true;
        break;
      }

      seen.add(chosenKey);
      games.push(chosen);
    }

    state.games = games;
    state.generatedMeta = { profile: state.profile, weightMode: state.weightMode };
    renderGames();
    updateStats();
    savePrefs();

    if (silent) return;

    if (!games.length) {
      toast("Não foi possível gerar jogos com essas marcações.");
      return;
    }

    const generatedWord = games.length === 1 ? "Gerado" : "Gerados";
    const gameNoun = plural(games.length, "jogo", "jogos");

    if (limited) {
      toast(
        generatedWord +
          " " +
          games.length +
          " " +
          gameNoun +
          ": as marcações limitam as combinações únicas possíveis."
      );
    } else if (relaxed > 0) {
      toast(
        generatedWord +
          " " +
          games.length +
          " " +
          gameNoun +
          ". " +
          relaxed +
          " sem o perfil por falta de combinações válidas."
      );
    } else {
      toast(
        generatedWord +
          " " +
          games.length +
          " " +
          gameNoun +
          " com sucesso."
      );
    }
  }

  function latestHitSet() {
    if (!state.compare || !state.stats || !state.stats.latest) return null;
    return new Set(state.stats.latest.dezenas);
  }

  function renderGames() {
    const games = state.games;
    const latest = state.stats && state.stats.latest;
    const hitSet = latestHitSet();

    el.empty.classList.toggle("is-visible", games.length === 0);
    el.games.innerHTML = "";

    if (!games.length) {
      el.resultsSub.textContent = "Clique em gerar para montar sua lista.";
      return;
    }

    const meta = state.generatedMeta || {
      profile: state.profile,
      weightMode: state.weightMode,
    };
    let subtitle =
      games.length +
      " " +
      plural(games.length, "jogo", "jogos") +
      " · perfil " +
      PROFILE_LABELS[meta.profile] +
      " · peso " +
      WEIGHT_LABELS[meta.weightMode];

    if (hitSet && latest) {
      subtitle += " · conferido com o concurso " + latest.concurso;
    }
    el.resultsSub.textContent = subtitle;

    const fragment = document.createDocumentFragment();

    games.forEach((numbers, index) => {
      const hits = hitSet ? numbers.filter((n) => hitSet.has(n)).length : null;
      const sum = numbers.reduce((total, n) => total + n, 0);
      const odd = numbers.filter((n) => n % 2 === 1).length;
      const primes = numbers.filter((n) => PRIMES.has(n)).length;

      const card = document.createElement("article");
      card.className = "game-card";

      const balls = numbers
        .map((n) => {
          const classes = ["ball"];
          if (state.fixed.has(n)) classes.push("is-fixed");
          return (
            '<span class="' +
            classes.join(" ") +
            '" title="Dezena ' +
            pad2(n) +
            '">' +
            pad2(n) +
            "</span>"
          );
        })
        .join("");

      const hitBadge =
        hits !== null
          ? '<span class="badge hits" title="Acertos no concurso ' +
            latest.concurso +
            '">' +
            hits +
            " acerto" +
            (hits === 1 ? "" : "s") +
            "</span>"
          : "";

      card.innerHTML =
        '<div class="game-head">' +
        '<span class="game-index">Jogo <strong>' +
        pad3(index + 1) +
        "</strong></span>" +
        '<span class="game-badges">' +
        hitBadge +
        '<span class="badge">15 dezenas</span>' +
        "</span>" +
        "</div>" +
        '<div class="game-balls">' +
        balls +
        "</div>" +
        '<div class="game-foot">' +
        '<span class="game-meta">Soma <b>' +
        sum +
        "</b> · <b>" +
        odd +
        "</b> ímpares · <b>" +
        primes +
        "</b> primos</span>" +
        '<button type="button" class="copy-one" data-index="' +
        index +
        '">copiar</button>' +
        "</div>";

      fragment.appendChild(card);
    });

    el.games.appendChild(fragment);
  }

  function renderLatest() {
    const stats = state.stats;
    if (!stats || !stats.latest) {
      el.latestConcurso.textContent = "—";
      el.latestBalls.innerHTML = "";
      el.latestMeta.textContent = "Base de resultados indisponível.";
      return;
    }

    const latest = stats.latest;
    el.latestConcurso.textContent = String(latest.concurso);
    el.latestBalls.innerHTML = latest.dezenas
      .map((n) => '<span class="mini-ball">' + pad2(n) + "</span>")
      .join("");

    let meta = latest.data || "";
    if (latest.proximoConcurso) {
      meta += " · próximo: " + latest.proximoConcurso;
      if (latest.dataProximoConcurso) meta += " em " + latest.dataProximoConcurso;
    }
    el.latestMeta.textContent = meta;
  }

  function frequencyPercent(value) {
    const size = (state.stats && state.stats.windowSize) || 100;
    return Math.round((value / size) * 100);
  }

  function renderRadar() {
    const stats = state.stats;
    if (!stats || !Array.isArray(stats.freq100)) {
      el.radarBase.textContent = "Base estatística indisponível";
      el.hotList.innerHTML = '<span class="chip">—</span>';
      el.coldList.innerHTML = '<span class="chip">—</span>';
      el.delayList.innerHTML = '<span class="chip">—</span>';
      return;
    }

    const date = baseDateLabel(stats);
    el.radarBase.textContent =
      "Últimos " +
      (stats.windowSize || 100) +
      " concursos" +
      (date ? " · base de " + date : "");

    const indexed = ALL_NUMBERS.map((n) => ({
      n,
      frequency: stats.freq100[n - 1],
      delay: stats.atraso[n - 1],
    }));

    const hot = indexed
      .slice()
      .sort((a, b) => b.frequency - a.frequency || a.n - b.n)
      .slice(0, 5);
    const cold = indexed
      .slice()
      .sort((a, b) => a.frequency - b.frequency || a.n - b.n)
      .slice(0, 5);
    const delayed = indexed
      .slice()
      .sort((a, b) => b.delay - a.delay || a.n - b.n)
      .slice(0, 5);

    el.hotList.innerHTML = hot
      .map(
        (item) =>
          '<span class="chip hot" title="' +
          frequencyPercent(item.frequency) +
          '% nos últimos ' +
          (stats.windowSize || 100) +
          ' concursos">' +
          pad2(item.n) +
          " <small>" +
          frequencyPercent(item.frequency) +
          "%</small></span>"
      )
      .join("");

    el.coldList.innerHTML = cold
      .map(
        (item) =>
          '<span class="chip cold" title="' +
          frequencyPercent(item.frequency) +
          '% nos últimos ' +
          (stats.windowSize || 100) +
          ' concursos">' +
          pad2(item.n) +
          " <small>" +
          frequencyPercent(item.frequency) +
          "%</small></span>"
      )
      .join("");

    el.delayList.innerHTML = delayed
      .map(
        (item) =>
          '<span class="chip delay" title="' +
          item.delay +
          ' concursos sem sair">' +
          pad2(item.n) +
          " <small>" +
          item.delay +
          "</small></span>"
      )
      .join("");
  }

  function renderDataStatus() {
    el.dataStatus.classList.toggle("is-loading", state.loading);
    el.dataStatus.classList.toggle("is-error", state.loadError);

    if (state.loading) {
      el.dataStatusText.textContent = "Atualizando resultados…";
      return;
    }

    if (!state.stats || !state.stats.latest) {
      el.dataStatusText.textContent = "Base local";
      el.dataStatus.title = "Base de resultados local";
      return;
    }

    const latest = state.stats.latest;
    el.dataStatusText.textContent = "Concurso " + latest.concurso + " · " + latest.data;
    el.dataStatus.title =
      "Base de resultados até " + latest.data + (state.stats.totalConcursos ? " · " + state.stats.totalConcursos + " concursos" : "");
  }

  function deriveStats(draws) {
    const ordered = draws
      .filter((draw) => draw && Array.isArray(draw.dezenas) && draw.dezenas.length === 15)
      .slice()
      .sort((a, b) => Number(b.concurso) - Number(a.concurso));
    if (!ordered.length) throw new Error("Nenhum resultado válido recebido");
    const latestDraw = ordered[0];
    const windowSize = Math.min(100, ordered.length);
    const freq100 = Array(25).fill(0);
    const freqAll = Array(25).fill(0);
    const atraso = Array(25).fill(-1);

    ordered.slice(0, windowSize).forEach((draw) => {
      draw.dezenas.forEach((value) => {
        freq100[Number(value) - 1] += 1;
      });
    });

    ordered.forEach((draw) => {
      draw.dezenas.forEach((value) => {
        freqAll[Number(value) - 1] += 1;
      });
    });

    ordered.forEach((draw, index) => {
      draw.dezenas.forEach((value) => {
        const position = Number(value) - 1;
        if (atraso[position] === -1) atraso[position] = index;
      });
    });

    return {
      fetchedAt: new Date().toISOString(),
      generatedAt: new Date().toISOString(),
      windowSize,
      totalConcursos: ordered.length,
      latest: {
        concurso: latestDraw.concurso,
        data: latestDraw.data,
        dezenas: latestDraw.dezenas.map(Number).sort((a, b) => a - b),
        proximoConcurso: latestDraw.proximoConcurso,
        dataProximoConcurso: latestDraw.dataProximoConcurso,
      },
      freq100,
      freqAll,
      atraso: atraso.map((value) => Math.max(0, value)),
    };
  }

  async function refreshData() {
    if (state.loading) return;

    state.loading = true;
    state.loadError = false;
    el.refresh.disabled = true;
    el.refresh.textContent = "Atualizando…";
    renderDataStatus();

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 45000);

    try {
      const response = await fetch(API_ALL, {
        cache: "no-store",
        signal: controller.signal,
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("HTTP " + response.status);

      const draws = await response.json();
      if (!Array.isArray(draws) || !draws.length || !draws[0].dezenas) {
        throw new Error("Resposta inválida");
      }

      state.stats = deriveStats(draws);
      try {
        window.localStorage.setItem(CACHE_KEY, JSON.stringify(state.stats));
      } catch (error) {
        /* cache cheio ou indisponível */
      }

      renderLatest();
      renderRadar();
      renderNumberGrid();
      renderGames();
      toast("Resultados atualizados até o concurso " + state.stats.latest.concurso + ".");
    } catch (error) {
      state.loadError = true;
      toast("Não foi possível atualizar agora. Mantendo a base local.");
    } finally {
      window.clearTimeout(timeout);
      state.loading = false;
      el.refresh.disabled = false;
      el.refresh.textContent = "Atualizar resultados";
      renderDataStatus();
    }
  }

  function gameLine(numbers, index) {
    return "Jogo " + pad3(index + 1) + ": " + numbers.map(pad2).join(" ");
  }

  function copyText(text, message) {
    const fallback = () => {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        document.execCommand("copy");
        toast(message);
      } catch (error) {
        toast("Não foi possível copiar automaticamente.");
      }
      textarea.remove();
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => toast(message)).catch(fallback);
    } else {
      fallback();
    }
  }

  function copyAll() {
    if (!state.games.length) {
      toast("Gere pelo menos um jogo primeiro.");
      return;
    }
    copyText(
      state.games.map((numbers, index) => gameLine(numbers, index)).join("\n"),
      "Todos os jogos foram copiados."
    );
  }

  function download(filename, content, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1200);
  }

  function downloadCsv() {
    if (!state.games.length) {
      toast("Gere pelo menos um jogo primeiro.");
      return;
    }
    const header = ["Jogo"];
    for (let i = 1; i <= 15; i += 1) header.push("D" + i);
    header.push("Soma", "Impares", "Primos");

    const rows = state.games.map((numbers, index) => {
      const sum = numbers.reduce((total, n) => total + n, 0);
      const odd = numbers.filter((n) => n % 2 === 1).length;
      const primes = numbers.filter((n) => PRIMES.has(n)).length;
      return [pad3(index + 1)]
        .concat(numbers.map(pad2))
        .concat([String(sum), String(odd), String(primes)]);
    });

    const content =
      "\uFEFF" +
      [header.join(";")]
        .concat(rows.map((row) => row.join(";")))
        .join("\r\n");
    download("lotofacil-lab-jogos.csv", content, "text/csv;charset=utf-8");
    toast(
      "CSV gerado com " +
        state.games.length +
        " " +
        plural(state.games.length, "jogo", "jogos") +
        "."
    );
  }

  function downloadTxt() {
    if (!state.games.length) {
      toast("Gere pelo menos um jogo primeiro.");
      return;
    }
    const content = state.games
      .map((numbers, index) => gameLine(numbers, index))
      .join("\r\n");
    download("lotofacil-lab-jogos.txt", content, "text/plain;charset=utf-8");
    toast(
      "TXT gerado com " +
        state.games.length +
        " " +
        plural(state.games.length, "jogo", "jogos") +
        "."
    );
  }

  function setCount(value) {
    state.count = Math.max(1, Math.min(300, Math.round(Number(value) || 1)));
    el.count.value = String(state.count);
    el.countValue.textContent = String(state.count);
    updateRangeFill();
    syncPresets();
    updateStats();
    savePrefs();
    markStale();
  }

  function handlePrice() {
    const value = Number.parseFloat(el.price.value.replace(",", "."));
    if (Number.isFinite(value) && value >= 0) {
      state.price = value;
      updateStats();
      savePrefs();
    }
  }

  function bindEvents() {
    el.count.addEventListener("input", (event) => {
      setCount(event.target.value);
    });

    el.presets.forEach((button) => {
      button.addEventListener("click", () => setCount(button.dataset.count));
    });

    el.profile.addEventListener("change", () => {
      state.profile = el.profile.value;
      savePrefs();
      updateStats();
      markStale();
    });

    el.weight.addEventListener("change", () => {
      state.weightMode = el.weight.value;
      savePrefs();
      updateStats();
      markStale();
    });

    el.price.addEventListener("input", handlePrice);
    el.price.addEventListener("blur", () => {
      if (!Number.isFinite(state.price)) state.price = 3.5;
      el.price.value = state.price.toFixed(2);
      updateStats();
      savePrefs();
    });

    el.generate.addEventListener("click", () => generateGames());
    el.clearMarks.addEventListener("click", () => {
      state.fixed.clear();
      state.excluded.clear();
      renderMarks();
      renderNumberGrid();
      updateStats();
      savePrefs();
      markStale();
    });

    el.compare.addEventListener("change", () => {
      state.compare = el.compare.checked;
      savePrefs();
      renderGames();
    });

    el.copyAll.addEventListener("click", copyAll);
    el.downloadCsv.addEventListener("click", downloadCsv);
    el.downloadTxt.addEventListener("click", downloadTxt);
    el.refresh.addEventListener("click", refreshData);

    el.games.addEventListener("click", (event) => {
      const button = event.target.closest(".copy-one");
      if (!button) return;
      const index = Number(button.dataset.index);
      if (!Number.isInteger(index) || !state.games[index]) return;
      copyText(gameLine(state.games[index], index), "Jogo copiado.");
    });

    document.addEventListener("keydown", (event) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const tag = (event.target && event.target.tagName) || "";
      if (["INPUT", "SELECT", "TEXTAREA"].includes(tag)) return;
      if (event.key.toLowerCase() === "g") {
        event.preventDefault();
        generateGames();
      }
    });
  }

  function init() {
    loadPrefs();
    state.stats = loadStats();

    buildGrid();
    syncControls();
    bindEvents();

    renderNumberGrid();
    renderMarks();
    renderLatest();
    renderRadar();
    renderDataStatus();
    updateStats();

    generateGames({ silent: true });
  }

  init();
})();
