const DRIVE_ROOT = "https://drive.google.com/drive/folders/1eVzisDcXoQPeK8UN83jPQtZQnJP5jSco";
const STORAGE_KEY = "playbacks:favorites";

const GENRES = [
  { slug: "sertanejo", label: "Sertanejo" },
  { slug: "forro", label: "Forró" },
  { slug: "arrocha", label: "Arrocha" },
  { slug: "rock", label: "Rock & Pop" },
  { slug: "mpb", label: "MPB" },
  { slug: "axe", label: "Axé & Pagode" },
  { slug: "gospel", label: "Gospel" },
  { slug: "karaoke", label: "Karaokê" },
  { slug: "gaucha", label: "Gaúcha" },
  { slug: "brega", label: "Brega" }
];

const COLLECTIONS = [
  {
    id: "17aDJVaiJHnCpdb_cSZEiguDoip7NGoEb",
    title: "Atualizadas 2026/2025",
    kind: "Sertanejo · Arrocha · Brega",
    desc: "Os hits mais recentes para abrir o set com o público cantando junto.",
    tags: ["sertanejo", "arrocha", "brega"],
    badge: "Novo",
    accent: ["#ff6b35", "#ff2d55"]
  },
  {
    id: "1a8NyUCNbGFllR8sAwcO99lHnK8znCw5O",
    title: "Sertanejo & Forró — Lançamentos 2024",
    kind: "Sertanejo · Forró",
    desc: "Novidades e lançamentos que dominaram as pistas em 2024.",
    tags: ["sertanejo", "forro"],
    badge: "2024",
    accent: ["#ffb347", "#ff6b35"]
  },
  {
    id: "1yqG2D_lSmFsVvZxzSkbtnxMbSz3B5dMS",
    title: "Sertanejo & Forró",
    kind: "Sertanejo · Forró",
    desc: "Uma seleção ampla para montar sets que atravessam a noite.",
    tags: ["sertanejo", "forro"],
    badge: "Coleção",
    accent: ["#ff8a4c", "#ff2d55"]
  },
  {
    id: "1etxhjxKdT2KwjRetyK_DCNca0k3NeUWr",
    title: "Arrocha",
    kind: "Arrocha",
    desc: "O ritmo baiano que transforma qualquer evento em festa.",
    tags: ["arrocha"],
    badge: "Coleção",
    accent: ["#e63946", "#ff8fa3"]
  },
  {
    id: "1RNojQWxT-j9t_z-3XKQFfD36GbYNjAdU",
    title: "Forró Pé de Serra",
    kind: "Forró",
    desc: "Sanfona, zabumba e triângulo no melhor estilo tradicional.",
    tags: ["forro"],
    badge: "Raiz",
    accent: ["#ffb703", "#fb8500"]
  },
  {
    id: "1LJUnemhxvZOt0gRtLCYrMFgwLhMIVjMR",
    title: "Forró Brega",
    kind: "Forró · Brega",
    desc: "Romantismo, sofrência e aquele forró que todo mundo conhece.",
    tags: ["forro", "brega"],
    badge: "Coleção",
    accent: ["#ef476f", "#ffd166"]
  },
  {
    id: "1xDlw3aZtv0T3byT9B0VdvgaRkDHYsONI",
    title: "Forró das Antigas",
    kind: "Forró",
    desc: "Clássicos que marcaram gerações e nunca saem do repertório.",
    tags: ["forro"],
    badge: "Clássicos",
    accent: ["#ff7b00", "#d62828"]
  },
  {
    id: "19NNrkJ6_yJAHpKkvkLXaAYB3JRwrE3v4",
    title: "Forró Top Bandas",
    kind: "Forró",
    desc: "As bandas mais pedidas para comandar a festa do começo ao fim.",
    tags: ["forro"],
    badge: "Coleção",
    accent: ["#ff9e00", "#ff4d00"]
  },
  {
    id: "10Z8Dm_LvbXdV2HlzhhLdTMgQ-t4bdVDx",
    title: "Rock & Pop Nacional",
    kind: "Rock · Pop",
    desc: "Hinos brasileiros para animar plateias de todas as idades.",
    tags: ["rock"],
    badge: "Brasil",
    accent: ["#ff4d6d", "#7a2cff"]
  },
  {
    id: "1jyjW6UvsaxoFv6ngh5DiLZ3tDy-M9-t6",
    title: "Rock & Pop Internacional",
    kind: "Rock · Pop",
    desc: "Sucessos internacionais que atravessam décadas e gerações.",
    tags: ["rock"],
    badge: "Mundo",
    accent: ["#5aa9ff", "#7a5cff"]
  },
  {
    id: "1OaGhO9g2QkKsNMN3mJKzU0XMCQaFDxsS",
    title: "MPB e Outros Estilos",
    kind: "MPB · Variados",
    desc: "Brasilidade, sofisticação e um repertório cheio de nuances.",
    tags: ["mpb"],
    badge: "Coleção",
    accent: ["#33d6c3", "#2a7fff"]
  },
  {
    id: "1-7-QvtE21Rm-lF--iMy1xW5B5xLGiX2Q",
    title: "Axé",
    kind: "Axé",
    desc: "Energia contagiante para aquecer qualquer público.",
    tags: ["axe"],
    badge: "Coleção",
    accent: ["#ff4d8d", "#ffb347"]
  },
  {
    id: "1Ot973XFaZkTGiMnPu_QGaR0udcKBuTxZ",
    title: "Pagode e Axé",
    kind: "Pagode · Axé",
    desc: "Do samba de mesa ao axé de trio elétrico, sem perder o groove.",
    tags: ["axe"],
    badge: "Coleção",
    accent: ["#2ec4b6", "#ffb703"]
  },
  {
    id: "13IVfVjojc9Jyp2lKpvcESY4THvjT4zmq",
    title: "Gospel",
    kind: "Gospel",
    desc: "Louvor e adoração para momentos de celebração e comunhão.",
    tags: ["gospel"],
    badge: "Especial",
    accent: ["#9b7bff", "#33d6c3"]
  },
  {
    id: "1oZqN5u6p8LnHPkxCuKbqxbbP0fTXKutM",
    title: "Gaúchas e Marchinhas",
    kind: "Gaúcha · Marchinha",
    desc: "Tradição gaúcha e o melhor do carnaval de rua brasileiro.",
    tags: ["gaucha"],
    badge: "Tradição",
    accent: ["#8ac926", "#ffca3a"]
  },
  {
    id: "1u4D0m1dnhl8Hl0vtRGwL19nTEIORKa27",
    title: "Sertanejo & Forró — 2020 a 2022",
    kind: "Sertanejo · Forró",
    desc: "Os sucessos que marcaram a virada da década nas festas.",
    tags: ["sertanejo", "forro"],
    badge: "2020–2022",
    accent: ["#ff9f43", "#e84393"]
  },
  {
    id: "1Ixol71Tx0GJA-WsGOt-c9qECWfptDOvl",
    title: "Sertanejo & Forró — até 2020",
    kind: "Sertanejo · Forró",
    desc: "Um mergulho nos clássicos que construíram o gênero.",
    tags: ["sertanejo", "forro"],
    badge: "Clássicos",
    accent: ["#ff8a4c", "#ff4d8d"]
  },
  {
    id: "17XUgVI2VqickvYZgs1CTbOIIFZCr53zc",
    title: "Sertanejo & Forró — Especiais",
    kind: "Sertanejo · Forró",
    desc: "Seleções especiais para casamentos, aniversários e eventos.",
    tags: ["sertanejo", "forro"],
    badge: "Especial",
    accent: ["#2ec4b6", "#1b998b"]
  },
  {
    id: "1ZMRdMMz6bL8B-xOW9SHng6eLE4RgS9Vh",
    title: "Pop Internacional, Rock & MPB",
    kind: "Pop · Rock · MPB",
    desc: "Uma ponte entre clássicos internacionais e a música brasileira.",
    tags: ["rock", "mpb"],
    badge: "Coleção",
    accent: ["#5aa9ff", "#33d6c3"]
  },
  {
    id: "1clH1RqDACMpq1Ozm7tvKwGhlMjUS0hww",
    title: "Bônus + Karaokê",
    kind: "Karaokê · Extras",
    desc: "Faixas bônus e versões de karaokê para soltar a voz.",
    tags: ["karaoke"],
    badge: "Extra",
    accent: ["#ffd166", "#ff8c42"]
  },
  {
    id: "1N7thGYtUzuYWfZC3DTlDGEfnmQpLoF_f",
    title: "Sertanejo & Forró — UP",
    kind: "Sertanejo · Forró",
    desc: "Mais uma camada de sucessos para deixar o repertório completo.",
    tags: ["sertanejo", "forro"],
    badge: "Coleção",
    accent: ["#ff8a4c", "#ff2d55"]
  }
];

