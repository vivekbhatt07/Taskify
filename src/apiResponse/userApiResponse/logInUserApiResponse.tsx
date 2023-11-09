import axios from "axios";
import { API } from "../api.tsx";

const logInUserApiResponse = async (email: string, password: string) =>
  await axios.post(`${API}/auth/login`, { email, password });

export default logInUserApiResponse;
