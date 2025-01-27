import { Server } from "socket.io";

let io; // Declare `io` to be used globally in this file

// Initialize WebSocket Server
export const initializeWebSocket = (server) => {
    io = new Server(server, {
        cors: {
            // origin: process.env.CORS_ORIGIN || "http://localhost:5173",
            origin: "https://health-sphere-eight.vercel.app",
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);

        // Handle joining rooms
        socket.on("joinRoom", (room) => {
            socket.join(room);
            console.log(`User ${socket.id} joined room: ${room}`);
        });

        // Handle sending notifications
        socket.on("sendNotification", (data) => {
            const { room, notification } = data;
            io.to(room).emit("receiveNotification", notification);
            console.log(`Notification sent to room ${room}:`, notification);
        });

        // Handle user disconnection
        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });

    return io;
};

// Export `io` instance to use elsewhere if needed
export const getIO = () => {
    if (!io) {
        throw new Error("WebSocket server is not initialized!");
    }
    return io;
};
