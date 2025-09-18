import express from "express";
import cors from "cors";

import { connectDB } from "./config/database";
import usersRouter from "./routes/users";

import apiRoutes from "./routes/index";
import authRoutes from "./routes/authentication";

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors()); // 允许跨域请求
app.use(express.json()); // 解析JSON请求体

// 路由
app.use("/api", apiRoutes);
app.use("/users", usersRouter);
app.use("/auth/register", authRoutes);

// 启动服务器
async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`服务器运行在 http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("启动服务器失败:", error);
    process.exit(1);
  }
}

startServer();

// 优雅关闭
// process.on("SIGINT", async () => {
//   const { closeDB } = require("./config/database");
//   await closeDB();
//   console.log("数据库连接已关闭");
//   process.exit(0);
// });
module.exports = app;
