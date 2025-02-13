import React, { useEffect } from "react";
import img1 from "../../assets/walkonyard.jpg";

import "./Subscribe.scss";
import Aos from "aos";
import "aos/dist/aos.css";
import { getContentByLanguage } from "../../context/languageUseCase";
import { subscribeContent } from "./subcribe.lang";
const Subscribe = () => {
   const language = getContentByLanguage(subscribeContent);
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <div className="subscribe section container">
      <div className="secContainer"  data-aos="fade-up">
        {/* <div className="img-wrapper"> */}
          <img
            src={img1}
            alt=""
           
          />
        {/* </div> */}
        <div className="textDiv">
          <h4 data-aos="fade-up">{language.title}</h4>
          <p data-aos="fade-up">
            {language.desc}
          </p>
          <button data-aos="fade-up" className="btn">
            {language.btn}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
