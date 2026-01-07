# Where to Find Root Directory in Vercel

## The Root Directory Setting is in:

**"Build and Deployment"** section (NOT in General)

## Steps to Find It:

1. In Vercel Dashboard → Your Project → **Settings**
2. Click **"Build and Deployment"** in the left sidebar
3. Look for **"Root Directory"** option
4. Click **"Edit"** or **"Override"**
5. Enter: `frontend`
6. Save

## Alternative: Check Build Settings

If you still don't see it:
- Look for **"Build and Development Settings"**
- Or **"Framework Preset"** section
- Root Directory might be near the build commands

## Quick Fix:

Since `vercel.json` is already configured and pushed to GitHub:
1. Go to **"Deployments"** tab
2. Click **"Redeploy"** on the latest deployment
3. Vercel should detect the frontend folder from the repo structure

