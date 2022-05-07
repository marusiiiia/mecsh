import interceptors from "./interceptors";
import axios from "axios";
import API_ENV from "../../config/api.config";

const instance = axios.create({
  baseURL: API_ENV.apiUrl,
  headers: {
    "content-type": "application/json",
  },
});
interceptors(instance);

export default instance;
