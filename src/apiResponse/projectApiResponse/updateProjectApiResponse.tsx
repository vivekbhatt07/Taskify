import axios, { AxiosResponse } from "axios";
import { API } from "../api.tsx";
import { UpdateProjectParamsType } from "../../types";

const updateProjectApiResponse = async ({
  projectId,
  project,
}: UpdateProjectParamsType): Promise<AxiosResponse> =>
  await axios.post(`${API}/projects/${projectId}`, project);

export default updateProjectApiResponse;
