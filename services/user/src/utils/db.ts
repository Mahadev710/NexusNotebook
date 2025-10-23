import mongoose from "mongoose";

const connectDb = async ()=>{
    try{
        await   mongoose.connect(process.env.MONGO_URI as string,{
            dbName:"Blogger",
        }) ;
        console.log("Database connected successfully");
    }
    catch(err){
        console.log(err);
    }
};
export default connectDb;