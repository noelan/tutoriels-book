import React, { useState, useEffect, useContext } from "react";
import Field from "../components/forms/Field";
import Select from "../components/forms/Select";
import PosteAPI from "../api/PosteAPI";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import UrlFilter from "../services/UrlFilter";

const PostePage = props => {
  const { userId } = useContext(AuthContext);

  const { id = "new" } = props.match.params;
  // La difficulté est à facile par défaut car l'utilisateur ne déclenche pas forcément le onChange du select de la difficulté
  const [poste, setPoste] = useState({
    title: "",
    difficulty: "Facile",
    href: "",
    description: ""
  });

  const [editing, setEditing] = useState(false);
  const [errors, setErrors] = useState({
    title: "",
    difficulty: "",
    href: "",
    description: ""
  });

  const fetchPost = async id => {
    try {
      const currentPost = await PosteAPI.findById(id);
      const { title, difficulty, href, description } = currentPost;
      setPoste({ title, difficulty, href, description });
      if (userId != currentPost.user.id) {
        toast.error("Ta pas le droit !");
        props.history.push("/postes");
      }
    } catch (error) {
      console.log(error.response.data);
      toast.error("Ce poste n'existe pas");
    }
  };

  /**
   * Check le paramètre id dans l'url et set le mode éditing en fonction de la valeur
   */
  useEffect(() => {
    if (id !== "new") {
      setEditing(true);
      fetchPost(id);
    }
  }, [id]);

  /**
   * Gère la création ou la modification d'un poste et des erreurs si il y'en as
   * @param {event} event
   */
  const handleSubmit = async event => {
    event.preventDefault();
    const apiErrors = {};
    if (UrlFilter.isYoutubeUrl(poste.href) == false) {
      apiErrors.href = "Veuillez metre un lien youtube valide";
      setErrors(apiErrors);
      return;
    }
    try {
      if (!editing) {
        const data = await PosteAPI.create(poste);
        toast.success("Poste créer");
        setErrors("");
        props.history.push("/postes");
      } else {
        const data = await PosteAPI.edit(id, poste);
        setErrors("");
        toast.success("Poste modifiée");
      }
    } catch (error) {
      console.log(error.response);
      const violations = error.response.data.violations;
      console.log(violations);
      if (violations) {
        violations.forEach(violation => {
          apiErrors[violation.propertyPath] = violation.message;
        });
        setErrors(apiErrors);
        toast.error("Il ya des erreurs dans votre formulaire");
      }
    }
  };

  /**
   * Gère le changement des values des inputs
   * @param {event} event
   */
  const handleChange = event => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    setPoste({ ...poste, [name]: value });
  };

  /**
   * Supprimer le poste
   * @param {event} event
   */
  const handleClick = async event => {
    event.preventDefault();
    try {
      await PosteAPI.deletePost(id);
      toast.success("Le poste à bien été supprimé");
      props.history.replace("/postes");
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <div className="container pt-5">
        <h1>
          {(editing && "Modification d'un poste") || "Création d'un poste   "}
          <span style={{ fontSize: "1.3rem" }}>
            (Seulement les liens youtube sont gérer 🤦)
          </span>
        </h1>
        {editing && (
          <>
            <p>
              <Link className="btn btn-link" to={"/postes/show/" + id}>
                Voir le poste
              </Link>
            </p>
          </>
        )}

        <form onSubmit={handleSubmit}>
          <Field
            label="Titre"
            name="title"
            error={errors.title}
            onChange={handleChange}
            value={poste.title}
          />
          <Field
            label="Description"
            name="description"
            error={errors.description}
            onChange={handleChange}
            value={poste.description}
          />
          <Select
            label="Difficulté"
            name="difficulty"
            placeholder="Veuillez choisir une difficulté"
            error={errors.difficulty}
            value={poste.difficulty}
            onChange={handleChange}
          >
            <option value="Facile">Facile</option>
            <option value="Intermédiaire">Intermédiaire</option>
            <option value="Difficile">Difficile</option>
          </Select>
          <Field
            label="Lien de votre vidéo youtube"
            name="href"
            placeholder="Votre lien youtube"
            error={errors.href}
            onChange={handleChange}
            value={poste.href}
          />
          <div className="form-group d-flex justify-content-between">
            <button className="btn btn-primary">
              {(editing && "Modifier") || "Créer"}
            </button>
            {editing && (
              <button className="btn btn-danger" onClick={handleClick}>
                Supprimer le poste
              </button>
            )}
          </div>
          <hr />
          <Link className="btn-link" to="/postes">
            Retour à la liste
          </Link>
        </form>
      </div>
    </>
  );
};

export default PostePage;
