export class HUD {
  constructor() {
    const $ = (id) => document.getElementById(id)
    this.el = {
      hud: $('hud'),
      healthVal: $('health-val'),
      healthFill: $('health-fill'),
      healthStatus: $('health-status'),
      healthPulse: $('health-pulse'),
      compassStrip: $('compass-strip'),
      waveLabel: $('wave-label'),
      enemyCount: $('enemy-count'),
      score: $('score'),
      kills: $('kills'),
      ammoMag: $('ammo-mag'),
      ammoReserve: $('ammo-reserve'),
      weaponName: $('weapon-name'),
      fireMode: $('fire-mode'),
      crosshair: $('crosshair'),
      hitmarker: $('hitmarker'),
      damageArc: $('damage-arc'),
      damageFlash: $('damage-flash'),
      reloadHint: $('reload-hint'),
      reloadFill: $('reload-fill'),
      killfeed: $('killfeed'),
      banner: $('banner'),
      bannerTitle: $('banner-title'),
      bannerSub: $('banner-sub'),
      objective: $('objective-text'),
      lookHint: $('look-hint'),
      screenMenu: $('screen-menu'),
      screenPause: $('screen-pause'),
      screenDead: $('screen-dead'),
      pauseKills: $('pause-kills'),
      pauseWave: $('pause-wave'),
      pauseScore: $('pause-score'),
      deadWave: $('dead-wave'),
      deadKills: $('dead-kills'),
      deadAccuracy: $('dead-accuracy'),
      deadScore: $('dead-score'),
      btnAim: $('btn-aim'),
      btnSound: $('btn-sound'),
      btnSoundPause: $('btn-sound-pause'),
      loader: $('loader'),
      fade: $('fade'),
    }
    this.pxPerDeg = 3.1
    this.heading = -999
    this.bannerTimer = null
    this.bannerOutTimer = null
    this.health = 100
    this.enemyText = null
    this.buildCompass()
  }

  buildCompass() {
    const strip = this.el.compassStrip
    const frag = document.createDocumentFragment()
    const labels = { 0: 'N', 45: 'NE', 90: 'L', 135: 'SE', 180: 'S', 225: 'SO', 270: 'O', 315: 'NO' }
    for (let deg = -360; deg <= 720; deg += 15) {
      const norm = ((deg % 360) + 360) % 360
      const tick = document.createElement('i')
      tick.className = 'tick' + (norm % 45 === 0 ? ' major' : '')
      tick.style.left = `${(deg + 360) * this.pxPerDeg}px`
      frag.appendChild(tick)
      if (labels[norm] !== undefined) {
        const label = document.createElement('span')
        label.className =
          'dir' + (norm === 0 ? ' north' : '') + (norm % 90 === 0 ? '' : ' minor')
        label.textContent = labels[norm]
        label.style.left = `${(deg + 360) * this.pxPerDeg}px`
        frag.appendChild(label)
      }
    }
    strip.appendChild(frag)
  }

  setHeading(heading) {
    this.heading = heading
    this.el.compassStrip.style.transform = `translateX(${-((heading + 360) * this.pxPerDeg)}px)`
  }

  show() {
    this.el.hud.classList.remove('is-hidden')
  }

  hide() {
    this.el.hud.classList.add('is-hidden')
  }

  setHealth(hp) {
    hp = Math.max(0, Math.min(100, hp))
    this.health = hp
    this.el.healthVal.textContent = String(Math.ceil(hp))
    this.el.healthFill.style.transform = `scaleX(${hp / 100})`
    this.el.healthFill.classList.toggle('low', hp <= 35)
    this.el.healthStatus.textContent = hp > 70 ? 'ESTÁVEL' : hp > 35 ? 'FERIDO' : 'CRÍTICO'
    this.el.damageFlash.classList.toggle('low', hp <= 30 && hp > 0)
    if (hp > 30) this.el.damageFlash.style.opacity = ''
  }

  flashDamage() {
    if (this.health <= 30) return
    const el = this.el.damageFlash
    el.style.transition = 'none'
    el.style.opacity = '0.5'
    requestAnimationFrame(() => {
      el.style.transition = 'opacity 0.5s ease'
      el.style.opacity = ''
    })
  }

