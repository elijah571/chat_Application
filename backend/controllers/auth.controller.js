import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateTokenAndsetCookies } from "../utils/generateToken.js";

export const createUser = async (req, res) => {
    const {fullName, userName, password, confirmPassword,  gender} = req.body;
    try {
        if(!fullName || !userName || !password || !confirmPassword || !gender) {
            return res.status(400).json({message: "All fields are required"});
        }
        if (password !== confirmPassword) {
            return res.status(400).json({message: "password does not match, please enter correct password"})
        }

        const user = await User.findOne({userName});
        if(user) {
            return res.status(400).json({message: "This user name already exist"});
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const malePicture = `https://avatar.iran.liara.run/public/boy?userName=${userName}`
        const girlPicture = `https://avatar.iran.liara.run/public/girl?userName=${userName}`

        const newUser = new User({
            fullName,
            userName,
            password:hashPassword,
            gender,
            profle : gender === "male" ? malePicture : girlPicture
        });
     
        await newUser.save()
           await generateTokenAndsetCookies(newUser._id, res)
           return res.status(201).json({message: "User successfully created",  
            _id: newUser._id,
            userName: newUser.userName,
            profle: newUser.profle
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({message: error.message})
    }
}
//Login user
export const loginUser = async (req, res) => {
    const { userName, password } = req.body;
    try {
        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(404).json({ success: false, message: "Invalid username or password" });
        }

        // Compare password using bcrypt
        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
            return res.status(400).json({ success: false, message: "Invalid username or password" });
        }

        // Generate token and set cookies
        await generateTokenAndsetCookies(user._id, res);

        // Send only essential user data to frontend
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: {
                _id: user._id,
                userName: user.userName,
                profile: user.profle,
            },
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

 //logut user
 
 export const logout = async (req, res) => {
     res.cookie("token", "", {
         httpOnly: true,
         expires: new Date(0),  
     });
 
     return res.status(200).json({ message: "Logged out successfully" });
 };