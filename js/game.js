// ===========================
// Game Manager
// ===========================

class Game {
    constructor() {
        // Canvas setup
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Game state
        this.state = 'menu'; // menu, playing, paused, gameover
        this.score = 0;
        this.level = 1;
        this.foodEaten = 0;
        
        // Grid settings
        this.gridSize = this.isMobile() ? 20 : 30;
        this.cellSize = 0;
        
        // Game objects
        this.snake = null;
        this.food = null;
        
        // Game settings
        this.difficulty = 'medium';
        this.baseSpeed = { easy: 150, medium: 100, hard: 60 };
        this.speed = this.baseSpeed.medium;
        this.lastUpdate = 0;
        
        // Sound settings
        this.soundEnabled = true;
        
        // Input handling
        this.touchStartX = 0;
        this.touchStartY = 0;
        
        // Animation frame
        this.animationId = null;
        
        // Initialize
        this.initCanvas();
        this.initUI();
        this.loadSettings();
    }

    // Initialize canvas
    initCanvas() {
        const maxSize = this.isMobile() ? 
            Math.min(window.innerWidth - 40, window.innerHeight - 250) :
            Math.min(600, window.innerWidth - 100, window.innerHeight - 200);
        
        this.canvas.width = maxSize;
        this.canvas.height = maxSize;
        this.cellSize = maxSize / this.gridSize;
    }

    // Check if mobile device
    isMobile() {
        return window.innerWidth <= 768;
    }

