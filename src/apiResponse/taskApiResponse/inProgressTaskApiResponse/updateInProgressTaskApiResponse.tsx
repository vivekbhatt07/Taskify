import axios from "axios";
import { API } from "../../api.tsx";

const updateInProgressTaskApiResponse = async (taskId: String, updatedFields) =>
  await axios.post(`${API}/tasks/inProgress/${taskId}`, updatedFields);

export default updateInProgressTaskApiResponse;
