import Axios from "axios";
import { LOGIN_API } from "../../config";
import JwtDecode from "jwt-decode";

/**
 * Déconnexion (suppression du token du localStorage et sur axios)
 */
function logout() {
  window.localStorage.removeItem("authToken");
  delete Axios.defaults.headers["Authorization"];
}

/**
 * Permet de se connecter
 */
async function authenticate(credentials) {
  return Axios.post(LOGIN_API, credentials)
    .then(response => response.data.token)
    .then(token => {
      // je stock l'id du user dans mon storage
      const { id: id } = JwtDecode(token);
      window.localStorage.setItem("userId", id);
      // je stock le token dans mon local storage
      window.localStorage.setItem("authToken", token);
      // On prévient Axios qu'on a maintenant un header par défaut sur toutes nos futures requetes http
      setAxiosToken(token);
    });
}

/**
 * Positionne le token JWT sur axios
 * @param {strubg} token Le token JWT
 */
function setAxiosToken(token) {
  Axios.defaults.headers["Authorization"] = "Bearer " + token;
}

/**
 * Permet de savoir si il y a un token et si il est valide lors du chargement de l'application
 */
function isTokenValid() {
  //Voir si on a un token
  const token = window.localStorage.getItem("authToken");
  //Voir il il est valide
  if (token) {
    const { exp: expiration } = JwtDecode(token);

    if (expiration * 1000 > new Date().getTime()) {
      setAxiosToken(token);
    }
  }
}

/**
 * Permet de savoir si on est authentifié ou non
 * @return Boolean
 */
function isAuthenticated() {
  const token = window.localStorage.getItem("authToken");
  if (token) {
    const { exp: expiration } = JwtDecode(token);

    if (expiration * 1000 > new Date().getTime()) {
      return true;
    }
    return false;
  }
  return false;
}

export default {
  authenticate,
  isTokenValid,
  isAuthenticated,
  logout
};
