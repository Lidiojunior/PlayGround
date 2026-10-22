import * as THREE from '../vendor/three.module.js';
import { buildWorld } from './world.js';
import { Weapon } from './weapon.js';
import { SoundEngine } from './audio.js';
import { glowTexture, softParticleTexture, bulletHoleTexture } from './textures.js';

const $ = (id) => document.getElementById(id);
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;

const canvas = $('scene');
const menu = $('menu');
const hud = $('hud');
const results = $('results');
const loading = $('loading');
const startBtn = $('startBtn');
const replayBtn = $('replayBtn');
const menuBtn = $('menuBtn');
const exitBtn = $('exitBtn');
const muteBtn = $('muteBtn');
const fireBtn = $('fireBtn');
const adsBtn = $('adsBtn');
const reloadBtn = $('reloadBtn');

const els = {
  timer: $('timer'),
  timerWrap: $('timerWrap'),
  timerBar: $('timerBar'),
  score: $('score'),
  bestHud: $('bestHud'),
  bestMenu: $('bestMenu'),
  accuracy: $('accuracy'),
  streak: $('streak'),
  ammo: $('ammo'),
  reloadPrompt: $('reloadPrompt'),
  crosshair: $('crosshair'),
  hitmarker: $('hitmarker'),
  feed: $('feed'),
  scoreLayer: $('scoreLayer'),
  rankLetter: $('rankLetter'),
  rankName: $('rankName'),
  finalScore: $('finalScore'),
  finalKills: $('finalKills'),
  finalHeads: $('finalHeads'),
  finalAccuracy: $('finalAccuracy'),
  finalStreak: $('finalStreak'),
  finalShots: $('finalShots'),
  finalTime: $('finalTime'),
  newBest: $('newBest'),
  resultStamp: $('resultStamp'),
  menuClock: $('menuClock')
};

const audio = new SoundEngine();
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const tmpVec = new THREE.Vector3();
const tmpVec2 = new THREE.Vector3();
const tmpNormal = new THREE.Vector3();
const muzzleWorld = new THREE.Vector3();

let renderer;
let scene;
let camera;
let world;
let weapon;
let clock;
let viewScene;
let viewCamera;
let muzzleFlashLight;

const state = {
  mode: 'menu',
  score: 0,
  shots: 0,
  hits: 0,
  headshots: 0,
  kills: 0,
  streak: 0,
  bestStreak: 0,
  multiplier: 1,
  ammo: 30,
  magazine: 30,
  reloading: false,
  reloadT: 0,
  reloadDuration: 1.55,
  autoReloadAt: 0,
  lastShot: 0,
  firing: false,
  touchFiring: false,
  ads: false,
  timeLeft: 60,
  timeMax: 60,
  yaw: 0,
  pitch: -0.03,
  lookX: 0,
  lookY: 0,
  shake: 0,
  recoilPitch: 0,
  recoilYaw: 0,
  spread: 0,
  playerX: 0,
  playerZ: 2.9,
  bob: 0,
  speed: 0,
  best: Number(localStorage.getItem('blacksite.best') || 0),
  pointerDown: false,
  dragX: 0,
  dragY: 0,
  touchLookId: null,
  touchLookX: 0,
  touchLookY: 0,
  lockGrace: 0,
  fov: 62
};

const keys = new Set();
const decals = [];
const tracers = [];
const particles = [];
const scorePopups = [];
const bulletHoleTex = bulletHoleTexture();
const sparkTex = softParticleTexture();
const glowTex = glowTexture();

function formatScore(value) {
  return Math.max(0, Math.floor(value)).toString().padStart(6, '0');
}

function formatTime(value) {
  const seconds = Math.max(0, Math.ceil(value));
  return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
}

function makeEnvironment() {
  const envCanvas = document.createElement('canvas');
  envCanvas.width = 128;
  envCanvas.height = 64;
  const ctx = envCanvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 0, 64);
  gradient.addColorStop(0, '#24303b');
  gradient.addColorStop(0.42, '#11171c');
  gradient.addColorStop(0.62, '#151312');
  gradient.addColorStop(1, '#3a2213');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 128, 64);
  const warm = ctx.createRadialGradient(64, 26, 0, 64, 26, 42);
  warm.addColorStop(0, 'rgba(255,190,120,.5)');
  warm.addColorStop(0.5, 'rgba(255,120,50,.12)');
  warm.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = warm;
  ctx.fillRect(0, 0, 128, 64);
  const texture = new THREE.CanvasTexture(envCanvas);
  texture.mapping = THREE.EquirectangularReflectionMapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  scene.environment = texture;
  scene.environmentIntensity = 1.05;
}

