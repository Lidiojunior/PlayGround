'use strict';

/* ============================================================
   LicdekBank — app logic
   ============================================================ */

/* ---------- Icons ---------- */
const ICONS = {
  home: '<path d="m3 10.5 9-7.5 9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9.5 21v-6h5v6"/>',
  pix: '<path d="m12 2.5 3.8 3.8a1 1 0 0 1 0 1.4L12 11.5 8.2 7.7a1 1 0 0 1 0-1.4L12 2.5Z"/><path d="m12 12.5 3.8 3.8a1 1 0 0 1 0 1.4L12 21.5l-3.8-3.8a1 1 0 0 1 0-1.4l3.8-3.8Z"/><path d="m2.5 12 3.8-3.8a1 1 0 0 1 1.4 0l3.8 3.8-3.8 3.8a1 1 0 0 1-1.4 0L2.5 12Z"/><path d="m12.5 12 3.8-3.8a1 1 0 0 1 1.4 0l3.8 3.8-3.8 3.8a1 1 0 0 1-1.4 0l-3.8-3.8Z"/>',
  card: '<rect x="2.5" y="5" width="19" height="14" rx="3"/><path d="M2.5 10h19"/><path d="M6 15h3"/>',
  trend: '<path d="m3 17 6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
  receipt: '<rect x="4" y="3" width="16" height="18" rx="2.5"/><path d="M8 8h8M8 12h8M8 16h4"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M10.3 21a2 2 0 0 0 3.4 0"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
  'eye-off': '<path d="m3 3 18 18"/><path d="M10.6 5.2A10.9 10.9 0 0 1 12 5c6.5 0 10 7 10 7a17.6 17.6 0 0 1-3.4 4.3"/><path d="M6.3 6.3C3.5 8.2 2 12 2 12s3.5 7 10 7a11 11 0 0 0 4.3-.9"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/>',
  lock: '<rect x="4.5" y="10.5" width="15" height="10.5" rx="2.5"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/>',
  shield: '<path d="M12 3 5 6v5.5c0 4.4 3 8.1 7 9.5 4-1.4 7-5.1 7-9.5V6l-7-3Z"/><path d="m9 12 2 2 4-4"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  'chevron-right': '<path d="m9 18 6-6-6-6"/>',
  'chevron-left': '<path d="m15 18-6-6 6-6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  'arrow-up-right': '<path d="M7 17 17 7"/><path d="M8 7h9v9"/>',
  'arrow-down-left': '<path d="M17 7 7 17"/><path d="M16 17H7V8"/>',
  send: '<path d="m22 2-7 20-4-9-9-4 20-7Z"/><path d="M22 2 11 13"/>',
  wallet: '<path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H19v3"/><rect x="3" y="7.5" width="18" height="12" rx="3"/><circle cx="16.5" cy="13.5" r="1.2"/>',
  cart: '<circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2.5 3H5l2.3 11.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 2-1.6L21 7H6"/>',
  play: '<rect x="3" y="3" width="18" height="18" rx="4"/><path d="m10 8 6 4-6 4V8Z"/>',
  car: '<path d="m5 16 2-6h10l2 6"/><path d="M4 16h16v3M4 16v3"/><circle cx="8" cy="16" r="1.5"/><circle cx="16" cy="16" r="1.5"/>',
  coffee: '<path d="M4 8h13v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8Z"/><path d="M17 9h2a2.5 2.5 0 0 1 0 5h-2"/><path d="M7 4v1M11 3v2M15 4v1"/>',
  heart: '<path d="M12 20s-7.5-4.6-9.3-9.2A5 5 0 0 1 12 6.2a5 5 0 0 1 9.3 4.6C19.5 15.4 12 20 12 20Z"/>',
  film: '<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M8 4v16M16 4v16M3 9h5M3 15h5M16 9h5M16 15h5"/>',
  phone: '<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/>',
  barcode: '<path d="M4 6v12M8 6v12M11 6v8M14 6v12M17 6v8M20 6v12"/>',
  copy: '<rect x="9" y="9" width="11" height="11" rx="2.5"/><path d="M15 5.5A2.5 2.5 0 0 0 12.5 3h-7A2.5 2.5 0 0 0 3 5.5v7A2.5 2.5 0 0 0 5.5 15"/>',
  check: '<path d="m5 13 4 4L19 7"/>',
  'check-circle': '<circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/>',
  snowflake: '<path d="M12 2v20M4.5 6.5l15 11M19.5 6.5l-15 11"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 0 1 4.8 1c0 1.7-2.3 2-2.3 3.5"/><path d="M12 17h.01"/>',
  headset: '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="2.5" y="13" width="4" height="7" rx="2"/><rect x="17.5" y="13" width="4" height="7" rx="2"/><path d="M20 20a3 3 0 0 1-3 3h-3"/>',
  sparkles: '<path d="m12 3 1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8L12 3Z"/><path d="M18.5 15.5 19.3 17.7 21.5 18.5l-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2Z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="16" rx="2.5"/><path d="M8 3v4M16 3v4M3.5 10h17"/>',
  download: '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M4 21h16"/>',
  bank: '<path d="m3 9 9-5 9 5"/><path d="M5 10v7M9.5 10v7M14.5 10v7M19 10v7"/><path d="M3 20h18"/>',
  repeat: '<path d="m17 2 4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>',
  contactless: '<path d="M6 8a8 8 0 0 1 0 8M10 5.5a12 12 0 0 1 0 13M14 3a16 16 0 0 1 0 18"/>',
  qr: '<rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="3" width="6" height="6" rx="1"/><rect x="3" y="15" width="6" height="6" rx="1"/><path d="M15 15h2v2h-2zM19 15h2v2M15 19v2h2M19 19h2v2"/>',
  edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  file: '<path d="M14 2.5H6.5A2 2 0 0 0 4.5 4.5v15a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V8L14 2.5Z"/><path d="M14 2.5V8h5.5"/>',
  dot: '<circle cx="12" cy="12" r="3"/>'
};

