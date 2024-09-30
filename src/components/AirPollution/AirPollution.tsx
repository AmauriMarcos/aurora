"use client";
import React, { useState } from "react";

interface DotPollution {
  color: string;
  offset: number;
}

interface PMRange {
  id: number;
  category: string;
  rank: string;
  color: string;
  classification: string;
}

export const DotPollution: React.FC<DotPollution> = ({ color, offset }) => {
  return (
    <div
      className="w-5 h-5 rounded-full absolute translate-y-[-.7rem]"
      style={{ backgroundColor: color, left: `${offset}px` }}
    />
  );
};

const AirPollution = () => {
  const [pm25Range, set25Range] = useState("27 pm2.5");
  const pmRange: PMRange[] = [
    { id: 1, category: "Good", rank: "0 - 10", color: "#F8DD82", classification: 'safe' },
    { id: 2, category: "Fair", rank: "10 - 25", color: "#E6CA6D", classification: 'safe' },
    { id: 3, category: "Moderate", rank: "25 - 50", color: "#D7B64F", classification: 'safe' },
    { id: 4, category: "Poor", rank: "50 - 75", color: "#D48744", classification: 'dangerous' },
    { id: 5, category: "Very Poor", rank: ">= 75", color: "#E05252", classification: 'dangerous' },
  ];

  // Define the type for the grouped PM range
  type GroupedPMRange = {
    [key: string]: PMRange[];
  };

  // Group PM ranges by classification
  const groupedPmRange: GroupedPMRange = pmRange.reduce((acc: GroupedPMRange, pm) => {
    acc[pm.classification] = acc[pm.classification] || [];
    acc[pm.classification].push(pm);
    return acc;
  }, {});

  return (
    <div className="">
      <div
        className="flex items-center justify-between relative"
        style={{ height: "30px" }}
      >
        <div className="flex relative">
          {pmRange.reverse().map((pm, index) => (
            <DotPollution key={pm.id} color={pm.color} offset={index * 13} />
          ))}
        </div>
        <div className="flex gap-2 items-center">
          <span
            className="w-1 h-1 rounded-full"
            style={{ backgroundColor: "#F8DD82" }}
          ></span>
          <h3 className="text-[1rem]">{pm25Range}</h3>
        </div>
      </div>
      <div className="mt-6 flex justify-between">
        {Object.keys(groupedPmRange).map((classification) => (
          <div className="flex flex-col gap-2" key={classification}>
            <h6 className="text-xs">{classification.charAt(0).toUpperCase() + classification.slice(1)}</h6>
            <div className="flex flex-col gap-0">
              {groupedPmRange[classification].map(pm => (
                <div className="flex items-center gap-2" key={pm.id}>
                  <span
                    className="w-1 h-1 rounded-full"
                    style={{ backgroundColor: pm.color }}
                  ></span>
                  <p className="text-[.75rem] ">{pm.rank}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AirPollution;
