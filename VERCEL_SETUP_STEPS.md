# Vercel Project Setup Steps

## Your Vercel Project
**Project URL:** https://vercel.com/mike-leaheys-projects/vending_machine1843

## Step 1: Connect to GitHub Repository

1. **Go to your project:** https://vercel.com/mike-leaheys-projects/vending_machine1843
2. **Click on "Settings" tab**
3. **Click on "Git" in the left sidebar**
4. **Click "Connect Git Repository"** or **"Change Git Repository"**
5. **Select:** `michaelleahey1/Vending_Machine`
6. **Branch:** `main`
7. **Save**

## Step 2: Configure Project Settings

1. **Still in Settings, click "General"**
2. **Root Directory:**
   - Click "Edit"
   - Select "Other"
   - Enter: `frontend`
   - Click "Save"

3. **Build & Development Settings:**
   - **Framework Preset:** React (should auto-detect)
   - **Build Command:** `npm run build` (should auto-fill)
   - **Output Directory:** `build` (should auto-fill)
   - **Install Command:** `npm install` (should auto-fill)

## Step 3: Add Environment Variables

1. **In Settings, click "Environment Variables"**
2. **Add new variable:**
   - **Key:** `REACT_APP_API_URL`
   - **Value:** 
     - For testing: `http://localhost:8080/api`
     - Or your deployed backend URL if you have one
   - **Environment:** Select all (Production, Preview, Development)
   - Click "Save"

## Step 4: Deploy

1. **Go to "Deployments" tab**
2. **Click "Redeploy" or trigger a new deployment:**
   - Option 1: Push any change to GitHub (auto-deploy)
   - Option 2: Click the three dots on latest deployment → "Redeploy"

## Step 5: Get Your Live Link

After deployment:
1. **Go to "Deployments" tab**
2. **Click on the latest deployment** (should be "Ready" status)
3. **Copy the URL** - this is your live link!

Your live link will be something like:
```
https://vending-machine1843.vercel.app
```

Or check the "Domains" section in Settings for all available URLs.

## Quick Checklist

- [ ] Connected to GitHub repo: `michaelleahey1/Vending_Machine`
- [ ] Root Directory set to: `frontend`
- [ ] Environment Variable added: `REACT_APP_API_URL`
- [ ] Deployment successful
- [ ] Live URL obtained

## Troubleshooting

### Deployment fails:
- Check Root Directory is set to `frontend`
- Verify Build Command: `npm run build`
- Check Output Directory: `build`

### Environment variables not working:
- Must start with `REACT_APP_` prefix
- Redeploy after adding variables
- Check all environments are selected (Production, Preview, Development)

### Can't connect to GitHub:
- Make sure repository is public or Vercel has access
- Re-authorize Vercel in GitHub settings if needed