  setAmmo(mag, reserve) {
    if (this.el.ammoMag.textContent !== String(mag)) {
      this.el.ammoMag.textContent = String(mag)
      this.el.ammoMag.classList.toggle('low', mag <= 7)
    }
    this.el.ammoReserve.textContent = String(reserve)
  }

  setStats(score, kills) {
    this.el.score.textContent = String(score)
    this.el.kills.textContent = String(kills)
  }

  setWave(wave, remaining) {
    this.el.waveLabel.textContent = `ONDA ${wave}`
    if (this.enemyText !== remaining) {
      this.enemyText = remaining
      this.el.enemyCount.innerHTML = `<b>${remaining}</b> HOSTIS`
    }
  }

  setAiming(aiming) {
    document.body.classList.toggle('aiming', aiming)
    this.el.btnAim.classList.toggle('active', aiming)
  }

  setSpread(px) {
    this.el.crosshair.style.setProperty('--s', `${px.toFixed(1)}px`)
  }

  setReloading(active, progress = 0) {
    this.el.reloadHint.classList.toggle('show', active)
    if (active) this.el.reloadFill.style.transform = `scaleX(${progress})`
  }

  hit(headshot) {
    const h = this.el.hitmarker
    h.classList.remove('show', 'headshot')
    void h.offsetWidth
    if (headshot) h.classList.add('headshot')
    h.classList.add('show')
  }

  damageFrom(origin, playerPos, yaw) {
    const dx = origin.x - playerPos.x
    const dz = origin.z - playerPos.z
    const localX = dx * Math.cos(yaw) - dz * Math.sin(yaw)
    const localZ = dx * Math.sin(yaw) + dz * Math.cos(yaw)
    const angle = Math.atan2(localX, -localZ)
    const el = this.el.damageArc
    el.style.transform = `rotate(${angle}rad)`
    el.classList.remove('show')
    void el.offsetWidth
    el.classList.add('show')
  }

  showBanner(title, sub, duration = 2400) {
    clearTimeout(this.bannerTimer)
    clearTimeout(this.bannerOutTimer)
    const b = this.el.banner
    this.el.bannerTitle.textContent = title
    this.el.bannerSub.textContent = sub || ''
    b.classList.remove('show', 'out')
    void b.offsetWidth
    b.classList.add('show')
    this.bannerTimer = setTimeout(() => {
      b.classList.add('out')
      this.bannerOutTimer = setTimeout(() => b.classList.remove('show', 'out'), 500)
    }, duration)
  }

  killFeed(score, headshot) {
    const item = document.createElement('div')
    item.className = 'kill-item' + (headshot ? ' head' : '')
    const b = document.createElement('b')
    b.textContent = `+${score}`
    const span = document.createElement('span')
    span.textContent = headshot ? 'TIRO NA CABEÇA' : 'HOSTIL ELIMINADO'
    item.append(b, span)
    this.el.killfeed.appendChild(item)
    setTimeout(() => item.remove(), 3100)
  }

  showLookHint() {
    this.el.lookHint.classList.add('show')
    setTimeout(() => this.el.lookHint.classList.remove('show'), 4200)
  }

  setObjective(text) {
    this.el.objective.textContent = text
  }

  setPauseStats(kills, wave, score) {
    this.el.pauseKills.textContent = String(kills)
    this.el.pauseWave.textContent = String(wave)
    this.el.pauseScore.textContent = String(score)
  }

  setDeadStats(wave, kills, accuracy, score) {
    this.el.deadWave.textContent = String(wave)
    this.el.deadKills.textContent = String(kills)
    this.el.deadAccuracy.textContent = `${Math.round(accuracy)}%`
    this.el.deadScore.textContent = String(score)
  }

  setSoundLabel(muted) {
    const text = muted ? 'SOM: DESLIGADO' : 'SOM: LIGADO'
    if (this.el.btnSoundPause) this.el.btnSoundPause.textContent = text
  }

  toggleScreen(name, show) {
    const el =
      name === 'menu' ? this.el.screenMenu : name === 'pause' ? this.el.screenPause : this.el.screenDead
    el.classList.toggle('is-hidden', !show)
  }

  hideLoader() {
    this.el.loader.classList.add('is-hidden')
  }

  fade(on) {
    this.el.fade.classList.toggle('on', on)
  }
}
