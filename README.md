# 🐍 Snake Game - Modern Edition

A classic Snake game reimagined with a sleek, modern interface and responsive design. Built with vanilla JavaScript, HTML5 Canvas, and CSS3.

![Version](https://img.shields.io/badge/version-1.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- 🎮 **Classic Gameplay** - Nostalgic Snake mechanics with modern polish
- 🎨 **Three Beautiful Themes** - Dark, Light, and Neon modes
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile
- 🎯 **Multiple Difficulty Levels** - Easy, Medium, and Hard
- 🏆 **Local Leaderboard** - Track your top 10 high scores
- 🎵 **Sound Effects** - Toggleable audio feedback
- ⌨️ **Multiple Control Options** - Keyboard, touch swipe, and on-screen D-pad
- 💾 **Auto-Save** - Settings and scores persist in localStorage
- 🌐 **Offline Ready** - PWA support for offline gameplay
- ⚡ **Smooth Animations** - 60 FPS with optimized rendering

## 🚀 Quick Start

### Play Online

Visit the live demo: **[Your GitHub Pages URL]**

### Run Locally

1. Clone the repository:
```bash
git clone https://github.com/kyroskoh/snake-game.git
cd snake-game
```

2. Open `index.html` in your browser, or serve with a local server:
```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve

# PHP
php -S localhost:8000
```

3. Navigate to `http://localhost:8000`

## 🎮 How to Play

### Controls

**Desktop:**
- Arrow Keys or WASD to move
- SPACE to pause/resume
- ESC to return to menu

**Mobile:**
- Swipe in any direction to move
- Use on-screen D-pad buttons
- Tap pause button to pause

### Objective

- Eat food to grow your snake and increase your score
- Avoid hitting walls or yourself
- Normal food: +10 points
- Special food (star): +50 points
- Speed increases every 5 food eaten

### Difficulty Levels

- **Easy** - Slower speed, more forgiving
- **Medium** - Balanced gameplay (default)
- **Hard** - Fast-paced challenge

## 🎨 Themes

### Dark Theme (Default)
Modern dark UI with green neon accents

### Light Theme
Clean, minimalist design with soft colors

### Neon Theme
Futuristic cyberpunk style with glowing effects

## 📁 Project Structure

```
snake-game/
├── index.html              # Main HTML file
├── manifest.json           # PWA manifest
├── README.md              # This file
├── css/
│   ├── style.css          # Base styles
│   └── theme.css          # Theme definitions
└── js/
    ├── game.js            # Main game loop and logic
    ├── snake.js           # Snake class
    ├── food.js            # Food spawning logic
    └── storage.js         # LocalStorage management
```

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid/Flexbox
- **JavaScript (ES6+)** - Vanilla JS, no frameworks
- **Canvas API** - Game rendering
- **LocalStorage API** - Data persistence
- **Web Audio API** - Sound effects

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📦 Deployment

### GitHub Pages

1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Select source branch (main)
4. Your game will be live at `https://kyroskoh.github.io/snake-game`

### Other Platforms

The game is a static site and can be deployed to:
- Netlify
- Vercel
- Cloudflare Pages
- Any static hosting service

## 🎯 Roadmap

- [x] Core game mechanics
- [x] Modern UI with themes
- [x] Responsive design
- [x] Local leaderboard
- [x] PWA support
- [ ] Online leaderboard (Firebase)
- [ ] Multiple snake skins
- [ ] Power-ups (slow-motion, invincibility)
- [ ] Multiplayer mode
- [ ] Custom music tracks

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by the classic Nokia Snake game
- Font: [Orbitron](https://fonts.google.com/specimen/Orbitron) and [Poppins](https://fonts.google.com/specimen/Poppins)
- Built with ❤️ using modern web technologies

## 📧 Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)

Project Link: [https://github.com/yourusername/snake-game](https://github.com/yourusername/snake-game)

---

Made with 🐍 and lots of ☕

