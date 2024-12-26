import React, { useEffect } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import galleryImages from "./galerryImages";
import Aos from "aos";
const MasonryImagesGallery = () => {
  useEffect(()=>{
    Aos.init({
      duration:2000
    })
  },[])
  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{ 350: 1, 768: 3, 992: 4 }}
      className="container"
    >
      <div className="textDiv">
        <h4 data-aos="fade-up">Gallery!</h4>
        <p data-aos="fade-up">
          We offer personalized itineraries tailored to individual preferences
          and interests
        </p>
      </div>
      <Masonry gutter="1rem">
        {galleryImages.map((item, index) => (
          <img
          data-aos="fade-up"
          data-aos-duration={`${2000 + index*100}`}
            className="masonry__img"
            src={item}
            alt=""
            key={index}
            style={{ width: "100%", display: "block", borderRadius: "10px" }}
          />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default MasonryImagesGallery;
