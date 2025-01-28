// socket.ts
import { io, Socket } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
let socket: Socket | null = null;

export const initializeSocket = (userId: string): Socket => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      withCredentials: true,
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      auth: { userId }
    });

    socket.on("connect", () => {
      socket?.emit("joinRoom", userId);
    });

    socket.on("disconnect", (reason) => {
      if (reason === "io server disconnect") {
        socket?.connect();
      }
    });
  } else if (!socket.connected) {
    socket.connect();
  }

  return socket;
};

export const getSocket = (): Socket => {
  if (!socket) {
    throw new Error("Socket not initialized");
  }
  return socket;
};

export const disconnectSocket = () => {
  socket?.disconnect();
  socket = null;
};