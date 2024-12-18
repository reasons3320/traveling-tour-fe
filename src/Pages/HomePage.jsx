import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Home from "../Components/Home/Home";
import Middle from "../Components/Middle/Middle";
import Portfolio from "../Components/Portfolio/Portfolio";
import Reviews from "../Components/Reviews/Reviews";
import Questions from "../Components/Questions/Questions";
import Subscribe from "../Components/Subscribe/Subscribe";
import Destinations from "../Components/Destinations/Destinations";
import MasonryImagesGallery from "../Components/Image-gallery/MasonryImagesGallery";
import ButtonUp from "../Components/ButtonUp/ButtonUp";
const HomePage = () => {
  return (
    <>
      <Home />
      <Middle />
      <Destinations />
      <Portfolio />
      <Reviews />
      <Questions />
      <Subscribe />
      <MasonryImagesGallery />
      <ButtonUp />
    </>
  );
};

export default HomePage;
