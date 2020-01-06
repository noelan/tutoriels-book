import Axios from "axios";
import { COMMENT_API } from "../../config";

async function create(comment) {
  return Axios.post(COMMENT_API, comment).then(response => response.data);
}

async function deleteComment(id) {
  return Axios.delete(COMMENT_API + "/" + id).then(response => response.data);
}

async function edit(comment, id) {
  return Axios.put(COMMENT_API + "/" + id, comment).then(
    response => response.data
  );
}

async function findAll() {
  return Axios.get(COMMENT_API).then(response => response.data["hydra:member"]);
}
export default {
  create,
  deleteComment,
  edit,
  findAll
};
