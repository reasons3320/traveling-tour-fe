import React, { useEffect } from "react";
import { BiSupport } from "react-icons/bi";
import { RiRoadMapFill } from "react-icons/ri";
import { TbEmergencyBed } from "react-icons/tb";
import "./Portfolio.scss";
import Aos from "aos";
import "aos/dist/aos.css";
import { getContentByLanguage } from "../../context/languageUseCase";
import { portfolioContent } from "./portfolio.lang";
const Portfolio = () => {
  const language = getContentByLanguage(portfolioContent);
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <div className="portfolio container">
      <div className="secContainer">
        <div className="leftContent">
          <div className="secHeading">
            <h3
              data-aos="fade-up"
              style={{
                fontSize: "25px",
                fontWeight: "700",
              }}
            >
              {language.whyChooseUs}
            </h3>
            <p data-aos="fade-up">{language.desc}</p>
          </div>
          <div className="grid">
            <div className="singlePortfolio flex" data-aos="fade-up">
              <div className="iconDiv">
                <h1 className="number">01</h1>
                <TbEmergencyBed className="desIcon" />
              </div>
              <div
                style={{
                  width: "100%",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                <div>{language.safeAndSup}</div>
              </div>
            </div>
            <div className="singlePortfolio flex" data-aos="fade-up">
              <div className="iconDiv">
                <h1 className="number">02</h1>
                <RiRoadMapFill size={100} className="desIcon" />
              </div>
              <div
                style={{
                  width: "100%",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                <div>{language.diverseRange}</div>
              </div>
            </div>
            <div className="singlePortfolio flex" data-aos="fade-up">
              <div className="iconDiv">
                <h1 className="number">03</h1>
                <BiSupport size={100} className="desIcon" />
              </div>
              <div
                style={{
                  width: "100%",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                <div>{language.support}</div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="rightContent" data-aos="fade-up">
          <img src={traveling} alt="" />
        </div> */}
      </div>
    </div>
  );
};

export default Portfolio;
