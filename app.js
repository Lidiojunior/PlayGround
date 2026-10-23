import {
  DEFAULT_FILTERS,
  NUMBERS,
  analyzeGame,
  checkGame,
  formatNumbers,
  frequencyFromHistory,
  generateGames,
  isValidGame,
  lastDrawFromHistory,
  normalizePool,
  parseNumberList,
  passesFilters,
  prizeProbability,
  randomDraw,
  simulateGame,
  theoreticalOdds,
} from "./core.js";

const STORAGE = {
  saved: "lotolab.saved.v1",
  history: "lotolab.history.v1",
  preferences: "lotolab.preferences.v1",
};

const els = {
  numberGrid: document.querySelector("#number-grid"),
  drawGrid: document.querySelector("#draw-grid"),
  poolCount: document.querySelector("#pool-count"),
  poolBadge: document.querySelector("#pool-badge"),
  poolNote: document.querySelector("#pool-note"),
  poolHint: document.querySelector("#pool-hint"),
  drawCount: document.querySelector("#draw-count"),
  drawText: document.querySelector("#draw-text"),
  drawError: document.querySelector("#draw-error"),
  drawLast: document.querySelector("#use-last"),
  drawClear: document.querySelector("#clear-draw"),
  drawApply: document.querySelector("#apply-draw"),
  quantity: document.querySelector("#quantity"),
  generate: document.querySelector("#generate"),
  surprise: document.querySelector("#surprise"),
  poolClear: document.querySelector("#clear-pool"),
  results: document.querySelector("#results"),
  resultsEmpty: document.querySelector("#results-empty"),
  resultsSub: document.querySelector("#results-sub"),
  copyAll: document.querySelector("#copy-all"),
  saveAll: document.querySelector("#save-all"),
  savedGames: document.querySelector("#saved-games"),
  savedEmpty: document.querySelector("#saved-empty"),
  savedSub: document.querySelector("#saved-sub"),
  clearSaved: document.querySelector("#clear-saved"),
  summary: document.querySelector("#check-summary"),
  checkGames: document.querySelector("#check-games"),
  odds: document.querySelector("#odds"),
  anyPrize: document.querySelector("#any-prize"),
  simulate: document.querySelector("#simulate"),
  simResult: document.querySelector("#sim-result"),
  historyForm: document.querySelector("#history-form"),
  contest: document.querySelector("#contest"),
  historyNumbers: document.querySelector("#history-numbers"),
  historyError: document.querySelector("#history-error"),
  historyList: document.querySelector("#history-list"),
  historyEmpty: document.querySelector("#history-empty"),
  historySub: document.querySelector("#history-sub"),
  clearHistory: document.querySelector("#clear-history"),
  frequencyGrid: document.querySelector("#frequency-grid"),
  frequencySub: document.querySelector("#frequency-sub"),
  hotList: document.querySelector("#hot-list"),
  coldList: document.querySelector("#cold-list"),
  fEven: document.querySelector("#f-even"),
  fSum: document.querySelector("#f-sum"),
  fPrimes: document.querySelector("#f-primes"),
  fBorder: document.querySelector("#f-border"),
  fRun: document.querySelector("#f-run"),
  fRepeat: document.querySelector("#f-repeat"),
  fBalance: document.querySelector("#f-balance"),
  trend: document.querySelector("#trend"),
  filtersBadge: document.querySelector("#filters-badge"),
  toast: document.querySelector("#toast"),
};

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    showToast("Não foi possível salvar no dispositivo.", "error");
  }
}

