import {
  Bank,
  BANK_NAME,
  OWNER_CAPITAL_CENTS,
  accountCode,
  formatBRL,
  formatCPF,
  parseAmount,
} from './bank.js'

const bank = new Bank()

const state = {
  authMode: bank.isConfigured() ? 'login' : 'setup',
  authFlash: null,
  route: 'home',
  statementFilter: 'all',
  balanceVisible: true,
  clientSearch: '',
}

const ICONS = {
  home: '<path d="m3 10 9-7 9 7"/><path d="M5 9v11h14V9"/><path d="M9 20v-6h6v6"/>',
  send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
  list: '<path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  shield: '<path d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3Z"/><path d="m9 12 2 2 4-4"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>',
  copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
  eyeOff: '<path d="m2 2 20 20"/><path d="M6.7 6.7C3.9 8.6 2 12 2 12s3.5 7 10 7c2 0 3.7-.7 5.2-1.7"/><path d="M9.9 4.2A10.5 10.5 0 0 1 12 4c6.5 0 10 7 10 7a17 17 0 0 1-2.4 3.2"/><path d="M14.1 14.1a3 3 0 0 1-4.2-4.2"/>',
  arrowUp: '<path d="M7 17 17 7"/><path d="M7 7h10v10"/>',
  arrowDown: '<path d="M17 7 7 17"/><path d="M17 17H7V7"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  check: '<path d="m20 6-11 11-5-5"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  wallet: '<rect x="3" y="6" width="18" height="14" rx="3"/><path d="M3 10h18"/><circle cx="17" cy="15" r="1"/>',
  trend: '<path d="m3 17 6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  sparkles: '<path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9Z"/><path d="M19 15v4M17 17h4"/>',
  alert: '<path d="M10.3 3.9 2.5 18a2 2 0 0 0 1.7 3h15.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z"/>',
  key: '<circle cx="7.5" cy="15.5" r="4.5"/><path d="m11 12 9-9M15 4l3 3M18 7l2 2"/>',
  chevron: '<path d="m9 18 6-6-6-6"/>',
  card: '<rect x="2" y="5" width="20" height="14" rx="3"/><path d="M2 10h20"/>',
  bank: '<path d="M3 10h18L12 3Z"/><path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8"/><path d="M3 21h18"/>',
}

function icon(name, size = 20, cls = '') {
  return `<svg class="icon ${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ''}</svg>`
}

const escapeHtml = (value = '') =>
  String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character])

const firstName = (name = '') => String(name).trim().split(/\s+/)[0] || ''
const initials = (name = '') => {
  const parts = String(name).trim().split(/\s+/).filter(Boolean)
  if (!parts.length) return '?'
  return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase()
}

const DAY = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short' })
const TIME = new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' })
const LONG_DATE = new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })
const MONTH = new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' })

function dayLabel(iso) {
  const date = new Date(iso)
  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 1)
  if (date.toDateString() === today.toDateString()) return 'Hoje'
  if (date.toDateString() === yesterday.toDateString()) return 'Ontem'
  return DAY.format(date).replace('.', '')
}

function txTime(iso) {
  return TIME.format(new Date(iso))
}

const STATUS = {
  active: { label: 'Ativo', class: 'active' },
  pending: { label: 'Aguardando', class: 'pending' },
  blocked: { label: 'Bloqueado', class: 'blocked' },
}

function statusBadge(status) {
  const info = STATUS[status] || { label: status, class: 'pending' }
  return `<span class="badge badge--${info.class}"><span class="badge__dot"></span>${info.label}</span>`
}

function toast(message, type = 'success') {
  const root = document.getElementById('toast-root')
  if (!root) return
  const element = document.createElement('div')
  element.className = `toast toast--${type}`
  element.setAttribute('role', type === 'error' ? 'alert' : 'status')
  element.innerHTML = `${icon(type === 'error' ? 'alert' : 'check', 18)}<span>${escapeHtml(message)}</span>`
  root.append(element)
  requestAnimationFrame(() => element.classList.add('is-in'))
  setTimeout(() => {
    element.classList.remove('is-in')
    setTimeout(() => element.remove(), 280)
  }, 4200)
}

async function copyText(text, message) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
    } else {
      const area = document.createElement('textarea')
      area.value = text
      area.style.position = 'fixed'
      area.style.opacity = '0'
      document.body.append(area)
      area.select()
      document.execCommand('copy')
      area.remove()
    }
    toast(message)
  } catch {
    toast('Não foi possível copiar. Selecione e copie manualmente.', 'error')
  }
}

function fieldError(form, message) {
  const target = form?.querySelector('[data-error]')
  if (target) {
    target.textContent = message
    target.hidden = false
  }
  toast(message, 'error')
}

function clearError(form) {
  const target = form?.querySelector('[data-error]')
  if (target) {
    target.hidden = true
    target.textContent = ''
  }
}

function setBusy(button, busy) {
  if (!button) return
  if (busy) {
    button.dataset.label = button.innerHTML
    button.disabled = true
    button.innerHTML = '<span class="spinner" aria-hidden="true"></span> Processando'
  } else {
    button.disabled = false
    if (button.dataset.label) button.innerHTML = button.dataset.label
  }
}

function brand(compact = false) {
  return `
    <div class="brand ${compact ? 'brand--compact' : ''}">
      <span class="brand__mark">L</span>
      <span class="brand__text">
        <strong>Lidec Capital</strong>
        <small>${compact ? 'Banco digital' : 'Private banking experience'}</small>
      </span>
    </div>`
}

