import React, { useState, useEffect, useContext } from "react";
import PosteAPI from "../api/PosteAPI";
import AuthContext from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import UrlFilter from "../services/UrlFilter";
import DateFilter from "../services/DateFilter";

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
      <div className="container-fluid pt-5">
        <div className="justify-content-between">
          <h1 className="text-center workSans">Mes tutoriels</h1>
          <p className="text-center">
            <Link to="/postes/new" className="btn btn-link p-3 fs-2 ">
              Créer un tuto
            </Link>
          </p>
        </div>

        {(postes.length > 0 && (
          <div className="container">
            <div className="row">
              {postes.map(poste => (
                <div
                  key={poste.id}
                  className="card mr-4 mb-4"
                  style={{ width: "22rem" }}
                >
                  <Link to={"/postes/show/" + poste.id}>
                    <img
                      src={UrlFilter.ytUrlToThumbnail(poste.href)}
                      className="card-img-top"
                      alt="..."
                    />
                  </Link>

                  <div className="card-body">
                    <h5 className="card-title text-truncate text-center">
                      {poste.title}
                    </h5>
                  </div>
                  <hr></hr>
                  <div className="text-center">
                    <p className="card-text workSans">
                      Poster le: {DateFilter.formatDate(poste.creadtedAt)}
                    </p>
                  </div>

                  <ul className="list-group list-group-flush">
                    <li className="list-group-item text-center">
                      <Link
                        to={"/postes/" + poste.id}
                        className="btn btn-danger"
                      >
                        Modifier
                      </Link>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )) || (
          <>
            <div className="headerDiv">
              <img
                className="myImg"
                src="https://images.pexels.com/photos/7477/night-trees-stars.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              />
              <div className="myName">
                <p className="noelAn text-center text-nowrap">
                  Tu n'a pas encore créé de tutoriel n'hésite pas à en créer un
                  !
                </p>
                <p className="devWeb fs-3 roboto">
                  <Link to="/postes/new">Créer un tuto !</Link>
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MyPostsPage;
