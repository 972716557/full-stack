import urlcat from "urlcat";

const request = async (url, { method = "GET", params, body = {} }) => {
  const token = localStorage.getItem("token");
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
    const { message, errors } = await response.json();
    const error = new Error(message);
    throw error;
  }
  return await response.json();
};
export default request;
