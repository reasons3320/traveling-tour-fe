import React, { useEffect, useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import "./ButtonUp.scss";
import { Button } from "reactstrap";
const ButtonUp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const handleGoToTop = () => {
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Call handleScroll once when component mounts
    handleScroll();

    // Add scroll event listener to check scroll position continuously
    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    isVisible && (
      <div className="btn__up" onClick={handleGoToTop}>
        <FaArrowCircleUp className="icon" />
      </div>
    )
  );
};

export default ButtonUp;
