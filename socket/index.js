

import { Server } from "socket.io";
import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());
app.use(cors());

// Create HTTP server and Socket.IO instance
const server = http.createServer(app);
// Initialize Socket.IO server with CORS configuration
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

// Handle Socket.IO connections
io.on("connection", (socket) => {
    console.log("A user connected");
});

app.get("/", (req, res) => {
    res.send("Socket server is running");
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});