import test from 'node:test'
import assert from 'node:assert/strict'
import {
  Bank,
  OWNER_CAPITAL_CENTS,
  formatCPF,
  isValidCPF,
  parseAmount,
} from '../bank.js'

class MemoryStorage {
  constructor() {
    this.data = new Map()
  }

  getItem(key) {
    return this.data.has(key) ? this.data.get(key) : null
  }

  setItem(key, value) {
    this.data.set(key, String(value))
  }

  removeItem(key) {
    this.data.delete(key)
  }
}

function makeBank(storage = new MemoryStorage()) {
  let tick = 0
  let sequence = 0
  const bank = new Bank({
    storage,
    now: () => new Date(Date.UTC(2026, 9, 22, 12, 0, 0) + tick++ * 60000).toISOString(),
    id: (prefix) => `${prefix}_${++sequence}`,
  })
  return { bank, storage }
}

const OWNER = {
  name: 'Lidio Junior',
  email: 'owner@lidec.com',
  cpf: '52998224725',
  password: 'segredo123',
}

const ALICE = {
  name: 'Alice Nogueira',
  email: 'alice@email.com',
  cpf: '11144477735',
  password: 'alice123',
}

const BRUNO = {
  name: 'Bruno Costa',
  email: 'bruno@email.com',
  cpf: '39053344705',
  password: 'bruno123',
}

async function rejectsWith(promiseOrFn, code) {
  await assert.rejects(
    async () => {
      if (typeof promiseOrFn === 'function') return await promiseOrFn()
      return await promiseOrFn
    },
    (error) => {
      assert.equal(error.code, code, `esperava ${code}, recebeu ${error.code}: ${error.message}`)
      return true
    },
  )
}

async function configuredBank() {
  const ctx = makeBank()
  await ctx.bank.setupOwner(OWNER)
  return ctx
}

async function withCustomer(ctx, person) {
  const { user } = await ctx.bank.registerCustomer(person)
  ctx.bank.approveCustomer(user.id)
  return user
}

test('valida CPF, formata documentos e interpreta valores em reais', () => {
  assert.equal(isValidCPF('529.982.247-25'), true)
  assert.equal(isValidCPF('52998224724'), false)
  assert.equal(isValidCPF('11111111111'), false)
  assert.equal(isValidCPF('123'), false)
  assert.equal(formatCPF('52998224725'), '529.982.247-25')
  assert.equal(parseAmount('1.234,56'), 123456)
  assert.equal(parseAmount('R$ 10'), 1000)
  assert.equal(parseAmount('0,10'), 10)
  assert.equal(parseAmount('1.234'), 123400)
  assert.equal(parseAmount('1.234.567,89'), 123456789)
  assert.equal(parseAmount('1234.56'), 123456)
  assert.equal(parseAmount(''), 0)
  assert.equal(Number.isNaN(parseAmount('abc')), true)
  assert.equal(Number.isNaN(parseAmount('-5')), true)
})

test('configura o proprietário único com capital inicial', async () => {
  const { bank } = makeBank()
  assert.equal(bank.isConfigured(), false)
  await rejectsWith(() => bank.registerCustomer(ALICE), 'not_configured')

  const owner = await bank.setupOwner(OWNER)
  assert.equal(owner.role, 'owner')
  assert.equal(owner.status, 'active')
  assert.equal(bank.isConfigured(), true)
  assert.equal(bank.currentUser().id, owner.id)
  const account = bank.accountFor(owner.id)
  assert.equal(account.balanceCents, OWNER_CAPITAL_CENTS)
  assert.equal(bank.metrics().custodyCents, 0)
  assert.equal(bank.allTransactions()[0].kind, 'capital')

  await rejectsWith(() => bank.setupOwner({ ...OWNER, email: 'outro@lidec.com', cpf: '12345678909' }), 'owner_exists')
})

test('armazena senha com hash e sal, sem texto puro', async () => {
  const { bank, storage } = await configuredBank()
  const owner = bank.owner()
  assert.notEqual(owner.passwordHash, OWNER.password)
  assert.equal(owner.passwordHash.length, 64)
  assert.equal(owner.salt.length, 32)
  assert.equal(storage.getItem('lidec.capital.db.v1').includes(OWNER.password), false)
  assert.equal(storage.getItem('lidec.capital.db.v1').includes(owner.passwordHash), true)

  const reopened = new Bank({ storage })
  assert.equal(reopened.isConfigured(), true)
  assert.equal(reopened.owner().email, OWNER.email)
})

