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
import UserPage from "./pages/UserPage";
import AdminPage from "./pages/admin/AdminPage";
import UsersPageAdmin from "./pages/admin/UsersPageAdmin";
import PostsPageAdmin from "./pages/admin/PostsPageAdmin";
import CommentsPageAdmin from "./pages/admin/CommentsPageAdmin";

require("../scss/main.scss");

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
    userId: window.localStorage.getItem("userId"),
    userEmail: window.localStorage.getItem("userEmail"),
  };

  const NavbarWithRouter = withRouter(Navbar);

  return (
    <AuthContext.Provider value={contextValue}>
      <HashRouter>
        <main>
          <NavbarWithRouter />
          <Switch>
            <PrivateRoute path="/admin/users" component={UsersPageAdmin} />
            <PrivateRoute path="/admin/posts" component={PostsPageAdmin} />
            <PrivateRoute
              path="/admin/comments"
              component={CommentsPageAdmin}
            />
            <PrivateRoute path="/admin" component={AdminPage} />
            <PrivateRoute path="/postes/myposts" component={MyPostsPage} />
            <PrivateRoute path="/postes/show/:id" component={ShowPost} />
            <PrivateRoute path="/postes/:id" component={PostePage} />
            <PrivateRoute path="/postes" component={PostesPage} />
            <PrivateRoute path="/MonCompte" component={UserPage} />

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
