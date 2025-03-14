import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import { connectDb } from './database/connectDB.js';
import { userRoute } from './routers/userRoute.js';
import { messageRoute } from './routers/message.route.js';
import { authRoute } from './routers/auth.route.js';
import { app, server } from './socket/socket.js';
import express from 'express'
import path from 'path';
dotenv.config();
const PORT = process.env.PORT|| 5000
const __dirname = path.resolve()

connectDb()
app.use(cookieParser());
// apis
app.use('/api/user', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/messages', messageRoute)

app.use(express.static(path.join(__dirname, "/frontend/dist")))
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
})
server.listen(PORT, () => {
    console.log('server running on port:', PORT)
})