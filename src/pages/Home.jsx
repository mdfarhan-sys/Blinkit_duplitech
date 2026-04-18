import React, { useState } from 'react';
import PromoBanners from '../components/PromoBanners';
import CategoryRoundels from '../components/CategoryRoundels';
import ProductGrid from '../components/ProductGrid';
import StickyCategoryBar from '../components/StickyCategoryBar';

const Home = ({ searchTerm }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      {/* Top Section: Banners */}
      {searchTerm === '' && (
        <PromoBanners />
      )}

      {/* Category Roundels (Hidden on mobile as per user request) */}
      <div className="hidden md:block">
        {searchTerm === '' && (
          <CategoryRoundels selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        )}
      </div>

      {/* Sticky Horizontal Category Bar */}
      {searchTerm === '' && (
        <StickyCategoryBar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      )}

      {/* Dynamic Product Grid */}
      <div id="product-grid-section">
        <ProductGrid selectedCategory={selectedCategory} searchTerm={searchTerm} />
      </div>
      
      {/* Spacer for scrolling */}
      <div className="h-20"></div>
    </main>
  );
};

export default Home;
