import React, { useState, useEffect } from "react";
import PosteAPI from "../api/PosteAPI";
import CommentAPI from "../api/CommentAPI";
import { toast } from "react-toastify";

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
    } catch (error) {
      toast.error("Votre commentaire n'a pas pu être créer");
    }
  };

  /**
   * Permet de récuperer les valeurs des inputs du text Area et faire apparaitre le bouton ajouter ou non
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
    console.log(updatedComments);
    console.log(commentId);
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
  return (
    <>
      <h1>Voici le poste</h1>
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-8">
            <iframe
              width="840"
              height="630"
              src="https://www.youtube.com/embed/tgbNymZ7vqY"
            ></iframe>{" "}
          </div>
          <div className="col-2">
            <div className="row">
              <p>{poste.title}</p>
            </div>
            <div className="row">
              <p>{poste.description}</p>
            </div>
            <div className="row">
              <p>La date</p>
            </div>
            <div className="row">
              <p>{poste.difficulty}</p>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <h3>Les commentaires</h3>
      <form onSubmit={handleComment}>
        <div className="form-group">
          <label htmlFor="commentaire"></label>
          <textarea
            name="comment"
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            placeholder="Ajouter un commentaire"
            onChange={handleChange}
          ></textarea>
        </div>
        <button className={"btn btn-info m-3 " + (isEmpty && "hidden")}>
          Ajouter le commentaire
        </button>
      </form>
      <div>
        <form>
          {poste.comments.map(comment => (
            <>
              <p key={"haha" + comment.id + comment.id + comment.id}>
                {comment.comment}
              </p>

              <button
                key={"hoho" + comment.id + comment.id}
                onClick={handleDelete}
                value={comment.id}
                className="btn btn-link"
              >
                Supprimer
              </button>
            </>
          ))}
        </form>
      </div>
    </>
  );
};

export default ShowPage;
