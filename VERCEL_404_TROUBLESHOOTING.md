# Fixing 404 Error on Vercel

## Common Causes:
1. **Root Directory not set** - Vercel is looking in wrong folder
2. **Build failed** - Check build logs
3. **No deployment exists** - Need to create one
4. **Wrong URL** - Using incorrect domain

## Step-by-Step Fix:

### 1. Verify Root Directory is Set
- Go to: Settings → Build and Deployment
- Make sure "Root Directory" is set to: `frontend`
- Click Save if changed

### 2. Check Deployment Status
- Go to: Deployments tab
- Is there a deployment?
  - If NO: Click "Deploy" or wait for auto-deploy from Git
  - If YES: Click on it to see status
    - "Building" = Wait for it to finish
    - "Error" = Check build logs
    - "Ready" = Should work, try the URL

### 3. Check Build Logs
- Click on the deployment
- Click "View Build Logs"
- Look for errors (especially around "Root Directory" or build commands)

### 4. Verify Environment Variables
- Settings → Environment Variables
- Make sure `REACT_APP_API_URL` is set

### 5. Manual Deployment Test
- Go to Deployments tab
- Click "Create Deployment" or "Redeploy"
- Select branch: `main`
- Make sure Root Directory shows: `frontend`
- Click Deploy

### 6. Check the URL
- Make sure you're using the correct deployment URL
- Should be in format: `https://vending-machine1843.vercel.app`
- Or from the deployment page itself

