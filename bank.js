const DB_KEY = 'lidec.capital.db.v1'
const SESSION_KEY = 'lidec.capital.session.v1'
const PBKDF2_ITERATIONS = 120000

export const BANK_NAME = 'Banco Lidec Capital'
export const OWNER_CAPITAL_CENTS = 100000000

export class BankError extends Error {
  constructor(message, code = 'bank_error') {
    super(message)
    this.name = 'BankError'
    this.code = code
  }
}

const isoNow = () => new Date().toISOString()
const makeId = (prefix) => `${prefix}_${globalThis.crypto.randomUUID()}`

export function onlyDigits(value = '') {
  return String(value).replace(/\D/g, '')
}

export function normalizeEmail(value = '') {
  return String(value).trim().toLowerCase()
}

export function isValidEmail(value) {
  const email = normalizeEmail(value)
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
}

export function isValidCPF(value) {
  const cpf = onlyDigits(value)
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false
  let sum = 0
  for (let i = 0; i < 9; i += 1) sum += Number(cpf[i]) * (10 - i)
  let first = 11 - (sum % 11)
  if (first >= 10) first = 0
  if (first !== Number(cpf[9])) return false
  sum = 0
  for (let i = 0; i < 10; i += 1) sum += Number(cpf[i]) * (11 - i)
  let second = 11 - (sum % 11)
  if (second >= 10) second = 0
  return second === Number(cpf[10])
}

export function formatCPF(value) {
  const cpf = onlyDigits(value).slice(0, 11)
  return cpf
    .replace(/^(\d{3})(\d)/, '$1.$2')
    .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d{1,2})$/, '.$1-$2')
}

export function formatBRL(cents, { sign = false, currency = true } = {}) {
  const value = Number(cents || 0) / 100
  return new Intl.NumberFormat('pt-BR', {
    style: currency ? 'currency' : 'decimal',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    signDisplay: sign ? 'exceptZero' : 'auto',
  }).format(value)
}

export function parseAmount(value) {
  const raw = String(value ?? '').trim()
  if (!raw) return 0
  let normalized = raw.replace(/\s|R\$/gi, '')
  if (normalized.includes(',')) normalized = normalized.replace(/\./g, '').replace(',', '.')
  else if (/^\d{1,3}(\.\d{3})+$/.test(normalized)) normalized = normalized.replace(/\./g, '')
  if (!/^\d+(\.\d{0,2})?$/.test(normalized)) return NaN
  return Math.round(Number(normalized) * 100)
}

export function accountCode(account) {
  if (!account) return ''
  return `${account.agency} / ${account.number}-${account.digit}`
}

function accountCheckDigit(number) {
  let sum = 0
  let weight = 2
  for (let i = number.length - 1; i >= 0; i -= 1) {
    sum += Number(number[i]) * weight
    weight = weight === 9 ? 2 : weight + 1
  }
  const digit = 11 - (sum % 11)
  return digit >= 10 ? 0 : digit
}

function emptyDatabase() {
  return {
    version: 1,
    bankName: BANK_NAME,
    ownerId: null,
    createdAt: isoNow(),
    users: [],
    accounts: [],
    transactions: [],
  }
}

function bytesToHex(bytes) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('')
}

function hexToBytes(hex) {
  const bytes = new Uint8Array(hex.length / 2)
  for (let i = 0; i < bytes.length; i += 1) bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16)
  return bytes
}

function randomSalt() {
  const bytes = new Uint8Array(16)
  globalThis.crypto.getRandomValues(bytes)
  return bytesToHex(bytes)
}

async function hashPassword(password, salt) {
  const encoder = new TextEncoder()
  const key = await globalThis.crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveBits'],
  )
  const bits = await globalThis.crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt: hexToBytes(salt), iterations: PBKDF2_ITERATIONS, hash: 'SHA-256' },
    key,
    256,
  )
  return bytesToHex(new Uint8Array(bits))
}

function normalizeName(name = '') {
  return String(name).trim().replace(/\s+/g, ' ')
}