function authShell(card) {
  const showTabs = state.authMode !== 'setup'
  return `
    <div class="auth">
      <section class="auth__hero">
        <div class="auth__hero-top">${brand()}</div>
        <div class="auth__hero-body">
          <p class="eyebrow eyebrow--light">Banco Lidec Capital</p>
          <h1>O seu banco.<br /><em>Sob o seu comando.</em></h1>
          <p class="auth__lead">Uma experiência bancária privada para o proprietário e seus clientes. Cadastro aprovado, saldo protegido e controle total na mesma plataforma.</p>
          <ul class="auth__features">
            <li><span>${icon('shield', 18)}</span><div><strong>Proprietário único</strong><small>Aprovação e gestão de todos os clientes.</small></div></li>
            <li><span>${icon('send', 18)}</span><div><strong>Transferências instantâneas</strong><small>Movimente valores entre contas em segundos.</small></div></li>
            <li><span>${icon('list', 18)}</span><div><strong>Extrato completo</strong><small>Cada entrada e saída registrada no navegador.</small></div></li>
          </ul>
        </div>
        <div class="auth__hero-footer">
          <span class="status-dot"></span>
          Ambiente de demonstração · seus dados ficam somente neste navegador
        </div>
      </section>
      <section class="auth__panel">
        <div class="auth__panel-inner">
          <div class="auth-card">
            ${showTabs ? `
              <div class="auth-tabs" role="tablist" aria-label="Acesso ao banco">
                <button class="auth-tabs__item ${state.authMode === 'login' ? 'is-active' : ''}" data-auth-mode="login" role="tab" aria-selected="${state.authMode === 'login'}">Entrar</button>
                <button class="auth-tabs__item ${state.authMode === 'register' ? 'is-active' : ''}" data-auth-mode="register" role="tab" aria-selected="${state.authMode === 'register'}">Abrir conta</button>
              </div>` : ''}
            ${card}
          </div>
          <p class="auth__legal">Aplicativo de demonstração. Nenhum valor é real e os dados são armazenados apenas neste dispositivo.</p>
        </div>
      </section>
    </div>`
}

function loginView() {
  return `
    <div class="auth-card__head">
      <p class="eyebrow">Acesso seguro</p>
      <h2>Entrar na sua conta</h2>
      <p>Use o e-mail e a senha do seu cadastro.</p>
    </div>
    ${state.authFlash ? `<div class="flash flash--${state.authFlash.type}">${icon('check', 18)}<span>${escapeHtml(state.authFlash.message)}</span></div>` : ''}
    <form id="login-form" class="form" novalidate>
      <label class="field">
        <span class="field__label">E-mail</span>
        <span class="input-wrap">
          <span class="input-icon">${icon('mail', 18)}</span>
          <input type="email" name="email" autocomplete="email" placeholder="voce@email.com" required />
        </span>
      </label>
      <label class="field">
        <span class="field__label">Senha</span>
        <span class="input-wrap">
          <span class="input-icon">${icon('lock', 18)}</span>
          <input type="password" name="password" autocomplete="current-password" placeholder="Sua senha" required />
          <button type="button" class="input-reveal" data-action="toggle-password" aria-label="Mostrar senha">${icon('eye', 18)}</button>
        </span>
      </label>
      <div class="form-error" data-error hidden></div>
      <button class="btn btn--primary btn--block" type="submit">Entrar</button>
    </form>
    <p class="auth-card__switch">Ainda não tem conta? <button class="link" data-auth-mode="register">Abrir minha conta</button></p>`
}

function setupView() {
  return `
    <div class="auth-card__head">
      <p class="eyebrow">Primeiro acesso</p>
      <h2>Configure o seu banco</h2>
      <p>Crie a conta do proprietário. Ela será a única com acesso ao painel de gestão.</p>
    </div>
    <div class="callout callout--gold">
      ${icon('key', 20)}
      <p><strong>Proprietário único.</strong> Você aprova clientes, bloqueia contas e realiza créditos. Capital inicial de demonstração: <strong>${formatBRL(OWNER_CAPITAL_CENTS)}</strong>.</p>
    </div>
    <form id="setup-form" class="form" novalidate>
      <label class="field">
        <span class="field__label">Nome completo</span>
        <span class="input-wrap"><span class="input-icon">${icon('user', 18)}</span><input name="name" autocomplete="name" placeholder="Seu nome completo" required /></span>
      </label>
      <div class="field-row">
        <label class="field">
          <span class="field__label">CPF</span>
          <span class="input-wrap"><span class="input-icon">${icon('card', 18)}</span><input name="cpf" inputmode="numeric" data-cpf placeholder="000.000.000-00" maxlength="14" required /></span>
        </label>
        <label class="field">
          <span class="field__label">Telefone <small>(opcional)</small></span>
          <span class="input-wrap"><span class="input-icon">${icon('phone', 18)}</span><input name="phone" inputmode="tel" placeholder="(11) 90000-0000" /></span>
        </label>
      </div>
      <label class="field">
        <span class="field__label">E-mail</span>
        <span class="input-wrap"><span class="input-icon">${icon('mail', 18)}</span><input type="email" name="email" autocomplete="email" placeholder="voce@email.com" required /></span>
      </label>
      <div class="field-row">
        <label class="field">
          <span class="field__label">Senha</span>
          <span class="input-wrap"><span class="input-icon">${icon('lock', 18)}</span><input type="password" name="password" autocomplete="new-password" placeholder="Mínimo 6 caracteres" required /></span>
        </label>
        <label class="field">
          <span class="field__label">Confirmar senha</span>
          <span class="input-wrap"><span class="input-icon">${icon('lock', 18)}</span><input type="password" name="confirm" autocomplete="new-password" placeholder="Repita a senha" required /></span>
        </label>
      </div>
      <div class="form-error" data-error hidden></div>
      <button class="btn btn--primary btn--block" type="submit">Criar conta do proprietário</button>
    </form>`
}

