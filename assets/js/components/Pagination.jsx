import React from "react";

const Pagination = ({ currentPage, itemPerPage, setCurrentPage, length }) => {
  /**
   * Calcul du nombre de page nécéssaires et inserer les pages dans un tableau
   */
  const numberOfPages = Math.ceil(length / itemPerPage);
  const pages = [];
  for (let i = 1; i <= numberOfPages; i++) {
    pages.push(i);
  }

  const toPaginate = (itemPerPage, currentPage, items) => {
    const start = itemPerPage * currentPage - itemPerPage;
    return items.slice(start, start + itemPerPage);
  };

  return (
    <>
      <div className="text-center">
        <ul className="pagination pagination-sm">
          <li className={"page-item" + (currentPage === 1 && " disabled")}>
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              &laquo;
            </button>
          </li>
          {pages.map(page => (
            <li
              key={page}
              className={"page-item" + (currentPage === page ? " active" : "")}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            </li>
          ))}

          <li
            className={
              "page-item" + (currentPage === pages.length && " disabled")
            }
          >
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              &raquo;
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Pagination;
