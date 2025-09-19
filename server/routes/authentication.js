import express from "express";
import { authentication, random } from "../helpers";
import { createUser, getUserByEmail } from "../models/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    return res.status(400).json({
      message: "Invalid request",
    });
  }
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({
      message: "User already exists",
    });
  }
  const salt = random();
  await createUser({
    email,
    username,
    password,
    authentication: authentication(salt, password),
  });
  return res.status(200).json({
    message: "注册成功",
  });
});

router.post("/login", async (req, res) => {
  const { password, email } = req.body;
  if (!password || !email) {
    return res.status(400).json({
      message: "Invalid request",
    });
  }
  const user = await getUserByEmail(email);
  if (!user) {
    return res.status(401).json({
      message: "用户不存在",
    });
  }
  if (user.password === password) {
    // 生成token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "8h",
    });
    res.status(200).json({
      message: "登录成功",
      token,
    });
  } else {
    return res.status(401).json({
      message: "密码错误",
    });
  }
});
export default router;
