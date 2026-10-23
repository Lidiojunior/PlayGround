const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

const tracks = [
  {
    title: 'Noite de Estrelas',
    artist: 'Cante! · faixa demo',
    genre: 'Bossa pop',
    bpm: '92 BPM',
    tone: 'Tom de A',
    duration: 192,
    cover: 'cover-a',
    mark: 'C!',
    thumb: 'a',
    lyrics: [
      { t: 0, text: 'Quando a noite cai sobre a cidade' },
      { t: 10, text: 'e a lua desenha o mar' },
      { t: 20, text: 'eu procuro a tua voz na multidão' },
      { t: 30, text: 'pra me levar a sonhar' },
      { t: 40, text: 'As luzes piscam, o mundo gira' },
      { t: 49, text: 'e o tempo para de correr' },
      { t: 58, text: 'se o teu olhar encontra o meu' },
      { t: 67, text: 'não há mais nada a temer' },
      { t: 76, text: 'Noite de estrelas, noite de amor' },
      { t: 90, text: 'canta comigo o que ficou' },
      { t: 104, text: 'cada palavra é um novo lugar' },
      { t: 118, text: 'onde a gente pode dançar' },
      { t: 132, text: 'Se o vento trouxer a tua canção' },
      { t: 144, text: 'eu canto junto sem pensar' },
      { t: 156, text: 'e a madrugada vira um palco' },
      { t: 168, text: 'pra gente nunca mais parar' },
      { t: 180, text: 'Noite de estrelas, noite de amor' },
      { t: 188, text: 'canta comigo mais uma vez' }
    ]
  },
  {
    title: 'Sol de Verão',
    artist: 'Cante! · faixa demo',
    genre: 'Pop',
    bpm: '108 BPM',
    tone: 'Tom de D',
    duration: 168,
    cover: 'cover-b',
    mark: 'S!',
    thumb: 'b',
    lyrics: [
      { t: 0, text: 'O sol acorda e bate na janela' },
      { t: 12, text: 'a cidade veste azul' },
      { t: 24, text: 'levo o teu riso na mochila' },
      { t: 36, text: 'e um pedaço de céu no bolso' },
      { t: 50, text: 'As ruas cantam uma canção nova' },
      { t: 62, text: 'e o vento chama o teu nome' },
      { t: 76, text: 'se a tarde queima, a gente inventa' },
      { t: 90, text: 'um jeito doce de ficar' },
      { t: 104, text: 'Sol de verão, sol de verão' },
      { t: 118, text: 'derrete o gelo do coração' },
      { t: 132, text: 'dança comigo até o fim' },
      { t: 148, text: 'que a noite espera por nós dois' }
    ]
  },
  {
    title: 'Coração de Papel',
    artist: 'Cante! · faixa demo',
    genre: 'MPB',
    bpm: '84 BPM',
    tone: 'Tom de G',
    duration: 186,
    cover: 'cover-c',
    mark: 'C!',
    thumb: 'c',
    lyrics: [
      { t: 0, text: 'Fiz um barco de papel' },
      { t: 14, text: 'pra navegar no teu olhar' },
      { t: 28, text: 'dobrei cada palavra' },
      { t: 42, text: 'num mapa pra te encontrar' },
      { t: 58, text: 'Se a chuva molhar o barco' },
      { t: 72, text: 'eu faço outro com a tua voz' },
      { t: 86, text: 'e sigo a linha do horizonte' },
      { t: 100, text: 'levando um pouco de nós' },
      { t: 116, text: 'Coração de papel, coração de papel' },
      { t: 130, text: 'não tem medo de se entregar' },
      { t: 146, text: 'se rasgar, a gente cola' },
      { t: 160, text: 'e aprende de novo a amar' }
    ]
  }
];