test('cadastro de cliente fica pendente até aprovação do proprietário', async () => {
  const { bank } = await configuredBank()

  const { user, account } = await bank.registerCustomer(ALICE)
  assert.equal(user.status, 'pending')
  assert.equal(user.role, 'customer')
  assert.equal(account.balanceCents, 0)
  assert.equal(bank.metrics().pending, 1)

  await rejectsWith(() => bank.login(ALICE.email, ALICE.password), 'pending_approval')

  bank.approveCustomer(user.id)
  assert.equal(bank.metrics().pending, 0)
  assert.equal(bank.metrics().activeCustomers, 1)

  const logged = await bank.login(ALICE.email, ALICE.password)
  assert.equal(logged.id, user.id)
  assert.equal(bank.currentUser().id, user.id)
})

test('impede e-mail e CPF duplicados e senha curta', async () => {
  const { bank } = await configuredBank()
  await bank.registerCustomer(ALICE)
  await rejectsWith(
    () => bank.registerCustomer({ ...ALICE, cpf: '39053344705' }),
    'duplicate_email',
  )
  await rejectsWith(
    () => bank.registerCustomer({ ...ALICE, email: 'outra@email.com' }),
    'duplicate_cpf',
  )
  await rejectsWith(
    () => bank.registerCustomer({ ...BRUNO, password: '123' }),
    'invalid_password',
  )
  await rejectsWith(
    () => bank.registerCustomer({ ...BRUNO, cpf: '111.111.111-11' }),
    'invalid_cpf',
  )
})

test('proprietário credita cliente e cliente transfere para outra conta', async () => {
  const { bank } = await configuredBank()
  const alice = await withCustomer({ bank }, ALICE)
  const bruno = await withCustomer({ bank }, BRUNO)

  const credit = bank.creditCustomer(alice.id, 50000, 'Depósito inicial')
  assert.equal(credit.kind, 'credit')
  assert.equal(bank.accountFor(alice.id).balanceCents, 50000)
  assert.equal(bank.accountFor(bank.owner().id).balanceCents, OWNER_CAPITAL_CENTS - 50000)

  bank.logout()
  await bank.login(ALICE.email, ALICE.password)
  const transfer = bank.transfer({ target: BRUNO.email, amountCents: 20000, description: 'Aluguel' })
  assert.equal(transfer.kind, 'transfer')
  assert.equal(bank.accountFor(alice.id).balanceCents, 30000)
  assert.equal(bank.accountFor(bruno.id).balanceCents, 20000)

  const aliceStatement = bank.transactionsFor(alice.id)
  assert.equal(aliceStatement.length, 2)
  assert.equal(aliceStatement[0].direction, 'out')
  assert.equal(aliceStatement[0].counterparty, BRUNO.name)
  assert.equal(aliceStatement[1].direction, 'in')
  assert.equal(aliceStatement[1].amountCents, 50000)

  bank.logout()
  await bank.login(BRUNO.email, BRUNO.password)
  const brunoStatement = bank.transactionsFor(bruno.id)
  assert.equal(brunoStatement.length, 1)
  assert.equal(brunoStatement[0].direction, 'in')
  assert.equal(brunoStatement[0].counterparty, ALICE.name)
})

test('aceita transferência por CPF e por número da conta', async () => {
  const { bank } = await configuredBank()
  const alice = await withCustomer({ bank }, ALICE)
  const bruno = await withCustomer({ bank }, BRUNO)
  bank.creditCustomer(alice.id, 10000)

  const first = bank.transfer({ target: BRUNO.cpf, amountCents: 2500 })
  assert.equal(first.id, bank.allTransactions()[0].id)
  assert.equal(bank.accountFor(bruno.id).balanceCents, 2500)

  const brunoAccount = bank.accountFor(bruno.id)
  bank.transfer({ target: brunoAccount.number, amountCents: 2500 })
  assert.equal(bank.accountFor(bruno.id).balanceCents, 5000)
})

