# 🐍 Classic Snake Game – Modern UI Edition  
**Product Requirements Document (PRD)**  
**Version:** 1.0  
**Platform:** Web (Hosted on GitHub Pages)  
**Tech Stack:** HTML5, CSS3 (Tailwind or SCSS), JavaScript (React or Vanilla JS with Canvas)

---

## 1. 🎯 Overview
The Classic Snake Game is reimagined with a sleek, modern interface and responsive layout that runs seamlessly on desktop and mobile browsers. The game preserves the nostalgic mechanics of the 90s Snake but introduces new animations, smooth transitions, and light/dark themes.

Hosted directly on GitHub Pages (`yourusername.github.io/snake`), the game should be lightweight, offline-friendly, and optimized for quick loading.

---

## 2. 💡 Objectives
- Deliver a **fun, nostalgic game** with a **modern, minimalist design**.  
- Fully functional **on desktop and mobile** browsers.  
- Deployed as a **static site** (no backend).  
- Use **responsive UI and smooth animations** for a polished experience.  
- Support **custom themes** and **leaderboard (localStorage)**.

---

## 3. 🕹️ Core Gameplay
| Feature | Description |
|----------|--------------|
| **Movement** | Player controls a snake moving around the grid using arrow keys or swipe gestures. |
| **Objective** | Eat food pellets to grow the snake and increase score. |
| **Collision** | Game ends when the snake hits the wall or itself. |
| **Speed Progression** | Snake moves faster as it grows or based on difficulty. |
| **Scoring System** | +10 points per food eaten; displayed on top of the screen. |
| **Restart / Pause** | Player can pause or restart from UI buttons. |

---

## 4. 🌈 UI/UX Requirements
### 4.1 Layout
- **Main Menu:**
  - Start Game  
  - Select Difficulty (Easy / Medium / Hard)  
  - Theme Selection (Light / Dark / Neon)  
  - View High Scores  

- **Game Screen:**
  - Central game grid (Canvas or Flexbox container).  
  - Top bar: Score, Level, Pause button.  
  - Smooth gradient background with subtle motion or parallax effect.

- **Game Over Screen:**
  - “Game Over” animation (fade-in + scale-up).  
  - Show final score and “Play Again” button.  
  - Display local leaderboard (Top 5 Scores from localStorage).

### 4.2 Modern UI Style
- Rounded grid cells with soft glow.
- Smooth animations (using CSS transitions or GSAP).  
- Flat icons (Lucide or Heroicons).  
- Optional background music and sound effects toggle.  
- Adaptive layout (desktop grid 30x30, mobile 20x20).

---

## 5. ⚙️ Technical Specifications
| Component | Description |
|------------|--------------|
| **Frontend Framework** | React (Vite or CRA) or Vanilla JS with Canvas |
| **Styling** | TailwindCSS or custom SCSS |
| **Animation Library** | GSAP / Framer Motion / CSS transitions |
| **Storage** | Browser localStorage for scores and settings |
| **Deployment** | GitHub Pages with GitHub Actions for CI/CD |
| **Offline Support** | Optional PWA manifest for caching game assets |

---

## 6. 🧠 Game Logic Architecture
```
src/
 ├── index.html
 ├── assets/
 │   ├── icons/
 │   └── sounds/
 ├── js/
 │   ├── game.js        # Main loop and rendering
 │   ├── snake.js       # Snake movement and collision
 │   ├── food.js        # Food spawning
 │   └── storage.js     # LocalStorage score management
 ├── css/
 │   ├── style.css      # Base styles
 │   ├── theme.css      # Light/Dark/Neon themes
 ├── components/        # (if React) - UI components
 └── manifest.json      # PWA optional
```

---

## 7. 📱 Responsive Behavior
| Device | Adaptation |
|---------|-------------|
| Desktop | Keyboard controls, full grid view |
| Mobile | Swipe gestures for direction, compact UI |
| Tablet | Hybrid mode (on-screen buttons + swipe) |

---

## 8. 🧩 Optional Enhancements
- **Dynamic Grid Size:** 20x20 (mobile), 30x30 (desktop).  
- **Skins:** Snake color customization.  
- **Leaderboard Sync:** Option to push scores to Firebase (future).  
- **Special Food:** Random “power-up” food adds 50 points or shrinks the snake.  
- **Sound Effects:** Eating, collision, and level-up sounds.

---

## 9. 🧪 Testing & QA
- ✅ Responsive test (Chrome, Firefox, Safari, Edge, Android, iOS)  
- ✅ Performance audit (Lighthouse > 90 score)  
- ✅ Keyboard and touch input validation  
- ✅ LocalStorage data persistence test  
- ✅ Offline functionality test (optional PWA)  

---

## 10. 🚀 Deployment
1. Build project:  
   ```bash
   npm run build
   ```
2. Deploy to GitHub Pages:  
   ```bash
   git push origin main
   ```
   GitHub Pages will auto-deploy via `gh-pages` branch.

3. Access via  
   ```
   https://<username>.github.io/snake
   ```

---

## 11. 📅 Roadmap
| Phase | Features | Target |
|--------|-----------|--------|
| **v1.0** | Core game, modern UI, local scores | Week 1 |
| **v1.1** | Themes, animations, sound effects | Week 2 |
| **v1.2** | PWA offline mode, skins, advanced leaderboard | Week 3 |

---

## 12. 🎨 Visual Inspiration
- **Color Palette:** Neon greens, deep blues, and cyber gradients.  
- **Font:** “Orbitron” or “Poppins”.  
- **Style:** Futuristic retro (like *Tron Legacy* meets *Classic Snake*).  
