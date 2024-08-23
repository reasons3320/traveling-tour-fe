import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Home from "../Components/Home/Home";
import Middle from "../Components/Middle/Middle";
import Portfolio from "../Components/Portfolio/Portfolio";
import Reviews from "../Components/Reviews/Reviews";
import Questions from "../Components/Questions/Questions";
import Subscribe from "../Components/Subscribe/Subscribe";
import Destinations from "../Components/Destinations/Destinations";
import Footer from "../Components/Footer/Footer";
import MasonryImagesGallery from "../Components/Image-gallery/MasonryImagesGallery";
import { MdArrowDropUp } from "react-icons/md";
import { BiArrowToTop } from "react-icons/bi";
import ButtonUp from "../Components/ButtonUp/ButtonUp";
const HomePage = () => {
  return (
    <>
      {/* <Navbar /> */}
      {/* Add more comments to test git command in Home Page */}
      {/* how about test again at 2:45 pm */}
      <Home />
      <Middle />
      <Destinations />
      <Portfolio />
      <Reviews />
      <Questions />
      <Subscribe />
      <MasonryImagesGallery />
      <ButtonUp />
      {/* <Footer /> */}
    </>
  );
};

export default HomePage;
