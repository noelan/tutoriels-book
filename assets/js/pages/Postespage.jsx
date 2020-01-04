import React, { useEffect, useState, useContext } from "react";
import PosteAPI from "../api/PosteAPI";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";
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

  return (
    <>
      <div className="container pt-5">
        <h1 className="text-center workSans mb-3">Voici les tutoriels</h1>
        <Pagination
          currentPage={currentPage}
          itemPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
          length={filteredPostes.length}
          className="solid"
        />
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Recherche..."
            onChange={handleSearch}
            value={search}
          />
        </div>
        <div className="row justify-content-center">
          {(paginatedPostes.length > 0 &&
            paginatedPostes.map(poste => (
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
                  <h5 className="card-title text-truncate">{poste.title}</h5>
                  <hr></hr>
                  <p className="card-text workSans">{poste.description}</p>
                </div>
                <hr></hr>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item text-center">
                    <button className="btn btn-info">{poste.difficulty}</button>
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
