import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import { protectRoute } from "../middlewares/ptotectedRoute.js";

export const  messageRoute = express.Router()
//send messages
messageRoute.post('/send/:id', protectRoute, sendMessage)
messageRoute.get('/:id', protectRoute, getMessages)