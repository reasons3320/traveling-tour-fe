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
const about_us = [
  {
    icon: <TbHome className="aboutUs--icon" />,
    title: "Who We Are ?",
    image: wwaimg,
    content:
      "We are a passionate team of innovators, dreamers, and doers dedicated to delivering exceptional solutions that make a difference. With a deep commitment to quality and excellence, we strive to create meaningful experiences for our clients and partners. Our journey is fueled by a shared vision to inspire, empower, and transform industries through our expertise and innovation.",
  },
  {
    icon: <FaUserFriends className="aboutUs--icon" />,
    title: "Our Team",
    image: otimg,
    content:
      "Our team is the backbone of our success. Comprised of skilled professionals from diverse backgrounds, we bring together creativity, technical expertise, and a relentless drive for results. Collaboration is at the heart of everything we do, allowing us to tackle challenges, innovate solutions, and exceed expectations. Each team member contributes a unique perspective, making us stronger together.",
  },
  {
    icon: <TbBasketQuestion className="aboutUs--icon" />,
    title: "Why Choose Us",
    image: wcuimg,
    content:
      "Choosing us means partnering with a company that values your success as much as its own. We prioritize your needs, delivering tailor-made solutions that address your challenges and achieve your goals. Our unwavering commitment to transparency, reliability, and excellence ensures you receive unparalleled service every step of the way. When you choose us, you’re choosing innovation, expertise, and a partner you can trust.",
  },
  {
    icon: <AiOutlineRise className="aboutUs--icon" />,
    title: "Sustainability",
    image: sustainimg,
    content:
      "We believe in building a better tomorrow. Sustainability is woven into the fabric of our organization, guiding our decisions and operations. From reducing our carbon footprint to promoting eco-friendly practices, we are dedicated to creating lasting positive impacts on the environment and society. Together, we can achieve growth that respects our planet and future generations.",
  },
];
const AboutUsPage = () => {
  const ref = useRef();
  const [activeSection, setActiveSection] = useState(0);
  const handleScrollToRef = (id) => {
    ref.current.scrollIntoView({
      behavior: "smooth",
    });
    setActiveSection(id);
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
      <div className="Distance"></div>
      <div className="aboutUsTitle">
        <h1>About Us</h1>
      </div>
      {/* data-aos="fade-up" */}
      <div className="firstSection">
        <div className="firstSection-aboutUs">
          {about_us.map((item, index) => (
            <div
              className={`firstSection-aboutUs-title ${
                activeSection === index ? "active" : ""
              }`}
              onClick={() => handleScrollToRef(index)}
            >
              <div className="aboutUs--icon">{item.icon}</div>
              <div className="aboutUs--title">{item.title}</div>
            </div>
          ))}
        </div>
        <div
          key={`img=${activeSection}`}
          ref={ref}
          className="firstSection-imgContainer"
          data-aos="zoom-in"
        >
          <img src={about_us[activeSection].image} alt="Tour guide" />
        </div>
        <div
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
        </div>
      </div>
      <div className="secondSection">
        <h1>
          You Can Always <span style={{ color: "red" }}>Count On Us</span>{" "}
          During Your Journey.
        </h1>
        {/* <div className="imgContainer">
          <img src={wcuimg} alt="History" data-aos="fade-down" />
        </div> */}
        <div className="textContent">
          <div>
            <p>
              "At Mou-Trips, we understand that every journey has its
              challenges. That’s why we are committed to walking alongside you
              every step of the way, providing the support, tools, and expertise
              you need to succeed."
            </p>
          </div>
          <div className="values-section">
            <Container>
              <Row className="gap-0">
                {aboutUs.map((item) => (
                  <Col className="col-12 col-md-6 col-lg-4 mb-4">
                    <Card
                      className="values-card"
                      title={item.title}
                      bordered={false}
                    >
                      {item.values.map((value, index) => (
                        <Tag className="values-section-tag">
                          <p style={{
                            fontSize:"1rem",
                            fontFamily:"Sour Gummy"
                          }}>{value}</p>
                        </Tag>
                      ))}
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
