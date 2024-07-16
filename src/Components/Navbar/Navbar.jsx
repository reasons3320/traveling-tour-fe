import React, { useState } from "react";
import "./Navbar.scss";
import { BiLogoMediumOld } from "react-icons/bi";
import { AiFillCloseCircle } from "react-icons/ai";
import { PiDotsNineBold } from "react-icons/pi";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RxAvatar } from "react-icons/rx";
import DropdownComponent from "../Dropdown/Dropdown";
const navBarLists = [
  {
    path: "/",
    title: "Home",
  },
  {
    path: "/aboutUs",
    title: "About Us",
  },
  {
    path: "/tours",
    title: "Tour",
  },
  {
    path: "/blogs",
    title: "Blogs",
  },
];
const Navbar = () => {
  const check = localStorage.getItem("user");
  const user = useSelector((state) => state.user.user) || {};
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // console.log("User ben navbar", user);
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
        <BiLogoMediumOld className="icon" />
        <span>OU-Trips</span>
      </div>
      <div className={navBar}>
        <ul>
          {navBarLists.map((item, index) => (
            <NavLink
              style={{
                textDecoration: "none",
              }}
              to={item.path}
              className={({ isActive }) =>
                isActive ? "active navList" : "navList"
              }
              key={index}
            >
              {item.title}
            </NavLink>
          ))}
          {/* <li className="navList">Destination</li>
          <li className="navList">About Us</li>
          <li className="navList">Testimonial</li>
          <li className="navList">Gallery</li> */}
        </ul>
        <AiFillCloseCircle className="icon closeIcon" onClick={removeNavbar} />
      </div>
      {check ? (
        <DropdownComponent />
      ) : (
        <div className="btns">
          <button className="signIn btn">
            <Link
              to={"/login"}
              style={{
                textDecoration: "none",
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
                textDecoration: "none",
                color: "white",
              }}
            >
              Sign Up
            </Link>
          </button>
        </div>
      )}

      <PiDotsNineBold className="icon menuIcon" onClick={showNavbar} />
    </div>
  );
};

export default Navbar;
