import { connect } from "mongoose";

export const connectDB = async () => {
  try {
    await connect(process.env.MONGO_URI);
    console.log('DB connected successfully');
  } catch (error) {
    process.exit(1);
    console.log(error);
  }
};