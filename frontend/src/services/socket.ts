/**
 * SOCKET SERVICE
 * 
 * What: Connects frontend to Socket.io server
 * Why: Real-time notifications
 */

import { io, Socket } from 'socket.io-client';
import toast from 'react-hot-toast';

let socket: Socket | null = null;

// Connect to socket server
export const connectSocket = (userId: string) => {
  if (socket?.connected) {
    return socket;
  }

  const SOCKET_URL = import.meta.env.PROD 
    ? 'https://teamsync-api-omo6.onrender.com' 
    : 'http://localhost:5000';
  
  socket = io(SOCKET_URL, {
    transports: ['websocket', 'polling'],
  });

  socket.on('connect', () => {
    socket?.emit('join', userId);
  });

  socket.on('team_invite', (data: { message: string; teamId: string; teamName: string }) => {
    toast.success(`🎉 ${data.message} - ${data.teamName}`, {
      duration: 5000,
    });
  });

  return socket;
};

// Disconnect socket
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

// Get socket instance
export const getSocket = () => socket;