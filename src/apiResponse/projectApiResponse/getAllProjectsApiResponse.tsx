import axios from "axios";
import { API } from "../api.tsx";

const getAllProjectsApiResponse = async () =>
  await axios.get(`${API}/projects`);

export default getAllProjectsApiResponse;
