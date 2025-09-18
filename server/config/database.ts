import { MongoClient, ServerApiVersion } from "mongodb";
require("dotenv").config(); // 加载环境变量

const uri = process.env.MONGODB_URI;
let client;
let database;

async function connectDB() {
  try {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    await client.connect();
    database = client.db(process.env.DB_NAME);
    console.log("成功连接到MongoDB数据库");
    return database;
  } catch (error) {
    console.error("连接数据库失败:", error);
    process.exit(1);
  }
}

function getDB() {
  if (!database) {
    throw new Error("数据库未初始化");
  }
  return database;
}

async function closeDB() {
  if (client) {
    await client.close();
    console.log("数据库连接已关闭");
  }
}

module.exports = { connectDB, getDB, closeDB };