function validateIdentity({ name, email, cpf, password }, { passwordRequired = true } = {}) {
  const cleanName = normalizeName(name)
  const cleanEmail = normalizeEmail(email)
  const cleanCPF = onlyDigits(cpf)
  if (cleanName.length < 3) throw new BankError('Informe seu nome completo.', 'invalid_name')
  if (cleanName.length > 80) throw new BankError('O nome deve ter até 80 caracteres.', 'invalid_name')
  if (!isValidEmail(cleanEmail)) throw new BankError('Informe um e-mail válido.', 'invalid_email')
  if (!isValidCPF(cleanCPF)) throw new BankError('Informe um CPF válido.', 'invalid_cpf')
  if (passwordRequired && String(password || '').length < 6) {
    throw new BankError('A senha deve ter pelo menos 6 caracteres.', 'invalid_password')
  }
  return { cleanName, cleanEmail, cleanCPF }
}

function validateAmount(amountCents) {
  if (!Number.isInteger(amountCents) || amountCents <= 0) {
    throw new BankError('Informe um valor maior que zero.', 'invalid_amount')
  }
  if (amountCents > 100000000000) {
    throw new BankError('Valor acima do limite permitido.', 'invalid_amount')
  }
}

export class Bank {
  constructor({ storage, now = isoNow, id = makeId } = {}) {
    this.storage = storage ?? globalThis.localStorage
    this.now = now
    this.id = id
  }

  read() {
    const raw = this.storage.getItem(DB_KEY)
    if (!raw) return emptyDatabase()
    try {
      const parsed = JSON.parse(raw)
      if (!parsed || parsed.version !== 1) throw new Error('schema')
      return {
        ...emptyDatabase(),
        ...parsed,
        users: Array.isArray(parsed.users) ? parsed.users : [],
        accounts: Array.isArray(parsed.accounts) ? parsed.accounts : [],
        transactions: Array.isArray(parsed.transactions) ? parsed.transactions : [],
      }
    } catch {
      throw new BankError('Não foi possível ler os dados do banco neste navegador.', 'corrupt_storage')
    }
  }

  write(database) {
    this.storage.setItem(DB_KEY, JSON.stringify(database))
  }

  isConfigured() {
    return Boolean(this.read().ownerId)
  }

  sessionUserId() {
    return this.storage.getItem(SESSION_KEY) || null
  }

  setSession(userId) {
    if (userId) this.storage.setItem(SESSION_KEY, userId)
    else this.storage.removeItem(SESSION_KEY)
  }

  currentUser() {
    const database = this.read()
    const userId = this.sessionUserId()
    if (!userId) return null
    const user = database.users.find((item) => item.id === userId)
    if (!user || user.status === 'blocked') {
      this.setSession(null)
      return null
    }
    return user
  }

  accountFor(userId) {
    return this.read().accounts.find((account) => account.userId === userId) || null
  }

  owner() {
    const database = this.read()
    return database.users.find((user) => user.id === database.ownerId) || null
  }

  createAccount(database, userId) {
    const sequence = 100000 + database.accounts.length + 1
    const number = String(sequence)
    return {
      id: this.id('acc'),
      userId,
      agency: '0001',
      number,
      digit: accountCheckDigit(number),
      balanceCents: 0,
      createdAt: this.now(),
    }
  }

  createUser(database, data, role, status) {
    return {
      id: this.id('usr'),
      name: data.cleanName,
      email: data.cleanEmail,
      cpf: data.cleanCPF,
      phone: onlyDigits(data.phone || ''),
      role,
      status,
      salt: data.salt,
      passwordHash: data.passwordHash,
      createdAt: this.now(),
    }
  }

  async setupOwner({ name, email, cpf, phone = '', password }) {
    const database = this.read()
    if (database.ownerId) throw new BankError('Este banco já possui um proprietário.', 'owner_exists')
    const identity = validateIdentity({ name, email, cpf, password })
    const salt = randomSalt()
    const data = { ...identity, phone, salt, passwordHash: await hashPassword(password, salt) }
    const owner = this.createUser(database, data, 'owner', 'active')
    const account = this.createAccount(database, owner.id)
    account.balanceCents = OWNER_CAPITAL_CENTS
    database.users.push(owner)
    database.accounts.push(account)
    database.ownerId = owner.id
    database.transactions.push({
      id: this.id('tx'),
      kind: 'capital',
      amountCents: OWNER_CAPITAL_CENTS,
      fromAccountId: null,
      toAccountId: account.id,
      fromLabel: 'Banco Lidec Capital',
      toLabel: owner.name,
      description: 'Capital inicial do banco',
      createdAt: this.now(),
    })
    this.write(database)
    this.setSession(owner.id)
    return owner
  }