const library = [
  { title: 'Noite de Estrelas', artist: 'Cante! Demo', genre: 'Bossa pop', duration: '3:12', badge: 'DEMO', thumb: 'a', demo: 0 },
  { title: 'Sol de Verão', artist: 'Cante! Demo', genre: 'Pop', duration: '2:48', badge: 'DEMO', thumb: 'b', demo: 1 },
  { title: 'Coração de Papel', artist: 'Cante! Demo', genre: 'MPB', duration: '3:06', badge: 'DEMO', thumb: 'c', demo: 2 },
  { title: 'Evidências', artist: 'Chitãozinho & Xororó', genre: 'Sertanejo', duration: '4:32', badge: 'KAR', thumb: 'd' },
  { title: 'Infiel', artist: 'Marília Mendonça', genre: 'Sertanejo', duration: '3:18', badge: 'KAR', thumb: 'e' },
  { title: 'Tempo Perdido', artist: 'Legião Urbana', genre: 'Rock', duration: '3:27', badge: 'KAR', thumb: 'f' },
  { title: 'Vou Deixar', artist: 'Skank', genre: 'Pop', duration: '3:56', badge: 'KAR', thumb: 'g' },
  { title: 'Anunciação', artist: 'Alceu Valença', genre: 'MPB', duration: '3:28', badge: 'KAR', thumb: 'h' }
];

const favorites = new Set(['Noite de Estrelas']);
const themeClasses = ['theme-neon', 'theme-sunset', 'theme-ocean'];
const themeNames = ['Neon', 'Pôr do sol', 'Oceano'];

const elements = {
  title: $('#songTitle'),
  artist: $('#songArtist'),
  genre: $('#songGenre'),
  bpm: $('#songBpm'),
  tone: $('#songTone'),
  cover: $('#cover'),
  coverMark: $('#coverMark'),
  coverTitle: $('#coverTitle'),
  progress: $('#progress'),
  elapsed: $('#elapsed'),
  remaining: $('#remaining'),
  playBtn: $('#playBtn'),
  playIcon: $('.play-icon'),
  pauseIcon: $('.pause-icon'),
  prevBtn: $('#prevBtn'),
  nextBtn: $('#nextBtn'),
  shuffleBtn: $('#shuffleBtn'),
  repeatBtn: $('#repeatBtn'),
  pitchDown: $('#pitchDown'),
  pitchUp: $('#pitchUp'),
  pitchValue: $('#pitchValue'),
  volume: $('#volume'),
  lyrics: $('#lyrics'),
  lyricsCard: $('#lyricsCard'),
  grid: $('#songGrid'),
  empty: $('#libraryEmpty'),
  status: $('#libraryStatus'),
  search: $('#searchInput'),
  filters: $$('.filter'),
  toast: $('#toast'),
  menu: $('#contextMenu'),
  menuBtn: $('#menuBtn'),
  mobileNav: $('#mobileNav'),
  stage: $('#karaoke'),
  fileInput: $('#fileInput'),
  queueNote: $('#queueNote'),
  themeBtn: $('#themeBtn')
};

const state = {
  trackIndex: 0,
  position: 62,
  playing: false,
  pitch: 0,
  volume: 0.65,
  activeLine: -1,
  raf: 0,
  lastFrame: 0,
  filter: 'todas',
  search: '',
  shuffle: false,
  repeat: false,
  themeIndex: 0,
  toastTimer: 0
};

let audio = null;

function clock(seconds) {
  const safe = Math.max(0, Math.round(seconds));
  return `${Math.floor(safe / 60)}:${String(safe % 60).padStart(2, '0')}`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
}

function toast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add('is-visible');
  clearTimeout(state.toastTimer);
  state.toastTimer = setTimeout(() => elements.toast.classList.remove('is-visible'), 3400);
}

function currentTrack() {
  return tracks[state.trackIndex];
}

function setRangeFill(input) {
  const max = Number(input.max) || 100;
  const value = Number(input.value) || 0;
  input.style.setProperty('--p', `${Math.min(100, Math.max(0, (value / max) * 100))}%`);
}

function renderTrack() {
  const track = currentTrack();
  elements.title.textContent = track.title;
  elements.artist.textContent = track.artist;
  elements.genre.textContent = track.genre;
  elements.bpm.textContent = track.bpm;
  elements.tone.textContent = track.tone;
  elements.cover.className = `cover ${track.cover}`;
  elements.coverMark.textContent = track.mark;
  elements.coverTitle.innerHTML = escapeHtml(track.title).replace(' ', '<br>');
  elements.progress.max = String(track.duration);
  elements.progress.value = String(state.position);
  elements.queueNote.textContent = `Fila demo · ${state.trackIndex + 1} de ${tracks.length} faixas originais`;
  document.title = `${track.title} · Cante!`;
  buildLyrics();
  updateProgress();
  updateLyrics(true);
  renderGrid();
}

