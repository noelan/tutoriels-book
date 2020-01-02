import React, { useState, useContext } from "react";
import Field from "../components/forms/Field";
import AuthContext from "../contexts/AuthContext";
import AuthAPI from "../api/AuthAPI";
import { toast } from "react-toastify";

const LoginPage = props => {
  const { setIsAuthenticated } = useContext(AuthContext);

  const [error, setError] = useState("");

  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  /**
   * Test de connexion grâce a la fontion authenticate
   * @param {event} event
   */
  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const data = await AuthAPI.authenticate(credentials);
      setError("");
      setIsAuthenticated(true);
      toast.success("Vous êtes maintenant connecté");
      props.history.push("/");
    } catch (error) {
      console.log(error.response);
      toast.error("Connexion échoué");
      setError("Les identifiants ne correspondent pas");
    }
  };

  /**
   * onChange event qui insere la valeur des inputs dans le tableau Credentials
   * @param {event} event
   */
  const handleChange = event => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;
    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <>
      <h1>Se connecter</h1>
      <form onSubmit={handleSubmit}>
        <Field
          label="Email"
          name="username"
          type="email"
          onChange={handleChange}
          placeholder="Votre email"
          error={error}
        />
        <Field
          label="Mot de passe"
          name="password"
          type="password"
          placeholder="Votre mot de passe"
          onChange={handleChange}
          error=""
        />
        <div className="form-group">
          <button className="btn btn-primary">Se connecter</button>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
