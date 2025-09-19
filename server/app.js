import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import usersRouter from "./routes/users";

import authRoutes from "./routes/authentication";
import authenticateJWT from "./middleware/authenticateJWT";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const uri =
  "mongodb+srv://yuchen:19980626yu@cluster0.espkzas.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.Promise = Promise;
mongoose.connect(uri);
mongoose.connection.on(
  "error",
  console.error.bind(console, "connection error:")
);

// 中间件
app.use(cors()); // 允许跨域请求
app.use(express.json()); // 解析JSON请求体

// 统一前缀，之后接口都调用这个，添加中间件拦截没有token的请求
app.use("/users", authenticateJWT, usersRouter);
app.use("/auth", authRoutes);

module.exports = app;
