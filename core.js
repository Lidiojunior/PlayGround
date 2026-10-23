export const TOTAL_NUMBERS = 25;
export const GAME_SIZE = 15;
export const NUMBERS = Object.freeze(Array.from({ length: TOTAL_NUMBERS }, (_, index) => index + 1));
export const PRIZE_TIERS = Object.freeze([15, 14, 13, 12, 11]);

const PRIMES = new Set([2, 3, 5, 7, 11, 13, 17, 19, 23]);
const BORDER = new Set([1, 2, 3, 4, 5, 6, 10, 11, 15, 16, 20, 21, 22, 23, 24, 25]);

export const DEFAULT_FILTERS = Object.freeze({
  evenBalance: true,
  sumRange: true,
  primes: true,
  border: true,
  maxRun: 4,
  repeatLast: true,
  trend: "off",
  balanceGames: true,
});

export function randomUnit() {
  if (globalThis.crypto?.getRandomValues) {
    const buffer = new Uint32Array(1);
    globalThis.crypto.getRandomValues(buffer);
    return buffer[0] / 4294967296;
  }
  return Math.random();
}

export function combinations(n, k) {
  if (k < 0 || k > n) return 0;
  const limit = Math.min(k, n - k);
  let result = 1;
  for (let i = 1; i <= limit; i += 1) {
    result = (result * (n - limit + i)) / i;
  }
  return Math.round(result);
}

export function normalizePool(pool) {
  const unique = new Set();
  for (const value of pool ?? []) {
    const number = Number(value);
    if (Number.isInteger(number) && number >= 1 && number <= TOTAL_NUMBERS) unique.add(number);
  }
  return [...unique].sort((a, b) => a - b);
}

export function isValidGame(game) {
  if (!Array.isArray(game) || game.length !== GAME_SIZE) return false;
  const seen = new Set();
  for (const value of game) {
    if (!Number.isInteger(value) || value < 1 || value > TOTAL_NUMBERS || seen.has(value)) return false;
    seen.add(value);
  }
  return true;
}

export function analyzeGame(game) {
  const sorted = [...game].sort((a, b) => a - b);
  let run = 1;
  let maxRun = sorted.length ? 1 : 0;
  for (let index = 1; index < sorted.length; index += 1) {
    run = sorted[index] === sorted[index - 1] + 1 ? run + 1 : 1;
    maxRun = Math.max(maxRun, run);
  }
  return {
    sorted,
    even: sorted.filter((number) => number % 2 === 0).length,
    odd: sorted.filter((number) => number % 2 !== 0).length,
    sum: sorted.reduce((total, number) => total + number, 0),
    primes: sorted.filter((number) => PRIMES.has(number)).length,
    border: sorted.filter((number) => BORDER.has(number)).length,
    center: sorted.filter((number) => !BORDER.has(number)).length,
    maxRun,
  };
}

export function parseNumberList(text) {
  return (String(text ?? "").match(/\d{1,2}/g) ?? []).map(Number);
}

export function formatNumbers(game) {
  return [...game]
    .sort((a, b) => a - b)
    .map((number) => String(number).padStart(2, "0"))
    .join(" ");
}

export function frequencyFromHistory(history) {
  const counts = new Map(NUMBERS.map((number) => [number, 0]));
  for (const entry of history ?? []) {
    const numbers = Array.isArray(entry) ? entry : entry?.numbers ?? entry?.nums;
    if (!Array.isArray(numbers)) continue;
    for (const value of numbers) {
      const number = Number(value);
      if (counts.has(number)) counts.set(number, counts.get(number) + 1);
    }
  }
  return counts;
}

export function lastDrawFromHistory(history) {
  const entry = history?.[0];
  if (!entry) return null;
  const numbers = Array.isArray(entry) ? entry : entry?.numbers ?? entry?.nums;
  return Array.isArray(numbers) && numbers.length === GAME_SIZE ? normalizePool(numbers) : null;
}

export function trendWeights(history, trend = "off") {
  if (trend !== "hot" && trend !== "cold") return null;
  if (!history?.length) return null;
  const counts = frequencyFromHistory(history);
  const max = Math.max(1, ...counts.values());
  const weights = new Map();
  for (const [number, count] of counts) {
    const share = count / max;
    weights.set(number, 1 + 0.9 * (trend === "hot" ? share : 1 - share));
  }
  return weights;
}

