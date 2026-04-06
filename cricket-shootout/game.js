const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const hudRuns = document.getElementById('runs');
const hudSrate = document.getElementById('srate');
const hudBest = document.getElementById('best');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const menu = document.getElementById('menu');
const gameOverScreen = document.getElementById('game-over');
const finalRuns = document.getElementById('final-runs');

let gameState = 'MENU';
let score = 0;
let ballsFaced = 0;
let bestScore = 0;
let animationFrameId;

// Assets
const assets = {
    field: new Image(),
    batsman: new Image(),
    ball: new Image()
};

assets.field.src = 'assets/field.png';
assets.batsman.src = 'assets/batsman.png';
assets.ball.src = 'assets/ball.png';

// Game Configuration
const GRAVITY = 0.25;
const GROUND_Y = 550;
const BATSMAN_X = 200;
const BATSMAN_Y = 480;

// Game Objects
class Ball {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = canvas.width + 100;
        this.y = GROUND_Y - 50;
        this.vx = -12 - Math.random() * 8;
        this.vy = -5 - Math.random() * 8;
        this.radius = 10;
        this.active = true;
        this.hit = false;
        this.rotation = 0;
    }

    update() {
        if (!this.active) return;
        
        this.vy += GRAVITY;
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.vx * 0.1;

        // Bounce on ground
        if (this.y + this.radius > GROUND_Y) {
            this.y = GROUND_Y - this.radius;
            this.vy *= -0.6;
            this.vx *= 0.8;
        }

        // Check if out of bounds
        if (this.x < -100 || this.x > canvas.width + 200) {
            if (!this.hit) {
                ballsFaced++;
                checkGameOver();
            }
            this.reset();
            updateHUD();
        }

        // Check if hit wicket
        if (!this.hit && Math.abs(this.x - (BATSMAN_X - 10)) < 15 && Math.abs(this.y - (GROUND_Y - 40)) < 40) {
            createParticles(this.x, this.y, '#f59e0b');
            ballsFaced++;
            addScore(0);
            checkGameOver();
        }
    }

    draw() {
        if (!this.active) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.drawImage(assets.ball, -this.radius, -this.radius, this.radius * 2, this.radius * 2);
        ctx.restore();
    }
}

class Batsman {
    constructor() {
        this.x = BATSMAN_X;
        this.y = BATSMAN_Y;
        this.width = 120;
        this.height = 160;
        this.swinging = false;
        this.swingFrame = 0;
        this.swingDuration = 20; // frames
    }

    swing() {
        if (!this.swinging) {
            this.swinging = true;
            this.swingFrame = 0;
        }
    }

    update() {
        if (this.swinging) {
            this.swingFrame++;
            if (this.swingFrame >= this.swingDuration) {
                this.swinging = false;
            }

            // Hit Detection
            const swingMid = (this.swingDuration / 2);
            if (Math.abs(this.swingFrame - swingMid) < 3) {
                const dx = ball.x - (this.x + this.width / 2);
                const dy = ball.y - (this.y + this.height / 2);
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 80 && !ball.hit) {
                    ball.hit = true;
                    ball.vx = 15 + Math.random() * 10;
                    ball.vy = -10 - Math.random() * 15;
                    ballsFaced++;
                    createParticles(ball.x, ball.y);
                }
            }
        }
    }

    draw() {
        ctx.save();
        if (this.swinging) {
            const angle = (this.swingFrame / this.swingDuration) * Math.PI - Math.PI/2;
            ctx.translate(this.x + 40, this.y + 100);
            ctx.rotate(angle);
            ctx.drawImage(assets.batsman, -60, -100, this.width, this.height);
        } else {
            ctx.drawImage(assets.batsman, this.x, this.y, this.width, this.height);
        }
        ctx.restore();
    }
}

