import axios, { AxiosResponse } from "axios";
import { API } from "../../api.tsx";
import { DeleteTaskParamsType } from "../../../types";

const deleteDoneTaskApiResponse = async (
  taskId: DeleteTaskParamsType
): Promise<AxiosResponse> => await axios.delete(`${API}/tasks/done/${taskId}`);

export default deleteDoneTaskApiResponse;
