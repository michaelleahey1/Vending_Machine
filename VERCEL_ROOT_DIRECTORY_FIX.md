# Fix: Root Directory Not Visible in Vercel

If you don't see "Root Directory" in Vercel settings, here are alternative solutions:

## Option 1: Use vercel.json Configuration (Easiest)

The `vercel.json` file in the `frontend` folder should handle this automatically. Let's verify it's set up correctly.

**Already done!** The `frontend/vercel.json` file is configured. Vercel should detect it.

## Option 2: Check Build & Development Settings

1. In Vercel Dashboard → Your Project → **Settings**
2. Look for **"Build & Development Settings"** section
3. Check if there's a **"Root Directory"** option there
4. Or look for settings like:
   - Framework Preset
   - Build Command
   - Output Directory
   - Install Command

## Option 3: Create Project from Frontend Folder

If Root Directory isn't showing, you might need to:

1. **Delete current project** (or create a new one)
2. **Create new project in Vercel**
3. When importing GitHub repo, specify:
   - Repository: `michaelleahey1/Vending_Machine`
   - **Root Directory:** Select from dropdown or enter `frontend`

## Option 4: Use Vercel CLI (Alternative)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Navigate to frontend:**
   ```bash
   cd frontend
   ```

3. **Deploy:**
   ```bash
   vercel
   ```
   - This will automatically detect the frontend folder
   - Follow prompts to link to your existing project

## Option 5: Check Project Settings Structure

In Vercel Settings, look for these sections:
- **General** - Project name, etc.
- **Git** - Repository connection
- **Build & Development Settings** - Build commands, framework
- **Environment Variables** - Your env vars
- **Domains** - Custom domains

If Root Directory exists, it's usually in **"General"** or **"Build & Development Settings"**.

## Recommended: Just Deploy!

Since `vercel.json` is configured, try deploying:
1. Go to **"Deployments"** tab
2. Click **"Redeploy"** or push a commit to GitHub
3. Vercel should detect the frontend folder automatically

## Still Can't Find It?

**Alternative approach:**
1. Make sure your project is connected to GitHub
2. Push any change to trigger deployment
3. Vercel should auto-detect based on `vercel.json`

Let me know what sections you see in Settings, and I can guide you further!

