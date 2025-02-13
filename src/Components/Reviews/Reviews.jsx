import React, { useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import avt1 from "../../assets/avt1.jpg";
import avt2 from "../../assets/avt2.jpg";
import avt3 from "../../assets/avt3.jpg";
import avt4 from "../../assets/avt4.jpg";

import "./Review.scss";
import Aos from "aos";
import "aos/dist/aos.css";
import { getContentByLanguage } from "../../context/languageUseCase";
import { reviewContent } from "./review.lang";
const Reviews = () => {
   const language = getContentByLanguage(reviewContent);
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <div className="review section container">
      <div className="secContainer" data-aos="fade-up">
        <div className="textDiv">
          <span className="redText">{language.fromOurClients}</span>
          <h3 data-aos="fade-up">
            {language.secondTitle}
          </h3>
          <p data-aos="fade-up">
            {language.desc}
          </p>
        </div>
        <div className="review-stars flex" >
        {Array.from({ length: 5 }, (_, index) => (
        <AiFillStar key={index} className="icon" data-aos="fade-up" data-aos-delay={900}/>
      ))}
        </div>
        <div className="clientsImages flex">
          <img src={avt1} alt="Client Image" data-aos="fade-up" data-aos-duration="500"/>
          <img src={avt2} alt="Client Image" data-aos="fade-up" data-aos-duration="600"/>
          <img src={avt3} alt="Client Image" data-aos="fade-up" data-aos-duration="700"/>
          <img src={avt4} alt="Client Image" data-aos="fade-up" data-aos-duration="800"/>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
