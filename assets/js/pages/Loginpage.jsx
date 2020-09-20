import React, { useState, useContext } from "react";
import Field from "../components/forms/Field";
import AuthContext from "../contexts/AuthContext";
import AuthAPI from "../api/AuthAPI";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const LoginPage = (props) => {
  const { setIsAuthenticated } = useContext(AuthContext);

  const [error, setError] = useState("");

  const [credentials, setCredentials] = useState({
    username: "invite@invite.invite",
    password: "invite@invite.invite",
  });

  /**
   * Test de connexion grâce a la fontion authenticate
   * @param {event} event
   */
  const handleSubmit = async (event) => {
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
  const handleChange = (event) => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;
    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <>
      <div className="login-container">
        <div className="login">
          <div className="card">
            <div className="flex">
              {/* Left */}
              <div className="left">
                <p className="title">Se connecter</p>
                <p className="sub-title">
                  un compte invité est à disposition mais rien ne vous empêche
                  d'avoir votre propre compte !
                </p>
                <form onSubmit={handleSubmit}>
                  <Field
                    label="Email"
                    name="username"
                    type="text"
                    onChange={handleChange}
                    placeholder=""
                    error={error}
                    value={credentials.username}
                  />
                  <Field
                    label="Mot de passe"
                    name="password"
                    type="password"
                    placeholder=""
                    onChange={handleChange}
                    value={credentials.password}
                    error=""
                  />
                  <div className="center-text">
                    <button className="btn">LOGIN</button>
                  </div>
                  <p className="sub-text">
                    Pas de compte ?
                    <Link to="/register" className="subscribe">
                      S'inscrire
                    </Link>
                  </p>
                </form>
              </div>

              {/* Right */}
              <div className="right">
                <div className="img-container">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Android_robot.svg/872px-Android_robot.svg.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
