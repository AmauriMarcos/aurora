import React, { useState, useEffect } from "react";

interface AnimateProps {
  lat: number;
}

const AnimatedWave: React.FC<AnimateProps> = ({ lat }) => {
  const [svgWidth, setSvgWidth] = useState("0%");

  useEffect(() => {
    setSvgWidth("0%");
    const timeout = setTimeout(() => {
      setSvgWidth("100%");
    }, 100); 

    return () => clearTimeout(timeout);
  }, [lat]); 

  return (
    <div className="relative w-full h-[150px] overflow-hidden">
      <svg
        className={`absolute bottom-0 h-full translate-y-[2rem] transition-all duration-1000 ease-out`}
        style={{ width: svgWidth }} 
        viewBox="0 0 1440 150"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%">
            <stop offset="0%" style={{ stopColor: "#ffc981", stopOpacity: 1 }} />
            <stop offset="33%" style={{ stopColor: "#FEB183", stopOpacity: 1 }} />
            <stop offset="66%" style={{ stopColor: "#FFB284", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#edbb74", stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <path
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="5"
          d="M0,75 C240,0 480,150 720,75 C960,0 1200,150 1440,75"
        />
      </svg>
    </div>
  );
};

export default AnimatedWave;
