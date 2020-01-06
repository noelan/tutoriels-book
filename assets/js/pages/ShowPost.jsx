import React, { useState, useEffect, useContext } from "react";
import PosteAPI from "../api/PosteAPI";
import CommentAPI from "../api/CommentAPI";
import { toast } from "react-toastify";
import AuthContext from "../contexts/AuthContext";
import UrlFilter from "../services/UrlFilter";
import DateFilter from "../services/DateFilter";
import { Link } from "react-router-dom";

const ShowPage = props => {
  // State

  const { userId } = useContext(AuthContext);
  const { id } = props.match.params;
  // Permet de savoir si le champ textArea du commentaire et vide ou non
  const [isEmpty, setIsEmpty] = useState(true);
  const [suggestedPostes, setSuggestedPostes] = useState([]);
  // nombre de vidéos suggérer en fonction du scrolling
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
    fetchSuggestedPost();
  }, [id]);

  /**
   * affiche les postes suggérés
   */
  const fetchSuggestedPost = async () => {
    // Set l'id du poste pour insérer le comentaire dans le bon poste
    setComment({ ...comment, post: "/api/posts/" + id });
    try {
      const data = await PosteAPI.findByLimit(10);
      shuffleArray(data);
      setSuggestedPostes(data);
    } catch (error) {
      console.log(error);
    }
  };

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
        comments,
        prerequis
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
        prerequis,
        userPseudo: user.pseudo,
        userPicture: user.picture
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
      scroll();
      //reset textArea
    } catch (error) {
      toast.error("Votre commentaire doit contenir 1000 caractères maximum");
      console.log(error.response);
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
    setPoste({
      ...poste,
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
      toast.success("Votre commentaire doit contenir 1000 caractères maximum");
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

  // Scroll après avoir ajouter un commentaire
  const scroll = () => {
    window.scrollTo({
      top: 850,
      behavior: "smooth"
    });
  };

  // mélanger pour donner de l'illusion sur les suggested videos
  const shuffleArray = array => {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  return (
    <>
      <div className="showContainer pt-5">
        <div className="row justify-content-between pb-3">
          <div className="col-8 border-right">
            <div className="row pb-3">
              <iframe width="1250" height="640" src={poste.href}></iframe>
            </div>
            <p className="text-center sourceSans pb-3 fs-2">{poste.title}</p>
            <div className="row">
              <div className="col-6 border-right">
                <p className="workSans pb-2 fs-1-5">
                  <img className="userPicture mr-3" src={poste.userPicture} />
                  {poste.userPseudo}
                </p>
                <p className="workSans">{poste.description}</p>
                <p className="workSans">Difficulté : {poste.difficulty}</p>
              </div>
              {poste.prerequis && (
                <div className="col-6">
                  <p className="text-center roboto fs-2">Pré requis</p>
                  <p>{poste.prerequis}</p>
                </div>
              )}
            </div>
            <div className="row">
              <div className="col-12 pb-5">
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
                  <div className="text-center">
                    <button
                      className={
                        "btn btn-info m-3 " + (isEmpty == true && "hidden")
                      }
                    >
                      Ajouter le commentaire
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <hr></hr>
            <div className="row">
              <div className="col-12">
                <form>
                  {poste.comments &&
                    poste.comments.map(comment => (
                      <div key={comment.id}>
                        <h4 className="workSans pb-3">
                          <img
                            className="userPicture mr-4"
                            src={comment.user.picture}
                          />
                          {comment.user.pseudo}
                        </h4>
                        {/* Si l'id du user dans le commentaire est égale a l'id du commentaire et que je suis en editComment */}
                        {(editingComment != comment.id && (
                          <>
                            <p className="workSans text-justify">
                              {comment.comment}
                            </p>
                            <p className="opacity-semi">
                              {DateFilter.formatDate(comment.createdAt)}
                            </p>
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
                              onClick={handleSubmitComment}
                              id="edit"
                              className="btn btn-success"
                            >
                              Valider
                            </button>
                            <button
                              onClick={handleWhichComment}
                              id="annuler"
                              className="btn btn-warning"
                            >
                              Annuler
                            </button>
                          </>
                        )}
                        {comment && comment.user.id == userId && (
                          <div className="text-center">
                            <button
                              onClick={handleDeleteComment}
                              value={comment.id}
                              className="btn btn-danger"
                            >
                              Supprimer
                            </button>
                            <button
                              onClick={handleWhichComment}
                              className="btn btn-info"
                              value={comment.id}
                              id="edit"
                            >
                              Modifier
                            </button>
                          </div>
                        )}
                        <hr></hr>
                      </div>
                    ))}
                </form>
              </div>
            </div>
          </div>

          {/* Videos suggestion */}
          <div className="col-4 pl-4">
            {suggestedPostes.map(poste => (
              <div key={poste.id}>
                <div className="row">
                  <div className="containerSuggest col-6">
                    <Link to={"/postes/show/" + poste.id}>
                      <img
                        src={UrlFilter.ytUrlToThumbnail(poste.href)}
                        className="imgSuggest"
                        alt="..."
                      />
                    </Link>
                  </div>
                  <div className="col-6">
                    <p className="underline fs-2 roboto">{poste.user.pseudo}</p>
                    <p>{poste.description}</p>
                    <p>{DateFilter.formatDate(poste.createdAt)}</p>
                  </div>
                </div>
                <hr></hr>
              </div>
            ))}
          </div>
        </div>

        <hr />
      </div>
    </>
  );
};

export default ShowPage;
