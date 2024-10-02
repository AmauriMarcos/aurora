"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import Content from "@/components/Content/Content";
import tzlookup from "tz-lookup";
import { WeatherData } from "./types/weatherApi";

export default function Home() {
  const [weatherCondition, setWeatherCondition] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);


  // Predefined fallback location (e.g., New York)
  const predefinedLocation = {
    lat: 40.7128, // New York latitude
    lon: -74.0060, // New York longitude
  };

  // Function to request user location or fallback to predefined location
  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
      
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
     
          }
        }
      );
    } else {
   
    }
  };



  // Request location on mount
  useEffect(() => {
    requestLocation();
  }, []);

  // Define background based on weather condition
  const weatherBackgrounds: Record<string, string> = {
    storm: "/storm1.jpg",
    clouds: "/cloudy2.jpg",
    rain: "/rainny.jpg",
    clear: "/sunny16.jpg",
    snow: "/snow2.jpg",
    misc: "/neutral.jpg",
    night: "/night2.jpg",
  };

  const mapWeatherConditionToGroup = (
    condition: string,
    isNight: boolean
  ): string => {
    const lowerCaseCondition = condition.toLowerCase();

    if (["thunderstorm", "squall", "tornado"].includes(lowerCaseCondition)) {
      return "storm";
    }
    if (["clouds"].includes(lowerCaseCondition)) {
      return "clouds";
    }
    if (["rain", "drizzle"].includes(lowerCaseCondition)) {
      return "rain";
    }
    if (["clear"].includes(lowerCaseCondition)) {
      return isNight ? "night" : "clear";
    }
    if (["snow"].includes(lowerCaseCondition)) {
      return "snow";
    }
    return "misc";
  };

  let backgroundGroup = "";
  if (weatherCondition) {
    let isNight = false;
    if (weatherData && weatherData.lat && weatherData.lon) {
      const latitude = weatherData.lat;
      const longitude = weatherData.lon;
      const timeZone = tzlookup(latitude, longitude);

      const formatter = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        hour12: false,
        timeZone: timeZone,
      });
      const localHour = parseInt(formatter.format(new Date()), 10);

      if (localHour >= 18 || localHour < 6) {
        isNight = true;
      }
    }
    backgroundGroup = mapWeatherConditionToGroup(weatherCondition, isNight);
  }

  const backgroundImage = backgroundGroup
    ? `linear-gradient(to bottom, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0.7) 100%), url(${weatherBackgrounds[backgroundGroup]})`
    : ``;

  return (
    <div
      style={{
        backgroundImage: backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "rgba(255, 255, 255, 0.9)",
        minHeight: "100vh",
      }}
      className="md:grid md:grid-cols-[280px_1fr]"
    >
      <aside className="p-4 border-r border-solid border-white/10 md:rounded-r-2xl bg-white/10 backdrop-blur-none md:backdrop-blur-md shadow-md border-zinc-400">
        <Sidebar
          setWeatherCondition={setWeatherCondition}
          setWeatherData={setWeatherData}
        />
      </aside>

      <main className="hidden md:block bg-transparent overflow-y-auto">
        {weatherData && <Content weatherData={weatherData} />}
      </main>
    </div>
  );
}
