import axios from "axios";
import { API } from "../api.tsx";

const signUpUserApiResponse = async (user) =>
  await axios.post(`${API}/auth/signup`, user);

export default signUpUserApiResponse;
