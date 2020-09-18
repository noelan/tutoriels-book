import React, { useState, useEffect, useContext } from "react";
import PosteAPI from "../api/PosteAPI";
import CommentAPI from "../api/CommentAPI";
import { toast } from "react-toastify";
import AuthContext from "../contexts/AuthContext";
import UrlFilter from "../services/UrlFilter";
import DateFilter from "../services/DateFilter";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";

const ShowPage = (props) => {
  // State

  const { userId } = useContext(AuthContext);
  const { id } = props.match.params;
  // Permet de savoir si le champ textArea du commentaire et vide ou non
  const [isEmpty, setIsEmpty] = useState(true);
  const [suggestedPostes, setSuggestedPostes] = useState([]);
  // nombre de vidéos suggérer en fonction du scrolling
  let [limit, setLimit] = useState(10);
  let [previousOffset, setPreviousOffset] = useState(120);
  // state pour savoir si nous modifier un commentaire
  const [editingComment, setEditingComment] = useState("");
  const [comment, setComment] = useState({
    comment: "",
    post: "/api/posts/" + id,
  });
  const [editedComment, setEditedComment] = useState({
    comment: "",
    id: "",
  });
  const [poste, setPoste] = useState({
    title: "",
    difficulty: "Facile",
    href: "",
    description: "",
    comments: [],
  });

  useEffect(() => {
    fetchPost();
    fetchSuggestedPost();

    window.addEventListener("scroll", () => {
      if (window.pageYOffset > previousOffset) {
        setLimit((limit += 1));
        setPreviousOffset((previousOffset += 160));
      }
    });
  }, [id]);

  /**
   * affiche les postes suggérés
   */
  const fetchSuggestedPost = async () => {
    // Set l'id du poste pour insérer le comentaire dans le bon poste
    setComment({ ...comment, post: "/api/posts/" + id });
    try {
      const data = await PosteAPI.findByLimit(100);
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
        prerequis,
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
        userPicture: user.picture,
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  /**
   * Permet de créer un commentaire
   * @param {event} event
   */
  const handleCreateComment = async (event) => {
    event.preventDefault();
    try {
      await CommentAPI.create(comment);
      fetchPost();
      toast.success("Votre commentaire à été ajouté !");
      setComment({ comment: "", post: "/api/posts/" + id });
      scroll();
      //reset textArea
      setIsEmpty(true);
    } catch (error) {
      toast.error(error.response.data.violations[0].message);
      console.log(error.response);
    }
  };

  /**
   * Permet de supprimer un commentaire et d'actualiser la liste des commentaires avec l'approche optimiste
   * @param {event} event
   */
  const handleDeleteComment = async (id) => {
    event.preventDefault();
    const commentId = id;
    const updatedComments = [...poste.comments].filter(
      (comment) => comment.id != commentId
    );
    setPoste({
      ...poste,
      comments: updatedComments,
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
  const handleChange = (event) => {
    if (!editingComment) {
      setComment({
        ...comment,
        [event.currentTarget.name]: event.currentTarget.value,
      });
      event.currentTarget.value < 1 ? setIsEmpty(true) : setIsEmpty(false);
    } else {
      setEditedComment({
        ...editedComment,
        [event.currentTarget.name]: event.currentTarget.value,
        id: event.currentTarget.id,
      });
    }
    //event.currentTarget.value < 1 ? setIsEmpty(true) : setIsEmpty(false);
  };
  /**
   * Permet d'éditer un commentaire
   * @param {event} event
   */
  const handleSubmitComment = async (event) => {
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
  const handleWhichComment = async (event) => {
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
      behavior: "smooth",
    });
  };

  // mélanger pour donner de l'illusion sur les suggested videos
  const shuffleArray = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  const handleConfirm = (event) => {
    const id = event.currentTarget.value;

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h3>Etes vous sur de vouloir faire ça?</h3>
            <button
              className="btn"
              onClick={() => {
                toast.error("Operation annulé");
                onClose();
              }}
            >
              Non
            </button>
            <button
              className="btn btn-danger modal-btn"
              onClick={() => {
                handleDeleteComment(id);
                onClose();
              }}
            >
              Oui, Supprimer!
            </button>
          </div>
        );
      },
    });
  };

  return (
    <>
      <div className="show-post-container">
        {/* Post part */}
        <div className="wrapper">
          <div className="flex">
            {/* Left part */}
            <div className="columns-left">
              <div className="iframe-container">
                <iframe className="iframe" src={poste.href}></iframe>
              </div>
              <div className="description">
                <div className="title">{poste.title}</div>
                <div className="createdAt">
                  {DateFilter.formatDate(poste.creadtedAt)}
                </div>
              </div>
              <div className="detail">
                <div className="flex-bottom">
                  <div className="card-right">
                    <div className="user-picture">
                      <img src={poste.userPicture} alt="" />
                    </div>
                  </div>
                  <div className="card-left">
                    <div className="title">{poste.userPseudo}</div>
                    <div className="show-description">{poste.description}</div>
                  </div>
                </div>
              </div>

              {/* Commentaire */}
              <div className="create-comment">
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
                  <div className="center-text">
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

              <div className="comments">
                <form>
                  {poste.comments &&
                    poste.comments.map((comment) => (
                      <div key={comment.id}>
                        <div className="comment-name">
                          <div className="card-right">
                            <div className="user-picture">
                              <img src={comment.user.picture} alt="" />
                            </div>
                          </div>
                          <div className="comment-username">
                            {comment.user.pseudo}
                          </div>
                          <div className="comment-created-at">
                            {DateFilter.formatDate(comment.createdAt)}
                          </div>
                        </div>

                        {/* Si l'id du user dans le commentaire est égale a l'id du commentaire et que je suis en editComment */}
                        {(editingComment != comment.id && (
                          <>
                            <p className="workSans text-justify">
                              {comment.comment}
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
                          <div className="space-around">
                            <button
                              onClick={handleWhichComment}
                              className="btn btn-info"
                              value={comment.id}
                              id="edit"
                            >
                              Modifier
                            </button>
                            <button
                              onClick={handleConfirm}
                              value={comment.id}
                              className="btn btn-danger"
                            >
                              Supprimer
                            </button>
                          </div>
                        )}
                        <hr></hr>
                      </div>
                    ))}
                </form>
              </div>
            </div>
            {/* End Left */}

            {/* Right part */}
            <div className="columns-right">
              {suggestedPostes.map(
                (poste, index) =>
                  index < limit && (
                    <div key={poste.id}>
                      <div className="suggested">
                        <div className="suggested-left">
                          <Link to={"/postes/show/" + poste.id}>
                            <img
                              src={UrlFilter.ytUrlToThumbnail(poste.href)}
                              className="imgSuggest"
                              alt="..."
                            />
                          </Link>
                        </div>
                        <div className="suggested-right">
                          <div className="username-pseudo">
                            {poste.user.pseudo}
                          </div>
                          <div className="description">{poste.description}</div>
                          <div className="createdAt">
                            {DateFilter.formatDate(poste.createdAt)}
                          </div>
                        </div>
                      </div>
                      <hr></hr>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowPage;

//   {/* Videos suggestion */}
//   <div className="col-4 pl-4">
//     {suggestedPostes.map(poste => (
//       <div key={poste.id}>
//         <div className="row">
//           <div className="containerSuggest col-6">
//             <Link to={"/postes/show/" + poste.id}>
//               <img
//                 src={UrlFilter.ytUrlToThumbnail(poste.href)}
//                 className="imgSuggest"
//                 alt="..."
//               />
//             </Link>
//           </div>
//           <div className="col-6">
//             <p className="underline fs-2 roboto">{poste.user.pseudo}</p>
//             <p>{poste.description}</p>
//             <p>{DateFilter.formatDate(poste.createdAt)}</p>
//           </div>
//         </div>
//         <hr></hr>
//       </div>
//     ))}
//   </div>
// </div>

// <hr />
// </div> */}
