'use client';
import { useState } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function Home() {
  const [weatherCondition, setWeatherCondition] = useState<string | null>(null);

  // Grouping weather conditions into broader categories
  const weatherBackgrounds: Record<string, string> = {
    storm: '/storm1.jpg', // For thunderstorms, squalls, etc.
    clouds: '/cloudy2.jpg', // For clouds, overcast, foggy
    rain: '/rainny.jpg', // For rain, drizzle
    clear: '/sunny16.jpg', // For clear skies, sunny weather
    snow: '/snow2.jpg', // For snow conditions
    misc: '/neutral.jpg', // For haze, dust, ash, etc.
  };

  // Function to map specific weather conditions to grouped categories
  const mapWeatherConditionToGroup = (condition: string): string => {
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
      return "clear";
    }
    if (["snow"].includes(lowerCaseCondition)) {
      return "snow";
    }
    return "misc"; // For haze, ash, etc.
  };

  // Determine the background image URL based on the weather condition
  const backgroundGroup = weatherCondition ? mapWeatherConditionToGroup(weatherCondition) : '';
  const backgroundImage = backgroundGroup ? weatherBackgrounds[backgroundGroup] : '';

  console.log('backgroundImage:', backgroundImage);

  return (
    <div
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        color: 'rgba(255, 255, 255, 0.9)' // Adjust text color for visibility
      }}
      className="grid grid-cols-[280px_1fr]"
    >
      <aside className="p-4 border-r border-solid border-white/10 rounded-r-2xl bg-white/10 backdrop-blur-md shadow-md border-zinc-400">
        <Sidebar setWeatherCondition={setWeatherCondition} />
      </aside>

      <main className="bg-transparent p-6 overflow-y-auto">Main Content</main>
    </div>
  );
}
