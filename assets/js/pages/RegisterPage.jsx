import React, { useState } from "react";
import Field from "../components/forms/Field";
import userAPI from "../api/userAPI";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const RegisterPage = (props) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    pseudo: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    pseudo: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const apiErrors = {};
    if (user.password !== user.confirmPassword) {
      apiErrors.confirmPassword =
        "Votre mot de passe est différent du mot de passe de confirmation";
      setErrors(apiErrors);
      return;
    }
    try {
      const data = await userAPI.create(user);
      toast.success("Vous êtes bien inscrit !");
      props.history.push("/login");
    } catch (error) {
      const violations = error.response.data.violations;
      console.log(error.response);
      violations.forEach((violation) => {
        apiErrors[violation.propertyPath] = violation.message;
      });
      setErrors(apiErrors);
      console.log(apiErrors);
      toast.error("Une erreur est survenue");
    }
  };
  const handleChange = (event) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    setUser({ ...user, [name]: value });
  };
  return (
    <>
      <div className="register-page">
        <div className="register-container">
          <div className="card">
            <p className="title">Inscription</p>
            <form onSubmit={handleSubmit}>
              <Field
                label="Email"
                name="email"
                type="text"
                onChange={handleChange}
                error={errors.email}
              />
              <Field
                label="Pseudo"
                name="pseudo"
                type="text"
                onChange={handleChange}
                error={errors.pseudo}
              />
              <Field
                label="Mot de passe"
                name="password"
                type="password"
                onChange={handleChange}
                error={errors.password}
              />

              <Field
                label="Confirmation du mot de passe"
                name="confirmPassword"
                type="password"
                onChange={handleChange}
                error={errors.confirmPassword}
              />
              <div className="center-text">
                <button className="btn">S'inscrire !</button>
              </div>
              <p className="sub-text">
                Déja inscrit ?
                <Link to="/login" className="subscribe">
                  Se connecter
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
