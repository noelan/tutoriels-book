import React, { useState, useEffect } from "react";
import PosteAPI from "../api/PosteAPI";
import CommentAPI from "../api/CommentAPI";
import { toast } from "react-toastify";
import moment from "moment";

const ShowPage = props => {
  const { id } = props.match.params;
  // Permet de savoir si le champ textArea du commentaire et vide ou non
  const [isEmpty, setIsEmpty] = useState(true);
  const [comment, setComment] = useState({
    comment: "",
    post: "/api/posts/" + id
  });
  const [poste, setPoste] = useState({
    title: "",
    difficulty: "Facile",
    href: "",
    description: "",
    comments: [{}]
  });

  const fetchPost = async () => {
    try {
      const currentPost = await PosteAPI.findById(id);
      const {
        title,
        difficulty,
        href,
        description,
        user,
        comments
      } = currentPost;
      setPoste({
        title,
        difficulty,
        href,
        description,
        comments,
        user: user.pseudo
      });
      console.log(currentPost);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  /**
   * Permet de créer un commentaire
   * @param {event} event
   */

  const handleComment = async event => {
    event.preventDefault();
    try {
      await CommentAPI.create(comment);
      fetchPost();
      toast.success("Votre commentaire à été ajouté !");
      setComment({ comment: "", post: "/api/posts/" + id });
      //reset textArea
    } catch (error) {
      toast.error("Votre commentaire ne peut pas être vide");
    }
  };

  /** Permet de récuperer les valeurs des inputs du text Area et faire apparaitre le bouton ajouter ou non
   * @param {event} event
   */
  const handleChange = event => {
    setComment({
      ...comment,
      [event.currentTarget.name]: event.currentTarget.value
    });
    event.currentTarget.value < 1 ? setIsEmpty(true) : setIsEmpty(false);
  };

  /**
   * Permet de supprimer un commentaire et d'actualiser la liste des commentaires avec l'approche optimiste
   * @param {event} event
   */
  const handleDelete = async event => {
    event.preventDefault();
    const commentId = event.currentTarget.value;
    const updatedComments = [...poste.comments].filter(
      comment => comment.id != commentId
    );
    const { title, difficulty, href, description, user, comments } = poste;
    setPoste({
      title,
      difficulty,
      href,
      description,
      comments: updatedComments
    });
    try {
      await CommentAPI.deleteComment(commentId);
      toast.success("Votre commentaire à bien été supprimé");
    } catch (error) {
      toast.success("Votre commentaire n'a pas pu être supprimé");
      console.log(error.response);
    }
  };

  // Formate la date
  const formatDate = str => {
    return moment(str).format("DD/MM/YYYY");
  };

  return (
    <>
      <div className="container pt-5">
        <div className="container">
          <div className="row justify-content-between pb-3">
            <div className="col-8">
              <iframe
                width="1100"
                height="630"
                src="https://www.youtube.com/embed/tgbNymZ7vqY"
              ></iframe>
            </div>
          </div>
          <h1 className="text-center workSans pb-3">{poste.title}</h1>
          <hr></hr>
          <div>
            <h2 className="workSans pb-2">{poste.user}</h2>
            <p className="workSans">{poste.description}</p>
            <p className="workSans">Difficulté : {poste.difficulty}</p>
          </div>
        </div>
        <hr />

        <form onSubmit={handleComment}>
          <div className="form-group">
            <label htmlFor="commentaire"></label>
            <textarea
              name="comment"
              className="form-control"
              rows="3"
              placeholder="Ajouter un commentaire"
              onChange={handleChange}
              value={comment.comment}
            ></textarea>
          </div>
          <button className={"btn btn-info m-3 " + (isEmpty && "hidden")}>
            Ajouter le commentaire
          </button>
        </form>
        <h3 className="text-center p-3 workSans">Les commentaires</h3>
        <div>
          <form>
            {poste.comments.map(comment => (
              <>
                <div key={comment.id}>
                  <h4 className="workSans">Pseudo</h4>
                  <p className="workSans">{comment.comment}</p>
                  <p>{formatDate(comment.createdAt)}</p>
                  <button
                    onClick={handleDelete}
                    value={comment.id}
                    className="btn btn-link"
                  >
                    Supprimer
                  </button>
                </div>
                <p></p>
                <hr></hr>
              </>
            ))}
          </form>
        </div>
      </div>
    </>
  );
};

export default ShowPage;