function registerView() {
  return `
    <div class="auth-card__head">
      <p class="eyebrow">Nova conta</p>
      <h2>Abrir minha conta</h2>
      <p>Preencha seus dados. O proprietário do banco aprova cada novo cadastro.</p>
    </div>
    <form id="register-form" class="form" novalidate>
      <label class="field">
        <span class="field__label">Nome completo</span>
        <span class="input-wrap"><span class="input-icon">${icon('user', 18)}</span><input name="name" autocomplete="name" placeholder="Seu nome completo" required /></span>
      </label>
      <div class="field-row">
        <label class="field">
          <span class="field__label">CPF</span>
          <span class="input-wrap"><span class="input-icon">${icon('card', 18)}</span><input name="cpf" inputmode="numeric" data-cpf placeholder="000.000.000-00" maxlength="14" required /></span>
        </label>
        <label class="field">
          <span class="field__label">Telefone <small>(opcional)</small></span>
          <span class="input-wrap"><span class="input-icon">${icon('phone', 18)}</span><input name="phone" inputmode="tel" placeholder="(11) 90000-0000" /></span>
        </label>
      </div>
      <label class="field">
        <span class="field__label">E-mail</span>
        <span class="input-wrap"><span class="input-icon">${icon('mail', 18)}</span><input type="email" name="email" autocomplete="email" placeholder="voce@email.com" required /></span>
      </label>
      <div class="field-row">
        <label class="field">
          <span class="field__label">Senha</span>
          <span class="input-wrap"><span class="input-icon">${icon('lock', 18)}</span><input type="password" name="password" autocomplete="new-password" placeholder="Mínimo 6 caracteres" required /></span>
        </label>
        <label class="field">
          <span class="field__label">Confirmar senha</span>
          <span class="input-wrap"><span class="input-icon">${icon('lock', 18)}</span><input type="password" name="confirm" autocomplete="new-password" placeholder="Repita a senha" required /></span>
        </label>
      </div>
      <div class="form-error" data-error hidden></div>
      <button class="btn btn--primary btn--block" type="submit">Enviar cadastro</button>
    </form>
    <div class="callout callout--soft">${icon('clock', 18)}<p>Após o envio, seu acesso será liberado assim que o proprietário aprovar a conta.</p></div>
    <p class="auth-card__switch">Já tem conta? <button class="link" data-auth-mode="login">Entrar</button></p>`
}

function renderAuth() {
  const view = state.authMode === 'setup'
    ? setupView()
    : state.authMode === 'register'
      ? registerView()
      : loginView()
  document.getElementById('app').innerHTML = authShell(view)
  const firstInput = document.querySelector('.auth-card input')
  if (firstInput && window.innerWidth > 900) firstInput.focus({ preventScroll: true })
}

const NAV = {
  owner: [
    { route: 'dashboard', label: 'Painel', icon: 'home' },
    { route: 'clients', label: 'Clientes', icon: 'users' },
    { route: 'transfer', label: 'Transferir', icon: 'send' },
    { route: 'statement', label: 'Extrato do banco', icon: 'list' },
  ],
  customer: [
    { route: 'home', label: 'Início', icon: 'home' },
    { route: 'transfer', label: 'Transferir', icon: 'send' },
    { route: 'statement', label: 'Extrato', icon: 'list' },
  ],
}

const TITLES = {
  home: 'Início',
  dashboard: 'Painel do proprietário',
  clients: 'Clientes',
  transfer: 'Transferir',
  statement: 'Extrato',
}

function navFor(role) {
  return NAV[role === 'owner' ? 'owner' : 'customer']
}

function renderApp() {
  const user = bank.currentUser()
  if (!user) {
    state.authMode = 'login'
    renderAuth()
    return
  }
  const isOwner = user.role === 'owner'
  const account = bank.accountFor(user.id)
  const items = navFor(user.role)
  if (!items.some((item) => item.route === state.route)) state.route = items[0].route
  const view = renderView(user, account, isOwner)
  const roleLabel = isOwner ? 'Proprietário' : 'Cliente'
  const navHtml = items.map((item) => `
    <button class="nav__item ${state.route === item.route ? 'is-active' : ''}" data-nav="${item.route}">
      ${icon(item.icon, 20)}<span>${item.label}</span>
    </button>`).join('')

  document.getElementById('app').innerHTML = `
    <div class="app">
      <div class="app__scrim" data-action="close-menu"></div>
      <aside class="sidebar">
        <div class="sidebar__brand">${brand(true)}</div>
        <div class="sidebar__account">
          <p class="sidebar__label">Conta ${isOwner ? 'principal' : 'digital'}</p>
          <p class="sidebar__account-name">${escapeHtml(accountCode(account))}</p>
          <p class="sidebar__account-balance">${formatBRL(account ? account.balanceCents : 0)}</p>
        </div>
        <nav class="nav" aria-label="Menu principal">
          <p class="nav__label">Menu</p>
          ${navHtml}
        </nav>
        <div class="sidebar__footer">
          <div class="user-chip">
            <span class="avatar avatar--gold">${escapeHtml(initials(user.name))}</span>
            <div><strong>${escapeHtml(user.name)}</strong><small>${roleLabel}</small></div>
          </div>
          <button class="sidebar__logout" data-action="logout">${icon('logout', 18)}<span>Sair</span></button>
          <p class="sidebar__note">Demonstração · dados locais</p>
        </div>
      </aside>
      <div class="app__main">
        <header class="topbar">
          <button class="menu-toggle" data-action="open-menu" aria-label="Abrir menu">${icon('menu', 22)}</button>
          <div class="topbar__title">
            <span class="topbar__date">${LONG_DATE.format(new Date())}</span>
            <h2>${TITLES[state.route] || 'Início'}</h2>
          </div>
          <div class="topbar__right">
            <span class="role-pill">${icon(isOwner ? 'shield' : 'wallet', 15)}${roleLabel}</span>
            <span class="avatar">${escapeHtml(initials(user.name))}</span>
          </div>
        </header>
        <main class="content">${view}</main>
      </div>
    </div>`
}

