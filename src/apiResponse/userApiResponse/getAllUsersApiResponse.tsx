import axios from "axios";
import { API } from "../api.tsx";

const getAllUsersApiResponse = async () => await axios.get(`${API}/auth`);

export default getAllUsersApiResponse;
