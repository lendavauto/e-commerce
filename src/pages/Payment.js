import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { getCartTotal, useCartValue } from '../CartContext';
import CheckoutProduct from '../components/CheckoutProduct';
import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import axios from '../axios';
import { CLEAR_CART } from '../actions';
import { db } from '../firebase';
import uuid from 'react-uuid';


const Payment = () => {
  const [{ cart, user }, dispatch] = useCartValue();
  const history = useHistory();
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState('');
  const [error, setError] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    // generate stripe secret
    const getClientSecret = async () => {
      const response = await axios({
        method: 'post',
        // total = currency subunits for stripe
        url: `/payments/create?total=${getCartTotal(cart) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [cart]);

  console.log('THE SECRET IS ---->', clientSecret);

  // stripe submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // paymentIntent = payment confirmation
        console.log(paymentIntent);
        db
          .collection('users')
          .doc(user?.uid) // uid
          .collection('orders')
          .doc(paymentIntent.id)
          .set({
            cart: cart,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: CLEAR_CART,
        });

        //  to not come back to order page
        history.replace('/orders');
      });
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : '');
  };
  return (
    <PaymentWrapper>
      <div className='payment__container'>
        <h1>
          Checkout (<Link key={uuid()} to='/checkout'>{cart?.length} items</Link>)
        </h1>

        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Delivery Address</h3>
          </div>
          <div className='payment__address'>
            <p>{user?.email}</p>
            <p>Kassisaba 5-61</p>
            <p>Tallinn, Harjumaa</p>
          </div>
        </div>

        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Review items and delivery</h3>
          </div>
          <div className='payment__item'>
            {cart?.map(({ id, title, image, price, rating }, index) => {
              return (
                <CheckoutProduct
                  key={index}
                  id={id}
                  price={price}
                  image={image}
                  title={title}
                  rating={rating}
                />
              );
            })}
          </div>
        </div>

        <div className='payment__section'>
          <h3>Payment Method</h3>
          <div className='payment__details'>
            <form typeof='submit' onSubmit={handleSubmit}>
              <CardElement
                className='payment__cardElement'
                onChange={handleChange}
              />
              <div className='payment__priceContainer'>
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getCartTotal(cart)}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'€'}
                ></CurrencyFormat>
                <button
                  type='submit'
                  disabled={processing || disabled || succeeded}
                >
                  <span>{processing ? <p>Processing...</p> : 'Buy Now'}</span>
                </button>
              </div>
            </form>

            {error && <div>{error}</div>}
          </div>
        </div>
      </div>
    </PaymentWrapper>
  );
};

const PaymentWrapper = styled.section`
  background: lightgray;
  min-height: calc(100vh - 300px);

  h1,
  h3 {
    font-family: 'Signika', sans-serif;
    font-weight: 400;
  }
  .payment__checkout-number {
    color: #f11713;
    cursor: pointer;
    text-decoration: none;
    &:hover {
      color: #f33936;
    }
  }
  .payment__container {
    h1 {
      text-align: center;
      padding: 10px;
      border-bottom: 1px solid gray;
    }
  }
  .payment__section {
    display: flex;
    padding: 20px;
    margin: 0 20px;
    width: 90%;
    flex: 0.2;
    @media (max-width: 768px) {
      flex-direction: column;
    }
  }
  .payment__title {
    flex: 0.2;
    border-bottom: 1px solid gray;
  }
  .payment__address {
    flex: 0.8;
    border-bottom: 1px solid gray;
  }
  .payment__item {
    flex: 0.8;
    border-bottom: 1px solid gray;
    @media (max-width: 768px) {
      margin-right: 2rem;
    }
  }
  .payment__details {
    margin-left: 1rem;
    flex: 0.8;
    margin: 0 auto;
    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
    }
  }
  .payment__cardElement {
    background: white;
    padding: 10px;
    border-radius: 6px;
  }
  .payment__priceContainer {
    h3 {
      margin-top: 1rem;
    }
    button {
      margin-top: 6px;
      background: #f11713;
      color: white;
      padding: 0.7rem;
      font-size: 1rem;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      &:hover {
        background: #f33936;
      }
    }
  }
`;

export default Payment;
