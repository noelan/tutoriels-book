import React, { useState, useEffect, useContext } from "react";
import PosteAPI from "../api/PosteAPI";
import AuthContext from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const MyPostsPage = props => {
  const [postes, setPostes] = useState([]);
  const { userId } = useContext(AuthContext);

  const fetchPosts = async () => {
    try {
      const data = await PosteAPI.findUserPosts(userId);
      setPostes(data);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <h1>Mes postes</h1>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Titre</th>
            <th>Description</th>
            <th>Difficulté</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {postes.map(poste => (
            <tr key={poste.id}>
              <Link to={"/postes/show/" + poste.id}>
                <th>{poste.title}</th>
              </Link>
              <th>{poste.description}</th>
              <th>{poste.difficulty}</th>
              <th>
                <Link className="btn btn-info" to={"/postes/" + poste.id}>
                  Modifier
                </Link>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default MyPostsPage;
