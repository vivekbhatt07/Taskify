import axios from "axios";
import { API } from "../../api.tsx";

const deleteDoneTaskApiResponse = async (taskId: string) =>
  await axios.delete(`${API}/tasks/done/${taskId}`);

export default deleteDoneTaskApiResponse;
