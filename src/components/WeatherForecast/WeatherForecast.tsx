import React from 'react';

interface WeatherForecastProps {
    main: string;
    description: string;
  }

  const WeatherForecast: React.FC<WeatherForecastProps> = ({ main, description }) => {
  return (
    <div className='mt-[5rem] mb-0'>
        <h6 className='text-[.675rem]'>Weather Forecast</h6>
        <h1 className='text-[3.5rem]'>{main}</h1>
        <h2 className='text-[2.8rem] translate-y-[-20px]'>{description}</h2>
    </div>
  )
}

export default WeatherForecast
