import axios, { AxiosResponse } from "axios";
import { API } from "../../api.tsx";
import { UpdateTaskParamsType } from "../../../types";

const updateToDoTaskApiResponse = async ({
  taskId,
  updatedFields,
}: UpdateTaskParamsType): Promise<AxiosResponse> =>
  await axios.post(`${API}/tasks/toDo/${taskId}`, updatedFields);

export default updateToDoTaskApiResponse;
