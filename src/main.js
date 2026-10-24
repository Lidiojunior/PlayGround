import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { createTextures } from './textures.js';
import { createWorld } from './world.js';
import { createEffects } from './effects.js';
import { createAudio } from './audio.js';
import { createWeapon } from './weapon.js';
import { createHUD } from './hud.js';
import { createPlayer } from './player.js';
import { createEnemies } from './enemies.js';

const $ = id => document.getElementById(id);
const canvas = $('game');
const params = new URLSearchParams(location.search);
const isTouch = matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0 || /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
let low = params.get('quality') === 'low' || isTouch || window.innerWidth < 700;
if (params.get('quality') === 'high') low = false;

const hud = createHUD();
hud.setTouch(isTouch);
hud.setQuality(low ? 'MOBILE' : 'ALTA');

if (isTouch) {
  $('control-hint').textContent = 'JOYSTICK MOVER • ARRASTE PARA MIRAR • FOGO • ADS';
  hud.setHint('JOYSTICK MOVER • ARRASTE PARA MIRAR • FOGO • ADS');
}

let renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance', stencil: false, alpha: false });
} catch (err) {
  $('loader-status').textContent = 'WEBGL NÃO DISPONÍVEL NESTE DISPOSITIVO';
  throw err;
}
let software = false;
try {
  const gl = renderer.getContext();
  const ext = gl.getExtension('WEBGL_debug_renderer_info');
  const info = String(ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER) || '');
  software = /swiftshader|llvmpipe|software|basic render/i.test(info);
} catch (err) { /* ignore */ }
if (software) low = true;
hud.setQuality(low ? 'MOBILE' : 'ALTA');
const noPost = software || params.get('nopost') === '1';
const basePixelRatio = Math.min(window.devicePixelRatio || 1, software ? 0.8 : low ? 1.3 : 1.75);
renderer.setPixelRatio(basePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = low ? 0.72 : 0.73;
renderer.shadowMap.enabled = !software;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(62, window.innerWidth / window.innerHeight, 0.02, 650);
scene.add(camera);

const audio = createAudio();
const tex = null;
const worldHolder = {};

const GradeShader = {
  uniforms: { tDiffuse: { value: null }, time: { value: 0 }, res: { value: new THREE.Vector2(1, 1) } },
  vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  fragmentShader: `
    uniform sampler2D tDiffuse; uniform float time; uniform vec2 res;
    varying vec2 vUv;
    float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
    void main() {
      vec2 uv = vUv;
      vec2 dir = uv - 0.5;
      float r2 = dot(dir, dir);
      float ab = 0.0016 * r2;
      vec3 col;
      col.r = texture2D(tDiffuse, uv + dir * ab).r;
      col.g = texture2D(tDiffuse, uv).g;
      col.b = texture2D(tDiffuse, uv - dir * ab).b;
      float lum = dot(col, vec3(0.299, 0.587, 0.114));
      col = mix(vec3(lum), col, 1.11);
      col = (col - 0.5) * 1.12 + 0.5;
      col += vec3(-0.012, 0.003, 0.018) * (1.0 - smoothstep(0.0, 0.55, lum));
      col *= vec3(1.035, 1.0, 0.952);
      float vig = smoothstep(0.98, 0.2, length(dir) * 1.32);
      col *= mix(0.58, 1.0, vig);
      float g = hash(uv * res + time * 71.0) - 0.5;
      col += g * 0.032;
      col = max(col, vec3(0.0));
      gl_FragColor = vec4(col, 1.0);
    }`,
};

let composer, bloomPass, gradePass;
let weapon, player, effects, world, enemies;
let simTime = 0;
let state = 'loading';
let menuTime = 0;
const WAVES = [
  { count: 6, maxActive: 3, delay: 1.0 },
  { count: 8, maxActive: 4, delay: 0.9 },
  { count: 10, maxActive: 5, delay: 0.8 },
];
let waveIndex = 0, spawnedThisWave = 0, killedThisWave = 0, lastKills = 0, intermission = 0, nextSpawn = 0;
let deathTimer = 0, deathStats = null, deathShown = false;
let lastReal = performance.now();
let perfAccum = 0, perfFrames = 0, perfAdjusted = 0;

function buildEnvironment() {
  const c = document.createElement('canvas');
  c.width = 1024; c.height = 512;
  const ctx = c.getContext('2d');
  const sky = ctx.createLinearGradient(0, 0, 0, 300);
  sky.addColorStop(0, '#6e89a8');
  sky.addColorStop(0.45, '#b9b49f');
  sky.addColorStop(0.72, '#e2c69c');
  sky.addColorStop(1, '#caa578');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, 1024, 320);
  const ground = ctx.createLinearGradient(0, 280, 0, 512);
  ground.addColorStop(0, '#8a7a60');
  ground.addColorStop(1, '#2c2822');
  ctx.fillStyle = ground; ctx.fillRect(0, 300, 1024, 212);
  const sun = ctx.createRadialGradient(300, 300, 4, 300, 300, 170);
  sun.addColorStop(0, 'rgba(255,245,215,1)');
  sun.addColorStop(0.12, 'rgba(255,220,160,0.9)');
  sun.addColorStop(0.5, 'rgba(255,180,100,0.22)');
  sun.addColorStop(1, 'rgba(255,160,80,0)');
  ctx.fillStyle = sun; ctx.fillRect(0, 120, 700, 350);
  for (let i = 0; i < 22; i++) {
    const x = Math.random() * 1024, y = 300 + Math.random() * 120;
    const g = ctx.createRadialGradient(x, y, 0, x, y, 30 + Math.random() * 70);
    g.addColorStop(0, 'rgba(190,165,130,0.12)'); g.addColorStop(1, 'rgba(190,165,130,0)');
    ctx.fillStyle = g; ctx.fillRect(x - 90, y - 90, 180, 180);
  }
  const t = new THREE.CanvasTexture(c);
  t.mapping = THREE.EquirectangularReflectionMapping;
  t.colorSpace = THREE.SRGBColorSpace;
  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = pmrem.fromEquirectangular(t).texture;
  scene.environment = env;
  scene.environmentIntensity = 0.62;
  t.dispose();
  pmrem.dispose();
}

