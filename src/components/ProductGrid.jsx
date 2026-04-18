import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

const APP_CATEGORIES = [
  'Fresh Fruits',
  'Dairy, Bread & Eggs',
  'Fruits & Vegetables',
  'Cold Drinks & Juices',
  'Snacks & Munchies',
  'Sweet Tooth',
  'Atta, Rice & Dal',
  'Paan Corner'
];

const hardcodedItems = [
  {
    id: 'hc-1',
    name: 'Amul Taaza Milk',
    weight: '500ml',
    originalPrice: 28,
    discountPrice: 27,
    category: 'Dairy, Bread & Eggs',
    imageUrl: '/images/amul_milk.png'
  },
  {
    id: 'hc-2',
    name: 'Maggi 2-Minute Noodles (Pack of 4)',
    weight: '280g',
    originalPrice: 70,
    discountPrice: 60,
    category: 'Snacks & Munchies',
    imageUrl: '/images/maggi_noodles.png'
  },
  {
    id: 'hc-3',
    name: 'Sudha Dairy Paneer',
    weight: '200g',
    originalPrice: 90,
    discountPrice: 85,
    category: 'Dairy, Bread & Eggs',
    imageUrl: '/images/mother_dairy_paneer.png'
  },
  {
    id: 'hc-4',
    name: 'Aashirvaad Atta',
    weight: '5kg',
    originalPrice: 290,
    discountPrice: 245,
    category: 'Atta, Rice & Dal',
    imageUrl: '/images/aashirvaad_atta.png'
  },
  {
    id: 'hc-paan-1',
    name: 'Rajnigandha Silver Pearls',
    weight: '6.25g',
    originalPrice: 15,
    discountPrice: 15,
    category: 'Paan Corner',
    imageUrl: 'https://cdn.dummyjson.com/product-images/1/thumbnail.jpg'
  },
  {
    id: 'hc-paan-2',
    name: 'Center Fresh Mints',
    weight: '35g',
    originalPrice: 50,
    discountPrice: 45,
    category: 'Paan Corner',
    imageUrl: 'https://cdn.dummyjson.com/product-images/2/thumbnail.jpg'
  },
  {
    id: 'hc-paan-3',
    name: 'BIC Maxi Lighter',
    weight: '1 unit',
    originalPrice: 40,
    discountPrice: 35,
    category: 'Paan Corner',
    imageUrl: 'https://cdn.dummyjson.com/product-images/3/thumbnail.jpg'
  }
];

const ProductGrid = ({ selectedCategory, searchTerm, isCategoryRoute }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products/category/groceries');
        const data = await response.json();
        
        const mappedProducts = data.products
          .filter(item => {
            const text = (item.title + ' ' + (item.description || '')).toLowerCase();
            return !text.match(/(beef|pork|meat|chicken|fish|bacon)/i);
          })
          .map((item, index) => {
            const discountPrice = Math.round(item.price * 80);
            const originalPrice = Math.round(discountPrice / (1 - item.discountPercentage / 100));
            
            const title = item.title.toLowerCase();
            let cat = APP_CATEGORIES[index % APP_CATEGORIES.length];

            if (title.includes('apple') || title.includes('kiwi') || title.includes('strawberry') || title.includes('lemon') || title.includes('mango') || title.includes('banana')) {
              cat = 'Fresh Fruits';
            } else if (title.includes('milk') || title.includes('cheese') || title.includes('egg') || title.includes('butter')) {
              cat = 'Dairy, Bread & Eggs';
            } else if (title.includes('water') || title.includes('juice') || title.includes('drink')) {
              cat = 'Cold Drinks & Juices';
            } else if (title.includes('rice') || title.includes('dal') || title.includes('flour') || title.includes('atta')) {
              cat = 'Atta, Rice & Dal';
            }
            
            if (cat === 'Paan Corner') cat = 'Snacks & Munchies';

            return {
              id: item.id,
              name: item.title,
              weight: item.weight ? `${item.weight}g` : '1 pack',
              originalPrice,
              discountPrice,
              category: cat,
              imageUrl: item.thumbnail
            };
          });
        
        setProducts([...hardcodedItems, ...mappedProducts]);
      } catch (error) {
        console.error('Failed to fetch groceries:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  let filteredProducts = products;
  
  if (searchTerm.trim() !== '') {
    filteredProducts = products.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } else if (isCategoryRoute && selectedCategory !== 'All' && selectedCategory !== 'groceries') {
    filteredProducts = products.filter(p => p.category === selectedCategory);
  }

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">Loading...</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-xl p-3 flex flex-col h-[280px] animate-pulse shadow-sm">
              <div className="w-full h-32 bg-gray-200 rounded-lg mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="py-20 text-center flex flex-col items-center justify-center bg-white rounded-2xl border border-gray-100 shadow-sm">
        <span className="text-5xl mb-4 block">
          {isCategoryRoute ? '📦' : '🔍'}
        </span>
        <p className="font-extrabold text-gray-900 text-xl mb-2">
          {isCategoryRoute ? 'This category is currently empty' : 'No products found'}
        </p>
        <p className="text-gray-500 mb-6 text-sm">
          {isCategoryRoute ? "We're restocking these items. Check back soon!" : 'Try a different search term or category.'}
        </p>
        {isCategoryRoute && (
          <Link to="/" className="bg-[var(--color-blinkit-green)] text-white px-6 py-3 rounded-xl font-bold shadow-sm hover:bg-green-700 transition-colors">
            Back to Home
          </Link>
        )}
      </div>
    );
  }

  // Handle traditional single grid for category pages or active search
  if (isCategoryRoute || searchTerm.trim() !== '') {
    return (
      <div className="w-full">
        {!isCategoryRoute && (
          <div className="flex items-center justify-between mb-4 md:mb-5">
            <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">Search Results</h2>
            <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full hidden md:inline-block">
              {filteredProducts.length} items
            </span>
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    );
  }

  // Handle stacked slider rendering for the main Home page
  const productsByCategory = APP_CATEGORIES.map(category => ({
    category,
    items: filteredProducts.filter(p => p.category === category)
  })).filter(group => group.items.length > 0);

  return (
    <div className="w-full space-y-10 md:space-y-12">
      {productsByCategory.map((group) => (
        <div key={group.category} id={group.category} className="w-full pt-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">{group.category}</h2>
            <span className="text-[var(--color-blinkit-green)] font-bold text-sm cursor-pointer hover:text-green-700 transition-colors">see all</span>
          </div>
          
          {/* Horizontal Slider */}
          <div className="flex overflow-x-auto space-x-3 md:space-x-4 pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 touch-pan-x snap-x snap-mandatory">
            {group.items.map((product) => (
              <div key={product.id} className="w-[42vw] md:w-48 lg:w-52 flex-shrink-0 snap-start">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
