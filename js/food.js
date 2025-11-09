// ===========================
// Food Class
// ===========================

class Food {
    constructor(gridSize) {
        this.gridSize = gridSize;
        this.position = { x: 0, y: 0 };
        this.type = 'normal'; // normal, special
        this.specialFoodChance = 0.1; // 10% chance for special food
        this.spawn();
    }

    // Spawn food at random position
    spawn(avoidPositions = []) {
        let validPosition = false;
        let attempts = 0;
        const maxAttempts = 100;

        while (!validPosition && attempts < maxAttempts) {
            this.position = {
                x: Math.floor(Math.random() * this.gridSize),
                y: Math.floor(Math.random() * this.gridSize)
            };

            // Check if position is not occupied by snake
            validPosition = !avoidPositions.some(pos => 
                pos.x === this.position.x && pos.y === this.position.y
            );

            attempts++;
        }

        // Determine if this is special food
        this.type = Math.random() < this.specialFoodChance ? 'special' : 'normal';
    }

    // Get position
    getPosition() {
        return this.position;
    }

    // Get type
    getType() {
        return this.type;
    }

    // Get value
    getValue() {
        return this.type === 'special' ? 50 : 10;
    }

    // Draw food on canvas
    draw(ctx, cellSize) {
        const x = this.position.x * cellSize;
        const y = this.position.y * cellSize;
        const centerX = x + cellSize / 2;
        const centerY = y + cellSize / 2;
        const radius = cellSize / 2 - 2;

        if (this.type === 'special') {
            // Special food - star shape with gradient
            ctx.save();
            
            // Outer glow
            const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, cellSize);
            gradient.addColorStop(0, 'rgba(0, 204, 255, 0.6)');
            gradient.addColorStop(1, 'rgba(0, 204, 255, 0)');
            ctx.fillStyle = gradient;
            ctx.fillRect(x - cellSize / 2, y - cellSize / 2, cellSize * 2, cellSize * 2);
            
            // Star shape
            ctx.fillStyle = getComputedStyle(document.documentElement)
                .getPropertyValue('--accent-secondary').trim();
            this.drawStar(ctx, centerX, centerY, 5, radius, radius / 2);
            
            ctx.restore();
        } else {
            // Normal food - circle with gradient
            ctx.save();
            
            // Outer glow
            const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, cellSize);
            gradient.addColorStop(0, 'rgba(255, 71, 87, 0.6)');
            gradient.addColorStop(1, 'rgba(255, 71, 87, 0)');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(centerX, centerY, cellSize / 2 + 4, 0, Math.PI * 2);
            ctx.fill();
            
            // Main circle
            const foodGradient = ctx.createRadialGradient(
                centerX - radius / 3, 
                centerY - radius / 3, 
                0,
                centerX, 
                centerY, 
                radius
            );
            foodGradient.addColorStop(0, '#ff6b7a');
            foodGradient.addColorStop(1, getComputedStyle(document.documentElement)
                .getPropertyValue('--food-color').trim());
            
            ctx.fillStyle = foodGradient;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.fill();
            
            // Highlight
            ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.beginPath();
            ctx.arc(centerX - radius / 3, centerY - radius / 3, radius / 3, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.restore();
        }
    }

    // Draw star shape
    drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
        let rot = Math.PI / 2 * 3;
        let x = cx;
        let y = cy;
        const step = Math.PI / spikes;

        ctx.beginPath();
        ctx.moveTo(cx, cy - outerRadius);

        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            ctx.lineTo(x, y);
            rot += step;

            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            ctx.lineTo(x, y);
            rot += step;
        }

        ctx.lineTo(cx, cy - outerRadius);
        ctx.closePath();
        ctx.fill();
    }
}