function buildLyrics() {
  const track = currentTrack();
  elements.lyrics.innerHTML = '';
  track.lyrics.forEach((line, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'line';
    button.dataset.index = String(index);
    button.textContent = line.text;
    elements.lyrics.append(button);
  });
  state.activeLine = -1;
}

function centerActiveLine(instant = false) {
  const active = elements.lyrics.querySelector('.line.is-active');
  if (!active) return;
  const target = active.offsetTop - elements.lyrics.clientHeight / 2 + active.offsetHeight / 2;
  const behavior = instant || window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
  elements.lyrics.scrollTo({ top: Math.max(0, target), behavior });
}

function updateLyrics(force = false) {
  const track = currentTrack();
  let index = 0;
  track.lyrics.forEach((line, lineIndex) => {
    if (line.t <= state.position + 0.05) index = lineIndex;
  });
  if (!force && index === state.activeLine) return;
  state.activeLine = index;
  $$('.line', elements.lyrics).forEach((line, lineIndex) => {
    line.classList.toggle('is-active', lineIndex === index);
    line.classList.toggle('is-past', lineIndex < index);
  });
  centerActiveLine(force);
}

function updateProgress() {
  const track = currentTrack();
  const duration = track.duration;
  elements.progress.value = String(Math.min(state.position, duration));
  elements.progress.max = String(duration);
  elements.elapsed.textContent = clock(state.position);
  elements.remaining.textContent = `-${clock(Math.max(0, duration - state.position))}`;
  setRangeFill(elements.progress);
}

function setPosition(seconds) {
  const track = currentTrack();
  state.position = Math.min(track.duration, Math.max(0, seconds));
  updateProgress();
  updateLyrics(true);
}

function startAudio() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;
  if (!audio) {
    const context = new AudioContextClass();
    const master = context.createGain();
    master.gain.value = 0.0001;
    master.connect(context.destination);
    audio = { context, master, timer: 0, next: 0, step: 0 };
  }
  if (audio.context.state === 'suspended') audio.context.resume().catch(() => {});
  audio.master.gain.cancelScheduledValues(audio.context.currentTime);
  audio.master.gain.setTargetAtTime(state.volume * 0.13, audio.context.currentTime, 0.08);
  audio.next = audio.context.currentTime + 0.08;
  audio.step = 0;
  clearInterval(audio.timer);
  audio.timer = setInterval(scheduleAudio, 100);
  scheduleAudio();
}

function pauseAudio() {
  if (!audio) return;
  clearInterval(audio.timer);
  audio.timer = 0;
  audio.master.gain.setTargetAtTime(0.0001, audio.context.currentTime, 0.04);
}

function tone(frequency, when, duration, type, level) {
  const oscillator = audio.context.createOscillator();
  const gain = audio.context.createGain();
  const shifted = frequency * Math.pow(2, state.pitch / 12);
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(shifted, when);
  gain.gain.setValueAtTime(0.0001, when);
  gain.gain.exponentialRampToValueAtTime(level, when + 0.025);
  gain.gain.exponentialRampToValueAtTime(0.0001, when + duration);
  oscillator.connect(gain);
  gain.connect(audio.master);
  oscillator.start(when);
  oscillator.stop(when + duration + 0.05);
}

function scheduleAudio() {
  if (!audio || !state.playing) return;
  const chords = [
    [220, 261.63, 329.63],
    [196, 246.94, 293.66],
    [174.61, 220, 261.63],
    [196, 246.94, 293.66]
  ];
  const stepDuration = 0.3;
  while (audio.next < audio.context.currentTime + 0.45) {
    const chord = chords[Math.floor(audio.step / 8) % chords.length];
    const step = audio.step % 8;
    if (step === 0) {
      chord.forEach((frequency, index) => tone(frequency * 2, audio.next + index * 0.02, 1.45, 'sine', 0.045));
      tone(chord[0] / 2, audio.next, 1.1, 'triangle', 0.08);
    }
    if (step === 3 || step === 6) {
      chord.forEach(frequency => tone(frequency * 2, audio.next, 0.6, 'sine', 0.028));
    }
    if (step % 2 === 0) {
      tone(chord[state.trackIndex % 3] * 4, audio.next, 0.18, 'sine', 0.022);
    }
    audio.next += stepDuration;
    audio.step += 1;
  }
}