function renderView(user, account, isOwner) {
  switch (state.route) {
    case 'dashboard':
      return isOwner ? ownerDashboard(user, account) : homeView(user, account)
    case 'clients':
      return isOwner ? clientsView() : homeView(user, account)
    case 'transfer':
      return transferView(user, account, isOwner)
    case 'statement':
      return statementView(user, isOwner)
    default:
      return isOwner ? ownerDashboard(user, account) : homeView(user, account)
  }
}

function pageHead(eyebrow, title, subtitle, actions = '') {
  return `
    <div class="page-head">
      <div>
        <p class="eyebrow">${eyebrow}</p>
        <h1>${title}</h1>
        <p class="muted">${subtitle}</p>
      </div>
      ${actions ? `<div class="page-actions">${actions}</div>` : ''}
    </div>`
}

function homeView(user, account) {
  const transactions = bank.transactionsFor(user.id)
  const now = new Date()
  const monthTx = transactions.filter((tx) => {
    const date = new Date(tx.createdAt)
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
  })
  const incoming = monthTx.filter((tx) => tx.direction === 'in').reduce((total, tx) => total + tx.amountCents, 0)
  const outgoing = monthTx.filter((tx) => tx.direction === 'out').reduce((total, tx) => total + tx.amountCents, 0)
  const balance = account ? account.balanceCents : 0
  const visible = state.balanceVisible
  return `
    <section class="view">
      ${pageHead(
        'Visão geral',
        `Olá, ${escapeHtml(firstName(user.name))}`,
        `${MONTH.format(now)} · sua conta está ${user.status === 'active' ? 'ativa' : 'indisponível'}`,
        `<button class="btn btn--ghost" data-action="copy-pix">${icon('copy', 17)} Copiar chave PIX</button>
         <button class="btn btn--primary" data-nav="transfer">${icon('send', 17)} Transferir</button>`,
      )}
      <div class="home-grid">
        <article class="balance-card">
          <div class="balance-card__orb"></div>
          <div class="balance-card__head">
            <span>Saldo disponível</span>
            <button class="icon-btn icon-btn--light" data-action="toggle-balance" aria-label="${visible ? 'Ocultar saldo' : 'Mostrar saldo'}">${icon(visible ? 'eye' : 'eyeOff', 18)}</button>
          </div>
          <p class="balance-card__value">${visible ? formatBRL(balance) : 'R$ ••••••'}</p>
          <div class="balance-card__meta">
            <span>${escapeHtml(accountCode(account))}</span>
            <span>PIX · ${escapeHtml(user.email)}</span>
          </div>
          <div class="balance-card__foot">
            <div class="chip-mark">${icon('bank', 18)}<span>LIDEC<br /><small>CAPITAL</small></span></div>
            <span class="balance-card__tag">Conta digital</span>
          </div>
        </article>
        <aside class="quick-card">
          <div class="quick-card__head"><h3>Ações rápidas</h3>${icon('sparkles', 18)}</div>
          <button class="quick-action" data-nav="transfer"><span class="quick-action__icon">${icon('send', 19)}</span><div><strong>Transferir</strong><small>Envie para outra conta</small></div>${icon('chevron', 16)}</button>
          <button class="quick-action" data-nav="statement"><span class="quick-action__icon">${icon('list', 19)}</span><div><strong>Ver extrato</strong><small>Todas as movimentações</small></div>${icon('chevron', 16)}</button>
          <button class="quick-action" data-action="copy-account"><span class="quick-action__icon">${icon('key', 19)}</span><div><strong>Copiar conta</strong><small>Agência e número</small></div>${icon('chevron', 16)}</button>
        </aside>
      </div>
      <div class="stats-row">
        <article class="mini-stat">
          <span class="mini-stat__icon mini-stat__icon--in">${icon('arrowDown', 18)}</span>
          <div><span>Entradas no mês</span><strong>${formatBRL(incoming)}</strong></div>
        </article>
        <article class="mini-stat">
          <span class="mini-stat__icon mini-stat__icon--out">${icon('arrowUp', 18)}</span>
          <div><span>Saídas no mês</span><strong>${formatBRL(outgoing)}</strong></div>
        </article>
        <article class="mini-stat">
          <span class="mini-stat__icon mini-stat__icon--neutral">${icon('trend', 18)}</span>
          <div><span>Movimentações</span><strong>${transactions.length}</strong></div>
        </article>
      </div>
      <section class="card">
        <div class="card__head">
          <div><h3>Movimentações recentes</h3><p>Últimos lançamentos da sua conta</p></div>
          <button class="link" data-nav="statement">Ver extrato completo ${icon('chevron', 15)}</button>
        </div>
        ${txList(transactions.slice(0, 5))}
      </section>
    </section>`
}

