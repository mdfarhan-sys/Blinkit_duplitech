import React, { createContext, useContext, useState, useEffect } from 'react';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [locationName, setLocationName] = useState('Locating...');
  const [city, setCity] = useState('');
  const [deliveryTime, setDeliveryTime] = useState(10);

  const handleFallback = () => {
    setCity('Patna');
    setLocationName('Patna, Bihar');
    setDeliveryTime(8);
  };

  useEffect(() => {
    setLocationName('Detecting location...');
    
    const fetchLocation = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        
        if (data && data.status === 'success') {
          const detectedCity = data.city || 'Unknown';
          const region = data.regionName || '';
          
          setCity(detectedCity);
          setLocationName(region && detectedCity !== region ? `${detectedCity}, ${region}` : detectedCity);
          
          if (detectedCity.toLowerCase() === 'patna') {
            setDeliveryTime(8);
          } else {
            setDeliveryTime(12);
          }
        } else {
          handleFallback();
        }
      } catch (error) {
        console.error("Error fetching IP location:", error);
        handleFallback();
      }
    };

    fetchLocation();
  }, []);

  return (
    <LocationContext.Provider value={{ locationName, setLocationName, city, setCity, deliveryTime, setDeliveryTime }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);
