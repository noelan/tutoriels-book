import Axios from "axios";
import { POSTES_API } from "../../config";

async function findAll() {
  return Axios.get(POSTES_API).then(response => response.data["hydra:member"]);
}

async function create(poste) {
  return Axios.post(POSTES_API, poste).then(response => response.data);
}

async function findById(id) {
  return Axios.get(POSTES_API + "/" + id).then(response => response.data);
}

async function edit(id, poste) {
  return Axios.put(POSTES_API + "/" + id, poste).then(
    response => response.data
  );
}

async function deletePost(id) {
  return Axios.delete(POSTES_API + "/" + id).then(response => response.data);
}

async function findUserPosts(id) {
  return Axios.get(POSTES_API + "?user=" + id).then(
    response => response.data["hydra:member"]
  );
}

async function findByFilter(filter) {
  return Axios.get(POSTES_API + "?category=" + filter).then(
    response => response.data["hydra:member"]
  );
}

export default {
  findAll,
  create,
  findById,
  edit,
  deletePost,
  findUserPosts,
  findByFilter
};
