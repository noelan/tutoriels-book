import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import userAPI from "../api/userAPI";
import Field from "../components/forms/Field";
import { toast } from "react-toastify";

const UserPage = (props) => {
  const { userId } = useContext(AuthContext);

  const [user, setUser] = useState({
    pseudo: "",
    email: "",
    image: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    pseudo: "",
    image: "",
  });

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const data = await userAPI.findById(userId);
      setUser(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleChange = async ({ currentTarget }) => {
    const value = currentTarget.value;
    const name = currentTarget.name;
    setUser({ ...user, [name]: value });
  };

  const isImageUrl = require("is-image-url");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const ApiErrors = {};
    if (isImageUrl(user.picture) == false) {
      toast.error("Veuillez mettre une image valide");
      return;
    }

    if (user.password !== user.confirmPassword) {
      ApiErrors.confirmPassword =
        "Votre mot de passe est différent du mot de passe de confirmation";
      setErrors(ApiErrors);
      return;
    }

    if (user.email !== "invite@invite.invite") {
      try {
        await userAPI.edit(user, userId);
        toast.success("Vos identifiants ont bien été modifié");
      } catch (error) {
        console.log(error.response);
        toast.error("Une erreure est survenue");
        const violations = error.response.data.violations;
        violations.forEach((violation) => {
          ApiErrors[violation.propertyPath] = violation.message;
        });
        setErrors(ApiErrors);
      }
    } else {
      toast.error("Ce compte n'est pas modifiable !!!!!");
      fetchUser();
    }
  };

  return (
    <>
      <div className="profil card">
        <div className="container pt-5">
          <h1 className="">Mon profil</h1>
        </div>

        <div className="row justify-content-center">
          <div className="col-6">
            <form onSubmit={handleSubmit}>
              <Field
                name="pseudo"
                placeholder="Pseudo"
                label="Votre pseudo"
                onChange={handleChange}
                value={user.pseudo}
                error={errors.pseudo}
              />
              <Field
                name="email"
                placeholder="Votre Email"
                label="Email"
                onChange={handleChange}
                value={user.email}
                error={errors.email}
              />
              {/* <Field
              name="password"
              placeholder="Votre mot de passe"
              label="Mot de passe"
              type="password"
              onChange={handleChange}
            />
            <Field
              label="Confirmation du mot de passe"
              name="confirmPassword"
              type="password"
              placeholder="Votre mot de passe"
              onChange={handleChange}
              error={errors.confirmPassword}
            /> */}
              <Field
                label="Photo de profil (url)"
                name="picture"
                type="text"
                placeholder="Votre photo de profil"
                value={user.picture}
                onChange={handleChange}
                error={errors.Image}
              />
              <p className="text-center">
                <button className="btn btn-info">Modifier !</button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPage;
