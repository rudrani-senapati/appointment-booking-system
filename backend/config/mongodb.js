import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on('connected', () => console.log("Database Connected"))
    mongoose.connection.on('error', (err) => console.log("Database Error:", err.message))

    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`)
    } catch (error) {
        console.error("MongoDB connection failed:", error.message)
        console.error("Please check your MONGODB_URI in backend/.env or your network connection.")
    }
}

export default connectDB