function buildComposer() {
  const w = window.innerWidth, h = window.innerHeight;
  const size = renderer.getDrawingBufferSize(new THREE.Vector2());
  const rt = new THREE.WebGLRenderTarget(size.x, size.y, { type: THREE.HalfFloatType, samples: low ? 0 : 4 });
  composer = new EffectComposer(renderer, rt);
  composer.setPixelRatio(renderer.getPixelRatio());
  composer.setSize(w, h);
  composer.addPass(new RenderPass(scene, camera));
  bloomPass = new UnrealBloomPass(new THREE.Vector2(w, h), low ? 0.22 : 0.34, 0.55, low ? 0.94 : 0.92);
  composer.addPass(bloomPass);
  composer.addPass(new OutputPass());
  gradePass = new ShaderPass(GradeShader);
  gradePass.uniforms.res.value.set(w, h);
  composer.addPass(gradePass);
}

function resize() {
  const w = window.innerWidth, h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(basePixelRatio);
  renderer.setSize(w, h);
  if (composer) {
    composer.setPixelRatio(basePixelRatio);
    composer.setSize(w, h);
    if (gradePass) gradePass.uniforms.res.value.set(w, h);
  }
}
window.addEventListener('resize', resize);
window.addEventListener('orientationchange', () => setTimeout(resize, 120));

