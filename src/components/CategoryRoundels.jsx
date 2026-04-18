import React from 'react';

const roundels = [
  { name: 'Fresh Fruits', image: '/images/cat_fruits.png' },
  { name: 'Paan Corner', image: '/images/cat_paan.png' },
  { name: 'Dairy, Bread & Eggs', image: '/images/cat_dairy.png' },
  { name: 'Fruits & Vegetables', image: '/images/cat_fruits.png' },
  { name: 'Cold Drinks & Juices', image: '/images/cat_drinks.png' },
  { name: 'Snacks & Munchies', image: '/images/cat_snacks.png' },
  { name: 'Sweet Tooth', image: '/images/cat_sweets.png' },
  { name: 'Atta, Rice & Dal', image: '/images/cat_staples.png' },
];

const CategoryRoundels = ({ selectedCategory, setSelectedCategory }) => {
  const handleCategoryClick = (catName) => {
    setSelectedCategory(catName);
    
    // Smooth scroll with offset for sticky headers
    const gridElement = document.getElementById(catName);
    if (gridElement) {
      const y = gridElement.getBoundingClientRect().top + window.scrollY - 140;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-10">
      <div className="flex overflow-x-auto space-x-3 md:space-x-6 pb-4 scrollbar-hide pl-1">
        {roundels.map((cat, i) => (
          <div 
            key={i} 
            className="flex flex-col items-center space-y-2 md:space-y-3 cursor-pointer group flex-shrink-0 w-20 md:w-24"
            onClick={() => handleCategoryClick(cat.name)}
          >
            <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-[3px] transition-transform duration-300 ${selectedCategory === cat.name ? 'border-[var(--color-blinkit-green)] shadow-sm transform scale-105' : 'border-transparent bg-white shadow-sm group-hover:scale-105'}`}>
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-300" />
            </div>
            <span className={`text-[11px] md:text-[13px] text-center leading-tight tracking-tight px-1 transition-colors duration-300 ${selectedCategory === cat.name ? 'text-gray-900 font-bold' : 'text-gray-500 font-medium group-hover:text-gray-900'}`}>
              {cat.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryRoundels;
