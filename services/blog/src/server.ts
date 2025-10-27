import express from 'express';
import dotenv from 'dotenv';
import blogRoutes from './routes/blog.js'
const app= express();
dotenv.config();

const port = process.env.PORT;
app.use("/api/v1",blogRoutes);
// console.log(blogRoutes);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})