function makeId() {
  return globalThis.crypto?.randomUUID?.() ?? `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function keyOf(numbers) {
  return [...numbers].sort((a, b) => a - b).join(",");
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function pad(number) {
  return String(number).padStart(2, "0");
}

function formatOneIn(value) {
  const options = value >= 100 ? { maximumFractionDigits: 0 } : { maximumFractionDigits: 1, minimumFractionDigits: 1 };
  return new Intl.NumberFormat("pt-BR", options).format(value);
}

function formatPercent(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "percent",
    maximumSignificantDigits: 3,
  }).format(value);
}

function formatDate(iso) {
  const date = iso ? new Date(iso) : new Date();
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit" }).format(date);
}

function loadSaved() {
  const entries = readStorage(STORAGE.saved, []);
  if (!Array.isArray(entries)) return [];
  const seen = new Set();
  return entries
    .filter((entry) => entry && isValidGame(entry.nums))
    .slice(0, 300)
    .map((entry) => ({
      id: entry.id || makeId(),
      nums: normalizePool(entry.nums),
      createdAt: entry.createdAt || new Date().toISOString(),
    }))
    .filter((entry) => {
      const key = keyOf(entry.nums);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

function loadHistory() {
  const entries = readStorage(STORAGE.history, []);
  if (!Array.isArray(entries)) return [];
  return entries
    .filter((entry) => entry && Array.isArray(entry.nums) && isValidGame(entry.nums))
    .slice(0, 120)
    .map((entry) => ({
      id: entry.id || makeId(),
      contest: String(entry.contest ?? ""),
      nums: normalizePool(entry.nums),
      createdAt: entry.createdAt || new Date().toISOString(),
    }));
}

function loadPreferences() {
  const raw = readStorage(STORAGE.preferences, null);
  const filters = { ...DEFAULT_FILTERS, ...(raw?.filters ?? {}) };
  if (!["off", "hot", "cold"].includes(filters.trend)) filters.trend = "off";
  return {
    quantity: clamp(Number(raw?.quantity) || 10, 1, 30),
    filters,
  };
}

const state = {
  pool: new Set(),
  draw: new Set(),
  results: [],
  resultsBase: 0,
  saved: loadSaved(),
  history: loadHistory(),
  preferences: loadPreferences(),
  conference: null,
  toastTimer: null,
  simulating: false,
};

function showToast(message, type = "ok") {
  els.toast.textContent = message;
  els.toast.classList.toggle("is-error", type === "error");
  els.toast.classList.add("is-visible");
  clearTimeout(state.toastTimer);
  state.toastTimer = setTimeout(() => {
    els.toast.classList.remove("is-visible");
  }, 3200);
}

function filtersFromUI() {
  return {
    evenBalance: els.fEven.checked,
    sumRange: els.fSum.checked,
    primes: els.fPrimes.checked,
    border: els.fBorder.checked,
    maxRun: els.fRun.checked ? 4 : null,
    repeatLast: els.fRepeat.checked,
    trend: els.trend.value,
    balanceGames: els.fBalance.checked,
  };
}

function applyFiltersToUI(filters) {
  els.fEven.checked = filters.evenBalance !== false;
  els.fSum.checked = filters.sumRange !== false;
  els.fPrimes.checked = filters.primes !== false;
  els.fBorder.checked = filters.border !== false;
  els.fRun.checked = Number.isFinite(filters.maxRun);
  els.fRepeat.checked = filters.repeatLast !== false;
  els.fBalance.checked = filters.balanceGames !== false;
  els.trend.value = ["off", "hot", "cold"].includes(filters.trend) ? filters.trend : "off";
}

function savePreferences() {
  state.preferences = {
    quantity: clamp(Number(els.quantity.value) || 10, 1, 30),
    filters: filtersFromUI(),
  };
  writeStorage(STORAGE.preferences, state.preferences);
}

function updateFiltersBadge() {
  const hasHistory = state.history.length > 0;
  let active = 0;
  if (els.fEven.checked) active += 1;
  if (els.fSum.checked) active += 1;
  if (els.fPrimes.checked) active += 1;
  if (els.fBorder.checked) active += 1;
  if (els.fRun.checked) active += 1;
  if (els.fRepeat.checked && hasHistory) active += 1;
  if (els.fBalance.checked) active += 1;
  if (els.trend.value !== "off" && hasHistory) active += 1;
  els.filtersBadge.textContent = `${active} ${active === 1 ? "ativo" : "ativos"}`;
}

function buildGrid(container) {
  const fragment = document.createDocumentFragment();
  for (const number of NUMBERS) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "number";
    button.dataset.number = String(number);
    button.textContent = pad(number);
    button.setAttribute("aria-label", `Dezena ${number}`);
    button.setAttribute("aria-pressed", "false");
    fragment.append(button);
  }
  container.replaceChildren(fragment);
}

function paintGrid(container, selected) {
  for (const button of container.querySelectorAll(".number")) {
    const number = Number(button.dataset.number);
    const isSelected = selected.has(number);
    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  }
}

function baseNumbers() {
  return state.pool.size >= 15 ? [...state.pool].sort((a, b) => a - b) : [...NUMBERS];
}

function updatePoolUI() {
  const count = state.pool.size;
  els.poolCount.textContent = String(count);
  if (count === 0) {
    els.poolBadge.textContent = "Base: todas as 25";
    els.poolNote.textContent = "Sem seleção, a mistura usa todas as 25 dezenas.";
    els.poolHint.textContent = "Selecione de 15 a 25 dezenas ou use as 25.";
  } else if (count < 15) {
    els.poolBadge.textContent = `Faltam ${15 - count}`;
    els.poolNote.textContent = "Com menos de 15 selecionadas, a mistura volta a usar todas as 25 dezenas.";
    els.poolHint.textContent = "Selecione pelo menos 15 dezenas para restringir a base.";
  } else if (count === 15) {
    els.poolBadge.textContent = "Base: 15 dezenas";
    els.poolNote.textContent = "Com exatamente 15, o jogo gerado é a sua seleção.";
    els.poolHint.textContent = "Sua base tem 15 dezenas: o jogo será exatamente ela.";
  } else {
    els.poolBadge.textContent = `Base: ${count} dezenas`;
    els.poolNote.textContent = `Misturando ${count} dezenas para formar jogos de 15.`;
    els.poolHint.textContent = `Base com ${count} dezenas. Quanto maior a base, mais combinações possíveis.`;
  }
}

function updateDrawUI() {
  els.drawCount.textContent = String(state.draw.size);
  els.checkGames.disabled = state.draw.size !== 15;
  els.checkGames.textContent = state.draw.size === 15 ? "Conferir meus jogos" : `Faltam ${15 - state.draw.size} dezenas`;
  if (state.draw.size === 15) els.checkGames.textContent = "Conferir meus jogos";
}

function clearConference() {
  if (!state.conference) return;
  state.conference = null;
  els.summary.hidden = true;
  renderSaved();
}

function updateHistoryDependent() {
  const hasHistory = state.history.length > 0;
  els.fRepeat.disabled = !hasHistory;
  els.trend.disabled = !hasHistory;
  if (!hasHistory) {
    els.trend.value = "off";
    els.drawLast.disabled = true;
    els.drawLast.title = "Cadastre um resultado no histórico primeiro";
  } else {
    els.drawLast.disabled = false;
    els.drawLast.title = "Usar as dezenas do último resultado cadastrado";
  }
  els.clearHistory.disabled = !hasHistory;
  els.clearSaved.disabled = state.saved.length === 0;
  updateFiltersBadge();
}

function renderResults() {
  const amount = state.results.length;
  if (!amount) {
    els.results.replaceChildren();
    els.resultsEmpty.hidden = false;
    els.resultsSub.textContent = "Nenhum jogo gerado ainda.";
    els.copyAll.disabled = true;
    els.saveAll.disabled = true;
    return;
  }

  const savedKeys = new Set(state.saved.map((entry) => keyOf(entry.nums)));
  els.results.innerHTML = state.results
    .map((game, index) => {
      const stats = analyzeGame(game.nums);
      const isSaved = savedKeys.has(keyOf(game.nums));
      const balls = game.nums
        .map((number) => `<span class="ball">${pad(number)}</span>`)
        .join("");
      return `
        <article class="game-card" style="--i:${Math.min(index, 12)}">
          <div class="game-head">
            <span class="game-title">Jogo <strong>${pad(index + 1)}</strong></span>
            <div class="game-actions">
              <button class="icon-btn${isSaved ? " is-saved" : ""}" type="button" data-action="toggle-save" data-id="${game.id}" aria-label="${isSaved ? "Remover dos jogos salvos" : "Salvar este jogo"}" title="${isSaved ? "Jogo salvo" : "Salvar jogo"}">${isSaved ? "★" : "☆"}</button>
              <button class="icon-btn" type="button" data-action="remove-result" data-id="${game.id}" aria-label="Remover este jogo" title="Remover">×</button>
            </div>
          </div>
          <div class="balls">${balls}</div>
          <div class="game-meta">
            <span>Pares <strong>${stats.even}</strong></span>
            <span>Ímpares <strong>${stats.odd}</strong></span>
            <span>Soma <strong>${stats.sum}</strong></span>
            <span>Primos <strong>${stats.primes}</strong></span>
            <span>Moldura <strong>${stats.border}</strong></span>
          </div>
        </article>`;
    })
    .join("");
  els.resultsEmpty.hidden = true;
  const base = state.resultsBase || baseNumbers().length;
  els.resultsSub.textContent = `${amount} ${amount === 1 ? "jogo" : "jogos"} · base de ${base} dezenas`;
  els.copyAll.disabled = false;
  els.saveAll.disabled = false;
}

function renderSaved() {
  const amount = state.saved.length;
  els.savedSub.textContent = `${amount} ${amount === 1 ? "jogo salvo" : "jogos salvos"}`;
  els.clearSaved.disabled = amount === 0;
  els.savedEmpty.hidden = amount > 0;
  if (!amount) {
    els.savedGames.replaceChildren();
    return;
  }
  els.savedGames.innerHTML = state.saved
    .map((entry, index) => {
      const result = state.conference?.byId?.[entry.id];
      const isPrize = Boolean(result?.prize);
      const balls = entry.nums
        .map((number) => {
          let className = "ball";
          if (result) className += result.matched.includes(number) ? " is-hit" : " is-miss";
          return `<span class="${className}">${pad(number)}</span>`;
        })
        .join("");
      let badge = `<span class="result-badge">não conferido</span>`;
      if (result) {
        const near = result.hits === 10;
        badge = `<span class="result-badge${isPrize ? " is-prize" : near ? " is-near" : ""}">${result.hits} ${result.hits === 1 ? "acerto" : "acertos"}${isPrize ? ` · faixa ${result.prize}` : near ? " · quase!" : ""}</span>`;
      }
      return `
        <article class="saved-item${isPrize ? " is-prize" : ""}">
          <div class="saved-head">
            <span class="saved-label">Jogo ${pad(index + 1)} · ${formatDate(entry.createdAt)}</span>
            <div class="game-actions">
              ${badge}
              <button class="icon-btn" type="button" data-action="delete-saved" data-id="${entry.id}" aria-label="Apagar este jogo" title="Apagar">×</button>
            </div>
          </div>
          <div class="balls">${balls}</div>
        </article>`;
    })
    .join("");
}

function renderSummary() {
  if (!state.conference) {
    els.summary.hidden = true;
    return;
  }
  const { best, prizeCount, total, tiers } = state.conference;
  const tierText = Object.entries(tiers)
    .filter(([, count]) => count > 0)
    .sort((a, b) => Number(b[0]) - Number(a[0]))
    .map(([tier, count]) => `${tier}×${count}`)
    .join(" · ");
  els.summary.innerHTML = `
    <div class="summary-stat"><span>Jogos conferidos</span><strong>${total}</strong></div>
    <div class="summary-stat"><span>Melhor resultado</span><strong class="${best >= 11 ? "is-prize" : ""}">${best} ${best === 1 ? "acerto" : "acertos"}</strong></div>
    <div class="summary-stat"><span>Jogos premiados</span><strong class="${prizeCount ? "is-prize" : ""}">${prizeCount}</strong></div>
    <div class="summary-stat"><span>Faixas</span><strong>${tierText || "nenhuma"}</strong></div>`;
  els.summary.hidden = false;
}

function renderOdds() {
  const tiers = theoreticalOdds();
  els.odds.innerHTML = tiers
    .map(
      (tier) => `
      <div class="odds-item${tier.hits === 15 ? " is-top" : ""}">
        <span>${tier.hits} acertos</span>
        <strong>1 em ${formatOneIn(tier.oneIn)}</strong>
        <small>${formatPercent(tier.probability)}</small>
      </div>`,
    )
    .join("");
  const prize = prizeProbability();
  els.anyPrize.textContent = `1 em ${formatOneIn(prize.oneIn)} · ${formatPercent(prize.probability)}`;
}

function renderFrequency() {
  const counts = frequencyFromHistory(state.history);
  const hasHistory = state.history.length > 0;
  const values = NUMBERS.map((number) => counts.get(number) ?? 0);
  const max = Math.max(0, ...values);
  const min = Math.min(...values);
  const hot = [...NUMBERS].sort((a, b) => (counts.get(b) - counts.get(a)) || a - b).slice(0, 5);
  const cold = [...NUMBERS].sort((a, b) => (counts.get(a) - counts.get(b)) || a - b).slice(0, 5);

  els.frequencySub.textContent = hasHistory
    ? `${state.history.length} ${state.history.length === 1 ? "concurso analisado · cadastre mais para comparar" : "concursos analisados"}`
    : "Sem histórico cadastrado.";

  els.frequencyGrid.innerHTML = NUMBERS.map((number) => {
    const count = counts.get(number) ?? 0;
    const heat = max ? count / max : 0;
    const classes = ["frequency-cell"];
    if (hasHistory && max !== min && count === max) classes.push("is-hot");
    if (hasHistory && max !== min && count === min) classes.push("is-cold");
    return `
      <div class="${classes.join(" ")}" style="--heat:${heat.toFixed(3)}" title="${count} ${count === 1 ? "aparição" : "aparições"} em ${state.history.length} concursos">
        <strong>${pad(number)}</strong>
        <span>${count}×</span>
      </div>`;
  }).join("");

  const ballList = (numbers, className) =>
    numbers.map((number) => `<span class="ball ${className}">${pad(number)}</span>`).join("");
  els.hotList.innerHTML = hasHistory ? ballList(hot, "is-hot") : "";
  els.coldList.innerHTML = hasHistory ? ballList(cold, "is-cold") : "";
}

function renderHistoryList() {
  const amount = state.history.length;
  els.historySub.textContent = amount
    ? `${amount} ${amount === 1 ? "resultado" : "resultados"}`
    : "Nenhum resultado.";
  els.historyEmpty.hidden = amount > 0;
  els.historyList.hidden = amount === 0;
  if (!amount) {
    els.historyList.replaceChildren();
    return;
  }
  els.historyList.innerHTML = state.history
    .map((entry) => {
      const title = entry.contest ? `Concurso ${entry.contest}` : "Resultado cadastrado";
      const balls = entry.nums.map((number) => `<span class="ball">${pad(number)}</span>`).join("");
      return `
        <article class="history-item">
          <div class="history-item-head">
            <span class="history-item-title">${title}<small>${formatDate(entry.createdAt)}</small></span>
            <button class="icon-btn" type="button" data-action="delete-history" data-id="${entry.id}" aria-label="Apagar este resultado" title="Apagar">×</button>
          </div>
          <div class="balls">${balls}</div>
        </article>`;
    })
    .join("");
}

function renderHistory() {
  renderFrequency();
  renderHistoryList();
  updateHistoryDependent();
}

function persistSaved() {
  writeStorage(STORAGE.saved, state.saved);
}

function persistHistory() {
  writeStorage(STORAGE.history, state.history);
}

function isSavedKey(key) {
  return state.saved.some((entry) => keyOf(entry.nums) === key);
}

function addSaved(numbers) {
  const key = keyOf(numbers);
  if (isSavedKey(key)) return false;
  state.saved.unshift({
    id: makeId(),
    nums: normalizePool(numbers),
    createdAt: new Date().toISOString(),
  });
  state.saved = state.saved.slice(0, 300);
  persistSaved();
  renderSaved();
  updateHistoryDependent();
  return true;
}

function removeSavedByKey(numbers) {
  const key = keyOf(numbers);
  const before = state.saved.length;
  state.saved = state.saved.filter((entry) => keyOf(entry.nums) !== key);
  if (state.saved.length !== before) {
    persistSaved();
    state.conference = null;
    els.summary.hidden = true;
    renderSaved();
    updateHistoryDependent();
    return true;
  }
  return false;
}

function toggleResultSaved(game) {
  const key = keyOf(game.nums);
  if (isSavedKey(key)) {
    removeSavedByKey(game.nums);
    return false;
  }
  addSaved(game.nums);
  return true;
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const field = document.createElement("textarea");
      field.value = text;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.append(field);
      field.select();
      const copied = document.execCommand("copy");
      field.remove();
      return copied;
    } catch {
      return false;
    }
  }
}

function generate() {
  let quantity = clamp(Number(els.quantity.value) || 1, 1, 30);
  const base = baseNumbers();
  if (base.length === 15 && quantity !== 1) {
    quantity = 1;
    els.quantity.value = "1";
  }
  els.generate.disabled = true;
  try {
    const filters = filtersFromUI();
    const games = generateGames({
      pool: base,
      quantity,
      filters,
      history: state.history,
    });
    const adjusted = base.length !== 15 && games.some((game) => !passesFilters(game, filters, lastDrawFromHistory(state.history)));
    state.results = games.map((nums) => ({ id: makeId(), nums }));
    state.resultsBase = base.length;
    state.conference = null;
    els.summary.hidden = true;
    renderResults();
    renderSaved();
    if (base.length === 15) {
      showToast("Base com 15 dezenas: gerado o jogo da sua seleção.");
    } else {
      showToast(`${games.length} ${games.length === 1 ? "jogo gerado" : "jogos gerados"}${adjusted ? " · filtros ajustados para esta base" : ""}.`);
    }
    if (window.matchMedia("(max-width: 1040px)").matches) {
      document.querySelector(".results-card")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  } catch (error) {
    showToast(error?.message || "Não foi possível gerar os jogos.", "error");
  } finally {
    els.generate.disabled = false;
  }
}

function checkSavedGames() {
  if (state.draw.size !== 15) {
    showToast("Selecione as 15 dezenas sorteadas.", "error");
    return;
  }
  if (!state.saved.length) {
    showToast("Salve pelo menos um jogo para conferir.", "error");
    return;
  }
  const draw = [...state.draw].sort((a, b) => a - b);
  const byId = {};
  const tiers = { 15: 0, 14: 0, 13: 0, 12: 0, 11: 0 };
  let best = 0;
  let prizeCount = 0;
  for (const entry of state.saved) {
    const result = checkGame(entry.nums, draw);
    byId[entry.id] = result;
    best = Math.max(best, result.hits);
    if (result.prize) {
      prizeCount += 1;
      tiers[result.prize] += 1;
    }
  }
  state.conference = { byId, best, prizeCount, tiers, total: state.saved.length };
  renderSaved();
  renderSummary();
  showToast(prizeCount ? `${prizeCount} ${prizeCount === 1 ? "jogo premiado" : "jogos premiados"}!` : "Nenhum prêmio desta vez. Continue tentando!");
  els.summary.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function applyDrawInput() {
  const numbers = parseNumberList(els.drawText.value);
  const unique = new Set(numbers);
  els.drawError.textContent = "";
  if (numbers.length !== 15 || unique.size !== 15) {
    els.drawError.textContent = "Informe exatamente 15 dezenas diferentes.";
    return;
  }
  if (numbers.some((number) => number < 1 || number > 25)) {
    els.drawError.textContent = "Use apenas dezenas entre 1 e 25.";
    return;
  }
  state.draw = new Set(numbers);
  paintGrid(els.drawGrid, state.draw);
  clearConference();
  updateDrawUI();
  updateHistoryDependent();
}

function setDrawFromNumbers(numbers) {
  state.draw = new Set(numbers);
  paintGrid(els.drawGrid, state.draw);
  els.drawText.value = formatNumbers(numbers);
  els.drawError.textContent = "";
  clearConference();
  updateDrawUI();
}

function useLastDraw() {
  const last = lastDrawFromHistory(state.history);
  if (!last) {
    showToast("Cadastre um resultado no histórico primeiro.", "error");
    return;
  }
  setDrawFromNumbers(last);
  showToast("Último resultado carregado.");
}

function addHistoryEntry(event) {
  event.preventDefault();
  els.historyError.textContent = "";
  const numbers = parseNumberList(els.historyNumbers.value);
  const unique = new Set(numbers);
  if (numbers.length !== 15 || unique.size !== 15) {
    els.historyError.textContent = "Informe exatamente 15 dezenas diferentes.";
    return;
  }
  if (numbers.some((number) => number < 1 || number > 25)) {
    els.historyError.textContent = "Use apenas dezenas entre 1 e 25.";
    return;
  }
  if (state.history.length > 120) {
    els.historyError.textContent = "Limite de 120 concursos atingido. Apague algum resultado.";
    return;
  }
  const sorted = normalizePool(numbers);
  if (state.history.some((entry) => keyOf(entry.nums) === keyOf(sorted))) {
    els.historyError.textContent = "Esse resultado já está no histórico.";
    return;
  }
  state.history.unshift({
    id: makeId(),
    contest: els.contest.value.trim(),
    nums: sorted,
    createdAt: new Date().toISOString(),
  });
  state.history = state.history.slice(0, 120);
  persistHistory();
  els.historyForm.reset();
  renderHistory();
  showToast("Resultado adicionado ao histórico.");
}

async function runSimulation() {
  if (state.simulating) return;
  state.simulating = true;
  const game = state.draw.size === 15 ? [...state.draw].sort((a, b) => a - b) : randomDraw();
  els.simulate.disabled = true;
  els.simulate.textContent = "Simulando...";
  els.simResult.innerHTML = `<p class="sim-placeholder">Rodando 100.000 sorteios aleatórios...</p>`;
  await new Promise((resolve) => setTimeout(resolve, 40));
  try {
    const { rounds, counts } = simulateGame(game, 100000);
    const tiers = theoreticalOdds();
    const max = Math.max(1, ...counts.slice(11));
    const rows = tiers
      .map((tier) => {
        const observed = counts[tier.hits];
        const percent = observed / rounds;
        return `
          <div class="sim-row is-prize">
            <span>${tier.hits} acertos</span>
            <div class="sim-bar"><i style="--w:${((observed / max) * 100).toFixed(2)}%"></i></div>
            <span class="sim-value"><strong>${observed}</strong> · ${formatPercent(percent)}</span>
          </div>`;
      })
      .join("");
    const noPrize = counts.slice(0, 11).reduce((sum, value) => sum + value, 0);
    const balls = game.map((number) => `<span class="ball is-small">${pad(number)}</span>`).join("");
    els.simResult.innerHTML = `
      <div class="sim-game">Jogo testado: <span class="balls">${balls}</span></div>
      <div class="sim-bars">${rows}</div>
      <p class="fineprint">Sem prêmio (0 a 10 acertos): ${noPrize} sorteios (${formatPercent(noPrize / rounds)}).<br>Comparação com a probabilidade teórica: ${tiers.map((tier) => `${tier.hits} acertos ${formatPercent(tier.probability)}`).join(" · ")}.</p>`;
  } catch {
    els.simResult.innerHTML = `<p class="sim-placeholder">Não foi possível concluir a simulação.</p>`;
  } finally {
    state.simulating = false;
    els.simulate.disabled = false;
    els.simulate.textContent = "Simular 100 mil sorteios";
  }
}

function activateTab(name, updateHash = true) {
  const valid = ["gerar", "conferir", "historico"];
  const target = valid.includes(name) ? name : "gerar";
  for (const tab of document.querySelectorAll(".tab")) {
    const active = tab.dataset.tab === target;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", String(active));
    tab.tabIndex = active ? 0 : -1;
  }
  for (const panel of document.querySelectorAll(".panel")) {
    const active = panel.id === `tab-${target}`;
    panel.hidden = !active;
    panel.classList.toggle("is-active", active);
  }
  if (target === "conferir") {
    renderSaved();
    renderSummary();
  }
  if (target === "historico") renderHistory();
  if (updateHash) window.history.replaceState(null, "", `#${target}`);
}

