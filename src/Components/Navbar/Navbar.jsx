import React, { useContext, useState } from "react";
import "./Navbar.scss";
import { BiLogoMediumOld } from "react-icons/bi";
import { AiFillCloseCircle } from "react-icons/ai";
import { PiDotsNineBold } from "react-icons/pi";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import DropdownComponent from "../Dropdown/Dropdown";
import { languageContext } from "../../context/LanguageContext";
import { getContentByLanguage } from "../../context/languageUseCase";
import { navContent } from "./nav.lang";
import { FaEarthAsia } from "react-icons/fa6";
import { Switch } from "antd";

const Navbar = () => {
  const check = localStorage.getItem("user");
  const { handleChangeLanguage } = useContext(languageContext);
  const language = getContentByLanguage(navContent);
  const navBarLists = [
    {
      path: "/",
      title: language?.home,
    },
    {
      path: "/tours",
      title: language?.tour,
    },
    {
      path: "/aboutUs",
      title:language?.about,
    },

    {
      path: "/blogs",
      title:language?.blogs,
    },
  ];
  console.log(language);
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
            <li key={index}>
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
      <div style={{
        display:'flex',
        gap:"10px",
        alignItems:'center'
      }}>
        <Switch checkedChildren="EN" unCheckedChildren="VI" defaultChecked onChange={handleChangeLanguage}/>
        <FaEarthAsia
          onClick={() => {
            setLanguage("VI");
          }}
        />
      </div>
      <div className="auth-section">
        {check ? (
          <DropdownComponent />
        ) : (
          <div className="btns">
            <Link
              to={"/login"}
              style={{
                color: "black",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textDecoration: "underline",
              }}
            >
              Sign In
            </Link>
            <Link
              to={"/register"}
              style={{
                color: "black",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textDecoration: "underline",
              }}
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
      <PiDotsNineBold className="icon menuIcon" onClick={showNavbar} />
    </div>
  );
};

export default Navbar;
