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
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="collapse navbar-collapse" id="navbarColor02">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/postes" className="nav-link">
              Les postes
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/postes/myposts">
              Mes postes
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          {(!isAuthenticated && (
            <>
              <li className="nav-item">
                <Link className="btn btn-info mr-3" to="/login">
                  Se connecter
                </Link>
              </li>
              <li className="nav-item">
                <a className="btn btn-info" href="#">
                  S'inscrire
                </a>
              </li>
            </>
          )) || (
            <>
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