function init() {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance', stencil: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.18;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(62, window.innerWidth / window.innerHeight, 0.03, 110);
  camera.rotation.order = 'YXZ';
  camera.position.set(0, 1.68, 2.9);
  scene.add(camera);

  makeEnvironment();
  world = buildWorld(scene);

  viewScene = new THREE.Scene();
  viewCamera = new THREE.PerspectiveCamera(58, window.innerWidth / window.innerHeight, 0.01, 5);
  viewScene.add(viewCamera);
  viewScene.environment = scene.environment;
  viewScene.environmentIntensity = 0.5;
  viewScene.add(new THREE.AmbientLight(0xffffff, 0.5));
  const viewHemi = new THREE.HemisphereLight(0xcfe0f0, 0x4a2e1a, 1.0);
  viewScene.add(viewHemi);
  const keyLight = new THREE.DirectionalLight(0xffe2c4, 0.85);
  keyLight.position.set(1.9, 1.5, 1.2);
  keyLight.target.position.set(0, 0.05, -0.4);
  viewScene.add(keyLight, keyLight.target);
  const rimLight = new THREE.DirectionalLight(0x9cbfe8, 1.25);
  rimLight.position.set(-1.9, 0.6, 0.9);
  rimLight.target.position.set(0, 0, -0.4);
  viewScene.add(rimLight, rimLight.target);
  const lowFill = new THREE.DirectionalLight(0xffe6c8, 0.4);
  lowFill.position.set(-0.4, -0.8, 1.4);
  lowFill.target.position.set(0, 0.1, -0.4);
  viewScene.add(lowFill, lowFill.target);
  const lensFill = new THREE.PointLight(0xffd7b0, 3.2, 2.6, 1.5);
  lensFill.position.set(0.5, 0.35, 0.45);
  viewScene.add(lensFill);

  weapon = new Weapon(viewScene, viewCamera);
  weapon.group.visible = false;

  muzzleFlashLight = new THREE.PointLight(0xffb066, 0, 7, 2);
  scene.add(muzzleFlashLight);

  clock = new THREE.Clock();
  state.best = Number(localStorage.getItem('blacksite.best') || 0);
  updateBestLabels();
  els.bestMenu.textContent = formatScore(state.best);
  els.bestHud.textContent = formatScore(state.best);

  world.targets.preview();
  setupEvents();
  applyViewport();

  updateHud(true);
  requestAnimationFrame(() => {
    renderer.autoClear = false;
    renderer.clear();
    renderer.render(scene, camera);
    renderer.clearDepth();
    renderer.render(viewScene, viewCamera);
    loading.classList.add('done');
    setTimeout(() => loading.remove(), 800);
  });
  renderer.setAnimationLoop(animate);
}

function applyViewport() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, width < 760 ? 1.4 : 1.7));
  renderer.setSize(width, height);
  camera.aspect = width / height;
  state.fov = width < height * 0.85 ? 78 : 62;
  camera.updateProjectionMatrix();
  if (viewCamera) {
    viewCamera.aspect = width / height;
    viewCamera.updateProjectionMatrix();
  }
}

