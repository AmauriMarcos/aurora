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
  time: number; 
  temperature: number; 
}

interface TemperatureData {
  time: number;
  temperature: number;
}

interface HourlyData {
  dt: number;
  temp: number;
}

const TemperatureChart: React.FC<{ data: TemperatureData[] }> = ({ data }) => {
  return (
    <LineChart
      width={280}
      height={200}
      data={data}
      className="m-auto w-full translate-x-[-2rem] md:translate-x-[-3.8rem] bg-transparent"
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
          backgroundColor: "rgba(51, 51, 51, 0.8)", 
          border: "none",
          padding: "4px", 
          borderRadius: "4px", 
        }}
        itemStyle={{
          color: "#fff",
          fontSize: "10px", 
          margin: 0,
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

  const temperatureData: TemperatureData[] = data.hourly.map((hour: HourlyData) => ({
    time: (hour.dt + data.timezone_offset) * 1000,
    temperature: hour.temp,
  }));

  return (
    <div className="w-full m-auto text-white mt-[2.5rem] md:mt-[2rem] mb-0">
      <TemperatureChart data={temperatureData} />
    </div>
  );
};

export default LittleChart;
