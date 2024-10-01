import Search from "../Search/Search";
import React, { useEffect, useState } from "react";
import Temperature from "../Temperature/Temperature";
import AirPollution from "../AirPollution/AirPollution";
import { useQuery } from "@tanstack/react-query";
import { fetchWeatherInfoOneCall } from "@/app/server/weatherApi";
import * as Geocode from "react-geocode";
import LittleChart from "../LittleChart/LittleChart";
import LittleOverview from "../LittleOverview/LittleOverview";

interface SidebarProps {
  setWeatherCondition: (condition: string | null) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setWeatherCondition }) => {
  const [text, setText] = useState("");
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [cityName, setCityName] = useState<string>("");

  // Define the AddressComponent interface
  interface AddressComponent {
    long_name: string;
    short_name: string;
    types: string[];
  }

  // Function to get country code from latitude and longitude
async function getCountryCode(latitude: number, longitude: number): Promise<string | null> {
  try {
    const response = await Geocode.fromLatLng(latitude, longitude);
    if (response.results.length > 0) {
      const addressComponents = response.results[0].address_components as AddressComponent[];
      const countryComponent = addressComponents.find((component: AddressComponent) =>
        component.types.includes("country")
      );
      if (countryComponent) {
        return countryComponent.short_name.toLowerCase(); // Returns country code like 'rs', 'us', etc.
      }
    }
  } catch (error) {
    console.error("Error getting country code:", error);
  }
  return null;
}


  // Set up Geocode API key on component mount
  useEffect(() => {
    Geocode.setKey(process.env.NEXT_PUBLIC_KEY!); // Use your API key
    Geocode.setLanguage("en");
    Geocode.setRegion("US");

    // Get user current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position: GeolocationPosition) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          console.log(
            `User's Location - Latitude: ${latitude}, Longitude: ${longitude}`
          );

          // Reverse geocode to get city name
          try {
            const response = await Geocode.fromLatLng(latitude, longitude);

            if (response.results.length > 0) {
              const addressComponents = response.results[0].address_components as AddressComponent[];
              const cityComponent = addressComponents.find((component: AddressComponent) =>
                component.types.includes("locality") || component.types.includes("postal_town")
              );
              if (cityComponent) {
                setCityName(cityComponent.long_name);
              } else {
                setCityName("Your location");
              }
            }
          } catch (error) {
            console.error("Error reverse geocoding location:", error);
            setCityName("Your location");
          }
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
    enabled: !!location,
  });

  useEffect(() => {
    if (data && data.current && data.current.weather.length > 0) {
      setWeatherCondition(data.current.weather[0].main.toLowerCase());
    }
  }, [data, setWeatherCondition]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await Geocode.fromAddress(text);
      if (response.results.length > 0) {
        const { lat, lng } = response.results[0].geometry.location;
        setLocation({ lat, lng });

        // Update city name from the search input
        const addressComponents = response.results[0].address_components as AddressComponent[];
        const cityComponent = addressComponents.find((component: AddressComponent) =>
          component.types.includes("locality") || component.types.includes("postal_town")
        );
        if (cityComponent) {
          setCityName(cityComponent.long_name);
        } else {
          setCityName(text); // Fallback to user input
        }
      } else {
        console.error("No results found for the provided address.");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Error fetching weather data</div>;
  }

  console.log(data);

  return (
    <div className="flex flex-col gap-0 p-4 h-full">
      <Search setText={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)} onSubmit={handleSubmit} />
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
