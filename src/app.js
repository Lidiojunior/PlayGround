(() => {
  "use strict";

  const money = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
  const state = { balance: 1000 };
  const modal = document.getElementById("gameModal");
  const gameArea = document.getElementById("gameArea");
  const gameTitle = document.getElementById("gameTitle");
  const balanceEl = document.getElementById("balance");
  const modalBalanceEl = document.getElementById("modalBalance");
  const toastEl = document.getElementById("toast");
  let cleanup = null;
  let toastTimer = null;
  let activeGame = null;

  const titles = {
    tigrinho: "Tigrinho da Sorte",
    aviador: "Aviador",
    coelho: "Coelho de Bomba",
    roleta: "Roleta da Sorte",
    dados: "Dados da Sorte",
    mines: "Minas Premiadas"
  };

  function formatBalance(value) {
    return money.format(Math.max(0, value));
  }

  function setBalance(value) {
    state.balance = Math.max(0, Math.round(value * 100) / 100);
    balanceEl.textContent = formatBalance(state.balance);
    modalBalanceEl.textContent = formatBalance(state.balance);
  }

  function showToast(text) {
    toastEl.textContent = text;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2600);
  }

  function canBet(amount) {
    if (state.balance < amount) {
      showToast("Saldo demo insuficiente. Recarregue a página para voltar a R$ 1.000.");
      return false;
    }
    return true;
  }

  function betControls(amount, onChange) {
    return `<div class="chip-row" role="group" aria-label="Valor da aposta">
      ${[10, 25, 50].map((value) => `<button class="chip${value === amount ? " is-active" : ""}" type="button" data-bet="${value}">${money.format(value)}</button>`).join("")}
    </div>`;
  }

  function wireBetControls(root, onChange, initial) {
    let amount = initial;
    root.querySelectorAll("[data-bet]").forEach((button) => {
      button.addEventListener("click", () => {
        amount = Number(button.dataset.bet);
        root.querySelectorAll("[data-bet]").forEach((item) => item.classList.toggle("is-active", item === button));
        onChange(amount);
      });
    });
    return () => amount;
  }

  function openGame(key) {
    if (!titles[key]) return;
    closeGame();
    activeGame = key;
    gameTitle.textContent = titles[key];
    gameArea.innerHTML = "";
    const renderers = {
      tigrinho: renderTigrinho,
      aviador: renderAviador,
      coelho: renderCoelho,
      roleta: renderRoleta,
      dados: renderDados,
      mines: renderMines
    };
    renderers[key]();
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    const closeButton = modal.querySelector(".close-btn");
    if (closeButton) closeButton.focus();
  }

  function closeGame() {
    if (typeof cleanup === "function") {
      cleanup();
      cleanup = null;
    }
    modal.hidden = true;
    document.body.style.overflow = "";
    gameArea.innerHTML = "";
    activeGame = null;
  }

  function renderTigrinho() {
    let bet = 10;
    let spinning = false;
    let spinInterval = null;
    const symbols = [
      { emoji: "🐯", multiplier: 25 },
      { emoji: "💰", multiplier: 10 },
      { emoji: "🍀", multiplier: 5 },
      { emoji: "⭐", multiplier: 3 },
      { emoji: "🎲", multiplier: 2 },
      { emoji: "🍒", multiplier: 1.5 }
    ];
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    gameArea.innerHTML = `
      <div class="game-panel">
        <div class="game-info"><span>3 rolos · 3 linhas</span><strong>Prêmio até 25×</strong></div>
        <div class="slot-grid" id="slotGrid">
          ${Array.from({ length: 9 }, (_, index) => `<div class="slot-cell" data-cell="${index}">${symbols[index % symbols.length].emoji}</div>`).join("")}
        </div>
        <div class="game-message" id="slotMsg">Escolha uma aposta e gire os rolos.</div>
        ${betControls(bet)}
        <button class="game-cta" type="button" id="slotSpin">Girar por ${money.format(bet)}</button>
      </div>`;

    const grid = gameArea.querySelector("#slotGrid");
    const cells = [...grid.querySelectorAll(".slot-cell")];
    const message = gameArea.querySelector("#slotMsg");
    const spinButton = gameArea.querySelector("#slotSpin");
    const getBet = wireBetControls(gameArea, (value) => {
      bet = value;
      spinButton.textContent = `Girar por ${money.format(bet)}`;
    }, bet);

    function randomSymbol() {
      return symbols[Math.floor(Math.random() * symbols.length)];
    }

    function stopSpin(final) {
      clearInterval(spinInterval);
      spinInterval = null;
      final.forEach((symbol, index) => {
        cells[index].textContent = symbol.emoji;
        cells[index].classList.remove("spinning");
      });
      let best = null;
      lines.forEach((line) => {
        const symbol = final[line[0]];
        const same = line.every((index) => final[index].emoji === symbol.emoji);
        if (same && (!best || symbol.multiplier > best.symbol.multiplier)) {
          best = { line, symbol };
        }
      });
      if (best) {
        best.line.forEach((index) => cells[index].classList.add("hit"));
        const prize = Math.round(getBet() * best.symbol.multiplier * 100) / 100;
        setBalance(state.balance + prize);
        message.className = "game-message win";
        message.textContent = `Linha de ${best.symbol.emoji}! Você ganhou ${money.format(prize)}.`;
        showToast(`Tigrinho pagou ${money.format(prize)}!`);
      } else {
        message.className = "game-message lose";
        message.textContent = "Quase! Os rolos não fecharam uma linha. Tente novamente.";
      }
      spinning = false;
      spinButton.disabled = false;
      spinButton.textContent = `Girar por ${money.format(getBet())}`;
    }

    spinButton.addEventListener("click", () => {
      if (spinning) return;
      const amount = getBet();
      if (!canBet(amount)) return;
      setBalance(state.balance - amount);
      spinning = true;
      spinButton.disabled = true;
      spinButton.textContent = "Girando...";
      message.className = "game-message";
      message.textContent = "Boa sorte!";
      cells.forEach((cell) => {
        cell.classList.remove("hit");
        cell.classList.add("spinning");
      });
      spinInterval = setInterval(() => {
        cells.forEach((cell) => { cell.textContent = randomSymbol().emoji; });
      }, 75);
      setTimeout(() => {
        stopSpin(Array.from({ length: 9 }, randomSymbol));
      }, 900);
    });

    cleanup = () => { clearInterval(spinInterval); };
  }

  function renderAviador() {
    let bet = 10;
    let running = false;
    let frame = null;
    let startedAt = 0;
    let multiplier = 1;
    let crashAt = 2;
    let cashed = false;

    gameArea.innerHTML = `
      <div class="game-panel">
        <div class="crash-display">
          <div class="crash-track"></div>
          <div class="crash-plane" id="plane">✈️</div>
          <div class="crash-multiplier" id="multiplier">1.00×</div>
          <div class="crash-status" id="crashStatus">Aguardando decolagem</div>
        </div>
        <div class="game-message" id="crashMsg">Faça sua aposta e decole. Saque antes do avião cair!</div>
        ${betControls(bet)}
        <button class="game-cta" type="button" id="crashStart">Decolar por ${money.format(bet)}</button>
        <button class="game-cta secondary" type="button" id="crashCash" disabled>Saque agora</button>
      </div>`;

    const multiplierEl = gameArea.querySelector("#multiplier");
    const plane = gameArea.querySelector("#plane");
    const status = gameArea.querySelector("#crashStatus");
    const message = gameArea.querySelector("#crashMsg");
    const startButton = gameArea.querySelector("#crashStart");
    const cashButton = gameArea.querySelector("#crashCash");
    const getBet = wireBetControls(gameArea, (value) => {
      bet = value;
      if (!running) startButton.textContent = `Decolar por ${money.format(bet)}`;
    }, bet);

    function reset() {
      cancelAnimationFrame(frame);
      frame = null;
      running = false;
      cashed = false;
      multiplier = 1;
      setBalance(state.balance);
      multiplierEl.textContent = "1.00×";
      multiplierEl.classList.remove("up");
      plane.style.left = "16%";
      plane.style.bottom = "24%";
      status.textContent = "Aguardando decolagem";
      startButton.disabled = false;
      startButton.textContent = `Decolar por ${money.format(getBet())}`;
      cashButton.disabled = true;
    }

    function crash() {
      cancelAnimationFrame(frame);
      frame = null;
      running = false;
      multiplierEl.textContent = `${multiplier.toFixed(2)}×`;
      status.textContent = "O avião caiu";
      plane.style.bottom = "12%";
      message.className = "game-message lose";
      message.textContent = `Caiu em ${multiplier.toFixed(2)}×. Você perdeu ${money.format(getBet())}.`;
      showToast("O avião caiu! Tente outra rodada.");
      cashButton.disabled = true;
      setTimeout(() => {
        if (activeGame === "aviador") reset();
      }, 1300);
    }

    function tick(now) {
      if (!running) return;
      if (!startedAt) startedAt = now;
      const seconds = (now - startedAt) / 1000;
      multiplier = 1 + seconds * 0.42;
      if (multiplier >= crashAt) {
        multiplier = crashAt;
        crash();
        return;
      }
      const progress = Math.min(1, (multiplier - 1) / Math.max(0.1, crashAt - 1));
      multiplierEl.textContent = `${multiplier.toFixed(2)}×`;
      multiplierEl.classList.add("up");
      plane.style.left = `${16 + progress * 58}%`;
      plane.style.bottom = `${24 + progress * 36}%`;
      status.textContent = "Em voo · saque antes da queda";
      frame = requestAnimationFrame(tick);
    }

    startButton.addEventListener("click", () => {
      if (running) return;
      const amount = getBet();
      if (!canBet(amount)) return;
      setBalance(state.balance - amount);
      running = true;
      cashed = false;
      startedAt = 0;
      multiplier = 1;
      crashAt = 1.45 + Math.random() * 3.15;
      message.className = "game-message";
      message.textContent = "O avião está subindo. Saque no momento certo!";
      startButton.disabled = true;
      cashButton.disabled = false;
      frame = requestAnimationFrame(tick);
    });

    cashButton.addEventListener("click", () => {
      if (!running || cashed) return;
      cashed = true;
      running = false;
      cancelAnimationFrame(frame);
      frame = null;
      const prize = Math.round(getBet() * multiplier * 100) / 100;
      setBalance(state.balance + prize);
      message.className = "game-message win";
      message.textContent = `Saque em ${multiplier.toFixed(2)}×! Você recebeu ${money.format(prize)}.`;
      status.textContent = "Saque realizado";
      showToast(`Saque de ${money.format(prize)} realizado!`);
      cashButton.disabled = true;
      startButton.disabled = false;
      startButton.textContent = `Decolar por ${money.format(getBet())}`;
    });

    cleanup = () => { cancelAnimationFrame(frame); frame = null; running = false; };
  }

  function renderCoelho() {
    let bet = 10;
    let active = false;
    let picked = 0;
    let bombs = new Set();
    const multipliers = [1.2, 1.6, 2.15, 2.8, 3.6, 4.8, 6.5];

    gameArea.innerHTML = `
      <div class="game-panel">
        <div class="game-info"><span>Encontre as cenouras · evite as bombas</span><strong id="rabbitMult">1.00×</strong></div>
        <div class="rabbit-grid" id="rabbitGrid">
          ${Array.from({ length: 10 }, (_, index) => `<button class="rabbit-cell" type="button" data-rabbit="${index}" aria-label="Célula ${index + 1}">🥚</button>`).join("")}
        </div>
        <div class="game-message" id="rabbitMsg">Aposta pronta. Comece uma rodada e escolha as cenouras.</div>
        ${betControls(bet)}
        <button class="game-cta" type="button" id="rabbitStart">Começar por ${money.format(bet)}</button>
        <button class="game-cta secondary" type="button" id="rabbitCash" disabled>Retirar ganhos</button>
      </div>`;

    const grid = gameArea.querySelector("#rabbitGrid");
    const cells = [...grid.querySelectorAll(".rabbit-cell")];
    const message = gameArea.querySelector("#rabbitMsg");
    const multEl = gameArea.querySelector("#rabbitMult");
    const startButton = gameArea.querySelector("#rabbitStart");
    const cashButton = gameArea.querySelector("#rabbitCash");
    const getBet = wireBetControls(gameArea, (value) => {
      bet = value;
      if (!active) startButton.textContent = `Começar por ${money.format(bet)}`;
    }, bet);

    function finishRound(won, revealAll) {
      active = false;
      cells.forEach((cell, index) => {
        cell.disabled = true;
        if (revealAll && bombs.has(index)) {
          cell.textContent = "💣";
          cell.classList.add("boom");
        }
      });
      startButton.disabled = false;
      startButton.textContent = `Nova rodada por ${money.format(getBet())}`;
      cashButton.disabled = true;
      if (!won) {
        message.className = "game-message lose";
        message.textContent = `Bomba! Você perdeu ${money.format(getBet())}. Tente novamente.`;
        showToast("Bomba! Fim da rodada.");
      }
    }

    function resetGrid() {
      picked = 0;
      bombs = new Set();
      while (bombs.size < 3) bombs.add(Math.floor(Math.random() * cells.length));
      multEl.textContent = "1.00×";
      cells.forEach((cell) => {
        cell.disabled = false;
        cell.textContent = "🥚";
        cell.className = "rabbit-cell";
      });
    }

    startButton.addEventListener("click", () => {
      if (active) return;
      const amount = getBet();
      if (!canBet(amount)) return;
      setBalance(state.balance - amount);
      active = true;
      resetGrid();
      message.className = "game-message";
      message.textContent = "Rodada iniciada! Escolha uma célula.";
      startButton.disabled = true;
      cashButton.disabled = true;
    });

    cells.forEach((cell, index) => {
      cell.addEventListener("click", () => {
        if (!active || cell.disabled) return;
        cell.disabled = true;
        if (bombs.has(index)) {
          cell.textContent = "💣";
          cell.classList.add("boom");
          finishRound(false, true);
          return;
        }
        cell.textContent = "🥕";
        cell.classList.add("safe");
        picked += 1;
        const multiplier = multipliers[picked - 1];
        multEl.textContent = `${multiplier.toFixed(2)}×`;
        message.className = "game-message win";
        message.textContent = `Cenoura! Multiplicador em ${multiplier.toFixed(2)}×.`;
        cashButton.disabled = false;
      });
    });

    cashButton.addEventListener("click", () => {
      if (!active || picked === 0) return;
      const multiplier = multipliers[picked - 1];
      const prize = Math.round(getBet() * multiplier * 100) / 100;
      setBalance(state.balance + prize);
      message.className = "game-message win";
      message.textContent = `Você fugiu das bombas com ${money.format(prize)}!`;
      showToast(`Coelho pagou ${money.format(prize)}!`);
      finishRound(true, true);
    });

    cleanup = () => { active = false; };
  }

  function renderRoleta() {
    let bet = 10;
    let spinning = false;
    let rotation = 0;
    let timeout = null;
    const prizes = [
      { label: "0×", multiplier: 0 },
      { label: "0.5×", multiplier: 0.5 },
      { label: "1.5×", multiplier: 1.5 },
      { label: "2×", multiplier: 2 },
      { label: "3×", multiplier: 3 },
      { label: "5×", multiplier: 5 }
    ];

    gameArea.innerHTML = `
      <div class="game-panel">
        <div class="wheel-wrap">
          <div class="wheel-pointer" aria-hidden="true"></div>
          <div class="wheel" id="wheel" aria-hidden="true">🎡</div>
        </div>
        <div class="game-message" id="wheelMsg">Gire a roleta e descubra o multiplicador.</div>
        ${betControls(bet)}
        <button class="game-cta" type="button" id="wheelSpin">Girar por ${money.format(bet)}</button>
      </div>`;

    const wheel = gameArea.querySelector("#wheel");
    const message = gameArea.querySelector("#wheelMsg");
    const spinButton = gameArea.querySelector("#wheelSpin");
    const getBet = wireBetControls(gameArea, (value) => {
      bet = value;
      if (!spinning) spinButton.textContent = `Girar por ${money.format(bet)}`;
    }, bet);

    spinButton.addEventListener("click", () => {
      if (spinning) return;
      const amount = getBet();
      if (!canBet(amount)) return;
      setBalance(state.balance - amount);
      spinning = true;
      spinButton.disabled = true;
      spinButton.textContent = "Girando...";
      message.className = "game-message";
      message.textContent = "A roleta está girando...";
      const index = Math.floor(Math.random() * prizes.length);
      const segmentCenter = index * 60 + 30;
      rotation += 1800 + (360 - segmentCenter);
      wheel.style.transform = `rotate(${rotation}deg)`;
      timeout = setTimeout(() => {
        const prize = prizes[index];
        if (prize.multiplier > 0) {
          const value = Math.round(amount * prize.multiplier * 100) / 100;
          setBalance(state.balance + value);
          message.className = "game-message win";
          message.textContent = `Caiu ${prize.label}! Você recebeu ${money.format(value)}.`;
          showToast(`Roleta pagou ${money.format(value)}!`);
        } else {
          message.className = "game-message lose";
          message.textContent = "Caiu no 0×. Não foi dessa vez!";
        }
        spinning = false;
        spinButton.disabled = false;
        spinButton.textContent = `Girar por ${money.format(getBet())}`;
      }, 2150);
    });

    cleanup = () => { clearTimeout(timeout); spinning = false; };
  }

  function renderDados() {
    let bet = 10;
    let rolling = false;
    let timeout = null;

    gameArea.innerHTML = `
      <div class="game-panel">
        <div class="dice-row">
          <div class="die" id="dieOne">1</div>
          <div class="die" id="dieTwo">4</div>
        </div>
        <div class="game-message" id="diceMsg">Escolha sua previsão para a soma dos dados.</div>
        ${betControls(bet)}
        <button class="game-cta" type="button" id="diceHigh">7 ou mais · paga 1.9×</button>
        <button class="game-cta secondary" type="button" id="diceLow">Menos de 7 · paga 1.9×</button>
      </div>`;

    const dieOne = gameArea.querySelector("#dieOne");
    const dieTwo = gameArea.querySelector("#dieTwo");
    const message = gameArea.querySelector("#diceMsg");
    const highButton = gameArea.querySelector("#diceHigh");
    const lowButton = gameArea.querySelector("#diceLow");
    const getBet = wireBetControls(gameArea, (value) => { bet = value; }, bet);

    function roll(high) {
      if (rolling) return;
      const amount = getBet();
      if (!canBet(amount)) return;
      setBalance(state.balance - amount);
      rolling = true;
      highButton.disabled = true;
      lowButton.disabled = true;
      dieOne.classList.add("rolling");
      dieTwo.classList.add("rolling");
      message.className = "game-message";
      message.textContent = "Rolando os dados...";
      let ticks = 0;
      const rollInterval = setInterval(() => {
        dieOne.textContent = String(1 + Math.floor(Math.random() * 6));
        dieTwo.textContent = String(1 + Math.floor(Math.random() * 6));
        ticks += 1;
        if (ticks > 9) clearInterval(rollInterval);
      }, 75);
      timeout = setTimeout(() => {
        clearInterval(rollInterval);
        const one = 1 + Math.floor(Math.random() * 6);
        const two = 1 + Math.floor(Math.random() * 6);
        const sum = one + two;
        dieOne.textContent = String(one);
        dieTwo.textContent = String(two);
        dieOne.classList.remove("rolling");
        dieTwo.classList.remove("rolling");
        const won = high ? sum >= 7 : sum < 7;
        if (won) {
          const prize = Math.round(amount * 1.9 * 100) / 100;
          setBalance(state.balance + prize);
          message.className = "game-message win";
          message.textContent = `Soma ${sum}! Você ganhou ${money.format(prize)}.`;
          showToast(`Dados pagaram ${money.format(prize)}!`);
        } else {
          message.className = "game-message lose";
          message.textContent = `Soma ${sum}. A previsão não bateu. Tente de novo!`;
        }
        rolling = false;
        highButton.disabled = false;
        lowButton.disabled = false;
      }, 900);
    }

    highButton.addEventListener("click", () => roll(true));
    lowButton.addEventListener("click", () => roll(false));

    cleanup = () => { clearTimeout(timeout); rolling = false; };
  }

  function renderMines() {
    let bet = 10;
    let active = false;
    let picked = 0;
    let bombs = new Set();
    const safeMultipliers = [1.15, 1.35, 1.6, 1.9, 2.3, 2.8, 3.4, 4.2, 5.2];

    gameArea.innerHTML = `
      <div class="game-panel">
        <div class="game-info"><span>25 minas · 5 bombas</span><strong id="minesMult">1.00×</strong></div>
        <div class="mines-grid" id="minesGrid">
          ${Array.from({ length: 25 }, (_, index) => `<button class="mine-cell" type="button" data-mine="${index}" aria-label="Campo ${index + 1}">·</button>`).join("")}
        </div>
        <div class="game-message" id="minesMsg">Abra os campos com segurança e retire seus ganhos.</div>
        ${betControls(bet)}
        <button class="game-cta" type="button" id="minesStart">Começar por ${money.format(bet)}</button>
        <button class="game-cta secondary" type="button" id="minesCash" disabled>Retirar ganhos</button>
      </div>`;

    const grid = gameArea.querySelector("#minesGrid");
    const cells = [...grid.querySelectorAll(".mine-cell")];
    const message = gameArea.querySelector("#minesMsg");
    const multEl = gameArea.querySelector("#minesMult");
    const startButton = gameArea.querySelector("#minesStart");
    const cashButton = gameArea.querySelector("#minesCash");
    const getBet = wireBetControls(gameArea, (value) => {
      bet = value;
      if (!active) startButton.textContent = `Começar por ${money.format(bet)}`;
    }, bet);

    function finish(revealAll) {
      active = false;
      cells.forEach((cell, index) => {
        cell.disabled = true;
        if (revealAll && bombs.has(index)) {
          cell.textContent = "💥";
          cell.classList.add("boom");
        }
      });
      startButton.disabled = false;
      startButton.textContent = `Nova rodada por ${money.format(getBet())}`;
      cashButton.disabled = true;
    }

    startButton.addEventListener("click", () => {
      if (active) return;
      const amount = getBet();
      if (!canBet(amount)) return;
      setBalance(state.balance - amount);
      active = true;
      picked = 0;
      bombs = new Set();
      while (bombs.size < 5) bombs.add(Math.floor(Math.random() * cells.length));
      multEl.textContent = "1.00×";
      cells.forEach((cell) => {
        cell.disabled = false;
        cell.textContent = "·";
        cell.className = "mine-cell";
      });
      message.className = "game-message";
      message.textContent = "Rodada iniciada! Escolha um campo.";
      startButton.disabled = true;
      cashButton.disabled = true;
    });

    cells.forEach((cell, index) => {
      cell.addEventListener("click", () => {
        if (!active || cell.disabled) return;
        cell.disabled = true;
        if (bombs.has(index)) {
          cell.textContent = "💣";
          cell.classList.add("boom");
          message.className = "game-message lose";
          message.textContent = `Bomba! Você perdeu ${money.format(getBet())}.`;
          showToast("Bomba! Fim da rodada.");
          finish(true);
          return;
        }
        cell.textContent = "💎";
        cell.classList.add("safe");
        picked += 1;
        const multiplier = safeMultipliers[picked - 1];
        multEl.textContent = `${multiplier.toFixed(2)}×`;
        message.className = "game-message win";
        message.textContent = `Diamante! Multiplicador em ${multiplier.toFixed(2)}×.`;
        cashButton.disabled = false;
      });
    });

    cashButton.addEventListener("click", () => {
      if (!active || picked === 0) return;
      const multiplier = safeMultipliers[picked - 1];
      const prize = Math.round(getBet() * multiplier * 100) / 100;
      setBalance(state.balance + prize);
      message.className = "game-message win";
      message.textContent = `Saída segura com ${money.format(prize)}!`;
      showToast(`Minas pagaram ${money.format(prize)}!`);
      finish(true);
    });

    cleanup = () => { active = false; };
  }

  document.querySelectorAll("[data-open-game]").forEach((button) => {
    button.addEventListener("click", () => openGame(button.dataset.openGame));
  });

  document.querySelectorAll("[data-close-modal]").forEach((element) => {
    element.addEventListener("click", closeGame);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) closeGame();
  });

  document.querySelectorAll(".filter").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".filter").forEach((item) => item.classList.toggle("is-active", item === button));
      const filter = button.dataset.filter;
      document.querySelectorAll(".game-card").forEach((card) => {
        card.hidden = filter !== "todos" && card.dataset.kind !== filter;
      });
    });
  });

  document.querySelectorAll(".main-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      document.querySelectorAll(".main-nav a").forEach((item) => item.classList.toggle("is-active", item === link));
    });
  });

  document.getElementById("loginBtn").addEventListener("click", () => {
    showToast("Modo demo: não é necessário entrar para jogar.");
  });

  setBalance(state.balance);
  document.body.dataset.ready = "true";
})();
