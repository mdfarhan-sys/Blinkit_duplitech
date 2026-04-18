import React from 'react';
import { Link } from 'react-router-dom';

const PromoBanners = () => {
  return (
    <div className="flex flex-col gap-4 md:gap-6 mb-10 w-full">
      {/* Row 1: Main Hero Banner */}
      <div className="w-full">
        <Link 
          to="/groceries" 
          className="block w-full rounded-2xl shadow-md overflow-hidden hover:scale-[1.02] transition-transform duration-300"
        >
          <img 
            src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=2700/layout-engine/2026-01/Frame-1437256605-2-2.jpg" 
            alt="Groceries Promo" 
            className="w-full h-auto object-cover block"
          />
        </Link>
      </div>

      {/* Row 2: 4-Column Grid */}
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {/* Column 1: Pharmacy */}
        <Link 
          to="/pharmacy" 
          className="block w-full rounded-2xl shadow-sm overflow-hidden hover:scale-[1.02] transition-transform duration-300"
        >
          <img 
            src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=720/layout-engine/2023-07/pharmacy-WEB.jpg" 
            alt="Pharmacy"
            loading="lazy" 
            className="w-full h-auto object-cover block"
          />
        </Link>

        {/* Column 2: Pet Care */}
        <Link 
          to="/pet-care" 
          className="block w-full rounded-2xl shadow-sm overflow-hidden hover:scale-[1.02] transition-transform duration-300"
        >
          <img 
            src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=720/layout-engine/2026-01/pet_crystal_WEB-1.png" 
            alt="Pet Care"
            loading="lazy" 
            className="w-full h-auto object-cover block"
          />
        </Link>

        {/* Column 3: Baby Care */}
        <Link 
          to="/baby-care" 
          className="block w-full rounded-2xl shadow-sm overflow-hidden hover:scale-[1.02] transition-transform duration-300"
        >
          <img 
            src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=720/layout-engine/2026-01/baby_crystal_WEB-1.png" 
            alt="Baby Care"
            loading="lazy" 
            className="w-full h-auto object-cover block"
          />
        </Link>

        {/* Column 4: Empty Buffer */}
        <div className="w-full"></div>
      </div>
    </div>
  );
};

export default PromoBanners;
