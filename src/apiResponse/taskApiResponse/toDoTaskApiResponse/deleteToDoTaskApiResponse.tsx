import axios from "axios";
import { API } from "../../api.tsx";

const deleteToDoTaskApiResponse = async (taskId: string) =>
  await axios.delete(`${API}/tasks/toDo/${taskId}`);

export default deleteToDoTaskApiResponse;
