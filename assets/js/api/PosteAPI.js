import Axios from "axios";
import { POSTES_API } from "../../config";

async function findAll() {
  return Axios.get(POSTES_API).then(response => response.data["hydra:member"]);
}

function create(poste) {
  return Axios.post(POSTES_API, poste);
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

export default {
  findAll,
  create,
  findById,
  edit,
  deletePost
};
