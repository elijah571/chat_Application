import { User } from "../models/userModel.js";
//get all users
export const getAllusers = async (req, res) => {
    try {
        const loggedUserId = req.user._id
    const users = await User.find({_id: {$ne: loggedUserId}}).select("-password")
    if (!users) {
        return res.status(404).json({message: "Users Not Found"})
    }
    res.status(200).json(users)
} catch (error) {
        console.log(error);
        return res.status(500).json({message: error.message})
}
}