  async registerCustomer({ name, email, cpf, phone = '', password }) {
    const database = this.read()
    if (!database.ownerId) throw new BankError('O banco ainda não foi configurado.', 'not_configured')
    const identity = validateIdentity({ name, email, cpf, password })
    if (database.users.some((user) => user.email === identity.cleanEmail)) {
      throw new BankError('Já existe uma conta com este e-mail.', 'duplicate_email')
    }
    if (database.users.some((user) => user.cpf === identity.cleanCPF)) {
      throw new BankError('Já existe uma conta com este CPF.', 'duplicate_cpf')
    }
    const salt = randomSalt()
    const data = { ...identity, phone, salt, passwordHash: await hashPassword(password, salt) }
    const user = this.createUser(database, data, 'customer', 'pending')
    const account = this.createAccount(database, user.id)
    database.users.push(user)
    database.accounts.push(account)
    this.write(database)
    return { user, account }
  }

  async login(email, password) {
    const database = this.read()
    const user = database.users.find((item) => item.email === normalizeEmail(email))
    if (!user) throw new BankError('E-mail ou senha incorretos.', 'invalid_credentials')
    const hash = await hashPassword(String(password || ''), user.salt)
    if (hash !== user.passwordHash) {
      throw new BankError('E-mail ou senha incorretos.', 'invalid_credentials')
    }
    if (user.status === 'pending') {
      throw new BankError('Sua conta ainda aguarda aprovação do proprietário.', 'pending_approval')
    }
    if (user.status === 'blocked') {
      throw new BankError('Sua conta está bloqueada. Fale com o proprietário.', 'blocked')
    }
    this.setSession(user.id)
    return user
  }

  logout() {
    this.setSession(null)
  }

  requireOwner(database) {
    const userId = this.sessionUserId()
    if (!database.ownerId || userId !== database.ownerId) {
      throw new BankError('Apenas o proprietário do banco pode fazer isso.', 'forbidden')
    }
    return database.users.find((user) => user.id === database.ownerId)
  }

  approveCustomer(userId) {
    const database = this.read()
    this.requireOwner(database)
    const user = database.users.find((item) => item.id === userId)
    if (!user || user.role === 'owner') throw new BankError('Cliente não encontrado.', 'not_found')
    if (user.status !== 'pending') throw new BankError('Este cadastro já foi analisado.', 'invalid_status')
    user.status = 'active'
    user.approvedAt = this.now()
    this.write(database)
    return user
  }

  rejectCustomer(userId) {
    const database = this.read()
    this.requireOwner(database)
    const user = database.users.find((item) => item.id === userId)
    if (!user || user.role === 'owner') throw new BankError('Cliente não encontrado.', 'not_found')
    if (user.status !== 'pending') throw new BankError('Este cadastro já foi analisado.', 'invalid_status')
    database.users = database.users.filter((item) => item.id !== userId)
    database.accounts = database.accounts.filter((item) => item.userId !== userId)
    this.write(database)
    return user
  }

  setCustomerBlocked(userId, blocked) {
    const database = this.read()
    this.requireOwner(database)
    const user = database.users.find((item) => item.id === userId)
    if (!user || user.role === 'owner') throw new BankError('Cliente não encontrado.', 'not_found')
    if (user.status === 'pending') throw new BankError('Aprove o cadastro antes de bloquear.', 'invalid_status')
    user.status = blocked ? 'blocked' : 'active'
    this.write(database)
    if (blocked && this.sessionUserId() === userId) this.setSession(null)
    return user
  }

  creditCustomer(userId, amountCents, description = '') {
    const database = this.read()
    this.requireOwner(database)
    validateAmount(amountCents)
    const target = database.users.find((item) => item.id === userId)
    if (!target || target.role === 'owner') throw new BankError('Cliente não encontrado.', 'not_found')
    if (target.status !== 'active') throw new BankError('Ative o cliente antes de creditar.', 'invalid_status')
    const ownerAccount = database.accounts.find((account) => account.userId === database.ownerId)
    const targetAccount = database.accounts.find((account) => account.userId === target.id)
    if (!ownerAccount || !targetAccount) throw new BankError('Conta não encontrada.', 'not_found')
    if (ownerAccount.balanceCents < amountCents) {
      throw new BankError('Saldo insuficiente na conta do proprietário.', 'insufficient_funds')
    }
    ownerAccount.balanceCents -= amountCents
    targetAccount.balanceCents += amountCents
    const transaction = {
      id: this.id('tx'),
      kind: 'credit',
      amountCents,
      fromAccountId: ownerAccount.id,
      toAccountId: targetAccount.id,
      fromLabel: 'Banco Lidec Capital',
      toLabel: target.name,
      description: String(description || '').trim() || 'Crédito do proprietário',
      createdAt: this.now(),
    }
    database.transactions.push(transaction)
    this.write(database)
    return transaction
  }