function setupEvents() {
  window.addEventListener('resize', applyViewport);

  startBtn.addEventListener('click', () => {
    audio.init();
    audio.start();
    startGame(true);
  });
  replayBtn.addEventListener('click', () => {
    audio.init();
    audio.start();
    startGame(true);
  });
  menuBtn.addEventListener('click', () => {
    audio.ui();
    showMenu();
  });
  exitBtn.addEventListener('click', () => {
    if (state.mode === 'playing') finishGame('encerrado');
  });
  muteBtn.addEventListener('click', () => {
    audio.init();
    const muted = audio.toggle();
    muteBtn.textContent = muted ? 'MUDO' : 'SOM';
    muteBtn.style.color = muted ? '#ff5a1f' : '';
  });

  canvas.addEventListener('pointerdown', (event) => {
    if (state.mode !== 'playing') return;
    audio.init();
    if (event.pointerType === 'touch') {
      state.touchLookId = event.pointerId;
      state.touchLookX = event.clientX;
      state.touchLookY = event.clientY;
      return;
    }
    state.pointerDown = true;
    state.dragX = event.clientX;
    state.dragY = event.clientY;
    if (document.pointerLockElement !== canvas) {
      try { canvas.requestPointerLock(); } catch { }
      state.lockGrace = performance.now() + 220;
    }
    state.firing = true;
    fire();
  });

  window.addEventListener('pointerup', (event) => {
    if (event.pointerType === 'touch') {
      if (event.pointerId === state.touchLookId) state.touchLookId = null;
      return;
    }
    state.pointerDown = false;
    state.firing = false;
  });

  window.addEventListener('blur', () => {
    state.firing = false;
    state.touchFiring = false;
    keys.clear();
  });

  window.addEventListener('mousemove', (event) => {
    if (state.mode !== 'playing') return;
    let dx = 0;
    let dy = 0;
    if (document.pointerLockElement === canvas) {
      if (performance.now() < state.lockGrace) return;
      dx = event.movementX;
      dy = event.movementY;
    } else if (state.pointerDown) {
      dx = event.clientX - state.dragX;
      dy = event.clientY - state.dragY;
      state.dragX = event.clientX;
      state.dragY = event.clientY;
    }
    if (!dx && !dy) return;
    const sensitivity = state.ads ? 0.00105 : 0.0021;
    state.yaw = clamp(state.yaw - dx * sensitivity, -0.62, 0.62);
    state.pitch = clamp(state.pitch - dy * sensitivity, -0.3, 0.32);
    state.lookX = clamp(dx * 0.0016, -0.4, 0.4);
    state.lookY = clamp(dy * 0.0016, -0.4, 0.4);
  });

  canvas.addEventListener('pointermove', (event) => {
    if (state.mode !== 'playing' || event.pointerType !== 'touch') return;
    if (event.pointerId !== state.touchLookId) return;
    const dx = event.clientX - state.touchLookX;
    const dy = event.clientY - state.touchLookY;
    state.touchLookX = event.clientX;
    state.touchLookY = event.clientY;
    const sensitivity = state.ads ? 0.0021 : 0.0042;
    state.yaw = clamp(state.yaw - dx * sensitivity, -0.62, 0.62);
    state.pitch = clamp(state.pitch - dy * sensitivity, -0.3, 0.32);
    state.lookX = clamp(dx * 0.002, -0.4, 0.4);
    state.lookY = clamp(dy * 0.002, -0.4, 0.4);
  });

  canvas.addEventListener('contextmenu', (event) => event.preventDefault());
  canvas.addEventListener('mousedown', (event) => {
    if (event.button === 2 && state.mode === 'playing') {
      state.ads = true;
    }
  });
  window.addEventListener('mouseup', (event) => {
    if (event.button === 2) state.ads = false;
  });

  window.addEventListener('keydown', (event) => {
    if (state.mode !== 'playing') return;
    keys.add(event.code);
    if (event.code === 'KeyR') startReload();
    if (event.code === 'Space') {
      event.preventDefault();
      state.firing = true;
      fire();
    }
    if (event.code === 'KeyM') muteBtn.click();
  });
  window.addEventListener('keyup', (event) => {
    keys.delete(event.code);
    if (event.code === 'Space') state.firing = false;
  });

  fireBtn.addEventListener('pointerdown', (event) => {
    event.preventDefault();
    audio.init();
    state.touchFiring = true;
    fire();
  });
  const stopTouchFire = (event) => {
    event.preventDefault();
    state.touchFiring = false;
  };
  fireBtn.addEventListener('pointerup', stopTouchFire);
  fireBtn.addEventListener('pointercancel', stopTouchFire);
  fireBtn.addEventListener('pointerleave', stopTouchFire);
  adsBtn.addEventListener('pointerdown', (event) => {
    event.preventDefault();
    state.ads = !state.ads;
  });
  reloadBtn.addEventListener('pointerdown', (event) => {
    event.preventDefault();
    startReload();
  });

  document.addEventListener('pointerlockchange', () => {
    if (document.pointerLockElement !== canvas) {
      state.pointerDown = false;
    }
  });

  setInterval(() => {
    const now = new Date();
    els.menuClock.textContent = now.toLocaleTimeString('pt-BR', { hour12: false });
  }, 1000);
  const now = new Date();
  els.menuClock.textContent = now.toLocaleTimeString('pt-BR', { hour12: false });
}

