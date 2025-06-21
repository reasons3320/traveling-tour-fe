import React, { useEffect, useRef, useState } from "react";

const Counter = ({ startValue, endValue, duration = 1000 }) => {
  const [count, setCount] = useState(startValue);
  const ref = useRef();
  const intervalRef = useRef(null); // To store interval ID

  // IntersectionObserver: detect scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startCounting();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  // The counting logic
  const startCounting = () => {
    // Clear previous interval if any
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setCount(startValue);
    const frameRate = 60;
    const totalFrames = Math.round(duration / (1000 / frameRate));
    const increment = (endValue - startValue) / totalFrames;
    let frame = 0;

    intervalRef.current = setInterval(() => {
      frame++;
      setCount((prev) => Math.round(prev + increment));

      if (frame === totalFrames) {
        clearInterval(intervalRef.current);
        setCount(endValue);
      }
    }, 1000 / frameRate);
  };

  return <h1 ref={ref}>{count}+</h1>;
};

export default Counter;
