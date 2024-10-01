export const fetchWeatherInfoOneCall = async ({ lat, lng }: { lat: number; lng: number }) => {
    const baseUrl = 'https://api.openweathermap.org/data/2.5/onecall';
    
    const res = await fetch(`${baseUrl}?lat=${lat}&lon=${lng}&units=metric&exclude=minutely,hourly,alerts&appid=${process.env.NEXT_PUBLIC_API}`);
    
    if (!res.ok) {
      throw new Error("Failed to fetch weather data");
    }
    
    return res.json(); 
  };
  

  export const fetchAirPollution = async ({ lat, lng }: { lat: number; lng: number }) => {
    const baseUrl = 'http://api.openweathermap.org/data/2.5/air_pollution';
    
    const res = await fetch(`${baseUrl}?lat=${lat}&lon=${lng}&appid=${process.env.NEXT_PUBLIC_API}`);
    
    if (!res.ok) {
      throw new Error("Failed to fetch weather data");
    }
    
    return res.json(); 
  };


  export const fetchTimeWeather = async ({ lat, lng }: { lat: number; lng: number }) => {
    const baseUrl = 'https://api.openweathermap.org/data/2.5/onecall';
    const res = await fetch(
      `${baseUrl}?lat=${lat}&lon=${lng}&exclude=minutely,daily,alerts&units=metric&appid=${process.env.NEXT_PUBLIC_API}`
    );
  
    if (!res.ok) {
      throw new Error('Failed to fetch weather data');
    }
  
    return res.json();
  };
  

  export const getWeatherOverview = async ({ lat, lng }: { lat: number; lng: number }) => {
    const baseUrl = 'https://api.openweathermap.org/data/3.0/onecall';
    const res = await fetch(
      `${baseUrl}/overview?lat=${lat}&lon=${lng}&appid=${process.env.NEXT_PUBLIC_API}`
    );
    if (!res.ok) {
      throw new Error('Failed to fetch weather data');
    }
    return res.json();
  };
  