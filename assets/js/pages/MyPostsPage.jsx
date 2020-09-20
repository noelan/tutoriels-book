import React, { useState, useEffect, useContext, useRef } from "react";
import PosteAPI from "../api/PosteAPI";
import AuthContext from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import UrlFilter from "../services/UrlFilter";
import DateFilter from "../services/DateFilter";
import gsap from "gsap";

const MyPostsPage = (props) => {
  const [postes, setPostes] = useState([]);
  const { userId } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const fade = useRef(null);

  const fetchPosts = async () => {
    try {
      const data = await PosteAPI.findUserPosts(userId);
      setPostes(data);
      setIsLoading(false);
      fadeIn();
    } catch (error) {
      console.log(error.response);
    }
  };

  const fadeIn = () => {
    gsap.fromTo(fade.current, 1, { opacity: 0 }, { opacity: 1 });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      {isLoading && (
        <div className="loader">
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}

      <div className="fade" ref={fade}>
        <div className="container-fluid pt-5">
          <div className="justify-content-between center-text">
            <h1 className="text-center workSans">Mes tutoriels</h1>
            <p className="text-center">
              <Link to="/postes/new" className="btn btn-link p-3 fs-2 ">
                Créer un tuto
              </Link>
            </p>
          </div>
        </div>

        {(postes.length > 0 && (
          <div className="cards-container">
            <div className="flex">
              {postes.map((poste) => (
                <div
                  key={poste.id}
                  className="card-poste"
                  onClick={() => console.log(poste)}
                >
                  <div className="card-top">
                    <Link to={"/postes/show/" + poste.id}>
                      <img
                        src={UrlFilter.ytUrlToThumbnail(poste.href)}
                        className="card-img-top"
                        alt="..."
                      />
                    </Link>
                  </div>
                  <div className="card-bottom">
                    <div className="flex-bottom border-bottom">
                      <div className="card-right">
                        <div className="user-picture">
                          <img src={poste.user.picture} alt="" />
                        </div>
                      </div>
                      <div className="card-left">
                        <div className="title">{poste.title}</div>
                        <div className="detail detail-my-posts">
                          <div className="pseudo">{poste.user.pseudo}</div>
                          <div className="createdAt">
                            {DateFilter.formatDate(poste.creadtedAt)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="center-text">
                    <Link to={"/postes/" + poste.id} className="btn">
                      Modifier
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )) || (
          <>
            <p className="center-text" style={{ padding: "20px" }}>
              Tu n'a pas encore créé de tutoriel n'hésite pas à en créer un !
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default MyPostsPage;