function ic(name, cls = '') {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="${cls}" aria-hidden="true">${ICONS[name] || ICONS.dot}</svg>`;
}

function injectIcons(root = document) {
  root.querySelectorAll('[data-icon]').forEach(el => {
    if (el.dataset.iconDone) return;
    el.insertAdjacentHTML('afterbegin', ic(el.dataset.icon));
    el.dataset.iconDone = '1';
  });
}

/* ---------- Storage & seed ---------- */
const STORAGE_KEY = 'licdekbank:state:v1';
const AUTH_KEY = 'licdekbank:auth';
const round2 = n => Math.round(n * 100) / 100;
const uid = () => 'id-' + Math.random().toString(36).slice(2, 10);

function iso(daysAgo, h, m) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  d.setHours(h, m, 0, 0);
  return d.toISOString();
}

function seedState() {
  return {
    user: {
      name: 'Lidio Junior',
      firstName: 'Lidio',
      email: 'lidio@licdek.com',
      cpf: '•••.482.910-••',
      agency: '0001',
      account: '48291-7',
      memberSince: '2023'
    },
    balance: 12480.52,
    card: {
      name: 'LIDIO J. JUNIOR',
      full: '5412 8890 4471 2039',
      last4: '2039',
      expiry: '08/30',
      cvv: '482',
      frozen: false,
      contactless: true,
      online: true,
      limit: 5000,
      used: 1240
    },
    investments: [
      { id: 'inv-1', name: 'CDB Liquidez Diária', amount: 2200, rate: '102% CDI', risk: 'Baixo risco' },
      { id: 'inv-2', name: 'Tesouro Selic 2029', amount: 1000, rate: '11,2% a.a.', risk: 'Baixo risco' }
    ],
    transactions: [
      { id: 'tx-1', type: 'in', title: 'Salário', subtitle: 'Licdek Tecnologia', amount: 6850, category: 'salario', method: 'Transferência', date: iso(0, 8, 12) },
      { id: 'tx-2', type: 'out', title: 'Mercado Pão de Açúcar', subtitle: 'Compra no cartão', amount: 187.42, category: 'mercado', method: 'Cartão', date: iso(0, 11, 40) },
      { id: 'tx-3', type: 'out', title: 'Netflix', subtitle: 'Assinatura mensal', amount: 39.90, category: 'assinatura', method: 'Cartão', date: iso(1, 20, 15) },
      { id: 'tx-4', type: 'in', title: 'Pix recebido', subtitle: 'Ana Souza', amount: 320, category: 'pix', method: 'Pix', date: iso(1, 16, 2) },
      { id: 'tx-5', type: 'out', title: 'Pix enviado', subtitle: 'João Lima', amount: 150, category: 'pix', method: 'Pix', date: iso(1, 12, 30) },
      { id: 'tx-6', type: 'out', title: 'Uber', subtitle: 'Transporte', amount: 24.90, category: 'transporte', method: 'Cartão', date: iso(2, 19, 22) },
      { id: 'tx-7', type: 'out', title: 'iFood', subtitle: 'Alimentação', amount: 78.90, category: 'alimentacao', method: 'Cartão', date: iso(2, 12, 50) },
      { id: 'tx-8', type: 'out', title: 'Drogasil', subtitle: 'Farmácia', amount: 62.30, category: 'saude', method: 'Cartão', date: iso(3, 10, 5) },
      { id: 'tx-9', type: 'out', title: 'Cinemark', subtitle: 'Cinema e lazer', amount: 64, category: 'lazer', method: 'Cartão', date: iso(4, 21, 0) },
      { id: 'tx-10', type: 'in', title: 'Rendimento', subtitle: 'CDB Liquidez Diária', amount: 38.12, category: 'rendimento', method: 'Investimento', date: iso(5, 9, 0) },
      { id: 'tx-11', type: 'out', title: 'Conta de luz', subtitle: 'Enel Energia', amount: 142.80, category: 'moradia', method: 'Boleto', date: iso(6, 10, 20) },
      { id: 'tx-12', type: 'out', title: 'Padaria Bella', subtitle: 'Café da manhã', amount: 18.50, category: 'alimentacao', method: 'Cartão', date: iso(6, 8, 35) },
      { id: 'tx-13', type: 'in', title: 'Pix recebido', subtitle: 'Carlos Mendes', amount: 85, category: 'pix', method: 'Pix', date: iso(8, 15, 47) }
    ],
    contacts: [
      { name: 'Ana Souza', key: 'ana.souza@email.com', initials: 'AS', color: '#146b4f' },
      { name: 'João Lima', key: '+55 11 98812-4021', initials: 'JL', color: '#2f6fa8' },
      { name: 'Marina Alves', key: 'marina.alves@email.com', initials: 'MA', color: '#9a6412' },
      { name: 'Carlos Mendes', key: '1198456-2233', initials: 'CM', color: '#6d3cb0' },
      { name: 'Studio Nove', key: 'studio9@email.com', initials: 'S9', color: '#b13c3c' }
    ],
    pixKeys: [
      { type: 'E-mail', value: 'lidio@licdek.com', icon: 'file' },
      { type: 'Celular', value: '+55 11 9••••-4021', icon: 'phone' },
      { type: 'CPF', value: '•••.482.910-••', icon: 'user' },
      { type: 'Aleatória', value: '7f4c-a91b-2e8d-4c05', icon: 'sparkles' }
    ],
    bills: [
      { id: 'bill-1', name: 'Energia · Enel', due: 'Vence em 5 dias', amount: 142.80, icon: 'barcode', paid: false },
      { id: 'bill-2', name: 'Internet · Vivo Fibra', due: 'Vence em 9 dias', amount: 99.90, icon: 'barcode', paid: false },
      { id: 'bill-3', name: 'Água · Sabesp', due: 'Vence em 12 dias', amount: 78.40, icon: 'barcode', paid: false },
      { id: 'bill-4', name: 'Streaming · Spotify', due: 'Vence em 15 dias', amount: 21.90, icon: 'play', paid: false }
    ],
    notifications: [
      { id: 'n-1', icon: 'pix', title: 'Pix recebido', text: 'Ana Souza enviou R$ 320,00 para sua conta.', time: iso(1, 16, 2), unread: true, route: 'extrato' },
      { id: 'n-2', icon: 'card', title: 'Sua fatura fechou', text: 'Fatura de outubro: R$ 1.240,00 · vence em 05/11.', time: iso(0, 9, 15), unread: true, route: 'cartao' },
      { id: 'n-3', icon: 'trend', title: 'Rendimento creditado', text: '+ R$ 38,12 em CDB Liquidez Diária.', time: iso(5, 9, 0), unread: false, route: 'investir' },
      { id: 'n-4', icon: 'shield', title: 'Novo acesso detectado', text: 'Acesso realizado no iPhone 15 às 09:12.', time: iso(2, 9, 12), unread: false, route: 'perfil' }
    ],
    settings: {
      theme: 'light',
      hideBalance: false,
      notifications: true,
      biometric: true,
      pixNight: true,
      statementEmail: false
    }
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seedState();
    const parsed = JSON.parse(raw);
    const base = seedState();
    return {
      ...base,
      ...parsed,
      card: { ...base.card, ...(parsed.card || {}) },
      settings: { ...base.settings, ...(parsed.settings || {}) },
      user: { ...base.user, ...(parsed.user || {}) }
    };
  } catch {
    return seedState();
  }
}

let state = loadState();
let route = 'inicio';
const ui = {
  pixTab: 'enviar',
  statementFilter: 'todos',
  statementQuery: '',
  cardRevealed: false,
  selectedContact: null
};

function save() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* ignore */ }
}

/* ---------- Formatting ---------- */
const BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const MONTHS = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
const WEEKDAYS = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];

function money(n) { return BRL.format(Number(n) || 0); }
function displayMoney(n) { return state.settings.hideBalance ? 'R$ ••••••' : money(n); }
function esc(str) {
  return String(str == null ? '' : str).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function parseAmount(value) {
  if (typeof value === 'number') return value;
  const clean = String(value || '').replace(/[^\d,.-]/g, '').replace(/\.(?=\d{3}(\D|$))/g, '').replace(',', '.');
  const n = parseFloat(clean);
  return Number.isFinite(n) ? n : 0;
}
function pad(n) { return String(n).padStart(2, '0'); }
function timeShort(isoStr) { const d = new Date(isoStr); return `${pad(d.getHours())}:${pad(d.getMinutes())}`; }
function dayShort(isoStr) { const d = new Date(isoStr); return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}`; }
function fullDate(isoStr) {
  const d = new Date(isoStr);
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} às ${timeShort(isoStr)}`;
}
function dayKey(isoStr) { return new Date(isoStr).toDateString(); }
function relativeDay(isoStr) {
  const d = new Date(isoStr);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const diff = Math.round((today - target) / 86400000);
  if (diff === 0) return 'Hoje';
  if (diff === 1) return 'Ontem';
  return `${d.getDate()} de ${MONTHS[d.getMonth()]}`;
}
function relativeTime(isoStr) {
  const diff = Date.now() - new Date(isoStr).getTime();
  const min = Math.round(diff / 60000);
  if (min < 1) return 'agora';
  if (min < 60) return `há ${min} min`;
  const hours = Math.round(min / 60);
  if (hours < 24) return `há ${hours} h`;
  const days = Math.round(hours / 24);
  if (days === 1) return 'ontem';
  return `há ${days} dias`;
}
function todayLong() {
  const d = new Date();
  const label = new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }).format(d);
  return label.charAt(0).toUpperCase() + label.slice(1);
}
function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Bom dia';
  if (h < 18) return 'Boa tarde';
  return 'Boa noite';
}
function sameMonth(isoStr) {
  const a = new Date(isoStr);
  const b = new Date();
  return a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
}
function withinDays(isoStr, days) {
  return Date.now() - new Date(isoStr).getTime() <= days * 86400000;
}

/* ---------- Categories ---------- */
const CATEGORIES = {
  salario: { label: 'Salário', icon: 'wallet', color: '#146b4f' },
  mercado: { label: 'Mercado', icon: 'cart', color: '#2f7d5c' },
  assinatura: { label: 'Assinaturas', icon: 'play', color: '#7c6bd6' },
  pix: { label: 'Pix', icon: 'pix', color: '#1d8a66' },
  transporte: { label: 'Transporte', icon: 'car', color: '#2f80c9' },
  alimentacao: { label: 'Alimentação', icon: 'coffee', color: '#d98b2b' },
  saude: { label: 'Saúde', icon: 'heart', color: '#d65252' },
  lazer: { label: 'Lazer', icon: 'film', color: '#c06ac0' },
  rendimento: { label: 'Rendimento', icon: 'trend', color: '#0f8a60' },
  moradia: { label: 'Moradia', icon: 'home', color: '#5a7d6b' },
  investimento: { label: 'Investimentos', icon: 'trend', color: '#146b4f' },
  transferencia: { label: 'Transferência', icon: 'send', color: '#2f80c9' },
  recarga: { label: 'Recarga', icon: 'phone', color: '#d98b2b' },
  contas: { label: 'Contas', icon: 'barcode', color: '#8b6b3f' },
  outros: { label: 'Outros', icon: 'receipt', color: '#8b9a91' }
};
const catOf = t => CATEGORIES[t.category] || CATEGORIES.outros;

/* ---------- Model helpers ---------- */
function addTransaction({ type, title, subtitle, amount, category, method }) {
  const tx = {
    id: uid(),
    type,
    title,
    subtitle: subtitle || '',
    amount: round2(amount),
    category: category || 'outros',
    method: method || 'Pix',
    date: new Date().toISOString()
  };
  state.transactions.unshift(tx);
  return tx;
}

function spend({ title, subtitle, amount, category, method }) {
  amount = round2(amount);
  if (amount > state.balance) { toast('Saldo insuficiente para esta operação.'); return null; }
  state.balance = round2(state.balance - amount);
  const tx = addTransaction({ type: 'out', title, subtitle, amount, category, method });
  save();
  return tx;
}

function earn({ title, subtitle, amount, category, method }) {
  amount = round2(amount);
  state.balance = round2(state.balance + amount);
  const tx = addTransaction({ type: 'in', title, subtitle, amount, category, method });
  save();
  return tx;
}

function investedTotal() {
  return round2(state.investments.reduce((sum, i) => sum + Number(i.amount), 0));
}
function estimatedYield() {
  return round2(investedTotal() * 0.0119);
}

function spendingBreakdown() {
  const totals = {};
  state.transactions
    .filter(t => t.type === 'out' && withinDays(t.date, 30) && t.category !== 'investimento')
    .forEach(t => { totals[t.category] = (totals[t.category] || 0) + t.amount; });
  const entries = Object.entries(totals)
    .map(([key, value]) => ({ key, value, ...(CATEGORIES[key] || CATEGORIES.outros) }))
    .sort((a, b) => b.value - a.value);
  if (!entries.length) return { entries: [], total: 0 };
  const total = entries.reduce((s, e) => s + e.value, 0);
  let remaining = total;
  const top = entries.slice(0, 4);
  const othersValue = entries.slice(4).reduce((s, e) => s + e.value, 0);
  const grouped = top.map(e => ({ ...e }));
  if (othersValue > 0) grouped.push({ key: 'outros', label: 'Outros', value: othersValue, color: '#c3cec5', icon: 'receipt' });
  return { entries: grouped, total };
}

function donutGradient(entries, total) {
  if (!total) return 'var(--surface-2)';
  let cursor = 0;
  const stops = entries.map(e => {
    const start = cursor;
    cursor += (e.value / total) * 100;
    return `${e.color} ${start.toFixed(2)}% ${cursor.toFixed(2)}%`;
  });
  return `conic-gradient(${stops.join(', ')})`;
}

/* ---------- Auth & shell ---------- */
const elLogin = document.getElementById('login');
const elApp = document.getElementById('app');

function initialsOf(name) {
  return String(name || '').trim().split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase() || 'LJ';
}

function applyTheme() {
  document.documentElement.setAttribute('data-theme', state.settings.theme === 'dark' ? 'dark' : 'light');
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', state.settings.theme === 'dark' ? '#08130e' : '#0A3B2C');
}

function showLogin() {
  elApp.hidden = true;
  elLogin.hidden = false;
  injectIcons(elLogin);
  history.replaceState(null, '', location.pathname + location.search);
  setTimeout(() => document.getElementById('login-user')?.focus({ preventScroll: true }), 80);
}

function enterApp() {
  localStorage.setItem(AUTH_KEY, '1');
  elLogin.hidden = true;
  elApp.hidden = false;
  if (!location.hash) {
    route = 'inicio';
    history.replaceState(null, '', '#inicio');
  } else {
    route = parseHash();
  }
  render();
  window.scrollTo(0, 0);
}

function logout() {
  localStorage.setItem(AUTH_KEY, '0');
  closeModal();
  closeNotifications();
  showLogin();
  toast('Você saiu da sua conta com segurança.');
}

const PAGE_META = {
  inicio: ['Início', todayLong()],
  pix: ['Área Pix', 'Envie e receba na hora, todos os dias'],
  pagar: ['Pagar', 'Boletos, contas e recargas em um só lugar'],
  cartao: ['Cartão', 'Controle total do seu cartão'],
  investir: ['Investimentos', 'Seu dinheiro rendendo mais'],
  extrato: ['Extrato', 'Todas as movimentações da conta'],
  transferir: ['Transferir', 'Envie para qualquer banco'],
  perfil: ['Perfil', 'Sua conta e preferências']
};

function parseHash() {
  const raw = (location.hash || '').replace(/^#\/?/, '').trim();
  return PAGE_META[raw] ? raw : 'inicio';
}

function go(next) {
  if (!PAGE_META[next]) next = 'inicio';
  closeNotifications();
  if (location.hash.replace(/^#\/?/, '') === next) {
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    location.hash = next;
  }
}

function render() {
  const meta = PAGE_META[route] || PAGE_META.inicio;
  const initials = initialsOf(state.user.name);
  const sideName = document.querySelector('.side-user-txt strong');
  if (sideName) sideName.textContent = state.user.name;
  document.querySelectorAll('.side-user .avatar, .topbar .avatar').forEach(el => { el.textContent = initials; });
  document.getElementById('page-title').textContent = meta[0];
  document.getElementById('page-sub').textContent = meta[1];
  document.querySelectorAll('.nav-item, .bn-item').forEach(el => {
    el.classList.toggle('active', el.dataset.route === route);
  });
  const view = document.getElementById('view');
  const html = routes[route] ? routes[route]() : routes.inicio();
  view.innerHTML = html;
  injectIcons(view);
  updateNotifDot();
}

function updateNotifDot() {
  const unread = state.notifications.filter(n => n.unread).length;
  const dot = document.getElementById('notif-dot');
  if (dot) dot.style.display = unread ? '' : 'none';
}

/* ---------- Shared cards ---------- */
function bankCard({ reveal = false, frozen = state.card.frozen } = {}) {
  const number = reveal ? state.card.full : `•••• •••• •••• ${state.card.last4}`;
  return `<div class="bank-card">
    <div class="bc-top">
      <div class="bc-brand">licdek<span>bank</span></div>
      <span class="bc-type">${frozen ? 'Cartão congelado' : 'Débito · Visa'}</span>
    </div>
    <div class="bc-mid">
      <span class="bc-chip" aria-hidden="true"></span>
      <span class="bc-contactless" aria-hidden="true">${ic('contactless')}</span>
    </div>
    <div class="bc-number">${number}</div>
    <div class="bc-bottom">
      <div class="bc-name">Titular<b>${state.card.name}</b></div>
      <div class="bc-flag">VISA</div>
    </div>
    ${frozen ? `<div class="bc-frozen"><div>${ic('snowflake')} Cartão congelado</div></div>` : ''}
  </div>`;
}

function txRow(t, showDate = true) {
  const cat = catOf(t);
  const sign = t.type === 'in' ? '+' : '−';
  return `<button class="tx-row" data-action="open-tx" data-id="${t.id}" type="button">
    <span class="tx-ic ${t.type === 'in' ? 'in' : ''}">${ic(t.type === 'in' ? 'arrow-down-left' : cat.icon)}</span>
    <span class="tx-main"><strong>${esc(t.title)}</strong><span>${esc(t.subtitle)}</span></span>
    <span class="tx-amount">
      <strong class="${t.type === 'in' ? 'amount-in' : ''}">${sign} ${money(t.amount)}</strong>
      <span>${showDate ? dayShort(t.date) : timeShort(t.date)}</span>
    </span>
  </button>`;
}

function emptyState(icon, title, text) {
  return `<div class="empty"><span class="empty-ic">${ic(icon)}</span><strong>${esc(title)}</strong><p>${esc(text)}</p></div>`;
}

/* ---------- Views ---------- */
const routes = {};

routes.inicio = function () {
  const income = state.transactions.filter(t => t.type === 'in' && sameMonth(t.date)).reduce((s, t) => s + t.amount, 0);
  const outcome = state.transactions.filter(t => t.type === 'out' && sameMonth(t.date)).reduce((s, t) => s + t.amount, 0);
  const spending = spendingBreakdown();
  const recent = state.transactions.slice(0, 5);
  const quick = [
    { route: 'pix', icon: 'pix', label: 'Área Pix', sub: 'Enviar e receber' },
    { route: 'transferir', icon: 'send', label: 'Transferir', sub: 'Outros bancos' },
    { route: 'pagar', icon: 'barcode', label: 'Pagar', sub: 'Boletos e contas' },
    { route: 'cartao', icon: 'card', label: 'Meu cartão', sub: 'Limite e bloqueio' },
    { action: 'topup', icon: 'phone', label: 'Recarga', sub: 'Celular na hora' },
    { route: 'investir', icon: 'trend', label: 'Investir', sub: 'Rende todo dia' }
  ];
  const quickHTML = quick.map(q => `<button class="quick" ${q.route ? `data-route="${q.route}"` : `data-action="${q.action}"`} type="button">
    <span class="quick-ic">${ic(q.icon)}</span>
    <span class="quick-txt"><strong>${q.label}</strong><span class="quick-sub">${q.sub}</span></span>
  </button>`).join('');

  const legend = spending.entries.map(e => `<div class="legend-row">
    <span class="legend-dot" style="background:${e.color}"></span>
    <span>${esc(e.label)}</span><b>${money(e.value)}</b>
  </div>`).join('');

  return `<div class="dash">
    <section class="hero-balance">
      <div class="hero-left">
        <div class="hero-label">Saldo disponível
          <button data-action="toggle-balance" aria-label="${state.settings.hideBalance ? 'Mostrar saldo' : 'Ocultar saldo'}">${ic(state.settings.hideBalance ? 'eye-off' : 'eye')}</button>
        </div>
        <div class="hero-value">${displayMoney(state.balance)}</div>
        <div class="hero-meta">
          <div>${ic('arrow-down-left')} Entradas <b class="up">${money(income)}</b></div>
          <div>${ic('arrow-up-right')} Saídas <b>${money(outcome)}</b></div>
          <div>${ic('bank')} Ag. ${state.user.agency} · Conta ${state.user.account}</div>
        </div>
      </div>
      <div class="hero-actions">
        <button class="btn btn-lime" data-route="pix">${ic('pix')} Fazer Pix</button>
        <button class="btn btn-glass" data-route="transferir">${ic('send')} Transferir</button>
      </div>
      <span class="hero-chip">licdekbank · conta digital</span>
    </section>

    <div class="quick-grid">${quickHTML}</div>

    <div class="dash-columns">
      <div class="dash-col">
        <section class="card pad">
          <div class="section-head">
            <div><h2>Gastos do mês</h2><p>Últimos 30 dias</p></div>
            <span class="pill">${money(spending.total)}</span>
          </div>
          <div class="chart-row">
            <div class="donut-wrap">
              <div class="donut" style="background:${donutGradient(spending.entries, spending.total)}"></div>
              <div class="donut-center"><span>Total</span><strong>${money(spending.total)}</strong></div>
            </div>
            <div class="legend">${legend || '<p class="muted tiny">Nenhum gasto no período.</p>'}</div>
          </div>
        </section>

        <section class="card pad">
          <div class="section-head">
            <div><h2>Últimas transações</h2><p>${greeting()}, ${state.user.firstName}. Tudo em ordem por aqui.</p></div>
            <button class="linklike" data-route="extrato">Ver extrato ${ic('chevron-right')}</button>
          </div>
          <div class="tx-list">${recent.map(t => txRow(t)).join('')}</div>
        </section>
      </div>

      <div class="dash-col">
        <section class="card pad">
          <div class="section-head">
            <div><h2>Seu cartão</h2><p>Visa débito · final ${state.card.last4}</p></div>
            <span class="pill ${state.card.frozen ? '' : 'green'}">${state.card.frozen ? 'Congelado' : 'Ativo'}</span>
          </div>
          <div class="mini-card-wrap">
            ${bankCard()}
            <div class="mini-card-actions">
              <button class="btn btn-soft" data-route="cartao">${ic('eye')} Ver</button>
              <button class="btn btn-soft" data-action="freeze-card">${ic('snowflake')} ${state.card.frozen ? 'Ativar' : 'Congelar'}</button>
              <button class="btn btn-soft" data-route="cartao">${ic('settings')} Limite</button>
            </div>
          </div>
        </section>

        <section class="invest-teaser">
          <span class="tiny">Seu dinheiro rendendo</span>
          <strong>${money(investedTotal())}</strong>
          <p>+${money(estimatedYield())} este mês · CDB de 102% do CDI, com resgate no mesmo dia.</p>
          <button data-route="investir">Investir agora ${ic('chevron-right')}</button>
        </section>
      </div>
    </div>
  </div>`;
};

routes.pix = function () {
  const tab = ui.pixTab;
  const usedToday = state.transactions
    .filter(t => t.type === 'out' && t.category === 'pix' && relativeDay(t.date) === 'Hoje')
    .reduce((s, t) => s + t.amount, 0);
  const dailyLimit = 5000;
  const emailKey = state.pixKeys.find(k => k.type === 'E-mail')?.value || 'lidio@licdek.com';

  const tabs = `<div class="tabs" role="tablist">
    <button class="tab ${tab === 'enviar' ? 'active' : ''}" data-action="pix-tab" data-tab="enviar">${ic('send')} Enviar</button>
    <button class="tab ${tab === 'receber' ? 'active' : ''}" data-action="pix-tab" data-tab="receber">${ic('qr')} Receber</button>
    <button class="tab ${tab === 'chaves' ? 'active' : ''}" data-action="pix-tab" data-tab="chaves">${ic('lock')} Minhas chaves</button>
  </div>`;

  let content = '';
  if (tab === 'enviar') {
    const contacts = state.contacts.map(c => `<button type="button" class="contact ${ui.selectedContact === c.key ? 'selected' : ''}" data-action="select-contact" data-key="${esc(c.key)}" data-name="${esc(c.name)}">
      <span class="contact-av" style="background:${c.color}">${esc(c.initials)}</span>
      <span>${esc(c.name.split(' ')[0])}</span>
    </button>`).join('');
    content = `<form id="pix-form" class="form-grid" novalidate>
      <div>
        <span class="field-label">Contatos frequentes</span>
        <div class="contacts-row">${contacts}</div>
      </div>
      <label class="field">
        <span class="field-label">Chave Pix</span>
        <span class="field-box"><span class="field-ic">${ic('pix')}</span><input id="pix-key" name="key" type="text" placeholder="CPF, e-mail, celular ou chave aleatória" autocomplete="off" required /></span>
      </label>
      <label class="field">
        <span class="field-label">Valor</span>
        <span class="money-input"><span>R$</span><input id="pix-amount" name="amount" inputmode="decimal" placeholder="0,00" autocomplete="off" required /></span>
      </label>
      <div class="chips">
        <button type="button" class="chip" data-action="pix-quick" data-value="50">R$ 50</button>
        <button type="button" class="chip" data-action="pix-quick" data-value="100">R$ 100</button>
        <button type="button" class="chip" data-action="pix-quick" data-value="200">R$ 200</button>
        <button type="button" class="chip" data-action="pix-quick" data-value="500">R$ 500</button>
      </div>
      <label class="field">
        <span class="field-label">Descrição <span class="muted">(opcional)</span></span>
        <span class="field-box"><input id="pix-desc" name="desc" type="text" maxlength="60" placeholder="Ex.: aluguel, presente, serviço" autocomplete="off" /></span>
      </label>
      <div class="form-actions">
        <span class="hint-text">${ic('shield')} Saldo disponível: ${money(state.balance)}</span>
        <button class="btn btn-primary" type="submit">Continuar ${ic('chevron-right')}</button>
      </div>
    </form>`;
  } else if (tab === 'receber') {
    content = `<div class="pix-receive">
      <div>
        <div class="qr-frame"><div class="qr">${qrCells(emailKey)}</div></div>
        <p class="tiny muted" style="text-align:center;margin-top:10px">Escaneie para pagar</p>
      </div>
      <div>
        <h3 style="font-size:17px;letter-spacing:-.4px">Receba via Pix</h3>
        <p class="muted" style="font-size:12.5px;margin-top:5px">Compartilhe sua chave ou QR Code e receba na hora, sem tarifa.</p>
        <div class="key-box"><code>${esc(emailKey)}</code>
          <button class="icon-btn" style="width:34px;height:34px;border-radius:9px" data-action="copy" data-copy="${esc(emailKey)}" data-label="Chave Pix" aria-label="Copiar chave">${ic('copy')}</button>
        </div>
        <div class="chips" style="margin-top:14px">
          <button class="btn btn-primary btn-sm" data-action="copy" data-copy="${esc(emailKey)}" data-label="Chave Pix">${ic('copy')} Copiar chave Pix</button>
          <button class="btn btn-ghost btn-sm" data-action="share-pix">${ic('send')} Compartilhar</button>
        </div>
        <div class="summary-list" style="margin-top:18px">
          <div class="summary-row"><span>Titular</span><strong>${esc(state.user.name)}</strong></div>
          <div class="summary-row"><span>Tipo de chave</span><strong>E-mail</strong></div>
          <div class="summary-row"><span>Instituição</span><strong>LicdekBank</strong></div>
        </div>
      </div>
    </div>`;
  } else {
    content = `<div class="section-head">
      <div><h3>Chaves cadastradas</h3><p>Use qualquer uma delas para receber.</p></div>
      <button class="btn btn-primary btn-sm" data-action="add-key">${ic('plus')} Nova chave</button>
    </div>
    <div class="keys-list">${state.pixKeys.map(k => `<div class="key-row">
      <span class="tx-ic">${ic(k.icon)}</span>
      <span class="key-row-main"><strong>${esc(k.type)}</strong><span>${esc(k.value)}</span></span>
      <button class="icon-btn" style="width:34px;height:34px;border-radius:9px" data-action="copy" data-copy="${esc(k.value)}" data-label="${esc(k.type)}" aria-label="Copiar">${ic('copy')}</button>
    </div>`).join('')}</div>`;
  }

  return `<div class="page-stack">
    <div class="page-intro">
      <div>
        <h2>${greeting()}, ${state.user.firstName}. Pix do seu jeito.</h2>
        <p>Envie, receba e gerencie suas chaves em segundos. Disponível 24 horas por dia, todos os dias.</p>
      </div>
      <span class="pill lime">${ic('shield')} Ambiente protegido</span>
    </div>

    <div class="two-col">
      <section class="panel">
        <div class="panel-head">${tabs}<span class="pill green">Grátis</span></div>
        <div class="panel-body">${content}</div>
      </section>

      <div class="page-stack">
        <section class="card pad">
          <div class="section-head"><h3>Seus limites</h3><span class="pill">Pix</span></div>
          <div class="control-row">
            <div><strong>Limite diário</strong><span>${money(dailyLimit)} por dia</span></div>
            <span class="pill green">Ativo</span>
          </div>
          <div class="limit-bar"><i style="width:${Math.min(100, (usedToday / dailyLimit) * 100)}%"></i></div>
          <div class="limit-nums"><span>Usado hoje <b>${money(usedToday)}</b></span><span>Disponível <b>${money(Math.max(0, dailyLimit - usedToday))}</b></span></div>
          <div class="panel-sep" style="margin:16px 0"></div>
          <div class="control-row">
            <div><strong>Pix noturno</strong><span>Permitir transferências após 22h</span></div>
            <button class="switch ${state.settings.pixNight ? 'on' : ''}" data-action="toggle-setting" data-setting="pixNight" role="switch" aria-checked="${state.settings.pixNight}" aria-label="Pix noturno"></button>
          </div>
        </section>

        <section class="card pad" style="background:var(--brand);border-color:transparent;color:#fff">
          <div style="display:flex;gap:10px;align-items:center;color:var(--accent);margin-bottom:8px">${ic('shield')} <strong style="font-size:12px;letter-spacing:.3px">Dica de segurança</strong></div>
          <p style="font-size:12.5px;color:rgba(255,255,255,.76);line-height:1.55">Confira sempre o destinatário antes de confirmar. O Pix é instantâneo e não pode ser cancelado depois de enviado.</p>
          <button class="linklike" data-action="help" style="color:var(--accent);margin-top:10px;font-size:12px">Falar com o suporte ${ic('chevron-right')}</button>
        </section>
      </div>
    </div>
  </div>`;
};

routes.transferir = function () {
  return `<div class="page-stack">
    <div class="page-intro">
      <div><h2>Transferência entre bancos</h2><p>Envie dinheiro para qualquer instituição com segurança, gratuitamente.</p></div>
      <span class="pill lime">${ic('shield')} TED · mesma hora</span>
    </div>
    <div class="two-col">
      <section class="panel">
        <div class="panel-head"><div><h3>Dados da transferência</h3><p>Preencha os dados de quem vai receber.</p></div><span class="pill">Gratuita</span></div>
        <div class="panel-body">
          <form id="transfer-form" class="form-grid" novalidate>
            <div class="form-grid two">
              <label class="field"><span class="field-label">Nome completo</span><input class="input" id="tr-name" type="text" placeholder="Quem vai receber?" required /></label>
              <label class="field"><span class="field-label">CPF ou CNPJ</span><input class="input" id="tr-doc" type="text" placeholder="000.000.000-00" inputmode="numeric" required /></label>
            </div>
            <div class="form-grid three">
              <label class="field"><span class="field-label">Instituição</span>
                <select class="select" id="tr-bank">
                  <option>LicdekBank</option><option>Banco do Brasil</option><option>Itaú Unibanco</option><option>Bradesco</option>
                  <option>Caixa Econômica</option><option>Nubank</option><option>Santander</option><option>Banco Inter</option><option>C6 Bank</option>
                </select>
              </label>
              <label class="field"><span class="field-label">Agência</span><input class="input" id="tr-agency" type="text" placeholder="0001" inputmode="numeric" required /></label>
              <label class="field"><span class="field-label">Conta</span><input class="input" id="tr-account" type="text" placeholder="00000-0" required /></label>
            </div>
            <label class="field"><span class="field-label">Valor</span><span class="money-input"><span>R$</span><input id="tr-amount" inputmode="decimal" placeholder="0,00" required /></span></label>
            <label class="field"><span class="field-label">Descrição <span class="muted">(opcional)</span></span><input class="input" id="tr-desc" type="text" maxlength="60" placeholder="Ex.: pagamento de serviço" /></label>
            <div class="form-actions">
              <span class="hint-text">${ic('shield')} Saldo disponível: ${money(state.balance)}</span>
              <button class="btn btn-primary" type="submit">Continuar ${ic('chevron-right')}</button>
            </div>
          </form>
        </div>
      </section>

      <div class="page-stack">
        <section class="card pad">
          <div class="section-head"><h3>Transferências recentes</h3></div>
          <div class="tx-list">${state.transactions.filter(t => t.category === 'transferencia').slice(0, 4).map(t => txRow(t)).join('') || emptyState('send', 'Nenhuma transferência ainda', 'Suas transferências aparecerão aqui.')}</div>
        </section>
        <section class="card pad" style="background:var(--surface-2)">
          <div style="display:flex;gap:8px;align-items:center;margin-bottom:8px">${ic('info')} <strong style="font-size:12.5px">Bom saber</strong></div>
          <ul style="display:grid;gap:8px;font-size:12px;color:var(--muted)">
            <li>• Transferências até R$ 5.000 são gratuitas.</li>
            <li>• TED processada em até 30 minutos no horário bancário.</li>
            <li>• Você recebe o comprovante por aqui e por e-mail.</li>
          </ul>
        </section>
      </div>
    </div>
  </div>`;
};

routes.pagar = function () {
  const bills = state.bills.map(b => `<div class="tx-row" style="cursor:default">
    <span class="tx-ic">${ic(b.icon)}</span>
    <span class="tx-main"><strong>${esc(b.name)}</strong><span>${esc(b.due)}</span></span>
    <span class="tx-amount"><strong>${money(b.amount)}</strong><span>${b.paid ? 'Pago' : 'Em aberto'}</span></span>
    <button class="btn ${b.paid ? 'btn-soft' : 'btn-primary'} btn-sm" style="margin-left:12px" data-action="pay-bill" data-id="${b.id}" ${b.paid ? 'disabled' : ''}>${b.paid ? 'Pago' : 'Pagar'}</button>
  </div>`).join('');

  const shortcuts = [
    { icon: 'barcode', label: 'Boleto', sub: 'Linha digitável', action: 'boletos' },
    { icon: 'qr', label: 'Pix copia e cola', sub: 'Código Pix', action: 'pix-copy' },
    { icon: 'phone', label: 'Recarga', sub: 'Créditos de celular', action: 'topup' },
    { icon: 'receipt', label: 'Contas', sub: 'Convênios', action: 'bills' }
  ];
  const shortcutHTML = shortcuts.map(s => `<button class="quick" data-action="${s.action}" type="button">
    <span class="quick-ic">${ic(s.icon)}</span>
    <span class="quick-txt"><strong>${s.label}</strong><span class="quick-sub">${s.sub}</span></span>
  </button>`).join('');

  return `<div class="page-stack">
    <div class="page-intro">
      <div><h2>Pague tudo por aqui</h2><p>Boletos, contas de consumo e recargas com poucos toques — sem filas.</p></div>
      <span class="pill lime">${ic('check-circle')} Sem tarifa</span>
    </div>

    <div class="pay-grid">${shortcutHTML}</div>

    <div class="two-col">
      <div class="page-stack">
        <section class="panel">
          <div class="panel-head"><div><h3>Contas a vencer</h3><p>Outubro · 4 contas encontradas</p></div><span class="pill">${state.bills.filter(b => !b.paid).length} em aberto</span></div>
          <div class="panel-body" style="padding-top:8px">${bills}</div>
        </section>

        <section class="card pad">
          <div class="section-head"><div><h3>Pagar boleto</h3><p>Digite ou cole a linha digitável.</p></div><span class="pill">${ic('barcode')}</span></div>
          <form id="boleto-form" class="form-grid" novalidate>
            <label class="field"><span class="field-label">Código de barras</span>
              <span class="field-box"><span class="field-ic">${ic('barcode')}</span>
                <input id="boleto-code" type="text" placeholder="00000.00000 00000.000000 00000.000000 0 00000000000000" inputmode="numeric" required />
                <button type="button" class="field-eye" data-action="fill-boleto" title="Usar código de exemplo">${ic('sparkles')}</button>
              </span>
            </label>
            <div class="form-grid two">
              <label class="field"><span class="field-label">Valor</span><span class="money-input"><span>R$</span><input id="boleto-amount" inputmode="decimal" placeholder="0,00" required /></span></label>
              <label class="field"><span class="field-label">Vencimento</span><input class="input" type="text" id="boleto-due" placeholder="dd/mm/aaaa" inputmode="numeric" /></label>
            </div>
            <div class="form-actions"><span class="hint-text">${ic('lock')} Pagamento protegido</span><button class="btn btn-primary" type="submit">Continuar</button></div>
          </form>
        </section>
      </div>

      <div class="page-stack">
        <section class="card pad" style="background:var(--brand);border-color:transparent;color:#fff">
          <div style="display:flex;gap:10px;align-items:center;margin-bottom:10px">${ic('qr')} <strong style="font-size:13px">Pix copia e cola</strong></div>
          <p style="font-size:12px;color:rgba(255,255,255,.68);line-height:1.5">Cole um código Pix para pagar contas, lojas ou transferir na hora.</p>
          <button class="btn btn-lime btn-sm" data-action="pix-copy" style="margin-top:14px">Colar código Pix</button>
        </section>
        <section class="card pad">
          <div class="section-head"><h3>Recarga de celular</h3></div>
          <p class="muted" style="font-size:12px">Créditos na hora para as principais operadoras do Brasil.</p>
          <button class="btn btn-soft btn-full" data-action="topup" style="margin-top:14px">${ic('phone')} Fazer recarga</button>
        </section>
        <section class="card pad" style="background:var(--surface-2)">
          <div style="display:flex;gap:8px;align-items:center;margin-bottom:6px">${ic('info')} <strong style="font-size:12.5px">Pagamento seguro</strong></div>
          <p class="tiny muted" style="line-height:1.55">Todos os pagamentos são criptografados. Você acompanha cada etapa pelo comprovante no extrato.</p>
        </section>
      </div>
    </div>
  </div>`;
};

routes.cartao = function () {
  const available = Math.max(0, state.card.limit - state.card.used);
  const cardTxs = state.transactions.filter(t => t.method === 'Cartão' && t.type === 'out').slice(0, 5);

  return `<div class="page-stack">
    <div class="page-intro">
      <div><h2>Seu cartão, do seu jeito</h2><p>Desbloqueie, ajuste o limite e crie cartões virtuais em segundos.</p></div>
      <div class="chips">
        <button class="btn btn-soft" data-action="reveal-card">${ic(ui.cardRevealed ? 'eye-off' : 'eye')} ${ui.cardRevealed ? 'Ocultar dados' : 'Ver dados'}</button>
        <button class="btn btn-primary" data-action="new-virtual">${ic('plus')} Cartão virtual</button>
      </div>
    </div>

    <div class="two-col">
      <section class="panel pad" style="display:grid;gap:18px;justify-items:center">
        <div class="virtual-card">${bankCard({ reveal: ui.cardRevealed })}</div>
        <div class="card-details" style="width:100%;max-width:430px">
          <div class="detail-box"><span>Número</span><strong>${ui.cardRevealed ? state.card.full : `•••• •••• •••• ${state.card.last4}`}</strong></div>
          <div class="detail-box"><span>Validade</span><strong>${state.card.expiry}</strong></div>
          <div class="detail-box"><span>CVV</span><strong>${ui.cardRevealed ? state.card.cvv : '•••'}</strong></div>
          <div class="detail-box"><span>Titular</span><strong style="font-size:11px">${state.card.name}</strong></div>
        </div>
        <div class="chips" style="justify-content:center">
          <button class="btn btn-soft btn-sm" data-action="copy" data-copy="${state.card.full}" data-label="Número do cartão">${ic('copy')} Copiar número</button>
          <button class="btn btn-soft btn-sm" data-action="freeze-card">${ic('snowflake')} ${state.card.frozen ? 'Descongelar' : 'Congelar'}</button>
        </div>
      </section>

      <div class="page-stack">
        <section class="card pad">
          <div class="section-head"><h3>Controles</h3><span class="pill ${state.card.frozen ? '' : 'green'}">${state.card.frozen ? 'Congelado' : 'Ativo'}</span></div>
          <div class="card-controls">
            <div class="control-row">
              <div><strong>Bloquear cartão</strong><span>Pause compras sem cancelar</span></div>
              <button class="switch ${state.card.frozen ? 'on' : ''}" data-action="freeze-card" role="switch" aria-checked="${state.card.frozen}" aria-label="Bloquear cartão"></button>
            </div>
            <div class="control-row">
              <div><strong>Pagamento por aproximação</strong><span>Contactless ativado</span></div>
              <button class="switch ${state.card.contactless ? 'on' : ''}" data-action="toggle-card" data-field="contactless" role="switch" aria-checked="${state.card.contactless}" aria-label="Pagamento por aproximação"></button>
            </div>
            <div class="control-row">
              <div><strong>Compras online</strong><span>Proteção extra nas lojas</span></div>
              <button class="switch ${state.card.online ? 'on' : ''}" data-action="toggle-card" data-field="online" role="switch" aria-checked="${state.card.online}" aria-label="Compras online"></button>
            </div>
            <div class="panel-sep"></div>
            <div>
              <div class="control-row" style="margin-bottom:2px"><div><strong>Limite do cartão</strong><span>Disponível: ${money(available)}</span></div><b style="font-size:13px">${money(state.card.limit)}</b></div>
              <input class="range" type="range" id="limit-range" min="${state.card.used}" max="12000" step="100" value="${state.card.limit}" aria-label="Ajustar limite" />
              <div class="limit-nums"><span>Em uso <b>${money(state.card.used)}</b></span><span>Total <b id="limit-value">${money(state.card.limit)}</b></span></div>
            </div>
          </div>
        </section>

        <section class="card pad">
          <div class="section-head"><h3>Fatura atual</h3><span class="pill">${money(state.card.used)}</span></div>
          <div class="limit-bar"><i style="width:${Math.min(100, (state.card.used / state.card.limit) * 100)}%"></i></div>
          <div class="limit-nums"><span>Vence em 05/11</span><span>Limite ${money(state.card.limit)}</span></div>
          <button class="btn btn-soft btn-full" style="margin-top:14px" data-action="pay-invoice" ${state.card.used <= 0 ? 'disabled' : ''}>${ic('barcode')} Pagar fatura</button>
        </section>
      </div>
    </div>

    <section class="card pad">
      <div class="section-head"><div><h2>Últimas compras</h2><p>Movimentações recentes no cartão</p></div><button class="linklike" data-route="extrato">Ver extrato ${ic('chevron-right')}</button></div>
      <div class="tx-list">${cardTxs.length ? cardTxs.map(t => txRow(t)).join('') : emptyState('card', 'Nenhuma compra recente', 'Quando você usar o cartão, as compras aparecem aqui.')}</div>
    </section>
  </div>`;
};

routes.investir = function () {
  const total = investedTotal();
  const products = [
    { id: 'cdb', name: 'CDB Liquidez Diária', rate: '102%', sub: 'do CDI', risk: 'Baixo risco', icon: 'trend', desc: 'Rende todo dia e você resgata quando quiser, a partir de R$ 100.' },
    { id: 'tesouro', name: 'Tesouro Selic 2029', rate: '11,2%', sub: 'ao ano', risk: 'Baixo risco', icon: 'bank', desc: 'Título público do governo federal, ideal para reserva de emergência.' },
    { id: 'lci', name: 'LCI Licdek', rate: '96%', sub: 'do CDI', risk: 'Isento de IR', icon: 'home', desc: 'Crédito imobiliário com isenção de imposto de renda.' }
  ];
  const productHTML = products.map(p => `<div class="product">
    <div class="product-top"><span class="product-ic">${ic(p.icon)}</span><span class="pill">${esc(p.risk)}</span></div>
    <h4>${esc(p.name)}</h4>
    <div class="rate">${esc(p.rate)} <small>${esc(p.sub)}</small></div>
    <p>${esc(p.desc)}</p>
    <button class="btn btn-soft" data-action="apply" data-product="${p.id}">Aplicar ${ic('chevron-right')}</button>
  </div>`).join('');

  const list = state.investments.map(inv => `<div class="inv-row">
    <span class="tx-ic">${ic('trend')}</span>
    <span class="inv-row-main"><strong>${esc(inv.name)}</strong><span>${esc(inv.rate)} · ${esc(inv.risk || 'Baixo risco')}</span></span>
    <span class="inv-row-val"><strong>${money(inv.amount)}</strong><span>+${money(round2(inv.amount * 0.0119))} no mês</span></span>
    <button class="linklike" data-action="redeem" data-id="${inv.id}" style="margin-left:12px">Resgatar</button>
  </div>`).join('');

  return `<div class="page-stack">
    <div class="page-intro">
      <div><h2>Seu dinheiro pode render mais</h2><p>Invista a partir de R$ 100, com liquidez e acompanhamento em tempo real.</p></div>
      <span class="pill lime">${ic('sparkles')} 102% do CDI</span>
    </div>

    <section class="invest-hero">
      <div class="inv-total">
        <span>${ic('wallet')} Total investido</span>
        <strong>${money(total)}</strong>
        <span class="inv-yield">${ic('trend')} +${money(estimatedYield())} este mês · 1,19%</span>
      </div>
      <div class="inv-actions">
        <button class="btn btn-lime" data-action="apply" data-product="cdb">${ic('plus')} Aplicar</button>
        <button class="btn btn-glass" data-action="invest-help">${ic('help')} Como funciona</button>
      </div>
    </section>

    <div class="products">${productHTML}</div>

    <div class="two-col">
      <section class="card pad">
        <div class="section-head"><div><h2>Meus investimentos</h2><p>${state.investments.length} produto${state.investments.length === 1 ? '' : 's'} ativo${state.investments.length === 1 ? '' : 's'}</p></div><span class="pill green">Rendendo</span></div>
        ${list || emptyState('trend', 'Você ainda não investe', 'Escolha um produto acima para começar.')}
      </section>
      <section class="card pad">
        <div class="section-head"><h3>Resumo do mês</h3></div>
        <div class="summary-list">
          <div class="summary-row"><span>Saldo investido</span><strong>${money(total)}</strong></div>
          <div class="summary-row"><span>Rendimento estimado</span><strong class="amount-in">+${money(estimatedYield())}</strong></div>
          <div class="summary-row"><span>Liquidez</span><strong>No mesmo dia</strong></div>
          <div class="summary-row"><span>Impostos</span><strong>Conforme produto</strong></div>
        </div>
        <p class="tiny muted" style="margin-top:14px;line-height:1.5">Rentabilidade passada não garante rentabilidade futura. Leia o regulamento de cada produto antes de investir.</p>
      </section>
    </div>
  </div>`;
};

function filteredTransactions() {
  let list = state.transactions.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
  if (ui.statementFilter === 'entradas') list = list.filter(t => t.type === 'in');
  if (ui.statementFilter === 'saidas') list = list.filter(t => t.type === 'out');
  if (ui.statementQuery.trim()) {
    const q = ui.statementQuery.trim().toLowerCase();
    list = list.filter(t => `${t.title} ${t.subtitle} ${catOf(t).label}`.toLowerCase().includes(q));
  }
  return list;
}

function statementListHTML() {
  const list = filteredTransactions();
  if (!list.length) return emptyState('search', 'Nada por aqui', 'Tente outro filtro ou termo de busca.');
  const groups = [];
  list.forEach(t => {
    const key = dayKey(t.date);
    let group = groups.find(g => g.key === key);
    if (!group) { group = { key, date: t.date, items: [] }; groups.push(group); }
    group.items.push(t);
  });
  return groups.map(g => {
    const total = g.items.reduce((s, t) => s + (t.type === 'in' ? t.amount : -t.amount), 0);
    return `<div class="statement-group">
      <div class="statement-date"><strong>${relativeDay(g.date)}</strong><span>${total >= 0 ? '+' : '−'} ${money(Math.abs(total))}</span></div>
      <div class="tx-list">${g.items.map(t => txRow(t, false)).join('')}</div>
    </div>`;
  }).join('');
}

routes.extrato = function () {
  const inMonth = state.transactions.filter(t => t.type === 'in' && sameMonth(t.date)).reduce((s, t) => s + t.amount, 0);
  const outMonth = state.transactions.filter(t => t.type === 'out' && sameMonth(t.date)).reduce((s, t) => s + t.amount, 0);

  return `<div class="page-stack">
    <div class="page-intro">
      <div><h2>Extrato da conta</h2><p>Acompanhe cada entrada e saída, com comprovante e categoria.</p></div>
      <button class="btn btn-soft" data-action="export-csv">${ic('download')} Exportar CSV</button>
    </div>

    <div class="stat-strip">
      <div class="stat"><span>${ic('arrow-down-left')} Entradas no mês</span><strong class="amount-in">+ ${money(inMonth)}</strong></div>
      <div class="stat"><span>${ic('arrow-up-right')} Saídas no mês</span><strong>− ${money(outMonth)}</strong></div>
      <div class="stat"><span>${ic('wallet')} Saldo disponível</span><strong>${displayMoney(state.balance)}</strong></div>
    </div>

    <section class="card">
      <div class="panel-head statement-tools">
        <div class="filters">
          <button class="chip ${ui.statementFilter === 'todos' ? 'active' : ''}" data-action="stmt-filter" data-filter="todos">Todos</button>
          <button class="chip ${ui.statementFilter === 'entradas' ? 'active' : ''}" data-action="stmt-filter" data-filter="entradas">Entradas</button>
          <button class="chip ${ui.statementFilter === 'saidas' ? 'active' : ''}" data-action="stmt-filter" data-filter="saidas">Saídas</button>
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <div class="search-mini">${ic('search')}<input id="stmt-search" type="search" placeholder="Buscar no extrato..." value="${esc(ui.statementQuery)}" /></div>
          <button class="icon-btn" data-action="export-csv" aria-label="Exportar extrato">${ic('download')}</button>
        </div>
      </div>
      <div class="panel-body" style="padding-top:6px" id="statement-list">${statementListHTML()}</div>
    </section>
  </div>`;
};

routes.perfil = function () {
  const s = state.settings;
  return `<div class="page-stack">
    <section class="card profile-hero">
      <div class="profile-av">${initialsOf(state.user.name)}</div>
      <div class="profile-id">
        <h2>${esc(state.user.name)}</h2>
        <p>${esc(state.user.email)} · cliente desde ${esc(state.user.memberSince)}</p>
        <div class="profile-tags">
          <span class="pill green">${ic('check-circle')} Conta verificada</span>
          <span class="pill">${ic('shield')} Proteção ativa</span>
          <span class="pill">${s.theme === 'dark' ? ic('moon') : ic('sun')} Tema ${s.theme === 'dark' ? 'escuro' : 'claro'}</span>
        </div>
      </div>
      <button class="btn btn-soft" data-action="edit-profile">${ic('edit')} Editar dados</button>
    </section>

    <div class="profile-grid">
      <div class="page-stack">
        <section class="card pad">
          <div class="section-head"><h3>Dados da conta</h3><span class="pill">LicdekBank</span></div>
          <div class="account-data">
            <div class="data-box"><span>Agência</span><strong>${state.user.agency}</strong></div>
            <div class="data-box"><span>Conta</span><strong>${state.user.account}</strong></div>
            <div class="data-box"><span>CPF</span><strong>${state.user.cpf}</strong></div>
            <div class="data-box"><span>Chave Pix</span><strong style="font-size:11px">${esc(state.user.email)}</strong></div>
          </div>
        </section>

        <section class="card pad">
          <div class="section-head"><h3>Preferências</h3></div>
          <div class="settings-list">
            <div class="setting">
              <span class="setting-ic">${ic(s.theme === 'dark' ? 'moon' : 'sun')}</span>
              <span class="setting-main"><strong>Tema escuro</strong><span>Deixe o app confortável à noite</span></span>
              <button class="switch ${s.theme === 'dark' ? 'on' : ''}" data-action="toggle-setting" data-setting="theme" role="switch" aria-checked="${s.theme === 'dark'}" aria-label="Tema escuro"></button>
            </div>
            <div class="setting">
              <span class="setting-ic">${ic('eye-off')}</span>
              <span class="setting-main"><strong>Ocultar saldo</strong><span>Mostre R$ •••••• no início</span></span>
              <button class="switch ${s.hideBalance ? 'on' : ''}" data-action="toggle-setting" data-setting="hideBalance" role="switch" aria-checked="${s.hideBalance}" aria-label="Ocultar saldo"></button>
            </div>
            <div class="setting">
              <span class="setting-ic">${ic('bell')}</span>
              <span class="setting-main"><strong>Notificações</strong><span>Novidades e movimentações</span></span>
              <button class="switch ${s.notifications ? 'on' : ''}" data-action="toggle-setting" data-setting="notifications" role="switch" aria-checked="${s.notifications}" aria-label="Notificações"></button>
            </div>
            <div class="setting">
              <span class="setting-ic">${ic('file')}</span>
              <span class="setting-main"><strong>Extrato por e-mail</strong><span>Resumo mensal automático</span></span>
              <button class="switch ${s.statementEmail ? 'on' : ''}" data-action="toggle-setting" data-setting="statementEmail" role="switch" aria-checked="${s.statementEmail}" aria-label="Extrato por e-mail"></button>
            </div>
          </div>
        </section>
      </div>

      <div class="page-stack">
        <section class="card pad">
          <div class="section-head"><h3>Segurança</h3><span class="pill green">${ic('shield')} Protegido</span></div>
          <div class="settings-list">
            <div class="setting">
              <span class="setting-ic">${ic('user')}</span>
              <span class="setting-main"><strong>Biometria</strong><span>Acesso com digital ou Face ID</span></span>
              <button class="switch ${s.biometric ? 'on' : ''}" data-action="toggle-setting" data-setting="biometric" role="switch" aria-checked="${s.biometric}" aria-label="Biometria"></button>
            </div>
            <div class="setting">
              <span class="setting-ic">${ic('moon')}</span>
              <span class="setting-main"><strong>Pix noturno</strong><span>Transferências após 22h</span></span>
              <button class="switch ${s.pixNight ? 'on' : ''}" data-action="toggle-setting" data-setting="pixNight" role="switch" aria-checked="${s.pixNight}" aria-label="Pix noturno"></button>
            </div>
            <button class="setting" data-action="change-password" style="width:100%;text-align:left">
              <span class="setting-ic">${ic('lock')}</span>
              <span class="setting-main"><strong>Alterar senha</strong><span>Última alteração há 3 meses</span></span>
              <span class="chev">${ic('chevron-right')}</span>
            </button>
            <button class="setting" data-action="devices" style="width:100%;text-align:left">
              <span class="setting-ic">${ic('phone')}</span>
              <span class="setting-main"><strong>Dispositivos conectados</strong><span>2 aparelhos ativos</span></span>
              <span class="chev">${ic('chevron-right')}</span>
            </button>
          </div>
        </section>

        <section class="card pad">
          <div class="section-head"><h3>Ajuda e sobre</h3></div>
          <div class="settings-list">
            <button class="setting" data-action="help" style="width:100%;text-align:left">
              <span class="setting-ic">${ic('headset')}</span>
              <span class="setting-main"><strong>Central de ajuda</strong><span>Fale com a gente 24h</span></span>
              <span class="chev">${ic('chevron-right')}</span>
            </button>
            <button class="setting" data-action="terms" style="width:100%;text-align:left">
              <span class="setting-ic">${ic('file')}</span>
              <span class="setting-main"><strong>Termos e privacidade</strong><span>Como cuidamos dos seus dados</span></span>
              <span class="chev">${ic('chevron-right')}</span>
            </button>
            <button class="setting" data-action="logout" style="width:100%;text-align:left">
              <span class="setting-ic" style="background:var(--danger-soft);color:var(--danger)">${ic('logout')}</span>
              <span class="setting-main"><strong style="color:var(--danger)">Sair da conta</strong><span>Encerrar a sessão neste aparelho</span></span>
              <span class="chev">${ic('chevron-right')}</span>
            </button>
          </div>
        </section>

        <p class="tiny muted" style="text-align:center">LicdekBank · versão 1.0.0 · conta digital demo</p>
      </div>
    </div>
  </div>`;
};

/* ---------- QR (decorative) ---------- */
function qrCells(seed) {
  const size = 21;
  const grid = Array.from({ length: size }, () => Array(size).fill(false));
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  const rand = () => {
    h ^= h << 13; h >>>= 0;
    h ^= h >> 17;
    h ^= h << 5; h >>>= 0;
    return (h >>> 0) / 4294967296;
  };
  const finder = (x, y) => {
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        const border = i === 0 || i === 6 || j === 0 || j === 6;
        const core = i >= 2 && i <= 4 && j >= 2 && j <= 4;
        grid[y + i][x + j] = border || core;
      }
    }
  };
  finder(0, 0); finder(14, 0); finder(0, 14);
  const inFinder = (x, y) =>
    (x < 8 && y < 8) || (x > 12 && y < 8) || (x < 8 && y > 12);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (inFinder(x, y)) continue;
      grid[y][x] = rand() > 0.52;
    }
  }
  return grid.flat().map(on => `<i class="${on ? 'on' : ''}"></i>`).join('');
}

/* ---------- Toast ---------- */
function toast(message, icon = 'check-circle') {
  const root = document.getElementById('toast-root');
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `${ic(icon)}<span>${esc(message)}</span>`;
  root.appendChild(el);
  setTimeout(() => {
    el.classList.add('out');
    setTimeout(() => el.remove(), 260);
  }, 3000);
}

/* ---------- Modal ---------- */
const modalRoot = document.getElementById('modal-root');

function openModal(html, onMount, opts = {}) {
  const wide = opts.wide ? ' wide' : '';
  modalRoot.innerHTML = `<div class="modal-backdrop">
    <div class="modal${wide}" role="dialog" aria-modal="true" tabindex="-1">
      <button class="modal-close" data-action="close-modal" aria-label="Fechar">${ic('x')}</button>
      ${html}
    </div>
  </div>`;
  document.body.classList.add('modal-open');
  const modal = modalRoot.querySelector('.modal');
  if (onMount) onMount(modal);
  const focusable = modal.querySelector('input, select, textarea, button:not(.modal-close)');
  setTimeout(() => (focusable || modal).focus({ preventScroll: true }), 60);
}

function closeModal() {
  modalRoot.innerHTML = '';
  document.body.classList.remove('modal-open');
}

function modalSummary(rows) {
  return `<div class="summary-list">${rows.map(r => `<div class="summary-row ${r.total ? 'total' : ''}"><span>${esc(r.label)}</span><strong>${r.html || esc(r.value)}</strong></div>`).join('')}</div>`;
}

function showSuccess({ title, message, rows }) {
  openModal(`<div class="success-screen">
    <div class="success-burst">${ic('check')}</div>
    <h3>${esc(title)}</h3>
    <p>${esc(message)}</p>
    ${modalSummary(rows)}
    <div class="receipt-note">${ic('shield')} Comprovante salvo automaticamente no seu extrato</div>
    <div class="modal-actions">
      <button class="btn btn-soft" data-action="success-statement">Ver extrato</button>
      <button class="btn btn-primary" data-action="close-modal">Concluir</button>
    </div>
  </div>`);
}

/* ---------- Notifications ---------- */
const notifPanel = document.getElementById('notif-panel');

function renderNotifPanel() {
  const unread = state.notifications.filter(n => n.unread).length;
  document.getElementById('notif-count').textContent = `${unread} nova${unread === 1 ? '' : 's'}`;
  document.getElementById('notif-list').innerHTML = state.notifications.map(n => `<button class="notif-item ${n.unread ? 'unread' : ''}" data-action="notif-open" data-id="${n.id}" type="button">
    <span class="tx-ic">${ic(n.icon)}</span>
    <span class="notif-item-main"><strong>${esc(n.title)}</strong><p>${esc(n.text)}</p><span>${relativeTime(n.time)}</span></span>
  </button>`).join('');
  updateNotifDot();
}

function toggleNotifications() {
  if (notifPanel.hidden) {
    renderNotifPanel();
    notifPanel.hidden = false;
  } else {
    notifPanel.hidden = true;
  }
}

function closeNotifications() {
  if (!notifPanel.hidden) notifPanel.hidden = true;
}

/* ---------- Search ---------- */
const searchLayer = document.getElementById('search-layer');
const searchInput = document.getElementById('search-input');
const SHORTCUTS = [
  { route: 'pix', label: 'Enviar um Pix', desc: 'Transferência instantânea', icon: 'pix' },
  { route: 'transferir', label: 'Transferir para outro banco', desc: 'TED gratuita', icon: 'send' },
  { route: 'pagar', label: 'Pagar boleto ou conta', desc: 'Boletos, convênios e recargas', icon: 'barcode' },
  { route: 'cartao', label: 'Ver cartão e limite', desc: 'Bloqueio e cartão virtual', icon: 'card' },
  { route: 'investir', label: 'Investimentos', desc: 'CDB, Tesouro e LCI', icon: 'trend' },
  { route: 'extrato', label: 'Abrir extrato', desc: 'Todas as movimentações', icon: 'receipt' }
];

function openSearch() {
  searchLayer.hidden = false;
  searchInput.value = '';
  renderSearchResults('');
  setTimeout(() => searchInput.focus(), 50);
}

function closeSearch() {
  searchLayer.hidden = true;
}

function renderSearchResults(query) {
  const q = query.trim().toLowerCase();
  const root = document.getElementById('search-results');
  const shortcuts = SHORTCUTS.filter(s => !q || `${s.label} ${s.desc}`.toLowerCase().includes(q)).slice(0, q ? 3 : 4);
  const txs = state.transactions.filter(t => q && `${t.title} ${t.subtitle}`.toLowerCase().includes(q)).slice(0, 5);
  const contacts = state.contacts.filter(c => q && c.name.toLowerCase().includes(q)).slice(0, 3);

  if (!shortcuts.length && !txs.length && !contacts.length) {
    root.innerHTML = `<div class="search-empty">Nenhum resultado para “${esc(query)}”.</div>`;
    return;
  }
  let html = '';
  if (q && contacts.length) {
    html += contacts.map(c => `<button class="search-result" data-action="search-contact" data-key="${esc(c.key)}" data-name="${esc(c.name)}" type="button">
      <span class="contact-av" style="background:${c.color};width:34px;height:34px;font-size:11px">${esc(c.initials)}</span>
      <div><strong>${esc(c.name)}</strong><span>${esc(c.key)}</span></div>
      <span class="pill">Pix</span>
    </button>`).join('');
  }
  if (txs.length) {
    html += txs.map(t => `<button class="search-result" data-action="search-tx" data-id="${t.id}" type="button">
      <span class="tx-ic ${t.type === 'in' ? 'in' : ''}">${ic(t.type === 'in' ? 'arrow-down-left' : catOf(t).icon)}</span>
      <div><strong>${esc(t.title)}</strong><span>${esc(t.subtitle)} · ${dayShort(t.date)}</span></div>
      <strong style="font-size:12px;color:${t.type === 'in' ? 'var(--success)' : 'var(--ink)'}">${t.type === 'in' ? '+' : '−'} ${money(t.amount)}</strong>
    </button>`).join('');
  }
  if (shortcuts.length) {
    html += shortcuts.map(s => `<button class="search-result" data-action="search-shortcut" data-route="${s.route}" type="button">
      <span class="tx-ic">${ic(s.icon)}</span>
      <div><strong>${esc(s.label)}</strong><span>${esc(s.desc)}</span></div>
      ${ic('chevron-right')}
    </button>`).join('');
  }
  root.innerHTML = html;
}

/* ---------- Transaction detail ---------- */
function openTx(id) {
  const t = state.transactions.find(x => x.id === id);
  if (!t) return;
  const cat = catOf(t);
  const rows = [
    { label: 'Tipo', value: t.type === 'in' ? 'Entrada' : 'Saída' },
    { label: 'Categoria', value: cat.label },
    { label: 'Forma', value: t.method },
    { label: 'Data', value: fullDate(t.date) },
    { label: 'Identificador', value: t.id.toUpperCase() }
  ];
  openModal(`<div class="modal-icon ${t.type === 'in' ? '' : 'neutral'}">${ic(t.type === 'in' ? 'arrow-down-left' : cat.icon)}</div>
    <div class="modal-head">
      <h3>${esc(t.title)}</h3>
      <p>${esc(t.subtitle)}</p>
    </div>
    <div class="modal-body">
      <div style="text-align:center;padding:8px 0 18px">
        <div style="font-size:29px;font-weight:700;letter-spacing:-1px;color:${t.type === 'in' ? 'var(--success)' : 'var(--ink)'}">${t.type === 'in' ? '+' : '−'} ${money(t.amount)}</div>
        <span class="pill ${t.type === 'in' ? 'green' : ''}" style="margin-top:8px">${t.type === 'in' ? 'Recebido' : 'Pago'}</span>
      </div>
      ${modalSummary(rows)}
    </div>
    <div class="modal-actions">
      <button class="btn btn-soft" data-action="share-tx" data-id="${t.id}">${ic('send')} Compartilhar</button>
      <button class="btn btn-primary" data-action="close-modal">Fechar</button>
    </div>`);
}

/* ---------- Action handlers ---------- */
const actions = {
  'demo-login'() { enterApp(); },
  'toggle-password'(el) {
    const input = document.getElementById('login-pass');
    if (!input) return;
    const show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    el.innerHTML = ic(show ? 'eye-off' : 'eye');
    el.setAttribute('aria-label', show ? 'Ocultar senha' : 'Mostrar senha');
  },
  forgot() {
    openModal(`<div class="modal-icon neutral">${ic('lock')}</div>
      <div class="modal-head"><h3>Recuperar senha</h3><p>Enviaremos um link de redefinição para o e-mail cadastrado.</p></div>
      <div class="modal-body"><label class="field"><span class="field-label">E-mail</span><input class="input" type="email" id="forgot-email" value="lidio@licdek.com" /></label></div>
      <div class="modal-actions"><button class="btn btn-ghost" data-action="close-modal">Cancelar</button><button class="btn btn-primary" id="forgot-send">Enviar link</button></div>`, m => {
      m.querySelector('#forgot-send').onclick = () => {
        closeModal();
        toast('Link de recuperação enviado para seu e-mail.');
      };
    });
  },
  'toggle-balance'() {
    state.settings.hideBalance = !state.settings.hideBalance;
    save();
    render();
  },
  'toggle-notifications'() { toggleNotifications(); },
  'read-all'() {
    state.notifications = state.notifications.map(n => ({ ...n, unread: false }));
    save();
    renderNotifPanel();
    toast('Todas as notificações foram lidas.');
  },
  'notif-open'(el) {
    const n = state.notifications.find(x => x.id === el.dataset.id);
    if (!n) return;
    n.unread = false;
    save();
    closeNotifications();
    if (n.route && n.route !== route) go(n.route); else render();
    toast(n.title, 'bell');
  },
  'notif-settings'() { closeNotifications(); go('perfil'); },
  'open-search'() { openSearch(); },
  'close-search'() { closeSearch(); },
  'close-modal'() { closeModal(); },
  'success-statement'() { closeModal(); go('extrato'); },
  'pix-tab'(el) { ui.pixTab = el.dataset.tab; render(); },
  'select-contact'(el) {
    ui.selectedContact = el.dataset.key;
    const keyInput = document.getElementById('pix-key');
    if (keyInput) keyInput.value = el.dataset.key;
    document.querySelectorAll('#pix-form .contact').forEach(c => c.classList.toggle('selected', c === el));
  },
  'pix-quick'(el) {
    const input = document.getElementById('pix-amount');
    if (input) { input.value = Number(el.dataset.value).toFixed(2).replace('.', ','); input.focus(); }
  },
  copy(el) {
    const value = el.dataset.copy || '';
    const label = el.dataset.label || 'Informação';
    copyText(value).then(ok => toast(ok ? `${label} copiada.` : 'Não foi possível copiar.', ok ? 'copy' : 'info'));
  },
  'share-pix'() {
    const key = state.pixKeys.find(k => k.type === 'E-mail')?.value || state.user.email;
    if (navigator.share) {
      navigator.share({ title: 'Chave Pix LicdekBank', text: `Minha chave Pix: ${key}` }).catch(() => {});
    } else {
      copyText(key).then(() => toast('Chave Pix copiada para compartilhar.'));
    }
  },
  'add-key'() {
    openModal(`<div class="modal-icon">${ic('pix')}</div>
      <div class="modal-head"><h3>Nova chave Pix</h3><p>Escolha o tipo e informe o valor da chave.</p></div>
      <div class="modal-body">
        <form id="add-key-form" class="form-grid">
          <label class="field"><span class="field-label">Tipo de chave</span>
            <select class="select" id="key-type"><option>E-mail</option><option>Celular</option><option>CPF</option><option>Aleatória</option></select>
          </label>
          <label class="field"><span class="field-label">Valor da chave</span><input class="input" id="key-value" placeholder="Digite a chave" required /></label>
          <div class="form-actions"><button class="btn btn-primary" type="submit">Cadastrar chave</button></div>
        </form>
      </div>`);
  },
  'fill-boleto'() {
    const code = document.getElementById('boleto-code');
    if (code) code.value = '34191.79001 01043.510047 91020.150008 8 98760000142800';
    const amount = document.getElementById('boleto-amount');
    if (amount) amount.value = '142,80';
    toast('Código de exemplo preenchido.');
  },
  'boletos'() {
    const input = document.getElementById('boleto-code');
    if (input) { input.scrollIntoView({ behavior: 'smooth', block: 'center' }); input.focus(); }
  },
  'bills'() {
    document.querySelector('.panel-head h3')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  },
  'pix-copy'() {
    openModal(`<div class="modal-icon">${ic('qr')}</div>
      <div class="modal-head"><h3>Pix copia e cola</h3><p>Cole o código Pix para pagar.</p></div>
      <div class="modal-body">
        <form id="pix-copy-form" class="form-grid">
          <label class="field"><span class="field-label">Código Pix</span><textarea class="input" id="pix-copy-code" rows="3" placeholder="00020126...">00020126580014BR.GOV.BCB.PIX0136licdek-pagamentos-2026</textarea></label>
          <label class="field"><span class="field-label">Valor</span><span class="money-input"><span>R$</span><input id="pix-copy-amount" inputmode="decimal" placeholder="0,00" required /></span></label>
          <label class="field"><span class="field-label">Para quem</span><input class="input" id="pix-copy-name" placeholder="Nome do recebedor" value="Loja Licdek Store" /></label>
          <div class="form-actions"><button class="btn btn-primary" type="submit">Continuar</button></div>
        </form>
      </div>`);
  },
  'topup'() { openTopup(); },
  'pay-bill'(el) {
    const bill = state.bills.find(b => b.id === el.dataset.id);
    if (!bill || bill.paid) return;
    openModal(`<div class="modal-icon">${ic(bill.icon)}</div>
      <div class="modal-head"><h3>Pagar ${esc(bill.name)}</h3><p>${esc(bill.due)} · pagamento à vista</p></div>
      <div class="modal-body">${modalSummary([
        { label: 'Beneficiário', value: bill.name },
        { label: 'Vencimento', value: bill.due.replace('Vence em ', 'Em ') },
        { label: 'Forma', value: 'Saldo em conta' },
        { label: 'Valor', value: money(bill.amount), total: true }
      ])}</div>
      <div class="modal-actions">
        <button class="btn btn-ghost" data-action="close-modal">Cancelar</button>
        <button class="btn btn-primary" id="pay-bill-confirm">Pagar ${money(bill.amount)}</button>
      </div>`, m => {
      m.querySelector('#pay-bill-confirm').onclick = () => {
        const tx = spend({ title: bill.name, subtitle: 'Pagamento de conta', amount: bill.amount, category: 'contas', method: 'Boleto' });
        if (!tx) return;
        bill.paid = true;
        save();
        render();
        showSuccess({
          title: 'Pagamento realizado',
          message: 'Sua conta foi paga com sucesso.',
          rows: [
            { label: 'Beneficiário', value: bill.name },
            { label: 'Data', value: fullDate(tx.date) },
            { label: 'Valor pago', value: money(bill.amount), total: true }
          ]
        });
      };
    });
  },
  'freeze-card'() {
    state.card.frozen = !state.card.frozen;
    save();
    render();
    toast(state.card.frozen ? 'Cartão congelado. Nenhuma compra será aprovada.' : 'Cartão desbloqueado. Tudo pronto para usar!', 'snowflake');
  },
  'toggle-card'(el) {
    const field = el.dataset.field;
    state.card[field] = !state.card[field];
    save();
    render();
    toast(`${field === 'contactless' ? 'Pagamento por aproximação' : 'Compras online'} ${state.card[field] ? 'ativado' : 'desativado'}.`);
  },
  'reveal-card'() {
    ui.cardRevealed = !ui.cardRevealed;
    render();
  },
  'new-virtual'() {
    const last4 = String(Math.floor(1000 + Math.random() * 9000));
    const number = `5412 8890 ${Math.floor(1000 + Math.random() * 9000)} ${last4}`;
    openModal(`<div class="modal-icon">${ic('card')}</div>
      <div class="modal-head"><h3>Cartão virtual criado</h3><p>Use para compras online com mais segurança.</p></div>
      <div class="modal-body">
        <div style="border-radius:18px;padding:20px;background:linear-gradient(135deg,#115039,#0a3a2b);color:#fff;display:grid;gap:14px">
          <div style="display:flex;justify-content:space-between;font-size:12px;color:rgba(255,255,255,.65)"><span>licdekbank · virtual</span><span>VISA</span></div>
          <div style="letter-spacing:2px;font-size:14px">${number}</div>
          <div style="display:flex;gap:24px;font-size:11px;color:rgba(255,255,255,.65)">
            <span>VALIDADE <b style="display:block;color:#fff">10/29</b></span>
            <span>CVV <b style="display:block;color:#fff">${Math.floor(100 + Math.random() * 900)}</b></span>
          </div>
        </div>
        <p class="tiny muted" style="margin-top:12px">Este cartão pode ser congelado a qualquer momento na tela do cartão.</p>
      </div>
      <div class="modal-actions">
        <button class="btn btn-soft" id="copy-virtual">${ic('copy')} Copiar número</button>
        <button class="btn btn-primary" data-action="close-modal">Concluir</button>
      </div>`, m => {
      m.querySelector('#copy-virtual').onclick = () => copyText(number).then(() => toast('Número do cartão virtual copiado.'));
    });
  },
  'pay-invoice'() {
    if (state.card.used <= 0) { toast('Sua fatura já está zerada.'); return; }
    const amount = state.card.used;
    openModal(`<div class="modal-icon">${ic('barcode')}</div>
      <div class="modal-head"><h3>Pagar fatura do cartão</h3><p>Fatura de outubro · vence em 05/11</p></div>
      <div class="modal-body">${modalSummary([
        { label: 'Limite total', value: money(state.card.limit) },
        { label: 'Valor usado', value: money(amount) },
        { label: 'Disponível após pagamento', value: money(state.card.limit) },
        { label: 'Valor a pagar', value: money(amount), total: true }
      ])}</div>
      <div class="modal-actions">
        <button class="btn btn-ghost" data-action="close-modal">Cancelar</button>
        <button class="btn btn-primary" id="confirm-invoice">Pagar fatura</button>
      </div>`, m => {
      m.querySelector('#confirm-invoice').onclick = () => {
        const tx = spend({ title: 'Fatura do cartão', subtitle: 'Pagamento de fatura', amount, category: 'contas', method: 'Saldo' });
        if (!tx) return;
        state.card.used = 0;
        save();
        render();
        showSuccess({
          title: 'Fatura paga',
          message: 'Seu limite foi liberado novamente.',
          rows: [
            { label: 'Fatura', value: 'Outubro' },
            { label: 'Data', value: fullDate(tx.date) },
            { label: 'Valor pago', value: money(amount), total: true }
          ]
        });
      };
    });
  },
  'apply'(el) { openApply(el.dataset.product); },
  'redeem'(el) {
    const inv = state.investments.find(i => i.id === el.dataset.id);
    if (!inv) return;
    openModal(`<div class="modal-icon neutral">${ic('trend')}</div>
      <div class="modal-head"><h3>Resgatar investimento</h3><p>${esc(inv.name)} · saldo ${money(inv.amount)}</p></div>
      <div class="modal-body"><form id="redeem-form" class="form-grid">
        <label class="field"><span class="field-label">Valor do resgate</span><span class="money-input"><span>R$</span><input id="redeem-amount" inputmode="decimal" value="${inv.amount.toFixed(2).replace('.', ',')}" required /></span></label>
        <p class="tiny muted">O valor cai na sua conta na hora.</p>
        <div class="form-actions"><button class="btn btn-primary" type="submit">Resgatar</button></div>
      </form></div>`, m => {
      m.querySelector('#redeem-form').addEventListener('submit', e => {
        e.preventDefault();
        const amount = round2(parseAmount(m.querySelector('#redeem-amount').value));
        if (amount <= 0 || amount > inv.amount) { toast('Informe um valor válido para resgate.'); return; }
        inv.amount = round2(inv.amount - amount);
        if (inv.amount <= 0) state.investments = state.investments.filter(i => i.id !== inv.id);
        earn({ title: 'Resgate de investimento', subtitle: inv.name, amount, category: 'investimento', method: 'Investimento' });
        save();
        render();
        showSuccess({
          title: 'Resgate concluído',
          message: 'O dinheiro já está disponível na sua conta.',
          rows: [
            { label: 'Produto', value: inv.name },
            { label: 'Destino', value: 'Saldo em conta' },
            { label: 'Valor resgatado', value: money(amount), total: true }
          ]
        });
      });
    });
  },
  'invest-help'() {
    openModal(`<div class="modal-icon">${ic('trend')}</div>
      <div class="modal-head"><h3>Como funciona</h3><p>Simples, transparente e sem letras miúdas.</p></div>
      <div class="modal-body">
        <div class="summary-list">
          <div class="summary-row"><span>Aplicação mínima</span><strong>R$ 100,00</strong></div>
          <div class="summary-row"><span>Resgate</span><strong>No mesmo dia</strong></div>
          <div class="summary-row"><span>Rentabilidade CDB</span><strong>102% do CDI</strong></div>
          <div class="summary-row"><span>Taxa de administração</span><strong>Zero</strong></div>
        </div>
        <p class="tiny muted" style="margin-top:12px;line-height:1.5">Seu dinheiro fica protegido pelo FGC até o limite de R$ 250 mil por CPF e instituição.</p>
      </div>
      <div class="modal-actions"><button class="btn btn-primary btn-full" data-action="close-modal">Entendi</button></div>`);
  },
  'stmt-filter'(el) {
    ui.statementFilter = el.dataset.filter;
    document.querySelectorAll('[data-action="stmt-filter"]').forEach(c => c.classList.toggle('active', c === el));
    const list = document.getElementById('statement-list');
    if (list) list.innerHTML = statementListHTML();
  },
  'export-csv'() {
    const list = filteredTransactions();
    const rows = [['Data', 'Descrição', 'Complemento', 'Categoria', 'Tipo', 'Forma', 'Valor (R$)']];
    list.forEach(t => rows.push([
      fullDate(t.date), t.title, t.subtitle, catOf(t).label,
      t.type === 'in' ? 'Entrada' : 'Saída', t.method,
      (t.type === 'in' ? '' : '-') + t.amount.toFixed(2).replace('.', ',')
    ]));
    const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(';')).join('\r\n');
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `licdekbank-extrato-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast('Extrato exportado em CSV.');
  },
  'open-tx'(el) { openTx(el.dataset.id); },
  'share-tx'(el) {
    const t = state.transactions.find(x => x.id === el.dataset.id);
    if (!t) return;
    const text = `${t.title} — ${t.type === 'in' ? '+' : '-'} ${money(t.amount)} · ${fullDate(t.date)} · LicdekBank`;
    if (navigator.share) navigator.share({ title: 'Comprovante LicdekBank', text }).catch(() => {});
    else copyText(text).then(() => toast('Comprovante copiado.'));
  },
  'toggle-setting'(el) {
    const key = el.dataset.setting;
    if (key === 'theme') {
      state.settings.theme = state.settings.theme === 'dark' ? 'light' : 'dark';
      applyTheme();
    } else {
      state.settings[key] = !state.settings[key];
      if (key === 'hideBalance') {
        toast(state.settings.hideBalance ? 'Saldo ocultado.' : 'Saldo visível.', state.settings.hideBalance ? 'eye-off' : 'eye');
      } else if (key === 'notifications') {
        toast(`Notificações ${state.settings[key] ? 'ativadas' : 'desativadas'}.`, 'bell');
      } else if (key === 'pixNight') {
        toast(`Pix noturno ${state.settings[key] ? 'liberado' : 'bloqueado'}.`, 'moon');
      } else {
        toast(`${key === 'biometric' ? 'Biometria' : 'Extrato por e-mail'} ${state.settings[key] ? 'ativada' : 'desativada'}.`);
      }
    }
    save();
    render();
  },
  'edit-profile'() {
    openModal(`<div class="modal-icon neutral">${ic('edit')}</div>
      <div class="modal-head"><h3>Editar dados</h3><p>Atualize suas informações cadastrais.</p></div>
      <div class="modal-body"><form id="profile-form" class="form-grid">
        <label class="field"><span class="field-label">Nome completo</span><input class="input" id="profile-name" value="${esc(state.user.name)}" required /></label>
        <label class="field"><span class="field-label">E-mail</span><input class="input" type="email" id="profile-email" value="${esc(state.user.email)}" required /></label>
        <div class="form-actions"><button class="btn btn-primary" type="submit">Salvar alterações</button></div>
      </form></div>`, m => {
      m.querySelector('#profile-form').addEventListener('submit', e => {
        e.preventDefault();
        const name = m.querySelector('#profile-name').value.trim();
        const email = m.querySelector('#profile-email').value.trim();
        if (!name || !email) { toast('Preencha nome e e-mail.'); return; }
        state.user.name = name;
        state.user.firstName = name.split(' ')[0];
        state.user.email = email;
        const key = state.pixKeys.find(k => k.type === 'E-mail');
        if (key) key.value = email;
        save();
        closeModal();
        render();
        toast('Dados atualizados com sucesso.');
      });
    });
  },
  'change-password'() {
    openModal(`<div class="modal-icon neutral">${ic('lock')}</div>
      <div class="modal-head"><h3>Alterar senha</h3><p>Use ao menos 8 caracteres com letras e números.</p></div>
      <div class="modal-body"><form id="password-form" class="form-grid">
        <label class="field"><span class="field-label">Senha atual</span><input class="input" type="password" id="pass-current" required /></label>
        <label class="field"><span class="field-label">Nova senha</span><input class="input" type="password" id="pass-new" minlength="8" required /></label>
        <label class="field"><span class="field-label">Confirmar nova senha</span><input class="input" type="password" id="pass-confirm" minlength="8" required /></label>
        <div class="form-actions"><button class="btn btn-primary" type="submit">Alterar senha</button></div>
      </form></div>`, m => {
      m.querySelector('#password-form').addEventListener('submit', e => {
        e.preventDefault();
        const current = m.querySelector('#pass-current').value;
        const next = m.querySelector('#pass-new').value;
        const confirm = m.querySelector('#pass-confirm').value;
        if (!current) { toast('Informe sua senha atual.'); return; }
        if (next.length < 8) { toast('A nova senha precisa ter 8 caracteres ou mais.'); return; }
        if (next !== confirm) { toast('As senhas não coincidem.'); return; }
        closeModal();
        toast('Senha alterada com sucesso.');
      });
    });
  },
  devices() {
    openModal(`<div class="modal-icon neutral">${ic('phone')}</div>
      <div class="modal-head"><h3>Dispositivos conectados</h3><p>Gerencie os aparelhos com acesso à sua conta.</p></div>
      <div class="modal-body">
        <div class="key-row" style="margin-bottom:8px"><span class="tx-ic">${ic('phone')}</span><span class="key-row-main"><strong>iPhone 15 · este aparelho</strong><span>São Paulo · agora</span></span><span class="pill green">Atual</span></div>
        <div class="key-row"><span class="tx-ic">${ic('card')}</span><span class="key-row-main"><strong>MacBook Pro</strong><span>São Paulo · há 2 dias</span></span><button class="linklike" data-action="remove-device">Remover</button></div>
      </div>
      <div class="modal-actions"><button class="btn btn-primary btn-full" data-action="close-modal">Concluir</button></div>`);
  },
  'remove-device'() { closeModal(); toast('Dispositivo removido com segurança.'); },
  terms() {
    openModal(`<div class="modal-icon neutral">${ic('file')}</div>
      <div class="modal-head"><h3>Termos e privacidade</h3><p>Transparência é parte do nosso jeito de cuidar.</p></div>
      <div class="modal-body">
        <div class="summary-list">
          <div class="summary-row"><span>Tarifa de manutenção</span><strong>R$ 0,00</strong></div>
          <div class="summary-row"><span>Pix</span><strong>Ilimitado e grátis</strong></div>
          <div class="summary-row"><span>Seus dados</span><strong>Protegidos pela LGPD</strong></div>
          <div class="summary-row"><span>Instituição</span><strong>LicdekBank S.A.</strong></div>
        </div>
        <p class="tiny muted" style="margin-top:12px;line-height:1.6">Este é um aplicativo de demonstração. Nenhuma operação financeira real é realizada e todos os dados ficam armazenados apenas no seu navegador.</p>
      </div>
      <div class="modal-actions"><button class="btn btn-primary btn-full" data-action="close-modal">Entendi</button></div>`);
  },
  help() {
    openModal(`<div class="modal-icon">${ic('headset')}</div>
      <div class="modal-head"><h3>Estamos aqui por você</h3><p>Atendimento humano 24 horas, todos os dias.</p></div>
      <div class="modal-body">
        <div class="summary-list">
          <div class="summary-row"><span>Chat no app</span><strong>Tempo médio: 2 min</strong></div>
          <div class="summary-row"><span>E-mail</span><strong>ajuda@licdekbank.com</strong></div>
          <div class="summary-row"><span>Telefone</span><strong>0800 123 4567</strong></div>
        </div>
        <p class="tiny muted" style="margin-top:12px">Em caso de perda do cartão, congele-o imediatamente na tela “Cartão”.</p>
      </div>
      <div class="modal-actions"><button class="btn btn-soft" data-action="close-modal">Fechar</button><button class="btn btn-primary" data-action="chat-demo">${ic('send')} Iniciar chat</button></div>`);
  },
  'chat-demo'() { closeModal(); toast('Chat aberto. Um atendente responderá em instantes.', 'headset'); },
  logout() {
    openModal(`<div class="modal-icon danger">${ic('logout')}</div>
      <div class="modal-head"><h3>Sair da conta?</h3><p>Você precisará entrar novamente para acessar o LicdekBank.</p></div>
      <div class="modal-actions">
        <button class="btn btn-ghost" data-action="close-modal">Continuar aqui</button>
        <button class="btn btn-primary" id="confirm-logout">Sair</button>
      </div>`, m => {
      m.querySelector('#confirm-logout').onclick = logout;
    });
  },
  'search-shortcut'(el) { closeSearch(); go(el.dataset.route); },
  'search-tx'(el) { closeSearch(); openTx(el.dataset.id); },
  'search-contact'(el) {
    closeSearch();
    ui.pixTab = 'enviar';
    ui.selectedContact = el.dataset.key;
    go('pix');
    setTimeout(() => {
      const keyInput = document.getElementById('pix-key');
      if (keyInput) {
        keyInput.value = el.dataset.key;
        document.querySelectorAll('#pix-form .contact').forEach(c => c.classList.toggle('selected', c.dataset.key === el.dataset.key));
      }
    }, 80);
  }
};

