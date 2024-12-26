import React, { useEffect } from "react";
import "./Middle.scss";
import Aos from "aos";
import "aos/dist/aos.css";
import Counter from "./Counter";
const Middle = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <div className="middle section">
      <div className="secContainer container">
        <div className="grid">
          <span className="flex" data-aos="fade-up">
          <Counter startValue={50} endValue={159} duration={2000}/>
            <p>World Of Experiences</p>
          </span>
          <span className="flex" data-aos="fade-up">
            <Counter startValue={2000} endValue={2173} duration={2000}/>
            <p>Fine Destinations</p>
          </span>
          <span className="flex" data-aos="fade-up">
          <Counter startValue={4900} endValue={5192} duration={2000}/>
            <p>Customer Reviews</p>
          </span>
          <span className="flex" data-aos="fade-up">
            <h1>4.8</h1>
            <p>Overall Rating</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Middle;
