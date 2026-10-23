import test from "node:test";
import assert from "node:assert/strict";
import {
  DEFAULT_FILTERS,
  GAME_SIZE,
  NUMBERS,
  analyzeGame,
  checkGame,
  combinations,
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
  trendWeights,
} from "../core.js";

function seededRng(seed = 1) {
  let value = seed >>> 0;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

const noRepeatFilters = { ...DEFAULT_FILTERS, repeatLast: false };

test("randomDraw devolve 15 dezenas válidas e ordenadas", () => {
  for (let round = 0; round < 100; round += 1) {
    const game = randomDraw(seededRng(round + 1));
    assert.equal(game.length, GAME_SIZE);
    assert.ok(isValidGame(game));
    assert.deepEqual(game, [...game].sort((a, b) => a - b));
  }
});

test("normalizePool remove repetidos e valores fora do intervalo", () => {
  assert.deepEqual(normalizePool([25, 1, 1, 0, 26, "7", 7.5]), [1, 7, 25]);
});

test("generateGames cria jogos únicos, válidos e dentro dos filtros", () => {
  const games = generateGames({ quantity: 12, filters: noRepeatFilters, rng: seededRng(42) });
  assert.equal(games.length, 12);
  assert.equal(new Set(games.map((game) => game.join(","))).size, 12);
  for (const game of games) {
    assert.ok(isValidGame(game));
    assert.ok(passesFilters(game, noRepeatFilters, null));
  }
});

test("generateGames respeita a base escolhida", () => {
  const pool = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  const games = generateGames({ pool, quantity: 5, filters: noRepeatFilters, rng: seededRng(7) });
  for (const game of games) {
    for (const number of game) assert.ok(pool.includes(number));
  }
});

test("base com exatamente 15 dezenas devolve a própria seleção", () => {
  const pool = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const games = generateGames({ pool, quantity: 10, filters: DEFAULT_FILTERS });
  assert.deepEqual(games, [pool]);
});

test("generateGames falha quando não há combinações suficientes", () => {
  const pool = [...NUMBERS].slice(0, 16);
  assert.throws(
    () => generateGames({ pool, quantity: 20, filters: noRepeatFilters, rng: seededRng(3) }),
    /apenas 16 jogo/,
  );
});

test("generateGames ignora repetição impossível para a base", () => {
  const lastDraw = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const pool = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 25];
  const games = generateGames({
    pool,
    quantity: 3,
    filters: { ...DEFAULT_FILTERS, repeatLast: true },
    history: [{ numbers: lastDraw }],
    rng: seededRng(11),
  });
  assert.equal(games.length, 3);
  for (const game of games) assert.ok(isValidGame(game));
});

test("passesFilters rejeita sequências longas quando configurado", () => {
  const game = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 25];
  assert.equal(passesFilters(game, DEFAULT_FILTERS, null), false);
  assert.equal(analyzeGame(game).maxRun, 14);
});

test("filtro de repetição usa o último concurso", () => {
  const lastDraw = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const filters = {
    evenBalance: false,
    sumRange: false,
    primes: false,
    border: false,
    maxRun: null,
    repeatLast: true,
    trend: "off",
    balanceGames: false,
  };
  const repeated = [1, 2, 3, 4, 5, 6, 7, 19, 20, 21, 22, 23, 24, 25, 16];
  assert.equal(passesFilters(repeated, filters, lastDraw), true);
  const fewRepeats = [1, 2, 3, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 14, 15];
  assert.equal(passesFilters(fewRepeats, filters, lastDraw), false);
});

test("parseNumberList e formatNumbers", () => {
  assert.deepEqual(parseNumberList("01,02;03 4 5\n06 07 08 09 10 11 12 13 14 15"), [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  ]);
  assert.equal(formatNumbers([15, 3, 10]), "03 10 15");
});

test("checkGame conta acertos e identifica faixa de prêmio", () => {
  const game = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const draw = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 16, 17, 18, 19];
  const result = checkGame(game, draw);
  assert.equal(result.hits, 11);
  assert.equal(result.prize, 11);
  assert.deepEqual(result.matched, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  assert.equal(checkGame(game, [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 1, 2, 3, 4, 5]).hits, 5);
});

test("probabilidades teóricas somam todas as combinações", () => {
  const total = combinations(25, 15);
  assert.equal(total, 3268760);
  const tiers = theoreticalOdds();
  const sum = tiers.reduce((acc, tier) => acc + tier.count, 0);
  assert.equal(sum, 346126);
  assert.equal(tiers.find((tier) => tier.hits === 15).oneIn, 3268760);
  const prize = prizeProbability();
  assert.equal(prize.oneIn, total / 346126);
  assert.ok(prize.probability > 0.1 && prize.probability < 0.11);
});

test("frequência e último concurso do histórico", () => {
  const history = [
    { numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] },
    { numbers: [1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] },
  ];
  const counts = frequencyFromHistory(history);
  assert.equal(counts.get(1), 3);
  assert.equal(counts.get(15), 1);
  assert.deepEqual(lastDrawFromHistory(history), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
  const withNums = [{ nums: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 1, 2, 3, 4, 5] }];
  assert.equal(frequencyFromHistory(withNums).get(16), 1);
  assert.equal(lastDrawFromHistory(withNums).length, 15);
});

test("trendWeights prioriza quentes e frias", () => {
  const history = [{ numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] }];
  const hot = trendWeights(history, "hot");
  const cold = trendWeights(history, "cold");
  assert.ok(hot.get(1) > hot.get(25));
  assert.ok(cold.get(25) > cold.get(1));
  assert.equal(trendWeights(history, "off"), null);
});

test("simulateGame distribui todas as rodadas", () => {
  const game = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const result = simulateGame(game, 500, seededRng(99));
  assert.equal(result.counts.reduce((sum, value) => sum + value, 0), 500);
  assert.equal(result.counts.length, 16);
});