/* ---------- Modals: topup, apply, pix confirm ---------- */
function openTopup() {
  openModal(`<div class="modal-icon">${ic('phone')}</div>
    <div class="modal-head"><h3>Recarga de celular</h3><p>Créditos na hora, sem sair do app.</p></div>
    <div class="modal-body">
      <form id="topup-form" class="form-grid">
        <div class="form-grid two">
          <label class="field"><span class="field-label">Operadora</span>
            <select class="select" id="topup-carrier"><option>Vivo</option><option>Claro</option><option>Tim</option><option>Oi</option></select>
          </label>
          <label class="field"><span class="field-label">Celular</span><input class="input" id="topup-phone" placeholder="(11) 90000-0000" inputmode="tel" required /></label>
        </div>
        <label class="field"><span class="field-label">Valor da recarga</span><span class="money-input"><span>R$</span><input id="topup-amount" inputmode="decimal" placeholder="0,00" required /></span></label>
        <div class="chips">
          <button type="button" class="chip" data-action="topup-quick" data-value="20">R$ 20</button>
          <button type="button" class="chip" data-action="topup-quick" data-value="30">R$ 30</button>
          <button type="button" class="chip" data-action="topup-quick" data-value="50">R$ 50</button>
        </div>
        <div class="form-actions"><button class="btn btn-primary" type="submit">Fazer recarga</button></div>
      </form>
    </div>`);
}

