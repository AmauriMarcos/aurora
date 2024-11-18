// src/app/api/fetchAirPollution/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { lat, lng } = await request.json();

    if (!lat || !lng) {
      return NextResponse.json(
        { error: "Missing latitude or longitude" },
        { status: 400 }
      );
    }

    const apiKey = process.env.WAQI_API_KEY;
    const baseUrl = `https://api.openaq.org/v3/locations?coordinates=${lat},${lng}&radius=12000&limit=1`;

    // Fetch nearby air quality stations
    const stationRes = await fetch(baseUrl, {
      headers: {
        "X-API-Key": apiKey || "",
      },
    });


    if (!stationRes.ok || !stationRes.headers.get("content-type")?.includes("application/json")) {
      console.error("Station fetch returned non-JSON or error response:", await stationRes.text());
      return NextResponse.json(
        { error: "Failed to fetch air quality station data" },
        { status: stationRes.status }
      );
    }

    const stationData = await stationRes.json();
    const station = stationData.results[0];
    if (!station || !station.sensors) {
      console.log("No station or sensor data available near this location");
      return NextResponse.json({ error: "No station or sensor data found near this location" }, { status: 404 });
    }

    const pm25Sensor = station.sensors.find((sensor: any) => sensor.parameter.name === "pm25");
    if (!pm25Sensor) {
      console.log("No PM2.5 sensor found at this location. Sensors available:", station.sensors.map((sensor: any) => sensor.parameter.name));
      return NextResponse.json({ error: "No PM2.5 sensor found at this location" }, { status: 404 });
    }

    // Fetch latest PM2.5 measurement from the sensor
    const sensorId = pm25Sensor.id;
    const pm25Res = await fetch(
      `https://api.openaq.org/v3/sensors/${sensorId}/measurements?limit=1&sort=desc&order_by=datetime`,
      {
        headers: {
          "X-API-Key": apiKey || "",
        },
      }
    );

    if (!pm25Res.ok || !pm25Res.headers.get("content-type")?.includes("application/json")) {
      console.error("PM2.5 fetch returned non-JSON or error response:", await pm25Res.text());
      return NextResponse.json(
        { error: "Failed to fetch PM2.5 data" },
        { status: pm25Res.status }
      );
    }

    const pm25Data = await pm25Res.json();
    const pm25Value = pm25Data.results[0]?.value;

    if (pm25Value === undefined) {
      console.log("No PM2.5 measurement data available for this location");
      return NextResponse.json({ error: "No PM2.5 measurement data available" }, { status: 404 });
    }

    return NextResponse.json({ pm2_5: pm25Value });
  } catch (error) {
    console.error("Error fetching air pollution data:", error);
    return NextResponse.json(
      { error: "Failed to fetch air pollution data", message: error },
      { status: 500 }
    );
  }
}
