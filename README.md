PROJECT NAME AND DESCRIPTION:
TeamSync
└─ "Real-time team collaboration with AI task breakdown"


# TaskForge - AI Team Collaboration Platform

AI-powered task management with real-time collaboration and intelligent task breakdown.

## 🎯 Features

- 🔐 **Secure Authentication** - JWT-based login/register
- 👥 **Team Management** - Create teams, invite members, manage roles
- 📋 **Task Management** - Create, update, delete tasks with priorities
- 🤖 **AI Task Breakdown** - Describe task → AI breaks into subtasks automatically
- ⚡ **Real-time Updates** - WebSocket integration for instant sync across users
- 📊 **Activity Log** - See what your team did and when
- 🔔 **Notifications** - Get notified of important actions
- 🎨 **Dark/Light Mode** - Theme switching

## 🛠️ Tech Stack

### Frontend
- React 18 + TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Axios for API calls
- Socket.io for real-time updates

### Backend
- Node.js + Express
- MongoDB with Mongoose
- JWT for authentication
- Socket.io for WebSockets
- Hugging Face API for AI

## 📦 Installation

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account (free)
- Git

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Update .env with your credentials
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
# Update VITE_API_URL=http://localhost:5000/api
npm run dev
```

## 🚀 Running Locally

Terminal 1 (Backend):
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
# App runs on http://localhost:3000
```

## 📚 API Documentation

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete endpoint documentation.

## 🚢 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for step-by-step deployment guide.

## 📊 Database Models

- **User** - Email, password, name, role
- **Team** - Name, owner, members
- **Project** - Name, team reference, members
- **Task** - Title, status, priority, assigned user
- **Activity** - User action logs
- **Notification** - User notifications

## 🧪 Testing
```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test
```

## 📝 Challenges & Solutions

See [CHALLENGES_AND_SOLUTIONS.md](./CHALLENGES_AND_SOLUTIONS.md) for technical challenges and how I solved them.

## 🎓 What I Learned

- Full-stack development (React + Node.js)
- Real-time applications with WebSockets
- RESTful API design
- Database modeling with MongoDB
- JWT authentication
- Integration with AI APIs
- Testing and debugging

## 📍 Live Demo

- **Frontend**: https://your-app.vercel.app
- **Backend**: https://your-backend.onrender.com
- **API Docs**: https://your-backend.onrender.com/api

## 👨‍💻 Author

Your Name - [GitHub Profile](https://github.com/your-username)

## 📄 License

MIT License - feel free to use!