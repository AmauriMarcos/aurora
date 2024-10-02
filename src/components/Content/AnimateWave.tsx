import React, { useState, useEffect } from "react";

interface AnimateProps {
  lat: number;
}

const AnimatedWave: React.FC<AnimateProps> = ({ lat }) => {
  // State for controlling SVG width
  const [svgWidth, setSvgWidth] = useState("0%");

  // Trigger the animation when the component mounts or lat changes
  useEffect(() => {
    // Reset svgWidth to 0% immediately to create a fresh start
    setSvgWidth("0%");
    
    // Then set it to 100% with a delay for animation
    const timeout = setTimeout(() => {
      setSvgWidth("100%");
    }, 100); // Delay to start the animation

    return () => clearTimeout(timeout);
  }, [lat]); // The animation will re-trigger whenever lat changes

  return (
    <div className="relative w-full h-[150px] overflow-hidden">
      <svg
        className={`absolute bottom-0 h-full translate-y-[2rem] transition-all duration-1000 ease-out`}
        style={{ width: svgWidth }} // Bind the dynamic width state here
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
