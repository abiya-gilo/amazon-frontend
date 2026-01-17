import axios from "axios";

const axiosInstance = axios.create({
  // local instance of firebase function
  // baseURL:
  // import.meta.env.VITE_BACKEND_URL ||
  // "http://127.0.0.1:5001/clone-6181a/us-central1/api",
  // deployed version of firebase function
  // baseURL: "https://us-central1-clone-6181a.cloudfunctions.net/api",
  // deployed version of amazon server on render.com
  // baseURL: "https://evangadi-forum-deploy-0io8.onrender.com/",
  baseURL: "https://amazon-api-deploy-2nd.onrender.com/",
});

export { axiosInstance };
