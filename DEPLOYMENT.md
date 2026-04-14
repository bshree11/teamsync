how to deploy : 


# Deployment Guide

## Backend Deployment (Render)

### Step 1: Prepare Code
- Create Procfile
- Set environment variables
- Push to GitHub

### Step 2: Deploy on Render
1. Go to render.com
2. Click "New +"
3. Select "Web Service"
4. Connect GitHub repo
5. Set build command: npm run build
6. Set start command: npm start
7. Add environment variables:
   - DATABASE_URL
   - JWT_SECRET
   - OPENAI_API_KEY
8. Deploy!

### Step 3: Test
- GET http://your-render-url/health
- Should return { status: 'ok' }

### Important URLs
- Backend live: https://your-app-backend.onrender.com
- API base: https://your-app-backend.onrender.com/api

## Frontend Deployment (Vercel)

### Step 1: Prepare Code
- Build: npm run build
- Check: dist/ folder created
- Push to GitHub

### Step 2: Deploy on Vercel
1. Go to vercel.com
2. Click "New Project"
3. Import GitHub repo
4. Set build command: npm run build
5. Set output directory: dist
6. Add environment variables:
   - VITE_API_URL=https://your-backend-url/api
7. Deploy!

### Step 3: Test
- Open https://your-app.vercel.app
- Can you login?
- Can you create task?

## Troubleshooting

### Backend won't connect
- Check DATABASE_URL is correct
- Check MongoDB Atlas whitelist IP

### Frontend shows "API not found"
- Check VITE_API_URL environment variable
- Check backend is deployed and running

### WebSocket errors
- Check socket URL in socketService.ts
- Usually same as API URL

## Production Checklist
✅ Environment variables set
✅ Database connected
✅ No console.log() in code
✅ All tests pass
✅ Live URLs working
✅ Can login and create tasks
✅ Real-time updates working