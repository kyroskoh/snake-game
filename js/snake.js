// ===========================
// Snake Class
// ===========================

class Snake {
    constructor(gridSize, startX, startY) {
        this.gridSize = gridSize;
        this.direction = { x: 1, y: 0 }; // Start moving right
        this.nextDirection = { x: 1, y: 0 };
        this.body = [
            { x: startX, y: startY },
            { x: startX - 1, y: startY },
            { x: startX - 2, y: startY }
        ];
        this.growing = false;
    }

    // Update snake position
    update() {
        // Update direction (prevents 180-degree turns)
        if (this.nextDirection.x !== -this.direction.x || 
            this.nextDirection.y !== -this.direction.y) {
            this.direction = { ...this.nextDirection };
        }

        // Calculate new head position
        const head = this.getHead();
        const newHead = {
            x: head.x + this.direction.x,
            y: head.y + this.direction.y
        };

        // Add new head
        this.body.unshift(newHead);

        // Remove tail unless growing
        if (!this.growing) {
            this.body.pop();
        } else {
            this.growing = false;
        }
    }

    // Change direction
    setDirection(direction) {
        // Prevent 180-degree turns
        if (direction.x !== -this.direction.x || direction.y !== -this.direction.y) {
            this.nextDirection = direction;
        }
    }

    // Grow snake
    grow() {
        this.growing = true;
    }

    // Get head position
    getHead() {
        return this.body[0];
    }

    // Get all body segments
    getBody() {
        return this.body;
    }

    // Check collision with self
    checkSelfCollision() {
        const head = this.getHead();
        for (let i = 1; i < this.body.length; i++) {
            if (head.x === this.body[i].x && head.y === this.body[i].y) {
                return true;
            }
        }
        return false;
    }

    // Check collision with walls
    checkWallCollision() {
        const head = this.getHead();
        return (
            head.x < 0 || 
            head.x >= this.gridSize || 
            head.y < 0 || 
            head.y >= this.gridSize
        );
    }

    // Check collision with food
    checkFoodCollision(food) {
        const head = this.getHead();
        const foodPos = food.getPosition();
        return head.x === foodPos.x && head.y === foodPos.y;
    }

    // Draw snake on canvas
    draw(ctx, cellSize) {
        this.body.forEach((segment, index) => {
            const x = segment.x * cellSize;
            const y = segment.y * cellSize;
            const isHead = index === 0;

            ctx.save();

            if (isHead) {
                // Draw head with gradient and glow
                const gradient = ctx.createRadialGradient(
                    x + cellSize / 2,
                    y + cellSize / 2,
                    0,
                    x + cellSize / 2,
                    y + cellSize / 2,
                    cellSize
                );
                
                const snakeColor = getComputedStyle(document.documentElement)
                    .getPropertyValue('--snake-color').trim();
                
                gradient.addColorStop(0, snakeColor);
                gradient.addColorStop(1, this.adjustColorBrightness(snakeColor, -40));

                // Outer glow
                ctx.shadowColor = snakeColor;
                ctx.shadowBlur = 15;
                
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.roundRect(x + 1, y + 1, cellSize - 2, cellSize - 2, 6);
                ctx.fill();

                // Eyes
                const eyeSize = cellSize / 6;
                const eyeOffset = cellSize / 3;
                ctx.fillStyle = '#000';
                
                if (this.direction.x === 1) { // Moving right
                    ctx.fillRect(x + cellSize - eyeOffset, y + eyeOffset, eyeSize, eyeSize);
                    ctx.fillRect(x + cellSize - eyeOffset, y + cellSize - eyeOffset - eyeSize, eyeSize, eyeSize);
                } else if (this.direction.x === -1) { // Moving left
                    ctx.fillRect(x + eyeOffset - eyeSize, y + eyeOffset, eyeSize, eyeSize);
                    ctx.fillRect(x + eyeOffset - eyeSize, y + cellSize - eyeOffset - eyeSize, eyeSize, eyeSize);
                } else if (this.direction.y === -1) { // Moving up
                    ctx.fillRect(x + eyeOffset, y + eyeOffset - eyeSize, eyeSize, eyeSize);
                    ctx.fillRect(x + cellSize - eyeOffset - eyeSize, y + eyeOffset - eyeSize, eyeSize, eyeSize);
                } else { // Moving down
                    ctx.fillRect(x + eyeOffset, y + cellSize - eyeOffset, eyeSize, eyeSize);
                    ctx.fillRect(x + cellSize - eyeOffset - eyeSize, y + cellSize - eyeOffset, eyeSize, eyeSize);
                }
            } else {
                // Draw body segment with gradient
                const snakeColor = getComputedStyle(document.documentElement)
                    .getPropertyValue('--snake-color').trim();
                
                // Fade effect based on position
                const opacity = 1 - (index / this.body.length) * 0.3;
                const segmentColor = this.adjustColorOpacity(snakeColor, opacity);
                
                const gradient = ctx.createRadialGradient(
                    x + cellSize / 2,
                    y + cellSize / 2,
                    0,
                    x + cellSize / 2,
                    y + cellSize / 2,
                    cellSize / 2
                );
                
                gradient.addColorStop(0, segmentColor);
                gradient.addColorStop(1, this.adjustColorBrightness(snakeColor, -60));

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.roundRect(x + 2, y + 2, cellSize - 4, cellSize - 4, 4);
                ctx.fill();

                // Highlight
                ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
                ctx.fillRect(x + 3, y + 3, cellSize - 6, 2);
            }

            ctx.restore();
        });
    }

    // Helper: Adjust color brightness
    adjustColorBrightness(color, amount) {
        // Parse hex color
        let usePound = false;
        if (color[0] === "#") {
            color = color.slice(1);
            usePound = true;
        }

        const num = parseInt(color, 16);
        let r = (num >> 16) + amount;
        let g = ((num >> 8) & 0x00FF) + amount;
        let b = (num & 0x0000FF) + amount;

        r = Math.max(Math.min(255, r), 0);
        g = Math.max(Math.min(255, g), 0);
        b = Math.max(Math.min(255, b), 0);

        return (usePound ? "#" : "") + (r << 16 | g << 8 | b).toString(16).padStart(6, '0');
    }

    // Helper: Adjust color opacity
    adjustColorOpacity(color, opacity) {
        // Parse hex color
        if (color[0] === "#") {
            color = color.slice(1);
        }

        const num = parseInt(color, 16);
        const r = num >> 16;
        const g = (num >> 8) & 0x00FF;
        const b = num & 0x0000FF;

        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
}

// Polyfill for roundRect if not supported
if (!CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function (x, y, width, height, radius) {
        if (width < 2 * radius) radius = width / 2;
        if (height < 2 * radius) radius = height / 2;
        this.beginPath();
        this.moveTo(x + radius, y);
        this.arcTo(x + width, y, x + width, y + height, radius);
        this.arcTo(x + width, y + height, x, y + height, radius);
        this.arcTo(x, y + height, x, y, radius);
        this.arcTo(x, y, x + width, y, radius);
        this.closePath();
        return this;
    };
}

