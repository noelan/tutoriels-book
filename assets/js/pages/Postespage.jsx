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
      poste.difficulty.toLowerCase().includes(search.toLowerCase())
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
    const filter = event.currentTarget.value;
    if (filter == "ALL") {
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

  return (
    <>
      <div className="pt-5 postesContainer">
        <p className="text-center roboto mb-3 fs-4">Voici les tutoriels</p>
        <Pagination
          currentPage={currentPage}
          itemPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
          length={filteredPostes.length}
          className="solid"
        />
        <div className="row justify-content-center pb-5">
          <div className="col-4">
            <input
              type="text"
              className="form-control"
              placeholder="Recherche..."
              onChange={handleSearch}
              value={search}
            />
          </div>
          <div className="col-4">
            <select
              className="form-control"
              name="filter"
              placeholder="Veuillez choisir une categorie"
              onChange={handleFilter}
            >
              <option value="ALL">Tous</option>
              <option value="Food">Food</option>
              <option value="Sport">Sport</option>
              <option value="Coding">Coding</option>
              <option value="Musique">Bien être</option>
              <option value="Dessin">Dessin</option>
            </select>
          </div>
        </div>
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
                    <i className="fas fa-utensils fs-2 mr-4"></i>
                    <img className="userPicture" src={poste.user.picture} />
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
                      Poster le: {DateFilter.formatDate(poste.creadtedAt)}
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
        <Pagination
          currentPage={currentPage}
          itemPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
          length={filteredPostes.length}
        />
      </div>
    </>
  );
};

export default PostesPage;
