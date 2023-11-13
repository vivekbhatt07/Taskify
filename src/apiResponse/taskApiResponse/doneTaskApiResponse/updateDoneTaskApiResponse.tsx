import axios, { AxiosResponse } from "axios";
import { API } from "../../api.tsx";
import { UpdateTaskParamsType } from "../../../types";

const updateDoneTaskApiResponse = async ({
  taskId,
  updatedFields,
}: UpdateTaskParamsType): Promise<AxiosResponse> =>
  await axios.post(`${API}/tasks/done/${taskId}`, updatedFields);

export default updateDoneTaskApiResponse;
