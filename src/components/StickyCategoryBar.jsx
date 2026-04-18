import React from 'react';

const categories = [
  'All',
  'Fresh Fruits',
  'Dairy, Bread & Eggs',
  'Fruits & Vegetables',
  'Cold Drinks & Juices',
  'Snacks & Munchies',
  'Sweet Tooth',
  'Atta, Rice & Dal',
  'Paan Corner'
];

const StickyCategoryBar = ({ selectedCategory, setSelectedCategory }) => {
  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    
    // Smooth scroll with offset for sticky headers
    const gridElement = cat === 'All' ? document.getElementById('product-grid-section') : document.getElementById(cat);
    if (gridElement) {
      const y = gridElement.getBoundingClientRect().top + window.scrollY - 140;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-[148px] md:top-[77px] z-40 bg-white border-b border-gray-100 shadow-sm w-full left-0 right-0 overflow-hidden mt-[-32px] md:mt-0 mb-6 mx-[-16px] sm:mx-[-24px] lg:mx-[-32px] px-4 sm:px-6 lg:px-8 pt-2">
      <div className="flex overflow-x-auto space-x-6 scrollbar-hide pb-0">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`whitespace-nowrap pb-3 text-[14px] md:text-[15px] transition-colors relative ${
              selectedCategory === cat 
                ? 'text-gray-900 font-extrabold' 
                : 'text-gray-500 font-medium hover:text-gray-800'
            }`}
          >
            {cat}
            {selectedCategory === cat && (
              <div className="absolute bottom-0 left-0 w-full h-[4px] bg-[#0C831F] rounded-t-md"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StickyCategoryBar;
