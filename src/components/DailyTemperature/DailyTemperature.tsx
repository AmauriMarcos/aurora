import React from "react";
import Image from "next/image";

interface Daily {
  dayName: string;
  temp: number;
  min: number;
  max: number;
  icon: string;
}

interface DailyTemperatureProps {
  daily: Daily[];
}

const DailyTemperature: React.FC<DailyTemperatureProps> = ({ daily }) => {
  const firstBar = [
    { id: 1, color: "#ffc981", width: "100%" },
    { id: 2, color: "#FEB183", width: "100%" },
    { id: 3, color: "#FFB284", width: "100%" },
    { id: 4, color: "#F06D6E", width: "100%" },
    { id: 5, color: "#fece85", width: "100%" },
    { id: 6, color: "#edbb74", width: "100%" },
  ];

  const secondBar = [
    { id: 1, color: "#AC9873", width: "93%" },
    { id: 2, color: "#977260", width: "93%" },
    { id: 3, color: "#9F7660", width: "97%" },
    { id: 4, color: "#A3575A", width: "93%" },
    { id: 5, color: "#94805F", width: "42%" },
    { id: 6, color: "#978768", width: "97%" },
  ];

  return (
    <div className="h-auto w-[90%] flex items-start ml-16 translate-y-[-2rem]">
      <div className="mt-5 flex w-full flex-col ">
        <div className=" mt-5 flex w-full justify-between">
          {daily.map((day, idx) => (
            <div key={idx} className="flex flex-col items-center relative">
              <p className="text-[2rem] ">{day.temp}°C</p>

              <p className=" text-[2rem] font-thin">{day.dayName}</p>

              {/* First and Second Bars */}
              <div className="w-full mt-2">
                <span
                  className="block rounded-md h-1 mb-1"
                  style={{
                    backgroundColor: firstBar[idx % firstBar.length].color,
                    width: firstBar[idx % firstBar.length].width,
                  }}
                ></span>
                <span
                  className="block rounded-md h-1"
                  style={{
                    backgroundColor: secondBar[idx % secondBar.length].color,
                    width: secondBar[idx % secondBar.length].width,
                  }}
                ></span>
              </div>
              
              <img
                src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`}
                alt={`${day.dayName} weather icon`}
                className="w-14 h-14 "
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DailyTemperature;
