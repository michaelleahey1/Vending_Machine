# Deploy Using Vercel CLI (Simpler Method)

## Step 1: Install Vercel CLI
Open PowerShell and run:
```powershell
npm install -g vercel
```

## Step 2: Navigate to Frontend
```powershell
cd frontend
```

## Step 3: Login to Vercel
```powershell
vercel login
```
(Follow the prompts to login)

## Step 4: Link to Your Project
```powershell
vercel link
```
- When asked "Set up and deploy?", type: `Y`
- When asked "Which scope?", select your account
- When asked "Link to existing project?", type: `Y`
- When asked "What's the name of your existing project?", type: `vending_machine1843`
- When asked about root directory, just press Enter (since we're already in frontend folder)
- When asked about override settings, type: `N`

## Step 5: Deploy
```powershell
vercel --prod
```

This will deploy to production and give you the URL immediately.

