import Aos from "aos";
import React, { useEffect } from "react";
import { TiLocation, TiStarFullOutline } from "react-icons/ti";
import { averageCounting } from "../../utils/totalRateCounting";
import "./DestinationCard.scss";
import { BiStar, BiSun } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { formatVND } from "../../utils/formatToVnd";
const DestinationCard = ({ item, index }) => {
  const navigate = useNavigate();
  const average = Math.floor(averageCounting(item?.reviews), 1);
  const handleNavigate = () => {
    navigate("/tours");
  };
  // useEffect(() => {
  //   Aos.init({ duration: 2000 });
  // }, []);
  console.log({ index });
  return (
    <div
      className="imgDiv"
      data-aos="fade-up"
      data-aos-delay={300 + index * 100}
    >
      <div className="types">
        {item?.types?.map((item, index) => (
          <div className="type-item" key={index}>
            {item.name}
          </div>
        ))}
      </div>
      <img
        src={item.photo}
        alt="Destination"
        //  onClick={handleNavigate}
      />
      <div className="descInfo flex">
        <div className="text" onClick={handleNavigate}>
          <div className="text-title">{item.title}</div>
        </div>
        <div className="text">
          <div className="text-subtitle">
            <TiLocation className="icon" />
            {item.location_id?.city_name}
          </div>
          {/* <div className="rating">
            {average} <BiStar className="icon" />{" "}
          </div> */}
        </div>
        <div className="imgDiv-content">
          <div className="rating">
            {Array.from({ length: 5 }, (_, i) => (
              <TiStarFullOutline
                className="icon"
                color={i <= average ? "orange" : "gray"}
              />
            ))}
          </div>
          <div className="price">
            {formatVND(item.price)}
            <span
              style={{
                textDecoration: "underline",
              }}
            >
              đ
            </span>
          </div>
          {/* <div>
            <BiSun />
            {item.duration_days} Day (s)
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
