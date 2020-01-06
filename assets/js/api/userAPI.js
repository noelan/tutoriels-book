import Axios from "axios";
import { USERS_API } from "../../config";

async function create(user) {
  return Axios.post(USERS_API, user).then(response => response.data);
}

async function findById(id) {
  return Axios.get(USERS_API + "/" + id).then(response => response.data);
}

async function edit(user, id) {
  return Axios.put(USERS_API + "/" + id, user).then(response => response.data);
}

async function findAll() {
  return Axios.get(USERS_API).then(response => response.data["hydra:member"]);
}

export default {
  create,
  findById,
  edit,
  findAll
};
