import React from "react";

interface TemperatureProps {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  windDeg: number;
}

const Temperature: React.FC<TemperatureProps> = ({
  temperature,
  humidity,
  windSpeed,
  windDeg,
}) => {
  const getWindDirection = (deg: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.floor(deg / 45 + 0.5) % 8;
    return directions[index];
  };

  const windSpeedKmh = (windSpeed * 3.6).toFixed(1);

  return (
    <div className="flex flex-col gap-6 md:gap-0 my-[2rem]">
      <div className="flex justify-center  md:justify-between items-center h-[50px]">
        <h1 className="text-[4.5rem] md:text-[4rem] item  ">{Math.round(temperature)}&deg;C</h1>
        <div className="hidden  items-center">
          <div className="flex flex-col gap-0">
            <div className="mr-4 text-[1.6rem] translate-y-[2rem] translate-x-[-.8rem]">
              +
            </div>
            <div className="mr-4 text-[1.6rem] ">/</div>
            <div className="text-[1.6rem] translate-y-[-2.3rem] translate-x-2">
              _
            </div>
          </div>
          <h3 className="text-[4rem]">3</h3>
        </div>
      </div>
      <div className="flex justify-between items-end">
        <h3 className="text-[2rem] self-end translate-y-2 font-light">{humidity}%</h3>
        <p className="text-xs">
          Wind: {getWindDirection(windDeg)} {windSpeedKmh} km/h
        </p>
      </div>
    </div>
  );
};

export default Temperature;
