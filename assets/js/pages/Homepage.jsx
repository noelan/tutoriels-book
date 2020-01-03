import React from "react";

const HomePage = () => {
  return (
    <>
      <div className="container-fluid p-0 m-0">
        <div className="headerDiv">
          <img
            className="myImg"
            src="https://images.pexels.com/photos/176851/pexels-photo-176851.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          />
          <div className="myName">
            <p className="noelAn text-center">
              Site réalisé par Noël AN afin de mettre en place une api ( Symfony
              & Api Platform), et un Front-end en react !
            </p>
            <p className="devWeb">Responsive pas encore géré &#128528; </p>
            <p className="descriptionHome">
              Site regroupant divers tutoriel ! Venez en créer un !{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
