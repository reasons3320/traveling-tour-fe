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
import { getTourTypesQuery } from "../../helper/tourTypeQuery";
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
  // dots: true,
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
  const [tourTypes, setTourTypes] = useState();
  const handleSetActive = (title) => {
    setIsActive(title);
  };
  const { data, isLoading } = useToursQuery({
    page: 1,
    limit: 10,
    travelTypes: isActive === "All" ? "" : isActive,
  });
  const { data: tourTypeDatas, isLoading: tourTypeLoading } =
    getTourTypesQuery();
  // const { data, isLoading } = useToursQuery({ travelTypes: isActive });

  // useEffect(() => {
  //   if (isActive !== "All") {
  //     const filteredArray =
  //       data?.data?.filter((item) =>
  //         item.types.some((type) => type.tour_code === isActive)
  //       ) || [];
  //     debugger;
  //     setCurrentData(filteredArray);
  //   } else {
  //     setCurrentData(data?.data);
  //   }
  // }, [data, isActive]);
  useEffect(() => {
    const AddingAllValue = tourTypeDatas?.unshift({
      _id: "All",
      name: "All",
    });
    console.log("AddingAllValue", AddingAllValue);
    setTourTypes(tourTypeDatas);
  }, [tourTypeDatas]);
  useEffect(() => {
    console.log("Data", data);
    setCurrentData(data?.data || []);
  }, [data]);

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <div className="destination section container">
      <div className="secContainer">
        <div className="secTitle">
          <span className="redText">{language.explore}</span>
          <h3> {language.findYourDream}</h3>
        </div>
        <div className="secMenu">
          <ul className="flex">
            {tourTypes?.map((item, index) => (
              <li
                key={index}
                value={item._id}
                onClick={() => handleSetActive(item._id)}
                className={item._id === isActive ? "active" : ""}
              >
                {/* {t === "VI" ? item.vTitle : item.title} */}
                {item.name}
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
                      minWidth: 350,
                    }}
                    active
                  />
                </div>
              </div>
            ))}
          </div>
        ) : currentData?.length > 0 ? (
          currentData.length === 1 ? (
            <div className="single-slide-wrapper">
              <DestinationCard item={currentData[0]} index={0} />
            </div>
          ) : (
            <Slider {...settings}>
              {currentData.slice(0, 10).map((item, index) => (
                <div key={index}>
                  <DestinationCard item={item} index={index} />
                </div>
              ))}
            </Slider>
          )
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
