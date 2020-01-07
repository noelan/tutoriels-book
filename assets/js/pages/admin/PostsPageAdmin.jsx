import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { POSTES_API } from "../../../config";
import PosteAPI from "../../api/PosteAPI";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const PostsPageAdmin = props => {
  const [postes, setPostes] = useState([]);

  const { userEmail } = useContext(AuthContext);
  if (userEmail != "admin@admin.admin") {
    props.history.push("/home");
    toast.error("Petit Coquin !!!");
  } else {
    console.log("Bienvenu admin");
  }

  useEffect(() => {
    fetchPostes();
  }, []);

  // const fetchPostes = async () => {
  //   try {
  //     const data = await POSTES_API.findAll();
  //     console.log(data);
  //     setPostes(data);
  //   } catch (error) {
  //     console.log(error.response);
  //   }
  // };

  const fetchPostes = async () => {
    try {
      const data = await PosteAPI.findAll();
      setPostes(data);
    } catch (error) {
      console.log(error);
      toast.error("Erreur lors du chargement des postes !");
    }
  };

  const handleDelete = async id => {
    event.preventDefault();
    try {
      await PosteAPI.deletePost(id);
      toast.success("Poste Supprimé");
      fetchPostes();
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleConfirm = event => {
    const id = event.currentTarget.value;
    console.log(id);
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h3>Etes vous sur de vouloir faire ça?</h3>
            <button
              onClick={() => {
                toast.error("Operation annulé");
                onClose();
              }}
            >
              Non
            </button>
            <button
              onClick={() => {
                handleDelete(id);
                onClose();
              }}
            >
              Oui, Supprimer!
            </button>
          </div>
        );
      }
    });
  };

  return (
    <>
      <div className="container p-5">
        <h1 className="text-center">Poste Admin</h1>

        <table className="table table-hover">
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>User Pseudo</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {postes.map(poste => (
              <tr key={poste.id}>
                <td>{poste.id}</td>
                <td>{poste.title}</td>
                <td>{poste.user.pseudo}</td>
                <td>
                  <button
                    value={poste.id}
                    onClick={handleConfirm}
                    className="btn btn-danger"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PostsPageAdmin;
