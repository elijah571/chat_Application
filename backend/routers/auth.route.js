import express from 'express'
import { createUser,  LoginUser, logout } from '../controllers/auth.controller.js'

export const authRoute = express.Router()
//create account
authRoute.post('/signup', createUser);
//Login User
authRoute.post('/login', LoginUser)
authRoute.post('/logout', logout)