function minimumPossibleMaxRun(pool, count) {
  const blocks = [];
  let length = 1;
  for (let index = 1; index <= pool.length; index += 1) {
    if (index < pool.length && pool[index] === pool[index - 1] + 1) {
      length += 1;
    } else {
      blocks.push(length);
      length = 1;
    }
  }
  for (let limit = 1; limit <= count; limit += 1) {
    const selectable = blocks.reduce((sum, block) => sum + block - Math.floor(block / (limit + 1)), 0);
    if (selectable >= count) return limit;
  }
  return count;
}

export function passesFilters(game, filters = DEFAULT_FILTERS, lastDraw = null) {
  const stats = analyzeGame(game);
  if (filters.evenBalance && (stats.even < 6 || stats.even > 9)) return false;
  if (filters.sumRange && (stats.sum < 160 || stats.sum > 230)) return false;
  if (filters.primes && (stats.primes < 4 || stats.primes > 7)) return false;
  if (filters.border && (stats.border < 7 || stats.border > 11)) return false;
  if (Number.isFinite(filters.maxRun) && stats.maxRun > filters.maxRun) return false;
  if (filters.repeatLast && lastDraw?.length === GAME_SIZE) {
    const key = new Set(lastDraw);
    const repeated = game.filter((number) => key.has(number)).length;
    if (repeated < 7 || repeated > 11) return false;
  }
  return true;
}

function weightedSample(pool, size, weightFor, rng) {
  const items = pool.map((number) => ({ number, weight: Math.max(0.001, weightFor(number)) }));
  const picked = [];
  while (picked.length < size && items.length) {
    const total = items.reduce((sum, item) => sum + item.weight, 0);
    let ticket = rng() * total;
    let index = 0;
    while (index < items.length - 1 && ticket >= items[index].weight) {
      ticket -= items[index].weight;
      index += 1;
    }
    picked.push(items[index].number);
    items.splice(index, 1);
  }
  return picked.sort((a, b) => a - b);
}

export function randomDraw(rng = randomUnit, size = GAME_SIZE) {
  return weightedSample(NUMBERS, size, () => 1, rng);
}