  findDestination(database, query) {
    const term = String(query || '').trim()
    if (!term) throw new BankError('Informe o destinatário.', 'missing_target')
    const email = normalizeEmail(term)
    if (email.includes('@')) {
      const user = database.users.find((item) => item.email === email)
      if (!user) throw new BankError('Nenhuma conta encontrada com este e-mail.', 'target_not_found')
      return database.accounts.find((account) => account.userId === user.id) || null
    }
    const digits = onlyDigits(term)
    if (!digits) throw new BankError('Informe um e-mail, CPF ou conta válida.', 'missing_target')
    const byCpf = database.users.find((item) => item.cpf === digits)
    if (byCpf) return database.accounts.find((account) => account.userId === byCpf.id) || null
    const byAccount = database.accounts.find((account) => account.number === digits)
    return byAccount || null
  }

  transfer({ target, amountCents, description = '' }) {
    const database = this.read()
    const sender = this.currentUser()
    if (!sender) throw new BankError('Sessão expirada. Entre novamente.', 'unauthenticated')
    if (sender.status !== 'active') throw new BankError('Sua conta não está ativa.', 'invalid_status')
    validateAmount(amountCents)
    const destination = this.findDestination(database, target)
    if (!destination) throw new BankError('Nenhuma conta encontrada para este destinatário.', 'target_not_found')
    const senderAccount = database.accounts.find((account) => account.userId === sender.id)
    const destinationUser = database.users.find((user) => user.id === destination.userId)
    if (!senderAccount || !destinationUser) throw new BankError('Conta não encontrada.', 'not_found')
    if (destination.id === senderAccount.id) {
      throw new BankError('Você não pode transferir para a própria conta.', 'self_transfer')
    }
    if (destinationUser.status !== 'active') {
      throw new BankError('A conta de destino não está disponível.', 'invalid_status')
    }
    if (senderAccount.balanceCents < amountCents) {
      throw new BankError('Saldo insuficiente para esta transferência.', 'insufficient_funds')
    }
    senderAccount.balanceCents -= amountCents
    destination.balanceCents += amountCents
    const transaction = {
      id: this.id('tx'),
      kind: 'transfer',
      amountCents,
      fromAccountId: senderAccount.id,
      toAccountId: destination.id,
      fromLabel: sender.name,
      toLabel: destinationUser.name,
      description: String(description || '').trim() || 'Transferência',
      createdAt: this.now(),
    }
    database.transactions.push(transaction)
    this.write(database)
    return transaction
  }

  allTransactions() {
    return [...this.read().transactions].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }

  transactionsFor(userId) {
    const database = this.read()
    const accountIds = new Set(
      database.accounts.filter((account) => account.userId === userId).map((account) => account.id),
    )
    return database.transactions
      .filter((tx) => accountIds.has(tx.toAccountId) || accountIds.has(tx.fromAccountId))
      .map((tx) => {
        const incoming = accountIds.has(tx.toAccountId)
        return {
          ...tx,
          direction: incoming ? 'in' : 'out',
          counterparty: incoming ? tx.fromLabel : tx.toLabel,
        }
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }

  customers() {
    const database = this.read()
    return database.users
      .filter((user) => user.role === 'customer')
      .map((user) => {
        const account = database.accounts.find((item) => item.userId === user.id)
        return { ...user, account }
      })
      .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
  }

  metrics() {
    const database = this.read()
    const customers = database.users.filter((user) => user.role === 'customer')
    const activeCustomers = customers.filter((user) => user.status === 'active')
    const accounts = database.accounts
    const custodyCents = accounts
      .filter((account) => account.userId !== database.ownerId)
      .reduce((total, account) => total + account.balanceCents, 0)
    return {
      customers: customers.length,
      activeCustomers: activeCustomers.length,
      pending: customers.filter((user) => user.status === 'pending').length,
      blocked: customers.filter((user) => user.status === 'blocked').length,
      custodyCents,
      transactions: database.transactions.length,
      transfers: database.transactions.filter((tx) => tx.kind === 'transfer').length,
      totalMovedCents: database.transactions
        .filter((tx) => tx.kind === 'transfer')
        .reduce((total, tx) => total + tx.amountCents, 0),
    }
  }
}
