import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartDrawer = () => {
  const { isCartOpen, setIsCartOpen, cartItems, updateQuantity, itemTotal, deliveryFee, handlingCharge, grandTotal } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/20 z-[60] backdrop-blur-sm cursor-pointer"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[70] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white">
              <h2 className="text-xl font-bold text-gray-900">My Cart</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 flex items-center justify-center text-4xl">
                    🛒
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Your cart is empty</h3>
                  <p className="text-gray-500 mb-6">Your favourite items are just a click away</p>
                  <button 
                    onClick={() => setIsCartOpen(false)} 
                    className="bg-[var(--color-blinkit-green)] text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition-colors shadow-sm"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Cart Items */}
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div className="flex items-center space-x-3 flex-1">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            <span className="text-[10px] text-gray-400 font-medium">{item.category}</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 line-clamp-1">{item.name}</p>
                            <p className="text-xs text-gray-500">{item.weight}</p>
                            <p className="text-sm font-bold mt-1">₹{item.discountPrice}</p>
                          </div>
                        </div>

                        {/* Quantity Selector inside Cart */}
                        <div className="flex items-center bg-[var(--color-blinkit-green)] text-white rounded-lg h-8 ml-4">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-full flex items-center justify-center hover:bg-green-700 rounded-l-lg transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-full flex items-center justify-center hover:bg-green-700 rounded-r-lg transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bill Details */}
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <h3 className="text-sm font-bold text-gray-900 mb-3">Bill Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-gray-600">
                        <span>Item Total</span>
                        <span>₹{itemTotal}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Delivery Fee</span>
                        <span>₹{deliveryFee}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Handling Charge</span>
                        <span>₹{handlingCharge}</span>
                      </div>
                      <div className="pt-2 mt-2 border-t border-gray-100 flex justify-between font-bold text-gray-900">
                        <span>Grand Total</span>
                        <span>₹{grandTotal}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-4 bg-white border-t border-gray-100">
                <button className="w-full bg-[var(--color-blinkit-green)] text-white font-bold text-lg py-4 rounded-xl flex items-center justify-between px-6 hover:bg-green-700 transition-colors shadow-lg shadow-green-200">
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-medium leading-none mb-1 text-green-100">{cartItems.length} {cartItems.length === 1 ? 'ITEM' : 'ITEMS'}</span>
                    <span className="leading-none">₹{grandTotal}</span>
                  </div>
                  <div className="flex items-center">
                    Proceed to Checkout <span className="ml-2 text-xl">→</span>
                  </div>
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
