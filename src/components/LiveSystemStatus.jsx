import React, { useState, useEffect } from 'react';

const LiveSystemStatus = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // 5-second delay so user can see website first
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    // Wait for the exit animation before removing from DOM
    setTimeout(() => {
      setIsDismissed(true);
    }, 700);
  };

  if (isDismissed) return null;

  return (
    <div 
      className={`fixed bottom-8 right-8 z-50 transition-all duration-700 ease-out transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      <div className="w-[320px] bg-[#1c1c1c] border border-white/10 rounded-lg p-5 shadow-lg">
        <div className="flex justify-between items-center mb-3">
          <h3 className="uppercase tracking-widest text-[10px] font-bold text-gray-400">
            System Update
          </h3>
          <button 
            onClick={handleDismiss}
            className="text-[10px] text-gray-500 hover:text-white transition-colors"
          >
            Dismiss
          </button>
        </div>
        
        <div className="text-sm text-white font-sans leading-relaxed">
          We are Fetching live inventory from DummyJSON API.
          <div className="mt-1">It seems that the item you are looking for may be not available for now.</div>
        </div>
      </div>
    </div>
  );
};

export default LiveSystemStatus;