function openApply(productId) {
  const products = {
    cdb: { name: 'CDB Liquidez Diária', rate: '102% do CDI', min: 100 },
    tesouro: { name: 'Tesouro Selic 2029', rate: '11,2% a.a.', min: 100 },
    lci: { name: 'LCI Licdek', rate: '96% do CDI', min: 100 }
  };
  const product = products[productId] || products.cdb;
  openModal(`<div class="modal-icon">${ic('trend')}</div>
    <div class="modal-head"><h3>Aplicar em ${esc(product.name)}</h3><p>${esc(product.rate)} · aplicação mínima de ${money(product.min)}</p></div>
    <div class="modal-body">
      <form id="apply-form" class="form-grid" data-name="${esc(product.name)}" data-rate="${esc(product.rate)}" data-min="${product.min}">
        <label class="field"><span class="field-label">Quanto você quer aplicar?</span><span class="money-input"><span>R$</span><input id="apply-amount" inputmode="decimal" placeholder="0,00" required /></span></label>
        <div class="chips">
          <button type="button" class="chip" data-action="apply-quick" data-value="100">R$ 100</button>
          <button type="button" class="chip" data-action="apply-quick" data-value="500">R$ 500</button>
          <button type="button" class="chip" data-action="apply-quick" data-value="1000">R$ 1.000</button>
        </div>
        <div class="summary-list">
          <div class="summary-row"><span>Saldo disponível</span><strong>${money(state.balance)}</strong></div>
          <div class="summary-row"><span>Rentabilidade</span><strong>${esc(product.rate)}</strong></div>
          <div class="summary-row"><span>Resgate</span><strong>No mesmo dia</strong></div>
        </div>
        <div class="form-actions"><button class="btn btn-primary" type="submit">Confirmar aplicação</button></div>
      </form>
    </div>`, m => {
    m.querySelectorAll('[data-action="apply-quick"]').forEach(btn => {
      btn.onclick = () => {
        const input = m.querySelector('#apply-amount');
        input.value = Number(btn.dataset.value).toFixed(2).replace('.', ',');
      };
    });
    m.querySelector('#apply-form').addEventListener('submit', e => {
      e.preventDefault();
      const amount = round2(parseAmount(m.querySelector('#apply-amount').value));
      if (amount < product.min) { toast(`A aplicação mínima é ${money(product.min)}.`); return; }
      const tx = spend({ title: `Aplicação · ${product.name}`, subtitle: 'Investimento', amount, category: 'investimento', method: 'Investimento' });
      if (!tx) return;
      const existing = state.investments.find(i => i.name === product.name);
      if (existing) existing.amount = round2(existing.amount + amount);
      else state.investments.push({ id: uid(), name: product.name, amount, rate: product.rate, risk: 'Baixo risco' });
      save();
      render();
      showSuccess({
        title: 'Aplicação realizada',
        message: 'Seu dinheiro já está rendendo.',
        rows: [
          { label: 'Produto', value: product.name },
          { label: 'Rentabilidade', value: product.rate },
          { label: 'Valor aplicado', value: money(amount), total: true }
        ]
      });
    });
  });
}