function frame(now) {
  if (!state.playing) return;
  const delta = Math.min((now - state.lastFrame) / 1000, 0.5);
  state.lastFrame = now;
  const track = currentTrack();
  state.position += delta;
  if (state.position >= track.duration) {
    if (state.repeat) {
      state.position = 0;
      updateLyrics(true);
    } else {
      selectTrack(state.shuffle ? randomTrackIndex() : (state.trackIndex + 1) % tracks.length, { play: true });
    }
  }
  updateProgress();
  updateLyrics();
  state.raf = requestAnimationFrame(frame);
}

function setPlaying(next) {
  if (next === state.playing) {
    if (next) {
      state.lastFrame = performance.now();
      state.raf = requestAnimationFrame(frame);
    }
    return;
  }
  state.playing = next;
  document.body.classList.toggle('is-playing', next);
  elements.playIcon.hidden = next;
  elements.pauseIcon.hidden = !next;
  elements.playBtn.setAttribute('aria-label', next ? 'Pausar' : 'Tocar');
  if (next) {
    state.lastFrame = performance.now();
    startAudio();
    state.raf = requestAnimationFrame(frame);
  } else {
    cancelAnimationFrame(state.raf);
    pauseAudio();
  }
}

function selectTrack(index, { play = false, position = 0 } = {}) {
  const wasPlaying = state.playing;
  state.trackIndex = ((index % tracks.length) + tracks.length) % tracks.length;
  state.position = position;
  renderTrack();
  if (play || wasPlaying) {
    if (!wasPlaying) setPlaying(true);
    else {
      updateLyrics(true);
      state.lastFrame = performance.now();
    }
  } else {
    setPlaying(false);
  }
  toast(`Agora cantando: ${currentTrack().title}`);
}

function randomTrackIndex() {
  if (tracks.length < 2) return 0;
  let index = state.trackIndex;
  while (index === state.trackIndex) index = Math.floor(Math.random() * tracks.length);
  return index;
}

function visibleSongs() {
  const term = state.search.trim().toLowerCase();
  return library.filter(song => {
    const matchesFilter = state.filter === 'todas'
      || (state.filter === 'favoritas' && favorites.has(song.title))
      || song.genre.toLowerCase().includes(state.filter);
    const matchesSearch = !term
      || song.title.toLowerCase().includes(term)
      || song.artist.toLowerCase().includes(term)
      || song.genre.toLowerCase().includes(term);
    return matchesFilter && matchesSearch;
  });
}

function renderGrid() {
  const songs = visibleSongs();
  const track = currentTrack();
  elements.grid.innerHTML = songs.map(song => {
    const isCurrent = song.demo === state.trackIndex;
    const isFavorite = favorites.has(song.title);
    const glyph = song.thumb.toUpperCase();
    const actionLabel = song.demo !== undefined ? `Tocar ${song.title}` : `Baixar ${song.title}`;
    const actionIcon = song.demo !== undefined ? 'i-play' : 'i-download';
    return `
      <article class="song-card${isCurrent ? ' is-current' : ''}">
        <button class="song-main" type="button" data-title="${escapeHtml(song.title)}">
          <span class="thumb thumb-${song.thumb}">${glyph}</span>
          <span class="song-info">
            <span class="song-name">${escapeHtml(song.title)}</span>
            <span class="song-artist">${escapeHtml(song.artist)}</span>
            <span class="song-meta">
              <span class="badge${song.badge === 'DEMO' ? ' is-demo' : ''}${isCurrent ? ' is-current' : ''}">${isCurrent ? 'TOCANDO' : song.badge}</span>
              <span>${escapeHtml(song.genre)}</span>
              <span>·</span>
              <span>${song.duration}</span>
            </span>
          </span>
        </button>
        <span class="song-actions">
          <button class="mini-btn heart-btn" type="button" data-title="${escapeHtml(song.title)}" aria-label="${isFavorite ? 'Remover' : 'Adicionar'} ${escapeHtml(song.title)} ${isFavorite ? 'das' : 'às'} favoritas" aria-pressed="${isFavorite}">
            <svg class="icon" aria-hidden="true"><use href="#i-heart"/></svg>
          </button>
          <button class="mini-btn card-play" type="button" data-title="${escapeHtml(song.title)}" aria-label="${actionLabel}">
            <svg class="icon" aria-hidden="true"><use href="#${actionIcon}"/></svg>
          </button>
        </span>
      </article>`;
  }).join('');
  elements.empty.hidden = songs.length > 0;
  elements.status.textContent = songs.length === library.length
    ? `${library.length} músicas no acervo`
    : `${songs.length} de ${library.length} músicas`;
  if (!songs.some(song => song.title === track.title)) elements.status.textContent += ' · demo no palco';
}

