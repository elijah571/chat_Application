import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import { connectDb } from './database/connectDB.js';
import { userRoute } from './routers/userRoute.js';
import { messageRoute } from './routers/message.route.js';
import { authRoute } from './routers/auth.route.js';
import { app, server } from './socket/socket.js';
import express from 'express'
dotenv.config();

const PORT = process.env.PORT || 5000

connectDb()
app.use(cookieParser());

// APIs
app.use('/api/user', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/messages', messageRoute)


server.listen(PORT, () => {
    console.log('server running on port:', PORT)
})
