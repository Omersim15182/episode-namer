import cors from "cors";
import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
const PORT = process.env.PORT_SERVER;

connectDB();

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/episodeNamer", userRoutes);

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT} with HTTP`);
});
