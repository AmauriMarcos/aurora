"use client";
import Search from "../Search/Search";
import React, {useState} from "react";
import Temperature from "../Temperature/Temperature";
import AirPollution from "../AirPollution/AirPollution";
import { useQuery } from "@tanstack/react-query";
import { fetchWeatherInfoOneCall } from "@/app/server/weatherApi";

const Sidebar = () => {
  const [text, setText] = useState('');
  const { data, isLoading, isError } = useQuery({
    queryKey: ["weather"],
    queryFn: fetchWeatherInfoOneCall,
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching weather data</div>;
  }

  const onSubmit = () => {
    console.log("")
  }

  return (
    <div className="flex flex-col gap-[5rem] p-4 ">
      <Search setText={(e) => setText(e.target.value)} onSubmit={onSubmit} />
      <Temperature
        temperature={data.current.temp}
        feelsLike={data.current.feels_like}
        humidity={data.current.humidity}
        windSpeed={data.current.wind_speed}
        windDeg={data.current.wind_deg}
      />

      <AirPollution />
    </div>
  );
};

export default Sidebar;
