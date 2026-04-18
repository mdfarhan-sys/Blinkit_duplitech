import React from 'react';
import PromoBanners from '../components/PromoBanners';
import CategoryRoundels from '../components/CategoryRoundels';
import ProductGrid from '../components/ProductGrid';

const Home = ({ searchTerm }) => {
  return (
    <main className="max-w-7xl mx-auto px-4 md:px-20 py-8 md:py-10">
      {/* Top Section: Banners */}
      {searchTerm === '' && (
        <PromoBanners />
      )}

      {/* Category Roundels (Hidden on mobile as per user request) */}
      <div className="hidden md:block">
        {searchTerm === '' && (
          <CategoryRoundels />
        )}
      </div>

      {/* Dynamic Product Grid */}
      <div id="product-grid-section">
        <ProductGrid searchTerm={searchTerm} />
      </div>
      
      {/* Spacer for scrolling */}
      <div className="h-20"></div>
    </main>
  );
};

export default Home;
