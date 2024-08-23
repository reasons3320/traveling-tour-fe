import React, { useEffect } from "react";
import "./BlogCard.scss";
import scene from "../../assets/traveling.jpg";
import Aos from "aos";
import "aos/dist/aos.css";
import { limitCharacters } from "../../data/blogs";
import { useNavigate } from "react-router-dom";
const BlogCard = ({ blog }) => {
  const navigate = useNavigate();
  const { id, email, photo, likes, createDate, content } = blog || {};
  const handleNavigate = () => {
    navigate(`/blogDetail/${id}`);
  };
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <div class="blogCard" data-aos="fade-up" onClick={handleNavigate}>
      <img src={photo} alt="Scenic view of Portugal" data-aos="fade-up" />
      <div class="blogCard-content" data-aos="fade-up">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="white"
            fill-opacity="1"
            d="M0,256L21.8,229.3C43.6,203,87,149,131,128C174.5,107,218,117,262,138.7C305.5,160,349,192,393,170.7C436.4,149,480,75,524,48C567.3,21,611,43,655,90.7C698.2,139,742,213,785,256C829.1,299,873,309,916,298.7C960,288,1004,256,1047,224C1090.9,192,1135,160,1178,138.7C1221.8,117,1265,107,1309,128C1352.7,149,1396,203,1418,229.3L1440,256L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z"
          ></path>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="white"
            fill-opacity="0.5"
            d="M0,288L21.8,261.3C43.6,235,87,181,131,160C174.5,139,218,149,262,133.3C305.5,117,349,75,393,53.3C436.4,32,480,32,524,53.3C567.3,75,611,117,655,160C698.2,203,742,245,785,245.3C829.1,245,873,203,916,192C960,181,1004,203,1047,197.3C1090.9,192,1135,160,1178,170.7C1221.8,181,1265,235,1309,240C1352.7,245,1396,203,1418,181.3L1440,160L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z"
          ></path>
        </svg>
        {/* <div class="blogCard-title">Portugal: A Tapestry History</div> */}
        <div class="blogCard-description">
          <p>{limitCharacters(content)}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
