# 🚀 Quick Start Guide

## Running the Game Locally

### Method 1: Direct File Access (Simplest)
Just double-click `index.html` to open it in your default browser!

### Method 2: Local Server (Recommended)

**Using Python:**
```bash
# Python 3.x
python -m http.server 8000

# Then open: http://localhost:8000
```

**Using Node.js:**
```bash
npx serve

# Or install globally
npm install -g serve
serve
```

**Using PHP:**
```bash
php -S localhost:8000
```

**Using VS Code:**
- Install "Live Server" extension
- Right-click on `index.html`
- Select "Open with Live Server"

## Deploying to GitHub Pages

### Option 1: Automatic Deployment (GitHub Actions)

1. **Push your code to GitHub:**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click Settings → Pages
   - Under "Build and deployment":
     - Source: GitHub Actions
   - The workflow will automatically deploy on push to main

3. **Access your game:**
   - Your game will be live at: `https://kyroskoh.github.io/snake-game`
   - It may take 1-2 minutes for the first deployment

### Option 2: Manual Deployment

1. **Push your code:**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Enable GitHub Pages (Manual):**
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: main, folder: / (root)
   - Save

3. **Wait for deployment:**
   - GitHub will build and deploy automatically
   - Check the "Actions" tab for deployment status

## Testing Locally

1. Open the game in your browser
2. Test all features:
   - ✅ Main menu appears
   - ✅ Theme switching works (Dark/Light/Neon)
   - ✅ Difficulty selection works
   - ✅ Sound toggle works
   - ✅ Game starts and snake moves
   - ✅ Food appears and scoring works
   - ✅ Collision detection works
   - ✅ Game over screen appears
   - ✅ High scores are saved
   - ✅ Mobile controls work (on mobile device or Chrome DevTools)

## Controls Reference

### Desktop
- **Arrow Keys** or **WASD**: Move snake
- **Space**: Pause/Resume
- **Escape**: Return to menu

### Mobile
- **Swipe**: Move in any direction
- **On-screen D-pad**: Alternative control method
- **Tap pause button**: Pause game

## Troubleshooting

### Game doesn't load
- Check browser console for errors (F12)
- Ensure all files are in correct directories
- Try using a local server instead of file:// protocol

### Themes don't work
- Clear browser cache
- Check if CSS files loaded correctly (Network tab in DevTools)

### Scores don't save
- Check localStorage is enabled in browser
- Some browsers block localStorage in file:// protocol (use local server)
- Check browser console for storage errors

### Mobile controls not working
- Ensure viewport meta tag is present
- Test on actual device, not just DevTools
- Check touch event listeners are registered

## Performance Tips

1. **For best performance:**
   - Use modern browsers (Chrome, Firefox, Edge, Safari)
   - Close unnecessary browser tabs
   - Hardware acceleration enabled

2. **If game is slow:**
   - Lower difficulty (reduces update frequency)
   - Close other applications
   - Try different theme (Neon theme uses more effects)

## Browser Compatibility

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Fully Supported |
| Firefox | 88+ | ✅ Fully Supported |
| Safari | 14+ | ✅ Fully Supported |
| Edge | 90+ | ✅ Fully Supported |
| Mobile Chrome | Latest | ✅ Fully Supported |
| iOS Safari | 14+ | ✅ Fully Supported |

## Next Steps

1. ✅ Game is running locally
2. 🚀 Deploy to GitHub Pages
3. 🎮 Play and test all features
4. 📱 Test on mobile devices
5. 🎨 Customize themes (optional)
6. 🔧 Add your own features
7. 📢 Share with friends!

## Need Help?

- Check the main [README.md](README.md) for full documentation
- Review the [PRD](Snake_Game_Modern_UI_PRD.md) for feature details
- Open an issue on GitHub if you find bugs

---

Enjoy playing! 🐍🎮