function ownerDashboard(user, account) {
  const metrics = bank.metrics()
  const customers = bank.customers()
  const pending = customers.filter((customer) => customer.status === 'pending')
  const transactions = bank.allTransactions().slice(0, 6)
  return `
    <section class="view">
      ${pageHead(
        'Visão do banco',
        `Olá, ${escapeHtml(firstName(user.name))}`,
        'Controle de clientes, aprovações e capital do banco.',
        `<button class="btn btn--ghost" data-nav="clients">${icon('users', 17)} Gerenciar clientes</button>
         <button class="btn btn--primary" data-nav="transfer">${icon('send', 17)} Transferir</button>`,
      )}
      <div class="stats-grid">
        <article class="stat-card">
          <span class="stat-card__icon">${icon('users', 20)}</span>
          <p>Clientes ativos</p>
          <strong>${metrics.activeCustomers}</strong>
          <small>${metrics.customers} cadastrados no banco</small>
        </article>
        <article class="stat-card stat-card--gold">
          <span class="stat-card__icon">${icon('clock', 20)}</span>
          <p>Aguardando aprovação</p>
          <strong>${metrics.pending}</strong>
          <small>${metrics.pending === 1 ? 'cadastro pendente' : 'cadastros pendentes'}</small>
        </article>
        <article class="stat-card">
          <span class="stat-card__icon">${icon('wallet', 20)}</span>
          <p>Custódia dos clientes</p>
          <strong class="stat-card__money">${formatBRL(metrics.custodyCents)}</strong>
          <small>saldo total dos clientes</small>
        </article>
        <article class="stat-card">
          <span class="stat-card__icon">${icon('trend', 20)}</span>
          <p>Volume transferido</p>
          <strong class="stat-card__money">${formatBRL(metrics.totalMovedCents)}</strong>
          <small>${metrics.transfers} ${metrics.transfers === 1 ? 'transferência realizada' : 'transferências realizadas'}</small>
        </article>
      </div>
      <div class="admin-grid">
        <section class="card">
          <div class="card__head">
            <div><h3>Aprovações pendentes</h3><p>Libere o acesso de novos clientes</p></div>
            <span class="count-pill">${pending.length}</span>
          </div>
          ${pending.length ? `<div class="pending-list">${pending.map(pendingRow).join('')}</div>` : emptyState('shield', 'Tudo em ordem', 'Nenhum cadastro aguardando aprovação.' )}
        </section>
        <aside class="owner-card">
          <p class="eyebrow eyebrow--light">Conta do proprietário</p>
          <p class="owner-card__label">Capital disponível</p>
          <p class="owner-card__value">${formatBRL(account ? account.balanceCents : 0)}</p>
          <div class="owner-card__meta">
            <span>${escapeHtml(accountCode(account))}</span>
            <span>${icon('shield', 14)} Proprietário único</span>
          </div>
          <button class="btn btn--gold btn--block" data-nav="transfer">${icon('send', 17)} Movimentar capital</button>
        </aside>
      </div>
      <section class="card">
        <div class="card__head">
          <div><h3>Últimas movimentações do banco</h3><p>Todos os lançamentos entre contas</p></div>
          <button class="link" data-nav="statement">Ver extrato do banco ${icon('chevron', 15)}</button>
        </div>
        ${txList(transactions, { ownerView: true })}
      </section>
    </section>`
}

function pendingRow(customer) {
  return `
    <div class="pending">
      <span class="avatar avatar--cream">${escapeHtml(initials(customer.name))}</span>
      <div class="pending__main">
        <strong>${escapeHtml(customer.name)}</strong>
        <span>${escapeHtml(customer.email)} · CPF ${escapeHtml(formatCPF(customer.cpf))}</span>
      </div>
      <div class="pending__actions">
        <button class="btn btn--small btn--ghost" data-action="reject" data-user-id="${escapeHtml(customer.id)}">${icon('x', 15)} Recusar</button>
        <button class="btn btn--small btn--primary" data-action="approve" data-user-id="${escapeHtml(customer.id)}">${icon('check', 15)} Aprovar</button>
      </div>
    </div>`
}

function clientsView() {
  const customers = bank.customers()
  const query = state.clientSearch.trim().toLowerCase()
  const filtered = customers.filter((customer) => {
    if (!query) return true
    const digits = query.replace(/\D/g, '')
    return customer.name.toLowerCase().includes(query)
      || customer.email.includes(query)
      || (digits.length > 0 && customer.cpf.includes(digits))
      || (digits.length > 0 && customer.account && customer.account.number.includes(digits))
  })
  return `
    <section class="view">
      ${pageHead(
        'Gestão',
        'Clientes do banco',
        'Aprove cadastros, consulte saldos e controle cada conta.',
        `<button class="btn btn--ghost" data-nav="dashboard">${icon('home', 17)} Voltar ao painel</button>`,
      )}
      <section class="card">
        <div class="toolbar">
          <label class="search">
            ${icon('search', 17)}
            <input type="search" id="client-search" value="${escapeHtml(state.clientSearch)}" placeholder="Buscar por nome, e-mail, CPF ou conta" autocomplete="off" />
          </label>
          <span class="toolbar__count">${filtered.length} ${filtered.length === 1 ? 'cliente' : 'clientes'}</span>
        </div>
        ${filtered.length ? `
          <div class="table-wrap">
            <table class="table">
              <thead>
                <tr><th>Cliente</th><th>Conta</th><th>Saldo</th><th>Status</th><th class="table__actions">Ações</th></tr>
              </thead>
              <tbody>${filtered.map(clientRow).join('')}</tbody>
            </table>
          </div>` : emptyState('search', 'Nenhum cliente encontrado', query ? 'Tente outro termo de busca.' : 'Os clientes aparecerão aqui após o cadastro.')}
      </section>
    </section>`
}

