import express from "express";
import router from "./routes/memeRoutes.js";
import authRouter from "./routes/authRoutes.js";
dotenv from "dotenv";

.config();

app = express();
port = 3000;
port = process.env.PORT;
