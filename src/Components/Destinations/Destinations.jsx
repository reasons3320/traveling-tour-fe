import React, { useEffect, useState } from "react";
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
  const navigate = useNavigate();
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
          {data?.data?.slice(0, 10).map((item,index) => (
            <div
            onClick={()=>{
                navigate("/tours")
            }}
              className="singleDestination"
              key={item._id}
              data-aos="fade-up"
            >
           <DestinationCard item={item} key={index}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Destinations;
