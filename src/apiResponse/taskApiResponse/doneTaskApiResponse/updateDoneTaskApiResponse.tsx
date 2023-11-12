import axios from "axios";
import { API } from "../../api.tsx";

const updateDoneTaskApiResponse = async (taskId: String, updatedFields) =>
  await axios.post(`${API}/tasks/done/${taskId}`, updatedFields);

export default updateDoneTaskApiResponse;