const FEATURED_GENRES = [
  { slug: "sertanejo", label: "Sertanejo", note: "Do clássico ao lançamento", accent: "#ff6b35" },
  { slug: "forro", label: "Forró", note: "Pé de serra, brega e bandas", accent: "#ffb703" },
  { slug: "rock", label: "Rock & Pop", note: "Nacional e internacional", accent: "#7a5cff" },
  { slug: "gospel", label: "Gospel", note: "Louvor e adoração", accent: "#33d6c3" }
];

const WAVE = [28, 52, 40, 76, 58, 88, 44, 68, 34, 82, 50, 64, 38, 72, 56, 86, 42, 66];

const grid = document.querySelector("#collection-grid");
const chips = document.querySelector("#chips");
const search = document.querySelector("#search");
const resultCount = document.querySelector("#result-count");
const empty = document.querySelector("#empty");
const genreGrid = document.querySelector("#genre-grid");

let activeFilter = "all";
let query = "";
let favorites = readFavorites();

function readFavorites() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return new Set(Array.isArray(value) ? value : []);
  } catch {
    return new Set();
  }
}

function writeFavorites() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...favorites]));
  } catch {
    return;
  }
}

function normalize(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function countByGenre(slug) {
  return COLLECTIONS.filter((collection) => collection.tags.includes(slug)).length;
}

function chipLabel(label, slug) {
  const count = slug === "all" ? COLLECTIONS.length : countByGenre(slug);
  return `${label}<span>${count}</span>`;
}

function renderChips() {
  const all = [{ slug: "all", label: "Todos" }, ...GENRES.map((genre) => ({ slug: genre.slug, label: genre.label }))];
  const favorite = { slug: "__favorites", label: "Favoritos", icon: true };
  const items = [...all, favorite].map((item) => {
    const active = activeFilter === item.slug;
    const count = item.slug === "__favorites" ? favorites.size : null;
    const label = item.slug === "__favorites" ? `${item.label}<span id="fav-count">${count}</span>` : chipLabel(item.label, item.slug);
    return `<button class="chip${active ? " is-active" : ""}" type="button" data-filter="${item.slug}" aria-pressed="${active}">${item.icon ? '<svg class="icon" aria-hidden="true"><use href="#i-star"/></svg>' : ""}${label}</button>`;
  });
  chips.innerHTML = items.join("");
}

function visibleCollections() {
  const needle = normalize(query.trim());
  return COLLECTIONS.filter((collection) => {
    if (activeFilter === "__favorites" && !favorites.has(collection.id)) return false;
    if (activeFilter !== "all" && activeFilter !== "__favorites" && !collection.tags.includes(activeFilter)) return false;
    if (!needle) return true;
    const haystack = normalize([collection.title, collection.kind, collection.desc, collection.badge].join(" "));
    return haystack.includes(needle);
  });
}

function cardTemplate(collection, index) {
  const wave = WAVE.map((height, offset) => {
    const value = WAVE[(offset + index * 3) % WAVE.length];
    return `<i style="height:${Math.max(20, Math.round(((value + height) / 2)))}%"></i>`;
  }).join("");
  const favorite = favorites.has(collection.id);
  return `
    <article class="card" role="listitem" data-id="${collection.id}" style="--a:${collection.accent[0]};--b:${collection.accent[1]}">
      <a class="card-link" href="https://drive.google.com/drive/folders/${collection.id}" target="_blank" rel="noopener" aria-label="Abrir a coleção ${collection.title} no Google Drive">
        <div class="card-art">
          <span class="card-index">${String(index + 1).padStart(2, "0")}</span>
          <span class="card-badge">${collection.badge}</span>
          <span class="card-wave" aria-hidden="true">${wave}</span>
        </div>
        <div class="card-body">
          <p class="card-kind">${collection.kind}</p>
          <h3>${collection.title}</h3>
          <p class="card-desc">${collection.desc}</p>
          <span class="card-cta">Abrir coleção <svg class="icon" aria-hidden="true"><use href="#i-arrow"/></svg></span>
        </div>
      </a>
      <button class="favorite" type="button" data-favorite="${collection.id}" aria-pressed="${favorite}" aria-label="${favorite ? "Remover" : "Adicionar"} ${collection.title} dos favoritos" title="${favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}">
        <svg class="icon" aria-hidden="true"><use href="#i-star"/></svg>
      </button>
    </article>`;
}

function renderCollections() {
  const list = visibleCollections();
  grid.innerHTML = list.map((collection) => cardTemplate(collection, COLLECTIONS.indexOf(collection))).join("");
  grid.dataset.ready = "true";
  const total = list.length;
  resultCount.textContent = `${total} ${total === 1 ? "coleção" : "coleções"}`;
  empty.hidden = total !== 0;
  renderChips();
}

function renderGenres() {
  genreGrid.innerHTML = FEATURED_GENRES.map((genre) => {
    const count = countByGenre(genre.slug);
    return `
      <button class="genre-card" type="button" data-genre="${genre.slug}" style="--a:${genre.accent}">
        <span>${count} ${count === 1 ? "coleção" : "coleções"}</span>
        <strong>${genre.label}</strong>
        <small>${genre.note}</small>
      </button>`;
  }).join("");
}

function setFilter(filter) {
  activeFilter = filter;
  renderCollections();
}

function updateStats() {
  document.querySelector('[data-stat="collections"]').textContent = COLLECTIONS.length;
  document.querySelector('[data-stat="genres"]').textContent = GENRES.length;
}

function buildEqualizer() {
  const bars = document.querySelector(".equalizer");
  if (!bars) return;
  bars.innerHTML = Array.from({ length: 24 }, (_, index) => {
    const height = 24 + ((index * 37) % 76);
    const delay = ((index * 13) % 90) / 100;
    return `<i style="height:${height}%;animation-delay:-${delay}s"></i>`;
  }).join("");
}

chips.addEventListener("click", (event) => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;
  setFilter(button.dataset.filter);
});

