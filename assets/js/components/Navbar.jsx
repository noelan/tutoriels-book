import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import AuthAPI from "../api/AuthAPI";
import { toast } from "react-toastify";

const Navbar = props => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const handleLogout = () => {
    AuthAPI.logout();
    console.log("ok");
    setIsAuthenticated(false);
    props.history.push("/login");
    toast.success("Vous êtes déconnecté");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
      <div className="collapse navbar-collapse" id="navbarColor02">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item pr-3 font-weight-bold">
            <Link to="/" className="nav-link workSans">
              Home
            </Link>
          </li>
          <li className="nav-item pr-3 font-weight-bold">
            <Link to="/postes" className="nav-link workSans">
              Les Tutoriels
            </Link>
          </li>
          <li className="nav-item pr-3 font-weight-bold">
            <Link className="nav-link workSans" to="/postes/myposts">
              Mes Tutoriels
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          {(!isAuthenticated && (
            <>
              <li className="nav-item">
                <Link className="btn btn-primary mr-3" to="/login">
                  Se connecter
                </Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-primary" to="/register">
                  S'inscrire
                </Link>
              </li>
            </>
          )) || (
            <>
              <li className="nav-item">
                <Link className="btn btn-primary" to="/MonCompte">
                  Mon compte
                </Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-danger" onClick={handleLogout}>
                  Se déconnecter
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
