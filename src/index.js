import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CartProvider } from './CartContext';
import reducer from './reducer';
import { initialState } from './CartContext';


ReactDOM.render(
  <React.StrictMode>
    <CartProvider initialState={initialState} reducer={reducer}>
      <App />
    </CartProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
