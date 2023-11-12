import axios, { AxiosResponse } from "axios";
import { API } from "../api.tsx";
import { AddProjectParamsType } from "../../types";

const addProjectApiResponse = async ({
  project,
  userId,
}: AddProjectParamsType): Promise<AxiosResponse> =>
  await axios.post(`${API}/projects`, { project, userId });

export default addProjectApiResponse;
