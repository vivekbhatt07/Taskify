import axios from "axios";
import { API } from "../../api.tsx";

const addDoneTaskApiResponse = async ({ task, projectId }) =>
  await axios.post(`${API}/tasks/done`, { task, projectId });

export default addDoneTaskApiResponse;
