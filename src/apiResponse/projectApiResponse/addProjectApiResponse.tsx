import axios from "axios";
import { API } from "../api.tsx";
import { Project } from "../../types";

const addProjectApiResponse = async (project: Project) =>
  await axios.post(`${API}/projects`, project);

export default addProjectApiResponse;