class Particle {
    constructor(x, y, color = '#fff') {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 10;
        this.vy = (Math.random() - 0.5) * 10;
        this.life = 1.0;
        this.color = color;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= 0.05;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

const ball = new Ball();
const batsman = new Batsman();
let particles = [];

function createParticles(x, y, color) {
    for (let i = 0; i < 15; i++) {
        particles.push(new Particle(x, y, color));
    }
}

// Scoring Zones (Markers on poles as seen in reference)
const leftZones = [
    { y: 0, h: 50, score: 6, color: '#fde047' }, // Yellow
    { y: 50, h: 50, score: 6, color: '#000' }, // Black
    { y: 100, h: 50, score: 4, color: '#fde047' },
    { y: 150, h: 50, score: 4, color: '#000' },
    { y: 200, h: 50, score: 0, color: '#fde047' }
];

const rightZones = [
    { y: 0, h: 40, score: 6, color: '#ef4444' }, // Red (top right)
    { y: 40, h: 40, score: 4, color: '#fbbf24' }, // Orange
    { y: 80, h: 40, score: 4, color: '#fff' },    // White
    { y: 120, h: 40, score: 3, color: '#fde047' }, // Yellow
    { y: 160, h: 40, score: 2, color: '#34d399' }, // Green
    { y: 200, h: 40, score: 2, color: '#10b981' }, // Darker Green
    { y: 240, h: 40, score: 1, color: '#059669' }  // Deepest Green
];

function checkScoring() {
    if (ball.hit) {
        // Right side scoring
        if (ball.x > canvas.width - 40) {
            for (const zone of rightZones) {
                if (ball.y > zone.y && ball.y < zone.y + zone.h) {
                    addScore(zone.score);
                    break;
                }
            }
        }
        // Left side scoring
        else if (ball.x < 40) {
            for (const zone of leftZones) {
                if (ball.y > zone.y && ball.y < zone.y + zone.h) {
                    addScore(zone.score);
                    break;
                }
            }
        }
    }
}

function addScore(points) {
    score += points;
    ball.hit = false;
    ball.active = false;
    createParticles(ball.x, ball.y, points > 0 ? '#fde047' : '#ff4444');
    setTimeout(() => { 
        if (gameState === 'PLAY') {
            ball.reset(); 
            ball.active = true; 
        }
    }, 800);
    updateHUD();
    checkGameOver();
}

function checkGameOver() {
    if (ballsFaced >= 10) {
        gameState = 'GAMEOVER';
        finalRuns.innerText = score;
        gameOverScreen.classList.remove('hidden');
    }
}

function updateHUD() {
    hudRuns.innerText = score;
    const srate = ballsFaced > 0 ? ((score / ballsFaced) * 100).toFixed(1) : 0;
    hudSrate.innerText = srate;
    if (score > bestScore) {
        bestScore = score;
        hudBest.innerText = bestScore;
    }
}

function resize() {
    canvas.width = 1000;
    canvas.height = 480; // Adjusted for footer
}

window.addEventListener('resize', resize);
resize();

window.addEventListener('mousedown', () => {
    if (gameState === 'PLAY') batsman.swing();
});

function startGame() {
    gameState = 'PLAY';
    score = 0;
    ballsFaced = 0;
    ball.reset();
    menu.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    updateHUD();
}

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);

function drawStripedPole(x, zones, width, striped = false) {
    zones.forEach(zone => {
        ctx.fillStyle = zone.color;
        ctx.fillRect(x, zone.y, width, zone.h);
        
        // Marker labels
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 16px Arial Black';
        ctx.textAlign = 'center';
        ctx.fillText(zone.score, x + width/2, zone.y + zone.h/2 + 6);
    });
    
    if (striped) {
        // Add diagonal stripes to the pole container
        ctx.save();
        ctx.globalCompositeOperation = 'source-atop';
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        for (let i = 0; i < 300; i += 10) {
            ctx.beginPath();
            ctx.moveTo(x, i);
            ctx.lineTo(x + width, i + 10);
            ctx.stroke();
        }
        ctx.restore();
    }
}

function main() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background color (CSS gradient is behind, but let's ensure it looks good)
    
    // Draw Ground
    ctx.fillStyle = '#1a0f0a'; // Dark brown base
    ctx.fillRect(0, canvas.height - 40, canvas.width, 40);
    ctx.fillStyle = '#166534'; // Grass layer
    ctx.fillRect(0, canvas.height - 40, canvas.width, 5);

    // Draw Scoring Poles
    drawStripedPole(0, leftZones, 20, true);
    drawStripedPole(canvas.width - 20, rightZones, 20, false);

    if (gameState === 'PLAY') {
        // Draw Wicket
        ctx.fillStyle = '#fde047';
        ctx.fillRect(BATSMAN_X - 10, GROUND_Y - 140, 4, 60);

        ball.update();
        batsman.update();
        checkScoring();
        
        particles = particles.filter(p => p.life > 0);
        particles.forEach(p => { p.update(); p.draw(); });

        ball.draw();
        batsman.draw();
    }

    animationFrameId = requestAnimationFrame(main);
}


// Ensure images are loaded before starting
let loadedImages = 0;
Object.values(assets).forEach(img => {
    img.onload = () => {
        loadedImages++;
        if (loadedImages === Object.keys(assets).length) {
            main();
        }
    };
});

