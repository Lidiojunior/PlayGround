(() => {
  'use strict';

  const UF_NAMES = {
    1: 'SP', 2: 'MG', 3: 'RJ', 4: 'RS', 5: 'BA', 6: 'PR', 7: 'CE',
    8: 'PE', 9: 'SC', 10: 'GO', 11: 'MA', 12: 'PB', 13: 'PA', 14: 'ES',
    15: 'PI', 16: 'RN', 17: 'AL', 18: 'MT', 19: 'MS', 20: 'DF',
    21: 'SE', 22: 'AM', 23: 'RO', 24: 'AC', 25: 'AP', 26: 'RR',
    27: 'TO', 28: 'ZZ'
  };

  const UF_LABELS = {
    1: 'São Paulo', 2: 'Minas Gerais', 3: 'Rio de Janeiro', 4: 'Rio Grande do Sul',
    5: 'Bahia', 6: 'Paraná', 7: 'Ceará', 8: 'Pernambuco', 9: 'Santa Catarina',
    10: 'Goiás', 11: 'Maranhão', 12: 'Paraíba', 13: 'Pará', 14: 'Espírito Santo',
    15: 'Piauí', 16: 'Rio Grande do Norte', 17: 'Alagoas', 18: 'Mato Grosso',
    19: 'Mato Grosso do Sul', 20: 'Distrito Federal', 21: 'Sergipe', 22: 'Amazonas',
    23: 'Rondônia', 24: 'Acre', 25: 'Amapá', 26: 'Roraima', 27: 'Tocantins',
    28: 'Exterior'
  };

  const $ = (selector) => document.querySelector(selector);

  const els = {
    titulo: $('#titulo'),
    caption: $('#titulo-caption'),
    seq: $('#seq'),
    ufCode: $('#uf-code'),
    ufName: $('#uf-name'),
    dv: $('#dv'),
    status: $('#status'),
    statusText: $('#status-text'),
    select: $('#uf-select'),
    gerar: $('#gerar'),
    copiar: $('#copiar'),
    copiarLabel: $('#copiar-label'),
    history: $('#history'),
    counter: $('#counter'),
    toast: $('#toast')
  };

  const state = {
    digits: '',
    uf: 1,
    total: 0,
    history: [],
    toastTimer: null,
    copyTimer: null
  };

  const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  function checkDigits(sequential, uf) {
    let first = 0;
    for (let i = 0; i < 8; i += 1) first += sequential[i] * (i + 2);
    first %= 11;
    if (first === 10) first = 0;

    const ufDigits = [Math.floor(uf / 10), uf % 10];
    let second = ufDigits[0] * 7 + ufDigits[1] * 8 + first * 9;
    second %= 11;
    if (second === 10) second = 0;

    return [first, second];
  }

  function validate(digits) {
    if (!/^\d{12}$/.test(digits)) return false;
    const sequential = digits.slice(0, 8).split('').map(Number);
    const uf = Number(digits.slice(8, 10));
    if (uf < 1 || uf > 28) return false;
    const [first, second] = checkDigits(sequential, uf);
    return digits.slice(10) === `${first}${second}`;
  }

  function generate(uf) {
    const sequential = Array.from({ length: 8 }, () => randomInt(0, 9));
    if (sequential.every((digit) => digit === 0)) sequential[7] = 1;
    const [first, second] = checkDigits(sequential, uf);
    return sequential.join('') + String(uf).padStart(2, '0') + `${first}${second}`;
  }

  function mask(digits) {
    return `${digits.slice(0, 4)} ${digits.slice(4, 8)} ${digits.slice(8, 10)} ${digits.slice(10)}`;
  }

  function chosenUf() {
    const value = els.select.value;
    return value === 'random' ? randomInt(1, 28) : Number(value);
  }

  function renderTitle(digits) {
    const seq = `${digits.slice(0, 4)} ${digits.slice(4, 8)}`;
    const uf = digits.slice(8, 10);
    const dv = digits.slice(10);
    els.titulo.innerHTML = `${seq} <span class="t-uf">${uf}</span> <span class="t-dv">${dv}</span>`;
    els.titulo.setAttribute('aria-label', `Título ${mask(digits)}`);
    els.titulo.classList.remove('flip');
    void els.titulo.offsetWidth;
    els.titulo.classList.add('flip');

    els.seq.textContent = digits.slice(0, 8);
    els.ufCode.textContent = uf;
    els.ufName.textContent = `${UF_NAMES[state.uf]} · ${UF_LABELS[state.uf]}`;
    els.dv.textContent = dv;
    els.caption.textContent =
      `Sequencial ${digits.slice(0, 8)} · UF ${uf} (${UF_NAMES[state.uf]}) · DVs ${dv}`;

    const valid = validate(digits);
    els.status.classList.toggle('invalid', !valid);
    els.statusText.textContent = valid ? 'Válido' : 'Inválido';
  }

  function renderHistory() {
    els.history.innerHTML = '';
    if (!state.history.length) {
      const empty = document.createElement('li');
      empty.className = 'empty';
      empty.textContent = 'Nenhum título gerado ainda.';
      els.history.append(empty);
      return;
    }

    for (const item of state.history) {
      const li = document.createElement('li');
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = mask(item.digits);
      button.title = 'Copiar este título';
      button.setAttribute('aria-label', `Copiar título ${mask(item.digits)}`);
      button.addEventListener('click', () => copy(item.digits));

      const tag = document.createElement('span');
      tag.className = 'uf-tag';
      tag.textContent = UF_NAMES[item.uf];

      li.append(button, tag);
      els.history.append(li);
    }
  }

  function pushHistory(digits, uf) {
    state.history = [{ digits, uf }, ...state.history.filter((item) => item.digits !== digits)].slice(0, 5);
    state.total += 1;
    els.counter.textContent = String(state.total);
    renderHistory();
  }

  function newTitle({ record = true } = {}) {
    state.uf = chosenUf();
    state.digits = generate(state.uf);
    renderTitle(state.digits);
    if (record) pushHistory(state.digits, state.uf);
    return state.digits;
  }

  function showToast(message) {
    els.toast.textContent = message;
    els.toast.classList.add('show');
    clearTimeout(state.toastTimer);
    state.toastTimer = setTimeout(() => els.toast.classList.remove('show'), 1900);
  }

  async function writeClipboard(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (_) {
      /* fall through to legacy copy */
    }

    try {
      const area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.top = '-1000px';
      area.style.opacity = '0';
      document.body.append(area);
      area.select();
      const ok = document.execCommand('copy');
      area.remove();
      return ok;
    } catch (_) {
      return false;
    }
  }

  async function copy(value = state.digits, label = 'Copiado!') {
    if (!value) return;
    const ok = await writeClipboard(mask(value));
    if (!ok) {
      showToast('Não foi possível copiar');
      return;
    }
    showToast(label);
    els.copiar.classList.add('done');
    els.copiarLabel.textContent = 'Copiado';
    clearTimeout(state.copyTimer);
    state.copyTimer = setTimeout(() => {
      els.copiar.classList.remove('done');
      els.copiarLabel.textContent = 'Copiar';
    }, 1800);
  }

  els.gerar.addEventListener('click', () => newTitle());
  els.copiar.addEventListener('click', () => copy());
  els.select.addEventListener('change', () => newTitle());

  document.addEventListener('keydown', (event) => {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    const tag = String(event.target?.tagName || '').toLowerCase();
    if (tag === 'select' || tag === 'input' || tag === 'textarea') return;
    const key = event.key.toLowerCase();
    if (key === 'g') {
      event.preventDefault();
      newTitle();
    } else if (key === 'c') {
      event.preventDefault();
      copy();
    }
  });

  newTitle();
  document.body.dataset.ready = 'true';
})();
