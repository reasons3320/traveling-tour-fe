import React, { useEffect } from "react";
import { BiSupport } from "react-icons/bi";
import { RiRoadMapFill } from "react-icons/ri";
import { TbEmergencyBed } from "react-icons/tb";
import traveling from "../../assets/traveling.jpg";
import "./Portfolio.scss";
import Aos from "aos";
import "aos/dist/aos.css";
const Portfolio = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <div className="portfolio section container">
      <div className="secContainer grid">
        <div className="leftContent">
          <div className="secHeading">
            <h3 data-aos="fade-up">Why Should You Choose Us</h3>
            <p data-aos="fade-up">
              We have extensive knowledge and experience in the travel industry
            </p>
          </div>
          <div className="grid">
            <div className="singlePortfolio flex" data-aos="fade-up">
              <div className="iconDiv" data-aos="fade-up">
                <TbEmergencyBed size={100} className="desIcon" />
              </div>
              <div className="info">
                <h4 data-aos="fade-up">Safety and support</h4>
                <p data-aos="fade-up">
                  Our top priority is the safety and well-being of our clients.
                  We maintain high safety standards and have emergency support
                  available during the trip
                </p>
              </div>
            </div>
            <div className="singlePortfolio flex" data-aos="fade-up">
              <div className="iconDiv" data-aos="fade-up">
                <RiRoadMapFill size={100} className="desIcon" />
              </div>
              <div className="info">
                <h4 data-aos="fade-up">Diverse Range Of Destinations</h4>
                <p data-aos="fade-up">
                  Whether it's domestic tour or an international adventure, we
                  cover a wide range of destination
                </p>
              </div>
            </div>
            <div className="singlePortfolio flex" data-aos="fade-up">
              <div className="iconDiv" data-aos="fade-up">
                <BiSupport size={100} className="desIcon" />
              </div>
              <div className="info">
                <h4 data-aos="fade-up">24/7 Customer Support</h4>
                <p data-aos="fade-up">
                  Our dedicated customer support team is available round the
                  clock to address any queries or concerns before,during,and
                  after the trip
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="rightContent" data-aos="fade-down">
          <img src={traveling} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
