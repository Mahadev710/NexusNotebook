import TryCatch from "../utils/TryCatch.js";
import {sql} from "../utils/db.js"
export const getAllBlogs =TryCatch(async(req,res)=>{
    let blogs;
    blogs = await sql`SELECT * FROM blogs ORDER BY create_at DESC`;
    
    res.json(blogs);

})