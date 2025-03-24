import express from 'express'
import { getAllusers } from '../controllers/user.controller.js'
import { protectRoute } from '../middlewares/ptotectedRoute.js'
export const userRoute = express.Router()
//get Users
userRoute.get('/', protectRoute, getAllusers)
