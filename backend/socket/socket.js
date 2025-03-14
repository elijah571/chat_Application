import { Server } from "socket.io";
import http from 'http';
import express from 'express';

const app = express();
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"], 
        methods: ['POST', 'GET', 'DELETE', 'PUT'],
    }
});

const userSocketMap = {};

// Function to get the socket id of a user
export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    // Get the userId from the query params
    const userId = socket.handshake.query.userId;
    console.log("Received userId:", userId);

    if (userId && userId !== "undefined") {
        // Store the userId on the socket object itself
        socket.userId = userId;

        // Add the user to the userSocketMap
        userSocketMap[userId] = socket.id;
    }

    // Emit the current list of online users
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);

        // Remove user from the map
        delete userSocketMap[socket.userId];

        // Emit the updated list of online users
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { app, io, server };
