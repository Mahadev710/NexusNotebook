import express from 'express';
import dotenv from 'dotenv';
import connectDb from './utils/db.js';
dotenv.config();
const app = express();
await connectDb();
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
