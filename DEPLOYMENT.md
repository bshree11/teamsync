# Deployment Guide
 
 Steps to deploy TeamSync to production.

 
 ## Stack

 - **Frontend - Vercel**
 - **Backend - Render**
 - **Database - MongoDB Atlas**

 ## Backend Deployment (Render)

 ### 1. Prepare code

 Update `backend/package.json` scripts:

```json 
"scripts":{
   "start": "node dist/server.js",
   "build": "tsc",
   "dev": "nodemon src/server.ts"
}
```

### 2. Deploy to Render

1. Go to `https://render.com`
2. Sign up with github
3. Click "New" -> "Web Service"
4. Connect your repo
5. Set configuration:
   - Name : teamsync-api
   - Root Directory: backend
   - Build Command: npm install && npm run build
   - Start Command: npm start

### 3. Add Environment Variables

PORT=5000
NODE_ENV=production
MONGODB_URL=your_mongodb_url
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
HUGGINGFACE_API_KEY=your_key

### 4. Deploy

Click "Create Web Service" and wait for build.

Your URL: `http://teamsync-api.onrender.com`


---
### Frontend Deployment (Vercel)

### 1. Prepare code

Create `frontend/.env.production`:

VITE_API_URL = `https://teamsync-api.onrender.com/api`

Update `frontend/src/services/socket.ts`

```typscript

const SOCKET_URL = import.meta.env.PROD
? 'https://teamsync-api.onrender.com'
: 'https://localhost:5000';

```

### 2. Deploy to Vercel

1. Go to `https://vercel.com`
2. Sign up with Github
3. Click "New Project"
4. Import your repo
5. Set configuration:
    - Root Directory: frontend
    - Framework: Vite
    - Build Command: npm run build
    - Output Directory: dist

 ### 3. Add Environment Variables

 VITE_API_URL = https://teamsync-api.onrender.com/api

 ### 4. Deploy

 Click 'Deploy' and wait for build
 
 Your URL: `https://teamsync-app.vercel.app`


 ## Post- Deployment

 ### Update Backend CORS

 Add your Vercel URL to allowed origins in `backend/src/server.ts`.

 ### Update MongoDB Access

 Go to MongoDB Atals -> Network Access -> Add `0.0.0/0` to allow Render.

 ### Update README

 Add live URLs to README.md after deployment.


 ## Troubleshooting

 **Backend not starting?**
 Check Render logs. Verify all env variables are set.

 **Frontend can't reach backend?**
 Check VITE_API_URL is correct. Check CORS allows frontend URL.

 **MongoDB connection failed?**
 Add `0.0.0/0` to MongoDb Atlas Network Access.

 **Site slow on first load?**
 Render free tier sleeps after 15 mins. First request wakes it up. Set up UptimeRobot to keep it awake.


## Keep Server Awake (UptimeRobot)

Render free tier sleeps after 15 minutes of inactivity. UptimeRobot pings your server to prevent this.

### Setup Steps

1. Add health endpoint to backend (already added)
2. Go to `https://uptimerobot.com`
3. Create free account
4. Click "Add New Monitor"
5. Configure:
     - Monitor Type : HTTP(s)
     - Friendly Name: TeamSync API
     - URL: https://teamsync-api.onrender.com/api/health
     - Monitoring Interval : 5 minutes
6. Click "Create Monitor"

Your Server will now stay awake 24/7 and you get alerts if it goes down.

