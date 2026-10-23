export class HUD {
  constructor() {
    this.el = {
      hud: document.getElementById('hud'),
      healthBar: document.getElementById('health-bar'),
      healthValue: document.getElementById('health-value'),
      score: document.getElementById('score-value'),
      kills: document.getElementById('kills-value'),
      ammoMag: document.getElementById('ammo-mag'),
      ammoReserve: document.getElementById('ammo-reserve'),
      fireMode: document.getElementById('fire-mode'),
      status: document.getElementById('status-text'),
      killfeed: document.getElementById('killfeed'),
      hitmarker: document.getElementById('hitmarker'),
      crosshair: document.getElementById('crosshair'),
      damageFlash: document.getElementById('damage-flash'),
      damageIndicators: document.getElementById('damage-indicators'),
      reload: document.getElementById('reload-indicator'),
      reloadProgress: document.getElementById('reload-progress'),
      waveBanner: document.getElementById('wave-banner'),
      waveNumber: document.getElementById('wave-number'),
      waveSub: document.getElementById('wave-sub'),
      compass: document.getElementById('compass'),
      radar: document.getElementById('radar'),
      pauseBtn: document.getElementById('btn-pause'),
      touchUI: document.getElementById('touch-ui'),
      objectiveSub: document.querySelector('.objective-sub'),
      startScreen: document.getElementById('start-screen'),
      pauseScreen: document.getElementById('pause-screen'),
      deathScreen: document.getElementById('death-screen'),
      rotateHint: document.getElementById('rotate-hint')
    }
    this.compassW = 340
    this.compassH = 30
    this.radarW = 132
    this.radarH = 132
    this.canvasDpr = Math.min(2, window.devicePixelRatio || 1)
    this.el.compass.width = this.compassW * this.canvasDpr
    this.el.compass.height = this.compassH * this.canvasDpr
    this.el.radar.width = this.radarW * this.canvasDpr
    this.el.radar.height = this.radarH * this.canvasDpr
    this.compassCtx = this.el.compass.getContext('2d')
    this.radarCtx = this.el.radar.getContext('2d')
    this.hitTimer = 0
    this.flashAmount = 0
    this.waveTimer = 0
    this.arrows = []
    this.lastHealth = 100
    this.healthPulse = 0
    this.radarTime = 0
    this.compassTime = 0
  }

  show() { this.el.hud.classList.remove('hidden') }
  hide() { this.el.hud.classList.add('hidden') }
  showTouch(show) {
    if (show) this.el.touchUI.classList.remove('hidden')
    else this.el.touchUI.classList.add('hidden')
  }
  showPauseButton(show) { this.el.pauseBtn.classList.toggle('hidden', !show) }

  setAmmo({ mag, reserve }) {
    this.el.ammoMag.textContent = String(mag).padStart(2, '0')
    this.el.ammoReserve.textContent = String(reserve)
    this.el.ammoMag.style.color = mag === 0 ? '#e2503f' : mag <= 6 ? '#f2b45c' : '#ffffff'
  }

  setHealth(hp) {
    const v = Math.max(0, Math.round(hp))
    this.el.healthBar.style.width = `${Math.max(0, Math.min(100, v))}%`
    this.el.healthBar.classList.toggle('low', v <= 35)
    this.el.healthValue.textContent = String(v)
    if (v < this.lastHealth) {
      this.flashAmount = Math.min(1, this.flashAmount + 0.42)
    }
    this.lastHealth = v
    this.el.status.textContent = v <= 0 ? 'ABATIDO' : v <= 35 ? 'CRÍTICO' : v < 100 ? 'EM COMBATE' : 'EM COMBATE'
    this.el.status.style.color = v <= 35 ? '#e2503f' : '#f2b45c'
  }

  setScore(score, kills) {
    this.el.score.textContent = score.toLocaleString('pt-BR')
    this.el.kills.textContent = String(kills)
  }

  setCrosshairAim(ads) {
    this.el.crosshair.classList.toggle('ads', ads)
  }

  setObjective(text) {
    this.el.objectiveSub.textContent = text
  }

  showWave(number, sub = 'HOSTIS A CAMINHO') {
    this.el.waveNumber.textContent = String(number).padStart(2, '0')
    this.el.waveSub.textContent = sub
    this.el.waveBanner.classList.add('show')
    this.waveTimer = 2.6
  }

  hideWave() { this.el.waveBanner.classList.remove('show') }

  hitmarker(headshot = false, killed = false) {
    this.el.hitmarker.classList.remove('show', 'head', 'kill')
    void this.el.hitmarker.offsetWidth
    this.el.hitmarker.classList.add('show')
    if (headshot) this.el.hitmarker.classList.add('head')
    if (killed) this.el.hitmarker.classList.add('kill')
    this.hitTimer = killed ? 0.34 : 0.18
  }

  killfeed(headshot = false, weapon = 'M4A1') {
    const entry = document.createElement('div')
    entry.className = 'killfeed-entry' + (headshot ? ' head' : '')
    entry.innerHTML = `<span class="tag">${headshot ? 'HS' : 'KILL'}</span><span>VOCÊ</span><span style="opacity:.5">▸</span><span>${weapon}</span><span style="opacity:.5">▸</span><span style="color:rgba(255,255,255,.55)">HOSTIL</span>`
    this.el.killfeed.appendChild(entry)
    while (this.el.killfeed.children.length > 5) this.el.killfeed.firstChild.remove()
    setTimeout(() => { entry.classList.add('out'); setTimeout(() => entry.remove(), 500) }, 3800)
  }

  damage(amount, source, yaw, playerPos) {
    this.flashAmount = Math.min(1, this.flashAmount + amount / 26)
    if (!source) return
    const dx = source.x - playerPos.x
    const dz = source.z - playerPos.z
    const fx = -Math.sin(yaw)
    const fz = -Math.cos(yaw)
    const rel = Math.atan2(fx * dz - fz * dx, fx * dx + fz * dz)
    const div = document.createElement('div')
    div.className = 'dmg-arrow'
    div.style.transform = `rotate(${rel}rad)`
    div.style.transition = 'opacity .85s ease-out'
    this.el.damageIndicators.appendChild(div)
    requestAnimationFrame(() => { div.style.opacity = '0' })
    setTimeout(() => div.remove(), 900)
  }

  reloadStart() {
    this.el.reload.classList.add('show')
  }
  reloadProgress(p) {
    this.el.reloadProgress.style.width = `${Math.min(1, p) * 100}%`
  }
  reloadEnd() {
    this.el.reload.classList.remove('show')
    this.el.reloadProgress.style.width = '0%'
  }

  showDeath(wave, kills, score) {
    document.getElementById('death-wave').textContent = String(wave).padStart(2, '0')
    document.getElementById('death-kills').textContent = String(kills)
    document.getElementById('death-score').textContent = score.toLocaleString('pt-BR')
    this.el.deathScreen.classList.remove('hidden')
  }

  showPause(wave, kills, score) {
    document.getElementById('pause-wave').textContent = String(wave).padStart(2, '0')
    document.getElementById('pause-kills').textContent = String(kills)
    document.getElementById('pause-score').textContent = score.toLocaleString('pt-BR')
    this.el.pauseScreen.classList.remove('hidden')
  }

  hidePause() { this.el.pauseScreen.classList.add('hidden') }
  hideDeath() { this.el.deathScreen.classList.add('hidden') }

  update(dt, { yaw, playerPos, enemies, world, health, reloading, reloadProgress: rp, ads, moving }) {
    if (this.hitTimer > 0) {
      this.hitTimer -= dt
      if (this.hitTimer <= 0) this.el.hitmarker.classList.remove('show', 'head', 'kill')
    }
    if (this.waveTimer > 0) {
      this.waveTimer -= dt
      if (this.waveTimer <= 0) this.hideWave()
    }
    if (this.flashAmount > 0) {
      this.flashAmount = Math.max(0, this.flashAmount - dt * 2.4)
      this.el.damageFlash.style.opacity = String(this.flashAmount)
    }
    if (reloading) {
      this.el.reload.classList.add('show')
      this.el.reloadProgress.style.width = `${Math.min(1, rp) * 100}%`
    } else {
      this.el.reload.classList.remove('show')
    }

    this.radarTime += dt
    this.compassTime += dt
    if (this.radarTime > 1 / 30) {
      this.radarTime = 0
      this.drawRadar(yaw, playerPos, enemies, world)
    }
    if (this.compassTime > 1 / 30) {
      this.compassTime = 0
      this.drawCompass(yaw, enemies, playerPos)
    }
  }

  drawCompass(yaw, enemies, playerPos) {
    const ctx = this.compassCtx
    const w = this.compassW
    const h = this.compassH
    ctx.setTransform(this.canvasDpr, 0, 0, this.canvasDpr, 0, 0)
    ctx.clearRect(0, 0, w, h)
    const heading = ((-yaw * 180) / Math.PI % 360 + 360) % 360
    const span = 88
    const pxPerDeg = w / span
    ctx.strokeStyle = 'rgba(255,255,255,0.22)'
    ctx.fillStyle = 'rgba(255,255,255,0.55)'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'alphabetic'
    ctx.lineWidth = 1
    const start = Math.ceil((heading - span / 2) / 5) * 5
    for (let d = start; d <= heading + span / 2; d += 5) {
      const rel = d - heading
      const x = w / 2 + rel * pxPerDeg
      const norm = ((d % 360) + 360) % 360
      const major = norm % 15 === 0
      ctx.globalAlpha = major ? 0.9 : 0.4
      ctx.beginPath()
      ctx.moveTo(x, h - (major ? 9 : 6))
      ctx.lineTo(x, h - 2)
      ctx.stroke()
      if (norm % 45 === 0) {
        const labels = { 0: 'N', 45: 'NE', 90: 'E', 135: 'SE', 180: 'S', 225: 'SW', 270: 'W', 315: 'NW' }
        ctx.globalAlpha = 1
        ctx.fillStyle = norm === 0 ? '#f2b45c' : 'rgba(255,255,255,0.8)'
        ctx.font = '600 12px "Barlow", sans-serif'
        ctx.fillText(labels[norm] || String(norm), x, 14)
      } else if (norm % 30 === 0) {
        ctx.globalAlpha = 0.38
        ctx.fillStyle = 'rgba(255,255,255,0.65)'
        ctx.font = '9px "Share Tech Mono", monospace'
        ctx.fillText(String(norm).padStart(3, '0'), x, 13)
      }
    }
    ctx.globalAlpha = 1
    ctx.fillStyle = '#f2b45c'
    ctx.beginPath()
    ctx.moveTo(w / 2, 18)
    ctx.lineTo(w / 2 - 4, 24)
    ctx.lineTo(w / 2 + 4, 24)
    ctx.closePath()
    ctx.fill()
    ctx.strokeStyle = 'rgba(242,180,92,0.35)'
    ctx.beginPath()
    ctx.moveTo(w / 2, 24)
    ctx.lineTo(w / 2, h)
    ctx.stroke()

    for (const e of enemies) {
      if (!e.alive) continue
      const dx = e.root.position.x - playerPos.x
      const dz = e.root.position.z - playerPos.z
      if (Math.hypot(dx, dz) > 48) continue
      const bearing = ((Math.atan2(dx, -dz) * 180) / Math.PI + 360) % 360
      let rel = bearing - heading
      rel = ((rel + 540) % 360) - 180
      if (Math.abs(rel) > span / 2) continue
      const x = w / 2 + rel * pxPerDeg
      ctx.fillStyle = 'rgba(255,80,60,0.95)'
      ctx.beginPath()
      ctx.moveTo(x, 2)
      ctx.lineTo(x - 3.5, 7)
      ctx.lineTo(x + 3.5, 7)
      ctx.closePath()
      ctx.fill()
    }
  }

  drawRadar(yaw, playerPos, enemies, world) {
    const ctx = this.radarCtx
    const w = this.radarW
    const h = this.radarH
    ctx.setTransform(this.canvasDpr, 0, 0, this.canvasDpr, 0, 0)
    ctx.clearRect(0, 0, w, h)
    const cx = w / 2
    const cy = h / 2
    const range = 34
    const scale = (Math.min(w, h) / 2 - 12) / range
    const sin = Math.sin(yaw)
    const cos = Math.cos(yaw)

    ctx.save()
    ctx.beginPath()
    ctx.arc(cx, cy, Math.min(w, h) / 2 - 4, 0, Math.PI * 2)
    ctx.clip()

    // rings
    ctx.strokeStyle = 'rgba(134,214,200,0.12)'
    ctx.lineWidth = 1
    for (let r = 1; r <= 3; r++) {
      ctx.beginPath()
      ctx.arc(cx, cy, (Math.min(w, h) / 2 - 10) * (r / 3), 0, Math.PI * 2)
      ctx.stroke()
    }
    ctx.beginPath()
    ctx.moveTo(cx, 8); ctx.lineTo(cx, h - 8)
    ctx.moveTo(8, cy); ctx.lineTo(w - 8, cy)
    ctx.stroke()

    // nearby cover
    ctx.fillStyle = 'rgba(180,190,180,0.13)'
    for (const c of world.colliders) {
      const mx = (c.minX + c.maxX) / 2
      const mz = (c.minZ + c.maxZ) / 2
      const dx = mx - playerPos.x
      const dz = mz - playerPos.z
      if (Math.hypot(dx, dz) > range) continue
      const x = dx * cos - dz * sin
      const y = dx * sin + dz * cos
      const bw = (c.maxX - c.minX) * scale
      const bh = (c.maxZ - c.minZ) * scale
      ctx.save()
      ctx.translate(cx + x * scale, cy + y * scale)
      ctx.rotate(-yaw)
      ctx.fillRect(-bw / 2, -bh / 2, bw, bh)
      ctx.restore()
    }

    // enemies
    for (const e of enemies) {
      if (!e.alive) continue
      const dx = e.root.position.x - playerPos.x
      const dz = e.root.position.z - playerPos.z
      const d = Math.hypot(dx, dz)
      if (d > range) continue
      const x = dx * cos - dz * sin
      const y = dx * sin + dz * cos
      const px = cx + x * scale
      const py = cy + y * scale
      const glow = ctx.createRadialGradient(px, py, 0, px, py, 10)
      glow.addColorStop(0, 'rgba(255,90,60,0.8)')
      glow.addColorStop(1, 'rgba(255,90,60,0)')
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(px, py, 10, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#ff6a4a'
      ctx.beginPath()
      ctx.arc(px, py, 2.6, 0, Math.PI * 2)
      ctx.fill()
    }

    // cardinals
    ctx.font = '11px "Share Tech Mono", monospace'
    ctx.textAlign = 'center'
    ctx.fillStyle = 'rgba(255,255,255,0.4)'
    const cardinals = [['N', 0, -1], ['E', 1, 0], ['S', 0, 1], ['W', -1, 0]]
    for (const [label, ax, ay] of cardinals) {
      const x = ax * cos - ay * sin
      const y = ax * sin + ay * cos
      const r = Math.min(w, h) / 2 - 12
      ctx.fillText(label, cx + x * r, cy + y * r + 4)
    }

    // player
    ctx.fillStyle = '#f2b45c'
    ctx.beginPath()
    ctx.moveTo(cx, cy - 8)
    ctx.lineTo(cx - 5, cy + 5)
    ctx.lineTo(cx + 5, cy + 5)
    ctx.closePath()
    ctx.fill()
    ctx.restore()

    // outer arc
    ctx.strokeStyle = 'rgba(134,214,200,0.35)'
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.arc(cx, cy, Math.min(w, h) / 2 - 4, -Math.PI * 0.65, -Math.PI * 0.35)
    ctx.stroke()
  }
}
