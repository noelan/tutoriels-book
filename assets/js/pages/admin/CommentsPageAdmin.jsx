import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import CommentAPI from "../../api/CommentAPI";
const CommentsPageAdmin = props => {
  const { userEmail } = useContext(AuthContext);
  const [comments, setComments] = useState([]);

  if (userEmail != "admin@admin.admin") {
    props.history.push("/home");
    toast.error("Petit Coquin !!!");
  } else {
    console.log("Bienvenu admin");
  }

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const data = await CommentAPI.findAll();
      setComments(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleDelete = async event => {
    event.preventDefault();
    const id = event.currentTarget.value;
    try {
      await CommentAPI.deleteComment(id);
      fetchComments();
      toast.success("Commentaire bien supprimé");
    } catch (error) {
      toast.error("Le commentaire n'a pas pu être supprimé");
      console.log(error.response);
    }
  };

  return (
    <>
      <div className="container p-5">
        <h1 className="text-center pb-5">Commentaire admin</h1>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Id</th>
              <th>User pseudo</th>
              <th>commentaire</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {comments.map(comment => (
              <tr key={comment.id}>
                <td>{comment.id}</td>
                <td>{comment.user.pseudo}</td>
                <td>{comment.comment}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={handleDelete}
                    value={comment.id}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CommentsPageAdmin;
