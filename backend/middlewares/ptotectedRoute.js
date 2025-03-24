import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
User
export const protectRoute = async (req, res, next) => {
    let token;
    try {
        token = req.cookies.token
        if (!token) {
            return res.status(401).json({message: "Unauthourize, no token provided"})
        }
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {
            return res.status(401).json({message: "Unauthourize Invalid token"})
        }
        const user  = await User.findById(decoded.userId).select("password")
        if (!user) {
            return res.status(404).json({message: "User not found"})

        }
        req.user = user;
        next()
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: error.message})
    }
}