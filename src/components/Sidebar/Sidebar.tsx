import Search from "../Search/Search";
import React, { useEffect, useState } from "react";
import Temperature from "../Temperature/Temperature";
import AirPollution from "../AirPollution/AirPollution";
import { useQuery } from "@tanstack/react-query";
import { fetchWeatherInfoOneCall } from "@/app/server/weatherApi"; // Ensure this function is updated
import * as Geocode from "react-geocode";

interface SidebarProps {
  setWeatherCondition: (condition: string | null) => void; // Define the prop type
}

const Sidebar: React.FC<SidebarProps> = ({ setWeatherCondition }) => {
  const [text, setText] = useState("");
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  // Set up Geocode API key on component mount
  useEffect(() => {
    Geocode.setKey(process.env.NEXT_PUBLIC_KEY!); // Use your API key
    Geocode.setLanguage("en");
    Geocode.setRegion("us"); // Set your default region if needed

    // Get user current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          console.log(
            `User's Location - Latitude: ${latitude}, Longitude: ${longitude}`
          );
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["weather", location],
    queryFn: () => {
      if (!location) return Promise.resolve(null);
      return fetchWeatherInfoOneCall(location);
    },
    enabled: !!location, // Only run the query if location is defined
  });

  useEffect(() => {
    if (data && data.current && data.current.weather.length > 0) {
      // Check if weather data exists
      setWeatherCondition(data.current.weather[0].main.toLowerCase()); // Update the background condition
    }
  }, [data, setWeatherCondition]); // Depend on data

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
      } else {
        console.error("No results found for the provided address.");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };
console.log(data)
  return (
    <div className="flex flex-col gap-[5rem] p-4 ">
      <Search setText={(e) => setText(e.target.value)} onSubmit={handleSubmit} />
      {data && data.current && (
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
