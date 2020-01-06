import React, { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const AdminPage = props => {
  const { userEmail } = useContext(AuthContext);
  if (userEmail != "admin@admin.admin") {
    props.history.push("/home");
    toast.error("Petit Coquin !!!");
  } else {
    toast.success("Bienvenu admin");
  }
  return (
    <>
      <div className="container">
        <h1 className="text-center p-5">Admin Interface</h1>
        <div className="row justify-content-center">
          <div className="col-3 btn btn-info">
            <Link to="/admin/users">
              <h3>Users</h3>
            </Link>
          </div>
          <div className="col-3 btn btn-info">
            <Link to="/admin/posts">
              <h3>Postes</h3>
            </Link>
          </div>
          <div className="col-3 btn btn-info">
            <Link to="/admin/comments">
              <h3>Commentaires</h3>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
