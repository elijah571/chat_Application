import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    userName: {
        type: String, unique: true, required: true
    },
    fullName: {
        type:String, required: true
    },
    password: {
        type: String, required: true
    },
  
    gender: {
        type: String, required: true, enums:['male', 'female']
    },
    profle: {
        type: String
    }

}, {timestamps: true});

export const User = mongoose.model("User", userSchema);