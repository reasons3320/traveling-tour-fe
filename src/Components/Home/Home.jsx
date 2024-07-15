import React, { useEffect } from "react";
import bgVideo from "../../assets/vinhhalong.mp4";
import { AiOutlineSwapRight } from "react-icons/ai";
import "./Home.scss";
import img1 from "../../assets/halong1.jpg";
import img2 from "../../assets/halong2.jpg";
import img3 from "../../assets/halong3.jpg";
import img4 from "../../assets/halong4.jpg";
import Aos from "aos";
import "aos/dist/aos.css";
const Home = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <div className="Home">
      <div className="videoBg">
        <video src={bgVideo} autoPlay muted loop></video>
      </div>
      <div className="sectionText">
        <h1 data-aos="fade-up">Unlock Your Travel Dreams With Us !</h1>
        <p data-aos="fade-up">
          Discover the world's most adventurous nature,life is so short for a
          trip.
        </p>
        <button className="btn flex" data-aos="fade-up">
          GET STARTED
          <AiOutlineSwapRight className="icon" />
        </button>
      </div>
      <div className="popularPlaces">
        <div className="content">
          <h3 data-aos="fade-up">Popular Places</h3>
          <div className="images flex" data-aos="fade-up">
            <img src={img1} alt="Destination" />
            <img src={img2} alt="Destination" />
            <img src={img3} alt="Destination" />
            <img src={img4} alt="Destination" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
