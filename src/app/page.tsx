'use client';
import { useState } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import Content from "@/components/Content/Content";
import tzlookup from "tz-lookup";

export default function Home() {
  const [weatherCondition, setWeatherCondition] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<any>(null);

  // Update your weather backgrounds to include 'night'
  const weatherBackgrounds: Record<string, string> = {
    storm: '/storm1.jpg',
    clouds: '/cloudy2.jpg',
    rain: '/rainny.jpg',
    clear: '/sunny16.jpg',
    snow: '/snow2.jpg',
    misc: '/neutral.jpg',
    night: '/night2.jpg', // For clear night
  };

  // Update mapWeatherConditionToGroup to accept isNight
  const mapWeatherConditionToGroup = (condition: string, isNight: boolean): string => {
    const lowerCaseCondition = condition.toLowerCase();

    if (["thunderstorm", "squall", "tornado"].includes(lowerCaseCondition)) {
      return "storm";
    }
    if (["clouds", "fog", "mist", "haze", "smoke", "dust", "sand", "ash"].includes(lowerCaseCondition)) {
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

  // Determine the background image URL based on the weather condition
  let backgroundGroup = '';
  if (weatherCondition) {
    let isNight = false;
    if (weatherData && weatherData.lat && weatherData.lon) {
      const latitude = weatherData.lat;
      const longitude = weatherData.lon;
      const timeZone = tzlookup(latitude, longitude);

      // Get current time in the location's time zone
      const formatter = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        hour12: false,
        timeZone: timeZone,
      });
      const localHour = parseInt(formatter.format(new Date()), 10);

      // Check if it's night time
      if (localHour >= 18 || localHour < 6) {
        isNight = true;
      }
    }
    backgroundGroup = mapWeatherConditionToGroup(weatherCondition, isNight);
  }

  const backgroundImage = backgroundGroup ? weatherBackgrounds[backgroundGroup] : '';

  return (
    <div
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'rgba(255, 255, 255, 0.9)',
        minHeight: '100vh',
      }}
      className="grid grid-cols-[280px_1fr]"
    >
      <aside className="p-4 border-r border-solid border-white/10 rounded-r-2xl bg-white/10 backdrop-blur-md shadow-md border-zinc-400">
        <Sidebar
          setWeatherCondition={setWeatherCondition}
          setWeatherData={setWeatherData}
        />
      </aside>

      <main className="bg-transparent p-6 overflow-y-auto">
        <Content weatherData={weatherData} />
      </main>
    </div>
  );
}