export function generateGames({
  pool = NUMBERS,
  quantity = 1,
  filters = DEFAULT_FILTERS,
  history = [],
  rng = randomUnit,
} = {}) {
  const base = normalizePool(pool);
  const amount = Math.max(1, Math.min(50, Math.floor(Number(quantity) || 1)));
  if (base.length < GAME_SIZE) {
    throw Object.assign(new Error("Selecione pelo menos 15 dezenas para a base."), { code: "POOL_TOO_SMALL" });
  }
  if (base.length === GAME_SIZE) return [base];

  const possible = combinations(base.length, GAME_SIZE);
  if (possible < amount) {
    throw Object.assign(new Error(`Essa base permite apenas ${possible} jogo(s) diferente(s).`), { code: "NOT_ENOUGH_COMBINATIONS" });
  }

  const effectiveFilters = { ...filters };
  const possibleRange = (eligible) => [
    Math.max(0, GAME_SIZE - (base.length - eligible)),
    Math.min(GAME_SIZE, eligible),
  ];
  const overlaps = (range, minimum, maximum) => range[0] <= maximum && range[1] >= minimum;
  if (effectiveFilters.evenBalance) {
    const range = possibleRange(base.filter((number) => number % 2 === 0).length);
    if (!overlaps(range, 6, 9)) effectiveFilters.evenBalance = false;
  }
  if (effectiveFilters.primes) {
    const range = possibleRange(base.filter((number) => PRIMES.has(number)).length);
    if (!overlaps(range, 4, 7)) effectiveFilters.primes = false;
  }
  if (effectiveFilters.border) {
    const range = possibleRange(base.filter((number) => BORDER.has(number)).length);
    if (!overlaps(range, 7, 11)) effectiveFilters.border = false;
  }
  if (Number.isFinite(effectiveFilters.maxRun)) {
    const minimum = minimumPossibleMaxRun(base, GAME_SIZE);
    if (minimum > effectiveFilters.maxRun) effectiveFilters.maxRun = minimum;
  }
  if (effectiveFilters.sumRange) {
    const ordered = [...base].sort((a, b) => a - b);
    const minimum = ordered.slice(0, GAME_SIZE).reduce((sum, number) => sum + number, 0);
    const maximum = ordered.slice(-GAME_SIZE).reduce((sum, number) => sum + number, 0);
    if (!overlaps([minimum, maximum], 160, 230)) effectiveFilters.sumRange = false;
  }
  const lastDraw = lastDrawFromHistory(history);
  if (effectiveFilters.repeatLast && lastDraw) {
    const lastSet = new Set(lastDraw);
    const available = base.filter((number) => lastSet.has(number)).length;
    const range = possibleRange(available);
    if (!overlaps(range, 7, 11)) effectiveFilters.repeatLast = false;
  }
  const trendMap = trendWeights(history, effectiveFilters.trend);
  const usedCounts = new Map(base.map((number) => [number, 0]));

  const runPass = (filtersForPass, attemptsPerGame = 6000) => {
    const used = new Map(usedCounts);
    const games = [];
    const keys = new Set();
    for (let gameIndex = 0; gameIndex < amount; gameIndex += 1) {
      let accepted = null;
      for (let attempt = 0; attempt < attemptsPerGame; attempt += 1) {
        const candidate = weightedSample(base, GAME_SIZE, (number) => {
          const trend = trendMap?.get(number) ?? 1;
          const balance = filtersForPass.balanceGames ? 1 / Math.pow(1 + used.get(number), 1.15) : 1;
          return trend * balance;
        }, rng);
        const key = candidate.join(",");
        if (keys.has(key)) continue;
        if (!passesFilters(candidate, filtersForPass, lastDraw)) continue;
        accepted = candidate;
        break;
      }
      if (!accepted) return null;
      const key = accepted.join(",");
      keys.add(key);
      games.push(accepted);
      for (const number of accepted) used.set(number, used.get(number) + 1);
    }
    return games;
  };

  if (Number.isFinite(effectiveFilters.maxRun)) {
    for (let limit = effectiveFilters.maxRun; limit <= GAME_SIZE; limit += 1) {
      const games = runPass({ ...effectiveFilters, maxRun: limit });
      if (games) return games;
    }
  } else {
    const games = runPass(effectiveFilters);
    if (games) return games;
  }

  const relaxed = runPass({
    evenBalance: false,
    sumRange: false,
    primes: false,
    border: false,
    maxRun: null,
    repeatLast: false,
    trend: "off",
    balanceGames: effectiveFilters.balanceGames,
  });
  if (relaxed) return relaxed;
  throw Object.assign(new Error("Não foi possível montar jogos diferentes com essa base. Reduza a quantidade de jogos."), { code: "FILTERS_TOO_STRICT" });

  return games;
}

export function checkGame(game, draw) {
  const key = new Set(draw);
  const matched = [...game].filter((number) => key.has(number)).sort((a, b) => a - b);
  return {
    hits: matched.length,
    matched,
    prize: PRIZE_TIERS.includes(matched.length) ? matched.length : null,
  };
}

export function theoreticalOdds() {
  const total = combinations(TOTAL_NUMBERS, GAME_SIZE);
  return PRIZE_TIERS.map((hits) => {
    const count = combinations(GAME_SIZE, hits) * combinations(TOTAL_NUMBERS - GAME_SIZE, GAME_SIZE - hits);
    return { hits, count, probability: count / total, oneIn: total / count };
  });
}

export function prizeProbability() {
  const total = combinations(TOTAL_NUMBERS, GAME_SIZE);
  const winning = theoreticalOdds().reduce((sum, tier) => sum + tier.count, 0);
  return { probability: winning / total, oneIn: total / winning };
}

export function simulateGame(game, rounds = 100000, rng = randomUnit) {
  const counts = new Array(GAME_SIZE + 1).fill(0);
  for (let round = 0; round < rounds; round += 1) {
    const draw = new Set(randomDraw(rng));
    let hits = 0;
    for (const number of game) if (draw.has(number)) hits += 1;
    counts[hits] += 1;
  }
  return { rounds, counts };
}