function openPixConfirm({ key, name, amount, desc }) {
  openModal(`<div class="modal-icon">${ic('pix')}</div>
    <div class="modal-head"><h3>Confirmar Pix</h3><p>Revise os dados antes de enviar.</p></div>
    <div class="modal-body">
      ${modalSummary([
        { label: 'Para', value: name },
        { label: 'Chave Pix', value: key },
        { label: 'Quando', value: 'Agora' },
        { label: 'Descrição', value: desc || '—' },
        { label: 'Valor', value: money(amount), total: true }
      ])}
      <p class="hint-text" style="margin-top:14px">${ic('shield')} Transferência protegida e imediata.</p>
    </div>
    <div class="modal-actions">
      <button class="btn btn-ghost" data-action="close-modal">Cancelar</button>
      <button class="btn btn-primary" id="confirm-pix">Confirmar Pix</button>
    </div>`, m => {
    m.querySelector('#confirm-pix').onclick = () => {
      const tx = spend({ title: 'Pix enviado', subtitle: name, amount, category: 'pix', method: 'Pix' });
      if (!tx) return;
      render();
      showSuccess({
        title: 'Pix enviado!',
        message: `Transferência concluída para ${name}.`,
        rows: [
          { label: 'Destinatário', value: name },
          { label: 'Chave Pix', value: key },
          { label: 'Data', value: fullDate(tx.date) },
          { label: 'Valor', value: money(amount), total: true }
        ]
      });
    };
  });
}

