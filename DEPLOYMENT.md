# Deployment Guide

## GitHub Pages (Frontend)

The frontend is configured to deploy to GitHub Pages automatically via GitHub Actions.

### Setup Instructions:

1. **Enable GitHub Pages:**
   - Go to your repository: https://github.com/michaelleahey1/Vending_Machine
   - Click on **Settings** → **Pages**
   - Under "Source", select **GitHub Actions**
   - Save

2. **Set API URL (if deploying backend separately):**
   - Go to **Settings** → **Secrets and variables** → **Actions**
   - Click **New repository secret**
   - Name: `REACT_APP_API_URL`
   - Value: Your backend API URL (e.g., `https://your-backend.onrender.com/api`)
   - Click **Add secret**

3. **Deploy:**
   - The frontend will automatically deploy when you push to the `main` branch
   - Or manually trigger: **Actions** tab → **Deploy Frontend to GitHub Pages** → **Run workflow**

4. **Your live frontend URL will be:**
   ```
   https://michaelleahey1.github.io/Vending_Machine/
   ```

## Backend Deployment

The backend needs to be deployed separately (GitHub Pages only hosts static sites).

### Recommended: Render.com (Free)

1. **Sign up:** https://render.com
2. **Create New Web Service:**
   - Connect your GitHub repository
   - Select: `vending-machine-backend/vending-machine-backend`
   - Build Command: `./mvnw clean package -DskipTests`
   - Start Command: `java -jar target/vending-machine-backend-0.0.1-SNAPSHOT.jar`
   - Environment: Java

3. **Add Environment Variables:**
   - `SPRING_DATASOURCE_URL`: Your database URL
   - `SPRING_DATASOURCE_USERNAME`: Database username
   - `SPRING_DATASOURCE_PASSWORD`: Database password

4. **Add PostgreSQL Database (Free):**
   - Render provides free PostgreSQL databases
   - Update `application.properties` to use PostgreSQL instead of MySQL
   - Or use a free MySQL service like PlanetScale or AWS RDS

### Alternative: Railway.app (Free)

1. **Sign up:** https://railway.app
2. **New Project** → **Deploy from GitHub**
3. Select your repository
4. Railway will auto-detect Spring Boot
5. Add PostgreSQL database service
6. Railway automatically injects database connection variables

## After Deployment

Once both are deployed:

1. **Update Frontend API URL:**
   - Set the `REACT_APP_API_URL` secret in GitHub to point to your deployed backend

2. **Test the deployment:**
   - Frontend: https://michaelleahey1.github.io/Vending_Machine/
   - Backend: Your Render/Railway URL

## Local Development

For local development, the frontend connects to `http://localhost:8080/api` by default.

