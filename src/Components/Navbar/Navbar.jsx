import React, { useState } from "react";
import "./Navbar.scss";
import { BiLogoMediumOld } from "react-icons/bi";
import { AiFillCloseCircle } from "react-icons/ai";
import { PiDotsNineBold } from "react-icons/pi";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import DropdownComponent from "../Dropdown/Dropdown";

const navBarLists = [
  {
    path: "/",
    title: "Home",
  },
  {
    path: "/tours",
    title: "Tour",
  },
  {
    path: "/aboutUs",
    title: "About Us",
  },

  {
    path: "/blogs",
    title: "Blogs",
  },
];
const Navbar = () => {
  const check = localStorage.getItem("user");
  const user = useSelector((state) => state.user.user) || {};
  const [navBar, setNavbar] = useState("menu");
  const showNavbar = () => {
    setNavbar("menu showNavbar");
  };
  const removeNavbar = () => {
    setNavbar("menu");
  };
  return (
    <div className="navBar">
      <div className="logoDiv">
        <Link
          to={"/"}
          style={{
            textDecoration: "none",
            color: "black",
          }}
        >
          <BiLogoMediumOld className="icon" />
          <span className="restName">OU-Trips</span>
        </Link>
      </div>
      <div className={navBar}>
        <ul>
          {navBarLists.map((item, index) => (
            <li>
              <NavLink
                to={item.path}
                onClick={() => setNavbar("menu")}
                className={({ isActive }) =>
                  "linkTitle" + (isActive ? " active" : " ")
                }
                key={index}
              >
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>
        <AiFillCloseCircle className="icon closeIcon" onClick={removeNavbar} />
      </div>
      <div className="auth-section">
        {check ? (
          <DropdownComponent />
        ) : (
          <div className="btns">
            <button className="signIn btn">
              <Link
                to={"/login"}
                style={{
                  color: "white",
                }}
              >
                Sign In
              </Link>
            </button>
            <button className="signIn btn">
              <Link
                to={"/register"}
                style={{
                  color: "white",
                }}
              >
                Sign Up
              </Link>
            </button>
          </div>
        )}
      </div>
      <PiDotsNineBold className="icon menuIcon" onClick={showNavbar} />
    </div>
  );
};

export default Navbar;
