import axios from "axios";
import { API } from "../api.tsx";

const getAllProjectsApiResponse = async (userId: string) =>
  await axios.get(`${API}/projects/${userId}`);

export default getAllProjectsApiResponse;
