import urlcat from "urlcat";
import { useRouter } from "expo-router";
import { getToken } from "./token";

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  params?: Record<string, string | number>;
  body?: Record<string, any>;
}

const request = async (url: string, options?: RequestOptions) => {
  const { method = "GET", params = {}, body = {} } = options;
  const token = await getToken();
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const requestUrl = urlcat(apiUrl, url, params);
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    token,
  };
  const config = {
    method,
    headers,
    body: JSON.stringify(body),
  };
  const response = await fetch(requestUrl, config);
  if (!response.ok) {
    const { message, code } = await response.json();
    if (code === 401) {
      // token 过期或者无效，跳转到登录页面
      const router = useRouter();
      router.push("/login");
      return;
    }
    const error = new Error(message);
    throw error;
  }
  return await response.json();
};
export default request;
