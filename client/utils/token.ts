import Keychain from "react-native-keychain";

// 保存 Token
const saveToken = async (token) => {
  try {
    await Keychain.setGenericPassword("userToken", token);
    console.log("Token saved successfully");
  } catch (error) {
    console.error("Error saving token:", error);
  }
};

// 获取 Token
const getToken = async () => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      return credentials.password;
    }
  } catch (error) {
    console.error("Error getting token:", error);
  }
  return null;
};

// 删除 Token
const deleteToken = async () => {
  try {
    await Keychain.resetGenericPassword();
    console.log("Token deleted successfully");
  } catch (error) {
    console.error("Error deleting token:", error);
  }
};

export { saveToken, getToken, deleteToken };
