"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import tzlookup from "tz-lookup";
import ct from "countries-and-timezones";
import { fetchAirPollution } from "@/app/server/weatherApi";
import { useQuery } from "@tanstack/react-query";
import { SkeletonAirPollution } from "./SkeletonAirPollutionSummary";

interface AirPollutionSummaryProps {
  icon: string;
  latitude: number;
  longitude: number;
}

const AirPollutionSummary: React.FC<AirPollutionSummaryProps> = ({
  icon,
  latitude,
  longitude,
}) => {
  const location = {
    lat: latitude,
    lng: longitude,
  };
  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["airPollutionSummary", location],
    queryFn: () => {
      if (!location) return Promise.resolve(null);
      return fetchAirPollution(location);
    },
    enabled: !!location,
  });

  const pm25Value =
    data && data?.list?.length > 0 ? data.list[0].components.pm2_5 : undefined;

  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/generateAirPollutionSummary", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ pm2_5: pm25Value }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.error || "Failed to generate air pollution summary"
          );
        }

        const data = await response.json();
        setSummary(data.summary);
      } catch (error) {
        console.error("Error fetching summary:", error);
        setSummary("Unable to generate air pollution summary at this time.");
      } finally {
        setLoading(false);
      }
    };

    if (pm25Value !== undefined) {
      fetchSummary();
    }
  }, [pm25Value]);

  // Now, after all hooks are called, handle conditional rendering

  if (isLoading || loading) {
    return <SkeletonAirPollution/>;
  }

  if (isError) {
    return <div>Error fetching air pollution data</div>;
  }

  // Proceed with the rest of your component

  // Get the IANA time zone identifier
  const timeZone = tzlookup(latitude, longitude);

  // Get the country information based on the time zone
  const country = ct.getCountryForTimezone(timeZone);
  const countryName = country ? country.name : "Unknown";

  // Get the current date and time in the specified time zone
  const localDate = new Date();

  // Format date and time using the time zone
  const dateOptions: Intl.DateTimeFormatOptions = {
    timeZone,
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    timeZone,
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const formattedDate = localDate.toLocaleDateString("en-US", dateOptions);
  const formattedTime = localDate.toLocaleTimeString("en-US", timeOptions);
  const dateTimeString = `${formattedDate}, ${formattedTime}`;

  // Construct icon URL
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div>
      <div className="flex  gap-2 flex-col">
        <div className="flex items-center">
          <Image src={iconUrl} width={40} height={40} alt="forecast icon" />
          <div className="flex gap-1">
            <p className="text-[.875rem]">{countryName},</p>
            <p className="text-[.875rem]">{dateTimeString}</p>
          </div>
        </div>
        
        <div className="max-w-[350px]">
            <p className="text-[.875rem]">{summary}</p>
        </div>
        
      </div>
    </div>
  );
};

export default AirPollutionSummary;