async function boot() {
  const wait = (ms = 20) => new Promise(r => requestAnimationFrame(() => setTimeout(r, ms)));
  hud.loader(8, 'GERANDO MATERIAIS PBR');
  await wait(40);
  const textures = createTextures();
  hud.loader(34, 'CONSTRUINDO OUTPOST KILO');
  await wait(20);
  world = createWorld(scene, renderer, textures, { low });
  worldHolder.value = world;
  hud.loader(56, 'CALIBRANDO ILUMINAÇÃO');
  buildEnvironment();
  await wait(20);
  effects = createEffects(scene, textures, { low });
  weapon = createWeapon(textures, { low });
  camera.add(weapon.group);
  weapon.group.visible = false;
  const weaponLight = new THREE.PointLight(0xffd9b0, 1.7, 2.8, 2);
  weaponLight.position.set(0.25, 0.06, 0.1);
  camera.add(weaponLight);
  const weaponRim = new THREE.PointLight(0x9fc4e0, 0.55, 2.6, 2);
  weaponRim.position.set(-0.42, 0.02, -0.18);
  camera.add(weaponRim);
  hud.loader(72, 'MONTANDO OPERADOR');
  player = createPlayer({
    camera, world, effects, audio, weapon, hud, quality: { low },
    onDeath: (stats) => { deathStats = stats; deathTimer = 0; deathShown = false; },
  });
  player.bindDesktop(canvas);
  enemies = createEnemies(scene, textures, world, effects, audio, { low });
  player.enemySystem = enemies;
  player.state.enemySystem = enemies;
  hud.loader(86, 'SINCRONIZANDO ÁUDIO ESPACIAL');
  if (!noPost) buildComposer();
  hud.loader(100, 'PRONTO PARA DESDOBRAR');
  await wait(240);
  hud.loaderDone();
  state = 'menu';
  document.body.dataset.ready = 'true';
  menuTime = 0;
  window.__DUST_STRIKE__ = {
    get state() { return state; }, player, enemies, world, weapon, hud,
    start: startGame, pause: pauseGame, resume: resumeGame,
    spawn: (x, z, w = 1) => enemies.spawn(x, z, w),
  };
}

const spawnPoints = () => world.spawnPoints;

function spawnEnemy() {
  const p = player.state.position;
  const pts = spawnPoints();
  const far = pts.filter(s => Math.hypot(s.x - p.x, s.z - p.z) > 11);
  const pool = far.length ? far : pts;
  let best = pool[(Math.random() * pool.length) | 0];
  for (let i = 0; i < 5; i++) {
    const c = pool[(Math.random() * pool.length) | 0];
    if (Math.hypot(c.x - p.x, c.z - p.z) > Math.hypot(best.x - p.x, best.z - p.z)) best = c;
  }
  if (waveIndex === 0 && spawnedThisWave === 0) { best = { x: 4.5, z: -3.5 }; }
  const jitter = 0.8;
  const x = best.x + (Math.random() - 0.5) * jitter;
  const z = best.z + (Math.random() - 0.5) * jitter;
  enemies.spawn(x, z, waveIndex + 1);
}

function startWave(index) {
  waveIndex = index;
  spawnedThisWave = 0;
  killedThisWave = 0;
  lastKills = player.state.kills;
  nextSpawn = simTime;
  intermission = 0;
  const w = WAVES[index];
  hud.setObjective('ELIMINATE HOSTILES', w.count, w.count, index + 1);
  hud.banner(`WAVE ${String(index + 1).padStart(2, '0')}`, index === 0 ? 'HOSTIS INBOUND — HOLD THE OUTPOST' : index === WAVES.length - 1 ? 'FINAL ASSAULT — HOLD THE LINE' : 'REINFORCEMENTS INBOUND', 3.5);
  audio.waveStart();
}