function bindEvents() {
  els.numberGrid.addEventListener("click", (event) => {
    const button = event.target.closest(".number");
    if (!button) return;
    const number = Number(button.dataset.number);
    if (state.pool.has(number)) state.pool.delete(number);
    else state.pool.add(number);
    button.classList.toggle("is-selected", state.pool.has(number));
    button.setAttribute("aria-pressed", String(state.pool.has(number)));
    updatePoolUI();
  });

  els.drawGrid.addEventListener("click", (event) => {
    const button = event.target.closest(".number");
    if (!button) return;
    const number = Number(button.dataset.number);
    if (!state.draw.has(number) && state.draw.size >= 15) {
      showToast("Você já selecionou 15 dezenas. Remova uma para trocar.", "error");
      return;
    }
    if (state.draw.has(number)) state.draw.delete(number);
    else state.draw.add(number);
    button.classList.toggle("is-selected", state.draw.has(number));
    button.setAttribute("aria-pressed", String(state.draw.has(number)));
    clearConference();
    updateDrawUI();
  });

  els.surprise.addEventListener("click", () => {
    state.pool = new Set(randomDraw());
    paintGrid(els.numberGrid, state.pool);
    updatePoolUI();
  });

  els.poolClear.addEventListener("click", () => {
    state.pool.clear();
    paintGrid(els.numberGrid, state.pool);
    updatePoolUI();
  });

  els.drawClear.addEventListener("click", () => {
    state.draw.clear();
    paintGrid(els.drawGrid, state.draw);
    els.drawText.value = "";
    els.drawError.textContent = "";
    clearConference();
    updateDrawUI();
  });

  els.drawLast.addEventListener("click", useLastDraw);
  els.drawApply.addEventListener("click", applyDrawInput);
  els.drawText.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      applyDrawInput();
    }
  });

  els.quantity.addEventListener("input", () => {
    const value = clamp(Number(els.quantity.value) || 1, 1, 30);
    els.quantity.value = String(value);
    savePreferences();
  });

  document.querySelectorAll("[data-step]").forEach((button) => {
    button.addEventListener("click", () => {
      const step = Number(button.dataset.step);
      const value = clamp((Number(els.quantity.value) || 1) + step, 1, 30);
      els.quantity.value = String(value);
      savePreferences();
    });
  });

  els.generate.addEventListener("click", generate);

  els.results.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");
    if (!button) return;
    const game = state.results.find((entry) => entry.id === button.dataset.id);
    if (!game) return;
    if (button.dataset.action === "toggle-save") {
      const nowSaved = toggleResultSaved(game);
      button.classList.toggle("is-saved", nowSaved);
      button.textContent = nowSaved ? "★" : "☆";
      button.setAttribute("aria-label", nowSaved ? "Remover dos jogos salvos" : "Salvar este jogo");
      button.title = nowSaved ? "Jogo salvo" : "Salvar jogo";
      showToast(nowSaved ? "Jogo salvo." : "Jogo removido dos salvos.");
    }
    if (button.dataset.action === "remove-result") {
      state.results = state.results.filter((entry) => entry.id !== game.id);
      renderResults();
    }
  });

  els.saveAll.addEventListener("click", () => {
    if (!state.results.length) return;
    let added = 0;
    for (let index = state.results.length - 1; index >= 0; index -= 1) {
      if (addSaved(state.results[index].nums)) added += 1;
    }
    renderResults();
    showToast(added ? `${added} ${added === 1 ? "jogo salvo" : "jogos salvos"}.` : "Todos os jogos já estão salvos.");
  });

  els.copyAll.addEventListener("click", async () => {
    if (!state.results.length) return;
    const text = state.results.map((game) => formatNumbers(game.nums)).join("\n");
    const copied = await copyText(text);
    showToast(copied ? "Jogos copiados para a área de transferência." : "Não foi possível copiar.", copied ? "ok" : "error");
  });

  els.savedGames.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action='delete-saved']");
    if (!button) return;
    state.saved = state.saved.filter((entry) => entry.id !== button.dataset.id);
    persistSaved();
    state.conference = null;
    els.summary.hidden = true;
    renderSaved();
    updateHistoryDependent();
    showToast("Jogo removido dos salvos.");
  });

  els.clearSaved.addEventListener("click", () => {
    if (!state.saved.length) return;
    if (!confirm("Apagar todos os jogos salvos?")) return;
    state.saved = [];
    persistSaved();
    state.conference = null;
    els.summary.hidden = true;
    renderSaved();
    updateHistoryDependent();
    showToast("Jogos salvos apagados.");
  });

  els.checkGames.addEventListener("click", checkSavedGames);

  els.historyForm.addEventListener("submit", addHistoryEntry);

  els.historyList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action='delete-history']");
    if (!button) return;
    state.history = state.history.filter((entry) => entry.id !== button.dataset.id);
    persistHistory();
    renderHistory();
    showToast("Resultado removido do histórico.");
  });

  els.clearHistory.addEventListener("click", () => {
    if (!state.history.length) return;
    if (!confirm("Apagar todo o histórico de concursos?")) return;
    state.history = [];
    persistHistory();
    renderHistory();
    showToast("Histórico apagado.");
  });

  for (const input of [els.fEven, els.fSum, els.fPrimes, els.fBorder, els.fRun, els.fRepeat, els.fBalance, els.trend]) {
    input.addEventListener("change", () => {
      updateFiltersBadge();
      savePreferences();
    });
  }

  els.simulate.addEventListener("click", runSimulation);

  document.querySelectorAll(".tab").forEach((tab, index, all) => {
    tab.addEventListener("click", () => activateTab(tab.dataset.tab));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      let next = index;
      if (event.key === "ArrowLeft") next = (index - 1 + all.length) % all.length;
      if (event.key === "ArrowRight") next = (index + 1) % all.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = all.length - 1;
      all[next].focus();
      activateTab(all[next].dataset.tab);
    });
  });

  document.querySelector(".brand").addEventListener("click", (event) => {
    event.preventDefault();
    activateTab("gerar");
  });

  window.addEventListener("hashchange", () => {
    activateTab(window.location.hash.replace("#", ""), false);
  });
}

function init() {
  applyFiltersToUI(state.preferences.filters);
  els.quantity.value = String(state.preferences.quantity);
  buildGrid(els.numberGrid);
  buildGrid(els.drawGrid);
  paintGrid(els.numberGrid, state.pool);
  paintGrid(els.drawGrid, state.draw);
  updatePoolUI();
  updateDrawUI();
  updateHistoryDependent();
  renderResults();
  renderSaved();
  renderHistory();
  renderOdds();
  bindEvents();
  const initial = window.location.hash.replace("#", "");
  activateTab(["gerar", "conferir", "historico"].includes(initial) ? initial : "gerar", false);
}

init();
