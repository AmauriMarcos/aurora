export const fetchWeatherInfoOneCall = async ({ lat, lng }: { lat: number; lng: number }) => {
    const baseUrl = 'https://api.openweathermap.org/data/2.5/onecall';
    
    const res = await fetch(`${baseUrl}?lat=${lat}&lon=${lng}&units=metric&exclude=minutely,hourly,alerts&appid=${process.env.NEXT_PUBLIC_API}`);
    
    if (!res.ok) {
      throw new Error("Failed to fetch weather data");
    }
    
    return res.json(); // Return the parsed JSON
  };
  