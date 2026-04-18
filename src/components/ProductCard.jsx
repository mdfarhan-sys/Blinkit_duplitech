import React, { useState } from 'react';
import { Timer, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const [imgError, setImgError] = useState(false);
  const { cartItems, addToCart, updateQuantity } = useCart();
  const cartItem = cartItems.find(item => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    addToCart(product);
    toast.success('Item added to cart');
  };

  return (
    <div className="bg-white border border-[#eeeeee] rounded-xl p-3 flex flex-col h-full relative transition-all duration-300 hover:border-gray-300 group">
      {/* Delivery Badge */}
      <div className="absolute top-3 left-3 bg-white bg-opacity-90 backdrop-blur-sm px-1.5 py-0.5 rounded shadow-sm flex items-center z-10 border border-gray-100">
        <Timer className="w-3 h-3 text-gray-700 mr-1" />
        <span className="text-[10px] font-bold text-gray-800">11 MINS</span>
      </div>

      {/* Image / Fallback Placeholder */}
      <div className="w-full h-32 bg-gray-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
        {product.imageUrl && !imgError ? (
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-gray-400 text-xs font-medium text-center leading-tight p-2">{product.category}</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col">
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 leading-snug mb-1">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500 mb-3">{product.weight}</p>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
            <span className="text-sm font-bold text-gray-900">₹{product.discountPrice}</span>
          </div>

          {/* Add Button / Quantity Selector */}
          {quantity === 0 ? (
            <motion.button 
              whileTap={{ scale: 0.85 }}
              onClick={handleAddToCart}
              className="border border-[#0C831F] text-[#0C831F] bg-white hover:bg-green-50 active:bg-[#0C831F] active:text-white px-4 py-1.5 rounded-lg text-sm font-bold uppercase transition-colors duration-300"
            >
              ADD
            </motion.button>
          ) : (
            <div className="bg-[var(--color-blinkit-green)] text-white flex items-center justify-between rounded-lg px-2 py-1.5 w-20">
              <motion.button whileTap={{ scale: 0.8 }} onClick={() => updateQuantity(product.id, -1)} className="font-bold px-1 hover:text-green-100 transition-colors">-</motion.button>
              <span className="text-sm font-bold">{quantity}</span>
              <motion.button whileTap={{ scale: 0.8 }} onClick={() => updateQuantity(product.id, 1)} className="font-bold px-1 hover:text-green-100 transition-colors">+</motion.button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
