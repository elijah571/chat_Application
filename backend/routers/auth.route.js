import express from 'express'
import { createUser,  loginUser, logout } from '../controllers/auth.controller.js'

export const authRoute = express.Router()
//create account
authRoute.post('/signup', createUser);
//Login User
authRoute.post('/login', loginUser)
authRoute.post('/logout', logout)
