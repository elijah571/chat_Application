import jwt from "jsonwebtoken"
export const generateTokenAndsetCookies = async (userId, res) => {
    const token = await jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
    res.cookie("token", token, {
        sameSite: "strict",
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'production',
        maxAge: 30 * 24 * 60 * 60 * 1000
    })
    return token
}