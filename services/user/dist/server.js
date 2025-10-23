import express from 'express';
import dotenv from 'dotenv';
import connectDb from './utils/db.js';
import userRoutes from './routes/user.js';
dotenv.config();
const app = express();
app.use(express.json());
app.use("/api/v1", userRoutes);
await connectDb();
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
