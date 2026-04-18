import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LoginModal = () => {
  const { isLoginModalOpen, setIsLoginModalOpen, setIsLoggedIn } = useAuth();
  const [phone, setPhone] = useState('');

  if (!isLoginModalOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    if (phone.length >= 10) {
      setIsLoggedIn(true);
      setIsLoginModalOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLoginModalOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          {/* Modal */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="bg-white rounded-3xl w-[90%] max-w-sm p-6 relative z-10 shadow-2xl border border-gray-100"
          >
            <button 
              onClick={() => setIsLoginModalOpen(false)}
              className="absolute top-4 right-4 bg-gray-100 rounded-full p-1.5 hover:bg-gray-200 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            <div className="text-center mb-6 mt-2">
              <span className="text-4xl font-black tracking-tighter text-gray-900 block mb-1">
                blinkit<span className="text-[var(--color-blinkit-yellow)]">.</span>
              </span>
              <p className="text-sm text-gray-600 font-medium">India's last minute app</p>
            </div>

            <form onSubmit={handleLogin} className="flex flex-col space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 mb-1.5 block">Log in or sign up</label>
                <div className="flex bg-white border border-gray-200 rounded-xl overflow-hidden focus-within:border-gray-900 focus-within:ring-1 focus-within:ring-gray-900 transition-all shadow-sm">
                  <div className="bg-gray-50 px-4 py-3 border-r border-gray-200 text-gray-600 font-bold flex items-center">
                    +91
                  </div>
                  <input 
                    type="tel" 
                    placeholder="Enter mobile number" 
                    className="w-full px-4 py-3 focus:outline-none font-medium text-gray-900 placeholder-gray-400"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    autoFocus
                  />
                </div>
              </div>
              
              <button 
                type="submit"
                disabled={phone.length < 10}
                className={`w-full py-3.5 rounded-xl font-bold text-white transition-all duration-300 shadow-sm ${
                  phone.length >= 10 
                    ? 'bg-gray-900 hover:bg-gray-800 transform hover:-translate-y-0.5 hover:shadow-md' 
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                Continue
              </button>
              
              <p className="text-[10px] text-gray-400 text-center leading-relaxed mt-2 px-4">
                By continuing, you agree to our Terms of service & Privacy policy
              </p>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
