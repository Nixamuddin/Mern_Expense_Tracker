import mongoose from "mongoose";

export const connect = async () => {
    try {
        await mongoose.connect(process.env.CONNECT);
        console.log("connect to database successfully")
     }
    catch (error) {
        console.log("error while connecting to database", error)
    }
}