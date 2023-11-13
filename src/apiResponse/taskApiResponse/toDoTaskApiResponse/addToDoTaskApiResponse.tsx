import axios, { AxiosResponse } from "axios";
import { API } from "../../api.tsx";
import { AddTaskParamsType } from "../../../types";

const addToDoTaskApiResponse = async ({
  task,
  projectId,
}: AddTaskParamsType): Promise<AxiosResponse> =>
  await axios.post(`${API}/tasks/toDo`, { task, projectId });

export default addToDoTaskApiResponse;
