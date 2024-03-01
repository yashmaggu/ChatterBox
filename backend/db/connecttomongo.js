import mongoose from "mongoose";

const connecttomongo=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI,
            console.log("MongoDB connected"))
    }catch(error){
        console.log("Error connecting to MongoDb",error.message);
    }

}
export default connecttomongo;