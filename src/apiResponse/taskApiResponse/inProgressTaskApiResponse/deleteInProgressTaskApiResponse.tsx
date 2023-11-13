import axios, { AxiosResponse } from "axios";
import { API } from "../../api.tsx";
import { DeleteTaskParamsType } from "../../../types";

const deleteInProgressTaskApiResponse = async (
  taskId: DeleteTaskParamsType
): Promise<AxiosResponse> =>
  await axios.delete(`${API}/tasks/inProgress/${taskId}`);

export default deleteInProgressTaskApiResponse;
