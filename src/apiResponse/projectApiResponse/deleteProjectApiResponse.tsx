import axios from "axios";
import { API } from "../api.tsx";

const deleteProjectApiResponse = async (projectId: string) =>
  await axios.delete(`${API}/projects/${projectId}`);

export default deleteProjectApiResponse;
