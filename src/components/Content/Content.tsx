
import React from "react";
import WeatherForecast from "../WeatherForecast/WeatherForecast";
import AirPollutionSummary from "../AirPollutionSummary/AirPollutionSummary";
import DailyTemperature from "../DailyTemperature/DailyTemperature";
import AnimatedWave from "./AnimateWave";

interface DailyWeather {
  dt: number;
  temp: {
    day: number;
    min: number;
    max: number;
  };
  weather: {
    icon: string;
  }[];
}

interface ContentProps {
  weatherData: {
    daily: DailyWeather[];
    current: {
      weather: {
        main: string;
        description: string;
        icon: string;
      }[];
      dt: number;
    };
    lat: number;
    lon: number;
    timezone_offset: number;
  };
}

const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Content: React.FC<ContentProps> = ({ weatherData }) => {
  if (
    !weatherData ||
    !weatherData.current ||
    !weatherData.lat ||
    !weatherData.lon ||
    !weatherData.daily || // Ensure daily data exists
    weatherData.daily.length === 0
  ) {
    return <div>Loading weather data...</div>;
  }

  // Extract necessary data for current weather
  const main = weatherData.current.weather[0].main;
  const description = weatherData.current.weather[0].description;
  const icon = weatherData.current.weather[0].icon;
  const dt = weatherData.current.dt;
  const timezone_offset = weatherData.timezone_offset;
  const lat = weatherData.lat;
  const lon = weatherData.lon;

  // Process daily weather data
  const dailyWeather = weatherData.daily
    .slice(1, 7)
    .map((day: any, idx: number) => {
      const dayOfTheWeek = new Date(
        (day.dt + weatherData.timezone_offset) * 1000
      ); // Adjust for timezone offset
      const dayName = weekday[dayOfTheWeek.getUTCDay()]; // Get day name based on UTC

      return {
        dayName,
        temp: Math.round(day.temp.day),
        min: Math.round(day.temp.min),
        max: Math.round(day.temp.max),
        icon: day.weather[0].icon,
      };
    });

  return (
    <div className="flex flex-col h-full overflow-x-hidden ">
      <div className="mt-5 p-6 ml-10">
        <h2 className="uppercase text-[.75rem]">Aurora</h2>
        <h2 className="uppercase text-[.75rem] translate-y-[-5px]">Forecast</h2>
      </div>
      <div className="p-6 ml-10 w-full">
        <WeatherForecast main={main} description={description} />
        <AirPollutionSummary icon={icon} latitude={lat} longitude={lon} />
      </div>

      <div className="relative w-full h-[150px] overflow-hidden ">
        <div className="absolute w-[90%] ml-14 h-full flex justify-between items-center translate-y-[-1.6rem]">
          {dailyWeather.map((day, index) => (
            <div key={index} className="flex flex-col ">
              <p className="text-[white] ">high {day.max}°C</p>
              <p className="text-white ">low {day.min}°C</p>
            </div>
          ))}
        </div>
       <AnimatedWave key={lat} lat={lat} />
      </div>

      <DailyTemperature daily={dailyWeather}  />
    </div>
  );
};

export default Content;