function resetState() {
  state.score = 0;
  state.shots = 0;
  state.hits = 0;
  state.headshots = 0;
  state.kills = 0;
  state.streak = 0;
  state.bestStreak = 0;
  state.multiplier = 1;
  state.ammo = state.magazine;
  state.reloading = false;
  state.reloadT = 0;
  state.autoReloadAt = 0;
  state.lastShot = 0;
  state.firing = false;
  state.touchFiring = false;
  state.ads = false;
  state.timeLeft = 60;
  state.yaw = 0;
  state.pitch = -0.035;
  state.lookX = 0;
  state.lookY = 0;
  state.shake = 0;
  state.recoilPitch = 0;
  state.recoilYaw = 0;
  state.spread = 0;
  state.playerX = 0;
  state.playerZ = 2.9;
  state.bob = 0;
  state.speed = 0;
  state.pointerDown = false;
  state.touchLookId = null;
  state.lockGrace = 0;
  keys.clear();
  els.feed.innerHTML = '';
  els.scoreLayer.innerHTML = '';
  decals.forEach((decal) => scene.remove(decal));
  decals.length = 0;
  tracers.forEach((tracer) => scene.remove(tracer.line));
  tracers.length = 0;
  particles.forEach((p) => scene.remove(p.sprite));
  particles.length = 0;
  world.targets.reset();
  updateHud(true);
}

function startGame(requestLock = false) {
  resetState();
  state.mode = 'playing';
  results.classList.add('hidden');
  menu.classList.add('leaving');
  setTimeout(() => menu.classList.add('hidden'), 600);
  hud.classList.remove('hidden');
  requestAnimationFrame(() => hud.classList.add('in'));
  weapon.group.visible = true;
  weapon.adsT = 0;
  camera.fov = state.fov;
  camera.updateProjectionMatrix();
  setTimeout(() => {
    if (state.mode === 'playing') addFeed('TREINO INICIADO', '60s · RANGE 07', false);
  }, 700);
}

function showMenu() {
  state.mode = 'menu';
  results.classList.add('hidden');
  hud.classList.remove('in');
  hud.classList.add('hidden');
  menu.classList.remove('hidden', 'leaving');
  weapon.group.visible = false;
  document.exitPointerLock?.();
  world.targets.preview();
  document.querySelectorAll('.feed-item').forEach((el) => el.remove());
}

function finishGame(reason = 'concluido') {
  if (state.mode !== 'playing') return;
  state.mode = 'results';
  state.firing = false;
  state.touchFiring = false;
  document.exitPointerLock?.();
  audio.end();
  const elapsed = Math.max(1, Math.round(state.timeMax - state.timeLeft));
  const accuracy = state.shots ? Math.round((state.hits / state.shots) * 100) : 0;
  const isBest = state.score > state.best;
  if (isBest) {
    state.best = state.score;
    localStorage.setItem('blacksite.best', String(state.best));
    updateBestLabels();
  }
  let rank = 'D';
  let rankName = 'NOVATO';
  if (state.score >= 7800) { rank = 'S'; rankName = 'LENDA TÁTICA'; }
  else if (state.score >= 5400) { rank = 'A'; rankName = 'OPERADOR'; }
  else if (state.score >= 3400) { rank = 'B'; rankName = 'ATIRADOR'; }
  else if (state.score >= 1600) { rank = 'C'; rankName = 'RECRUTA'; }
  els.rankLetter.textContent = rank;
  els.rankName.textContent = rankName;
  els.finalScore.textContent = formatScore(state.score);
  els.finalKills.textContent = String(state.kills);
  els.finalHeads.textContent = String(state.headshots);
  els.finalAccuracy.textContent = `${accuracy}%`;
  els.finalStreak.textContent = String(state.bestStreak);
  els.finalShots.textContent = String(state.shots);
  els.finalTime.textContent = reason === 'encerrado' ? `${elapsed}s` : `${elapsed}s`;
  els.newBest.classList.toggle('show', isBest);
  els.resultStamp.textContent = new Date().toLocaleString('pt-BR', { hour12: false });
  els.timer.textContent = formatTime(reason === 'encerrado' ? state.timeLeft : 0);
  els.timerBar.style.width = `${reason === 'encerrado' ? (state.timeLeft / state.timeMax) * 100 : 0}%`;
  els.feed.innerHTML = '';
  setTimeout(() => {
    hud.classList.remove('in');
    setTimeout(() => hud.classList.add('hidden'), 350);
    results.classList.remove('hidden');
    results.style.animation = 'none';
    void results.offsetWidth;
    results.style.animation = '';
  }, 350);
}

