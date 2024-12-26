import React, { useEffect, useState } from "react";

const Counter = ({startValue,endValue,duration=1000}) => {
  const [count, setCount] = useState(startValue); // Start value
  useEffect(() => {
    const frameRate = 60; // Frames per second
    const totalFrames = Math.round(duration / (1000 / frameRate));
    const increment = (endValue - startValue) / totalFrames;
    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      setCount((prev) => Math.round(prev + increment));

      if (frame === totalFrames) {
        clearInterval(interval); // Stop the animation when complete
        setCount(endValue); // Ensure the final value is accurate
      }
    }, 1000 / frameRate);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <h1>
      {count}+
    </h1>
  );
};


export default Counter;
