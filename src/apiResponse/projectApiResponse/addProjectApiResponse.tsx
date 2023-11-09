import axios from "axios";
import { API } from "../api.tsx";

const addProjectApiResponse = async (project) =>
  await axios.post(`${API}/projects`, project);

export default addProjectApiResponse;