function updateBestLabels() {
  els.bestMenu.textContent = formatScore(state.best);
  els.bestHud.textContent = formatScore(state.best);
}

function startReload() {
  if (state.mode !== 'playing' || state.reloading || state.ammo === state.magazine) return;
  state.reloading = true;
  state.reloadT = 0;
  audio.reload();
  els.reloadPrompt.classList.remove('show');
  addFeed('RECARREGANDO', 'CARREGADOR 5.56', false);
}

function updateReload(dt) {
  if (!state.reloading) return;
  state.reloadT += dt;
  if (state.reloadT >= state.reloadDuration) {
    state.reloading = false;
    state.ammo = state.magazine;
    state.reloadT = 0;
    updateAmmo();
  }
}

function fire() {
  if (state.mode !== 'playing' || state.reloading) return;
  const now = performance.now() / 1000;
  if (now - state.lastShot < 0.105) return;
  if (state.ammo <= 0) {
    if (now - state.lastShot > 0.22) {
      state.lastShot = now;
      audio.dry();
      state.autoReloadAt = now + 0.25;
      els.reloadPrompt.classList.add('show');
    }
    return;
  }
  state.lastShot = now;
  state.ammo--;
  state.shots++;
  updateAmmo();

  camera.updateMatrixWorld(true);
  scene.updateMatrixWorld(true);
  weapon.getMuzzleWorld(muzzleWorld);
  muzzleWorld.applyMatrix4(camera.matrixWorld);
  muzzleFlashLight.position.copy(muzzleWorld);
  muzzleFlashLight.intensity = 42;

  state.recoilPitch += state.ads ? 0.0075 : 0.0115;
  state.recoilYaw += (Math.random() - 0.5) * 0.004;
  state.shake = Math.min(0.55, state.shake + 0.16);
  state.spread = Math.min(20, state.spread + (state.ads ? 2.4 : 5.2));
  weapon.kick(state.ads ? 0.8 : 1);
  audio.shoot();

  const spread = state.ads ? 0.0012 : 0.0085;
  const angle = Math.random() * Math.PI * 2;
  const radius = Math.sqrt(Math.random()) * spread;
  pointer.set(Math.cos(angle) * radius, Math.sin(angle) * radius);
  raycaster.setFromCamera(pointer, camera);
  raycaster.far = 90;

  const targetHit = world.targets.intersect(raycaster);
  let endPoint = null;
  let normal = null;
  if (targetHit) {
    endPoint = targetHit.point.clone();
    normal = targetHit.face ? targetHit.face.normal.clone().transformDirection(targetHit.object.matrixWorld) : new THREE.Vector3(0, 0, 1);
  } else {
    const envHits = raycaster.intersectObjects(world.collidables, false);
    if (envHits.length) {
      endPoint = envHits[0].point.clone();
      normal = envHits[0].face ? envHits[0].face.normal.clone().transformDirection(envHits[0].object.matrixWorld) : new THREE.Vector3(0, 0, 1);
    } else {
      endPoint = raycaster.ray.at(60, new THREE.Vector3());
      normal = new THREE.Vector3(0, 0, 1);
    }
  }

  spawnTracer(muzzleWorld, endPoint);

  if (targetHit) {
    const info = world.targets.hit(targetHit);
    if (info) {
      registerHit(info, endPoint);
    }
  } else {
    state.streak = 0;
    state.multiplier = 1;
    updateHud();
    spawnImpact(endPoint, normal, false);
    audio.target();
  }

  if (state.ammo === 0) {
    state.autoReloadAt = performance.now() / 1000 + 0.3;
    els.reloadPrompt.classList.add('show');
  }
}

