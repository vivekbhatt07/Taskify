import axios from "axios";
import { API } from "../../api.tsx";

const deleteInProgressTaskApiResponse = async (taskId: string) =>
  await axios.delete(`${API}/tasks/inProgress/${taskId}`);

export default deleteInProgressTaskApiResponse;
