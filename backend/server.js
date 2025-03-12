import express from 'express';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import { connectDb } from './database/connectDB.js';
import { userRoute } from './routers/userRoute.js';
import { messageRoute } from './routers/message.route.js';
import { authRoute } from './routers/auth.route.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT|| 5000
connectDb()
app.use(cookieParser());
app.use(express.json());
// apis
app.use('/api/user', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/messages', messageRoute)
app.listen(PORT, () => {
    console.log('server running on port:', PORT)
})