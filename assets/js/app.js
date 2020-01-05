import React, { useState } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, withRouter } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthAPI from "./api/AuthAPI";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import AuthContext from "./contexts/AuthContext";
import HomePage from "./pages/Homepage";
import LoginPage from "./pages/Loginpage";
import PostePage from "./pages/Postepage";
import PostesPage from "./pages/Postespage";
import ShowPost from "./pages/ShowPost";
import MyPostsPage from "./pages/MyPostsPage";
import RegisterPage from "./pages/RegisterPage";

require("../css/app.css");

AuthAPI.isTokenValid();

const App = () => {
  /**
   * Context pour savoir si le user est connecté
   */
  const [isAuthenticated, setIsAuthenticated] = useState(
    AuthAPI.isAuthenticated()
  );
  const contextValue = {
    isAuthenticated,
    setIsAuthenticated,
    userId: window.localStorage.getItem("userId")
  };

  const NavbarWithRouter = withRouter(Navbar);

  return (
    <AuthContext.Provider value={contextValue}>
      <HashRouter>
        <NavbarWithRouter />

        <main>
          <Switch>
            <PrivateRoute path="/postes/myposts" component={MyPostsPage} />
            <PrivateRoute path="/postes/show/:id" component={ShowPost} />
            <PrivateRoute path="/postes/:id" component={PostePage} />
            <PrivateRoute path="/postes" component={PostesPage} />

            <Route path="/register" component={RegisterPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/" component={HomePage} />
          </Switch>
        </main>
        <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
      </HashRouter>
    </AuthContext.Provider>
  );
};

const rootElement = document.querySelector("#app");
ReactDOM.render(<App />, rootElement);
