# TeamSync

A real-time team collaboration app for managing teams, projects, and tasks with AI-powered productivity insights.

## Live Demo

- **Frontend:** [https://teamsync-app.vercel.app](https://teamsync-app.vercel.app)
- **Backend:** [https://teamsync-api.onrender.com](https://teamsync-api.onrender.com)

(Update these links after deployment)

## Features

**Team Management**
- Create and manage teams
- Add members by email
- Role-based access (Owner, Admin, Member)
- Real-time notifications when added to team

**Project Management**
- Create projects under teams
- Track project status (Planning, Active, Completed)
- View all projects in one place

**Task Management (Kanban Board)**
- Visual Kanban board with drag-and-drop
- Three columns: To Do, In Progress, Done
- Priority levels: High, Medium, Low
- Filter and organize tasks

**AI-Powered Insights**
- Smart task summary on dashboard
- Completion rate tracking
- Priority-based suggestions
- Powered by Hugging Face with local fallback

**Real-time Updates**
- Socket.io integration
- Instant notifications
- Live updates across all users

## Tech Stack

**Backend**
- Node.js
- Express.js
- TypeScript
- MongoDB with Mongoose
- JWT Authentication
- Socket.io
- Hugging Face AI

**Frontend**
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Zustand (State Management)
- React Router
- Axios

**Testing**
- Jest (Backend)
- Vitest + React Testing Library (Frontend)
- 24 tests total

**Deployment**
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## Installation

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Hugging Face API key (optional)

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5000
NODE_ENV=development
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
HUGGINGFACE_API_KEY=your_huggingface_key
```

Start server:
```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

Start app:
```bash
npm run dev
```

## API Endpoints

**Auth**
- POST /api/auth/register - Create account
- POST /api/auth/login - Login user
- GET /api/auth/me - Get current user

**Teams**
- GET /api/teams - Get all teams
- POST /api/teams - Create team
- GET /api/teams/:id - Get single team
- PUT /api/teams/:id - Update team
- DELETE /api/teams/:id - Delete team
- POST /api/teams/:id/members - Add member

**Projects**
- GET /api/projects - Get all projects
- POST /api/projects - Create project
- GET /api/projects/:id - Get single project
- PUT /api/projects/:id - Update project
- DELETE /api/projects/:id - Delete project

**Tasks**
- GET /api/tasks - Get all tasks
- POST /api/tasks - Create task
- GET /api/tasks/:id - Get single task
- PUT /api/tasks/:id - Update task
- DELETE /api/tasks/:id - Delete task

**AI**
- POST /api/ai/summary - Generate task summary

Full API documentation: [API_DOCS.md](./api-docs.md)

## Testing

**Run backend tests:**
```bash
cd backend
npm test
```

**Run frontend tests:**
```bash
cd frontend
npm test
```

## Project Structure

TEAMSYNC/
├── backend/
│   ├── src/
│   │   ├── config/        # Database & Socket setup
│   │   ├── controllers/   # Route handlers
│   │   ├── middleware/    # Auth middleware
│   │   ├── models/        # MongoDB schemas
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   └── server.ts      # Entry point
│   ├── tests/             # Jest tests
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API calls
│   │   ├── store/         # Zustand store
│   │   ├── types/         # TypeScript types
│   │   └── App.tsx        # Main app
│   ├── tests/             # Vitest tests
│   └── package.json
│
├── api-docs.md            # API documentation
├── challenges.md          # Problems & solutions
├── tools.md               # Tech stack details
├── user-guide.md          # User manual
└── README.md              # This file

## Screenshots

(Add screenshots after deployment)

## Challenges Faced

Key problems solved during development:

1. **MongoDB DNS Issue** - ISP blocking SRV lookups, fixed with Google DNS
2. **Data Inconsistency** - MongoDB _id vs id, used fallback pattern
3. **Socket.io Rooms** - Users not receiving events, implemented room joining
4. **External API Fallback** - Hugging Face unreliable, built smart local fallback
5. **CORS Errors** - Cross-origin blocking, configured CORS middleware
6. **JWT Expiry** - Silent auth failures, added Axios interceptors

Full details: [CHALLENGES.md](./challenges.md)

## Future Improvements

- Drag-and-drop for Kanban board
- Task due date reminders
- File attachments
- Team chat feature
- Mobile app (React Native)
- Refresh token rotation
- Two-factor authentication

## Author

**Bhagyashree**
- GitHub: [@bshree11](https://github.com/bshree11)
