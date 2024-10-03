import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import * as Geocode from "react-geocode";
import Search from "../Search/Search";
import Temperature from "../Temperature/Temperature";
import AirPollution from "../AirPollution/AirPollution";
import LittleChart from "../LittleChart/LittleChart";
import LittleOverview from "../LittleOverview/LittleOverview";
import { fetchWeatherInfoOneCall } from "@/app/server/weatherApi";
import { WeatherData } from "@/app/types/weatherApi";
import { SkeletonSidebar } from "./SkeletonSideBar";

interface SidebarProps {
  setWeatherCondition: (condition: string | null) => void;
  setWeatherData: (data: WeatherData | null) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setWeatherCondition, setWeatherData }) => {
  const [inputValue, setInputValue] = useState("");
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [cityName, setCityName] = useState<string>("");

  const predefinedLocation = { lat: 40.7128, lng: -74.0060 }; // Default to New York

  interface AddressComponent {
    long_name: string;
    short_name: string;
    types: string[];
  }

  useEffect(() => {
    Geocode.setKey(process.env.NEXT_PUBLIC_KEY!);
    Geocode.setLanguage("en");
    Geocode.setRegion("US");

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position: GeolocationPosition) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          console.log(`User's Location - Latitude: ${latitude}, Longitude: ${longitude}`);

          try {
            const response = await Geocode.fromLatLng(latitude, longitude);

            if (response.results.length > 0) {
              const addressComponents = response.results[0].address_components as AddressComponent[];
              const cityComponent = addressComponents.find(
                (component: AddressComponent) =>
                  component.types.includes("locality") || component.types.includes("postal_town")
              );
              if (cityComponent) {
                setCityName(cityComponent.long_name);
                setInputValue(cityComponent.long_name);
              } else {
                setCityName("Your location");
                setInputValue("Your location");
              }
            }
          } catch (error) {
            console.error("Error reverse geocoding location:", error);
            setCityName("Your location");
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocation(predefinedLocation); // Use predefined location if denied or error
          setCityName("New York"); // Set the default city name
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLocation(predefinedLocation); // Fallback if geolocation is not supported
      setCityName("New York"); // Set the default city name
    }
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["weather", location],
    queryFn: () => {
      if (!location) return Promise.resolve(null);
      return fetchWeatherInfoOneCall(location);
    },
    enabled: !!location,
  });

  useEffect(() => {
    if (data && data.current && Array.isArray(data.current.weather) && data.current.weather?.length > 0) {
      setWeatherCondition(data.current.weather[0].main.toLowerCase());
      setWeatherData(data);
    }
  }, [data, setWeatherCondition]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await Geocode.fromAddress(inputValue);
      if (response.results.length > 0) {
        const { lat, lng } = response.results[0].geometry.location;
        setLocation({ lat, lng });

        const addressComponents = response.results[0].address_components as AddressComponent[];
        const cityComponent = addressComponents.find(
          (component: AddressComponent) =>
            component.types.includes("locality") || component.types.includes("postal_town")
        );
        if (cityComponent) {
          setCityName(cityComponent.long_name);
          setInputValue(cityComponent.long_name);
        } else {
          setCityName(inputValue);
          setInputValue(inputValue);
        }
      } else {
        console.error("No results found for the provided address.");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  if (isLoading) {
    return <SkeletonSidebar/>;
  }

  if (isError || !data) {
    return <div>Error fetching weather data</div>;
  }

  return (
    <div className="flex flex-col gap-0 py-4 px-8 md:p-4 min-h-screen md:min-h-0 md:h-full">
      <Search
        inputValue={inputValue}
        setInputValue={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
        onSubmit={handleSubmit}
      />
      {data.current && (
        <Temperature
          temperature={data.current.temp}
          feelsLike={data.current.feels_like}
          humidity={data.current.humidity}
          windSpeed={data.current.wind_speed}
          windDeg={data.current.wind_deg}
        />
      )}
      <AirPollution location={location} />
      <LittleChart location={location} />
      {data && <LittleOverview weatherData={data} cityName={cityName} />}
    </div>
  );
};

export default Sidebar;
