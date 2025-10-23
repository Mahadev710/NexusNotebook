import express from "express"
import dotenv from "dotenv";
import { sql } from "./utils/db.js";
dotenv.config();
const app =express();

const port = process.env.PORT;

async function initDB(){
    try{
      
    }
    catch(error){

    }
}

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})