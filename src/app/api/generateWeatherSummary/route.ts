// app/api/generateWeatherSummary/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { generateWeatherSummary } from '@/app/server/openAi';
import { WeatherData } from '@/app/types/weatherApi';
import ct from 'countries-and-timezones';

// Function to generate the prompt based on weather data
function generatePrompt(weatherData: WeatherData, cityName: string): string {
  const { current, lat, lon } = weatherData;
  const name = cityName || weatherData.timezone || 'your location';
  const description = current.weather[0]?.description || 'No description';
  const temperature = current.temp;
  const feelsLike = current.feels_like;
  const humidity = current.humidity;
  const windSpeed = current.wind_speed;
  const windDeg = current.wind_deg;

  const windDirection = getWindDirection(windDeg);

  const timezoneData = ct.getTimezone(cityName);

  const timezone = timezoneData ? timezoneData.name : 'UTC';

  // Get the current time in the local timezone using native Date
  const localTime = new Date(current.dt * 1000).toLocaleString('en-US', {
    timeZone: timezone,
    dateStyle: 'full',
    timeStyle: 'short',
  });

  return `Write a very short, friendly yet professional weather summary for ${name}.
  Time zone ${localTime}
  Current conditions: ${description}.
  Temperature: ${temperature}°C (feels like ${feelsLike}°C).
  Humidity: ${humidity}%.
  Wind: ${windSpeed} m/s from the ${windDirection}.

  The summary should be conversational and easy to understand.`;
}

// Helper function to convert wind degrees to compass direction
function getWindDirection(deg: number): string {
  const directions = [
    'North', 'Northeast', 'East', 'Southeast',
    'South', 'Southwest', 'West', 'Northwest',
  ];
  const index = Math.round((deg % 360) / 45) % 8;
  return directions[index];
}

// API Route Handler
export async function POST(request: NextRequest) {
  try {
    const { weatherData, cityName } = await request.json();

    if (!weatherData) {
      return NextResponse.json({ error: 'Missing weather data' }, { status: 400 });
    }

    const prompt = generatePrompt(weatherData, cityName);

    const summary = await generateWeatherSummary(prompt);

    return NextResponse.json({ summary });
  } catch (error) {
    console.error('Error generating weather summary:', error);
    return NextResponse.json({ error: 'Failed to generate weather summary' }, { status: 500 });
  }
}
