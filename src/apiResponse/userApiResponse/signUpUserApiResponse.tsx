import axios, { AxiosResponse } from "axios";
import { API } from "../api.tsx";
import { User } from "../../types";

const signUpUserApiResponse = async (user: User): Promise<AxiosResponse> =>
  await axios.post(`${API}/auth/signup`, user);

export default signUpUserApiResponse;
