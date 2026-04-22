import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';

let io: Server;

// Store user socket mappings
const userSockets: Map<string, string> = new Map();

export const initSocket = (httpServer: HttpServer): Server => {
  io = new Server(httpServer, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket: Socket) => {

    // User joins with their userId
    socket.on('join', (userId: string) => {
      userSockets.set(userId, socket.id);
      socket.join(`user_${userId}`);
    });

    // User joins a team room
    socket.on('join_team', (teamId: string) => {
      socket.join(`team_${teamId}`);
    });

    socket.on('disconnect', () => {
      // Remove from userSockets
      for (const [userId, socketId] of userSockets.entries()) {
        if (socketId === socket.id) {
          userSockets.delete(userId);
          break;
        }
      }
    });
  });

  return io;
};

export const getIO = (): Server => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
};

// Send notification to specific user
export const notifyUser = (userId: string, event: string, data: any) => {
  if (io) {
    io.to(`user_${userId}`).emit(event, data);
  }
};

// Send notification to team members
export const notifyTeam = (teamId: string, event: string, data: any) => {
  if (io) {
    io.to(`team_${teamId}`).emit(event, data);
  }
};