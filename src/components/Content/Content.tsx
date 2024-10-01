import React from "react";
import WeatherForecast from "../WeatherForecast/WeatherForecast";
import AirPollutionSummary from "../AirPollutionSummary/AirPollutionSummary";

interface ContentProps {
  weatherData: any; // We'll refine this type in the next step
}

const Content: React.FC<ContentProps> = ({ weatherData }) => {
  if (
    !weatherData ||
    !weatherData.current ||
    !weatherData.lat ||
    !weatherData.lon ||
    !weatherData.current.weather ||
    weatherData.current.weather.length === 0
  ) {
    // Handle the loading or error state here
    return <div>Loading weather data...</div>;
  }

  const main = weatherData.current.weather[0].main;
  const description = weatherData.current.weather[0].description;
  const icon = weatherData.current.weather[0].icon;
  const dt = weatherData.current.dt;
  const timezone_offset = weatherData.timezone_offset;
  const lat = weatherData.lat;
  const lon = weatherData.lon;

  console.log("____", weatherData);

  return (
    <div className="flex flex-col h-full ml-10">
      <div className="mt-5">
        <h2 className="uppercase text-[.75rem]">Aurora</h2>
        <h2 className="uppercase text-[.75rem] translate-y-[-5px]">Forecast</h2>
      </div>
      <WeatherForecast main={main} description={description} />
      <AirPollutionSummary icon={icon} latitude={lat} longitude={lon} />
    </div>
  );
};

export default Content;
