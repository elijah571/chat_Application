import express from "express";
import { protecRoute } from "../middlewares/ptotectedRoute.js";
import { getMessages, sendMessage } from "../controllers/message.controller.js";

export const  messageRoute = express.Router()
//send messages
messageRoute.post('/send/:id', protecRoute, sendMessage)
messageRoute.get('/:id', protecRoute, getMessages)