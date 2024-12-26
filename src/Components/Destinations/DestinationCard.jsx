import Aos from 'aos';
import React, { useEffect } from 'react'

import { TiLocation } from "react-icons/ti";
import { averageCounting } from '../../utils/totalRateCounting';
const DestinationCard = ({item,key}) => {
    const average = averageCounting(item?.reviews);
     useEffect(() => {
        Aos.init({ duration: 2000 });
      }, []);
  return (
        <div className="imgDiv" >
                  <img src={item.photo} alt="Destination" data-aos="fade-up"/>
                  <div className="descInfo flex">
                    <div className="text">
                      <span className="name">{item.address}</span>
                      <p className="flex">
                        <TiLocation className="icon" />
                        {item.title}
                      </p>
                    </div>
                    <span className="rating">{average}</span>
                  </div>
                </div>
  )
}

export default DestinationCard