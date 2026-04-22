/**
 * TEAMSYNC SERVER
 */

import express, { Express, Request, Response } from 'express';
import { createServer } from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database';
import { initSocket } from './config/socket';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import teamRoutes from './routes/teams';
import projectRoutes from './routes/projects';
import taskRoutes from './routes/tasks';
import activityRoutes from './routes/activity';
import notificationRoutes from './routes/notifications';
import aiRoutes from './routes/aiRoutes';
import { timeStamp } from 'console';

dotenv.config();

const app: Express = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 5000;

// Start WebSocket
initSocket(httpServer);

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://teamsync-sigma.vercel.app'
  ],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/activity', activityRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/ai', aiRoutes);

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    message: 'TeamSync API is running!',
  });
});

// Root route
app.get('/', (req: Request, res: Response) => {
  res.json({
    name: 'TeamSync API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      teams: '/api/teams',
      projects: '/api/projects',
      tasks: '/api/tasks',
      activity: '/api/activity',
      notifications: '/api/notifications',
      ai: '/api/ai',
    },
  });
});

// Health check endpoint (for uptime monitoring)
app.get('/api/health', (req,res) =>{
  res.json({status: 'ok', timeStamp: new Date().toISOString() });
})

// Start server
const startServer = async () => {
  try {
    await connectDB();
    httpServer.listen(PORT, () => {
      console.log('TeamSync Backend Started!');
      console.log(`Server: http://localhost:${PORT}`);
      console.log('WebSocket: Ready');
    });
  } catch (error) {
    console.error('Failed to start:', error);
    process.exit(1);
  }
};

startServer();