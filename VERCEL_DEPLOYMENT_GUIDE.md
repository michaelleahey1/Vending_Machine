# Deploy to Vercel - Complete Guide

This guide will walk you through deploying your Vending Machine frontend to Vercel and getting a live link.

## Prerequisites

- GitHub account (you already have this: https://github.com/michaelleahey1/Vending_Machine)
- Vercel account (free to sign up)

## Step 1: Sign Up for Vercel

1. Go to: **https://vercel.com**
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub account

## Step 2: Deploy Your Project

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **After signing in, you'll see the Vercel dashboard**
2. Click **"Add New..."** → **"Project"**
3. **Import your repository:**
   - You should see: `michaelleahey1/Vending_Machine`
   - Click **"Import"** next to it

4. **Configure the project:**
   - **Project Name:** `vending-machine` (or any name you like)
   - **Root Directory:** Click "Edit" and set to `frontend`
   - **Framework Preset:** React (should auto-detect)
   - **Build Command:** `npm run build` (should auto-fill)
   - **Output Directory:** `build` (should auto-fill)

5. **Environment Variables:**
   - Click **"Environment Variables"**
   - Add a new variable:
     - **Name:** `REACT_APP_API_URL`
     - **Value:** 
       - For now, use: `http://localhost:8080/api` (for testing)
       - Later, replace with your deployed backend URL (see Backend Deployment section)
   - Click **"Add"**

6. **Deploy:**
   - Click **"Deploy"** button at the bottom
   - Wait 1-2 minutes for build to complete

7. **Get Your Live Link:**
   - Once deployment completes, you'll see: **"Congratulations! Your project has been deployed"**
   - Your live URL will be displayed, like:
     ```
     https://vending-machine-xxxxx.vercel.app
     ```
   - Or you can set a custom domain if you want

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   cd frontend
   vercel
   ```

4. **Follow the prompts:**
   - Link to existing project or create new
   - Set root directory: `frontend`
   - Deploy

## Step 3: Update Environment Variables (If Needed)

After deployment, if you need to change the API URL:

1. Go to your project in Vercel dashboard
2. Click **"Settings"** → **"Environment Variables"**
3. Edit `REACT_APP_API_URL`
4. Redeploy: **"Deployments"** → Click the three dots → **"Redeploy"**

## Step 4: Deploy Backend (For Full Functionality)

Your frontend is live, but it needs a backend to work fully. Deploy the backend to Render or Railway:

### Render.com (Recommended)

1. **Sign up:** https://render.com
2. **New Web Service:**
   - Connect GitHub repo: `michaelleahey1/Vending_Machine`
   - Root Directory: `vending-machine-backend/vending-machine-backend`
   - Build Command: `./mvnw clean package -DskipTests`
   - Start Command: `java -jar target/vending-machine-backend-0.0.1-SNAPSHOT.jar`

3. **Add PostgreSQL Database** (free)
4. **Set environment variables** (database connection)
5. **Get your backend URL** (e.g., `https://vending-machine-backend.onrender.com`)

6. **Update Vercel environment variable:**
   - In Vercel: Settings → Environment Variables
   - Update `REACT_APP_API_URL` to: `https://your-backend-url.onrender.com/api`
   - Redeploy

## Step 5: Test Your Live Application

1. Visit your Vercel URL: `https://vending-machine-xxxxx.vercel.app`
2. Try logging in with test credentials
3. Test the full functionality

## Your Live Links

After deployment, you'll have:

- **Frontend:** `https://vending-machine-xxxxx.vercel.app` (from Vercel)
- **Backend:** `https://your-backend-url.onrender.com` (from Render/Railway)

## Automatic Deployments

Vercel automatically deploys when you push to GitHub:
- Every push to `main` branch = Production deployment
- Pull requests = Preview deployments

## Troubleshooting

### Build fails:
- Check that `rootDirectory` is set to `frontend`
- Verify `package.json` has a build script
- Check build logs in Vercel dashboard

### API calls fail:
- Verify `REACT_APP_API_URL` is set correctly
- Make sure backend is deployed and accessible
- Check browser console for CORS errors

### Environment variables not working:
- Must start with `REACT_APP_` prefix
- Redeploy after adding/changing variables
- Check variable names match exactly

## Quick Start Commands

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from frontend folder
cd frontend
vercel

# Deploy to production
vercel --prod
```

## Support

- Vercel Docs: https://vercel.com/docs
- Vercel Community: https://github.com/vercel/vercel/discussions

