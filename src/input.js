export class InputManager {
  constructor() {
    this.isTouch = window.matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0
    this.keys = new Set()
    this.moveX = 0
    this.moveY = 0
    this.lookX = 0
    this.lookY = 0
    this.firing = false
    this.ads = false
    this.sprint = false
    this.jumpQueued = false
    this.reloadQueued = false
    this.pauseRequested = false
    this.pointerLocked = false
    this.enabled = false
    this.sensitivity = this.isTouch ? 0.0040 : 0.00215
    this.stickPointer = null
    this.lookPointer = null
    this.lookLast = { x: 0, y: 0 }
    this.adsToggle = false
    this.onReload = null
    this.onPause = null
    this.onFirstTouch = null
    this.joyRadius = 46
    this.joyCenter = { x: 0, y: 0 }
    this._bound = []
  }

  attach(canvas) {
    this.canvas = canvas
    this.stickZone = document.getElementById('stick-zone')
    this.stickBase = document.getElementById('stick-base')
    this.stickKnob = document.getElementById('stick-knob')
    this.btnFire = document.getElementById('btn-fire')
    this.btnAds = document.getElementById('btn-ads')
    this.btnReload = document.getElementById('btn-reload')
    this.btnJump = document.getElementById('btn-jump')

    this.bind(document, 'keydown', (e) => {
      if (!this.enabled) return
      if (e.code === 'Escape') {
        this.pauseRequested = true
        this.onPause?.()
        return
      }
      this.keys.add(e.code)
      if (e.code === 'KeyR') this.requestReload()
      if (e.code === 'Space') { this.jumpQueued = true; e.preventDefault() }
      if (e.code === 'KeyQ') this.ads = !this.ads
    })
    this.bind(document, 'keyup', (e) => {
      this.keys.delete(e.code)
    })
    this.bind(window, 'blur', () => { this.keys.clear(); this.firing = false; this.ads = false })

    this.bind(canvas, 'pointerdown', (e) => {
      if (!this.enabled) return
      if (e.pointerType === 'mouse') {
        if (!this.pointerLocked && !this.isTouch) {
          canvas.requestPointerLock?.()
        }
      }
    })
    this.bind(document, 'pointerlockchange', () => {
      this.pointerLocked = document.pointerLockElement === canvas
      if (!this.pointerLocked && this.enabled && !this.isTouch) {
        this.firing = false
        this.ads = false
      }
    })
    this.bind(canvas, 'mousedown', (e) => {
      if (!this.enabled || this.isTouch) return
      if (e.button === 0) this.firing = true
      if (e.button === 2) this.ads = true
    })
    this.bind(window, 'mouseup', (e) => {
      if (e.button === 0) this.firing = false
      if (e.button === 2) this.ads = false
    })
    this.bind(document, 'mousemove', (e) => {
      if (!this.enabled || this.isTouch) return
      if (!this.pointerLocked) return
      this.lookX += e.movementX * this.sensitivity
      this.lookY += e.movementY * this.sensitivity
    })
    this.bind(window, 'contextmenu', (e) => e.preventDefault())

    // touch look (canvas)
    this.bind(canvas, 'pointerdown', (e) => {
      if (!this.enabled || e.pointerType === 'mouse') return
      if (this.lookPointer !== null) return
      this.lookPointer = e.pointerId
      this.lookLast.x = e.clientX
      this.lookLast.y = e.clientY
      this.onFirstTouch?.()
    })
    this.bind(window, 'pointermove', (e) => {
      if (!this.enabled) return
      if (e.pointerId === this.lookPointer) {
        const dx = e.clientX - this.lookLast.x
        const dy = e.clientY - this.lookLast.y
        this.lookLast.x = e.clientX
        this.lookLast.y = e.clientY
        this.lookX += dx * this.sensitivity
        this.lookY += dy * this.sensitivity
      }
      if (this.stickPointer === e.pointerId) {
        this.updateStick(e.clientX, e.clientY)
      }
    })
    this.bind(window, 'pointerup', (e) => {
      if (e.pointerId === this.lookPointer) this.lookPointer = null
      if (e.pointerId === this.stickPointer) this.endStick()
    })
    this.bind(window, 'pointercancel', (e) => {
      if (e.pointerId === this.lookPointer) this.lookPointer = null
      if (e.pointerId === this.stickPointer) this.endStick()
    })

    if (this.stickZone) {
      this.bind(this.stickZone, 'pointerdown', (e) => {
        if (!this.enabled) return
        e.preventDefault()
        this.stickPointer = e.pointerId
        const rect = this.stickBase.getBoundingClientRect()
        this.joyCenter.x = rect.left + rect.width / 2
        this.joyCenter.y = rect.top + rect.height / 2
        this.stickBase.classList.add('active')
        this.updateStick(e.clientX, e.clientY)
        this.onFirstTouch?.()
      })
    }

    const bindBtn = (btn, down, up) => {
      if (!btn) return
      this.bind(btn, 'pointerdown', (e) => {
        e.preventDefault()
        e.stopPropagation()
        btn.classList.add('pressed')
        down()
      })
      const end = (e) => {
        e.preventDefault()
        btn.classList.remove('pressed')
        up?.()
      }
      this.bind(btn, 'pointerup', end)
      this.bind(btn, 'pointercancel', end)
      this.bind(btn, 'pointerleave', end)
    }
    bindBtn(this.btnFire, () => { this.firing = true }, () => { this.firing = false })
    bindBtn(this.btnAds, () => {
      this.adsToggle = !this.adsToggle
      this.ads = this.adsToggle
      this.btnAds?.classList.toggle('ads-on', this.ads)
    })
    bindBtn(this.btnReload, () => this.requestReload())
    bindBtn(this.btnJump, () => { this.jumpQueued = true })
  }

  requestReload() {
    this.reloadQueued = true
    this.onReload?.()
  }

  updateStick(x, y) {
    let dx = x - this.joyCenter.x
    let dy = y - this.joyCenter.y
    const len = Math.hypot(dx, dy)
    const max = this.joyRadius
    if (len > max) {
      dx = (dx / len) * max
      dy = (dy / len) * max
    }
    this.stickKnob.style.transform = `translate(${dx}px, ${dy}px)`
    const nx = dx / max
    const ny = dy / max
    const dead = 0.16
    const mag = Math.hypot(nx, ny)
    if (mag < dead) {
      this.moveX = 0
      this.moveY = 0
      this.sprint = false
    } else {
      const scaled = (mag - dead) / (1 - dead)
      this.moveX = (nx / mag) * scaled
      this.moveY = (ny / mag) * scaled
      this.sprint = mag > 0.88
    }
  }

  endStick() {
    this.stickPointer = null
    this.moveX = 0
    this.moveY = 0
    this.sprint = false
    this.stickKnob.style.transform = 'translate(0px, 0px)'
    this.stickBase.classList.remove('active')
  }

  bind(target, type, fn, opts) {
    target.addEventListener(type, fn, opts)
    this._bound.push([target, type, fn, opts])
  }

  reset() {
    this.keys.clear()
    this.moveX = 0
    this.moveY = 0
    this.lookX = 0
    this.lookY = 0
    this.firing = false
    this.ads = false
    this.adsToggle = false
    this.sprint = false
    this.jumpQueued = false
    this.reloadQueued = false
    this.pauseRequested = false
    this.endStick()
    this.btnAds?.classList.remove('ads-on')
  }

  setEnabled(v) {
    this.enabled = v
    if (!v) this.reset()
  }

  consumeLook() {
    const out = { x: this.lookX, y: this.lookY }
    this.lookX = 0
    this.lookY = 0
    return out
  }

  get moveVec() {
    let x = this.moveX
    let y = this.moveY
    if (this.keys.has('KeyW') || this.keys.has('ArrowUp')) y -= 1
    if (this.keys.has('KeyS') || this.keys.has('ArrowDown')) y += 1
    if (this.keys.has('KeyA') || this.keys.has('ArrowLeft')) x -= 1
    if (this.keys.has('KeyD') || this.keys.has('ArrowRight')) x += 1
    const len = Math.hypot(x, y)
    if (len > 1) { x /= len; y /= len }
    return { x, y }
  }

  get sprinting() {
    return this.sprint || this.keys.has('ShiftLeft') || this.keys.has('ShiftRight')
  }

  get jump() {
    if (this.jumpQueued) {
      this.jumpQueued = false
      return true
    }
    return false
  }

  get reload() {
    if (this.reloadQueued) {
      this.reloadQueued = false
      return true
    }
    return false
  }
}
