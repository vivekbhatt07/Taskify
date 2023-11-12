import axios, { AxiosResponse } from "axios";
import { API } from "../api.tsx";
import { LogInUserParamsType } from "../../types";

const logInUserApiResponse = async ({
  email,
  password,
}: LogInUserParamsType): Promise<AxiosResponse> =>
  await axios.post(`${API}/auth/login`, { email, password });

export default logInUserApiResponse;
