# Complete Guide: Deploying Your Vending Machine App to GitHub Pages

This guide will walk you through creating a live link for your application on GitHub.

## Step 1: Enable GitHub Pages

1. **Go to your repository on GitHub:**
   - Open: https://github.com/michaelleahey1/Vending_Machine

2. **Navigate to Settings:**
   - Click on the **"Settings"** tab at the top of your repository (next to Code, Issues, Pull requests, etc.)

3. **Go to Pages section:**
   - In the left sidebar, scroll down and click on **"Pages"**

4. **Configure the Source:**
   - Under "Build and deployment"
   - **Source:** Select **"GitHub Actions"** from the dropdown
   - **Branch:** Leave as default (main)
   - Click **"Save"**

5. **Wait for the workflow to run:**
   - Go to the **"Actions"** tab in your repository
   - You should see a workflow called "Deploy Frontend to GitHub Pages" running
   - Wait for it to complete (usually 2-5 minutes)

6. **Get your live URL:**
   - Once the workflow completes successfully, go back to **Settings → Pages**
   - You'll see your live URL at the top:
     ```
     https://michaelleahey1.github.io/Vending_Machine/
     ```

## Step 2: Verify Deployment

1. **Check Actions tab:**
   - Go to: https://github.com/michaelleahey1/Vending_Machine/actions
   - You should see a green checkmark ✅ next to "Deploy Frontend to GitHub Pages"
   - Click on it to see the deployment details

2. **Visit your live site:**
   - Open: https://michaelleahey1.github.io/Vending_Machine/
   - You should see your application!

## Step 3: Configure API URL (Important!)

**Current Situation:**
- Your frontend is deployed ✅
- But it's trying to connect to `http://localhost:8080/api` (which only works locally)

**Options:**

### Option A: Use Local Backend (For Testing Only)
- Keep running your backend locally on your computer
- The live frontend won't be able to connect to it (because localhost is only on your machine)

### Option B: Deploy Backend to Cloud (Recommended)

You need to deploy your backend to a cloud service. Here are the easiest options:

#### Option B1: Render.com (Easiest - Free)

1. **Sign up:** https://render.com
   - Click "Get Started for Free"
   - Sign up with your GitHub account

2. **Create New Web Service:**
   - Click **"New +"** button
   - Select **"Web Service"**
   - Connect your GitHub account if not already connected
   - Select your repository: `michaelleahey1/Vending_Machine`

3. **Configure the service:**
   - **Name:** vending-machine-backend (or any name you like)
   - **Root Directory:** `vending-machine-backend/vending-machine-backend`
   - **Environment:** Java
   - **Build Command:** `./mvnw clean package -DskipTests`
   - **Start Command:** `java -jar target/vending-machine-backend-0.0.1-SNAPSHOT.jar`

4. **Add PostgreSQL Database:**
   - Click **"New +"** → **"PostgreSQL"**
   - Name it: `vending-machine-db`
   - Create it
   - Copy the **Internal Database URL**

5. **Set Environment Variables:**
   - In your Web Service settings, go to **"Environment"** tab
   - Add these variables:
     ```
     SPRING_DATASOURCE_URL = [paste the PostgreSQL URL from step 4]
     SPRING_DATASOURCE_USERNAME = [from the URL]
     SPRING_DATASOURCE_PASSWORD = [from the URL]
     PORT = 10000
     ```

6. **Get your backend URL:**
   - Render will give you a URL like: `https://vending-machine-backend-xxxx.onrender.com`
   - Copy this URL

7. **Update Frontend API URL:**
   - Go back to GitHub: https://github.com/michaelleahey1/Vending_Machine
   - Go to **Settings → Secrets and variables → Actions**
   - Click **"New repository secret"**
   - Name: `REACT_APP_API_URL`
   - Value: `https://your-backend-url.onrender.com/api` (replace with your actual URL)
   - Click **"Add secret"**

8. **Redeploy frontend:**
   - Go to **Actions** tab
   - Click on **"Deploy Frontend to GitHub Pages"**
   - Click **"Run workflow"** → **"Run workflow"** button
   - Wait for it to complete

#### Option B2: Railway.app (Also Free)

1. **Sign up:** https://railway.app
   - Click "Start a New Project"
   - Sign up with GitHub

2. **Deploy from GitHub:**
   - Click **"New Project"**
   - Select **"Deploy from GitHub repo"**
   - Select `michaelleahey1/Vending_Machine`

3. **Configure service:**
   - Railway will detect it's a Java project
   - Set **Root Directory:** `vending-machine-backend/vending-machine-backend`
   - Railway will auto-detect and build

4. **Add Database:**
   - Click **"+ New"** → **"Database"** → **"Add PostgreSQL"**
   - Railway will automatically inject connection variables

5. **Get your URL:**
   - Railway will give you a URL like: `https://your-app.up.railway.app`
   - Copy this URL

6. **Update Frontend API URL:**
   - Follow steps 7-8 from Option B1 above

## Step 4: Update Database Connection (If Using PostgreSQL)

If you're using Render or Railway with PostgreSQL, you'll need to update your backend:

1. **Update `application.properties`:**
   - Change from MySQL to PostgreSQL
   - Update connection URL format

2. **Or use MySQL:**
   - Render and Railway also offer MySQL options
   - Configure similarly to PostgreSQL

## Step 5: Test Your Live Application

1. **Visit your frontend:**
   - https://michaelleahey1.github.io/Vending_Machine/

2. **Try logging in:**
   - Use the test credentials
   - If it works, everything is connected! 🎉

## Troubleshooting

### Frontend shows but API calls fail:
- Check that your backend is deployed and running
- Verify the `REACT_APP_API_URL` secret is set correctly
- Make sure the backend URL includes `/api` at the end

### Deployment workflow fails:
- Check the Actions tab for error messages
- Common issues: Node.js version, build errors, missing dependencies

### Backend deployment fails:
- Check that you've set all environment variables
- Verify database is created and accessible
- Check logs in Render/Railway dashboard

## Summary

**Your Live Links:**
- **Frontend:** https://michaelleahey1.github.io/Vending_Machine/
- **Backend:** [Your Render/Railway URL] (after deploying)

**Quick Checklist:**
- [ ] Enabled GitHub Pages (Source: GitHub Actions)
- [ ] Frontend workflow completed successfully
- [ ] Backend deployed to Render/Railway
- [ ] `REACT_APP_API_URL` secret set in GitHub
- [ ] Frontend redeployed with new API URL
- [ ] Tested login on live site

## Need Help?

If you encounter any issues:
1. Check the Actions tab for error messages
2. Verify all environment variables are set
3. Make sure database is accessible
4. Check browser console for frontend errors

