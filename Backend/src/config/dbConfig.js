// Importing External Modules
import mongoose from 'mongoose';

// Connecting with MongoDB Server
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Failed to Connect MongoDB: ${error.message}`);
    process.exit(1);
  }
};

// Exporting Functions
export default connectDB;
