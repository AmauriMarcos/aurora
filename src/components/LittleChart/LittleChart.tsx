import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { fetchTimeWeather } from "@/app/server/weatherApi";

interface Location {
  lat: number;
  lng: number;
}

interface LittleChartProps {
  location: Location | null;
}

interface TemperatureData {
  time: number; // Timestamp in milliseconds
  temperature: number; // Temperature in Celsius
}

const TemperatureChart: React.FC<{ data: TemperatureData[] }> = ({ data }) => {
  return (
    <LineChart
      width={280}
      height={200}
      data={data}
      className="m-auto w-full translate-x-[-3.8rem] bg-transparent"
      style={{ borderRadius: "8px", overflow: "hidden" }}
    >
      <CartesianGrid strokeDasharray="3 3" stroke="transparent" />
      <XAxis
        dataKey="time"
        stroke="#fff"
        fontSize={10}
        tickFormatter={(tick) => {
          const date = new Date(tick);
          return date.toLocaleTimeString([], { hour: "numeric", hour12: true });
        }}
      />
      <YAxis
        stroke="#fff"
        fontSize={10}
        tickFormatter={(value) => `${value} °C`}
      />
      <Tooltip
        contentStyle={{
          backgroundColor: "rgba(51, 51, 51, 0.8)", // Semi-transparent background
          border: "none",
          padding: "4px", // Reduce padding
          borderRadius: "4px", // Slightly round corners
        }}
        itemStyle={{
          color: "#fff",
          fontSize: "10px", // Reduce font size
          margin: 0, // Remove default margins
        }}
        labelStyle={{
          color: "#fff",
          fontSize: "10px",
          margin: 0,
        }}
        formatter={(value) => `${value} °C`}
        labelFormatter={(label) => {
          const date = new Date(label);
          return date.toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          });
        }}
      />

      <Legend wrapperStyle={{ color: "#fff", fontSize: 12 }} />
      <Line
        type="monotone"
        dataKey="temperature"
        name="Temperature (°C)"
        stroke="#D3C27A"
        dot={false}
        strokeWidth={2}
      />
    </LineChart>
  );
};

const LittleChart: React.FC<LittleChartProps> = ({ location }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["timeWeather", location],
    queryFn: () => {
      if (!location) return Promise.resolve(null);
      return fetchTimeWeather(location);
    },
    enabled: !!location,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Error fetching temperature data</div>;
  }

  // Transform the data
  const temperatureData: TemperatureData[] = data.hourly.map((hour: any) => ({
    time: (hour.dt + data.timezone_offset) * 1000,
    temperature: hour.temp, // Already in Celsius
  }));

  return (
    <div className="w-full m-auto text-white mt-[2rem]">
      <TemperatureChart data={temperatureData} />
    </div>
  );
};

export default LittleChart;
