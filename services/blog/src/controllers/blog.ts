import TryCatch from "../utils/TryCatch.js";
import { sql } from "../utils/db.js";
import axios from "axios"
export const getAllBlogs = TryCatch(async (req, res) => {
  const { searchQuery, category } = req.query;
  let blogs;

  if (searchQuery && category) {
    blogs = await sql`
      SELECT * FROM blogs
      WHERE 
        (title ILIKE ${"%" + searchQuery + "%"} 
        OR description ILIKE ${"%" + searchQuery + "%"})
        AND category = ${category}
      ORDER BY create_at DESC
    `;
  } else if (searchQuery) {
    blogs = await sql`
      SELECT * FROM blogs
      WHERE 
        (title ILIKE ${"%" + searchQuery + "%"} 
        OR description ILIKE ${"%" + searchQuery + "%"})
      ORDER BY create_at DESC
    `;
  } else {
    blogs = await sql`
      SELECT * FROM blogs
      ORDER BY create_at DESC
    `;
  }

  res.json(blogs);
});

export const getSingleBlog=TryCatch(async(req ,res)=>{
    const blog = await sql`SELECT * FROM  blogs WHERE id =${req.params.id}`;
    // console.log(blog);console.log(JSON.stringify(blog, null, 2));
    // console.log(blog[1]);
    const {data}=await axios.get(`${process.env.USER_SERVICE}/api/v1/user/${blog[0].author}`)
    // console.log(data);
    
    res.json({blog:blog[0],author:data});
    
})
