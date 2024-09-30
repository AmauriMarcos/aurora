// Sidebar.tsx
"use client";
import Search from "../Search/Search";
import React, { useEffect, useState } from "react";
import Temperature from "../Temperature/Temperature";
import AirPollution from "../AirPollution/AirPollution";
import { useQuery } from "@tanstack/react-query";
import { fetchWeatherInfoOneCall } from "@/app/server/weatherApi";
import * as Geocode from "react-geocode";

const Sidebar: React.FC = () => {
  const [text, setText] = useState('');
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  // Set up Geocode API key on component mount
  useEffect(() => {
    Geocode.setKey(process.env.NEXT_PUBLIC_KEY!); // Use your API key
    Geocode.setLanguage("en");
    Geocode.setRegion("us"); // Set your default region if needed
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission
    try {
      const response = await Geocode.fromAddress(text);
      if (response.results.length > 0) {
        const { lat, lng } = response.results[0].geometry.location;
        setLocation({ lat, lng });
        console.log(`Latitude: ${lat}, Longitude: ${lng}`);
      } else {
        console.error("No results found for the provided address.");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  console.log(location);

  return (
    <div className="flex flex-col gap-[5rem] p-4 ">
      <Search setText={(e) => setText(e.target.value)} onSubmit={handleSubmit} />
      {data && (
        <Temperature
          temperature={data.current.temp}
          feelsLike={data.current.feels_like}
          humidity={data.current.humidity}
          windSpeed={data.current.wind_speed}
          windDeg={data.current.wind_deg}
        />
      )}
      <AirPollution />
    </div>
  );
};

export default Sidebar;
