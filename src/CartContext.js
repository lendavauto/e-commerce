import React, { createContext, useContext, useReducer } from 'react';


export const initialState = {
  cart: [],
  user: null,
};
export const getCartTotal = (cart) => {
  return cart?.reduce((amount, item) => item.price + amount, 0);
};
export const CartContext = createContext();
export const CartProvider = ({ reducer, initialState, children }) => {
  return (
    <CartContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartValue = () => useContext(CartContext);