function startGame() {
  audio.init();
  audio.startAmbient();
  hud.showMenu(false);
  hud.hideEnd();
  hud.showPause(false);
  hud.showHUD(true);
  hud.resetFeed();
  hud.setMuted(audio.isMuted());
  document.body.classList.add('playing');
  document.body.classList.remove('ended', 'paused');
  if (weapon) weapon.group.visible = true;
  if (effects) effects.reset();
  if (enemies) enemies.reset();
  player.state.paused = false;
  player.reset();
  simTime = 0;
  deathStats = null; deathTimer = 0; deathShown = false;
  state = 'playing';
  document.body.dataset.state = 'playing';
  startWave(0);
  weapon.group.visible = true;
  if (!isTouch) player.requestLock(canvas);
  const hint = $('control-hint');
  hint.style.opacity = '1';
  setTimeout(() => { hint.style.opacity = '0'; }, 11000);
}

function pauseGame() {
  if (state !== 'playing') return;
  state = 'paused';
  player.state.paused = true;
  player.setFire(false);
  player.setInput(0, 0);
  hud.showPause(true);
  hud.el.pauseKills.textContent = `${player.state.kills} KILLS`;
  hud.el.pauseScore.textContent = `${player.state.score} PTS`;
  if (document.pointerLockElement) document.exitPointerLock();
  document.body.dataset.state = 'paused';
}

function resumeGame() {
  if (state !== 'paused') return;
  state = 'playing';
  player.state.paused = false;
  hud.showPause(false);
  document.body.dataset.state = 'playing';
  document.body.classList.add('playing');
  if (!isTouch) player.requestLock(canvas);
}

function endGame(victory, stats) {
  state = 'ended';
  player.state.paused = true;
  player.setFire(false);
  if (document.pointerLockElement) document.exitPointerLock();
  hud.showHUD(true);
  hud.showEnd(victory ? stats : (stats || deathStats || player.state), victory);
  document.body.classList.remove('playing');
  document.body.classList.add('ended');
  document.body.dataset.state = 'ended';
  if (victory) audio.victory();
}

function victory() {
  const p = player.state;
  endGame(true, { score: p.score, kills: p.kills, headshots: p.headshots, shots: p.shots, hits: p.hits });
}

function updateWave(dt) {
  if (!player.state.alive) return;
  const w = WAVES[waveIndex];
  if (player.state.kills > lastKills) {
    killedThisWave += player.state.kills - lastKills;
    lastKills = player.state.kills;
  }
  const total = w.count;
  const remaining = Math.max(0, total - killedThisWave);
  if (!intermission) hud.setObjective('ELIMINATE HOSTILES', remaining, total, waveIndex + 1);

  if (intermission > 0) {
    intermission -= dt;
    if (intermission <= 0) startWave(waveIndex + 1);
    return;
  }

  if (spawnedThisWave < total && enemies.activeCount() < w.maxActive && simTime >= nextSpawn) {
    spawnEnemy();
    spawnedThisWave++;
    nextSpawn = simTime + w.delay * (0.65 + Math.random() * 0.7);
  }

  if (spawnedThisWave >= total && killedThisWave >= total && enemies.activeCount() === 0) {
    if (waveIndex >= WAVES.length - 1) {
      victory();
      return;
    }
    intermission = 6;
    hud.banner('SECTOR CLEAR', 'REGROUP — NEXT WAVE INBOUND', 4.2);
    hud.setObjective('REGROUP', 0, total, waveIndex + 1);
    player.state.reserve = Math.min(player.state.maxReserve, player.state.reserve + 60);
    player.state.health = Math.min(player.state.maxHealth, player.state.health + 35);
    hud.setAmmo(player.state.mag, player.state.reserve);
    hud.setHealth(player.state.health);
    audio.ui(true);
  }
}

function menuCamera(dt) {
  menuTime += dt;
  const a = menuTime * 0.055 + 0.7;
  camera.position.set(Math.cos(a) * 18.5, 6.4 + Math.sin(menuTime * 0.22) * 0.45, Math.sin(a) * 18.5 + 4);
  camera.lookAt(0, 3.4, -6);
  camera.rotation.z = Math.sin(menuTime * 0.13) * 0.012;
  camera.fov = 60;
  camera.updateProjectionMatrix();
}

function updateTouchInput() {}

