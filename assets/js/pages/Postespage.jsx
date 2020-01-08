import React, { useEffect, useState, useContext } from "react";
import PosteAPI from "../api/PosteAPI";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";
import DateFilter from "../services/DateFilter";
import UrlFilter from "../services/UrlFilter";

const PostesPage = props => {
  const [postes, setPostes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const itemsPerPage = 12;
  const [isSelected, setIsSelected] = useState("Tous");

  /**
   * Récupération de tous les postes (findAll)
   */
  const fetchPostes = async () => {
    try {
      const data = await PosteAPI.findAll();
      setPostes(data);
    } catch (error) {
      toast.error("Erreur lors du chargement des postes !");
    }
  };

  /**
   *
   * @param {currentPage} currentPage Page Actuelle
   * @param {itemPerPage} itemPerPage Nombre de ligne par page
   * @param {postes} postes Tous mes postes (findAll)
   */
  const toPaginate = (currentPage, itemsPerPage, postes) => {
    const start = currentPage * itemsPerPage - itemsPerPage;
    return postes.slice(start, start + itemsPerPage);
  };

  const handleSearch = event => {
    const value = event.currentTarget.value;
    setSearch(value);
    setCurrentPage(1);
  };

  const filteredPostes = postes.filter(
    poste =>
      poste.title.toLowerCase().includes(search.toLowerCase()) ||
      poste.description.toLowerCase().includes(search.toLowerCase()) ||
      poste.difficulty.toLowerCase().includes(search.toLowerCase()) ||
      poste.user.pseudo.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination des postes
  const paginatedPostes =
    filteredPostes.length > itemsPerPage
      ? toPaginate(currentPage, itemsPerPage, filteredPostes)
      : filteredPostes;

  useEffect(() => {
    fetchPostes();
  }, []);

  /**
   * Filtrage par catégorie
   * @param {Event} event
   */
  const handleFilter = async event => {
    event.preventDefault();
    const filter = event.currentTarget.id;
    setIsSelected(filter);
    if (filter == "Tous") {
      fetchPostes();
      return;
    }
    try {
      const data = await PosteAPI.findByFilter(filter);
      setPostes(data);
    } catch (error) {
      error.response;
    }
  };

  const categories = [
    ["Tous", "text-myGrey"],
    ["Food", "text-myBlue", "fas fa-utensils"],
    ["Sport", "text-myRed", "fas fa-running"],
    ["Coding", "text-myGreen", "fas fa-code"],
    ["Dessin", "text-myCyan", "fas fa-pencil-alt"],
    ["Musique", "text-myPink", "fab fa-itunes-note"]
  ];

  // Scroll après avoir clicker sur la pagination
  const scroll = () => {
    window.scrollTo({
      top: 240,
      behavior: "smooth"
    });
  };

  return (
    <>
      <div className="pt-5 postesContainer">
        <div className="row justify-content-center m-3 ">
          <div className="col-4  m-3">
            <input
              type="text"
              className="form-control"
              placeholder="Recherche..."
              onChange={handleSearch}
              value={search}
            />
          </div>

          <div className="categoriesPostes">
            {categories.map(category => (
              <p
                id={category[0]}
                key={category[0]}
                className={
                  "indie myCat fs-2 " +
                  category[1] +
                  " " +
                  (isSelected == category[0] && "underline font-weight-bold ")
                }
                onClick={handleFilter}
              >
                {category[0].toUpperCase()}
              </p>
            ))}
          </div>
        </div>
        <hr></hr>
        <div className="row justify-content-center">
          {(paginatedPostes.length > 0 &&
            paginatedPostes.map(poste => (
              <div
                key={poste.id}
                className="card mr-5 mb-4"
                style={{ width: "25rem" }}
              >
                <Link to={"/postes/show/" + poste.id}>
                  <img
                    src={UrlFilter.ytUrlToThumbnail(poste.href)}
                    className="card-img-top"
                    alt="..."
                  />
                </Link>

                <div className="card-body">
                  <div className="headerCard">
                    {categories.map(
                      category =>
                        category[0] == poste.category && (
                          <i
                            key={category[2]}
                            className={
                              "fs-3 mr-4 " + category[2] + " " + category[1]
                            }
                          ></i>
                        )
                    )}
                    {/* <i
                      className="fas fa-utensils fs-2 mr-4"
                      style={{ color: "red" }}
                    ></i> */}
                    <div className="imgPostesContainer">
                      <img
                        className="img-fluid userPicture"
                        src={poste.user.picture}
                      />
                    </div>
                    <h5 className="card-title text-truncate pl-2 userPseudo underline roboto fs-1-5">
                      {poste.user.pseudo}
                    </h5>
                  </div>
                </div>
                <hr></hr>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item text-center">
                    <p className="card-text workSans cardTitle">
                      {poste.title}
                    </p>
                  </li>
                </ul>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item text-center">
                    <p className="card-text workSans">
                      Posté le: {DateFilter.formatDate(poste.creadtedAt)}
                    </p>
                  </li>
                </ul>
              </div>
            ))) || (
            <p className="text-center workSans">
              Aucun poste ne correspond à votre Recherche
            </p>
          )}
        </div>

        <div onClick={scroll}>
          <Pagination
            currentPage={currentPage}
            itemPerPage={itemsPerPage}
            setCurrentPage={setCurrentPage}
            length={filteredPostes.length}
          />
        </div>
      </div>
    </>
  );
};

export default PostesPage;
