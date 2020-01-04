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

  /**
   * Transforme un lien youtube en thumbnail
   * @param {string} link
   */
  const linkToThumbnail = link => {
    const youtubeId = link
      .match("=[a-zA-Z-0-9-_]{11}")
      .toString()
      .substr(1);

    const thumbnail =
      "https://img.youtube.com/vi/" + youtubeId + "/hqdefault.jpg";
    return thumbnail;
  };

  return (
    <>
      <div className="container pt-5">
        <div className="justify-content-between">
          <h1 class="text-center workSans">Mes tutoriels</h1>
          <p className="text-center">
            <Link to="/postes/new" className="btn btn-link p-3 fs-2 ">
              Créer un tuto
            </Link>
          </p>
        </div>
        {(postes.length > 0 && (
          <div className="row">
            {postes.map(poste => (
              <div
                key={poste.id}
                className="card mr-4 mb-4"
                style={{ width: "22rem" }}
              >
                <Link to={"/postes/show/" + poste.id}>
                  <img
                    src={linkToThumbnail(poste.href)}
                    className="card-img-top"
                    alt="..."
                  />
                </Link>

                <div className="card-body">
                  <h5 className="card-title text-truncate text-center">
                    {poste.title}
                  </h5>
                </div>

                <ul className="list-group list-group-flush">
                  <li className="list-group-item text-center">
                    <Link
                      to={"/postes/" + poste.id}
                      className="btn btn-success"
                    >
                      Modifier
                    </Link>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        )) || (
          <h2 className="text-center workSans pt-5">
            Tu n'a pas de tutoriel !
          </h2>
        )}
      </div>
    </>
  );
};

export default MyPostsPage;
