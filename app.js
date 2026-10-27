(() => {
  'use strict';

  const OPS = {
    add: { symbol: '+', spoken: 'mais', label: 'Adição' },
    sub: { symbol: '−', spoken: 'menos', label: 'Subtração' },
    mul: { symbol: '×', spoken: 'vezes', label: 'Multiplicação' },
    div: { symbol: '÷', spoken: 'dividido por', label: 'Divisão' },
  };
  const OP_KEYS = Object.keys(OPS);
  const TOTAL_QUESTIONS = 10;
  const SETTINGS_KEY = 'tabuada-falante:settings:v1';
  const BEST_KEY = 'tabuada-falante:best:v1';

  const UNITS = [
    'zero', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove',
    'dez', 'onze', 'doze', 'treze', 'catorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove',
  ];
  const TENS = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'];
  const HUNDREDS = ['', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos'];

  const $ = (id) => document.getElementById(id);

  const els = {
    learnView: $('learnView'),
    gameView: $('gameView'),
    tabLearn: $('tabLearn'),
    tabGame: $('tabGame'),
    tableChips: $('tableChips'),
    stageCard: $('stageCard'),
    stageBadge: $('stageBadge'),
    equation: $('equation'),
    equationSentence: $('equationSentence'),
    progressLabel: $('progressLabel'),
    progressTable: $('progressTable'),
    progressBar: $('progressBar'),
    progressFill: $('progressFill'),
    btnPrev: $('btnPrev'),
    btnPlay: $('btnPlay'),
    playIcon: $('playIcon'),
    playLabel: $('playLabel'),
    btnNext: $('btnNext'),
    btnStop: $('btnStop'),
    speedRange: $('speedRange'),
    speedValue: $('speedValue'),
    toggleRepeat: $('toggleRepeat'),
    toggleSound: $('toggleSound'),
    seqTitle: $('seqTitle'),
    seqCount: $('seqCount'),
    sequenceList: $('sequenceList'),
    gameSetup: $('gameSetup'),
    gamePlay: $('gamePlay'),
    gameResults: $('gameResults'),
    gameOps: $('gameOps'),
    btnStartGame: $('btnStartGame'),
    bestScore: $('bestScore'),
    hudScore: $('hudScore'),
    hudStreak: $('hudStreak'),
    hudCount: $('hudCount'),
    btnGameSound: $('btnGameSound'),
    btnQuit: $('btnQuit'),
    gameDots: $('gameDots'),
    gameEquation: $('gameEquation'),
    btnRepeatQuestion: $('btnRepeatQuestion'),
    gameOptions: $('gameOptions'),
    gameFeedback: $('gameFeedback'),
    resultStars: $('resultStars'),
    resultTitle: $('resultTitle'),
    resultScore: $('resultScore'),
    resultMessage: $('resultMessage'),
    resultStreak: $('resultStreak'),
    btnReplay: $('btnReplay'),
    btnBackLearn: $('btnBackLearn'),
    voiceDot: $('voiceDot'),
    voiceStatus: $('voiceStatus'),
    liveRegion: $('liveRegion'),
  };

  const state = {
    op: 'add',
    table: 'all',
    items: [],
    index: 0,
    playing: false,
    speed: 1,
    sound: true,
    repeat: true,
  };

  const game = {
    op: 'mix',
    phase: 'setup',
    questions: [],
    results: [],
    index: 0,
    score: 0,
    streak: 0,
    bestStreak: 0,
    locked: false,
    total: TOTAL_QUESTIONS,
    beginTimer: null,
    answerTimer: null,
  };

  const speechSupported = typeof window.speechSynthesis !== 'undefined' && typeof window.SpeechSynthesisUtterance !== 'undefined';
  let selectedVoice = null;
  let speechToken = 0;
  let speechTimer = null;
  let speechWatchdog = null;
  let playToken = 0;
  let advanceTimer = null;
  let audioContext = null;

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const randomInt = (min, max) => min + Math.floor(Math.random() * (max - min + 1));

  function shuffle(values) {
    const list = values.slice();
    for (let i = list.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
  }

  function numberToWords(value) {
    const n = Math.max(0, Math.min(999, Math.round(value)));
    if (n < 20) return UNITS[n];
    if (n < 100) {
      const tens = Math.floor(n / 10);
      const units = n % 10;
      return TENS[tens] + (units ? ` e ${UNITS[units]}` : '');
    }
    if (n === 100) return 'cem';
    const hundreds = Math.floor(n / 100);
    const rest = n % 100;
    return HUNDREDS[hundreds] + (rest ? ` e ${numberToWords(rest)}` : '');
  }

  function buildEquation(op, table, factor) {
    let a;
    let b;
    let result;

    if (op === 'add') {
      a = table;
      b = factor;
      result = a + b;
    } else if (op === 'sub') {
      a = table + factor;
      b = table;
      result = factor;
    } else if (op === 'mul') {
      a = table;
      b = factor;
      result = a * b;
    } else {
      a = table * factor;
      b = table;
      result = factor;
    }

    const { symbol, spoken } = OPS[op];
    return {
      op,
      table,
      a,
      b,
      result,
      symbol,
      display: `${a} ${symbol} ${b} = ${result}`,
      sentence: `${numberToWords(a)} ${spoken} ${numberToWords(b)} é igual a ${numberToWords(result)}`,
      question: `Quanto é ${numberToWords(a)} ${spoken} ${numberToWords(b)}?`,
    };
  }

  function buildItems() {
    const tables = state.table === 'all' ? Array.from({ length: 10 }, (_, i) => i + 1) : [state.table];
    const items = [];
    tables.forEach((table) => {
      for (let factor = 1; factor <= 10; factor += 1) {
        items.push(buildEquation(state.op, table, factor));
      }
    });
    state.items = items;
  }

  /* ---------- preferences ---------- */

  function loadSettings() {
    try {
      const raw = window.localStorage.getItem(SETTINGS_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (OP_KEYS.includes(saved.op)) state.op = saved.op;
      const table = Number(saved.table);
      if (saved.table === 'all') state.table = 'all';
      else if (Number.isInteger(table) && table >= 1 && table <= 10) state.table = table;
      if (typeof saved.sound === 'boolean') state.sound = saved.sound;
      if (typeof saved.repeat === 'boolean') state.repeat = saved.repeat;
      const speed = Number(saved.speed);
      if (Number.isFinite(speed)) state.speed = clamp(speed, 0.6, 1.6);
    } catch {
      /* preferences are optional */
    }
  }

  function saveSettings() {
    try {
      window.localStorage.setItem(SETTINGS_KEY, JSON.stringify({
        op: state.op,
        table: state.table,
        sound: state.sound,
        repeat: state.repeat,
        speed: state.speed,
      }));
    } catch {
      /* storage can be unavailable */
    }
  }

  function loadBest() {
    try {
      const value = Number.parseInt(window.localStorage.getItem(BEST_KEY) || '0', 10);
      return Number.isFinite(value) ? clamp(value, 0, TOTAL_QUESTIONS) : 0;
    } catch {
      return 0;
    }
  }

  function saveBest(value) {
    try {
      window.localStorage.setItem(BEST_KEY, String(value));
    } catch {
      /* storage can be unavailable */
    }
  }

  function updateBestDisplay() {
    els.bestScore.textContent = `${loadBest()} de ${TOTAL_QUESTIONS}`;
  }

  /* ---------- speech ---------- */

  function setSpeaking(active) {
    els.stageCard.classList.toggle('is-speaking', active);
  }

  function stopSpeech() {
    speechToken += 1;
    clearTimeout(speechTimer);
    clearTimeout(speechWatchdog);
    speechTimer = null;
    speechWatchdog = null;
    if (speechSupported) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        /* ignore */
      }
    }
    setSpeaking(false);
  }

  function speak(text, options = {}) {
    const rate = clamp((options.rate || 1) * 0.95, 0.55, 1.65);
    const fallbackMs = options.fallbackMs || 1800;
    const onDone = options.onDone || null;
    const token = speechToken + 1;
    speechToken = token;
    clearTimeout(speechTimer);
    clearTimeout(speechWatchdog);
    speechTimer = null;
    speechWatchdog = null;

    let finished = false;
    const finish = () => {
      if (finished || token !== speechToken) return;
      finished = true;
      clearTimeout(speechTimer);
      clearTimeout(speechWatchdog);
      speechTimer = null;
      speechWatchdog = null;
      setSpeaking(false);
      if (onDone) onDone();
    };

    const hasVoices = speechSupported && window.speechSynthesis.getVoices().length > 0;
    if (!state.sound || !hasVoices) {
      setSpeaking(false);
      speechTimer = setTimeout(finish, fallbackMs);
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new window.SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = rate;
      utterance.pitch = 1.03;
      utterance.volume = 1;
      if (selectedVoice) utterance.voice = selectedVoice;
      utterance.onend = finish;
      utterance.onerror = finish;

      const watchdogMs = clamp(text.length * 95 / rate + 2200, 4500, 13000);
      speechWatchdog = setTimeout(finish, watchdogMs);
      window.setTimeout(() => {
        if (token !== speechToken) return;
        try {
          window.speechSynthesis.speak(utterance);
          setSpeaking(true);
        } catch {
          finish();
        }
      }, 30);
    } catch {
      setSpeaking(false);
      speechTimer = setTimeout(finish, fallbackMs);
    }
  }

  function refreshVoices() {
    if (!speechSupported) {
      els.voiceDot.classList.remove('is-ready');
      els.voiceStatus.textContent = 'Sem voz no navegador — acompanhe as contas na tela';
      return;
    }
    let voices = [];
    try {
      voices = window.speechSynthesis.getVoices();
    } catch {
      voices = [];
    }
    selectedVoice = voices.find((voice) => /^pt[-_]br/i.test(voice.lang))
      || voices.find((voice) => /^pt/i.test(voice.lang))
      || null;

    if (selectedVoice) {
      els.voiceDot.classList.add('is-ready');
      els.voiceStatus.textContent = 'Voz em português pronta';
    } else if (voices.length) {
      els.voiceDot.classList.remove('is-ready');
      els.voiceStatus.textContent = 'Usando a voz padrão do navegador';
    } else {
      els.voiceDot.classList.remove('is-ready');
      els.voiceStatus.textContent = 'Preparando a voz do navegador';
    }
  }

  /* ---------- rendering: learn ---------- */

  function renderTableChips() {
    const fragment = document.createDocumentFragment();
    for (let n = 1; n <= 10; n += 1) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'chip';
      button.dataset.table = String(n);
      button.textContent = String(n);
      button.setAttribute('aria-label', `Tabuada do ${n}`);
      button.addEventListener('click', () => chooseTable(n));
      fragment.appendChild(button);
    }
    const all = document.createElement('button');
    all.type = 'button';
    all.className = 'chip chip-all';
    all.dataset.table = 'all';
    all.textContent = 'Todas';
    all.setAttribute('aria-label', 'Todas as tabuadas, de 1 a 10');
    all.addEventListener('click', () => chooseTable('all'));
    fragment.appendChild(all);
    els.tableChips.appendChild(fragment);
    updateTableChips();
  }

  function updateTableChips() {
    els.tableChips.querySelectorAll('.chip').forEach((chip) => {
      const active = chip.dataset.table === String(state.table);
      chip.classList.toggle('is-active', active);
      chip.setAttribute('aria-pressed', String(active));
    });
  }

  function updateOpButtons() {
    document.querySelectorAll('.op-btn[data-op]').forEach((button) => {
      const active = button.dataset.op === state.op;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  }

  function updateToggles() {
    els.toggleRepeat.classList.toggle('is-on', state.repeat);
    els.toggleRepeat.setAttribute('aria-pressed', String(state.repeat));
    els.toggleSound.classList.toggle('is-on', state.sound);
    els.toggleSound.setAttribute('aria-pressed', String(state.sound));
    els.btnGameSound.setAttribute('aria-pressed', String(state.sound));
    els.btnGameSound.setAttribute('aria-label', state.sound ? 'Desligar o som' : 'Ligar o som');
    els.speedRange.value = String(state.speed);
    els.speedValue.textContent = formatSpeed(state.speed);
  }

  function formatSpeed(value) {
    const label = Number.isInteger(value) ? String(value) : value.toFixed(1).replace('.', ',');
    return `${label}x`;
  }

  function renderSequenceMeta() {
    const all = state.table === 'all';
    els.seqTitle.textContent = all ? 'Todas as tabuadas' : `Tabuada do ${state.table}`;
    els.seqCount.textContent = all ? '100 contas em 10 tabuadas' : '10 contas';
  }

  function renderList() {
    const fragment = document.createDocumentFragment();
    let index = 0;

    const addRow = (item) => {
      const rowIndex = index;
      const row = document.createElement('button');
      row.type = 'button';
      row.className = 'seq-row';
      row.dataset.index = String(rowIndex);
      row.setAttribute('aria-label', `${item.display}. Ouvir a partir desta conta.`);
      row.innerHTML = `
        <span class="seq-index">${String(rowIndex + 1).padStart(2, '0')}</span>
        <span class="seq-eq"><b>${item.a}</b> ${item.symbol} <b>${item.b}</b> = <span class="seq-result">${item.result}</span></span>
        <span class="seq-play" aria-hidden="true"><svg viewBox="0 0 12 12"><path d="M2 1.2 10.5 6 2 10.8Z"/></svg></span>
      `;
      row.addEventListener('click', () => chooseIndex(rowIndex));
      fragment.appendChild(row);
      index += 1;
    };

    if (state.table === 'all') {
      for (let table = 1; table <= 10; table += 1) {
        const group = document.createElement('p');
        group.className = 'seq-group';
        group.textContent = `Tabuada do ${table}`;
        fragment.appendChild(group);
        state.items.filter((item) => item.table === table).forEach(addRow);
      }
    } else {
      state.items.forEach(addRow);
    }

    els.sequenceList.innerHTML = '';
    els.sequenceList.appendChild(fragment);
  }

  function updateActiveRow() {
    const previous = els.sequenceList.querySelector('.seq-row.is-active');
    if (previous) previous.classList.remove('is-active');
    const row = els.sequenceList.querySelector(`.seq-row[data-index="${state.index}"]`);
    if (row) {
      row.classList.add('is-active');
      scrollRowIntoView(row);
    }
  }

  function scrollRowIntoView(row) {
    const list = els.sequenceList;
    const listRect = list.getBoundingClientRect();
    if (!listRect.height) return;
    const rowRect = row.getBoundingClientRect();
    const padding = 10;
    if (rowRect.top < listRect.top + padding) {
      list.scrollTop += rowRect.top - listRect.top - padding;
    } else if (rowRect.bottom > listRect.bottom - padding) {
      list.scrollTop += rowRect.bottom - listRect.bottom + padding;
    }
  }

  function renderCurrent() {
    const item = state.items[state.index];
    if (!item) return;

    els.stageBadge.textContent = `Tabuada do ${item.table}`;
    els.equation.innerHTML = `
      <span class="eq-num">${item.a}</span>
      <span class="eq-op">${item.symbol}</span>
      <span class="eq-num">${item.b}</span>
      <span class="eq-eq">=</span>
      <span class="eq-result">${item.result}</span>
    `;
    els.equation.setAttribute('aria-label', item.display);
    els.equationSentence.textContent = item.sentence;

    const total = state.items.length;
    if (state.table === 'all') {
      els.progressLabel.textContent = `Tabuada do ${item.table} • ${(state.index % 10) + 1} de 10`;
      els.progressTable.textContent = 'Todas as tabuadas';
    } else {
      els.progressLabel.textContent = `Conta ${state.index + 1} de ${total}`;
      els.progressTable.textContent = `Tabuada do ${state.table}`;
    }
    els.progressFill.style.width = `${((state.index + 1) / total) * 100}%`;
    els.progressBar.setAttribute('aria-valuemax', String(total));
    els.progressBar.setAttribute('aria-valuenow', String(state.index + 1));

    updateActiveRow();
  }

  function updateTransport() {
    els.btnPlay.classList.toggle('is-playing', state.playing);
    els.playIcon.classList.toggle('is-pause', state.playing);
    els.playLabel.textContent = state.playing ? 'Pausar' : 'Ouvir tudo';
    els.btnPlay.setAttribute('aria-label', state.playing ? 'Pausar a tabuada' : 'Ouvir toda a tabuada');
  }

  function afterSelectionChange() {
    buildItems();
    state.index = 0;
    renderSequenceMeta();
    renderList();
    renderCurrent();
    if (state.playing) restartStep();
  }

  function chooseTable(value) {
    if (state.table === value) return;
    state.table = value;
    updateTableChips();
    saveSettings();
    afterSelectionChange();
  }

  function chooseOp(op) {
    if (state.op === op) return;
    state.op = op;
    document.body.dataset.op = op;
    updateOpButtons();
    saveSettings();
    afterSelectionChange();
  }

  function chooseIndex(index) {
    if (!state.items.length) return;
    state.index = ((index % state.items.length) + state.items.length) % state.items.length;
    renderCurrent();
    if (!state.playing) {
      if (!state.sound) setSound(true, false);
      state.playing = true;
      updateTransport();
    }
    restartStep();
  }

  function stepBy(delta) {
    if (!state.items.length) return;
    state.index = ((state.index + delta) % state.items.length + state.items.length) % state.items.length;
    renderCurrent();
    if (state.playing) restartStep();
  }

  /* ---------- playback ---------- */

  function startPlayback() {
    if (!state.items.length) return;
    if (!state.sound) setSound(true, false);
    state.playing = true;
    updateTransport();
    restartStep();
  }

  function pausePlayback() {
    state.playing = false;
    playToken += 1;
    clearTimeout(advanceTimer);
    stopSpeech();
    updateTransport();
  }

  function stopPlayback() {
    state.playing = false;
    playToken += 1;
    clearTimeout(advanceTimer);
    stopSpeech();
    state.index = 0;
    renderCurrent();
    updateTransport();
  }

  function restartStep() {
    if (!state.playing) return;
    playToken += 1;
    clearTimeout(advanceTimer);
    stopSpeech();
    runStep();
  }

  function runStep() {
    if (!state.playing) return;
    const item = state.items[state.index];
    if (!item) return;
    const token = ++playToken;
    renderCurrent();

    speak(item.sentence, {
      rate: state.speed,
      fallbackMs: Math.round(1800 / state.speed),
      onDone: () => {
        if (token !== playToken || !state.playing) return;
        clearTimeout(advanceTimer);
        advanceTimer = setTimeout(() => {
          if (token !== playToken || !state.playing) return;
          if (state.index < state.items.length - 1) {
            state.index += 1;
            runStep();
          } else if (state.repeat) {
            state.index = 0;
            runStep();
          } else {
            state.playing = false;
            updateTransport();
          }
        }, Math.round(360 / state.speed));
      },
    });
  }

  function togglePlay() {
    if (state.playing) pausePlayback();
    else startPlayback();
  }

  function setSound(value, restart = true) {
    if (state.sound === value) {
      updateToggles();
      return;
    }
    state.sound = value;
    updateToggles();
    saveSettings();
    if (!value) {
      stopSpeech();
      if (state.playing && restart) restartStep();
    } else if (state.playing && restart) {
      restartStep();
    }
  }

  function setRepeat(value) {
    state.repeat = value;
    updateToggles();
    saveSettings();
  }

  /* ---------- audio feedback ---------- */

  function beep(notes) {
    if (!state.sound) return;
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      audioContext = audioContext || new Ctx();
      if (audioContext.state === 'suspended') audioContext.resume();
      const now = audioContext.currentTime;
      notes.forEach(([frequency, start, duration, type = 'sine', volume = 0.045]) => {
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();
        oscillator.type = type;
        oscillator.frequency.value = frequency;
        gain.gain.setValueAtTime(0.0001, now + start);
        gain.gain.exponentialRampToValueAtTime(volume, now + start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + start + duration);
        oscillator.connect(gain);
        gain.connect(audioContext.destination);
        oscillator.start(now + start);
        oscillator.stop(now + start + duration + 0.03);
      });
    } catch {
      /* audio feedback is optional */
    }
  }

  function playCorrectSound() {
    beep([[523.25, 0, 0.12], [659.25, 0.1, 0.12], [783.99, 0.2, 0.2]]);
  }

  function playWrongSound() {
    beep([[220, 0, 0.18, 'triangle'], [164.81, 0.16, 0.26, 'triangle']]);
  }

  /* ---------- game ---------- */

  function setGameOp(op) {
    game.op = op;
    updateGameOpButtons();
  }

  function updateGameOpButtons() {
    els.gameOps.querySelectorAll('.op-btn').forEach((button) => {
      const active = button.dataset.gop === game.op;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  }

  function makeOptions(correct, op) {
    const additional = op === 'mul' ? 12 : op === 'add' ? 6 : 4;
    const ceiling = op === 'mul' ? 115 : op === 'add' ? 28 : 14;
    const values = new Set([correct]);
    let guard = 0;
    while (values.size < 4 && guard < 90) {
      guard += 1;
      const delta = randomInt(1, additional) * (Math.random() < 0.5 ? -1 : 1);
      const candidate = correct + delta;
      if (candidate >= 0 && candidate <= ceiling) values.add(candidate);
    }
    let extra = 1;
    while (values.size < 4) {
      values.add(correct + extra);
      extra += 1;
    }
    return shuffle([...values]);
  }

  function makeQuestion() {
    const op = game.op === 'mix' ? OP_KEYS[randomInt(0, OP_KEYS.length - 1)] : game.op;
    const table = randomInt(1, 10);
    const factor = randomInt(1, 10);
    const item = buildEquation(op, table, factor);
    return { ...item, options: makeOptions(item.result, op) };
  }

  function clearGameTimers() {
    clearTimeout(game.beginTimer);
    clearTimeout(game.answerTimer);
    game.beginTimer = null;
    game.answerTimer = null;
  }

  function startGame() {
    clearGameTimers();
    stopSpeech();
    if (state.playing) pausePlayback();
    if (!state.sound) setSound(true, false);
    game.questions = Array.from({ length: game.total }, makeQuestion);
    game.results = new Array(game.total).fill(null);
    game.index = 0;
    game.score = 0;
    game.streak = 0;
    game.bestStreak = 0;
    game.locked = false;
    game.phase = 'play';
    els.gameSetup.hidden = true;
    els.gameResults.hidden = true;
    els.gamePlay.hidden = false;
    renderQuestion();
    els.liveRegion.textContent = 'Jogo começou. Dez perguntas.';
  }

  function renderQuestion() {
    const question = game.questions[game.index];
    game.locked = false;
    clearGameTimers();

    els.hudCount.textContent = `${game.index + 1} de ${game.total}`;
    els.gameEquation.innerHTML = `${question.a} <span class="q-op">${question.symbol}</span> ${question.b} = <span class="q-mark">?</span>`;
    els.gameEquation.setAttribute('aria-label', question.question);
    els.gameFeedback.textContent = '';
    els.gameFeedback.className = 'game-feedback';
    els.gameOptions.innerHTML = '';

    question.options.forEach((value, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'answer-btn';
      button.dataset.value = String(value);
      button.innerHTML = `<span class="key">${index + 1}</span><span class="answer-value">${value}</span>`;
      button.addEventListener('click', () => answerQuestion(value, button));
      els.gameOptions.appendChild(button);
    });

    updateHud();
    renderDots();

    game.beginTimer = setTimeout(() => {
      if (game.phase !== 'play' || game.locked) return;
      speak(question.question, {
        rate: state.speed,
        fallbackMs: 1600,
      });
    }, 340);
  }

  function answerQuestion(value, button) {
    if (game.phase !== 'play' || game.locked) return;
    game.locked = true;
    clearGameTimers();

    const question = game.questions[game.index];
    const correct = value === question.result;
    game.results[game.index] = correct;

    if (correct) {
      game.score += 1;
      game.streak += 1;
      game.bestStreak = Math.max(game.bestStreak, game.streak);
      playCorrectSound();
    } else {
      game.streak = 0;
      playWrongSound();
    }

    els.gameOptions.querySelectorAll('.answer-btn').forEach((option) => {
      option.disabled = true;
      const optionValue = Number(option.dataset.value);
      if (optionValue === question.result) option.classList.add('is-correct');
      else if (option === button) option.classList.add('is-wrong');
      else option.classList.add('is-dimmed');
    });

    els.gameFeedback.textContent = correct
      ? `Isso! ${question.a} ${question.symbol} ${question.b} = ${question.result}.`
      : `Quase! A resposta certa é ${question.result}.`;
    els.gameFeedback.classList.toggle('is-good', correct);
    els.gameFeedback.classList.toggle('is-bad', !correct);

    updateHud();
    renderDots();
    stopSpeech();
    speak(
      correct
        ? `Isso mesmo! ${question.sentence}.`
        : `Quase! A resposta certa é ${numberToWords(question.result)}. ${question.sentence}.`,
      { rate: state.speed, fallbackMs: 1500 },
    );

    game.answerTimer = setTimeout(() => {
      if (game.phase !== 'play') return;
      game.index += 1;
      if (game.index >= game.total) showResults();
      else renderQuestion();
    }, correct ? 1450 : 1950);
  }

  function updateHud() {
    els.hudScore.textContent = String(game.score);
    els.hudStreak.textContent = String(game.streak);
    els.hudCount.textContent = `${Math.min(game.index + 1, game.total)} de ${game.total}`;
  }

  function renderDots() {
    els.gameDots.innerHTML = game.questions.map((_, index) => {
      let className = 'dot';
      if (game.results[index] === true) className += ' is-correct';
      else if (game.results[index] === false) className += ' is-wrong';
      else if (index === game.index && game.phase === 'play') className += ' is-current';
      return `<span class="${className}"></span>`;
    }).join('');
  }

  function resultsStars(score) {
    if (score >= 9) return 3;
    if (score >= 6) return 2;
    if (score >= 3) return 1;
    return 0;
  }

  function resultsCopy(score) {
    if (score === 10) return { title: 'Perfeito!', message: 'Você acertou tudo. A tabuada está na ponta da língua!' };
    if (score >= 8) return { title: 'Muito bem!', message: 'Quase perfeito. Você está dominando essas contas.' };
    if (score >= 6) return { title: 'Bom trabalho!', message: 'Você está no caminho certo. Ouça mais uma vez e tente superar.' };
    if (score >= 3) return { title: 'Continue treinando!', message: 'Cada tentativa ensina um pouquinho. Ouça a tabuada com calma e jogue de novo.' };
    return { title: 'Vamos treinar mais!', message: 'Sem pressa. Ouça a tabuada inteligente e volte quando quiser.' };
  }

  function showResults() {
    clearGameTimers();
    stopSpeech();
    game.phase = 'results';
    game.locked = true;

    const previousBest = loadBest();
    const isRecord = game.score > previousBest;
    if (isRecord) saveBest(game.score);

    const copy = resultsCopy(game.score);
    const stars = resultsStars(game.score);

    els.gamePlay.hidden = true;
    els.gameSetup.hidden = true;
    els.gameResults.hidden = false;

    els.resultStars.innerHTML = Array.from({ length: 3 }, (_, index) => `
      <svg class="${index < stars ? 'is-filled' : ''}" viewBox="0 0 24 24" aria-hidden="true">
        <path d="m12 2.6 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.4l-5.8 3.1 1.1-6.5L2.6 9.4l6.5-.9L12 2.6Z"/>
      </svg>
    `).join('');

    els.resultTitle.textContent = game.score === 10 ? 'Perfeito!' : (isRecord && game.score > 0 ? 'Novo recorde!' : copy.title);
    els.resultScore.innerHTML = `${game.score} <span>/ ${game.total}</span>`;
    els.resultMessage.textContent = isRecord && game.score > 0 ? `Seu melhor resultado até agora. ${copy.message}` : copy.message;
    els.resultStreak.textContent = String(game.bestStreak);
    updateBestDisplay();
    renderDots();
    els.liveRegion.textContent = `Fim do jogo. Você acertou ${game.score} de ${game.total}.`;

    speak(`Você acertou ${numberToWords(game.score)} de dez. ${copy.message}`, {
      rate: state.speed,
      fallbackMs: 2400,
    });
  }

  function returnToSetup() {
    clearGameTimers();
    stopSpeech();
    game.phase = 'setup';
    game.locked = true;
    els.gamePlay.hidden = true;
    els.gameResults.hidden = true;
    els.gameSetup.hidden = false;
    updateBestDisplay();
  }

  /* ---------- views and keyboard ---------- */

  function switchView(view) {
    const toGame = view === 'game';
    if (toGame) {
      if (state.playing) pausePlayback();
    } else {
      if (game.phase === 'play') returnToSetup();
    }
    els.learnView.hidden = toGame;
    els.gameView.hidden = !toGame;
    els.tabLearn.classList.toggle('is-active', !toGame);
    els.tabGame.classList.toggle('is-active', toGame);
    if (toGame) {
      els.tabLearn.removeAttribute('aria-current');
      els.tabGame.setAttribute('aria-current', 'page');
    } else {
      els.tabGame.removeAttribute('aria-current');
      els.tabLearn.setAttribute('aria-current', 'page');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleKeydown(event) {
    if (event.repeat || event.metaKey || event.ctrlKey || event.altKey) return;
    const target = event.target;
    const typing = target instanceof Element && target.closest('input, textarea, select, [contenteditable="true"]');
    if (typing) return;

    if (!els.learnView.hidden) {
      const onControl = target instanceof Element && target.closest('button, a');
      if (event.code === 'Space') {
        if (onControl) return;
        event.preventDefault();
        togglePlay();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        stepBy(1);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        stepBy(-1);
      }
      return;
    }

    if (!els.gameView.hidden) {
      if (game.phase === 'play' && !game.locked && ['1', '2', '3', '4'].includes(event.key)) {
        const options = els.gameOptions.querySelectorAll('.answer-btn');
        const option = options[Number(event.key) - 1];
        if (option) {
          event.preventDefault();
          option.click();
        }
      } else if (game.phase === 'setup' && event.key === 'Enter') {
        event.preventDefault();
        startGame();
      } else if (game.phase === 'play' && event.key === 'Escape') {
        event.preventDefault();
        returnToSetup();
      }
    }
  }

  /* ---------- wire up ---------- */

  function bindEvents() {
    els.tabLearn.addEventListener('click', () => switchView('learn'));
    els.tabGame.addEventListener('click', () => switchView('game'));

    document.querySelectorAll('.op-btn[data-op]').forEach((button) => {
      button.addEventListener('click', () => chooseOp(button.dataset.op));
    });

    els.gameOps.querySelectorAll('.op-btn').forEach((button) => {
      button.addEventListener('click', () => setGameOp(button.dataset.gop));
    });

    els.btnPlay.addEventListener('click', togglePlay);
    els.btnPrev.addEventListener('click', () => stepBy(-1));
    els.btnNext.addEventListener('click', () => stepBy(1));
    els.btnStop.addEventListener('click', stopPlayback);

    els.speedRange.addEventListener('input', () => {
      state.speed = clamp(Number(els.speedRange.value) || 1, 0.6, 1.6);
      els.speedValue.textContent = formatSpeed(state.speed);
      saveSettings();
    });

    els.toggleRepeat.addEventListener('click', () => setRepeat(!state.repeat));
    els.toggleSound.addEventListener('click', () => setSound(!state.sound));

    els.btnStartGame.addEventListener('click', startGame);
    els.btnReplay.addEventListener('click', startGame);
    els.btnBackLearn.addEventListener('click', () => switchView('learn'));
    els.btnQuit.addEventListener('click', returnToSetup);

    els.btnGameSound.addEventListener('click', () => {
      const turningOn = !state.sound;
      setSound(turningOn);
      if (turningOn && game.phase === 'play') {
        const question = game.questions[game.index];
        if (question) speak(question.question, { rate: state.speed, fallbackMs: 1600 });
      }
    });

    els.btnRepeatQuestion.addEventListener('click', () => {
      if (game.phase !== 'play') return;
      if (!state.sound) setSound(true, false);
      const question = game.questions[game.index];
      if (question) speak(question.question, { rate: state.speed, fallbackMs: 1600 });
    });

    document.addEventListener('keydown', handleKeydown);

    document.addEventListener('visibilitychange', () => {
      if (document.hidden && state.playing) pausePlayback();
    });

    if (speechSupported) {
      refreshVoices();
      if (typeof window.speechSynthesis.addEventListener === 'function') {
        window.speechSynthesis.addEventListener('voiceschanged', refreshVoices);
      } else {
        window.speechSynthesis.onvoiceschanged = refreshVoices;
      }
    }
  }

  function init() {
    loadSettings();
    document.body.dataset.op = state.op;
    updateOpButtons();
    updateGameOpButtons();
    updateToggles();
    buildItems();
    renderTableChips();
    renderSequenceMeta();
    renderList();
    renderCurrent();
    updateTransport();
    updateBestDisplay();
    bindEvents();
    refreshVoices();
  }

  init();
})();
