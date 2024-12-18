import React from 'react'
import loadingImg from "../../assets/loading.png";
const LoadingPage = () => {
  return (
    <div className="imgContainer">
    <img
      src={loadingImg}
      alt=""
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  </div>
  )
}

export default LoadingPage