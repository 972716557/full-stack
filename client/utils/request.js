import urlcat from "urlcat";

const request = async (url, { method = "GET", params, body = {} }) => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const requestUrl = urlcat(apiUrl, url, params);
  const header = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const config = {
    method,
    header,
    body: JSON.stringify(body),
  };
  const response = await fetch(requestUrl, config);
  if (!response.ok) {
    const { message, errors } = await response.json().catch(() => null);
    const error = new Error(message);
    error.status = response.status;
    error.errors = errors;
    throw error;
  }
  return await response.json();
};
export default request;
