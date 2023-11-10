import axios from "axios";
import { API } from "../../api.tsx";

const addInProgressTaskApiResponse = async ({ task, projectId }) =>
  await axios.post(`${API}/tasks/inProgress`, { task, projectId });

export default addInProgressTaskApiResponse;
