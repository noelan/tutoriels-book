import React from "react";
import { Parallax } from "react-parallax";

const HomePage = () => {
  return (
    <>
      <div className="section">
        <div className="homepage">
          {/* Header */}
          <div className="header">
            <Parallax
              bgImage="https://images.pexels.com/photos/4004374/pexels-photo-4004374.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
              strength={1000}
              className="parallax"
            >
              <div style={{ height: "100vh" }}>
                <div className="text-container">
                  <div className="title">Tutoriels-books.</div>
                  <div className="sub-text">
                    Le savoir est fait pour être partagé
                  </div>

                  <a href="#about">
                    <div className="box">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </a>
                </div>
              </div>
            </Parallax>
          </div>

          {/* About  */}
          <div className="about">
            <div className="container-fluid">
              <div className="title"> A propos</div>
              <div className="text-container">
                <div className="row">
                  <div className="title">Un titre </div>
                  <div className="text">
                    Bonjour je suis Noël AN, ce site à été créer afin de mettre
                    en place une Api ( Api Platform ), un back-end symfony et un
                    rendu en React !
                  </div>
                </div>

                <div className="row">
                  <div className="title">Un titre </div>
                  <div className="text">
                    Mise en place de mail automatique lors de l'inscription.
                  </div>
                </div>

                <div className="row">
                  <div className="title">Un titre </div>
                  <div className="text">
                    CRUD tutoriels, vous pouvez créer,modifié ou supprimer vos
                    création.
                  </div>
                </div>

                <div className="row">
                  <div className="title">Un titre </div>
                  <div className="text">
                    Un espace commentaire afin de partagé vos avis sur les
                    autres contenues.
                  </div>
                </div>

                <div className="row">
                  <div className="title">Un titre </div>
                  <div className="text">
                    Un site qui s'adapte sur différente taille d'écran
                    mobile,tablette ou laptop.
                  </div>
                </div>

                <div className="row">
                  <div className="title">Un titre </div>
                  <div className="text">
                    Pour simplifier votre navigation je vous est directement
                    connecté sur un compte utilisateur afin de vous épargner
                    l'inscription. Mais si vous le souhaiter rien ne vous
                    empêche de vous déconnecter et d'en créer un !
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
