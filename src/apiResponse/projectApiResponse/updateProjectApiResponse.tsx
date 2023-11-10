import axios from "axios";
import { API } from "../api.tsx";
import { Project } from "../../types";

const updateProjectApiResponse = async (projectId: String, project: Project) =>
  await axios.post(`${API}/projects/${projectId}`, project);

export default updateProjectApiResponse;
