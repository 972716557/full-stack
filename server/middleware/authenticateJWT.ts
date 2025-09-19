import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

// 设置中间件，拦截所有登陆操作
const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.headers;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "无效的token" });
      }
      (req as any).user = user;
      // 继续执行后续操作
      next();
    });
  } else {
    res.status(401).json({ message: "缺少token" });
  }
};

export default authenticateJWT;
