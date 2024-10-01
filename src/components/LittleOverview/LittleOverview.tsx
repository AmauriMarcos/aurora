import React, { useEffect, useState } from 'react';

interface LittleOverviewProps {
  weatherData: any;
  cityName: string // Replace 'any' with your WeatherData interface if available
}

const LittleOverview: React.FC<LittleOverviewProps> = ({ weatherData, cityName }) => {
  const [summary, setSummary] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchSummary = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/generateWeatherSummary', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ weatherData, cityName }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to generate weather summary');
        }

        const data = await response.json();
        setSummary(data.summary);
      } catch (error) {
        console.error('Error fetching summary:', error);
        setSummary('Unable to generate weather summary at this time.');
      } finally {
        setIsLoading(false);
      }
    };

    if (weatherData) {
      fetchSummary();
    }
  }, [weatherData]);

  if (isLoading) {
    return <div>Loading weather summary...</div>;
  }

  return (
    <div className="self-auto">
        <h3 className='my-4 text-[1rem]'>{cityName}</h3>
      <p className='text-xs'>{summary}</p>
    </div>
  );
};

export default LittleOverview;