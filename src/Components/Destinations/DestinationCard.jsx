import Aos from "aos";
import React, { useEffect } from "react";
import { TiLocation } from "react-icons/ti";
import { averageCounting } from "../../utils/totalRateCounting";
import './DestinationCard.scss'
import { BiStar, BiSun } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
const DestinationCard = ({ item, key }) => {
  const navigate = useNavigate();
  const average = averageCounting(item?.reviews);
  const handleNavigate = ()=>{
    navigate('/tours')
  }
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  
  return (
    <div className="imgDiv" data-aos="fade-up" >
      <div className="types">
        {item?.types?.map((item,index) => (
          <div className="type-item" key={index}>{item.name}</div>
        ))}
      </div>
      <img src={item.photo} alt="Destination"  onClick={handleNavigate}/>
      <div className="descInfo flex">
        <div className="text">
          <div className="text-title">
            <TiLocation className="icon" />
            {item.title}
          </div>
        <div className="rating">{average} <BiStar className="icon"/> </div>
        </div>
        <div className="imgDiv-content">
        <h6>{item.price} VND/Person</h6>
        <div>
          <BiSun/> 
          {item.duration_days} Day (s) 
        </div>
      </div>
      </div>
 
    </div>
  );
};

export default DestinationCard;
