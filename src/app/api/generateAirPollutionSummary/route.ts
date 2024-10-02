import { NextRequest, NextResponse } from "next/server";
import { generateWeatherSummary } from "@/app/server/openAi";
import { WeatherData } from "@/app/types/weatherApi";

function generatePrompt(pm2_5: number): string {
  return `Write a short, friendly, and professional summary about the air quality with a PM2.5 value of ${pm2_5}. 
  Use this scale: 
  - 0-12: Good
  - 12.1-35.4: Moderate
  - 35.5-55.4: Unhealthy for Sensitive Groups
  - 55.5-150.4: Unhealthy
  - 150.5-250.4: Very Unhealthy
  - 250.5+: Hazardous.
  
  Please explain the air quality status clearly and how it impacts people, in **250 characters max**. Do not add unnecessary phrases.`;
}

export async function POST(request: NextRequest) {
  try {
    const { pm2_5 } = await request.json();

    if (!pm2_5) {
      return NextResponse.json(
        { error: "Missing pm2_5 data" },
        { status: 400 }
      );
    }

    const prompt = generatePrompt(pm2_5);

    const summary = await generateWeatherSummary(prompt);

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Error generating weather pm2_5 summary:", error);
    return NextResponse.json(
      { error: "Failed to generate weather pm2_5 summary" },
      { status: 500 }
    );
  }
}
