import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173", "https://chat-app-32sc.onrender.com"], 
        methods: ["POST", "GET", "DELETE", "PUT"],
    },
});

const userSocketMap = {};

// Function to get the socket id of a user
export const getReceiverSocketId = (receiverId) => userSocketMap[receiverId];

/**
 * Socket.io Connection Handling
 */
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Get userId from query params
    const userId = socket.handshake.query.userId;
    if (userId && userId !== "undefined" && userId.trim() !== "") {
        // Store userId in a variable (since socket properties are lost on disconnect)
        socket.userId = userId;

        // Map userId to socket ID
        userSocketMap[userId] = socket.id;

        console.log(`User ${userId} is now online with socket ID: ${socket.id}`);
    }

    // Emit the updated list of online users
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);

        if (socket.userId) {
            delete userSocketMap[socket.userId]; // Remove from the map
        }

        // Emit the updated list of online users
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { app, io, server };
