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
  feelsLike,
  humidity,
  windSpeed,
  windDeg,
}) => {
  // Function to convert wind degrees to compass direction
  const getWindDirection = (deg: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.floor(deg / 45 + 0.5) % 8;
    return directions[index];
  };

  // Convert wind speed from m/s to km/h
  const windSpeedKmh = (windSpeed * 3.6).toFixed(1);

  return (
    <div className="flex flex-col gap-0 my-[2rem]">
      <div className="flex  justify-between items-center h-[50px]">
        <h1 className="text-[4rem]">{Math.round(temperature)}&deg;</h1>
        <div className="flex items-center">
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
        {/* Display the humidity percentage */}
        <h3 className="text-[2rem] self-end translate-y-2 font-light">{humidity}%</h3>
        {/* Display wind speed and direction */}
        <p className="text-xs">
          Wind: {getWindDirection(windDeg)} {windSpeedKmh} km/h
        </p>
      </div>
    </div>
  );
};

export default Temperature;