function clientRow(customer) {
  const account = customer.account
  const actions = []
  if (customer.status === 'pending') {
    actions.push(`<button class="btn btn--tiny btn--ghost" data-action="reject" data-user-id="${escapeHtml(customer.id)}">${icon('x', 14)} Recusar</button>`)
    actions.push(`<button class="btn btn--tiny btn--primary" data-action="approve" data-user-id="${escapeHtml(customer.id)}">${icon('check', 14)} Aprovar</button>`)
  } else {
    actions.push(`<button class="btn btn--tiny btn--ghost" data-action="credit" data-user-id="${escapeHtml(customer.id)}">${icon('plus', 14)} Creditar</button>`)
    if (customer.status === 'active') {
      actions.push(`<button class="icon-btn" data-action="block" data-user-id="${escapeHtml(customer.id)}" title="Bloquear cliente" aria-label="Bloquear ${escapeHtml(customer.name)}">${icon('lock', 16)}</button>`)
    } else {
      actions.push(`<button class="icon-btn" data-action="unblock" data-user-id="${escapeHtml(customer.id)}" title="Desbloquear cliente" aria-label="Desbloquear ${escapeHtml(customer.name)}">${icon('check', 16)}</button>`)
    }
  }
  return `
    <tr>
      <td>
        <div class="person">
          <span class="avatar avatar--cream">${escapeHtml(initials(customer.name))}</span>
          <div><strong>${escapeHtml(customer.name)}</strong><span>${escapeHtml(customer.email)}</span></div>
        </div>
      </td>
      <td class="mono">${escapeHtml(accountCode(account))}</td>
      <td class="mono">${formatBRL(account ? account.balanceCents : 0)}</td>
      <td>${statusBadge(customer.status)}</td>
      <td class="table__actions"><div class="row-actions">${actions.join('')}</div></td>
    </tr>`
}

function transferView(user, account, isOwner) {
  return `
    <section class="view">
      ${pageHead(
        'Movimentação',
        isOwner ? 'Transferir capital' : 'Transferir dinheiro',
        'Envie valores para outra conta do Banco Lidec Capital.',
      )}
      <div class="transfer-grid">
        <form id="transfer-form" class="card form" novalidate>
          <div class="card__head card__head--flush">
            <div><h3>Nova transferência</h3><p>O valor sai na hora da sua conta.</p></div>
            <span class="card__icon">${icon('send', 20)}</span>
          </div>
          <label class="field">
            <span class="field__label">Destinatário</span>
            <span class="input-wrap"><span class="input-icon">${icon('user', 18)}</span><input name="target" placeholder="E-mail, CPF ou número da conta" required autocomplete="off" /></span>
            <span class="field__hint">A conta precisa estar ativa e aprovada pelo proprietário.</span>
          </label>
          <label class="field">
            <span class="field__label">Valor</span>
            <span class="input-wrap input-wrap--money">
              <span class="input-prefix">R$</span>
              <input name="amount" inputmode="decimal" placeholder="0,00" required autocomplete="off" />
            </span>
          </label>
          <label class="field">
            <span class="field__label">Descrição <small>(opcional)</small></span>
            <span class="input-wrap"><span class="input-icon">${icon('list', 18)}</span><input name="description" placeholder="Ex.: aluguel, presente, serviço" maxlength="80" autocomplete="off" /></span>
          </label>
          <div class="form-error" data-error hidden></div>
          <button class="btn btn--primary btn--block" type="submit">Transferir agora</button>
        </form>
        <aside class="transfer-side">
          <div class="card balance-mini">
            <p class="eyebrow">Saldo disponível</p>
            <p class="balance-mini__value">${formatBRL(account ? account.balanceCents : 0)}</p>
            <p class="muted">${escapeHtml(accountCode(account))}</p>
            <div class="balance-mini__line"></div>
            <p class="balance-mini__pix">Sua chave PIX<br /><strong>${escapeHtml(user.email)}</strong></p>
            <button class="link" data-action="copy-pix">${icon('copy', 15)} Copiar chave</button>
          </div>
          <div class="card tips">
            <div class="tips__head">${icon('shield', 18)}<h3>Transferência segura</h3></div>
            <ul>
              <li>Confira o destinatário antes de confirmar.</li>
              <li>O saldo é validado em tempo real.</li>
              <li>Você não pode transferir para a própria conta.</li>
            </ul>
          </div>
        </aside>
      </div>
    </section>`
}

function statementView(user, isOwner) {
  const source = isOwner ? bank.allTransactions() : bank.transactionsFor(user.id)
  const filtered = source.filter((tx) => {
    if (state.statementFilter === 'all') return true
    if (isOwner) return tx.kind === state.statementFilter
    return tx.direction === state.statementFilter
  })
  const filters = isOwner
    ? [['all', 'Tudo'], ['transfer', 'Transferências'], ['credit', 'Créditos'], ['capital', 'Capital']]
    : [['all', 'Tudo'], ['in', 'Entradas'], ['out', 'Saídas']]
  return `
    <section class="view">
      ${pageHead(
        isOwner ? 'Banco completo' : 'Sua conta',
        isOwner ? 'Extrato do banco' : 'Extrato',
        isOwner ? 'Todos os lançamentos registrados no Banco Lidec Capital.' : 'Acompanhe cada entrada e saída da sua conta.',
        `<button class="btn btn--ghost" data-action="${isOwner ? 'copy-account' : 'copy-pix'}">${icon('copy', 17)} ${isOwner ? 'Copiar conta' : 'Copiar chave PIX'}</button>`,
      )}
      <section class="card">
        <div class="filter-row">
          ${filters.map(([value, label]) => `<button class="chip ${state.statementFilter === value ? 'is-active' : ''}" data-filter="${value}">${label}</button>`).join('')}
          <span class="filter-row__count">${filtered.length} ${filtered.length === 1 ? 'lançamento' : 'lançamentos'}</span>
        </div>
        ${filtered.length ? txList(filtered, { grouped: true, ownerView: isOwner }) : emptyState('list', 'Nenhum lançamento', 'As movimentações aparecerão aqui conforme o banco for usado.')}
      </section>
    </section>`
}

function txList(transactions, { grouped = false, ownerView = false } = {}) {
  if (!transactions.length) {
    return emptyState('wallet', 'Sem movimentações', 'Quando houver uma entrada ou saída, ela aparecerá aqui.')
  }
  if (!grouped) return `<div class="tx-list">${transactions.map((tx) => txRow(tx, ownerView)).join('')}</div>`
  const groups = new Map()
  for (const tx of transactions) {
    const key = new Date(tx.createdAt).toDateString()
    if (!groups.has(key)) groups.set(key, { label: dayLabel(tx.createdAt), items: [] })
    groups.get(key).items.push(tx)
  }
  return Array.from(groups.values()).map((group) => `
    <div class="tx-group">
      <p class="tx-group__label">${escapeHtml(group.label)}</p>
      <div class="tx-list">${group.items.map((tx) => txRow(tx, ownerView)).join('')}</div>
    </div>`).join('')
}

