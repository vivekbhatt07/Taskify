import axios from "axios";
import { API } from "../api.tsx";

const logInUserApiResponse = async (email: String, password: String) =>
  await axios.post(`${API}/auth/login`, { email, password });

export default logInUserApiResponse;
