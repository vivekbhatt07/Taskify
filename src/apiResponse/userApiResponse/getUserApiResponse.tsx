import axios, { AxiosResponse } from "axios";
import { API } from "../api.tsx";
import { GetUserParamsType } from "../../types";

const getUserApiResponse = async (
  userId: GetUserParamsType
): Promise<AxiosResponse> => await axios.get(`${API}/auth/${userId}`);

export default getUserApiResponse;
