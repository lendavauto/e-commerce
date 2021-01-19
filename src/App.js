import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './index.css';
import { useCartValue } from './CartContext';
import { auth } from './firebase';
import { SET_USER } from './actions';
import styled from 'styled-components';
import Header from './components/Header';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import Login from './components/Login';
import Footer from './components/Footer';
import Payment from './pages/Payment';
import Orders from './pages/Orders';
import { loadStripe } from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js'
// public key
const promise = loadStripe(
  'pk_test_51I58RKEyH1fiHuqyNYHon3wpikJKpV0v4VjM6sG13VZ2iJHMJcxzwMuYU0bVxHDI8ja9F7FSUOFxe1kXlC3VIztT00z1N2iQv6'
);

function App() {
  const [{ user }, dispatch] = useCartValue();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: SET_USER,
          payload: authUser,
        });
      } else {
        dispatch({
          type: SET_USER,
          payload: null,
        });
      }
    });
    // cleanup operations
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Router>
      <AppWrapper>
        <Switch>
          <Route path='/orders'>
            <Header />
            <Orders />
            <Footer />
          </Route>
          <Route path='/payment'>
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
            <Footer />
          </Route>
          <Route path='/checkout'>
            <Header />
            <Checkout />
            <Footer />
          </Route>
          <Route path='/login'>
            <Login />
            <Footer />
          </Route>
          <Route path='/'>
            <Header />
            <Home />
            <Footer />
          </Route>
        </Switch>
      </AppWrapper>
    </Router>
  );
}

const AppWrapper = styled.div``;

export default App;
