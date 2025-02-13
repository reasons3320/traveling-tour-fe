import React, { Suspense, useContext, useEffect, useState } from "react";
import "./Destinations.scss";

import img1 from "../../assets/halong1.jpg";
import img2 from "../../assets/halong2.jpg";
import img3 from "../../assets/halong3.jpg";
import img4 from "../../assets/halong4.jpg";
import { MdLocationPin } from "react-icons/md";
import { BsCreditCard, BsCreditCardFill } from "react-icons/bs";
import { BsCalendarDateFill } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";

import Aos from "aos";
import "aos/dist/aos.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useToursQuery } from "../../helper/tourQuery";
import DestinationCard from "./DestinationCard";
import { VscLoading } from "react-icons/vsc";
import { Empty, Skeleton } from "antd";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { getContentByLanguage } from "../../context/languageUseCase";
import { destinationContent } from "./destination.lang";
import { languageContext } from "../../context/LanguageContext";
const menuLists = [
  {
    title: "All",
    vTitle: "Tất cả",
    value: "All",
  },
  {
    title: "History",
    vTitle: "Di tích lịch sử",
    value: "HI7",
  },
  {
    title: "Beach",
    vTitle: "Biển",
    value: "BE5",
  },
  {
    title: "Cities",
    vTitle: "Thành phố",
    value: "CI6",
  },
  {
    title: "Mountain",
    vTitle: "Núi",
    value: "MO8",
  },
];
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 2,
  responsive: [
    {
      breakpoint: 1025,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 426,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
const Destinations = () => {
  const language = getContentByLanguage(destinationContent);
  const { language: t } = useContext(languageContext);
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("All");
  const [currentData, setCurrentData] = useState([]);
  const handleSetActive = (title) => {
    setIsActive(title);
  };
  const { data, isLoading } = useToursQuery(0, "", []);
  useEffect(() => {
    if (isActive !== "All") {
      const filteredArray =
        data?.data?.filter((item) =>
          item.types.some((type) => type.tour_code === isActive)
        ) || [];
      setCurrentData(filteredArray);
    } else {
      setCurrentData(data?.data);
    }
  }, [data, isActive]);
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <div className="destination section container">
      <div className="secContainer">
        <div className="secTitle">
          <span className="redText" data-aos="fade-up">
            {language.explore}
          </span>
          <h3 data-aos="fade-up"> {language.findYourDream}</h3>
          {/* <p data-aos="fade-up">
            Fill in the fields below to find the best spot for your next tour
          </p> */}
        </div>
        {/* <div className="searchField grid">
          <div className="inputField flex" data-aos="fade-up">
            <MdLocationPin className="icon" />
            <input type="text" placeholder="Location" />
          </div>
        </div>  */}
        <div className="secMenu">
          <ul className="flex" data-aos="fade-up">
            {menuLists.map((item, index) => (
              <li
                key={index}
                value={item.title}
                onClick={() => handleSetActive(item.value)}
                className={item.value === isActive ? "active" : ""}
              >
                {t === "VI" ? item.vTitle : item.title}
              </li>
            ))}
          </ul>
        </div>
        {isLoading ? (
          <div className="destinationContainer grid">
            {[...Array(2)].map((_, index) => (
              <div className="skeleton-section" key={index}>
                <div className="skeleton-card">
                  <Skeleton.Image
                    style={{
                      width: "100%",
                      height: 220,
                    }}
                    active
                  />
                </div>
              </div>
            ))}
          </div>
        ) : currentData?.length > 0 ? (
          <div
            style={{
              width: "100%",
              minHeight: "300px",
            }}
            // className="slider-container"
          >
            <Slider {...settings}>
              {/* <div className="destinationContainer grid"> */}
              {currentData.slice(0, 10).map((item, index) => (
                <DestinationCard item={item} />
              ))}
              {/* </div> */}
            </Slider>
          </div>
        ) : (
          <div className="empty-section">
            <Empty />
          </div>
        )}
      </div>
    </div>
  );
};

export default Destinations;
