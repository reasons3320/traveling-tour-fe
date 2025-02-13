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
import { getContentByLanguage } from "../../context/languageUseCase";
import { homeContent } from "./home.lang";
const Home = () => {
   const language = getContentByLanguage(homeContent);
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <div className="Home">
      <div className="videoBg">
        <video src={bgVideo} autoPlay muted loop></video>
      </div>
      <div className="sectionText">
        <h1 data-aos="fade-up">{language?.unlock}</h1>
        <p data-aos="fade-up">
          {
            language?.discovery
          }
        </p>
        <button className="btn flex" data-aos="fade-up">
        {
            language?.btnTitle
          }
          <AiOutlineSwapRight className="icon" />
        </button>
      </div>
      <div className="popularPlaces">
        <div className="content">
          <h3 data-aos="fade-up">    {
            language?.popular
          }</h3>
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
