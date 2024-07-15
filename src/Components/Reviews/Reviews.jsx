import React, { useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import avt1 from "../../assets/avt1.jpg";
import avt2 from "../../assets/avt2.jpg";
import avt3 from "../../assets/avt3.jpg";
import avt4 from "../../assets/avt4.jpg";

import "./Review.scss";
import sunrise from "../../assets/sunrise.jpg";
import Aos from "aos";
import "aos/dist/aos.css";
const Reviews = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <div className="review section container">
      <div className="secContainer grid" data-aos="fade-up">
        <div className="textDiv">
          <span className="redText">FROM OUR CLIENTS</span>
          <h3 data-aos="fade-up">
            Real Travel History From Our Beloved Clients
          </h3>
          <p data-aos="fade-up">
            By choosing us as their tour agency,customers can expect an
            enriching and enjoyable travel experience, filled with unforgettable
            memories that will last a lifetime
          </p>
          <span className="stars flex" data-aos="fade-up">
            <AiFillStar className="icon" />
            <AiFillStar className="icon" />
            <AiFillStar className="icon" />
            <AiFillStar className="icon" />
            <AiFillStar className="icon" />
          </span>
          <div className="clientsImages flex">
            <img src={avt1} alt="Client Image" data-aos="fade-up" />
            <img src={avt2} alt="Client Image" data-aos="fade-up" />
            <img src={avt3} alt="Client Image" data-aos="fade-up" />
            <img src={avt4} alt="Client Image" data-aos="fade-up" />
          </div>
        </div>
        <div className="imgDiv" data-aos="fade-down">
          <img src={sunrise} alt="" data-aos="fade-down" />
        </div>
      </div>
    </div>
  );
};

export default Reviews;
