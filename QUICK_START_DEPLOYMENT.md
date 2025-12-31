# Quick Start: Get Your Live GitHub Link in 5 Steps

## 🚀 Step-by-Step Instructions

### Step 1: Enable GitHub Pages (2 minutes)

1. Go to: **https://github.com/michaelleahey1/Vending_Machine/settings/pages**
2. Under "Build and deployment" → "Source"
3. Select **"GitHub Actions"** from dropdown
4. Click **"Save"**

### Step 2: Check Deployment (2-5 minutes)

1. Go to: **https://github.com/michaelleahey1/Vending_Machine/actions**
2. Wait for "Deploy Frontend to GitHub Pages" to complete (green checkmark ✅)
3. Your site is now live!

### Step 3: Get Your Live URL

1. Go back to: **https://github.com/michaelleahey1/Vending_Machine/settings/pages**
2. Your live URL is displayed at the top:
   ```
   ✅ Your site is live at https://michaelleahey1.github.io/Vending_Machine/
   ```

### Step 4: Test Your Site

- Visit: **https://michaelleahey1.github.io/Vending_Machine/**
- You should see your application!

### Step 5: Connect Backend (Optional - for full functionality)

The frontend is live, but it needs a backend to work fully.

**Quick Option - Deploy Backend to Render (Free):**

1. Go to: https://render.com
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect your repo: `michaelleahey1/Vending_Machine`
5. Configure:
   - **Root Directory:** `vending-machine-backend/vending-machine-backend`
   - **Build Command:** `./mvnw clean package -DskipTests`
   - **Start Command:** `java -jar target/vending-machine-backend-0.0.1-SNAPSHOT.jar`
6. Add PostgreSQL database (free)
7. Copy your backend URL
8. In GitHub: Settings → Secrets → Actions → Add `REACT_APP_API_URL` = your backend URL
9. Redeploy frontend: Actions → Run workflow

## ✅ That's It!

**Your Live Frontend:** https://michaelleahey1.github.io/Vending_Machine/

For detailed instructions, see `GITHUB_DEPLOYMENT_STEPS.md`

