import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, MapPin, ShoppingCart, User, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLocation } from '../context/LocationContext';
import { useAuth } from '../context/AuthContext';

import { Link } from 'react-router-dom';

const searchSuggestions = ['Search "milk"', 'Search "atta"', 'Search "bread"', 'Search "atta"', 'Search "eggs"', 'Search "apple"'];

const Header = ({ searchTerm, setSearchTerm }) => {
  const { setIsCartOpen, totalItems, grandTotal } = useCart();
  const { locationName, setLocationName, setCity, deliveryTime, setDeliveryTime } = useLocation();
  const { isLoggedIn, setIsLoginModalOpen } = useAuth();
  
  const [isLocationMenuOpen, setIsLocationMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Animated Search Placeholder State
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (isInputFocused || searchTerm) return;

    const interval = setInterval(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        setSuggestionIndex((prev) => (prev + 1) % searchSuggestions.length);
        setIsFadingOut(false);
      }, 300); // 300ms fade out duration
    }, 2000); // Wait 2 seconds before changing

    return () => clearInterval(interval);
  }, [isInputFocused, searchTerm]);

  const demoLocations = [
    { name: 'Boring Road, Patna', city: 'Patna', time: 8 },
    { name: 'Kankarbagh, Patna', city: 'Patna', time: 12 },
    { name: 'Patliputra Colony, Patna', city: 'Patna', time: 5 },
    { name: 'Patna City', city: 'Patna', time: 15 },
  ];

  const handleLocationSelect = (loc) => {
    setLocationName(loc.name);
    setCity(loc.city);
    setDeliveryTime(loc.time);
    setIsLocationMenuOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsLocationMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-20">
        
        {/* Desktop Layout (md and up) */}
        <div className="hidden md:flex items-center justify-between py-3 space-x-8">
          
          {/* Logo and Location */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex-shrink-0 cursor-pointer">
              <span className="text-4xl font-black tracking-tighter text-gray-900">
                blinkit<span className="text-[var(--color-blinkit-yellow)]">.</span>
              </span>
            </Link>
            
            <div className="relative" ref={menuRef}>
              <div 
                onClick={() => setIsLocationMenuOpen(!isLocationMenuOpen)}
                className="flex flex-col cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
              >
                <div className="font-extrabold text-sm text-gray-900">
                  Delivery in {deliveryTime} minutes
                </div>
                <div className="flex items-center text-sm text-gray-600 truncate max-w-[200px]">
                  {locationName} <ChevronDown className={`w-4 h-4 ml-1 flex-shrink-0 transition-transform ${isLocationMenuOpen ? 'rotate-180' : ''}`} />
                </div>
              </div>

              {isLocationMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-lg border border-gray-100 z-[100] py-2 overflow-hidden">
                  <div className="px-4 py-2 bg-gray-50 border-b border-gray-100 mb-1">
                    <span className="text-xs font-bold text-gray-500 uppercase">Select Location</span>
                  </div>
                  {demoLocations.map((loc, idx) => (
                    <div 
                      key={idx}
                      onClick={() => handleLocationSelect(loc)}
                      className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center justify-between transition-colors"
                    >
                      <div className="flex flex-col">
                        <span className={`text-sm ${locationName === loc.name ? 'font-black text-[var(--color-blinkit-green)]' : 'font-bold text-gray-900'}`}>{loc.name}</span>
                        <span className="text-xs text-gray-500">{loc.time} mins delivery</span>
                      </div>
                      {locationName === loc.name && (
                        <Check className="w-4 h-4 text-[var(--color-blinkit-green)] flex-shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-gray-600 transition-colors" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                className="block w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-2xl leading-5 bg-white/90 backdrop-blur-md focus:outline-none focus:bg-white focus:ring-1 focus:ring-gray-300 focus:border-gray-300 text-base transition-all duration-300 shadow-sm hover:shadow-md"
              />
              {!searchTerm && !isInputFocused && (
                <div className="absolute inset-y-0 left-12 flex items-center pointer-events-none overflow-hidden">
                  <span className={`text-gray-400 text-base transition-all duration-300 ${isFadingOut ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'}`}>
                    {searchSuggestions[suggestionIndex]}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center space-x-6 flex-shrink-0">
            {!isLoggedIn ? (
              <button 
                onClick={() => setIsLoginModalOpen(true)}
                className="text-lg text-gray-700 font-medium hover:text-gray-900 transition-colors"
              >
                Login
              </button>
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
                <User className="w-5 h-5 text-gray-700" />
              </div>
            )}
            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-[var(--color-blinkit-green)] text-white px-5 py-2 rounded-xl font-bold hover:bg-green-700 transition-colors shadow-sm flex items-center"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {totalItems > 0 ? (
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-xs">{totalItems} items</span>
                  <span className="text-sm">₹{grandTotal}</span>
                </div>
              ) : (
                <span>My Cart</span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Layout (below md) */}
        <div className="md:hidden py-3 flex flex-col space-y-4">
          
          {/* Top Row: Logo, Location and Login */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Logo */}
              <Link to="/" className="flex-shrink-0 cursor-pointer">
                <span className="text-2xl font-black tracking-tighter text-gray-900">
                  blinkit<span className="text-[var(--color-blinkit-yellow)]">.</span>
                </span>
              </Link>
              <div className="h-6 w-px bg-gray-200"></div>
              {/* Location */}
              <div className="relative">
                <div 
                  onClick={() => setIsLocationMenuOpen(!isLocationMenuOpen)}
                  className="flex flex-col cursor-pointer"
                >
                  <div className="font-extrabold text-[11px] text-gray-900 leading-tight">
                    Delivery in {deliveryTime} min
                  </div>
                  <div className="flex items-center text-[10px] text-gray-600 leading-tight truncate max-w-[100px]">
                    {locationName} <ChevronDown className={`w-3 h-3 ml-0.5 flex-shrink-0 transition-transform ${isLocationMenuOpen ? 'rotate-180' : ''}`} />
                  </div>
                </div>

                {isLocationMenuOpen && (
                  <div className="absolute top-full left-[-30px] mt-2 w-64 bg-white rounded-2xl shadow-lg border border-gray-100 z-[100] py-2 overflow-hidden">
                    <div className="px-4 py-2 bg-gray-50 border-b border-gray-100 mb-1">
                      <span className="text-xs font-bold text-gray-500 uppercase">Select Location</span>
                    </div>
                    {demoLocations.map((loc, idx) => (
                      <div 
                        key={idx}
                        onClick={() => handleLocationSelect(loc)}
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <div className="flex flex-col">
                          <span className={`text-sm ${locationName === loc.name ? 'font-black text-[var(--color-blinkit-green)]' : 'font-bold text-gray-900'}`}>{loc.name}</span>
                          <span className="text-xs text-gray-500">{loc.time} mins delivery</span>
                        </div>
                        {locationName === loc.name && (
                          <Check className="w-4 h-4 text-[var(--color-blinkit-green)] flex-shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {!isLoggedIn ? (
                <button 
                  onClick={() => setIsLoginModalOpen(true)}
                  className="text-gray-700 text-sm font-bold"
                >
                  Login
                </button>
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer">
                  <User className="w-4 h-4 text-gray-700" />
                </div>
              )}
              <button
                onClick={() => setIsCartOpen(true)}
                className="bg-[var(--color-blinkit-green)] text-white px-3 py-2 rounded-lg text-sm font-bold shadow-sm flex items-center"
              >
                <ShoppingCart className="w-4 h-4 mr-1" />
                {totalItems > 0 ? `₹${grandTotal}` : 'Cart'}
              </button>
            </div>
          </div>
          
          {/* Bottom Row: Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              className="block w-full pl-10 pr-3 py-3.5 border border-gray-200 rounded-xl leading-5 bg-white/90 backdrop-blur-md focus:outline-none focus:bg-white focus:ring-1 focus:ring-gray-300 focus:border-gray-300 text-sm transition-all duration-300 shadow-sm"
            />
            {!searchTerm && !isInputFocused && (
              <div className="absolute inset-y-0 left-10 flex items-center pointer-events-none overflow-hidden">
                <span className={`text-gray-400 text-sm transition-all duration-600 ${isFadingOut ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'}`}>
                  {searchSuggestions[suggestionIndex]}
                </span>
              </div>
            )}
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;