/* ---------- Forms (global) ---------- */
document.addEventListener('submit', e => {
  const form = e.target;
  if (!(form instanceof HTMLFormElement)) return;

  if (form.id === 'login-form') {
    e.preventDefault();
    const pass = document.getElementById('login-pass').value;
    const error = document.getElementById('login-error');
    if (pass.trim().length < 4) {
      error.hidden = false;
      return;
    }
    error.hidden = true;
    enterApp();
    toast(`Bem-vindo de volta, ${state.user.firstName}!`);
    return;
  }

  if (form.id === 'pix-form') {
    e.preventDefault();
    const key = document.getElementById('pix-key').value.trim();
    const amount = round2(parseAmount(document.getElementById('pix-amount').value));
    const desc = document.getElementById('pix-desc').value.trim();
    if (!key) { toast('Informe uma chave Pix.'); return; }
    if (amount <= 0) { toast('Informe um valor maior que zero.'); return; }
    if (amount > state.balance) { toast('Saldo insuficiente para este Pix.'); return; }
    const contact = state.contacts.find(c => c.key === key);
    openPixConfirm({ key, name: contact ? contact.name : 'Novo destinatário', amount, desc });
    return;
  }

  if (form.id === 'transfer-form') {
    e.preventDefault();
    const name = document.getElementById('tr-name').value.trim();
    const doc = document.getElementById('tr-doc').value.trim();
    const bank = document.getElementById('tr-bank').value;
    const agency = document.getElementById('tr-agency').value.trim();
    const account = document.getElementById('tr-account').value.trim();
    const amount = round2(parseAmount(document.getElementById('tr-amount').value));
    const desc = document.getElementById('tr-desc').value.trim();
    if (!name || !doc || !agency || !account) { toast('Preencha todos os dados do destinatário.'); return; }
    if (amount <= 0) { toast('Informe um valor maior que zero.'); return; }
    if (amount > state.balance) { toast('Saldo insuficiente para esta transferência.'); return; }
    openModal(`<div class="modal-icon">${ic('send')}</div>
      <div class="modal-head"><h3>Confirmar transferência</h3><p>Revise os dados antes de enviar.</p></div>
      <div class="modal-body">
        ${modalSummary([
          { label: 'Para', value: name },
          { label: 'Instituição', value: bank },
          { label: 'Agência / Conta', value: `${agency} / ${account}` },
          { label: 'Documento', value: doc },
          { label: 'Descrição', value: desc || '—' },
          { label: 'Valor', value: money(amount), total: true }
        ])}
      </div>
      <div class="modal-actions"><button class="btn btn-ghost" data-action="close-modal">Cancelar</button><button class="btn btn-primary" id="confirm-transfer">Confirmar</button></div>`, m => {
      m.querySelector('#confirm-transfer').onclick = () => {
        const tx = spend({ title: 'Transferência enviada', subtitle: name, amount, category: 'transferencia', method: 'TED' });
        if (!tx) return;
        render();
        showSuccess({
          title: 'Transferência enviada',
          message: `Para ${name} · ${bank}`,
          rows: [
            { label: 'Destinatário', value: name },
            { label: 'Agência / Conta', value: `${agency} / ${account}` },
            { label: 'Data', value: fullDate(tx.date) },
            { label: 'Valor', value: money(amount), total: true }
          ]
        });
      };
    });
    return;
  }

  if (form.id === 'boleto-form') {
    e.preventDefault();
    const code = document.getElementById('boleto-code').value.trim();
    const amount = round2(parseAmount(document.getElementById('boleto-amount').value));
    if (code.length < 10) { toast('Informe um código de boleto válido.'); return; }
    if (amount <= 0) { toast('Informe o valor do boleto.'); return; }
    if (amount > state.balance) { toast('Saldo insuficiente para pagar este boleto.'); return; }
    openModal(`<div class="modal-icon">${ic('barcode')}</div>
      <div class="modal-head"><h3>Confirmar pagamento</h3><p>Boleto bancário · débito em conta</p></div>
      <div class="modal-body">
        ${modalSummary([
          { label: 'Código', value: code.slice(0, 26) + (code.length > 26 ? '…' : '') },
          { label: 'Forma', value: 'Saldo em conta' },
          { label: 'Data', value: 'Hoje, agora' },
          { label: 'Valor', value: money(amount), total: true }
        ])}
      </div>
      <div class="modal-actions"><button class="btn btn-ghost" data-action="close-modal">Cancelar</button><button class="btn btn-primary" id="confirm-boleto">Pagar boleto</button></div>`, m => {
      m.querySelector('#confirm-boleto').onclick = () => {
        const tx = spend({ title: 'Boleto pago', subtitle: 'Pagamento de boleto', amount, category: 'contas', method: 'Boleto' });
        if (!tx) return;
        render();
        showSuccess({
          title: 'Boleto pago',
          message: 'O pagamento foi processado com sucesso.',
          rows: [
            { label: 'Código', value: code.slice(0, 18) + '…' },
            { label: 'Data', value: fullDate(tx.date) },
            { label: 'Valor pago', value: money(amount), total: true }
          ]
        });
      };
    });
    return;
  }

  if (form.id === 'topup-form') {
    e.preventDefault();
    const carrier = document.getElementById('topup-carrier').value;
    const phone = document.getElementById('topup-phone').value.trim();
    const amount = round2(parseAmount(document.getElementById('topup-amount').value));
    if (!phone) { toast('Informe o número do celular.'); return; }
    if (amount <= 0) { toast('Escolha o valor da recarga.'); return; }
    const tx = spend({ title: 'Recarga de celular', subtitle: `${carrier} · ${phone}`, amount, category: 'recarga', method: 'Recarga' });
    if (!tx) return;
    render();
    showSuccess({
      title: 'Recarga realizada',
      message: `${carrier} · créditos enviados para ${phone}`,
      rows: [
        { label: 'Operadora', value: carrier },
        { label: 'Celular', value: phone },
        { label: 'Valor', value: money(amount), total: true }
      ]
    });
    return;
  }

  if (form.id === 'pix-copy-form') {
    e.preventDefault();
    const key = document.getElementById('pix-copy-code').value.trim();
    const amount = round2(parseAmount(document.getElementById('pix-copy-amount').value));
    const name = document.getElementById('pix-copy-name').value.trim() || 'Recebedor Pix';
    if (!key) { toast('Cole o código Pix.'); return; }
    if (amount <= 0) { toast('Informe o valor do pagamento.'); return; }
    openPixConfirm({ key: key.slice(0, 32) + '…', name, amount, desc: 'Pix copia e cola' });
    return;
  }

  if (form.id === 'add-key-form') {
    e.preventDefault();
    const type = document.getElementById('key-type').value;
    const value = document.getElementById('key-value').value.trim();
    if (!value) { toast('Informe o valor da chave.'); return; }
    const icons = { 'E-mail': 'file', 'Celular': 'phone', 'CPF': 'user', 'Aleatória': 'sparkles' };
    state.pixKeys.push({ type, value, icon: icons[type] || 'pix' });
    save();
    closeModal();
    ui.pixTab = 'chaves';
    render();
    toast('Chave Pix cadastrada com sucesso.');
  }
});

