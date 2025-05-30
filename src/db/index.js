import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/charging_station`)
    console.log("Successfully connected to database");
  } catch (error) {
    console.log("MONGODB connection FAILED ", error);
    process.exit(1)
  }
}

export default connectDB;