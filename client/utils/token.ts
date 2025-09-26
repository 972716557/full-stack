import * as SecureStore from "expo-secure-store";

// 保存Token
export const saveToken = async (token) => {
  try {
    await SecureStore.setItemAsync("userToken", token);
    console.log("Token 保存成功");
  } catch (error) {
    console.error("Token 保存失败:", error);
  }
};

// 读取Token
export const getToken = async () => {
  try {
    const token = await SecureStore.getItemAsync("userToken");
    if (token) {
      console.log("Token 读取成功");
      return token;
    } else {
      console.log("没有存储的Token");
      return null;
    }
  } catch (error) {
    console.error("Token 读取失败:", error);
    return null;
  }
};

// 删除Token
export const deleteToken = async () => {
  try {
    await SecureStore.deleteItemAsync("userToken");
    console.log("Token 删除成功");
  } catch (error) {
    console.error("Token 删除失败:", error);
  }
};
