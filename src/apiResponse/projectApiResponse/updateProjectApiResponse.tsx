import axios from "axios";
import { API } from "../api.tsx";

const updateProjectApiResponse = async (projectId: String, project) =>
  await axios.post(`${API}/projects/${projectId}`, project);

export default updateProjectApiResponse;
