import axios, { AxiosResponse } from "axios";
import { API } from "../../api.tsx";
import { DeleteTaskParamsType } from "../../../types";

const deleteToDoTaskApiResponse = async (
  taskId: DeleteTaskParamsType
): Promise<AxiosResponse> => await axios.delete(`${API}/tasks/toDo/${taskId}`);

export default deleteToDoTaskApiResponse;
