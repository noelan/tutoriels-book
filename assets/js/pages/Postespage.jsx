import React, { useEffect, useState, useContext, useRef } from "react";
import PosteAPI from "../api/PosteAPI";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";
import DateFilter from "../services/DateFilter";
import UrlFilter from "../services/UrlFilter";
import gsap from "gsap";

const PostesPage = (props) => {
  const [postes, setPostes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const itemsPerPage = 12;
  const [isSelected, setIsSelected] = useState("Tous");
  const [isLoading, setIsLoading] = useState(true);
  const subNav = useRef(null);
  let prevScrollpos = window.pageYOffset;
  let animationFinished = true;
  let fade = useRef(null);
  /**
   * Récupération de tous les postes (findAll)
   */
  const fetchPostes = async () => {
    try {
      const data = await PosteAPI.findAll();
      setPostes(data);
      setIsLoading(false);
      // fadeIn();
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

  const handleSearch = (event) => {
    const value = event.currentTarget.value;
    setSearch(value);
    setCurrentPage(1);
  };

  const filteredPostes = postes.filter(
    (poste) =>
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
    setIsLoading(true);
    fetchPostes();
    window.addEventListener("scroll", moveSubNav);
  }, []);

  /**
   * Filtrage par catégorie
   * @param {Event} event
   */
  const handleFilter = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const filter = event.currentTarget.id;
    setIsSelected(filter);
    event.currentTarget.classList.add("active");
    console.log(event.currentTarget);
    if (filter == "Tous") {
      fetchPostes();
      return;
    }
    try {
      const data = await PosteAPI.findByFilter(filter);
      setIsLoading(false);
      setPostes(data);
    } catch (error) {
      error.response;
    }
  };

  const categories = ["Tous", "Food", "Sport", "Coding", "Dessin", "Musique"];

  // Scroll après avoir clicker sur la pagination
  const scroll = (event) => {
    // console.log(event.currentTarget);
    // window.scrollTo({
    //   top: 240,
    //   behavior: "smooth",
    // });
  };

  // Move subnav to top on scroll
  const moveSubNav = () => {
    var currentScrollPos = window.pageYOffset;

    // scroll up
    if (prevScrollpos > currentScrollPos) {
      if (animationFinished === true) {
        gsap.to(subNav.current, 0.3, { top: "6vh" });
        animationFinished = false;
        setTimeout(() => {
          animationFinished = true;
        }, 500);
      }
    } else {
      // scroll down
      if (animationFinished) {
        gsap.to(subNav.current, 0.3, { top: "0px" });
        animationFinished = false;
        setTimeout(() => {
          animationFinished = true;
        }, 500);
      }
    }
    prevScrollpos = currentScrollPos;
  };

  const fadeIn = () => {
    gsap.fromTo(fade.current, 1, { opacity: 0 }, { opacity: 1 });
  };

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
        <div className="postes-header" ref={subNav}>
          {/* Desktop */}
          <div className="filters">
            {/* Categories */}
            {categories.map((category) => (
              <p
                id={category}
                key={category}
                onClick={handleFilter}
                className={
                  "category" + (isSelected == category ? " active" : "")
                }
              >
                {category}
              </p>
            ))}
            <div className="search">
              <input
                type="text"
                className="search-filter"
                placeholder="Recherche..."
                onChange={handleSearch}
                value={search}
              />
              <button type="submit" className="searchButton">
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
          {/* End desktop */}

          {/* Responsive */}
          <div className="filters-sm filters">
            {/* Categories */}
            <div className="dropdown">
              {isSelected} <i className="fa fa-caret-down"></i>
              <ul>
                {categories.map((category) => (
                  <li
                    id={category}
                    key={category}
                    onClick={handleFilter}
                    className={
                      "category" + (isSelected == category ? " active" : "")
                    }
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>
            <div className="search">
              <input
                type="text"
                className="search-filter"
                placeholder="Recherche..."
                onChange={handleSearch}
                value={search}
              />
              <button type="submit" className="searchButton">
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Cards  */}
        <div className="cards-container cards-container-postes">
          <div className="flex">
            {(paginatedPostes.length > 0 &&
              paginatedPostes.map((poste) => (
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
                    <div className="flex-bottom">
                      <div className="card-right">
                        <div className="user-picture">
                          <img src={poste.user.picture} alt="" />
                        </div>
                      </div>
                      <div className="card-left">
                        <div className="title">{poste.title}</div>
                        <div className="detail">
                          <div className="pseudo">{poste.user.pseudo}</div>
                          <div className="createdAt">
                            {DateFilter.formatDate(poste.creadtedAt)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))) || (
              <p className="text-center workSans">
                Aucun poste ne correspond à votre Recherche
              </p>
            )}
          </div>

          <div onClick={scroll(event)} className="center-text">
            <Pagination
              currentPage={currentPage}
              itemPerPage={itemsPerPage}
              setCurrentPage={setCurrentPage}
              length={filteredPostes.length}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PostesPage;