grid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-favorite]");
  if (!button) return;
  const id = button.dataset.favorite;
  if (favorites.has(id)) favorites.delete(id);
  else favorites.add(id);
  writeFavorites();
  const collection = COLLECTIONS.find((item) => item.id === id);
  const pressed = favorites.has(id);
  button.setAttribute("aria-pressed", String(pressed));
  button.setAttribute("aria-label", `${pressed ? "Remover" : "Adicionar"} ${collection.title} dos favoritos`);
  button.title = pressed ? "Remover dos favoritos" : "Adicionar aos favoritos";
  if (activeFilter === "__favorites") renderCollections();
  else renderChips();
});

genreGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-genre]");
  if (!button) return;
  setFilter(button.dataset.genre);
  document.querySelector("#acervo").scrollIntoView({ behavior: "smooth", block: "start" });
});

search.addEventListener("input", () => {
  query = search.value;
  renderCollections();
});

document.addEventListener("keydown", (event) => {
  const target = event.target;
  const typing = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement;
  if (event.key === "/" && !typing) {
    event.preventDefault();
    search.focus();
  }
  if (event.key === "Escape" && target === search) {
    search.value = "";
    query = "";
    search.blur();
    renderCollections();
  }
});

document.querySelector("#reset-filters").addEventListener("click", () => {
  search.value = "";
  query = "";
  activeFilter = "all";
  renderCollections();
});

document.querySelector("#shuffle").addEventListener("click", () => {
  const pool = visibleCollections();
  const source = pool.length ? pool : COLLECTIONS;
  const pick = source[Math.floor(Math.random() * source.length)];
  window.open(`https://drive.google.com/drive/folders/${pick.id}`, "_blank", "noopener");
});

updateStats();
buildEqualizer();
renderGenres();
renderCollections();
