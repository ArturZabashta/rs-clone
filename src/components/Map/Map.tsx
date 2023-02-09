import React from 'react';
import { GoogleMapProvider, MapBox } from '@googlemap-react/core';

const Map: React.FC = () => {
  return (
    <GoogleMapProvider>
      <MapBox
        opts={{
          zoom: 14,
          center: { lat: 42.345573, lng: -71.098326 },
          streetViewControl: true,
        }}
        // apiKey={API_KEY}
        style={{
          height: '50vh',
          width: '100%',
        }}
      />
    </GoogleMapProvider>
  );
};

export default Map;
