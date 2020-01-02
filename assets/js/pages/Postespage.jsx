import React, { useEffect, useState, useContext } from "react";
import PosteAPI from "../api/PosteAPI";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";
import AuthContext from "../contexts/AuthContext";

const PostesPage = props => {
  const [postes, setPostes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 15;
  const { userId } = useContext(AuthContext);

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
  const toPaginate = (currentPage, itemPerPage, postes) => {
    const start = currentPage * itemPerPage - itemPerPage;
    return postes.slice(start, start + itemPerPage);
  };

  // Pagination des postes
  const paginatedPostes = toPaginate(currentPage, itemPerPage, postes);

  useEffect(() => {
    fetchPostes();
  }, []);

  return (
    <>
      <div className="justify-content-between d-flex">
        <h1>Voici les postes</h1>
        <Link to="/postes/new" className="btn btn-link">
          Créer un poste
        </Link>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Titre</th>
            <th>Description</th>
            <th>Difficulté</th>
          </tr>
        </thead>
        <tbody>
          {paginatedPostes.map(poste => (
            <tr key={poste.id}>
              <td>
                <Link to={"/postes/show/" + poste.id}>{poste.title}</Link>
              </td>
              <td>{poste.description}</td>
              <td>{poste.difficulty}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        itemPerPage={itemPerPage}
        setCurrentPage={setCurrentPage}
        length={postes.length}
      />
    </>
  );
};

export default PostesPage;
