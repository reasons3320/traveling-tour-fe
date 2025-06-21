import React, { useEffect } from "react";
import { BiLogoMediumOld, BiPaperPlane, BiPhoneOutgoing } from "react-icons/bi";
import { ImFacebook, ImInstagram, ImYoutube } from "react-icons/im";
import "./Footer.scss";
import Aos from "aos";
import "aos/dist/aos.css";
import { FiPhoneOutgoing } from "react-icons/fi";
import { Input } from "antd";
const Footer = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <div className="footer">
      <div className="secContainer grid">
        <div className="logoDiv">
          <div className="footerLogo">
            <BiLogoMediumOld className="icon" />
            <span>OU-Trips</span>
          </div>
          <div className="socials flex">
            <ImFacebook className="icon" />
            <ImInstagram className="icon" />
            <ImYoutube className="icon" />
          </div>
        </div>
        <div className="footerLinks">
          <span className="linkTitle">Information</span>
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
        <div className="footerLinks">
          <span className="linkTitle">Helpful Links</span>
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
        <div className="footerLinks contact-details">
          <span className="linkTitle">Contact Details</span>
          <div>
            <span>
              <BiPhoneOutgoing size={24} />
            </span>
            <span className="phone">038 461 9027</span>
          </div>
          <div className="">
            <Input
              className="contact-email"
              suffix={
                <div
                  style={{
                    backgroundColor: "red",
                    height: "100%",
                    padding: 10,
                    borderRadius: 12,
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  <BiPaperPlane />
                </div>
              }
              readOnly
              value={"truongcao3320@gmail.com"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
