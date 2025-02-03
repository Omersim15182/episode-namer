import cors from "cors";
import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import socketServer from "./socket.js";
import http from "http";
dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT_SERVER;

connectDB();

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));

app.use("/episodeNamer", userRoutes);
socketServer(server);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