    // Initialize UI and event listeners
    initUI() {
        // Menu buttons
        document.getElementById('start-btn').addEventListener('click', () => this.startGame());
        document.getElementById('scores-btn').addEventListener('click', () => this.showScores());
        
        // Difficulty selector
        document.querySelectorAll('[data-difficulty]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('[data-difficulty]').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.difficulty = e.target.dataset.difficulty;
                this.speed = this.baseSpeed[this.difficulty];
                this.saveSettings();
            });
        });
        
        // Theme selector
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.setTheme(e.target.dataset.theme);
            });
        });
        
        // Sound toggle
        document.getElementById('sound-toggle').addEventListener('change', (e) => {
            this.soundEnabled = e.target.checked;
            this.saveSettings();
        });
        
        // Game controls
        document.getElementById('pause-btn').addEventListener('click', () => this.togglePause());
        document.getElementById('menu-btn').addEventListener('click', () => this.showMenu());
        document.getElementById('resume-btn').addEventListener('click', () => this.togglePause());
        
        // Game over buttons
        document.getElementById('play-again-btn').addEventListener('click', () => this.startGame());
        document.getElementById('back-menu-btn').addEventListener('click', () => this.showMenu());
        
        // Scores screen
        document.getElementById('back-scores-btn').addEventListener('click', () => this.showMenu());
        
        // Keyboard controls
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        // Mobile D-pad controls
        document.querySelectorAll('.d-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const direction = e.target.dataset.direction;
                this.handleDirectionInput(direction);
            });
        });
        
        // Touch swipe controls
        this.canvas.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
        this.canvas.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: true });
        
        // Resize handler
        window.addEventListener('resize', () => {
            if (this.state === 'menu' || this.state === 'gameover') {
                this.initCanvas();
            }
        });
    }

    // Handle keyboard input
    handleKeyPress(e) {
        if (this.state !== 'playing' && e.code !== 'Space') return;
        
        switch (e.code) {
            case 'ArrowUp':
            case 'KeyW':
                e.preventDefault();
                this.handleDirectionInput('up');
                break;
            case 'ArrowDown':
            case 'KeyS':
                e.preventDefault();
                this.handleDirectionInput('down');
                break;
            case 'ArrowLeft':
            case 'KeyA':
                e.preventDefault();
                this.handleDirectionInput('left');
                break;
            case 'ArrowRight':
            case 'KeyD':
                e.preventDefault();
                this.handleDirectionInput('right');
                break;
            case 'Space':
                e.preventDefault();
                if (this.state === 'playing' || this.state === 'paused') {
                    this.togglePause();
                }
                break;
            case 'Escape':
                e.preventDefault();
                if (this.state === 'playing' || this.state === 'paused') {
                    this.showMenu();
                }
                break;
        }
    }

    // Handle direction input
    handleDirectionInput(direction) {
        if (this.state !== 'playing' || !this.snake) return;
        
        const directions = {
            up: { x: 0, y: -1 },
            down: { x: 0, y: 1 },
            left: { x: -1, y: 0 },
            right: { x: 1, y: 0 }
        };
        
        if (directions[direction]) {
            this.snake.setDirection(directions[direction]);
        }
    }

    // Handle touch start
    handleTouchStart(e) {
        this.touchStartX = e.touches[0].clientX;
        this.touchStartY = e.touches[0].clientY;
    }

    // Handle touch move (swipe)
    handleTouchMove(e) {
        if (!this.touchStartX || !this.touchStartY) return;
        
        const touchEndX = e.touches[0].clientX;
        const touchEndY = e.touches[0].clientY;
        
        const diffX = touchEndX - this.touchStartX;
        const diffY = touchEndY - this.touchStartY;
        
        const minSwipeDistance = 30;
        
        if (Math.abs(diffX) > Math.abs(diffY)) {
            // Horizontal swipe
            if (Math.abs(diffX) > minSwipeDistance) {
                this.handleDirectionInput(diffX > 0 ? 'right' : 'left');
                this.touchStartX = touchEndX;
                this.touchStartY = touchEndY;
            }
        } else {
            // Vertical swipe
            if (Math.abs(diffY) > minSwipeDistance) {
                this.handleDirectionInput(diffY > 0 ? 'down' : 'up');
                this.touchStartX = touchEndX;
                this.touchStartY = touchEndY;
            }
        }
    }

    // Start new game
    startGame() {
        this.state = 'playing';
        this.score = 0;
        this.level = 1;
        this.foodEaten = 0;
        this.speed = this.baseSpeed[this.difficulty];
        
        // Create snake in center
        const centerX = Math.floor(this.gridSize / 2);
        const centerY = Math.floor(this.gridSize / 2);
        this.snake = new Snake(this.gridSize, centerX, centerY);
        
        // Create food
        this.food = new Food(this.gridSize);
        this.food.spawn(this.snake.getBody());
        
        // Update UI
        this.updateScoreDisplay();
        this.showScreen('game-screen');
        
        // Start game loop
        this.lastUpdate = performance.now();
        this.gameLoop(this.lastUpdate);
        
        this.playSound('start');
    }

    // Main game loop
    gameLoop(timestamp) {
        if (this.state !== 'playing') {
            return;
        }
        
        this.animationId = requestAnimationFrame((ts) => this.gameLoop(ts));
        
        const elapsed = timestamp - this.lastUpdate;
        
        if (elapsed > this.speed) {
            this.lastUpdate = timestamp;
            this.update();
            this.draw();
        }
    }

    // Update game state
    update() {
        if (!this.snake || !this.food) return;
        
        // Update snake position
        this.snake.update();
        
        // Check collisions
        if (this.snake.checkWallCollision() || this.snake.checkSelfCollision()) {
            this.gameOver();
            return;
        }
        
        // Check food collision
        if (this.snake.checkFoodCollision(this.food)) {
            this.snake.grow();
            this.score += this.food.getValue();
            this.foodEaten++;
            
            // Level up every 5 food
            if (this.foodEaten % 5 === 0) {
                this.level++;
                this.speed = Math.max(30, this.speed - 5); // Speed up gradually
            }
            
            this.food.spawn(this.snake.getBody());
            this.updateScoreDisplay();
            this.playSound('eat');
        }
    }

    // Draw game
    draw() {
        // Clear canvas
        this.ctx.fillStyle = getComputedStyle(document.documentElement)
            .getPropertyValue('--bg-secondary').trim();
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw grid
        this.drawGrid();
        
        // Draw food
        if (this.food) {
            this.food.draw(this.ctx, this.cellSize);
        }
        
        // Draw snake
        if (this.snake) {
            this.snake.draw(this.ctx, this.cellSize);
        }
    }

    // Draw grid
    drawGrid() {
        const gridColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--grid-color').trim();
        
        this.ctx.strokeStyle = gridColor;
        this.ctx.lineWidth = 1;
        
        // Vertical lines
        for (let x = 0; x <= this.gridSize; x++) {
            this.ctx.beginPath();
            this.ctx.moveTo(x * this.cellSize, 0);
            this.ctx.lineTo(x * this.cellSize, this.canvas.height);
            this.ctx.stroke();
        }
        
        // Horizontal lines
        for (let y = 0; y <= this.gridSize; y++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y * this.cellSize);
            this.ctx.lineTo(this.canvas.width, y * this.cellSize);
            this.ctx.stroke();
        }
    }

    // Toggle pause
    togglePause() {
        if (this.state === 'playing') {
            this.state = 'paused';
            document.getElementById('pause-overlay').classList.add('active');
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
            }
        } else if (this.state === 'paused') {
            this.state = 'playing';
            document.getElementById('pause-overlay').classList.remove('active');
            this.lastUpdate = performance.now();
            this.gameLoop(this.lastUpdate);
        }
    }

    // Game over
    gameOver() {
        this.state = 'gameover';
        
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        // Update final stats
        document.getElementById('final-score').textContent = this.score;
        document.getElementById('final-level').textContent = this.level;
        document.getElementById('food-eaten').textContent = this.foodEaten;
        
        // Save score
        storage.saveScore(this.score, this.level, this.foodEaten);
        
        // Show game over screen
        setTimeout(() => {
            this.showScreen('gameover-screen');
        }, 500);
        
        this.playSound('gameover');
    }

    // Show menu
    showMenu() {
        this.state = 'menu';
        
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        document.getElementById('pause-overlay').classList.remove('active');
        this.showScreen('menu-screen');
    }

    // Show scores
    showScores() {
        const scores = storage.getScores();
        const leaderboard = document.getElementById('leaderboard');
        
        if (scores.length === 0) {
            leaderboard.innerHTML = '<div class="empty-leaderboard">No high scores yet. Play to set a record!</div>';
        } else {
            leaderboard.innerHTML = scores.map((score, index) => `
                <div class="leaderboard-item">
                    <span class="leaderboard-rank">#${index + 1}</span>
                    <div>
                        <div class="leaderboard-score">${score.score} pts</div>
                        <div class="leaderboard-date">Level ${score.level} • ${storage.formatDate(score.date)}</div>
                    </div>
                </div>
            `).join('');
        }
        
        this.showScreen('scores-screen');
    }

    // Show specific screen
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }

    // Update score display
    updateScoreDisplay() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('level').textContent = this.level;
    }

    // Set theme
    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.saveSettings();
    }

    // Load settings
    loadSettings() {
        const settings = storage.getSettings();
        
        // Apply difficulty
        this.difficulty = settings.difficulty;
        this.speed = this.baseSpeed[this.difficulty];
        document.querySelectorAll('[data-difficulty]').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.difficulty === this.difficulty);
        });
        
        // Apply theme
        this.setTheme(settings.theme);
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === settings.theme);
        });
        
        // Apply sound setting
        this.soundEnabled = settings.soundEnabled;
        document.getElementById('sound-toggle').checked = this.soundEnabled;
    }

    // Save settings
    saveSettings() {
        const theme = document.documentElement.getAttribute('data-theme') || 'dark';
        storage.saveSettings({
            difficulty: this.difficulty,
            theme: theme,
            soundEnabled: this.soundEnabled
        });
    }

    // Play sound (basic implementation using Web Audio API)
    playSound(type) {
        if (!this.soundEnabled) return;
        
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            switch (type) {
                case 'eat':
                    oscillator.frequency.value = 800;
                    gainNode.gain.value = 0.1;
                    oscillator.start();
                    oscillator.stop(audioContext.currentTime + 0.1);
                    break;
                case 'gameover':
                    oscillator.frequency.value = 200;
                    gainNode.gain.value = 0.15;
                    oscillator.start();
                    oscillator.stop(audioContext.currentTime + 0.3);
                    break;
                case 'start':
                    oscillator.frequency.value = 600;
                    gainNode.gain.value = 0.1;
                    oscillator.start();
                    oscillator.stop(audioContext.currentTime + 0.15);
                    break;
            }
        } catch (error) {
            console.log('Sound playback not supported');
        }
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
});