function txRow(tx, ownerView = false) {
  const incoming = tx.direction === 'in'
  const title = tx.description || (incoming ? 'Entrada' : 'Saída')
  let subtitle
  let tone
  if (ownerView) {
    subtitle = `${tx.fromLabel} → ${tx.toLabel} · ${txTime(tx.createdAt)}`
    tone = 'neutral'
  } else {
    subtitle = `${incoming ? 'De' : 'Para'} ${tx.counterparty} · ${txTime(tx.createdAt)}`
    tone = incoming ? 'in' : 'out'
  }
  const sign = ownerView ? '' : incoming ? '+' : '−'
  return `
    <div class="tx">
      <span class="tx__icon tx__icon--${tone}">${icon(ownerView ? 'trend' : incoming ? 'arrowDown' : 'arrowUp', 18)}</span>
      <div class="tx__main">
        <strong>${escapeHtml(title)}</strong>
        <span>${escapeHtml(subtitle)}</span>
      </div>
      <span class="tx__amount tx__amount--${tone}">${sign} ${formatBRL(tx.amountCents)}</span>
    </div>`
}

function emptyState(iconName, title, text) {
  return `<div class="empty">${icon(iconName, 26)}<strong>${escapeHtml(title)}</strong><span>${escapeHtml(text)}</span></div>`
}

