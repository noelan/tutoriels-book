import React, { useContext, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import AuthAPI from "../api/AuthAPI";
import { toast } from "react-toastify";
import gsap from "gsap";

const Navbar = (props) => {
  let prevScrollpos = window.pageYOffset;
  let animationFinished = true;
  const navbar = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const { isAuthenticated, setIsAuthenticated, userEmail } = useContext(
    AuthContext
  );
  const handleLogout = () => {
    AuthAPI.logout();
    setIsAuthenticated(false);
    props.history.push("/login");
    toast.success("Vous êtes déconnecté");
  };

  /** Burger menu toggle **/
  const handleClick = () => {
    setIsActive(!isActive);
    let navLinks = document.querySelectorAll(".nav-menu li");
    let burger = document.querySelector(".burger");
    console.log(navLinks);

    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 7 + 0.5
        }s`;
      }
    });

    if (burger.classList.contains("toggle")) {
      burger.classList.remove("toggle");
    } else {
      burger.classList.add("toggle");
    }
  };

  // Hide nav on scroll
  const hideNav = () => {
    var currentScrollPos = window.pageYOffset;
    // scrol up
    if (prevScrollpos > currentScrollPos) {
      if (animationFinished === true) {
        gsap.to(navbar.current, 0.3, { top: "0px" });

        animationFinished = false;
        setTimeout(() => {
          animationFinished = true;
        }, 500);
      }
    } else {
      // scroll down
      if (animationFinished) {
        gsap.to(navbar.current, 0.3, { top: "-50px" });
        animationFinished = false;
        setTimeout(() => {
          animationFinished = true;
        }, 500);
      }
    }
    prevScrollpos = currentScrollPos;
  };

  useEffect(() => {
    if (props.location.pathname === "/postes") {
      window.addEventListener("scroll", hideNav);
    }
  });

  return (
    <>
      <div className="background-top"></div>
      <nav className="navbar" ref={navbar}>
        <ul className={"nav-menu" + (isActive ? " nav-active" : "")}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/postes">Nos Tutoriels</Link>
          </li>
          <li>
            <Link to="/postes/myposts">Mon Studio</Link>
          </li>
          <li>
            <Link to="/">E Learning</Link>
          </li>
        </ul>

        <ul className="nav-menu">
          {(!isAuthenticated && (
            <>
              <li>
                <Link to="/login">Se connecter</Link>
              </li>
              <li>
                <Link className="register" to="/register">
                  S'inscrire
                </Link>
              </li>
            </>
          )) || (
            <>
              <li>
                <Link to="/MonCompte">Mon compte</Link>
              </li>
              <li>
                <Link to="/logout" onClick={handleLogout}>
                  Se déconnecté
                </Link>
              </li>
            </>
          )}
        </ul>
        <div className="burger" onClick={handleClick}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
