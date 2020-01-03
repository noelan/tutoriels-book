import Axios from "axios";
import { USERS_API } from "../../config";

async function create(user) {
  return Axios.post(USERS_API, user).then(response => response.data);
}

export default {
  create
};
