import axios, { AxiosResponse } from "axios";
import { API } from "../api.tsx";

const getAllUsersApiResponse = async (): Promise<AxiosResponse> =>
  await axios.get(`${API}/auth`);

export default getAllUsersApiResponse;
