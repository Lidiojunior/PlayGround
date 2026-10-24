export class Input {
  constructor(canvas, opts = {}) {
    this.canvas = canvas
    this.opts = opts
    this.isTouch =
      opts.forceTouch ||
      (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) ||
      navigator.maxTouchPoints > 0
    this.enabled = false
    this.locked = false
    this.firing = false
    this.aim = false
    this.sprintKey = false
    this.move = { x: 0, y: 0 }
    this.lookX = 0
    this.lookY = 0
    this.keys = new Set()
    this.joy = { id: null, ox: 0, oy: 0, radius: 54 }
    this.look = { id: null, x: 0, y: 0 }
    this.reloadQueued = false
    this.joystickEl = document.getElementById('joystick')
    this.knobEl = document.getElementById('js-knob')
    this.fireBtn = document.getElementById('btn-fire')
    this.aimBtn = document.getElementById('btn-aim')
    this.reloadBtn = document.getElementById('btn-reload')
    this.sprintTouch = false
    this.bind()
  }

  bind() {
    document.body.classList.toggle('touch', this.isTouch)

    this.canvas.addEventListener('pointerdown', (e) => this.onPointerDown(e))
    window.addEventListener('pointermove', (e) => this.onPointerMove(e), { passive: false })
    window.addEventListener('pointerup', (e) => this.onPointerUp(e))
    window.addEventListener('pointercancel', (e) => this.onPointerUp(e))

    window.addEventListener('mousemove', (e) => {
      if (!this.enabled || this.isTouch) return
      if (this.locked) {
        this.lookX += e.movementX || 0
        this.lookY += e.movementY || 0
      }
    })

    window.addEventListener('mousedown', (e) => {
      if (!this.enabled || this.isTouch) return
      if (e.target !== this.canvas) return
      if (e.button === 0) this.firing = true
      if (e.button === 2) this.setAim(true)
    })
    window.addEventListener('mouseup', (e) => {
      if (this.isTouch) return
      if (e.button === 0) this.firing = false
      if (e.button === 2) this.setAim(false)
    })
    window.addEventListener('contextmenu', (e) => e.preventDefault())
    document.addEventListener('gesturestart', (e) => e.preventDefault())

    document.addEventListener('pointerlockchange', () => {
      this.locked = document.pointerLockElement === this.canvas
      if (!this.locked && this.enabled && !this.isTouch) {
        this.opts.onPauseRequest && this.opts.onPauseRequest()
      }
    })

    window.addEventListener('keydown', (e) => {
      if (['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ShiftLeft', 'ShiftRight', 'KeyR', 'Escape', 'KeyP', 'Space'].includes(e.code)) {
        if (this.enabled) e.preventDefault()
      }
      if (!this.enabled) return
      this.keys.add(e.code)
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') this.sprintKey = true
      if (e.code === 'KeyR') this.reloadQueued = true
      if (e.code === 'Escape' || e.code === 'KeyP') {
        if (document.pointerLockElement) document.exitPointerLock()
        this.opts.onPauseRequest && this.opts.onPauseRequest()
      }
      if (e.code === 'Space') {
        if (document.pointerLockElement) document.exitPointerLock()
        this.opts.onPauseRequest && this.opts.onPauseRequest()
      }
      this.opts.onInteract && this.opts.onInteract()
    })
    window.addEventListener('keyup', (e) => {
      this.keys.delete(e.code)
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') this.sprintKey = false
    })

    this.bindButton(this.fireBtn, {
      down: () => {
        this.firing = true
        this.opts.onInteract && this.opts.onInteract()
      },
      up: () => {
        this.firing = false
      },
    })

    this.aimBtn.addEventListener('pointerdown', (e) => {
      e.preventDefault()
      e.stopPropagation()
      if (!this.enabled) return
      this.setAim(!this.aim)
      this.aimBtn.classList.add('pressed')
      setTimeout(() => this.aimBtn.classList.remove('pressed'), 110)
      this.opts.onInteract && this.opts.onInteract()
    })

    this.reloadBtn.addEventListener('pointerdown', (e) => {
      e.preventDefault()
      e.stopPropagation()
      if (!this.enabled) return
      this.reloadQueued = true
      this.reloadBtn.classList.add('pressed')
      setTimeout(() => this.reloadBtn.classList.remove('pressed'), 110)
      this.opts.onInteract && this.opts.onInteract()
    })
  }

  bindButton(btn, handlers) {
    if (!btn) return
    btn.addEventListener('pointerdown', (e) => {
      e.preventDefault()
      e.stopPropagation()
      if (!this.enabled) return
      btn.classList.add('pressed')
      try {
        btn.setPointerCapture(e.pointerId)
      } catch {
        /* ignore */
      }
      handlers.down()
    })
    const up = (e) => {
      btn.classList.remove('pressed')
      handlers.up()
    }
    btn.addEventListener('pointerup', up)
    btn.addEventListener('pointercancel', up)
    btn.addEventListener('lostpointercapture', up)
    btn.addEventListener('contextmenu', (e) => e.preventDefault())
  }

  setAim(value) {
    this.aim = value
    this.aimBtn.classList.toggle('active', value)
  }

  setEnabled(enabled) {
    this.enabled = enabled
    if (!enabled) {
      this.move.x = 0
      this.move.y = 0
      this.firing = false
      this.keys.clear()
      this.sprintKey = false
      this.joy.id = null
      this.look.id = null
      this.joystickEl.classList.add('is-hidden')
      this.fireBtn.classList.remove('pressed')
    } else if (!this.isTouch) {
      if (!document.pointerLockElement) {
        try {
          const result = this.canvas.requestPointerLock && this.canvas.requestPointerLock()
          if (result && result.catch) result.catch(() => {})
        } catch {
          /* ignore */
        }
      }
    }
  }

  onPointerDown(e) {
    if (!this.enabled) return
    if (e.pointerType === 'mouse') {
      if (e.button === 0) {
        this.firing = true
        if (!this.locked && !this.isTouch) {
          try {
            this.canvas.requestPointerLock && this.canvas.requestPointerLock()
          } catch {
            /* ignore */
          }
        }
      }
      if (e.button === 2) this.setAim(true)
      this.opts.onInteract && this.opts.onInteract()
      return
    }

    e.preventDefault()
    this.opts.onInteract && this.opts.onInteract()

    if (e.clientX < window.innerWidth * 0.46 && this.joy.id === null) {
      this.joy.id = e.pointerId
      this.joy.ox = e.clientX
      this.joy.oy = e.clientY
      this.joystickEl.classList.remove('is-hidden')
      this.joystickEl.style.left = `${e.clientX}px`
      this.joystickEl.style.top = `${e.clientY}px`
      this.knobEl.style.transform = 'translate(0px, 0px)'
      return
    }

    if (this.look.id === null) {
      this.look.id = e.pointerId
      this.look.x = e.clientX
      this.look.y = e.clientY
    }
  }

  onPointerMove(e) {
    if (!this.enabled) return
    if (e.pointerId === this.joy.id) {
      e.preventDefault()
      let dx = e.clientX - this.joy.ox
      let dy = e.clientY - this.joy.oy
      const len = Math.hypot(dx, dy)
      const max = this.joy.radius
      if (len > max) {
        dx = (dx / len) * max
        dy = (dy / len) * max
      }
      const nx = dx / max
      const ny = -dy / max
      const dead = 0.13
      this.move.x = Math.abs(nx) < dead ? 0 : nx
      this.move.y = Math.abs(ny) < dead ? 0 : ny
      this.sprintTouch = Math.hypot(nx, ny) > 0.94
      this.knobEl.style.transform = `translate(${dx}px, ${dy}px)`
    } else if (e.pointerId === this.look.id) {
      e.preventDefault()
      this.lookX += e.clientX - this.look.x
      this.lookY += e.clientY - this.look.y
      this.look.x = e.clientX
      this.look.y = e.clientY
    }
  }

  onPointerUp(e) {
    if (e.pointerId === this.joy.id) {
      this.joy.id = null
      this.move.x = 0
      this.move.y = 0
      this.sprintTouch = false
      this.joystickEl.classList.add('is-hidden')
    }
    if (e.pointerId === this.look.id) {
      this.look.id = null
    }
    if (e.pointerType === 'mouse' && e.button === 0) this.firing = false
    if (e.pointerType === 'mouse' && e.button === 2) this.setAim(false)
  }

  getMove() {
    let x = this.move.x
    let y = this.move.y
    if (this.keys.has('KeyD')) x += 1
    if (this.keys.has('KeyA')) x -= 1
    if (this.keys.has('KeyW')) y += 1
    if (this.keys.has('KeyS')) y -= 1
    const len = Math.hypot(x, y)
    if (len > 1) {
      x /= len
      y /= len
    }
    const sprint = this.sprintKey || this.sprintTouch
    return { x, y, sprint, magnitude: Math.min(1, len) }
  }

  consumeLook() {
    const x = this.lookX
    const y = this.lookY
    this.lookX = 0
    this.lookY = 0
    return { x, y }
  }

  consumeReload() {
    const value = this.reloadQueued
    this.reloadQueued = false
    return value
  }

  reset() {
    this.move.x = 0
    this.move.y = 0
    this.lookX = 0
    this.lookY = 0
    this.firing = false
    this.aim = false
    this.reloadQueued = false
    this.keys.clear()
    this.sprintKey = false
    this.sprintTouch = false
    this.joy.id = null
    this.look.id = null
    this.joystickEl.classList.add('is-hidden')
    this.aimBtn.classList.remove('active')
  }
}
