import express from "express";
import dotenv from "dotenv";
import { createClient } from "redis";
import blogRoutes from "./routes/blog.js";
import { startCacheConsumer } from "./utils/consumer.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5002;


app.use("/api/v1", blogRoutes);

startCacheConsumer();

export const redisClient = createClient({
  url: process.env.REDIS_URL,
  socket: {
    connectTimeout: 10000, 
  },
});

redisClient.on("connect", () => console.log("Connected to Redis"));
redisClient.on("reconnecting", () => console.log("Reconnecting to Redis..."));
redisClient.on("error", (err) => console.error(" Redis Client Error:", err));

(async () => {
  try {
    await redisClient.connect();
    console.log("Redis is ready to use!");
  } catch (err) {
    console.error("Failed to connect to Redis:", err);
  }
})();
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
