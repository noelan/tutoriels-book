import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import userAPI from "../../api/userAPI";

const UsersPageAdmin = props => {
  const [users, setUsers] = useState([]);

  const { userEmail } = useContext(AuthContext);
  if (userEmail != "admin@admin.admin") {
    props.history.push("/home");
    toast.error("Petit Coquin !!!");
  } else {
    console.log("Bienvenu admin");
  }

  const fetchUsers = async () => {
    try {
      const data = await userAPI.findAll();
      console.log(data);
      setUsers(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div className="container p-5">
        <h1 className="text-center">Poste Admin</h1>

        <table className="table table-hover">
          <thead>
            <tr>
              <th>Id</th>
              <th>Email</th>
              <th>Pseudo</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map(user => (
              <tr>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.pseudo}</td>
                <td>Delete</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UsersPageAdmin;
