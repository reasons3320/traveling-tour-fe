import React, { useEffect } from "react";
import "./Middle.scss";
import Aos from "aos";
import "aos/dist/aos.css";
import Counter from "./Counter";
import { getContentByLanguage } from "../../context/languageUseCase";
import { middleContent } from "./middle.lang";
const Middle = () => {
    const language = getContentByLanguage(middleContent);
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <div className="middle section">
      <div className="secContainer container">
        <div className="grid">
          <span className="flex" data-aos="fade-up">
          <Counter startValue={50} endValue={159} duration={2000}/>
            <p>{language.experience}</p>
          </span>
          <span className="flex" data-aos="fade-up">
            <Counter startValue={2000} endValue={2173} duration={2000}/>
            <p>{language.destination}</p>
          </span>
          <span className="flex" data-aos="fade-up">
          <Counter startValue={4900} endValue={5192} duration={2000}/>
          <p>{language.reviews}</p>
          </span>
          <span className="flex" data-aos="fade-up">
            <h1>4.8</h1>
            <p>{language.rating}</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Middle;
