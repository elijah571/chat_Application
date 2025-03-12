import mongoose, { connect } from "mongoose";
export const  connectDb = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDb connect", connection.connection.host)
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}