function renderFrame(now) {
  if (composer) {
    gradePass.uniforms.time.value = now * 0.001;
    composer.render();
  } else {
    renderer.render(scene, camera);
  }
}

function tick() {
  requestAnimationFrame(tick);
  const now = performance.now();
  let dt = (now - lastReal) / 1000;
  lastReal = now;
  if (!isFinite(dt) || dt < 0) dt = 0;
  dt = Math.min(dt, 0.05);

  if (state === 'loading') {
    if (composer) composer.render();
    else renderer.render(scene, camera);
    return;
  }

  if (state === 'menu') {
    world.update(dt);
    effects.update(dt);
    menuCamera(dt);
    renderFrame(now);
    return;
  }

  if (state === 'paused') {
    renderFrame(now);
    return;
  }

  if (state === 'ended') {
    world.update(dt * 0.25);
    effects.update(0);
    renderFrame(now);
    return;
  }

  // playing
  simTime += dt;
  world.update(dt);
  enemies.update(dt, player, simTime);
  player.update(dt, simTime);
  effects.update(dt);
  updateWave(dt);

  hud.updateCompass(player.state.yaw);
  hud.updateMinimap(player, enemies.enemies, world, simTime);

  if (!player.state.alive && !deathShown) {
    deathTimer += dt;
    if (deathTimer > 1.5) {
      deathShown = true;
      endGame(false, deathStats || player.state);
    }
  }

  renderFrame(now);

  // light adaptive resolution for weaker phones
  perfAccum += dt; perfFrames++;
  if (perfAccum > 4) {
    const fps = perfFrames / perfAccum;
    if (fps < 35 && perfAdjusted < 3 && !software && composer) {
      perfAdjusted++;
      const pr = Math.max(0.85, renderer.getPixelRatio() - 0.18);
      renderer.setPixelRatio(pr);
      composer.setPixelRatio(pr);
      composer.setSize(window.innerWidth, window.innerHeight);
    }
    perfAccum = 0; perfFrames = 0;
  }
}

// ---------- input wiring ----------
$('btn-deploy').addEventListener('click', () => { audio.ui(true); startGame(); });
$('btn-redeploy').addEventListener('click', () => { audio.ui(true); startGame(); });
$('btn-resume').addEventListener('click', () => { audio.ui(true); resumeGame(); });
$('btn-restart').addEventListener('click', () => { audio.ui(true); startGame(); });
$('btn-pause').addEventListener('click', (e) => { e.stopPropagation(); audio.ui(); pauseGame(); });
$('btn-pause-mute').addEventListener('click', toggleMute);
$('btn-mute').addEventListener('click', (e) => { e.stopPropagation(); toggleMute(); });
$('btn-menu-mute').addEventListener('click', toggleMute);

function toggleMute() {
  audio.init();
  audio.setMuted(!audio.isMuted());
  hud.setMuted(audio.isMuted());
  audio.ui();
}

window.addEventListener('keydown', (ev) => {
  if (ev.code === 'Escape') {
    if (state === 'playing') pauseGame();
    else if (state === 'paused') resumeGame();
  }
});

document.addEventListener('pointerlockchange', () => {
  if (state === 'playing' && !isTouch && !document.pointerLockElement) pauseGame();
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden && state === 'playing') pauseGame();
});

// desktop pointer lock on click
canvas.addEventListener('pointerdown', (ev) => {
  if (state !== 'playing') return;
  if (ev.pointerType === 'touch') return;
  if (!isTouch && document.pointerLockElement !== canvas) player.requestLock(canvas);
});

