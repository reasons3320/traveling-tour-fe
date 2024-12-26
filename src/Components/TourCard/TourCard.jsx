import React, { Suspense, useEffect } from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import "./TourCard.scss";
// import calculateAvgRating from "../utils/avgRating";
import Aos from "aos";
import "aos/dist/aos.css";
import { FaLocationDot } from "react-icons/fa6";
import { Tag } from "antd";
import Glimmer from "../Suspense/Glimmer.jsx";
import { FcStart } from "react-icons/fc";
import { BiStar } from "react-icons/bi";
import { averageCounting } from "../../utils/totalRateCounting.js";
const TourCard = ({ tour }) => {
  const {
    _id,
    title,
    location,
    photo,
    price,
    featured,
    reviews,
    types,
    duration_days,
    maxGroupSize,
  } = tour;
  const totalRate = averageCounting(reviews);
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <div
      className="tour__card"
      data-aos="flip-left"
      data-aos-easing="ease-out-cubic"
      data-aos-offset="0"
    >
      <Card>
        <div className="tour__img">
          <div className="average-rate">
            <div className="average-rate-number">{totalRate}</div>
            <div className="star-icon"> <BiStar /></div>
            <div className="average-rate-types">
              {types?.map((type, index) => (
                <div
                className="types-tag"
                  key={index}
                >
                  {type.name}
                </div>
              ))}
            </div>
          </div>

          <img src={photo} alt="" />
          {featured && <span>Featured</span>}
        </div>
        <CardBody>
          <div className="card__top">
            {/* <div className="tour__rating d-flex align-items-center gap-1">
            </div> */}
            <div className="card__position">
              <div>
                <span className="">
                  <FaLocationDot />
                </span>
                <div className="city">{location}</div>
              </div>
              <div className="card__top__duration">
                Duration : {duration_days} Days
              </div>
            </div>
            <div className="card__top__groupSize">
              Available:{maxGroupSize} slots
            </div>
          </div>
          <h5 className="tour__title">
            <Link to={`/tours/${_id}`}>{title}</Link>
          </h5>
          <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
            <h5>
              ${price}
              <span>/person</span>
            </h5>
            <button className="btn booking__btn">
              <Link to={`/tours/${_id}`}>Book Now</Link>
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default TourCard;
