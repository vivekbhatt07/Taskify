import axios from "axios";
import { API } from "../api.tsx";
import { User } from "../../types";

const signUpUserApiResponse = async (user: User) =>
  await axios.post(`${API}/auth/signup`, user);

export default signUpUserApiResponse;
