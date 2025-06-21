import React, { useEffect, useRef, useState } from "react";
import "./AboutUsPage.scss";
import wwaimg from "../../assets/team.png";
import otimg from "../../assets/ourteams.jpg";
import wcuimg from "../../assets/satisfied.jpg";
import sustainimg from "../../assets/sustainability.jpg";
import Aos from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet";
import { TbHome } from "react-icons/tb";
import { FaUserFriends } from "react-icons/fa";
import { TbBasketQuestion } from "react-icons/tb";
import { AiOutlineRise } from "react-icons/ai";
import { Card, Tag } from "antd";
import { Col, Container, Row } from "reactstrap";
import { aboutUs } from "../../data/aboutUs";
import whoweare from "../../assets/foundsomething.avif";
import ourTeams from "../../assets/aboutusourteam.avif";
import whyChooseUs from "../../assets/aboutuswhychooseus.avif";
import arrow from "../../assets/curved-arrow-with-broken-line.png";
import sustainibility from "../../assets/aboutussustainibility.avif";

const about_us = [
  {
    id: "our-stories",
    icon: <TbHome className="aboutUs--icon" />,
    title: "Our stories",
    subtitle: "Meet Our Founder",
    image: wwaimg,
    content:
      "We design every journey with care, combining deep local knowledge, unique activities, and personal touches that help our travelers truly connect with the destinations.Our team shares a common passion: to make travel easier, richer, and more inspiring. From the first conversation to the moment you return home, we’re here to handle the details so you can focus on enjoying every moment.",
  },
  {
    id: "our-team",
    icon: <FaUserFriends className="aboutUs--icon" />,
    title: "Our Team",
    subtitle: "The People Behind Every Journey",
    image: otimg,
    content:
      "Our team is the backbone of our success. Comprised of skilled professionals from diverse backgrounds, we bring together creativity, technical expertise, and a relentless drive for results. Collaboration is at the heart of everything we do, allowing us to tackle challenges, innovate solutions, and exceed expectations. Each team member contributes a unique perspective, making us stronger together.",
  },
  {
    id: "why-choose-us",
    icon: <TbBasketQuestion className="aboutUs--icon" />,
    title: "Why Choose Us",
    subtitle: "More Than Just a Trip – It’s a Thoughtfully Designed Experience",
    image: wcuimg,
    lists: [
      {
        listTitle: "Local Expertise",
        listContent:
          "Our deep roots and connections in each destination mean you’ll experience places like a local, not a tourist.",
      },
      {
        listTitle: "Personalized Itineraries",
        listContent:
          "No two travelers are the same. We take time to understand your interests and preferences to create tailor-made experiences just for you.",
      },
      {
        listTitle: "Unique Activities",
        listContent:
          "From hidden cafes to off-the-beaten-path adventures, we curate moments that guidebooks miss and travelers remember forever.",
      },
      {
        listTitle: "Seamless Planning",
        listContent:
          "Travel should be exciting—not stressful. We handle every detail, big or small, so you can enjoy the journey without worry.",
      },
      {
        listTitle: "Passionate Support",
        listContent:
          "Our friendly team is with you every step of the way—before, during, and even after your trip.",
      },
    ],

    content:
      "With us, you’re not just booking a tour—you’re joining a community that values genuine experiences, meaningful connections, and the joy of discovering the world.",
  },
  {
    id: "sustainibility",
    icon: <AiOutlineRise className="aboutUs--icon" />,
    title: "Sustainability",
    subtitle: "Travel with Purpose, Preserve the Planet",
    image: sustainimg,
    content:
      "We believe in building a better tomorrow. Sustainability is woven into the fabric of our organization, guiding our decisions and operations. From reducing our carbon footprint to promoting eco-friendly practices, we are dedicated to creating lasting positive impacts on the environment and society. Together, we can achieve growth that respects our planet and future generations.",
  },
];
const colors = [
  "rgba(216, 247, 147, 0.6)", // #D8F793
  "rgba(160, 202, 146, 0.6)", // #A0CA92
  "rgba(255, 190, 123, 0.6)", // #FFBE7B
  "rgba(162, 210, 255, 0.6)", // #A2D2FF
  "rgba(255, 198, 255, 0.6)", // #FFC6FF
];
const AboutUsPage = () => {
  const ref = useRef();
  const rect = ref.current?.getBoundingClientRect();
  const [activeSection, setActiveSection] = useState(0);
  const handleScrollToRef = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 100;

      window.scrollTo({
        top,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };
  useEffect(() => {
    Aos.init({
      offset: -400,
      duration: 2000,
    });
  }, []);
  useEffect(() => {
    Aos.refreshHard();
  }, [activeSection]);
  return (
    <div className="containerAboutUs">
      <Helmet>
        <meta charSet="utf-8" />
        <title>About Us</title>
        <link rel="canonical" href="http://localhost:5173/aboutUs" />
      </Helmet>
      <div className="Distance">
        <div className="aboutUsTitle">
          <h1
            style={{
              color: "#f34e1b",
              fontWeight: "700",
              fontSize: "3rem",
            }}
          >
            About Us
          </h1>
          <div className="">
            <h1
              style={{
                fontSize: "2.5rem",
                fontWeight: 600,
              }}
            >
              You Can Always{" "}
              <span style={{ color: "#f34e1b", fontFamily: "Sour Gummy" }}>
                Count On Us
              </span>{" "}
              During Your Journey.
            </h1>
            <div className="textContent">
              <p
                style={{
                  color: "white",
                }}
              >
                "At Mou-Trips, we understand that every journey has its
                challenges. That’s why we are committed to walking alongside you
                every step of the way, providing the support, tools, and
                expertise you need to succeed."
              </p>
            </div>
          </div>
        </div>
        {/* data-aos="fade-up" */}
        <div className="firstSection">
          <div className="firstSection-aboutUs">
            {about_us.map((item, index) => (
              <div
                className={`firstSection-aboutUs-title ${
                  activeSection === item.id ? "active" : ""
                }`}
                onClick={() => handleScrollToRef(item.id)}
              >
                <div className="aboutUs--icon">{item.icon}</div>
                <div className="aboutUs--title">{item.title}</div>
              </div>
            ))}
          </div>
          {/* <div
          key={`img=${activeSection}`}
          ref={ref}
          className="firstSection-imgContainer"
          data-aos="zoom-in"
        >
          <img src={about_us[activeSection].image} alt="Tour guide" />
        </div> */}
          {/* <div
          key={activeSection}
          className="firstSection-content"
          data-aos="fade-right"
          data-aos-easing="linear"
          data-aos-duration="2000"
        >
          <div className="content--item">
            <h6
              data-aos="fade-right"
              data-aos-easing="linear"
              data-aos-duration="1500"
              style={{
                fontSize: "1.5rem",
                fontWeight: 600,
                color: "#f34e1b",
              }}
            >
              {about_us[activeSection].title}
            </h6>
            <p
              data-aos="fade-right"
              data-aos-easing="linear"
              data-aos-duration="2000"
            >
              {about_us[activeSection].content}
            </p>
          </div>
        </div> */}
        </div>
      </div>
      <div className="values-section">
        <div id="our-stories" className="our-stories-section">
          <div className="our-stories-wrapper">
            <div className="img-wrapper" data-aos="fade-right">
              <img
                src={whoweare}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                alt="Who We Are"
              />
              <img src={whoweare} />
            </div>
            <div className="content-wrapper" data-aos="fade-left">
              <h2 className="title">{about_us[0].title}</h2>
              <h2 className="subtitle">{about_us[0].subtitle}</h2>
              <p className="content">{about_us[0].content}</p>
            </div>
            {/* <div className="img-wrapper">
              <img
                src={whoweare}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                alt="Who We Are"
              />
              <img src={whoweare} />
            </div> */}
          </div>
        </div>
        <div id="our-team" className="our-stories-section ">
          <div className="our-stories-wrapper reverse">
            <div className="img-wrapper" data-aos="fade-right">
              <img
                src={ourTeams}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                alt="Who We Are"
              />
              <img src={ourTeams} />
            </div>
            <div className="content-wrapper" data-aos="fade-left">
              <h2 className="title">{about_us[1].title}</h2>
              <h2 className="subtitle">{about_us[1].subtitle}</h2>
              <p className="content">{about_us[1].content}</p>
            </div>
            {/* <div className="img-wrapper">
              <img
                src={whoweare}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                alt="Who We Are"
              />
              <img src={whoweare} />
            </div> */}
          </div>
        </div>
        <div id="why-choose-us" className="our-stories-section">
          <div className="our-stories-wrapper">
            <div className="img-wrapper-no-background" data-aos="fade-right">
              <img
                src={whyChooseUs}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                alt="whyChooseUs"
              />
              {/* <img src={whyChooseUs} /> */}
            </div>
            <div className="arrow-wrapper">
              <img src={arrow} alt="arrow" className="arrow-image" />
            </div>
            <div className="content-wrapper" data-aos="fade-left">
              <h2 className="title">{about_us[2].title}</h2>
              <h2 className="subtitle">{about_us[2].subtitle}</h2>
              <div className="content-lists">
                {about_us[2].lists &&
                  about_us[2].lists.map((list, index) => (
                    <div
                      className="list-item content-lists-wrapper"
                      key={index}
                      style={{
                        backgroundColor: colors[index % colors.length],
                      }}
                    >
                      <h4 className="list-title">{list.listTitle}</h4>
                      {/* <p className="list-content">{list.listContent}</p> */}
                    </div>
                  ))}
              </div>
              {/* <p className="content">{about_us[2].content}</p> */}
            </div>
          </div>
        </div>
        <div id="sustainibility" className="sustainibility-section">
          <div className="our-stories-wrapper">
            <div className="img-wrapper-no-background" data-aos="fade-in">
              <img
                src={sustainibility}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                alt="sustainibility"
              />
              {/* <img src={whyChooseUs} /> */}
            </div>
            <div className="content-wrapper" data-aos="fade-in">
              <h2 className="title">{about_us[3].title}</h2>
              <h2 className="subtitle">{about_us[3].subtitle}</h2>
              <p className="content">{about_us[3].content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