function openCreditModal(customer) {
  const account = customer.account
  const existing = document.querySelector('.modal-backdrop')
  if (existing) existing.remove()
  const wrapper = document.createElement('div')
  wrapper.className = 'modal-backdrop'
  wrapper.dataset.action = 'modal-close'
  wrapper.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="credit-title" data-stop>
      <div class="modal__head">
        <div>
          <p class="eyebrow">Crédito do proprietário</p>
          <h3 id="credit-title">Creditar ${escapeHtml(firstName(customer.name))}</h3>
        </div>
        <button class="icon-btn" data-action="modal-close" aria-label="Fechar">${icon('x', 18)}</button>
      </div>
      <div class="modal__person">
        <span class="avatar avatar--cream">${escapeHtml(initials(customer.name))}</span>
        <div><strong>${escapeHtml(customer.name)}</strong><span>${escapeHtml(accountCode(account))} · Saldo ${formatBRL(account ? account.balanceCents : 0)}</span></div>
      </div>
      <form id="credit-form" class="form" novalidate data-user-id="${escapeHtml(customer.id)}">
        <label class="field">
          <span class="field__label">Valor do crédito</span>
          <span class="input-wrap input-wrap--money">
            <span class="input-prefix">R$</span>
            <input name="amount" inputmode="decimal" placeholder="0,00" required autocomplete="off" />
          </span>
        </label>
        <label class="field">
          <span class="field__label">Descrição <small>(opcional)</small></span>
          <span class="input-wrap"><span class="input-icon">${icon('list', 18)}</span><input name="description" placeholder="Ex.: depósito inicial" maxlength="80" autocomplete="off" /></span>
        </label>
        <div class="form-error" data-error hidden></div>
        <div class="modal__actions">
          <button class="btn btn--ghost" type="button" data-action="modal-close">Cancelar</button>
          <button class="btn btn--primary" type="submit">${icon('plus', 17)} Creditar</button>
        </div>
      </form>
    </div>`
  document.body.append(wrapper)
  requestAnimationFrame(() => wrapper.classList.add('is-open'))
  setTimeout(() => wrapper.querySelector('input[name="amount"]')?.focus(), 60)
}

function closeModal() {
  const modal = document.querySelector('.modal-backdrop')
  if (!modal) return
  modal.classList.remove('is-open')
  setTimeout(() => modal.remove(), 180)
}

function go(route) {
  state.route = route
  document.querySelector('.app')?.classList.remove('nav-open')
  renderApp()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function handleAction(action, element) {
  const userId = element.dataset.userId
  switch (action) {
    case 'logout':
      bank.logout()
      state.authMode = 'login'
      state.authFlash = null
      state.statementFilter = 'all'
      state.clientSearch = ''
      state.route = 'home'
      renderAuth()
      toast('Sessão encerrada com segurança.')
      break
    case 'toggle-balance':
      state.balanceVisible = !state.balanceVisible
      renderApp()
      break
    case 'copy-pix': {
      const user = bank.currentUser()
      if (user) copyText(user.email, 'Chave PIX copiada.')
      break
    }
    case 'copy-account': {
      const user = bank.currentUser()
      const account = user ? bank.accountFor(user.id) : null
      if (account && user) copyText(`${accountCode(account)} · ${user.name}`, 'Dados da conta copiados.')
      break
    }
    case 'open-menu':
      document.querySelector('.app')?.classList.add('nav-open')
      break
    case 'close-menu':
      document.querySelector('.app')?.classList.remove('nav-open')
      break
    case 'approve':
      try {
        const customer = bank.approveCustomer(userId)
        toast(`Cadastro de ${firstName(customer.name)} aprovado. A conta já pode ser acessada.`)
        renderApp()
      } catch (error) {
        toast(error.message, 'error')
      }
      break
    case 'reject':
      try {
        const customer = bank.rejectCustomer(userId)
        toast(`Cadastro de ${firstName(customer.name)} recusado.`, 'error')
        renderApp()
      } catch (error) {
        toast(error.message, 'error')
      }
      break
    case 'block':
      try {
        const customer = bank.setCustomerBlocked(userId, true)
        toast(`Conta de ${firstName(customer.name)} bloqueada.`)
        renderApp()
      } catch (error) {
        toast(error.message, 'error')
      }
      break
    case 'unblock':
      try {
        const customer = bank.setCustomerBlocked(userId, false)
        toast(`Conta de ${firstName(customer.name)} desbloqueada.`)
        renderApp()
      } catch (error) {
        toast(error.message, 'error')
      }
      break
    case 'credit': {
      const customer = bank.customers().find((item) => item.id === userId)
      if (customer) openCreditModal(customer)
      break
    }
    case 'modal-close':
      closeModal()
      break
    case 'toggle-password': {
      const input = element.closest('.input-wrap')?.querySelector('input')
      if (!input) break
      const reveal = input.type === 'password'
      input.type = reveal ? 'text' : 'password'
      element.innerHTML = icon(reveal ? 'eyeOff' : 'eye', 18)
      element.setAttribute('aria-label', reveal ? 'Ocultar senha' : 'Mostrar senha')
      break
    }
    default:
      break
  }
}

document.addEventListener('click', (event) => {
  const stop = event.target.closest('[data-stop]')
  if (stop) event.stopPropagation()
  const authMode = event.target.closest('[data-auth-mode]')
  if (authMode) {
    state.authMode = authMode.dataset.authMode
    state.authFlash = null
    renderAuth()
    return
  }
  const nav = event.target.closest('[data-nav]')
  if (nav) {
    go(nav.dataset.nav)
    return
  }
  const filter = event.target.closest('[data-filter]')
  if (filter) {
    state.statementFilter = filter.dataset.filter
    renderApp()
    return
  }
  const action = event.target.closest('[data-action]')
  if (action) {
    if (action.classList.contains('modal-backdrop') && event.target !== action) return
    handleAction(action.dataset.action, action)
  }
})

document.addEventListener('submit', async (event) => {
  const form = event.target
  if (!(form instanceof HTMLFormElement)) return
  if (!['login-form', 'register-form', 'setup-form', 'transfer-form', 'credit-form'].includes(form.id)) return
  event.preventDefault()
  clearError(form)
  const button = form.querySelector('button[type="submit"]')
  setBusy(button, true)
  const data = new FormData(form)
  try {
    if (form.id === 'login-form') {
      const user = await bank.login(data.get('email'), data.get('password'))
      state.authFlash = null
      state.statementFilter = 'all'
      state.route = user.role === 'owner' ? 'dashboard' : 'home'
      renderApp()
      toast(`Bem-vindo de volta, ${firstName(user.name)}.`)
    } else if (form.id === 'setup-form') {
      const password = String(data.get('password') || '')
      if (password !== String(data.get('confirm') || '')) throw new Error('As senhas não conferem.')
      const owner = await bank.setupOwner({
        name: data.get('name'),
        cpf: data.get('cpf'),
        phone: data.get('phone'),
        email: data.get('email'),
        password,
      })
      state.route = 'dashboard'
      renderApp()
      toast(`Banco configurado. Bem-vindo, ${firstName(owner.name)}.`)
    } else if (form.id === 'register-form') {
      const password = String(data.get('password') || '')
      if (password !== String(data.get('confirm') || '')) throw new Error('As senhas não conferem.')
      const { user } = await bank.registerCustomer({
        name: data.get('name'),
        cpf: data.get('cpf'),
        phone: data.get('phone'),
        email: data.get('email'),
        password,
      })
      state.authMode = 'login'
      state.authFlash = {
        type: 'success',
        message: `Cadastro de ${firstName(user.name)} enviado! Aguarde a aprovação do proprietário para entrar.`,
      }
      renderAuth()
      toast('Cadastro enviado para aprovação.')
    } else if (form.id === 'transfer-form') {
      const amountCents = parseAmount(data.get('amount'))
      if (Number.isNaN(amountCents)) throw new Error('Informe um valor válido.')
      const tx = bank.transfer({
        target: data.get('target'),
        amountCents,
        description: data.get('description'),
      })
      state.route = 'statement'
      renderApp()
      toast(`Transferência de ${formatBRL(tx.amountCents)} concluída.`)
    } else if (form.id === 'credit-form') {
      const amountCents = parseAmount(data.get('amount'))
      if (Number.isNaN(amountCents)) throw new Error('Informe um valor válido.')
      const userId = form.dataset.userId
      const tx = bank.creditCustomer(userId, amountCents, data.get('description'))
      closeModal()
      renderApp()
      toast(`Crédito de ${formatBRL(tx.amountCents)} realizado.`)
    }
  } catch (error) {
    if (form.id === 'credit-form') {
      const target = form.querySelector('[data-error]')
      if (target) {
        target.textContent = error.message
        target.hidden = false
      }
      toast(error.message, 'error')
    } else {
      fieldError(form, error.message)
    }
  } finally {
    setBusy(button, false)
  }
})

document.addEventListener('input', (event) => {
  const target = event.target
  if (target.matches('[data-cpf]')) {
    target.value = formatCPF(target.value)
  }
  if (target.id === 'client-search') {
    state.clientSearch = target.value
    const cursor = target.selectionStart
    renderApp()
    const next = document.getElementById('client-search')
    if (next) {
      next.focus()
      next.setSelectionRange(cursor, cursor)
    }
  }
})

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal()
    document.querySelector('.app')?.classList.remove('nav-open')
  }
})

if (!bank.isConfigured() && state.authMode !== 'setup') state.authMode = 'setup'
if (state.authMode === 'setup' && bank.isConfigured()) state.authMode = 'login'

if (bank.currentUser()) {
  const user = bank.currentUser()
  state.route = user.role === 'owner' ? 'dashboard' : 'home'
  renderApp()
} else {
  renderAuth()
}

window.__lidec = { bank, state }
