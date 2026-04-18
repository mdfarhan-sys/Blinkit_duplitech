import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';

const categoryTitleMap = {
  'pharmacy': 'Pharmacy',
  'pet-care': 'Pet Care',
  'baby-care': 'Baby Care',
  'groceries': 'All Groceries',
};

const CategoryPage = ({ searchTerm }) => {
  const { categoryId } = useParams();
  
  const title = categoryTitleMap[categoryId] || 'Category';

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
      <div className="mb-6 flex items-center space-x-3">
        <Link to="/" className="text-sm font-bold text-gray-500 hover:text-[var(--color-blinkit-green)] transition-colors">
          Home
        </Link>
        <span className="text-gray-400 text-sm">/</span>
        <span className="text-sm font-bold text-gray-900">{title}</span>
      </div>
      
      {/* Dynamic Product Grid */}
      <ProductGrid selectedCategory={categoryId} searchTerm={searchTerm} isCategoryRoute={true} />
      
      {/* Spacer for scrolling */}
      <div className="h-20"></div>
    </main>
  );
};

export default CategoryPage;
