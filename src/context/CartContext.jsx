import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId, amount) => {
    setCartItems((prev) => {
      return prev.map((item) => {
        if (item.id === productId) {
          const newQuantity = item.quantity + amount;
          return { ...item, quantity: Math.max(0, newQuantity) };
        }
        return item;
      }).filter((item) => item.quantity > 0);
    });
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const itemTotal = cartItems.reduce((sum, item) => sum + (item.discountPrice * item.quantity), 0);
  
  // Blinkit style fee calculations
  const deliveryFee = itemTotal > 0 ? 15 : 0;
  const handlingCharge = itemTotal > 0 ? 4 : 0;
  const grandTotal = itemTotal > 0 ? itemTotal + deliveryFee + handlingCharge : 0;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        totalItems,
        itemTotal,
        deliveryFee,
        handlingCharge,
        grandTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
