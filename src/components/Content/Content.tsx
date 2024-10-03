import React from "react";
import WeatherForecast from "../WeatherForecast/WeatherForecast";
import AirPollutionSummary from "../AirPollutionSummary/AirPollutionSummary";
import DailyTemperature from "../DailyTemperature/DailyTemperature";
import AnimatedWave from "./AnimateWave";
import { WeatherData } from "@/app/types/weatherApi";
import { SkeletonContent } from "./SkeletonContent";

interface ContentProps {
  weatherData: WeatherData;
}

const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Content: React.FC<ContentProps> = ({ weatherData }) => {
  // Add safe check for weatherData.daily being an array

  if (!weatherData || !weatherData.current || !Array.isArray(weatherData.daily) || weatherData.daily.length === 0) {
    return <SkeletonContent/>;
  }

  const main = weatherData.current.weather[0].main;
  const description = weatherData.current.weather[0].description;
  const icon = weatherData.current.weather[0].icon;
  const lat = weatherData.lat;
  const lon = weatherData.lon;

  // Map daily weather data
  const dailyWeather = weatherData.daily.slice(1, 7).map((day) => {
    const dayOfTheWeek = new Date(
      (day.dt + weatherData.timezone_offset) * 1000
    );
    const dayName = weekday[dayOfTheWeek.getUTCDay()];

    return {
      dayName,
      temp: Math.round(day.temp.max), // Using max temperature
      min: Math.round(day.temp.min),
      max: Math.round(day.temp.max),
      icon: day.weather[0].icon,
    };
  });

  return (
    <div className="flex flex-col h-full overflow-x-hidden gap-[2rem]">
      <div className="mt-5 p-6 ml-10">
        <h2 className="uppercase text-[.75rem]">Aurora</h2>
        <div className="flex w-[53px] justify-between">
        <h2 className="uppercase text-[.75rem] translate-y-[-5px]">c</h2>
        <h2 className="uppercase text-[.75rem] translate-y-[-5px]">a</h2>
        <h2 className="uppercase text-[.75rem] translate-y-[-5px]">s</h2>
        <h2 className="uppercase text-[.75rem] translate-y-[-5px]">t</h2>
        </div>
       
      </div>
      <div className="p-6 ml-10 w-full">
        <WeatherForecast main={main} description={description} />
        <AirPollutionSummary icon={icon} latitude={lat} longitude={lon} />
      </div>

      <div className="relative w-full h-[150px] overflow-hidden">
        <div className="absolute w-[90%] ml-16 h-full flex justify-between items-center translate-y-[-1.6rem]">
          {dailyWeather.map((day, index) => (
            <div key={index} className="flex flex-col">
              <p className="text-[white] ">high {day.max}°C</p>
              <p className="text-white ">low {day.min}°C</p>
            </div>
          ))}
        </div>
        <AnimatedWave key={lat} lat={lat} />
      </div>

      <DailyTemperature daily={dailyWeather} />
    </div>
  );
};

export default Content;
