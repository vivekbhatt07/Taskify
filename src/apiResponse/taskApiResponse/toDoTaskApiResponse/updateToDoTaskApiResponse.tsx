import axios from "axios";
import { API } from "../../api.tsx";

const updateToDoTaskApiResponse = async (taskId: String, updatedFields) =>
  await axios.post(`${API}/tasks/toDo/${taskId}`, updatedFields);

export default updateToDoTaskApiResponse;
