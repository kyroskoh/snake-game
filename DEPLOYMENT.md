# 🚀 Deployment Guide

## GitHub Pages Setup (Step-by-Step)

### Prerequisites
- GitHub account
- Repository with the snake game code

### Step 1: Enable GitHub Pages

1. **Go to your repository on GitHub**
   - Navigate to `https://github.com/kyroskoh/snake-game`

2. **Access Settings**
   - Click on the "Settings" tab (top right of repository)
   
3. **Navigate to Pages**
   - In the left sidebar, scroll down and click "Pages"

4. **Configure Source**
   - Under "Build and deployment"
   - **Source**: Select "GitHub Actions" from the dropdown
   - ⚠️ **IMPORTANT**: Select "GitHub Actions", NOT "Deploy from a branch"
   
5. **Save**
   - The setting saves automatically
   - You should see a message confirming GitHub Pages is now using GitHub Actions

### Step 2: Push Your Code

If you haven't already pushed your code:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Modern Snake Game"

# Add remote (replace with your repository URL)
git remote add origin https://github.com/kyroskoh/snake-game.git

# Push to main branch
git push -u origin main
```

### Step 3: Monitor Deployment

1. **Go to the "Actions" tab** in your repository
2. You should see a workflow run called "Deploy to GitHub Pages"
3. Click on it to see the progress
4. Wait for it to complete (usually 1-2 minutes)

### Step 4: Access Your Game

Once deployment is complete:
- Your game will be live at: **`https://kyroskoh.github.io/snake-game`**
- Click the link in the Actions run or Pages settings to visit it

---

## Troubleshooting

### Error: "Pages not enabled"

**Solution:**
1. Go to Settings → Pages
2. Make sure "Source" is set to "GitHub Actions"
3. Re-run the workflow from the Actions tab

### Error: "Permission denied"

**Solution:**
1. Go to Settings → Actions → General
2. Scroll to "Workflow permissions"
3. Select "Read and write permissions"
4. Check "Allow GitHub Actions to create and approve pull requests"
5. Save and re-run workflow

### Error: "404 Not Found" when accessing game

**Solution:**
1. Wait 1-2 minutes after deployment completes
2. Clear your browser cache
3. Check the Pages URL is correct: `https://kyroskoh.github.io/snake-game`
4. Ensure the workflow completed successfully in Actions tab

### Workflow not triggering

**Solution:**
1. Ensure `.github/workflows/deploy.yml` exists in your repository
2. Push a commit to the `main` branch
3. Or manually trigger from Actions tab → "Deploy to GitHub Pages" → "Run workflow"

---

## Alternative: Simple Branch Deployment

If GitHub Actions seems complex, you can use the simpler branch method:

### Option B: Deploy from Branch

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Deploy snake game"
   git push origin main
   ```

2. **Configure Pages**
   - Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: `main`
   - Folder: `/ (root)`
   - Save

3. **Access your game**
   - Wait 1-2 minutes
   - Visit: `https://kyroskoh.github.io/snake-game`

**Note**: This method is simpler but doesn't use GitHub Actions. It directly serves the files from the main branch.

---

## Other Deployment Options

### Netlify (Drag & Drop)

1. Go to [netlify.com](https://netlify.com)
2. Sign up or log in
3. Drag your project folder onto Netlify
4. Get instant URL like `yoursite.netlify.app`

### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Cloudflare Pages

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Connect your GitHub repository
3. Deploy with default settings

---

## Custom Domain (Optional)

If you want to use your own domain:

1. **Configure DNS**
   - Add CNAME record pointing to `kyroskoh.github.io`

2. **Update GitHub Pages**
   - Settings → Pages
   - Enter your custom domain
   - Save

3. **Wait for DNS propagation** (up to 24 hours)

---

## Verification Checklist

After deployment, verify:
- ✅ Game loads without errors
- ✅ All themes work (Dark, Light, Neon)
- ✅ Controls are responsive (keyboard/touch)
- ✅ Sounds play (if enabled)
- ✅ Scores save to localStorage
- ✅ Game over screen appears correctly
- ✅ High scores persist after refresh
- ✅ Mobile version works on actual device

---

## Need Help?

If you're still having issues:

1. Check the [QUICKSTART.md](QUICKSTART.md) for local testing
2. Review GitHub's [Pages documentation](https://docs.github.com/en/pages)
3. Open an issue in the repository
4. Check browser console for errors (F12)

---

**Your game should now be live! 🎮🐍**

Share it: `https://kyroskoh.github.io/snake-game`

