import axios, { AxiosResponse } from "axios";
import { API } from "../../api.tsx";
import { AddTaskParamsType } from "../../../types";

const addInProgressTaskApiResponse = async ({
  task,
  projectId,
}: AddTaskParamsType): Promise<AxiosResponse> =>
  await axios.post(`${API}/tasks/inProgress`, { task, projectId });

export default addInProgressTaskApiResponse;
