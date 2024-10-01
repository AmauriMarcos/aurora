
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { getWeatherOverview } from '@/app/server/weatherApi';

interface Location {
    lat: number;
    lng: number;
  }
  
  interface LittleOverviewProps {
    location: Location | null;
  }

const LittleOverview: React.FC<LittleOverviewProps> = ({location}) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["overview", location],
        queryFn: () => {
          if (!location) return Promise.resolve(null);
          return getWeatherOverview(location);
        },
        enabled: !!location,
      });
    
      if (isLoading) {
        return <div>Loading...</div>;
      }
    
      if (isError || !data) {
        return <div>Error fetching overview data</div>;
      }

    console.log("DA TA", data)
  return (
    <div>
      
    </div>
  )
}

export default LittleOverview
