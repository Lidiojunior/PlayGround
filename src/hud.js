const $ = id => document.getElementById(id);

export function createHUD() {
  const el = {
    hud: $('hud'), menu: $('menu'), pause: $('pause'), end: $('end'), loader: $('loader'),
    objTitle: $('obj-title'), objCount: $('obj-count'), objWave: $('obj-wave'), objBar: $('obj-bar'),
    score: $('score-val'), kills: $('kills-val'), heads: $('headshots-val'),
    healthFill: $('health-fill'), healthVal: $('health-val'), vitals: document.querySelector('.vitals'), vitalsState: $('vitals-state'),
    ammoMag: $('ammo-mag'), ammoReserve: $('ammo-reserve'), reloadBar: $('reload-bar'), reloadFill: $('reload-fill'), pips: $('ammo-pips'),
    crosshair: $('crosshair'), hitmarker: $('hitmarker'), dmg: $('dmg-arc'),
    compassCanvas: $('compass-canvas'), compassHeading: $('compass-heading'), compassWrap: $('compass-wrap'),
    minimap: $('minimap'), killfeed: $('killfeed'),
    banner: $('banner'), bannerTitle: $('banner-title'), bannerSub: $('banner-sub'), controlHint: $('control-hint'),
    endKicker: $('end-kicker'), endTitle: $('end-title'), endSub: $('end-sub'), endScore: $('end-score'),
    endKills: $('end-kills'), endHeads: $('end-heads'), endAcc: $('end-acc'),
    pauseKills: $('pause-kills'), pauseScore: $('pause-score'),
    loaderStatus: $('loader-status'), loaderPct: $('loader-pct'), loaderFill: $('loader-fill'),
    qualityNote: $('quality-note'), menuMute: $('btn-menu-mute'), pauseMute: $('btn-pause-mute'), muteBtn: $('btn-mute'),
    touch: $('touch-ui'), rotateHint: $('rotate-hint'),
  };

  // ---- compass ----
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const cctx = el.compassCanvas.getContext('2d');
  let compassW = 1, compassH = 1, compassDpr = 1;
  function sizeCompass() {
    const r = el.compassWrap.getBoundingClientRect();
    compassW = Math.max(1, r.width); compassH = Math.max(1, r.height);
    compassDpr = Math.min(2, window.devicePixelRatio || 1);
    el.compassCanvas.width = Math.round(compassW * compassDpr);
    el.compassCanvas.height = Math.round(compassH * compassDpr);
    cctx.setTransform(compassDpr, 0, 0, compassDpr, 0, 0);
  }
  sizeCompass();
  window.addEventListener('resize', sizeCompass);

  // ---- ammo pips ----
  const PIP_COUNT = 15;
  for (let i = 0; i < PIP_COUNT; i++) el.pips.appendChild(document.createElement('i'));

  // ---- minimap ----
  const mctx = el.minimap.getContext('2d');
  const MAP_SIZE = 160, MAP_SCALE = 1.7, MAP_R = 76;

  let health = 100, mag = 30, reserve = 120;
  let lastHealth = -1, lastVitals = '', lastMag = -1, lastReserve = -1;
  let lastScore = -1, lastKills = -1, lastHeads = -1, lastHeading = -1;
  let lastObjective = '';
  let bannerTimer = 0, feedId = 0;
  const feedTimers = new Set();

  function updateCompass(yaw) {
    const heading = ((360 - (yaw * 180 / Math.PI)) % 360 + 360) % 360;
    const rounded = Math.round(heading) % 360;
    if (rounded !== lastHeading) {
      lastHeading = rounded;
      el.compassHeading.textContent = String(rounded).padStart(3, '0');
    }
    const w = compassW, h = compassH, cx = w / 2, ppd = 3, base = h - 13;
    cctx.clearRect(0, 0, w, h);
    const start = Math.floor((heading - 75) / 15) * 15;
    for (let deg = start; deg <= heading + 75; deg += 15) {
      const x = cx + (deg - heading) * ppd;
      if (x < -8 || x > w + 8) continue;
      const norm = ((deg % 360) + 360) % 360;
      const isMajor = norm % 45 === 0;
      const isCard = norm % 90 === 0;
      cctx.strokeStyle = isMajor ? 'rgba(240,232,214,0.68)' : 'rgba(240,232,214,0.3)';
      cctx.lineWidth = 1;
      cctx.beginPath(); cctx.moveTo(x, base - (isMajor ? 9 : 5)); cctx.lineTo(x, base); cctx.stroke();
      if (isMajor) {
        cctx.font = `${isCard ? 9 : 8}px "SFMono-Regular", "JetBrains Mono", Consolas, monospace`;
        cctx.textAlign = 'center';
        cctx.textBaseline = 'alphabetic';
        cctx.fillStyle = isCard ? '#ffdba1' : 'rgba(242,238,227,0.62)';
        cctx.fillText(dirs[norm / 45] ?? '', x, base - 13);
      }
    }
  }

  function setHealth(h) {
    health = Math.max(0, Math.min(100, h));
    const shown = Math.ceil(health);
    if (shown !== lastHealth) {
      lastHealth = shown;
      el.healthFill.style.width = `${health}%`;
      el.healthVal.textContent = shown;
    }
    const crit = health <= 34;
    const label = crit ? 'CRITICAL // SEEK COVER' : health < 75 ? 'INJURY DETECTED' : 'VITALS STABLE';
    if (label !== lastVitals) {
      lastVitals = label;
      el.vitals.classList.toggle('critical', crit);
      el.vitalsState.textContent = label;
    }
  }

  function setAmmo(m, r) {
    if (m === lastMag && r === lastReserve) return;
    const magChanged = m !== lastMag;
    mag = m; reserve = r; lastMag = m; lastReserve = r;
    el.ammoMag.textContent = String(m);
    el.ammoReserve.textContent = String(r);
    if (magChanged) {
      const filled = Math.ceil(m / 2);
      [...el.pips.children].forEach((p, i) => p.classList.toggle('empty', i >= filled));
    }
  }

  function setReload(p) {
    el.reloadBar.classList.add('active');
    el.reloadFill.style.width = `${Math.max(0, Math.min(1, p)) * 100}%`;
  }
  function hideReload() { el.reloadBar.classList.remove('active'); el.reloadFill.style.width = '0%'; }

  function setScore(score, kills, heads) {
    if (score === lastScore && kills === lastKills && heads === lastHeads) return;
    lastScore = score; lastKills = kills; lastHeads = heads;
    el.score.textContent = String(score);
    el.kills.textContent = String(kills);
    el.heads.textContent = String(heads);
    el.pauseKills.textContent = `${kills} KILLS`;
    el.pauseScore.textContent = `${score} PTS`;
  }

  function setObjective(title, remaining, total, wave) {
    const key = `${title}|${remaining}|${total}|${wave}`;
    if (key === lastObjective) return;
    lastObjective = key;
    el.objTitle.textContent = title;
    el.objCount.textContent = `${remaining} / ${total} HOSTIS`;
    el.objWave.textContent = `WAVE ${String(wave).padStart(2, '0')}`;
    el.objBar.style.width = `${total > 0 ? ((total - remaining) / total) * 100 : 0}%`;
  }

  function banner(title, sub, duration = 3.4) {
    el.bannerTitle.textContent = title;
    el.bannerSub.textContent = sub;
    el.banner.classList.remove('show');
    void el.banner.offsetWidth;
    el.banner.classList.add('show');
    clearTimeout(bannerTimer);
    bannerTimer = setTimeout(() => el.banner.classList.remove('show'), duration * 1000);
  }

  function hitmarker(head = false) {
    el.hitmarker.classList.remove('show', 'head');
    void el.hitmarker.offsetWidth;
    el.hitmarker.classList.add('show');
    el.hitmarker.classList.toggle('head', head);
  }

  const names = ['HOSTILE-1', 'HOSTILE-2', 'HOSTILE-3', 'VIPER', 'SCORPION', 'JACKAL', 'WRAITH', 'GHOST-4', 'TALON', 'HYENA', 'RAVEN', 'DAGGER'];
  function killfeed(headshot) {
    const item = document.createElement('div');
    item.className = 'feed-item';
    const name = names[(Math.random() * names.length) | 0];
    item.innerHTML = `<span class="feed-you">YOU</span><span>VK-74</span><span>${name}</span>${headshot ? '<span class="feed-head">HEADSHOT</span>' : ''}`;
    el.killfeed.prepend(item);
    while (el.killfeed.children.length > 4) el.killfeed.lastElementChild.remove();
    const timer = setTimeout(() => {
      item.classList.add('out');
      setTimeout(() => item.remove(), 380);
      feedTimers.delete(timer);
    }, 4200);
    feedTimers.add(timer);
  }

  function damage(fromPos, player) {
    const p = player.state;
    const dx = fromPos.x - p.position.x, dz = fromPos.z - p.position.z;
    const fx = -Math.sin(p.yaw), fz = -Math.cos(p.yaw);
    const rx = Math.cos(p.yaw), rz = -Math.sin(p.yaw);
    const angle = Math.atan2(dx * rx + dz * rz, dx * fx + dz * fz);
    el.dmg.style.transform = `rotate(${angle}rad)`;
    el.dmg.classList.remove('show');
    void el.dmg.offsetWidth;
    el.dmg.classList.add('show');
  }

  function setCrosshair(ads, spread, visible = true) {
    el.crosshair.style.opacity = visible && !ads ? '1' : '0';
    el.crosshair.style.setProperty('--gap', `${Math.min(34, Math.max(4, spread))}px`);
  }

  function updateMinimap(player, enemies, world, time) {
    const p = player.state;
    const ctx = mctx;
    ctx.setTransform(2, 0, 0, 2, 0, 0);
    ctx.clearRect(0, 0, MAP_SIZE, MAP_SIZE);
    const cx = MAP_SIZE / 2, cy = MAP_SIZE / 2;

    ctx.save();
    ctx.beginPath(); ctx.arc(cx, cy, MAP_R, 0, Math.PI * 2); ctx.clip();
    const bg = ctx.createRadialGradient(cx, cy, 4, cx, cy, MAP_R);
    bg.addColorStop(0, 'rgba(24,28,26,0.86)');
    bg.addColorStop(1, 'rgba(6,9,9,0.92)');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, MAP_SIZE, MAP_SIZE);

    // grid
    ctx.strokeStyle = 'rgba(230,205,160,0.07)'; ctx.lineWidth = 1;
    const step = 10 * MAP_SCALE;
    const ox = ((cx - p.position.x * MAP_SCALE) % step + step) % step;
    const oz = ((cy - p.position.z * MAP_SCALE) % step + step) % step;
    ctx.beginPath();
    for (let x = ox; x < MAP_SIZE; x += step) { ctx.moveTo(x, 0); ctx.lineTo(x, MAP_SIZE); }
    for (let y = oz; y < MAP_SIZE; y += step) { ctx.moveTo(0, y); ctx.lineTo(MAP_SIZE, y); }
    ctx.stroke();

    // range rings
    ctx.strokeStyle = 'rgba(230,205,160,0.08)';
    for (const r of [26, 52]) { ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke(); }

    // colliders / structures
    for (const b of world.colliders) {
      const w = (b.max.x - b.min.x) * MAP_SCALE, h = (b.max.z - b.min.z) * MAP_SCALE;
      const x = cx + (b.min.x - p.position.x) * MAP_SCALE;
      const y = cy + (b.min.z - p.position.z) * MAP_SCALE;
      if (x > MAP_SIZE || y > MAP_SIZE || x + w < 0 || y + h < 0) continue;
      if (b.max.y - b.min.y < 0.3) continue;
      ctx.fillStyle = b.max.y > 4 ? 'rgba(196,186,160,0.16)' : 'rgba(196,186,160,0.1)';
      ctx.fillRect(x, y, Math.max(1, w), Math.max(1, h));
      ctx.strokeStyle = 'rgba(230,212,175,0.16)'; ctx.lineWidth = 0.7;
      ctx.strokeRect(x, y, Math.max(1, w), Math.max(1, h));
    }

    // radar sweep
    const sweep = time * 0.9;
    const grad = ctx.createLinearGradient(cx, cy, cx + Math.cos(sweep) * MAP_R, cy + Math.sin(sweep) * MAP_R);
    grad.addColorStop(0, 'rgba(230,178,103,0)'); grad.addColorStop(1, 'rgba(230,178,103,0.16)');
    ctx.strokeStyle = grad; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(sweep) * MAP_R, cy + Math.sin(sweep) * MAP_R); ctx.stroke();

    // enemies
    for (const e of enemies) {
      if (!e.alive) continue;
      const ex = cx + (e.position.x - p.position.x) * MAP_SCALE;
      const ey = cy + (e.position.z - p.position.z) * MAP_SCALE;
      if ((ex - cx) ** 2 + (ey - cy) ** 2 > MAP_R * MAP_R) continue;
      ctx.fillStyle = e.hasLOS ? '#ff5136' : 'rgba(255,80,50,0.55)';
      ctx.beginPath(); ctx.arc(ex, ey, e.hasLOS ? 2.6 : 2, 0, Math.PI * 2); ctx.fill();
      if (e.hasLOS) {
        ctx.strokeStyle = 'rgba(255,70,40,0.3)'; ctx.lineWidth = 0.8;
        ctx.beginPath(); ctx.arc(ex, ey, 5, 0, Math.PI * 2); ctx.stroke();
      }
      const a = e.aimYaw;
      ctx.strokeStyle = 'rgba(255,120,90,0.6)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(ex - Math.sin(a) * 6, ey - Math.cos(a) * 6); ctx.stroke();
    }

    // player arrow
    const heading = (360 - (p.yaw * 180 / Math.PI)) % 360;
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(heading * Math.PI / 180);
    ctx.fillStyle = '#ffd99a'; ctx.shadowColor = 'rgba(255,200,120,0.8)'; ctx.shadowBlur = 6;
    ctx.beginPath(); ctx.moveTo(0, -6); ctx.lineTo(4.2, 4); ctx.lineTo(0, 2.2); ctx.lineTo(-4.2, 4); ctx.closePath(); ctx.fill();
    ctx.restore();

    ctx.restore();
    // outer ticks
    ctx.strokeStyle = 'rgba(230,178,103,0.28)'; ctx.lineWidth = 1;
    for (let i = 0; i < 24; i++) {
      const a = i / 24 * Math.PI * 2;
      const r1 = MAP_R + 1, r2 = i % 3 === 0 ? MAP_R + 5 : MAP_R + 3;
      ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1); ctx.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2); ctx.stroke();
    }
  }

  function showMenu(show) {
    el.menu.classList.toggle('is-hidden', !show);
    document.body.classList.toggle('playing', !show);
  }
  function showHUD(show) { el.hud.classList.toggle('is-hidden', !show); }
  function showPause(show) {
    el.pause.classList.toggle('is-hidden', !show);
    document.body.classList.toggle('paused', show);
  }
  function showEnd(stats, victory) {
    el.endKicker.textContent = victory ? 'MISSION STATUS // COMPLETE' : 'OPERATOR STATUS // K.I.A.';
    el.endTitle.textContent = victory ? 'PERIMETER SECURE' : 'OPERATOR DOWN';
    el.endSub.textContent = victory ? 'Todos os setores limpos. Extração autorizada.' : 'Reforce o esquadrão. Tente novamente.';
    el.endScore.textContent = String(stats.score);
    el.endKills.textContent = String(stats.kills);
    el.endHeads.textContent = String(stats.headshots);
    const acc = stats.shots > 0 ? Math.round((stats.hits / stats.shots) * 100) : 0;
    el.endAcc.textContent = `${acc}%`;
    el.end.classList.remove('is-hidden');
    document.body.classList.remove('playing');
  }
  function hideEnd() { el.end.classList.add('is-hidden'); }

  function setMuted(m) {
    el.muteBtn.classList.toggle('muted', m);
    el.menuMute.textContent = `SOM: ${m ? 'OFF' : 'ON'}`;
    el.pauseMute.textContent = `SOM: ${m ? 'OFF' : 'ON'}`;
  }
  function setQuality(text) { el.qualityNote.textContent = `QUALIDADE: ${text}`; }
  function setHint(text) { el.controlHint.textContent = text; }

  function loader(pct, status) {
    el.loaderFill.style.width = `${Math.min(100, pct)}%`;
    el.loaderPct.textContent = `${Math.round(pct)}%`;
    if (status) el.loaderStatus.textContent = status;
  }
  function loaderDone() { el.loader.classList.add('done'); }

  function resetFeed() {
    el.killfeed.innerHTML = '';
    for (const t of feedTimers) clearTimeout(t);
    feedTimers.clear();
  }

  function setTouch(on) {
    document.body.classList.toggle('touch', on);
  }

  return {
    el, updateCompass, setHealth, setAmmo, setReload, hideReload, setScore, setObjective,
    banner, hitmarker, killfeed, damage, setCrosshair, updateMinimap,
    showMenu, showHUD, showPause, showEnd, hideEnd, setMuted, setQuality, setHint,
    loader, loaderDone, resetFeed, setTouch,
  };
}
