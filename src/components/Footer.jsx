import React from 'react';
import { Globe, MessageSquare, Camera, Briefcase, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#F8F8F8] border-t border-gray-200 pt-12 pb-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          
          {/* Column 1: Useful Links */}
          <div>
            <h3 className="text-gray-900 font-bold mb-4 text-base">Useful Links</h3>
            <ul className="space-y-3">
              {['Blog', 'Privacy', 'Terms', 'FAQs', 'Security', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-500 hover:text-[var(--color-blinkit-green)] text-sm transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Partner Links */}
          <div>
            <h3 className="text-gray-900 font-bold mb-4 text-base">Partner</h3>
            <ul className="space-y-3">
              {['Partner', 'Franchise', 'Seller', 'Warehouse', 'Deliver', 'Resources'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-500 hover:text-[var(--color-blinkit-green)] text-sm transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Bistro / Recipes */}
          <div>
            <h3 className="text-gray-900 font-bold mb-4 text-base">Blinkit</h3>
            <ul className="space-y-3">
              {['Recipes', 'Bistro', 'District', 'Blinkit Ambulance'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-500 hover:text-[var(--color-blinkit-green)] text-sm transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Categories */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-900 font-bold text-base">Categories</h3>
              <a href="#" className="text-[var(--color-blinkit-green)] text-sm hover:underline">see all</a>
            </div>
            <div className="grid grid-cols-3 gap-x-4 gap-y-3">
              {[
                'Vegetables & Fruits', 'Cold Drinks', 'Munchies', 
                'Dairy & Breakfast', 'Instant Food', 'Tea & Coffee', 
                'Bakery & Biscuits', 'Sweet Tooth', 'Atta & Dal',
                'Dry Fruits', 'Masala & Oil', 'Sauces & Spreads'
              ].map((link) => (
                <a key={link} href="#" className="text-gray-500 hover:text-[var(--color-blinkit-green)] text-[13px] leading-tight transition-colors line-clamp-1">{link}</a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mb-8"></div>

        {/* Bottom Bar: Copyright, App Badges, Socials */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 mb-8">
          
          {/* Copyright */}
          <div className="text-gray-500 text-sm w-full md:w-1/3 text-center md:text-left">
            © Blink Commerce Private Limited, 2016-2026
          </div>

          {/* Download App */}
          <div className="flex items-center space-x-4 w-full md:w-1/3 justify-center">
            <span className="text-gray-600 text-sm font-semibold">Download App</span>
            <button className="bg-gray-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-gray-800 transition-colors">
              App Store
            </button>
            <button className="bg-gray-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-gray-800 transition-colors">
              Google Play
            </button>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-end space-x-3 w-full md:w-1/3">
            {[
              { icon: Globe, name: 'Facebook', url: 'https://www.facebook.com/blinkitapp' },
              { icon: MessageSquare, name: 'Twitter', url: 'https://twitter.com/letsblinkit' },
              { icon: Camera, name: 'Instagram', url: 'https://www.instagram.com/blinkitapp' },
              { icon: Briefcase, name: 'LinkedIn', url: 'https://www.linkedin.com/company/blinkitapp' },
              { icon: MessageCircle, name: 'Threads', url: '#' },
            ].map((social, idx) => {
              const Icon = social.icon;
              return (
                <a key={idx} href={social.url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Disclaimer Text */}
        <div className="text-center text-[11px] md:text-xs text-gray-400 max-w-4xl mx-auto leading-relaxed">
          "Blinkit" is owned & managed by "Blink Commerce Private Limited" and is not related, linked or interconnected in whatsoever manner or nature, to "GROFFR.COM" which is a real estate services business operated by "Redstone Consultancy Services Private Limited".
        </div>

      </div>
    </footer>
  );
};

export default Footer;