function playLibrarySong(title) {
  const song = library.find(item => item.title === title);
  if (!song) return;
  if (song.demo !== undefined) {
    selectTrack(song.demo, { play: true });
    elements.stage.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }
  toast(`«${song.title}» está no acervo. Adicione o arquivo .kar para cantar esta faixa.`);
}

function toggleFavorite(title) {
  if (favorites.has(title)) favorites.delete(title);
  else favorites.add(title);
  renderGrid();
  toast(favorites.has(title) ? `«${title}» adicionada às favoritas.` : `«${title}» removida das favoritas.`);
}

function setFilter(filter) {
  state.filter = filter;
  elements.filters.forEach(button => button.classList.toggle('is-active', button.dataset.filter === filter));
  renderGrid();
}

function changePitch(delta) {
  state.pitch = Math.max(-6, Math.min(6, state.pitch + delta));
  elements.pitchValue.textContent = state.pitch > 0 ? `+${state.pitch}` : String(state.pitch);
  if (state.pitch === 0) elements.pitchValue.textContent = '+0';
  toast(`Tom ${state.pitch > 0 ? '+' : ''}${state.pitch}`);
}

function changeTheme() {
  const body = document.body;
  themeClasses.forEach(name => body.classList.remove(name));
  state.themeIndex = (state.themeIndex + 1) % themeClasses.length;
  body.classList.add(themeClasses[state.themeIndex]);
  toast(`Imagem de fundo: ${themeNames[state.themeIndex]}`);
}

function openMenu(x, y) {
  const menu = elements.menu;
  menu.hidden = false;
  menu.style.left = '0px';
  menu.style.top = '0px';
  const rect = menu.getBoundingClientRect();
  menu.style.left = `${Math.max(10, Math.min(x, window.innerWidth - rect.width - 12))}px`;
  menu.style.top = `${Math.max(10, Math.min(y, window.innerHeight - rect.height - 12))}px`;
}

function closeMenu() {
  elements.menu.hidden = true;
}

function updateVolume() {
  elements.volume.value = String(state.volume * 100);
  setRangeFill(elements.volume);
  if (audio) audio.master.gain.setTargetAtTime(state.volume * 0.13, audio.context.currentTime, 0.05);
}

