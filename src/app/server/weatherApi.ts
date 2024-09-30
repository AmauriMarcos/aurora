
export const fetchWeatherInfoOneCall = async () => {
    const baseUrl = 'https://api.openweathermap.org/data/2.5/onecall'
    let latitude = 43.320904;
    let longitude = 21.89576;
    const res = await fetch( `${baseUrl}?lat=${latitude}&lon=${longitude}&units=metric&exclude=minutely,hourly,alerts&appid=${process.env.NEXT_PUBLIC_API}`)
    return res.json()
}