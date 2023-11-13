import axios, { AxiosResponse } from "axios";
import { API } from "../../api.tsx";
import { UpdateTaskParamsType } from "../../../types";

const updateInProgressTaskApiResponse = async ({
  taskId,
  updatedFields,
}: UpdateTaskParamsType): Promise<AxiosResponse> =>
  await axios.post(`${API}/tasks/inProgress/${taskId}`, updatedFields);

export default updateInProgressTaskApiResponse;
