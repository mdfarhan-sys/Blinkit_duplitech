import React, { useState, useEffect } from 'react';

const TechnicalNoticeModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    const hasSeenNotice = localStorage.getItem('hasSeenTechnicalNotice');
    if (!hasSeenNotice) {
      setIsRendered(true);
      // Small delay to trigger the entrance animation
      setTimeout(() => setIsVisible(true), 50);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('hasSeenTechnicalNotice', 'true');
    // Wait for exit animation
    setTimeout(() => setIsRendered(false), 300);
  };

  if (!isRendered) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${isVisible ? 'opacity-100 backdrop-blur-sm bg-black/40' : 'opacity-0 backdrop-blur-none bg-transparent'}`}>
      <div className={`bg-white rounded-2xl w-full max-w-md p-6 md:p-8 shadow-2xl transition-all duration-500 transform ${isVisible ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-8 opacity-0'}`}>
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="bg-blue-50 text-blue-600 p-3 rounded-full mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
          </div>
          
          <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
            Dynamic System 
          </h2>
          
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            Please note: Unlike static prototypes, this platform is fully dynamic. We are currently fetching live data from the <strong>DummyJSON API</strong>. While the product count is limited by the API's current scale, every interaction, price update, and category filter is processed in real-time.
          </p>
          
          <button 
            onClick={handleClose}
            className="w-full mt-4 bg-[var(--color-blinkit-green)] hover:bg-green-700 text-white text-lg font-bold py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default TechnicalNoticeModal;