test('bloqueia saldo insuficiente, autotransferência e destino inexistente', async () => {
  const { bank } = await configuredBank()
  const alice = await withCustomer({ bank }, ALICE)
  const bruno = await withCustomer({ bank }, BRUNO)
  bank.logout()
  await bank.login(ALICE.email, ALICE.password)

  await rejectsWith(() => bank.transfer({ target: BRUNO.email, amountCents: 100 }), 'insufficient_funds')
  await rejectsWith(() => bank.transfer({ target: ALICE.email, amountCents: 100 }), 'self_transfer')
  await rejectsWith(() => bank.transfer({ target: 'ninguem@email.com', amountCents: 100 }), 'target_not_found')
  await rejectsWith(() => bank.transfer({ target: BRUNO.email, amountCents: 0 }), 'invalid_amount')
  await rejectsWith(() => bank.transfer({ target: '', amountCents: 100 }), 'missing_target')

  bank.logout()
  await bank.login(OWNER.email, OWNER.password)
  bank.creditCustomer(alice.id, 1000)
  assert.equal(bank.accountFor(alice.id).balanceCents, 1000)
})

test('cliente bloqueado não entra nem recebe transferências', async () => {
  const { bank } = await configuredBank()
  const alice = await withCustomer({ bank }, ALICE)
  const bruno = await withCustomer({ bank }, BRUNO)
  bank.creditCustomer(alice.id, 10000)
  bank.setCustomerBlocked(bruno.id, true)

  bank.logout()
  await rejectsWith(() => bank.login(BRUNO.email, BRUNO.password), 'blocked')

  await bank.login(ALICE.email, ALICE.password)
  await rejectsWith(() => bank.transfer({ target: BRUNO.email, amountCents: 500 }), 'invalid_status')

  bank.logout()
  await bank.login(OWNER.email, OWNER.password)
  bank.setCustomerBlocked(bruno.id, false)
  bank.logout()
  await bank.login(BRUNO.email, BRUNO.password)
  assert.equal(bank.currentUser().status, 'active')
})

test('ações de proprietário são negadas para clientes', async () => {
  const { bank } = await configuredBank()
  const alice = await withCustomer({ bank }, ALICE)
  const bruno = await withCustomer({ bank }, BRUNO)
  bank.logout()
  await bank.login(ALICE.email, ALICE.password)

  await rejectsWith(() => bank.creditCustomer(bruno.id, 1000), 'forbidden')
  await rejectsWith(() => bank.approveCustomer(bruno.id), 'forbidden')
  await rejectsWith(() => bank.setCustomerBlocked(bruno.id, true), 'forbidden')
  await rejectsWith(() => bank.rejectCustomer(bruno.id), 'forbidden')
})

test('recusa cadastro remove cliente e conta', async () => {
  const { bank } = await configuredBank()
  const { user, account } = await bank.registerCustomer(ALICE)
  bank.rejectCustomer(user.id)
  assert.equal(bank.customers().length, 0)
  assert.equal(bank.accountFor(user.id), null)
  assert.equal(bank.read().accounts.some((item) => item.id === account.id), false)
  await rejectsWith(() => bank.login(ALICE.email, ALICE.password), 'invalid_credentials')
})

test('credenciais inválidas e sessão encerrada', async () => {
  const { bank } = await configuredBank()
  await rejectsWith(() => bank.login(OWNER.email, 'senha-errada'), 'invalid_credentials')
  await rejectsWith(() => bank.login('naoexiste@email.com', 'x'), 'invalid_credentials')
  bank.logout()
  assert.equal(bank.currentUser(), null)
  await rejectsWith(() => bank.transfer({ target: 'x@y.com', amountCents: 100 }), 'unauthenticated')
})

test('métricas e extrato geral refletem as operações do banco', async () => {
  const { bank } = await configuredBank()
  const alice = await withCustomer({ bank }, ALICE)
  const bruno = await withCustomer({ bank }, BRUNO)
  bank.creditCustomer(alice.id, 30000)
  bank.creditCustomer(bruno.id, 20000)
  bank.logout()
  await bank.login(ALICE.email, ALICE.password)
  bank.transfer({ target: BRUNO.email, amountCents: 10000 })

  const metrics = bank.metrics()
  assert.equal(metrics.customers, 2)
  assert.equal(metrics.activeCustomers, 2)
  assert.equal(metrics.custodyCents, 50000)
  assert.equal(metrics.totalMovedCents, 10000)
  assert.equal(metrics.transfers, 1)
  assert.equal(metrics.transactions, 4)

  const all = bank.allTransactions()
  assert.equal(all.length, 4)
  assert.equal(all[0].kind, 'transfer')
  assert.equal(all.at(-1).kind, 'capital')
  assert.equal(bank.transactionsFor(bank.owner().id).length, 3)
})
