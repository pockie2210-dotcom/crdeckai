import * as THREE from 'three';
import { world } from './src/physics.js';
import { Car } from './src/car.js';
import { Ball } from './src/ball.js';
import { Arena } from './src/arena.js';
import { BoostPickup } from './src/boost.js';
import { keys } from './src/controls.js';

// Game State
const gameState = {
    score: { blue: 0, orange: 0 },
    timer: 300,
    boost: 100,
};

// Scene Setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050505);
scene.fog = new THREE.Fog(0x05010a, 20, 150);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
document.getElementById('game-container').appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const spotLight = new THREE.SpotLight(0x00e5ff, 2);
spotLight.position.set(20, 50, 20);
spotLight.castShadow = true;
scene.add(spotLight);

// Car, Ball, Arena & Boost
const car = new Car(scene);
const ball = new Ball(scene);
const arena = new Arena(scene);

const pickups = [
    new BoostPickup(scene, new THREE.Vector3(20, 0, 30)),
    new BoostPickup(scene, new THREE.Vector3(-20, 0, 30)),
    new BoostPickup(scene, new THREE.Vector3(20, 0, -30)),
    new BoostPickup(scene, new THREE.Vector3(-20, 0, -30)),
    new BoostPickup(scene, new THREE.Vector3(0, 0, 0)),
];

// Camera Logic
const cameraOffset = new THREE.Vector3(0, 5, 10);
function updateCamera() {
    const carPos = new THREE.Vector3().copy(car.mesh.position);
    const carQuat = new THREE.Quaternion().copy(car.mesh.quaternion);
    
    const offset = cameraOffset.clone().applyQuaternion(carQuat);
    camera.position.lerp(carPos.add(offset), 0.1);
    camera.lookAt(ball.mesh.position);
}

// Resize handling
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// HUD Update
function updateHUD() {
    document.getElementById('boost-value').textContent = Math.floor(gameState.boost);
    const offset = 283 - (gameState.boost / 100) * 283;
    document.getElementById('boost-fill').style.strokeDashoffset = offset;
}

// Fixed Time Step for Physics
const timeStep = 1 / 60;
let lastTime = 0;

// Animation Loop
function animate(time) {
    requestAnimationFrame(animate);
    
    const dt = (time - lastTime) / 1000;
    lastTime = time;

    // Physics Update
    world.step(timeStep, dt);
    
    // Car Controls
    const engineForce = 1500;
    const steeringValue = 0.5;

    if (keys.forward) car.applyEngineForce(-engineForce);
    else if (keys.backward) car.applyEngineForce(engineForce);
    else car.applyEngineForce(0);

    if (keys.left) car.setSteeringValue(steeringValue);
    else if (keys.right) car.setSteeringValue(-steeringValue);
    else car.setSteeringValue(0);

    if (keys.jump && car.chassisBody.position.y < 2) {
        car.jump();
    }

    // Update Visuals
    car.update(dt, keys);
    gameState.boost = car.boost;
    ball.update();
    // Goal Detection
    const goalScored = arena.checkGoal(ball.body.position);
    if (goalScored) {
        gameState.score[goalScored]++;
        // Goal Animation
        const scoreEl = document.getElementById(`${goalScored}-score`);
        scoreEl.classList.add('score-pop');
        setTimeout(() => scoreEl.classList.remove('score-pop'), 500);

        const goalMsg = document.getElementById('goal-message');
        goalMsg.textContent = `${goalScored.toUpperCase()} GOAL!`;
        goalMsg.classList.add('show-goal');
        setTimeout(() => goalMsg.classList.remove('show-goal'), 2000);

        ball.reset();
        car.chassisBody.position.set(0, 2, 0);
        car.chassisBody.velocity.set(0,0,0);
        car.chassisBody.angularVelocity.set(0,0,0);
    }

    // Timer Update
    gameState.timer -= dt;
    if (gameState.timer < 0) gameState.timer = 0;
    const mins = Math.floor(gameState.timer / 60);
    const secs = Math.floor(gameState.timer % 60);
    document.getElementById('timer').textContent = `${mins}:${secs.toString().padStart(2, '0')}`;

    // Update Pickups
    pickups.forEach(p => p.update(car.mesh.position, car));

    updateCamera();
    updateHUD();

    renderer.render(scene, camera);
}

animate(0);

console.log('Neon Car Soccer Scene Initialized');