function boot() {
  setRangeFill(elements.volume);
  elements.volume.value = String(state.volume * 100);
  setRangeFill(elements.volume);
  renderTrack();
  elements.pitchValue.textContent = '+0';
  requestAnimationFrame(() => requestAnimationFrame(() => centerActiveLine(true)));

  elements.playBtn.addEventListener('click', () => {
    if (!state.playing && state.position >= currentTrack().duration) state.position = 0;
    setPlaying(!state.playing);
  });

  elements.prevBtn.addEventListener('click', () => selectTrack((state.trackIndex - 1 + tracks.length) % tracks.length, { play: state.playing }));
  elements.nextBtn.addEventListener('click', () => selectTrack(state.shuffle ? randomTrackIndex() : (state.trackIndex + 1) % tracks.length, { play: state.playing }));

  elements.shuffleBtn.addEventListener('click', () => {
    state.shuffle = !state.shuffle;
    elements.shuffleBtn.setAttribute('aria-pressed', String(state.shuffle));
    toast(state.shuffle ? 'Modo aleatório ativado.' : 'Modo aleatório desativado.');
  });

  elements.repeatBtn.addEventListener('click', () => {
    state.repeat = !state.repeat;
    elements.repeatBtn.setAttribute('aria-pressed', String(state.repeat));
    toast(state.repeat ? 'Repetição ativada.' : 'Repetição desativada.');
  });

  elements.progress.addEventListener('input', event => setPosition(Number(event.target.value)));
  elements.lyrics.addEventListener('click', event => {
    const line = event.target.closest('.line');
    if (!line) return;
    const index = Number(line.dataset.index);
    setPosition(currentTrack().lyrics[index].t);
    if (!state.playing) setPlaying(true);
    else state.lastFrame = performance.now();
  });

  elements.pitchDown.addEventListener('click', () => changePitch(-1));
  elements.pitchUp.addEventListener('click', () => changePitch(1));
  elements.volume.addEventListener('input', event => {
    state.volume = Number(event.target.value) / 100;
    setRangeFill(elements.volume);
    if (audio) audio.master.gain.setTargetAtTime(state.volume * 0.13, audio.context.currentTime, 0.05);
  });

  elements.grid.addEventListener('click', event => {
    const heart = event.target.closest('.heart-btn');
    if (heart) {
      event.stopPropagation();
      toggleFavorite(heart.dataset.title);
      return;
    }
    const target = event.target.closest('.song-main, .card-play');
    if (!target) return;
    playLibrarySong(target.dataset.title);
  });

  elements.search.addEventListener('input', event => {
    state.search = event.target.value;
    renderGrid();
  });

  elements.filters.forEach(button => button.addEventListener('click', () => setFilter(button.dataset.filter)));

  $$('a[data-filter]').forEach(link => {
    link.addEventListener('click', () => {
      setFilter('favoritas');
      elements.mobileNav.classList.remove('is-open');
      elements.menuBtn.setAttribute('aria-expanded', 'false');
    });
  });

  $$('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      $$('.nav-link').forEach(item => item.classList.remove('is-active'));
      link.classList.add('is-active');
    });
  });

  elements.menuBtn.addEventListener('click', () => {
    const open = elements.mobileNav.classList.toggle('is-open');
    elements.menuBtn.setAttribute('aria-expanded', String(open));
  });

  elements.themeBtn.addEventListener('click', changeTheme);

  const openFileDialog = () => elements.fileInput.click();
  $('#addTrackBtn').addEventListener('click', openFileDialog);
  $('#uploadBtn').addEventListener('click', openFileDialog);
  $('#uploadBtn2').addEventListener('click', openFileDialog);

  elements.fileInput.addEventListener('change', event => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const title = file.name.replace(/\.[^.]+$/, '');
    library.unshift({ title, artist: 'Arquivo local', genre: 'Meus arquivos', duration: '--:--', badge: 'NOVO', thumb: 'h' });
    setFilter('todas');
    toast(`«${file.name}» adicionado à biblioteca local.`);
    event.target.value = '';
  });

  $('#demoBtn').addEventListener('click', () => {
    selectTrack(0, { play: true });
    elements.stage.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  elements.stage.addEventListener('contextmenu', event => {
    event.preventDefault();
    openMenu(event.clientX, event.clientY);
  });

  elements.menu.addEventListener('click', event => {
    const action = event.target.closest('[data-action]')?.dataset.action;
    closeMenu();
    if (action === 'songs') $('#musicas').scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (action === 'theme') changeTheme();
    if (action === 'fullscreen') {
      if (document.fullscreenElement) document.exitFullscreen();
      else document.documentElement.requestFullscreen?.().catch(() => toast('Tela cheia não está disponível neste navegador.'));
    }
    if (action === 'options') toast('Ajuste o tom e o volume direto no palco.');
  });

  document.addEventListener('pointerdown', event => {
    if (!elements.menu.hidden && !event.target.closest('#contextMenu')) closeMenu();
  });
  document.addEventListener('scroll', closeMenu, { passive: true });
  window.addEventListener('resize', () => centerActiveLine(true));

  document.addEventListener('keydown', event => {
    const tag = document.activeElement?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
    if (event.code === 'Space') {
      event.preventDefault();
      setPlaying(!state.playing);
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      changePitch(-1);
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      changePitch(1);
    }
    if (event.key === 'Escape') closeMenu();
  });
}

boot();
