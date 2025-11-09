// ===========================
// Local Storage Manager
// ===========================

class StorageManager {
    constructor() {
        this.SCORES_KEY = 'snakeGame_highScores';
        this.SETTINGS_KEY = 'snakeGame_settings';
        this.MAX_SCORES = 10;
    }

    // Save high score
    saveScore(score, level, foodEaten) {
        const scores = this.getScores();
        const newScore = {
            score: score,
            level: level,
            foodEaten: foodEaten,
            date: new Date().toISOString()
        };

        scores.push(newScore);
        
        // Sort by score descending
        scores.sort((a, b) => b.score - a.score);
        
        // Keep only top MAX_SCORES
        const topScores = scores.slice(0, this.MAX_SCORES);
        
        localStorage.setItem(this.SCORES_KEY, JSON.stringify(topScores));
        
        return this.isHighScore(score);
    }

    // Get all high scores
    getScores() {
        try {
            const scores = localStorage.getItem(this.SCORES_KEY);
            return scores ? JSON.parse(scores) : [];
        } catch (error) {
            console.error('Error loading scores:', error);
            return [];
        }
    }

    // Check if score is in top 10
    isHighScore(score) {
        const scores = this.getScores();
        if (scores.length < this.MAX_SCORES) return true;
        return score > scores[scores.length - 1].score;
    }

    // Get top score
    getTopScore() {
        const scores = this.getScores();
        return scores.length > 0 ? scores[0].score : 0;
    }

    // Clear all scores
    clearScores() {
        localStorage.removeItem(this.SCORES_KEY);
    }

    // Save settings
    saveSettings(settings) {
        localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(settings));
    }

    // Get settings
    getSettings() {
        try {
            const settings = localStorage.getItem(this.SETTINGS_KEY);
            return settings ? JSON.parse(settings) : {
                difficulty: 'medium',
                theme: 'dark',
                soundEnabled: true
            };
        } catch (error) {
            console.error('Error loading settings:', error);
            return {
                difficulty: 'medium',
                theme: 'dark',
                soundEnabled: true
            };
        }
    }

    // Format date for display
    formatDate(isoString) {
        const date = new Date(isoString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        
        return date.toLocaleDateString();
    }
}

// Create global instance
const storage = new StorageManager();

