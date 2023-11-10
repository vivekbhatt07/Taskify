import axios from "axios";
import { API } from "../../api.tsx";
import { Project } from "../../../types/index.tsx";

const addToDoTaskApiResponse = async ({ task, projectId }) =>
  await axios.post(`${API}/tasks/toDo`, { task, projectId });

export default addToDoTaskApiResponse;