function registerHit(info, point) {
  state.hits++;
  state.kills++;
  state.streak++;
  state.bestStreak = Math.max(state.bestStreak, state.streak);
  const tier = Math.min(4, Math.floor(state.streak / 3));
  state.multiplier = 1 + tier * 0.5;
  const base = info.headshot ? 250 : 100;
  const points = Math.round(base * state.multiplier);
  state.score += points;
  if (info.headshot) state.headshots++;

  els.hitmarker.classList.remove('show', 'head');
  void els.hitmarker.offsetWidth;
  els.hitmarker.classList.add('show');
  if (info.headshot) els.hitmarker.classList.add('head');

  spawnImpact(point, new THREE.Vector3(0, 0, 1), true, info.headshot);
  audio.hit(info.headshot);
  audio.target();
  updateHud();
  showScorePopup(points, info.headshot, state.multiplier);
  addFeed(
    info.headshot ? 'TIRO NA CABEÇA' : 'HOSTIL NEUTRALIZADO',
    `+${points}${state.multiplier > 1 ? ` · x${state.multiplier.toFixed(1)}` : ''}`,
    info.headshot
  );
  if (state.streak > 0 && state.streak % 3 === 0) {
    addFeed('SEQUÊNCIA', `MULTIPLICADOR x${state.multiplier.toFixed(1)}`, true);
  }
}

function updateHud(force = false) {
  els.score.textContent = formatScore(state.score);
  const accuracy = state.shots ? Math.round((state.hits / state.shots) * 100) : 100;
  els.accuracy.textContent = `${accuracy}%`;
  els.streak.innerHTML = `${state.streak} <em>x${state.multiplier.toFixed(1)}</em>`;
  els.timer.textContent = formatTime(state.timeLeft);
  const ratio = clamp(state.timeLeft / state.timeMax, 0, 1);
  els.timerBar.style.width = `${ratio * 100}%`;
  els.timerWrap.classList.toggle('danger', state.timeLeft <= 10);
  els.ammo.textContent = String(state.ammo);
  els.ammo.parentElement.classList.toggle('low', state.ammo <= 6);
  updateAmmoBars();
  if (force) updateAmmo();
  els.crosshair.classList.toggle('ads', state.ads);
  els.reloadPrompt.classList.toggle('show', state.ammo <= 0 && !state.reloading);
}

function updateAmmo() {
  els.ammo.textContent = String(state.ammo);
  els.ammo.parentElement.classList.toggle('low', state.ammo <= 6);
  updateAmmoBars();
  els.reloadPrompt.classList.toggle('show', state.ammo <= 0 && !state.reloading);
}

function updateAmmoBars() {
  const bars = document.querySelectorAll('.mags i');
  const active = Math.ceil(state.ammo / 3);
  bars.forEach((bar, index) => bar.classList.toggle('on', index < active));
}

function addFeed(label, detail, headshot) {
  const item = document.createElement('div');
  item.className = 'feed-item' + (headshot ? ' head' : '');
  item.innerHTML = `<span>${label}</span><b>${detail}</b><i>${new Date().toLocaleTimeString('pt-BR', { hour12: false })}</i>`;
  els.feed.append(item);
  while (els.feed.children.length > 4) els.feed.firstElementChild.remove();
  setTimeout(() => {
    item.classList.add('out');
    setTimeout(() => item.remove(), 320);
  }, 2400);
}

function showScorePopup(points, headshot, multiplier) {
  const popup = document.createElement('div');
  popup.className = 'float-score' + (headshot ? ' head' : '');
  popup.innerHTML = `+${points}${headshot ? '<small>CABEÇA</small>' : multiplier > 1 ? `<small>x${multiplier.toFixed(1)}</small>` : ''}`;
  popup.style.left = `calc(50% + ${(Math.random() - 0.5) * 90}px)`;
  popup.style.top = `calc(50% + ${-24 + Math.random() * 18}px)`;
  els.scoreLayer.append(popup);
  scorePopups.push({ element: popup, life: 1 });
}

function spawnTracer(from, to) {
  const geometry = new THREE.BufferGeometry().setFromPoints([from, to]);
  const material = new THREE.LineBasicMaterial({
    color: 0xffb05a,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    toneMapped: false
  });
  const line = new THREE.Line(geometry, material);
  scene.add(line);
  tracers.push({ line, life: 0.085, maxLife: 0.085 });
}

