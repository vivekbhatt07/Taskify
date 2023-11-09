import axios from "axios";
import { API } from "../api.tsx";

const logInUserApiResponse = async (user) =>
  await axios.post(`${API}/auth/login`, user);

export default logInUserApiResponse;
