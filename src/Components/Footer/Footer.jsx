import React, { useEffect } from "react";
import { BiLogoMediumOld } from "react-icons/bi";
import { ImFacebook, ImInstagram, ImYoutube } from "react-icons/im";
import "./Footer.scss";
import Aos from "aos";
import "aos/dist/aos.css";
const Footer = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <div className="footer">
      <div className="secContainer container grid">
        <div className="logoDiv">
          <div className="footerLogo" >
            <BiLogoMediumOld className="icon" />
            <span>OU-Trips</span>
          </div>
          <div className="socials flex">
            <ImFacebook className="icon" />
            <ImInstagram className="icon" />
            <ImYoutube className="icon" />
          </div>
        </div>
        <div className="footerLinks" >
          <span className="linkTitle" >
            Information
          </span>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/tours">Tours</a>
          </li>
          <li>
            <a href="/aboutUs">About Us</a>
          </li>
          <li>
            <a href="/blogs">Blog</a>
          </li>
        </div>
        <div className="footerLinks" >
          <span className="linkTitle" >
            Helpful Links
          </span>
          <li>
            <a href="#">Destination</a>
          </li>
          <li>
            <a href="#">Support</a>
          </li>
          <li>
            <a href="#">Travel & Condition</a>
          </li>
          <li>
            <a href="#">Privacy</a>
          </li>
        </div>
        <div className="footerLinks">
          <span className="linkTitle" >
            Contact Details
          </span>
          <span className="phone">+038 461 9027</span>
          <span className="email">truongcao3320@gmail.com</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
