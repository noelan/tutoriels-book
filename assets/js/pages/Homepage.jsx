import React from "react";
import { Parallax } from "react-parallax";
import { Link } from "react-router-dom";

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
              <div className="text-container">
                <div className="row">
                  <div className="title">
                    Bonjour je suis Noël AN, ce site à été créer afin de mettre
                    en place une Api ( Api Platform ), un back-end symfony et un
                    rendu en React !
                  </div>
                </div>

                <div className="row">
                  <div className="text">
                    Un compte invité est disponible pour simplifier la
                    navigation cliquer simplement
                    <Link to="/login" className="invitation">
                      ici
                    </Link>
                    .
                  </div>
                </div>

                <div className="row">
                  <div className="text">
                    Mise en place d'une Api avec Api-platform pour communiquer
                    simplement entre le frond-end et le back-end.
                  </div>
                </div>

                <div className="row">
                  <div className="text">
                    Compte utilisateur et connexion via Jwt token.
                  </div>
                </div>

                <div className="row">
                  <div className="text">
                    Mail automatique lors de l'inscription.
                  </div>
                </div>

                <div className="row">
                  <div className="text">
                    Possibilité de voir,créer, modifier ou supprimer vos
                    créations.
                  </div>
                </div>

                <div className="row">
                  <div className="text">
                    Un espace commentaire afin de partagé vos avis sur les
                    autres contenues.
                  </div>
                </div>

                <div className="row">
                  <div className="text">
                    Du faux contenu généré pour pouvoir tester le site en
                    situation réel.
                  </div>
                </div>

                <div className="row">
                  <div className="text">
                    Un site qui s'adapte sur différente taille d'écran
                    mobile,tablette ou desktop.
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