// mobile look drag
let lookPointer = null, lookLastX = 0, lookLastY = 0;
canvas.addEventListener('pointerdown', (ev) => {
  if (state !== 'playing' || ev.pointerType !== 'touch') return;
  if (lookPointer !== null) return;
  lookPointer = ev.pointerId;
  lookLastX = ev.clientX; lookLastY = ev.clientY;
  try { canvas.setPointerCapture(ev.pointerId); } catch {}
});
canvas.addEventListener('pointermove', (ev) => {
  if (ev.pointerId !== lookPointer || state !== 'playing') return;
  const dx = ev.clientX - lookLastX;
  const dy = ev.clientY - lookLastY;
  lookLastX = ev.clientX; lookLastY = ev.clientY;
  player.look(dx * 1.35, dy * 1.35);
});
function endLook(ev) { if (ev.pointerId === lookPointer) lookPointer = null; }
canvas.addEventListener('pointerup', endLook);
canvas.addEventListener('pointercancel', endLook);

// joystick
const stick = $('stick'), knob = $('stick-knob');
let stickId = null;
function stickMove(ev) {
  if (ev.pointerId !== stickId) return;
  const r = stick.getBoundingClientRect();
  const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
  let dx = ev.clientX - cx, dy = ev.clientY - cy;
  const max = r.width * 0.36;
  const len = Math.hypot(dx, dy);
  if (len > max) { dx = dx / len * max; dy = dy / len * max; }
  knob.style.transform = `translate(${dx}px, ${dy}px)`;
  player.setInput(dx / max, -dy / max);
}
stick.addEventListener('pointerdown', (ev) => {
  if (state !== 'playing') return;
  ev.preventDefault(); ev.stopPropagation();
  stickId = ev.pointerId;
  try { stick.setPointerCapture(ev.pointerId); } catch {}
  stickMove(ev);
});
stick.addEventListener('pointermove', (ev) => { ev.stopPropagation(); stickMove(ev); });
function stickEnd(ev) {
  if (ev.pointerId !== stickId) return;
  stickId = null; knob.style.transform = 'translate(0px, 0px)';
  player.setInput(0, 0);
}
stick.addEventListener('pointerup', stickEnd);
stick.addEventListener('pointercancel', stickEnd);

let adsOn = false;
function resetTouch() {
  adsOn = false;
  player.setADS(false);
  player.setFire(false);
  player.setInput(0, 0);
  knob.style.transform = 'translate(0px, 0px)';
  $('btn-ads').classList.remove('on');
  stickId = null; lookPointer = null;
}
$('btn-ads').addEventListener('pointerdown', (ev) => {
  ev.preventDefault(); ev.stopPropagation();
  if (state !== 'playing') return;
  adsOn = !adsOn;
  player.setADS(adsOn);
  $('btn-ads').classList.toggle('on', adsOn);
  audio.ui();
});
$('btn-reload').addEventListener('pointerdown', (ev) => { ev.preventDefault(); ev.stopPropagation(); if (state === 'playing') { player.startReload(); audio.bolt(); } });
$('btn-jump').addEventListener('pointerdown', (ev) => { ev.preventDefault(); ev.stopPropagation(); if (state === 'playing') player.jump(); });
const fireBtn = $('btn-fire');
fireBtn.addEventListener('pointerdown', (ev) => {
  ev.preventDefault(); ev.stopPropagation();
  if (state !== 'playing') return;
  try { fireBtn.setPointerCapture(ev.pointerId); } catch {}
  player.setFire(true);
  audio.init();
});
function fireEnd(ev) { ev.stopPropagation(); player.setFire(false); }
fireBtn.addEventListener('pointerup', fireEnd);
fireBtn.addEventListener('pointercancel', fireEnd);
fireBtn.addEventListener('lostpointercapture', () => player.setFire(false));
['pointerdown', 'pointerup', 'click'].forEach(ev => $('hud').addEventListener(ev, e => e.stopPropagation()));

window.addEventListener('resize', () => {
  const w = window.innerWidth, h = window.innerHeight;
  if (w < h) $('rotate-hint').style.display = 'block';
});

boot().then(() => {
  lastReal = performance.now();
  tick();
}).catch(err => {
  console.error(err);
  $('loader-status').textContent = 'FALHA AO INICIAR O MOTOR 3D';
});
