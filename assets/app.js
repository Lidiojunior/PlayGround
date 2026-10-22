(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const API_URL = 'https://de1.api.radio-browser.info/json/stations/bycountrycodeexact/BR?limit=300&order=clickcount&reverse=true&hidebroken=true';
  const PAGE_SIZE = 30;
  const WATCHDOG_MS = 20000;

  const CATEGORIES = [
    { id: 'trending', label: 'Em alta' },
    { id: 'pop', label: 'Pop' },
    { id: 'rock', label: 'Rock' },
    { id: 'sertanejo', label: 'Sertanejo' },
    { id: 'mpb', label: 'MPB & Samba' },
    { id: 'news', label: 'Notícias' },
    { id: 'eletronica', label: 'Eletrônica' },
    { id: 'gospel', label: 'Gospel' },
    { id: 'flashback', label: 'Flashback' },
    { id: 'jazz', label: 'Jazz & Soul' },
    { id: 'favorites', label: 'Favoritas' }
  ];

  const CATEGORY_LABELS = Object.fromEntries(CATEGORIES.map(category => [category.id, category.label]));

  const RULES = [
    ['news', /not[ií]cia|news|jornal|talk|esporte|futebol|debate|pol[ií]tica/],
    ['sertanejo', /sertanej|caipira|country|agro|rural|mod[aã]o/],
    ['gospel', /gospel|crist|religios|cat[oó]lic|adora|jesus|deus|louvor/],
    ['rock', /rock|metal|alternat|indie|punk|hard/],
    ['eletronica', /eletr[oô]nic|electron|edm|techno|house|trance|dance|rave/],
    ['jazz', /jazz|blues|soul|bossa|smooth|lounge|chill/],
    ['mpb', /mpb|samba|pagode|brasileir|choro|ax[eé]|forr[oó]|frevo|seresta/],
    ['flashback', /flashback|oldies|classic|80s|90s|70s|60s|anos|retr[oô]|saudade|nostalg|mem[oó]ria/],
    ['pop', /pop|hits|top 40|chr|contempor|jovem|dance/]
  ];

  const CURATED = [
    { name: 'Antena 1', city: 'São Paulo', state: 'SP', stream: 'https://antenaone.crossradio.com.br/stream/1;', tags: ['Adulto', 'Flashback'], categories: ['flashback', 'mpb'], logo: 'https://img.radios.com.br/radio/lg/radio9505_1574106966.jpg', bitrate: 96 },
    { name: 'Mix FM', city: 'São Paulo', state: 'SP', stream: 'https://playerservices.streamtheworld.com/api/livestream-redirect/MIXFM_SAOPAULOAAC.aac', tags: ['Pop', 'Pop rock'], categories: ['pop', 'rock'], logo: 'https://img.radios.com.br/radio/lg/radio13955_1720711597.png', bitrate: 64 },
    { name: 'Jovem Pan FM', city: 'Belo Horizonte', state: 'MG', stream: 'https://8062.brasilstream.com.br/stream?origem=task_site', tags: ['Pop', 'Hits'], categories: ['pop'], logo: 'https://img.radios.com.br/radio/lg/radio8829_1708517690.png', bitrate: 64 },
    { name: '89 FM A Rádio Rock', city: 'São Paulo', state: 'SP', stream: 'https://playerservices.streamtheworld.com/api/livestream-redirect/RADIO_89FM_ADP.aac?dist=site-89fm', tags: ['Rock', 'Alternativo'], categories: ['rock'], logo: '', bitrate: 128 },
    { name: 'Kiss FM', city: 'São Paulo', state: 'SP', stream: 'https://playerservices.streamtheworld.com/api/livestream-redirect/RADIO_KISSFM_ADP.aac', tags: ['Rock', 'Clássicos'], categories: ['rock'], logo: '', bitrate: 128 },
    { name: 'Band FM', city: 'São Paulo', state: 'SP', stream: 'https://playerservices.streamtheworld.com/api/livestream-redirect/BANDFM_SPAAC.aac', tags: ['Pop', 'Hits'], categories: ['pop'], logo: 'https://img.radios.com.br/radio/lg/radio10358_1526480428.jpg', bitrate: 64 },
    { name: 'Alpha FM', city: 'São Paulo', state: 'SP', stream: 'https://playerservices.streamtheworld.com/api/livestream-redirect/RADIO_ALPHAFM_ADP.aac', tags: ['Light', 'Flashback'], categories: ['flashback', 'mpb'], logo: 'https://cdn-profiles.tunein.com/s8129/images/logod.jpg', bitrate: 128 },
    { name: 'CBN São Paulo', city: 'São Paulo', state: 'SP', stream: 'https://playerservices.streamtheworld.com/api/livestream-redirect/CBN_SPAAC.aac', tags: ['Notícias', 'Esportes'], categories: ['news'], logo: '', bitrate: 128 },
    { name: 'BandNews FM', city: 'São Paulo', state: 'SP', stream: 'https://playerservices.streamtheworld.com/api/livestream-redirect/BANDNEWSFM_SPAAC_SC', tags: ['Notícias', 'Debate'], categories: ['news'], logo: 'https://img.radios.com.br/radio/lg/radio24477_1579261235.jpg', bitrate: 64 },
    { name: 'Rádio Globo', city: 'Rio de Janeiro', state: 'RJ', stream: 'https://playerservices.streamtheworld.com/api/livestream-redirect/RADIO_GLOBO_RJAAC.aac?dist=radioscombr', tags: ['Notícias', 'Variedades'], categories: ['news'], logo: 'https://img.radios.com.br/radio/lg/radio8817_1676300226.png', bitrate: 128 },
    { name: 'Transamérica', city: 'São Paulo', state: 'SP', stream: 'https://playerservices.streamtheworld.com/api/livestream-redirect/RT_SPAAC.aac', tags: ['Adulto', 'Esportes'], categories: ['flashback', 'news'], logo: 'https://img.radios.com.br/radio/lg/radio8803_1578516680.png', bitrate: 32 },
    { name: 'Nova Brasil FM', city: 'São Paulo', state: 'SP', stream: 'https://playerservices.streamtheworld.com/api/livestream-redirect/NOVABRASIL_SPAAC.aac', tags: ['MPB', 'Brasil'], categories: ['mpb'], logo: '', bitrate: 96 },
    { name: 'Rádio Itatiaia', city: 'Belo Horizonte', state: 'MG', stream: 'https://8903.brasilstream.com.br/stream', tags: ['Notícias', 'Futebol'], categories: ['news'], logo: 'https://img.radios.com.br/radio/lg/radio14_1646746883.jpeg', bitrate: 64 },
    { name: 'Saudade FM', city: 'Santos', state: 'SP', stream: 'https://playerservices.streamtheworld.com/api/livestream-redirect/SAUDADE_FMAAC.aac', tags: ['Flashback', 'Romântico'], categories: ['flashback'], logo: 'https://img.radios.com.br/radio/lg/radio8_1626274312.png', bitrate: 64 },
    { name: 'Sertaneja 106.7', city: 'São Paulo', state: 'SP', stream: 'https://sc4s.cdn.upx.com:8067/stream', tags: ['Sertanejo', 'Modão'], categories: ['sertanejo'], logo: '', bitrate: 128 },
    { name: 'BH FM', city: 'Belo Horizonte', state: 'MG', stream: 'https://playerservices.streamtheworld.com/api/livestream-redirect/BHFMAAC.aac', tags: ['Pop', 'Samba'], categories: ['pop', 'mpb'], logo: 'https://i.postimg.cc/ncT9hqH6/04008003142.png', bitrate: 128 },
    { name: 'FM O Dia', city: 'Rio de Janeiro', state: 'RJ', stream: 'https://wz7.servidoresbrasil.com:8274/stream', tags: ['Samba', 'Pagode'], categories: ['mpb'], logo: 'https://img.radios.com.br/radio/lg/radio229211_1706128532.jpeg', bitrate: 128 },
    { name: 'Bossa Jazz Brasil', city: '', state: 'Brasil', stream: 'https://centova5.transmissaodigital.com:20104/live', tags: ['Bossa', 'Jazz'], categories: ['jazz', 'mpb'], logo: 'https://bossajazzbrasil.com/wp-content/uploads/2020/12/cropped-bjs-app-180x180.png', bitrate: 64 },
    { name: 'Rádio Melodia', city: 'Rio de Janeiro', state: 'RJ', stream: 'https://playerservices.streamtheworld.com/api/livestream-redirect/MELODIAFMAAC.aac', tags: ['Gospel', 'Louvor'], categories: ['gospel'], logo: 'https://img.radios.com.br/radio/lg/radio13848_1439401456.jpg', bitrate: 64 },
    { name: 'MGT Gospel', city: '', state: 'Brasil', stream: 'https://cast.mgtradio.net/radio/8040/aac', tags: ['Gospel', 'Cristã'], categories: ['gospel'], logo: 'https://www.mgtradio.net/favicon.ico', bitrate: 64 },
    { name: 'JB FM', city: 'Rio de Janeiro', state: 'RJ', stream: 'https://playerservices.streamtheworld.com/api/livestream-redirect/JBFMAAC.aac', tags: ['Flashback', 'MPB'], categories: ['flashback', 'mpb'], logo: 'https://img.radios.com.br/radio/lg/radio13654_1668607474.jpg', bitrate: 48 },
    { name: 'Super Rádio Tupi', city: 'Rio de Janeiro', state: 'RJ', stream: 'https://8923.brasilstream.com.br/stream', tags: ['Notícias', 'Variedades'], categories: ['news'], logo: '', bitrate: 32 },
    { name: '80 Hits Brasil', city: 'Brasília', state: 'DF', stream: 'https://stm5.painelcast.com:7662/stream', tags: ['Flashback', 'Anos 80'], categories: ['flashback'], logo: 'https://i.ibb.co/5x1yHdR0/LOGO2025.png', bitrate: 96 },
    { name: 'Rádio Bandeirantes', city: 'São Paulo', state: 'SP', stream: 'https://playerservices.streamtheworld.com/api/livestream-redirect/RadioBandeirantesAAC.aac', tags: ['Notícias', 'Esportes'], categories: ['news'], logo: '', bitrate: 64 }
  ];

  const audio = $('#audio');
  const grid = $('#stationGrid');
  const chips = $('#categoryChips');
  const searchInput = $('#search');
  const searchClear = $('#searchClear');
  const resultsCount = $('#resultsCount');
  const loadMore = $('#loadMore');
  const playerCard = $('.player-card');
  const playerName = $('#playerName');
  const playerMeta = $('#playerMeta');
  const statusPill = $('#statusPill');
  const statusText = $('#statusText');
  const sleepChip = $('#sleepChip');
  const playBtn = $('#playBtn');
  const heroPlay = $('#heroPlay');
  const favBtn = $('#favBtn');
  const miniPlayer = $('#miniPlayer');
  const miniPlay = $('#miniPlay');
  const miniFav = $('#miniFav');
  const miniName = $('#miniName');
  const miniMeta = $('#miniMeta');
  const miniArt = $('#miniArt');
  const miniInitials = $('#miniInitials');
  const volumeInput = $('#volume');
  const muteBtn = $('#muteBtn');
  const sleepBtn = $('#sleepBtn');
  const sleepMenu = $('#sleepMenu');
  const toastRegion = $('#toastRegion');
  const recentSection = $('#recentes');
  const recentList = $('#recentList');
  const installBtn = $('#installBtn');

  const storage = {
    get(key, fallback) {
      try {
        const raw = localStorage.getItem(key);
        return raw === null ? fallback : JSON.parse(raw);
      } catch {
        return fallback;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch {
        return;
      }
    }
  };

  const state = {
    all: [],
    view: storage.get('mojo:view', 'trending'),
    query: '',
    limit: PAGE_SIZE,
    current: null,
    playing: false,
    source: 'loading',
    favorites: new Set(storage.get('mojo:favs', [])),
    favMeta: storage.get('mojo:favmeta', {}),
    recent: storage.get('mojo:recent', []),
    sleepEndsAt: 0,
    sleepMinutes: 0
  };

  if (!CATEGORY_LABELS[state.view]) state.view = 'trending';

  let loadedStream = null;
  let watchdog = 0;
  let searchTimer = 0;
  let deferredPrompt = null;
  let lastRecentId = '';
  let playerInView = true;

  const normalize = value => String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[character]));

  const hashId = value => {
    let hash = 2166136261;
    for (let index = 0; index < value.length; index += 1) {
      hash ^= value.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return `s${(hash >>> 0).toString(36)}`;
  };

  const streamKey = value => normalize(value)
    .replace(/[?#].*$/, '')
    .replace(/\/+$/, '');

  const isHttps = value => /^https:\/\//i.test(String(value ?? ''));

  const splitTags = value => String(value ?? '')
    .split(',')
    .map(tag => tag.trim().replace(/[_-]+/g, ' '))
    .filter(tag => tag.length > 1 && tag.length < 24)
    .filter((tag, index, list) => list.findIndex(item => normalize(item) === normalize(tag)) === index)
    .slice(0, 3);

  const classify = text => {
    const normalized = normalize(text);
    return RULES
      .filter(([, pattern]) => pattern.test(normalized))
      .map(([id]) => id);
  };

  const locationLabel = station => {
    if (!station) return 'Rádio brasileira ao vivo';
    const city = String(station.city ?? '').trim();
    const region = String(station.state ?? '').trim();
    if (city && region && normalize(city) !== normalize(region)) return `${city} · ${region}`;
    return city || region || 'Brasil';
  };

  const initialsFor = name => {
    const words = String(name ?? '')
      .replace(/[^\p{L}\p{N} ]/gu, ' ')
      .split(/\s+/)
      .filter(word => word.length > 1 && !/^(radio|fm|am|de|da|do|the)$/i.test(word));
    const first = words[0]?.[0] ?? 'M';
    const second = words[1]?.[0] ?? 'F';
    return `${first}${second}`.toUpperCase();
  };

  const hueFor = value => {
    let hash = 0;
    for (let index = 0; index < value.length; index += 1) hash = (hash * 31 + value.charCodeAt(index)) % 360;
    return hash;
  };

  const makeStation = raw => {
    const stream = String(raw.stream ?? '').trim();
    const name = String(raw.name ?? '').replace(/\s+/g, ' ').trim();
    const tags = Array.isArray(raw.tags) ? splitTags(raw.tags.join(',')) : splitTags(raw.tags);
    const categories = Array.isArray(raw.categories) && raw.categories.length
      ? raw.categories
      : classify(`${name} ${tags.join(' ')}`);
    return {
      id: hashId(streamKey(stream) || name),
      key: streamKey(stream),
      name,
      stream,
      city: String(raw.city ?? '').trim(),
      state: String(raw.state ?? '').trim(),
      tags,
      categories: Array.from(new Set(categories)),
      logo: isHttps(raw.logo) ? String(raw.logo) : '',
      bitrate: Number(raw.bitrate) || 0
    };
  };

  const snapshot = station => ({
    id: station.id,
    name: station.name,
    stream: station.stream,
    city: station.city,
    state: station.state,
    tags: station.tags.slice(0, 3),
    categories: station.categories.slice(),
    logo: station.logo,
    bitrate: station.bitrate
  });

  const findStation = id => state.all.find(station => station.id === id)
    || state.recent.find(station => station.id === id)
    || state.favMeta[id]
    || null;

  const matchesCategory = station => {
    if (state.view === 'trending') return true;
    if (state.view === 'favorites') return state.favorites.has(station.id);
    return station.categories.includes(state.view);
  };

  const filteredStations = () => {
    let list = state.all.filter(matchesCategory);
    const query = normalize(state.query);
    if (query) {
      list = list.filter(station => normalize([
        station.name,
        station.city,
        station.state,
        station.tags.join(' '),
        station.categories.map(id => CATEGORY_LABELS[id] ?? '').join(' ')
      ].join(' ')).includes(query));
    }
    return list;
  };

  const tagMarkup = station => {
    const tags = station.tags.slice(0, 2)
      .map(tag => `<span class="card-tag">${escapeHtml(tag)}</span>`)
      .join('');
    return `<span class="card-tag is-live">Ao vivo</span>${tags}`;
  };

  const logoMarkup = station => `
    <div class="station-logo" style="--hue:${hueFor(station.id)}">
      <span>${escapeHtml(initialsFor(station.name))}</span>
      ${station.logo ? `<img src="${escapeHtml(station.logo)}" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer" data-logo>` : ''}
    </div>`;

  const cardMarkup = (station, index) => {
    const isFavorite = state.favorites.has(station.id);
    const bitrate = station.bitrate > 0 ? `${station.bitrate} kbps` : 'Ao vivo';
    return `
      <article class="station-card${state.current?.id === station.id ? ' is-current' : ''}" data-id="${escapeHtml(station.id)}" style="animation-delay:${Math.min(index, 12) * 22}ms">
        <button class="card-hit" type="button" data-play="${escapeHtml(station.id)}" aria-label="Ouvir ${escapeHtml(station.name)}"></button>
        <div class="card-top">
          ${logoMarkup(station)}
          <button class="station-fav${isFavorite ? ' is-active' : ''}" type="button" data-fav="${escapeHtml(station.id)}" aria-label="${isFavorite ? 'Remover' : 'Adicionar'} ${escapeHtml(station.name)} das favoritas" aria-pressed="${isFavorite}">
            <svg class="icon" aria-hidden="true"><use href="#i-heart"/></svg>
          </button>
        </div>
        <h3>${escapeHtml(station.name)}</h3>
        <p class="card-loc">
          <svg class="icon" aria-hidden="true"><use href="#i-radio"/></svg>
          <span>${escapeHtml(locationLabel(station))}</span>
        </p>
        <div class="card-tags">${tagMarkup(station)}</div>
        <div class="card-bottom">
          <span class="card-bitrate">${bitrate}</span>
          <span class="card-play">
            <svg class="icon" aria-hidden="true"><use href="#i-play"/></svg>
            <span class="card-play-label">Ouvir</span>
            <span class="mini-eq" aria-hidden="true"><span></span><span></span><span></span></span>
          </span>
        </div>
      </article>`;
  };

  const skeletonMarkup = () => `
    <article class="station-card skeleton" aria-hidden="true">
      <div class="card-top">
        <span class="sk sk-logo"></span>
        <span class="sk" style="width:34px;height:34px;border-radius:50%"></span>
      </div>
      <span class="sk sk-line"></span>
      <span class="sk sk-line short"></span>
      <span class="sk sk-line tiny"></span>
      <div class="card-bottom"><span class="sk sk-line tiny" style="width:52px"></span><span class="sk sk-line short" style="width:64px;height:26px;border-radius:999px"></span></div>
    </article>`;

  const attachLogoFallbacks = root => {
    $$('img[data-logo]', root).forEach(image => {
      const markBroken = () => image.classList.add('is-broken');
      image.addEventListener('error', markBroken, { once: true });
      if (image.complete && image.naturalWidth === 0) markBroken();
    });
  };

  const renderSkeletons = () => {
    grid.innerHTML = Array.from({ length: 9 }, skeletonMarkup).join('');
    resultsCount.textContent = 'Sintonizando estações...';
    loadMore.hidden = true;
  };

  const emptyMarkup = () => {
    const isFavorites = state.view === 'favorites' && !state.query;
    const isSearch = Boolean(state.query);
    return `
      <div class="empty-state">
        <svg class="icon" aria-hidden="true"><use href="#${isFavorites ? 'i-heart' : isSearch ? 'i-search' : 'i-radio'}"/></svg>
        <strong>${isFavorites ? 'Nenhuma favorita por aqui' : isSearch ? 'Nada encontrado' : 'Sem estações nesta categoria'}</strong>
        <p>${isFavorites ? 'Toque no coração de uma estação para guardar aqui.' : isSearch ? 'Tente outro nome, cidade ou estilo musical.' : 'Explore outra categoria enquanto o catálogo carrega.'}</p>
        <button class="btn btn-ghost" type="button" data-reset>${isSearch ? 'Limpar busca' : 'Ver todas as estações'}</button>
      </div>`;
  };

  const renderGrid = () => {
    const list = filteredStations();
    const visible = list.slice(0, state.limit);

    if (!list.length) {
      grid.innerHTML = emptyMarkup();
      resultsCount.textContent = '';
      loadMore.hidden = true;
      return;
    }

    grid.innerHTML = visible.map(cardMarkup).join('');
    attachLogoFallbacks(grid);

    if (state.query) {
      resultsCount.textContent = `${list.length} ${list.length === 1 ? 'resultado' : 'resultados'} para “${state.query}”`;
    } else if (state.view === 'favorites') {
      resultsCount.textContent = `${list.length} ${list.length === 1 ? 'estação favorita' : 'estações favoritas'}`;
    } else {
      resultsCount.textContent = `Mostrando ${visible.length} de ${list.length} estações`;
    }

    loadMore.hidden = list.length <= state.limit;
  };

  const updateCards = () => {
    $$('.station-card[data-id]', grid).forEach(card => {
      const isCurrent = Boolean(state.current && card.dataset.id === state.current.id);
      card.classList.toggle('is-current', isCurrent);
      const label = card.querySelector('.card-play-label');
      if (label) label.textContent = isCurrent && state.playing ? 'No ar' : 'Ouvir';
      const hit = card.querySelector('.card-hit');
      const name = card.querySelector('h3');
      if (hit && name) hit.setAttribute('aria-label', isCurrent ? `Estação atual: ${name.textContent}. Toque para pausar.` : `Ouvir ${name.textContent}`);
    });
    $$('.recent-item', recentList).forEach(item => {
      item.classList.toggle('is-current', Boolean(state.current && item.dataset.id === state.current.id));
    });
  };

  const updateChipState = () => {
    $$('.chip', chips).forEach(chip => {
      const active = chip.dataset.view === state.view;
      chip.classList.toggle('is-active', active);
      chip.setAttribute('aria-selected', String(active));
      chip.tabIndex = active ? 0 : -1;
    });
  };

  const updateChipCounts = () => {
    const counts = { trending: state.all.length, favorites: 0 };
    Object.keys(CATEGORY_LABELS).forEach(id => {
      if (id === 'trending' || id === 'favorites') return;
      counts[id] = state.all.filter(station => station.categories.includes(id)).length;
    });
    counts.favorites = state.all.filter(station => state.favorites.has(station.id)).length;
    $$('.chip', chips).forEach(chip => {
      const count = chip.querySelector('.chip-count');
      if (count) count.textContent = counts[chip.dataset.view] ?? 0;
    });
    $('#statStations').textContent = state.all.length ? `${state.all.length}+` : '300+';
  };

  const renderChips = () => {
    chips.innerHTML = CATEGORIES.map(category => `
      <button class="chip" type="button" role="tab" data-view="${category.id}" aria-selected="false" tabindex="-1">
        ${category.label}
        <span class="chip-count">0</span>
      </button>`).join('');
    updateChipCounts();
    updateChipState();
  };

  const updateFavoriteUi = () => {
    const isFavorite = Boolean(state.current && state.favorites.has(state.current.id));
    favBtn.classList.toggle('is-active', isFavorite);
    favBtn.setAttribute('aria-pressed', String(isFavorite));
    favBtn.setAttribute('aria-label', isFavorite ? 'Remover estação atual das favoritas' : 'Favoritar estação atual');
    miniFav.classList.toggle('is-active', isFavorite);
    miniFav.setAttribute('aria-pressed', String(isFavorite));
    $$('.station-fav', grid).forEach(button => {
      const active = state.favorites.has(button.dataset.fav);
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  };

  const setStatus = kind => {
    statusPill.classList.toggle('is-connecting', kind === 'connecting');
    statusPill.classList.toggle('is-loading', kind === 'error');
    if (kind === 'connecting') statusText.textContent = 'Conectando';
    else if (kind === 'error') statusText.textContent = 'Fora do ar';
    else statusText.textContent = 'Ao vivo';
  };

  const setPlaying = playing => {
    state.playing = playing;
    document.body.classList.toggle('is-playing', playing);
    playerCard.classList.toggle('is-playing', playing);
    playBtn.setAttribute('aria-label', playing ? 'Pausar' : 'Reproduzir');
    miniPlay.setAttribute('aria-label', playing ? 'Pausar' : 'Reproduzir');
    const heroLabel = heroPlay.querySelector('span');
    if (heroLabel) heroLabel.textContent = playing ? 'Pausar rádio' : 'Sintonizar agora';
    updateCards();
    if ('mediaSession' in navigator) {
      try { navigator.mediaSession.playbackState = playing ? 'playing' : 'paused'; } catch { /* noop */ }
    }
  };

  const setMiniLogo = station => {
    if (!station) return;
    miniInitials.textContent = initialsFor(station.name);
    if (station.logo) {
      miniArt.hidden = false;
      miniArt.src = station.logo;
      miniArt.alt = '';
      miniArt.onerror = () => {
        miniArt.hidden = true;
        miniArt.removeAttribute('src');
      };
    } else {
      miniArt.hidden = true;
      miniArt.removeAttribute('src');
    }
  };

  const updateMiniVisibility = () => {
    const show = Boolean(state.current) && !playerInView;
    miniPlayer.hidden = !show;
    document.body.classList.toggle('has-mini', show);
  };

  const updatePlayerUi = () => {
    const station = state.current;
    if (!station) return;
    playerName.textContent = station.name;
    playerMeta.textContent = [locationLabel(station), station.tags.slice(0, 2).join(' · ')].filter(Boolean).join(' — ');
    miniName.textContent = station.name;
    miniMeta.textContent = locationLabel(station);
    setMiniLogo(station);
    updateFavoriteUi();
    updateMiniVisibility();
  };

  const updateMediaSession = () => {
    if (!('mediaSession' in navigator) || !state.current) return;
    try {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: state.current.name,
        artist: 'Lidiol Mojo FM',
        album: locationLabel(state.current),
        artwork: [{
          src: state.current.logo || 'icons/icon-512.png',
          sizes: '512x512',
          type: state.current.logo ? 'image/jpeg' : 'image/png'
        }]
      });
    } catch {
      return;
    }
  };

  const pushRecent = station => {
    if (!station) return;
    if (lastRecentId === station.id && state.recent[0]?.id === station.id) return;
    lastRecentId = station.id;
    state.recent = [snapshot(station), ...state.recent.filter(item => item.id !== station.id)].slice(0, 10);
    storage.set('mojo:recent', state.recent);
    renderRecent();
  };

  const renderRecent = () => {
    if (!state.recent.length) {
      recentSection.hidden = true;
      recentList.innerHTML = '';
      return;
    }
    recentSection.hidden = false;
    recentList.innerHTML = state.recent.map(station => `
      <button class="recent-item" type="button" data-play="${escapeHtml(station.id)}" aria-label="Ouvir ${escapeHtml(station.name)} novamente">
        ${logoMarkup(station)}
        <span class="recent-info">
          <strong>${escapeHtml(station.name)}</strong>
          <span>${escapeHtml(locationLabel(station))}</span>
        </span>
      </button>`).join('');
    attachLogoFallbacks(recentList);
    updateCards();
  };

  const persistCurrent = () => {
    if (state.current) storage.set('mojo:last', state.current.id);
  };

  const clearWatchdog = () => {
    if (watchdog) {
      clearTimeout(watchdog);
      watchdog = 0;
    }
  };

  const startPlayback = station => {
    if (!station || !station.stream) return;
    state.current = station;
    updatePlayerUi();
    persistCurrent();

    if (loadedStream !== station.stream) {
      loadedStream = station.stream;
      audio.src = station.stream;
      audio.load();
    }

    setStatus('connecting');
    clearWatchdog();
    watchdog = window.setTimeout(() => {
      if (!state.playing) {
        audio.pause();
        setStatus('error');
        setPlaying(false);
        showToast(`A estação ${station.name} não respondeu. Tente outra.`, true);
      }
    }, WATCHDOG_MS);

    const promise = audio.play();
    if (promise && typeof promise.catch === 'function') {
      promise.catch(error => {
        if (error && error.name === 'AbortError') return;
        clearWatchdog();
        setStatus('error');
        setPlaying(false);
        showToast('Não foi possível sintonizar esta estação. Tente outra.', true);
      });
    }

    updateCards();
    updateMediaSession();
  };

  const togglePlayback = () => {
    if (!state.current) {
      const first = filteredStations()[0] || state.all[0];
      if (!first) return;
      startPlayback(first);
      return;
    }
    if (audio.paused) {
      startPlayback(state.current);
    } else {
      audio.pause();
    }
  };

  const playStation = station => {
    if (!station) return;
    if (state.current && state.current.id === station.id) {
      togglePlayback();
      return;
    }
    startPlayback(station);
  };

  const stepStation = direction => {
    const list = filteredStations();
    if (!list.length) return;
    const index = list.findIndex(station => state.current && station.id === state.current.id);
    const nextIndex = index < 0
      ? (direction > 0 ? 0 : list.length - 1)
      : (index + direction + list.length) % list.length;
    startPlayback(list[nextIndex]);
  };

  const toggleFavorite = station => {
    if (!station) return;
    const isFavorite = state.favorites.has(station.id);
    if (isFavorite) {
      state.favorites.delete(station.id);
      delete state.favMeta[station.id];
      showToast(`${station.name} saiu das favoritas.`);
    } else {
      state.favorites.add(station.id);
      state.favMeta[station.id] = snapshot(station);
      showToast(`${station.name} está nas suas favoritas.`);
    }
    storage.set('mojo:favs', Array.from(state.favorites));
    storage.set('mojo:favmeta', state.favMeta);
    updateFavoriteUi();
    updateChipCounts();
    updateCards();
    if (state.view === 'favorites') renderGrid();
  };

  const showToast = (message, isError = false) => {
    const toast = document.createElement('div');
    toast.className = `toast${isError ? ' is-error' : ''}`;
    toast.innerHTML = `<svg class="icon" aria-hidden="true"><use href="#${isError ? 'i-close' : 'i-check'}"/></svg><span></span>`;
    toast.querySelector('span').textContent = message;
    toastRegion.append(toast);
    while (toastRegion.children.length > 3) toastRegion.firstElementChild.remove();
    window.setTimeout(() => {
      toast.classList.add('is-out');
      window.setTimeout(() => toast.remove(), 280);
    }, 3800);
  };

  const updateVolumeUi = () => {
    const level = audio.muted ? 0 : audio.volume;
    volumeInput.value = String(level);
    volumeInput.style.setProperty('--fill', `${Math.round(level * 100)}%`);
    muteBtn.classList.toggle('is-muted', audio.muted || audio.volume === 0);
    muteBtn.setAttribute('aria-label', audio.muted ? 'Ativar som' : 'Silenciar');
  };

  const applyVolume = value => {
    const volume = Math.min(1, Math.max(0, Number(value)));
    audio.volume = volume;
    audio.muted = volume === 0;
    storage.set('mojo:volume', volume);
    updateVolumeUi();
  };

  const toggleMute = () => {
    if (audio.muted || audio.volume === 0) {
      audio.muted = false;
      if (audio.volume === 0) audio.volume = 0.8;
    } else {
      audio.muted = true;
    }
    updateVolumeUi();
  };

  const copyText = async text => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      try {
        const field = document.createElement('textarea');
        field.value = text;
        field.setAttribute('readonly', '');
        field.style.position = 'fixed';
        field.style.opacity = '0';
        document.body.append(field);
        field.select();
        const copied = document.execCommand('copy');
        field.remove();
        return copied;
      } catch {
        return false;
      }
    }
  };

  const shareCurrent = async () => {
    const station = state.current;
    const url = location.href.split('#')[0];
    const text = station ? `Estou ouvindo ${station.name} na Lidiol Mojo FM` : 'Ouça a Lidiol Mojo FM';
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Lidiol Mojo FM', text, url });
        return;
      } catch (error) {
        if (error && error.name === 'AbortError') return;
      }
    }
    const copied = await copyText(`${text} — ${url}`);
    showToast(copied ? 'Link copiado para compartilhar.' : 'Não foi possível copiar o link.', !copied);
  };

  const formatSleep = seconds => {
    const safe = Math.max(0, seconds);
    const minutes = Math.floor(safe / 60);
    const rest = safe % 60;
    return `${String(minutes).padStart(2, '0')}:${String(rest).padStart(2, '0')}`;
  };

  const updateSleepUi = () => {
    if (!state.sleepEndsAt) {
      sleepChip.hidden = true;
      $$('#sleepMenu [data-minutes]').forEach(button => button.classList.toggle('is-active', button.dataset.minutes === '0'));
      return;
    }
    const remaining = Math.round((state.sleepEndsAt - Date.now()) / 1000);
    if (remaining <= 0) {
      state.sleepEndsAt = 0;
      state.sleepMinutes = 0;
      audio.pause();
      setPlaying(false);
      updateSleepUi();
      showToast('Temporizador encerrado. Bom descanso!');
      return;
    }
    sleepChip.hidden = false;
    sleepChip.textContent = `Dormir em ${formatSleep(remaining)}`;
    $$('#sleepMenu [data-minutes]').forEach(button => button.classList.toggle('is-active', Number(button.dataset.minutes) === state.sleepMinutes));
  };

  const setSleepTimer = minutes => {
    state.sleepMinutes = Number(minutes) || 0;
    state.sleepEndsAt = state.sleepMinutes ? Date.now() + state.sleepMinutes * 60000 : 0;
    closeSleepMenu();
    updateSleepUi();
    if (state.sleepMinutes) showToast(`Temporizador: a rádio desliga em ${state.sleepMinutes} minutos.`);
    else showToast('Temporizador desligado.');
  };

  const closeSleepMenu = () => {
    sleepMenu.hidden = true;
    sleepBtn.setAttribute('aria-expanded', 'false');
  };

  const buildStations = apiRows => {
    const seen = new Set();
    const list = [];
    CURATED.concat(apiRows).forEach(raw => {
      const station = makeStation(raw);
      if (!station.name || !station.stream || !isHttps(station.stream)) return;
      if (seen.has(station.key)) return;
      seen.add(station.key);
      list.push(station);
    });
    [...state.recent, ...Object.values(state.favMeta)].forEach(item => {
      const station = makeStation(item);
      if (!station.id || seen.has(station.key)) return;
      if (!findById(list, station.id)) {
        seen.add(station.key);
        list.push(station);
      }
    });
    return list;
  };

  const findById = (list, id) => list.some(station => station.id === id);

  const fetchStations = async () => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 9000);
    try {
      const response = await fetch(API_URL, {
        signal: controller.signal,
        headers: { Accept: 'application/json' },
        cache: 'no-store'
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const rows = await response.json();
      if (!Array.isArray(rows)) throw new Error('Unexpected payload');
      return rows
        .filter(row => row && row.url_resolved && isHttps(row.url_resolved))
        .filter(row => !row.hls && !/\.m3u8(\?|$)/i.test(row.url_resolved))
        .filter(row => row.lastcheckok !== 0 && !row.ssl_error)
        .map(row => ({
          name: row.name,
          stream: row.url_resolved,
          city: '',
          state: row.state || '',
          tags: splitTags(row.tags),
          categories: classify(`${row.name} ${row.tags ?? ''}`),
          logo: row.favicon,
          bitrate: row.bitrate
        }));
    } finally {
      clearTimeout(timeout);
    }
  };

  const hydrateCurrent = () => {
    const savedId = storage.get('mojo:last', '');
    const saved = savedId ? findStation(savedId) : null;
    state.current = saved || state.all[0] || null;
    if (state.current) {
      updatePlayerUi();
      persistCurrent();
      const favorite = state.favorites.has(state.current.id);
      favBtn.classList.toggle('is-active', favorite);
      favBtn.setAttribute('aria-pressed', String(favorite));
    }
  };

  const loadStations = async () => {
    let apiRows = [];
    try {
      apiRows = await fetchStations();
      state.source = 'online';
    } catch {
      state.source = 'fallback';
    }
    state.all = buildStations(apiRows);
    state.source = apiRows.length ? 'online' : 'fallback';

    if (state.source === 'fallback') {
      $('#sectionSub').textContent = 'Catálogo online indisponível agora — mostrando nossa seleção fixa de estações.';
      showToast('Sem conexão com o catálogo online. Mostrando a seleção da casa.', true);
    }

    hydrateCurrent();
    renderChips();
    renderRecent();
    renderGrid();
  };

  const resetView = () => {
    state.view = 'trending';
    state.query = '';
    state.limit = PAGE_SIZE;
    searchInput.value = '';
    searchClear.hidden = true;
    storage.set('mojo:view', state.view);
    updateChipState();
    renderGrid();
  };

  const handleGridClick = event => {
    const favoriteButton = event.target.closest('[data-fav]');
    if (favoriteButton) {
      event.stopPropagation();
      const station = findStation(favoriteButton.dataset.fav);
      if (station) toggleFavorite(station);
      return;
    }
    const resetButton = event.target.closest('[data-reset]');
    if (resetButton) {
      resetView();
      return;
    }
    const playButton = event.target.closest('[data-play]');
    if (playButton) {
      const station = findStation(playButton.dataset.play);
      if (station) playStation(station);
    }
  };

  const handleRecentClick = event => {
    const button = event.target.closest('[data-play]');
    if (!button) return;
    const station = findStation(button.dataset.play);
    if (station) playStation(station);
  };

  const handleChipKeydown = event => {
    const keys = ['ArrowRight', 'ArrowLeft', 'Home', 'End'];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const buttons = $$('.chip', chips);
    const index = buttons.indexOf(document.activeElement);
    if (index < 0) return;
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % buttons.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + buttons.length) % buttons.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = buttons.length - 1;
    buttons[next].focus();
  };

  const bindEvents = () => {
    playBtn.addEventListener('click', togglePlayback);
    heroPlay.addEventListener('click', togglePlayback);
    miniPlay.addEventListener('click', togglePlayback);
    $('#prevBtn').addEventListener('click', () => stepStation(-1));
    $('#nextBtn').addEventListener('click', () => stepStation(1));
    favBtn.addEventListener('click', () => {
      if (state.current) toggleFavorite(state.current);
    });
    miniFav.addEventListener('click', () => {
      if (state.current) toggleFavorite(state.current);
    });
    $('#miniOpen').addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    $('#shareBtn').addEventListener('click', shareCurrent);
    muteBtn.addEventListener('click', toggleMute);

    volumeInput.addEventListener('input', () => applyVolume(volumeInput.value));

    sleepBtn.addEventListener('click', event => {
      event.stopPropagation();
      const willOpen = sleepMenu.hidden;
      sleepMenu.hidden = !willOpen;
      sleepBtn.setAttribute('aria-expanded', String(willOpen));
    });

    sleepMenu.addEventListener('click', event => {
      event.stopPropagation();
      const option = event.target.closest('[data-minutes]');
      if (option) setSleepTimer(option.dataset.minutes);
    });

    document.addEventListener('click', event => {
      if (!sleepMenu.hidden && !event.target.closest('#sleepMenu') && !event.target.closest('#sleepBtn')) closeSleepMenu();
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        closeSleepMenu();
        if (document.activeElement === searchInput) {
          searchInput.value = '';
          state.query = '';
          searchClear.hidden = true;
          renderGrid();
          searchInput.blur();
        }
      }
      if (event.key === '/' && !event.target.closest('input, textarea, select, [contenteditable]')) {
        event.preventDefault();
        searchInput.focus();
        return;
      }
      if (event.target.closest('input, textarea, select, button, a, [contenteditable]')) return;
      if (event.key === ' ' || event.key === 'Spacebar') {
        event.preventDefault();
        togglePlayback();
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        stepStation(1);
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        stepStation(-1);
      }
      if (event.key.toLowerCase() === 'm') toggleMute();
      if (event.key.toLowerCase() === 'f' && state.current) toggleFavorite(state.current);
    });

    grid.addEventListener('click', handleGridClick);
    recentList.addEventListener('click', handleRecentClick);

    chips.addEventListener('click', event => {
      const button = event.target.closest('[data-view]');
      if (!button) return;
      state.view = button.dataset.view;
      state.limit = PAGE_SIZE;
      storage.set('mojo:view', state.view);
      updateChipState();
      renderGrid();
    });
    chips.addEventListener('keydown', handleChipKeydown);

    searchInput.addEventListener('input', () => {
      searchClear.hidden = !searchInput.value;
      clearTimeout(searchTimer);
      searchTimer = window.setTimeout(() => {
        state.query = searchInput.value.trim();
        state.limit = PAGE_SIZE;
        renderGrid();
      }, 140);
    });

    searchClear.addEventListener('click', () => {
      searchInput.value = '';
      state.query = '';
      searchClear.hidden = true;
      renderGrid();
      searchInput.focus();
    });

    loadMore.addEventListener('click', () => {
      state.limit += PAGE_SIZE;
      renderGrid();
    });

    $('#clearRecent').addEventListener('click', () => {
      state.recent = [];
      lastRecentId = '';
      storage.set('mojo:recent', []);
      renderRecent();
      showToast('Histórico limpo.');
    });

    audio.addEventListener('playing', () => {
      clearWatchdog();
      setStatus('live');
      setPlaying(true);
      if (state.current) {
        pushRecent(state.current);
        updateMediaSession();
        persistCurrent();
      }
    });

    audio.addEventListener('pause', () => {
      if (!audio.ended) setPlaying(false);
    });

    audio.addEventListener('waiting', () => {
      if (state.playing) setStatus('connecting');
    });

    audio.addEventListener('error', () => {
      clearWatchdog();
      setStatus('error');
      setPlaying(false);
      const name = state.current ? state.current.name : 'esta estação';
      showToast(`Não foi possível sintonizar ${name}. Tente outra estação.`, true);
    });

    window.addEventListener('resize', updateMiniVisibility);

    window.addEventListener('beforeinstallprompt', event => {
      event.preventDefault();
      deferredPrompt = event;
      installBtn.hidden = false;
    });

    window.addEventListener('appinstalled', () => {
      installBtn.hidden = true;
      deferredPrompt = null;
      showToast('Lidiol Mojo FM instalada. Bom som!');
    });

    installBtn.addEventListener('click', async () => {
      if (!deferredPrompt) {
        showToast('Use o menu do navegador e escolha “Instalar app” ou “Adicionar à tela inicial”.');
        return;
      }
      deferredPrompt.prompt();
      try {
        await deferredPrompt.userChoice;
      } catch {
        return;
      }
      deferredPrompt = null;
      installBtn.hidden = true;
    });

    if ('mediaSession' in navigator) {
      const session = navigator.mediaSession;
      const safeSet = (action, handler) => {
        try { session.setActionHandler(action, handler); } catch { /* noop */ }
      };
      safeSet('play', () => {
        if (state.current && audio.paused) startPlayback(state.current);
      });
      safeSet('pause', () => audio.pause());
      safeSet('stop', () => audio.pause());
      safeSet('previoustrack', () => stepStation(-1));
      safeSet('nexttrack', () => stepStation(1));
    }
  };

  const startClock = () => {
    const clockText = $('#clockText');
    const formatter = new Intl.DateTimeFormat('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23'
    });
    const tick = () => { clockText.textContent = formatter.format(new Date()); };
    tick();
    window.setInterval(tick, 10000);
  };

  const init = () => {
    $('#year').textContent = String(new Date().getFullYear());
    const savedVolume = Number(storage.get('mojo:volume', 0.8));
    audio.volume = Number.isFinite(savedVolume) ? Math.min(1, Math.max(0, savedVolume)) : 0.8;
    audio.muted = false;
    updateVolumeUi();
    updateSleepUi();
    startClock();
    renderChips();
    renderSkeletons();
    bindEvents();
    window.setInterval(updateSleepUi, 1000);

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        playerInView = entries[0].isIntersecting;
        updateMiniVisibility();
      }, { threshold: 0.12 });
      observer.observe(playerCard);
    }

    if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').catch(() => { /* noop */ });
      });
    }

    loadStations();
  };

  init();
})();
