import axios, { AxiosResponse } from "axios";
import { API } from "../api.tsx";
import { DeleteProjectParamsType } from "../../types";

const deleteProjectApiResponse = async (
  projectId: DeleteProjectParamsType
): Promise<AxiosResponse> => await axios.delete(`${API}/projects/${projectId}`);

export default deleteProjectApiResponse;
