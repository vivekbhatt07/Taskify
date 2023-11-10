import axios from "axios";
import { API } from "../api.tsx";

const getProjectListDataResponse = async (projectId: string) =>
  await axios.get(`${API}/projects/${projectId}/listData`);

export default getProjectListDataResponse;
