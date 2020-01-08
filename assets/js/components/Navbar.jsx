import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import AuthAPI from "../api/AuthAPI";
import { toast } from "react-toastify";

const Navbar = props => {
  const { isAuthenticated, setIsAuthenticated, userEmail } = useContext(
    AuthContext
  );
  const handleLogout = () => {
    AuthAPI.logout();
    setIsAuthenticated(false);
    props.history.push("/login");
    toast.success("Vous êtes déconnecté");
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="collapse navbar-collapse" id="navbarColor02">
        <ul className="navbar-nav m-left-10">
          <li className="nav-item pr-3 font-weight-bold fs-1-5">
            <Link to="/postes" className="nav-link workSans">
              Nos Tutoriels
            </Link>
          </li>
          <li className="nav-item pr-3 font-weight-bold fs-1-5">
            <Link className="nav-link workSans" to="/postes/myposts">
              Mes Tutoriels
            </Link>
          </li>
          <li className="nav-item pr-3 font-weight-bold fs-1-5 lora">
            <Link to="/" className="nav-link workSans">
              <i className="fas fa-home fs-1-5"></i>E Learning
            </Link>
          </li>
        </ul>

        <ul className="navbar-nav ml-auto m-right-10">
          {(!isAuthenticated && (
            <>
              <li className="nav-item">
                <Link className=" mr-5 fs-1-5" to="/login">
                  Se connecter
                </Link>
              </li>
              <li className="nav-item fs-1-5">
                <Link to="/register">S'inscrire</Link>
              </li>
            </>
          )) || (
            <>
              <li className="nav-item">
                <Link to="/MonCompte">
                  <i class="fas fa-user fs-2 mr-5 text-myBlue"></i>
                </Link>
              </li>
              <li className="nav-item">
                <i
                  onClick={handleLogout}
                  class="fas fa-power-off fs-2 text-myBlue"
                ></i>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