/* ---------- Click delegation ---------- */
document.addEventListener('click', e => {
  const nav = e.target.closest('[data-route]');
  if (nav) {
    e.preventDefault();
    go(nav.dataset.route);
    return;
  }
  const el = e.target.closest('[data-action]');
  if (el) {
    const fn = actions[el.dataset.action];
    if (fn) {
      e.preventDefault();
      fn(el);
    }
  }
  if (e.target.classList.contains('modal-backdrop')) closeModal();
  if (!searchLayer.hidden && e.target === searchLayer) closeSearch();
  if (!notifPanel.hidden && !notifPanel.contains(e.target) && !e.target.closest('[data-action="toggle-notifications"]')) {
    closeNotifications();
  }
});

/* Quick amount handlers that live in modals (topup) */
document.addEventListener('click', e => {
  const quick = e.target.closest('[data-action="topup-quick"]');
  if (quick) {
    const input = document.getElementById('topup-amount');
    if (input) input.value = Number(quick.dataset.value).toFixed(2).replace('.', ',');
  }
});

/* ---------- Inputs & keyboard ---------- */
document.addEventListener('input', e => {
  if (e.target.id === 'stmt-search') {
    ui.statementQuery = e.target.value;
    const list = document.getElementById('statement-list');
    if (list) list.innerHTML = statementListHTML();
  }
  if (e.target.id === 'limit-range') {
    const value = Number(e.target.value);
    const label = document.getElementById('limit-value');
    if (label) label.textContent = money(value);
    state.card.limit = value;
    save();
  }
  if (e.target.id === 'search-input') {
    renderSearchResults(e.target.value);
  }
});

searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const first = document.querySelector('#search-results .search-result');
    if (first) first.click();
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (!modalRoot.innerHTML) {
      if (!searchLayer.hidden) closeSearch();
      else if (!notifPanel.hidden) closeNotifications();
    } else {
      closeModal();
    }
  }
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k' && !elApp.hidden) {
    e.preventDefault();
    openSearch();
  }
});

/* ---------- Copy helper ---------- */
async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch { /* fall through */ }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  } catch { return false; }
}

/* ---------- Boot ---------- */
function boot() {
  applyTheme();
  injectIcons(document);
  const authed = localStorage.getItem(AUTH_KEY) !== '0';
  if (authed) {
    elLogin.hidden = true;
    elApp.hidden = false;
    route = parseHash();
    if (!location.hash) history.replaceState(null, '', '#inicio');
    render();
  } else {
    elApp.hidden = true;
    elLogin.hidden = false;
    injectIcons(elLogin);
    setTimeout(() => document.getElementById('login-user')?.focus({ preventScroll: true }), 80);
  }
}

window.addEventListener('hashchange', () => {
  route = parseHash();
  if (!elApp.hidden) {
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

boot();
