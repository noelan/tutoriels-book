import React, { useState } from "react";
import Fade from "react-reveal/Fade";
import { Parallax } from "react-parallax";
import Modali, { useModali } from "modali";
import Field from "../components/forms/Field";
import userAPI from "../api/userAPI";
import { toast } from "react-toastify";

const HomePage = props => {
  const [exampleModal, toggleExampleModal] = useModali({
    animated: true,
    centered: true
  });

  const catPictures = [
    "https://images.pexels.com/photos/89625/pexels-photo-89625.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?cs=srgb&dl=abstract-business-code-coder-270348.jpg&fm=jpg",
    "https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "https://images.pexels.com/photos/277253/pexels-photo-277253.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=500&h=500&fit=crop"
  ];

  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    pseudo: ""
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    pseudo: ""
  });

  const handleSubmit = async event => {
    event.preventDefault();
    const apiErrors = {};
    console.log(user);
    if (user.password !== user.confirmPassword) {
      apiErrors.confirmPassword =
        "Votre mot de passe est différent du mot de passe de confirmation";
      setErrors(apiErrors);
      return;
    }
    try {
      const data = await userAPI.create(user);
      toast.success("Vous êtes bien inscrit !");
      props.history.push("/login");
    } catch (error) {
      const violations = error.response.data.violations;
      console.log(error.response);
      violations.forEach(violation => {
        apiErrors[violation.propertyPath] = violation.message;
      });
      setErrors(apiErrors);
      console.log(apiErrors);
      toast.error("Une erreur est survenue");
    }
  };
  const handleChange = event => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    setUser({ ...user, [name]: value });
  };

  return (
    <>
      <Modali.Modal {...exampleModal}>
        <div className="p-3">
          <h1 className="workSans mb-3 text-center">Inscription</h1>
          <form onSubmit={handleSubmit}>
            <Field
              label="Email"
              name="email"
              type="email"
              placeholder="Votre email"
              onChange={handleChange}
              error={errors.email}
            />
            <Field
              label="Pseudo"
              name="pseudo"
              type="text"
              placeholder="Votre pseudo"
              onChange={handleChange}
              error={errors.pseudo}
            />
            <Field
              label="Mot de passe"
              name="password"
              type="password"
              placeholder="Votre mot de passe"
              onChange={handleChange}
              error={errors.password}
            />

            <Field
              label="Confirmation du mot de passe"
              name="confirmPassword"
              type="password"
              placeholder="Votre mot de passe"
              onChange={handleChange}
              error={errors.confirmPassword}
            />
            <div className="form-group text-center">
              <button className="btn btn-primary">S'inscrire !</button>
            </div>
          </form>
        </div>
      </Modali.Modal>
      <div className="container-fluid p-0 m-0 hideSm">
        <Parallax
          blur={0}
          bgImage="https://images.pexels.com/photos/531321/pexels-photo-531321.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          bgImageAlt="the cat"
          strength={500}
        >
          <div className="headerDiv">
            <div className="myName">
              <p className="noelAn lora text-center">
                Site réalisé par Noël AN afin de mettre en place une api (
                Symfony & Api Platform), et un Front-end en react !
              </p>
              <p className="devWeb notosans">
                Vu mobile pas encore géré &#128528;{" "}
              </p>
              <p className="descriptionHome">
                Site regroupant divers tutoriels ! Venez en créer un !
              </p>
            </div>
          </div>
        </Parallax>
      </div>
      <hr></hr>

      <div className="topTuto p-top-7 container-fluid hideSm">
        <Fade bottom>
          <div className="row justify-content-center">
            <div className="col-8">
              <h1 className="lora text-center ">
                Apprenez avec la plus grande ressource d'informations aux mondes
                : le web !
              </h1>
              <p className="badFt text-center p-5 fs-2 opacity-semi underline">
                Pour tous les gouts et pour tous les domaines venez partager
                votre savoir !
              </p>
            </div>
          </div>
          <hr />
        </Fade>
        <Fade left>
          <div className="row justify-content-center p-5">
            <div className="col col-6">
              <div className="m-right-8">
                <div className="containerImg text-center">
                  <img
                    src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    className="imgTemoignage"
                    alt="..."
                  />
                </div>
                <h3 className="text-center lora p-4 underline">Camille63</h3>
                <p className="text-center sourceSans pb-3 fs-2 opacity-semi">
                  Je peux transmettre ma passion
                </p>
                <p className="text-justify concertone">
                  Tempor incididunt dolor voluptate non ut ipsum et cillum aute
                  ad excepteur. Reprehenderit consectetur ipsum enim ipsum dolor
                  duis. Veniam ipsum aliqua qui fugiat cillum ea adipisicing qui
                  in proident aliqua elit consequat laborum. Voluptate tempor
                  magna in excepteur id aliquip proident minim nostrud ad
                  consequat. Minim Lorem do ex sint est mollit. Ullamco amet
                  consectetur magna ipsum ut sit id Lorem excepteur sunt sit.
                </p>
              </div>
            </div>
            <div className="col-4">
              <img alt="" src={catPictures[0]} className="fadeImg" />
            </div>
          </div>
        </Fade>
        <hr></hr>
        <Fade right>
          <div className="row justify-content-center p-5">
            <div className="col-4 ml-5 mr-5">
              <img alt="" src={catPictures[1]} className="fadeImg" />
            </div>
            <div className=" col-6">
              <div className="m-right-8">
                <div className="containerImg text-center">
                  <img
                    src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    className="imgTemoignage"
                    alt="..."
                  />
                </div>
                <h3 className="text-center lora p-4 underline">Camille63</h3>
                <p className="text-center sourceSans pb-3 fs-2 opacity-semi">
                  Je peux transmettre ma passion
                </p>
                <p className="text-justify concertone">
                  Tempor incididunt dolor voluptate non ut ipsum et cillum aute
                  ad excepteur. Reprehenderit consectetur ipsum enim ipsum dolor
                  duis. Veniam ipsum aliqua qui fugiat cillum ea adipisicing qui
                  in proident aliqua elit consequat laborum. Voluptate tempor
                  magna in excepteur id aliquip proident minim nostrud ad
                  consequat. Minim Lorem do ex sint est mollit. Ullamco amet
                  consectetur magna ipsum ut sit id Lorem excepteur sunt sit.
                </p>
              </div>
            </div>
          </div>
        </Fade>
        <hr />
        <Fade left>
          <div className="row justify-content-center p-5">
            <div className="col col-6">
              <div className="m-right-8">
                <div className="containerImg text-center">
                  <img
                    src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    className="imgTemoignage"
                    alt="..."
                  />
                </div>
                <h3 className="text-center lora p-4 underline">Camille63</h3>
                <p className="text-center sourceSans pb-3 fs-2 opacity-semi">
                  Je peux transmettre ma passion
                </p>
                <p className="text-justify concertone">
                  Tempor incididunt dolor voluptate non ut ipsum et cillum aute
                  ad excepteur. Reprehenderit consectetur ipsum enim ipsum dolor
                  duis. Veniam ipsum aliqua qui fugiat cillum ea adipisicing qui
                  in proident aliqua elit consequat laborum. Voluptate tempor
                  magna in excepteur id aliquip proident minim nostrud ad
                  consequat. Minim Lorem do ex sint est mollit. Ullamco amet
                  consectetur magna ipsum ut sit id Lorem excepteur sunt sit.
                </p>
              </div>
            </div>
            <div className="col-4">
              <img alt="" src={catPictures[2]} className="fadeImg" />
            </div>
          </div>
        </Fade>
        <hr></hr>
        <Fade right>
          <div className="row justify-content-center p-5">
            <div className="col-4  ml-5 mr-5">
              <img alt="" src={catPictures[3]} className="fadeImg" />
            </div>
            <div className="col col-6">
              <div className="m-right-8">
                <div className="containerImg text-center">
                  <img
                    src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    className="imgTemoignage"
                    alt="..."
                  />
                </div>
                <h3 className="text-center lora p-4 underline">Camille63</h3>
                <p className="text-center sourceSans pb-3 fs-2 opacity-semi">
                  Je peux transmettre ma passion
                </p>
                <p className="text-justify concertone">
                  Tempor incididunt dolor voluptate non ut ipsum et cillum aute
                  ad excepteur. Reprehenderit consectetur ipsum enim ipsum dolor
                  duis. Veniam ipsum aliqua qui fugiat cillum ea adipisicing qui
                  in proident aliqua elit consequat laborum. Voluptate tempor
                  magna in excepteur id aliquip proident minim nostrud ad
                  consequat. Minim Lorem do ex sint est mollit. Ullamco amet
                  consectetur magna ipsum ut sit id Lorem excepteur sunt sit.
                </p>
              </div>
            </div>
          </div>
        </Fade>
        <hr></hr>
      </div>
      <Fade bottom>
        <div className="row justify-content-center">
          <div className="col-8 text-center">
            <p
              onClick={toggleExampleModal}
              className="lora  underline fs-3 text-myBlue joinUs"
            >
              Rejoignez-nous !
            </p>
            <p className="badFt  p-5 fs-2 opacity-semi underline">
              Pour tous les gouts et pour tous les domaines venez partager votre
              savoir !
            </p>
          </div>
        </div>
        <hr />
      </Fade>

      {/* Avis */}
      <div className="aboutUs myGrey pt-5 hideSm">
        <div className="row justify-content-center">
          <div className="col-3 m-right-8">
            <div className="containerImg">
              <img
                src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                className="imgTemoignage"
                alt="..."
              />
            </div>
            <h3 className="text-center lora p-4 underline">Camille63</h3>
            <p className="text-center sourceSans pb-3 fs-2 opacity-semi">
              Je peux transmettre ma passion
            </p>
            <p className="text-justify concertone">
              Tempor incididunt dolor voluptate non ut ipsum et cillum aute ad
              excepteur. Reprehenderit consectetur ipsum enim ipsum dolor duis.
              Veniam ipsum aliqua qui fugiat cillum ea adipisicing qui in
              proident aliqua elit consequat laborum. Voluptate tempor magna in
              excepteur id aliquip proident minim nostrud ad consequat. Minim
              Lorem do ex sint est mollit. Ullamco amet consectetur magna ipsum
              ut sit id Lorem excepteur sunt sit.
            </p>
          </div>
          <div className="col-3 m-right-8">
            <div className="containerImg">
              <img
                src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                className="imgTemoignage"
                alt="..."
              />
            </div>
            <h3 className="text-center lora p-4 underline">WebNomade</h3>
            <p className="text-center badFt pb-3 fs-2 opacity-semi">
              Je parcours le monde en codant
            </p>
            <p className="text-justify concertone">
              Tempor incididunt dolor voluptate non ut ipsum et cillum aute ad
              excepteur. Reprehenderit consectetur ipsum enim ipsum dolor duis.
              Veniam ipsum aliqua qui fugiat cillum ea adipisicing qui in
              proident aliqua elit consequat laborum. Voluptate tempor magna in
              excepteur id aliquip proident minim nostrud ad consequat. Minim
              Lorem do ex sint est mollit. Ullamco amet consectetur magna ipsum
              ut sit id Lorem excepteur sunt sit.
            </p>
          </div>
          <div className="col-3">
            <div className="containerImg">
              <img
                src="https://images.pexels.com/photos/2100063/pexels-photo-2100063.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                className="imgTemoignage"
                alt="..."
              />
            </div>
            <h3 className="text-center lora p-4 underline">Chris Food</h3>
            <p className="text-center badFt pb-3 fs-2 opacity-semi">
              "J'ai pu me redécouvrir"
            </p>
            <p className="text-justify concertone">
              Tempor incididunt dolor voluptate non ut ipsum et cillum aute ad
              excepteur. Reprehenderit consectetur ipsum enim ipsum dolor duis.
              Veniam ipsum aliqua qui fugiat cillum ea adipisicing qui in
              proident aliqua elit consequat laborum. Voluptate tempor magna in
              excepteur id aliquip proident minim nostrud ad consequat. Minim
              Lorem do ex sint est mollit. Ullamco amet consectetur magna ipsum
              ut sit id Lorem excepteur sunt sit.
            </p>
          </div>
        </div>
      </div>
      <h1 className="hideXl text-center">Vue mobile pas gérer !</h1>
    </>
  );
};

export default HomePage;
