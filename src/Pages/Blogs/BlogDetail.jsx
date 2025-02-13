import React, { useEffect, useState } from "react";
import { SlLike } from "react-icons/sl";
import { blogs } from "../../data/blogs";
import { useParams } from "react-router-dom";
import "./BlogDetail.scss";
import { RxAvatar } from "react-icons/rx";
import { FaEarthAfrica } from "react-icons/fa6";
import moment from "moment";
const BlogDetail = () => {
  const blogId = useParams().blogId || "";
  const [data, setData] = useState();
  useEffect(() => {
    blogs.map((blog) => {
      if (blog.id === parseInt(blogId)) {
        setData(blog);
      }
    });
  }, [blogId]);
  return (
    <div className="blogDetailContainer">
      {/* <div
        style={{
          height: 100,
        }}
      ></div> */}
      <div className="blogDetailLeftSide">
        <img src={data?.photo} alt="" />
      </div>
      <div className="blogDetailRightSide">
        <div className="blogDetailRightSideContainer">
          <div className="blogDetailHeader">
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                gap: ".2rem",
              }}
            >
              <span>
                <RxAvatar size={30} />
              </span>
              <div
                style={{
                  fontWeight: 300,
                }}
              >
                <h5>{data?.email}</h5>
                <p
                  style={{
                    color: "gray",
                    display:'flex',
                    gap:5,
                    alignItems:'center'
                  }}
                >
                  <span>
                  <FaEarthAfrica /> 
                  </span>
                  {
                    moment(data?.createDate, "DDMMYYYY").fromNow()
                  }
                </p>
              </div>
            </div>
          </div>
          <div className="blogDetailContent">
            <p>{data?.content}</p>
          </div>
          <div className="blogDetailLike">
            <div className="blogDetailLikeNumber">
              <SlLike className="blogDetailIcon" />
              {data?.likes}
            </div>
            <div className="blogDetailButton">
              <button className="blogDetailButtonItems">Comment</button>
            </div>
          </div>
        </div>
        <div className="blogDetailComment">
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
