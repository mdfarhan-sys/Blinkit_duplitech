import React from 'react';
import { useLocation } from '../context/LocationContext';

const DeliveryWidget = () => {
  const { city, deliveryTime } = useLocation();

  return (
    <div className="fixed bottom-6 left-6 z-40 bg-white rounded-full px-4 py-2.5 shadow-xl border border-gray-100 flex items-center space-x-3 cursor-pointer hover:scale-105 transition-transform">
      {/* Pulsing Green Dot */}
      <div className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--color-blinkit-green)]"></span>
      </div>
      
      {/* Text */}
      <span className="text-sm font-bold text-gray-800 tracking-tight">
        Delivering to {city || '...'} in {deliveryTime} mins
      </span>
    </div>
  );
};

export default DeliveryWidget;
