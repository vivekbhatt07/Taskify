import axios, { AxiosResponse } from "axios";
import { API } from "../../api.tsx";
import { AddTaskParamsType } from "../../../types";

const addDoneTaskApiResponse = async ({
  task,
  projectId,
}: AddTaskParamsType): Promise<AxiosResponse> =>
  await axios.post(`${API}/tasks/done`, { task, projectId });

export default addDoneTaskApiResponse;
