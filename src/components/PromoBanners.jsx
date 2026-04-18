import React from 'react';
import { Link } from 'react-router-dom';

const PromoBanners = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-10 w-full">
      {/* Main Hero Banner (66%) */}
      <div className="w-full md:flex-[2] flex-shrink-0">
        <Link to="/groceries" className="bg-gradient-to-r from-[#e3f4e3] to-[#f2fbf2] rounded-2xl flex flex-col md:flex-row md:items-center h-auto md:h-full md:min-h-[200px] overflow-hidden relative shadow-sm transition-transform duration-300 hover:shadow-md hover:scale-[1.01] group block w-full">
          {/* Mobile Image (Top) */}
          <div className="block md:hidden w-full overflow-hidden">
            <img 
              src="/images/main_hero_groceries.png" 
              alt="Fresh Groceries" 
              className="w-full aspect-video object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Content */}
          <div className="relative z-10 w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center h-full">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-3 md:mb-5 tracking-tighter leading-tight drop-shadow-sm">Stock up on<br/>daily essentials</h2>
            <button className="bg-[#0C831F] text-white px-5 py-2.5 md:px-6 md:py-3 rounded-xl text-sm font-bold shadow-sm group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(12,131,31,0.4)] transition-all duration-300 w-fit pointer-events-none">Shop Now</button>
          </div>
          
          {/* Desktop Image (Right) */}
          <div className="hidden md:block absolute right-0 top-0 h-full w-2/3 overflow-hidden rounded-r-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-[#e3f4e3] via-transparent to-transparent z-10 w-1/3"></div>
            <img 
              src="/images/main_hero_groceries.png" 
              alt="Fresh Groceries" 
              className="w-full h-full object-cover object-left-center transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </Link>
      </div>

      {/* Mini-Banners Column (33%) */}
      <div className="w-full md:flex-[1] flex flex-col gap-4 md:gap-6 flex-shrink-0">
        {[
          { 
            title: 'Pharmacy', 
            subtitle: 'Medicines & Wellness', 
            emoji: '💊', 
            bg: 'bg-indigo-50/60', 
            link: '/pharmacy' 
          },
          { 
            title: 'Pet Care', 
            subtitle: 'Food & Toys', 
            emoji: '🐕', 
            bg: 'bg-amber-50/60', 
            link: '/pet-care' 
          },
          { 
            title: 'Baby Care', 
            subtitle: 'Diapers & Wipes', 
            emoji: '👶', 
            bg: 'bg-rose-50/60', 
            link: '/baby-care' 
          }
        ].map((banner, i) => (
          <Link to={banner.link} key={i} className={`flex-1 ${banner.bg} rounded-2xl p-4 md:p-5 flex flex-col justify-between min-h-[120px] relative overflow-hidden shadow-sm transition-transform duration-300 hover:shadow-md hover:scale-[1.01] group block w-full`}>
            <div className="z-10 flex flex-col h-full justify-between">
              <div>
                <h3 className="font-extrabold text-gray-900 text-lg md:text-xl mb-0.5 leading-tight tracking-tight drop-shadow-sm">{banner.title}</h3>
                <p className="text-[10px] md:text-xs text-gray-600 font-medium mb-2">{banner.subtitle}</p>
              </div>
              <button className="mt-2 md:mt-3 bg-gray-900 text-white px-4 py-1.5 md:py-2 rounded-lg text-xs font-bold w-fit group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(17,24,39,0.3)] transition-all duration-300 shadow-sm pointer-events-none">Order Now</button>
            </div>
            <div className="absolute right-[-5px] bottom-[-5px] md:right-2 md:bottom-2 text-5xl md:text-6xl opacity-20 md:opacity-25 transform -rotate-12 group-hover:scale-110 transition-transform duration-500">
              {banner.emoji}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PromoBanners;
