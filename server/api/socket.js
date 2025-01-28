import { Server } from 'socket.io';
import { createServer } from 'http';

export const config = {
  runtime: 'edge',
  regions: ['iad1'], // Choose your preferred Vercel region
};

const httpServer = createServer();
let io;

export const initializeWebSocket = () => {
    if (io) {
        console.log('WebSocket server already initialized');
        return io;
    }

    console.log('Starting WebSocket server initialization...');
    
    io = new Server(httpServer, {
        cors: {
            origin: ["http://localhost:5173", "https://health-sphere-eight.vercel.app"],
            credentials: true,
            methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        },
        path: "/api/socket/",
        pingTimeout: 60000,
        pingInterval: 25000,
        transports: ['websocket', 'polling'],
        addTrailingSlash: false,
        connectionStateRecovery: {
            // Enable if you want to recover missed events on reconnection
            maxDisconnectionDuration: 2 * 60 * 1000,
            skipMiddlewares: true,
        }
    });

    // Custom middleware for logging and debugging
    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        if (token) {
            // Add any authentication logic here
            socket.data.authenticated = true;
        }
        next();
    });

    io.on("connection", (socket) => {
        console.log(`New socket connection - ID: ${socket.id}`);
        
        // Join room with error handling
        socket.on("joinRoom", async (room) => {
            try {
                await socket.join(room);
                const roomMembers = io.sockets.adapter.rooms.get(room)?.size || 0;
                
                socket.emit("roomJoined", { 
                    success: true, 
                    room,
                    socketId: socket.id,
                    membersCount: roomMembers
                });
                
                // Notify room members
                socket.to(room).emit("memberJoined", {
                    socketId: socket.id,
                    membersCount: roomMembers
                });
            } catch (error) {
                console.error(`Error joining room: ${error.message}`);
                socket.emit("roomJoined", { 
                    success: false, 
                    error: error.message 
                });
            }
        });

        // Handle notifications with acknowledgments
        socket.on("sendNotification", async (data, callback) => {
            try {
                const { room, notification } = data;
                await io.to(room).emit("receiveNotification", {
                    ...notification,
                    timestamp: new Date().toISOString(),
                    sender: socket.id
                });
                
                if (callback) {
                    callback({ success: true });
                }
            } catch (error) {
                console.error(`Error sending notification: ${error.message}`);
                if (callback) {
                    callback({ success: false, error: error.message });
                }
            }
        });

        // Enhanced disconnect handling
        socket.on("disconnect", async (reason) => {
            console.log(`Socket ${socket.id} disconnected. Reason: ${reason}`);
            
            // Notify rooms this socket was in
            const rooms = Array.from(socket.rooms);
            for (const room of rooms) {
                const membersCount = (io.sockets.adapter.rooms.get(room)?.size || 1) - 1;
                socket.to(room).emit("memberLeft", {
                    socketId: socket.id,
                    membersCount,
                    reason
                });
            }
        });

        // Handle errors
        socket.on("error", (error) => {
            console.error(`Socket ${socket.id} error:`, error);
            socket.emit("socketError", {
                message: "An error occurred",
                code: error.code
            });
        });
    });

    // Health check endpoint
    httpServer.on('request', (req, res) => {
        if (req.url === '/health') {
            res.writeHead(200);
            res.end('healthy');
        }
    });

    return io;
};

export const getIO = () => {
    if (!io) {
        throw new Error("WebSocket server is not initialized!");
    }
    return io;
};