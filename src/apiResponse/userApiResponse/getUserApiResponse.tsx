import axios from "axios";
import { API } from "../api.tsx";

const getUserApiResponse = async (userId: string) =>
  await axios.get(`${API}/auth/${userId}`);

export default getUserApiResponse;
