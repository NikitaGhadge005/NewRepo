import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB= async()=>{
    try {
      const ConnectionInstance= await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
      console.log(`\n MongoDB connected !! DB Host: ${ConnectionInstance.connection.host}`);
     // console.log(ConnectionInstance);
      
      
    } catch (error) {
        console.log("MongoDB Connection Error:",error);
        process.exit(1) 
    }
}
export default connectDB