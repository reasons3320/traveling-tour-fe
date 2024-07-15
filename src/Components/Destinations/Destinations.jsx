import React, { useEffect, useState } from "react";
import "./Destinations.scss";
import { MdLocationPin } from "react-icons/md";
import { BsCreditCard, BsCreditCardFill } from "react-icons/bs";
import { BsCalendarDateFill } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import img1 from "../../assets/halong1.jpg";
import img2 from "../../assets/halong2.jpg";
import img3 from "../../assets/halong3.jpg";
import img4 from "../../assets/halong4.jpg";

import { TiLocation } from "react-icons/ti";
import Aos from "aos";
import "aos/dist/aos.css";
import { NavLink } from "react-router-dom";
import { useToursQuery } from "../../helper/tourQuery";
const destinations = [
  {
    id: 1,
    img: img1,
    name: "Vinh Ha Long",
    location: "Viet Nam",
    rating: 4.7,
  },
  {
    id: 2,
    img: img2,
    name: "Vinh Ha Long 2",
    location: "Viet Nam",
    rating: 4,
  },
  {
    id: 3,
    img: img3,
    name: "Vinh Ha Long 3",
    location: "Viet Nam",
    rating: 3.5,
  },
  {
    id: 4,
    img: img4,
    name: "Vinh Ha Long 4",
    location: "Viet Nam",
    rating: 2,
  },
];
const menuLists = [
  {
    title: "All",
  },
  {
    title: "Recommended",
  },
  {
    title: "Park",
  },
  {
    title: "Nature",
  },
  {
    title: "Mountain",
  },
];
const Destinations = () => {
  const [isActive, setIsActive] = useState("All");
  const handleSetActive = (title) => {
    setIsActive(title);
  };
  const { data } = useToursQuery(0, "", []);
  console.log(data);
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <div className="destination section container">
      <div className="secContainer">
        <div className="secTitle">
          <span className="redText" data-aos="fade-up">
            EXPLORE NOW
          </span>
          <h3 data-aos="fade-up">Find Your Dream Destination</h3>
          <p data-aos="fade-up">
            Fill in the fields below to find the best spot for your next tour
          </p>
        </div>
        <div className="searchField grid">
          <div className="inputField flex" data-aos="fade-up">
            <MdLocationPin className="icon" />
            <input type="text" placeholder="Location" />
          </div>
          {/* <div className="inputField flex" data-aos="fade-up">
            <BsCreditCardFill className="icon" />
            <input type="text" placeholder="Budget" />
          </div>
          <div className="inputField flex" data-aos="fade-up">
            <BsCalendarDateFill className="icon" />
            <input type="text" placeholder="Date" />
          </div> */}
          {/* <div className="btn flex" data-aos="fade-up">
            <BiSearchAlt className="icon" />
            Search
          </div> */}
        </div>
        <div className="secMenu">
          <ul className="flex" data-aos="fade-up">
            {menuLists.map((item, index) => (
              <li
                key={index}
                value={item.title}
                onClick={() => handleSetActive(item.title)}
                className={item.title === isActive ? "active" : ""}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="destinationContainer grid">
          {data?.slice(0, 6).map((item) => (
            <div
              className="singleDestination"
              key={item._id}
              data-aos="fade-up"
            >
              <div className="imgDiv" data-aos="fade-up">
                <img src={item.photo} alt="Destination" />
                <div className="descInfo flex">
                  <div className="text">
                    <span className="name">{item.address}</span>
                    <p className="flex">
                      <TiLocation className="icon" />
                      {item.title}
                    </p>
                  </div>
                  <span className="rating">3.5</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Destinations;