function spawnImpact(point, normal, isTarget, headshot) {
  const count = isTarget ? 10 : 7;
  const tint = isTarget ? (headshot ? 0xff9a55 : 0xd7c9a8) : 0xffb066;
  for (let i = 0; i < count; i++) {
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
      map: sparkTex,
      color: tint,
      transparent: true,
      opacity: 1,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false
    }));
    const scale = 0.02 + Math.random() * 0.045;
    sprite.scale.set(scale, scale, 1);
    sprite.position.copy(point);
    scene.add(sprite);
    const velocity = normal.clone().multiplyScalar(0.5 + Math.random() * 1.1).add(new THREE.Vector3(
      (Math.random() - 0.5) * 1.3,
      (Math.random() - 0.15) * 1.1,
      (Math.random() - 0.5) * 1.3
    ));
    particles.push({ sprite, velocity, life: 0.22 + Math.random() * 0.3, maxLife: 0.5, gravity: 2.2 });
  }
  if (!isTarget) {
    addDecal(point, normal);
    const puff = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glowTex,
      color: 0x8a8175,
      transparent: true,
      opacity: 0.32,
      blending: THREE.NormalBlending,
      depthWrite: false,
      toneMapped: false
    }));
    puff.position.copy(point).addScaledVector(normal, 0.05);
    puff.scale.set(0.32, 0.32, 1);
    scene.add(puff);
    particles.push({ sprite: puff, velocity: normal.clone().multiplyScalar(0.22).add(new THREE.Vector3(0, 0.12, 0)), life: 0.7, maxLife: 0.7, gravity: -0.05, grow: 0.6 });
  }
}

function addDecal(point, normal) {
  const material = new THREE.MeshBasicMaterial({
    map: bulletHoleTex,
    transparent: true,
    opacity: 0.92,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: -2,
    polygonOffsetUnits: -2,
    side: THREE.DoubleSide,
    toneMapped: false
  });
  const decal = new THREE.Mesh(new THREE.PlaneGeometry(0.09, 0.09), material);
  decal.position.copy(point).addScaledVector(normal, 0.009);
  decal.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
  decal.rotateZ(Math.random() * Math.PI * 2);
  const scale = 0.75 + Math.random() * 0.7;
  decal.scale.set(scale, scale, scale);
  scene.add(decal);
  decals.push(decal);
  if (decals.length > 42) {
    const old = decals.shift();
    scene.remove(old);
    old.material.dispose();
    old.geometry.dispose();
  }
}

function updateEffects(dt) {
  for (let i = tracers.length - 1; i >= 0; i--) {
    const tracer = tracers[i];
    tracer.life -= dt;
    tracer.line.material.opacity = Math.max(0, tracer.life / tracer.maxLife) * 0.75;
    if (tracer.life <= 0) {
      scene.remove(tracer.line);
      tracer.line.geometry.dispose();
      tracer.line.material.dispose();
      tracers.splice(i, 1);
    }
  }
  for (let i = particles.length - 1; i >= 0; i--) {
    const particle = particles[i];
    particle.life -= dt;
    particle.velocity.y -= particle.gravity * dt;
    particle.sprite.position.addScaledVector(particle.velocity, dt);
    if (particle.grow) {
      const s = particle.sprite.scale.x + particle.grow * dt;
      particle.sprite.scale.set(s, s, 1);
    }
    particle.sprite.material.opacity = Math.max(0, particle.life / particle.maxLife) * (particle.grow ? 0.32 : 1);
    if (particle.life <= 0) {
      scene.remove(particle.sprite);
      particle.sprite.material.dispose();
      particles.splice(i, 1);
    }
  }
  for (let i = scorePopups.length - 1; i >= 0; i--) {
    scorePopups[i].life -= dt;
    if (scorePopups[i].life <= 0) scorePopups.splice(i, 1);
  }
}

