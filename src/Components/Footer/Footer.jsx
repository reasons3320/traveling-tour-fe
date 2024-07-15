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
          <div className="footerLogo" data-aos="fade-up">
            <BiLogoMediumOld className="icon" />
            <span>OU-Trips</span>
          </div>
          <div className="socials flex" data-aos="fade-up">
            <ImFacebook className="icon" data-aos="fade-up" />
            <ImInstagram className="icon" data-aos="fade-up" />
            <ImYoutube className="icon" data-aos="fade-up" />
          </div>
        </div>
        <div className="footerLinks" data-aos="fade-up">
          <span className="linkTitle" data-aos="fade-up">
            Information
          </span>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Explore</a>
          </li>
          <li>
            <a href="#">Travel</a>
          </li>
          <li>
            <a href="#">Blog</a>
          </li>
        </div>
        <div className="footerLinks" data-aos="fade-up">
          <span className="linkTitle" data-aos="fade-up">
            Helpful Links
          </span>
          <li>
            <a href="#">Destination</a>
          </li>
          <li>
            <a href="#">Support</a>
          </li>
          <li>
            <a href="#">Travel & COndition</a>
          </li>
          <li>
            <a href="#">Privacy</a>
          </li>
        </div>
        <div className="footerLinks" data-aos="fade-up">
          <span className="linkTitle" data-aos="fade-up">
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
