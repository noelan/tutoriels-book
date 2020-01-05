import React, { useState, useEffect, useContext } from "react";
import PosteAPI from "../api/PosteAPI";
import CommentAPI from "../api/CommentAPI";
import { toast } from "react-toastify";
import AuthContext from "../contexts/AuthContext";
import UrlFilter from "../services/UrlFilter";
import DateFilter from "../services/DateFilter";

const ShowPage = props => {
  // State

  const { userId } = useContext(AuthContext);
  const { id } = props.match.params;
  // Permet de savoir si le champ textArea du commentaire et vide ou non
  const [isEmpty, setIsEmpty] = useState(true);
  // state pour savoir si nous modifier un commentaire
  const [editingComment, setEditingComment] = useState("");
  const [comment, setComment] = useState({
    comment: "",
    post: "/api/posts/" + id
  });
  const [editedComment, setEditedComment] = useState({
    comment: "",
    id: ""
  });
  const [poste, setPoste] = useState({
    title: "",
    difficulty: "Facile",
    href: "",
    description: "",
    comments: []
  });

  useEffect(() => {
    fetchPost();
  }, []);

  // Récupère le poste actuelle
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
      // Inversion du tableau de commentaires afin d'afficher les nouveau en premier
      comments.reverse();
      // Afin de mettre un lien youtube dans une balise <iframe> il faut le convertir dans un format spécifique
      const hrefValidate = UrlFilter.toValideUrl(href);
      setPoste({
        title,
        difficulty,
        href: hrefValidate,
        description,
        comments,
        user: user.pseudo
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  /**
   * Permet de créer un commentaire
   * @param {event} event
   */
  const handleCreateComment = async event => {
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

  /**
   * Permet de supprimer un commentaire et d'actualiser la liste des commentaires avec l'approche optimiste
   * @param {event} event
   */
  const handleDeleteComment = async event => {
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

  /** Permet de récuperer les valeurs des inputs du text Area et faire apparaitre le bouton ajouter ou non
   * @param {event} event
   */
  const handleChange = event => {
    if (!editingComment) {
      setComment({
        ...comment,
        [event.currentTarget.name]: event.currentTarget.value
      });
      event.currentTarget.value < 1 ? setIsEmpty(true) : setIsEmpty(false);
    } else {
      setEditedComment({
        ...editedComment,
        [event.currentTarget.name]: event.currentTarget.value,
        id: event.currentTarget.id
      });
    }
    //event.currentTarget.value < 1 ? setIsEmpty(true) : setIsEmpty(false);
  };

  /**
   * Permet d'éditer un commentaire
   * @param {event} event
   */
  const handleSubmitComment = async event => {
    event.preventDefault();
    console.log(editedComment);
    try {
      await CommentAPI.edit(editedComment, editedComment.id);
      toast.success("Votre commentaire à bien été modifié");
      // Enlever le textArea lors de la soumission
      setEditingComment("");
      fetchPost();
    } catch (error) {
      toast.success("Votre commentaire n'a pas pu être modifié");
      console.log(error.response);
    }
  };

  /**
   * Permet de savoir quel est le commentaire à modifier lors du click sur le bouton edit ou d'enlever le mode edit "annuler"
   * @param {Event} event
   */
  const handleWhichComment = async event => {
    console.log(event.currentTarget.value);
    event.preventDefault();
    if (event.currentTarget.id == "annuler") {
      setEditingComment("");
    } else if (event.currentTarget.id == "edit") {
      setEditingComment(event.currentTarget.value);
      console.log(editingComment);
    }
  };

  return (
    <>
      <div className="container pt-5">
        <div className="container">
          <div className="row justify-content-between pb-3">
            <div className="col-8">
              <iframe width="1100" height="0" src={poste.href}></iframe>
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

        <form onSubmit={handleCreateComment}>
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
            {poste.comments &&
              poste.comments.map(comment => (
                <div key={comment.id}>
                  <h4 className="workSans">{comment && comment.user.pseudo}</h4>
                  {/* Si l'id du user dans le commentaire est égale a l'id du commentaire et que je suis en editComment */}
                  {(editingComment != comment.id && (
                    <>
                      <p className="workSans">{comment.comment}</p>
                      <p>{DateFilter.formatDate(comment.createdAt)}</p>
                    </>
                  )) || (
                    <>
                      <textarea
                        className="form-control"
                        rows="3"
                        name="comment"
                        onChange={handleChange}
                        value={editedComment.comment}
                        id={comment.id}
                      ></textarea>
                      <button
                        onClick={handleWhichComment}
                        id="annuler"
                        className="btn btn-link"
                      >
                        Annuler
                      </button>
                      <button
                        onClick={handleSubmitComment}
                        id="edit"
                        className="btn btn-link"
                      >
                        modifier
                      </button>
                    </>
                  )}
                  {comment && comment.user.id == userId && (
                    <div>
                      <button
                        onClick={handleDeleteComment}
                        value={comment.id}
                        className="btn btn-link"
                      >
                        Supprimer
                      </button>
                      <button
                        onClick={handleWhichComment}
                        className="btn btn-link"
                        value={comment.id}
                        id="edit"
                      >
                        Edit
                      </button>
                    </div>
                  )}
                  <hr></hr>
                </div>
              ))}
          </form>
        </div>
      </div>
    </>
  );
};

export default ShowPage;
