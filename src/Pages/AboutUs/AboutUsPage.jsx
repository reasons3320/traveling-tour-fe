import React, { useEffect } from "react";
import "./AboutUsPage.scss";
import avt1 from "../../assets/team.png";
import avt2 from "../../assets/history.jpg";
import Aos from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet";
const AboutUsPage = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <div className="containerAboutUs">
      <Helmet>
        <meta charSet="utf-8" />
        <title>About Us</title>
        <link rel="canonical" href="http://localhost:5173/aboutUs" />
      </Helmet>
      <div className="Distance"></div>
      <div className="aboutUsTitle">
        <h1>About Us</h1>
      </div>

      <div className="firstParagraph" data-aos="fade-up">
        <div className="textContent">
          <h1 data-aos="fade-up">Who we are ?</h1>
          <p data-aos="fade-up">
            Welcome to Mou-Trips Tours, your gateway to the enchanting
            landscapes, rich history, and vibrant cultures of Vietnam. Based in
            the heart of Hanoi, we are a team of local travel experts dedicated
            to crafting unforgettable journeys that showcase the very best of
            our beautiful country. From the bustling streets of Ho Chi Minh City
            to the serene waters of Ha Long Bay, our tours are designed to offer
            you an authentic and immersive experience.
          </p>
        </div>
        <div className="imgContainer">
          <img src={avt1} alt="Tour guide" data-aos="fade-up" />
        </div>
      </div>
      <div className="secondParagraph" data-aos="fade-down">
        <div className="imgContainer">
          <img src={avt2} alt="History" data-aos="fade-down" />
        </div>
        <div className="textContent" data-aos="fade-down">
          <h1 data-aos="fade-down">History ?</h1>
          <p data-aos="fade-down">
            Welcome to Mou-Trips Tours, where history comes alive! Based in the
            historic city of Hue, we are passionate about sharing the rich and
            diverse history of Vietnam with travelers from around the world. Our
            expertly crafted tours take you on a journey through time, exploring
            ancient dynasties, colonial legacies, and the pivotal events that
            have shaped our nation's past. Founded by a team of historians and
            local guides, Heritage Vietnam Tours offers a unique perspective on
            Vietnam's historical landmarks and cultural heritage. From the
            Imperial Citadel of Hue to the ancient streets of Hoi An and the
            historic battlefields of Dien Bien Phu, our tours provide deep
            insights and engaging stories that bring history to life
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