function updateAim(dt, time) {
  if (state.mode === 'playing') {
    const forward = (keys.has('KeyW') || keys.has('ArrowUp') ? 1 : 0) - (keys.has('KeyS') || keys.has('ArrowDown') ? 1 : 0);
    const strafe = (keys.has('KeyD') || keys.has('ArrowRight') ? 1 : 0) - (keys.has('KeyA') || keys.has('ArrowLeft') ? 1 : 0);
    const moving = forward !== 0 || strafe !== 0;
    state.speed = lerp(state.speed, moving ? 1 : 0, clamp(dt * 8, 0, 1));
    if (moving) {
      state.playerZ = clamp(state.playerZ - forward * dt * 1.6, 1.85, 3.35);
      state.playerX = clamp(state.playerX + strafe * dt * 1.5, -1.45, 1.45);
      state.bob += dt * (7 + state.speed * 3);
    } else {
      state.bob += dt * 1.6;
    }
    const bobAmount = Math.sin(state.bob) * 0.012 * state.speed;
    camera.position.set(
      state.playerX + Math.cos(state.bob * 0.5) * 0.004 * state.speed,
      1.68 + bobAmount,
      state.playerZ
    );
  } else if (state.mode === 'menu') {
    state.yaw = Math.sin(time * 0.09) * 0.055 + 0.01;
    state.pitch = -0.035 + Math.sin(time * 0.13) * 0.004;
    camera.position.set(Math.sin(time * 0.07) * 0.12, 1.66 + Math.sin(time * 0.11) * 0.008, 2.92 + Math.cos(time * 0.09) * 0.06);
  }

  if (state.mode === 'playing') {
    state.recoilPitch *= Math.exp(-10 * dt);
    state.recoilYaw *= Math.exp(-10 * dt);
    state.shake *= Math.exp(-8.5 * dt);
    state.lookX *= Math.exp(-6 * dt);
    state.lookY *= Math.exp(-6 * dt);
    state.spread *= Math.exp(-7 * dt);
    if (state.shake < 0.002) state.shake = 0;
    camera.position.x += (Math.random() - 0.5) * state.shake * 0.018;
    camera.position.y += (Math.random() - 0.5) * state.shake * 0.018;
    camera.rotation.set(state.pitch + state.recoilPitch, state.yaw + state.recoilYaw, (Math.random() - 0.5) * state.shake * 0.0025);
    const baseFov = state.fov;
    const targetFov = state.ads ? 43 : baseFov;
    camera.fov = lerp(camera.fov, targetFov, clamp(dt * 11, 0, 1));
    camera.updateProjectionMatrix();
    els.crosshair.style.setProperty('--gap', `${13 + state.spread}px`);
  } else if (state.mode === 'menu') {
    camera.rotation.set(state.pitch, state.yaw, 0);
    camera.fov = 62;
    camera.updateProjectionMatrix();
    state.recoilPitch = 0;
    state.recoilYaw = 0;
  }

  const reloadProgress = state.reloading ? state.reloadT / state.reloadDuration : -1;
  viewCamera.rotation.set((Math.random() - 0.5) * state.shake * 0.004, (Math.random() - 0.5) * state.shake * 0.004, 0);
  weapon.update(dt, time, {
    ads: state.ads,
    speed: state.mode === 'playing' ? state.speed : 0,
    lookX: state.lookX,
    lookY: state.lookY,
    reload: reloadProgress
  });
}

function animate() {
  const dt = Math.min(clock.getDelta(), 0.05);
  const time = clock.elapsedTime;

  if (state.mode === 'playing') {
    state.timeLeft = Math.max(0, state.timeLeft - dt);
    updateReload(dt);
    if (state.timeLeft <= 0) {
      finishGame('concluido');
    }
    if (state.ammo === 0 && !state.reloading && performance.now() / 1000 >= state.autoReloadAt) {
      startReload();
    }
    if ((state.firing || state.touchFiring) && state.mode === 'playing' && state.timeLeft > 0) {
      fire();
    }
    updateHud();
  }

  updateAim(dt, time);
  world.update(dt, time);
  updateEffects(dt);
  muzzleFlashLight.intensity *= Math.exp(-30 * dt);
  renderer.autoClear = false;
  renderer.clear();
  renderer.render(scene, camera);
  renderer.clearDepth();
  renderer.render(viewScene, viewCamera);
}

window.__blacksite = {
  state,
  get world() { return world; },
  get weapon() { return weapon; },
  get camera() { return camera; },
  get scene() { return scene; },
  get renderer() { return renderer; },
  startGame,
  finishGame
};

init();
