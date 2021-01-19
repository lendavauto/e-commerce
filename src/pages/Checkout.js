import React from 'react';
import styled from 'styled-components';
import { useCartValue } from '../CartContext';
import CheckoutProduct from '../components/CheckoutProduct';
import Subtotal from '../components/Subtotal';
import img from '../images/checkout-bcg.webp';
import uuid from 'react-uuid';


const Checkout = () => {
  const [{ cart, user }] = useCartValue();

  return (
    <CheckoutWrapper>
      <div className='checkout__top'>
        <img src={img} alt='checkout image' className='checkout__img' />
        {cart?.length === 0 ? (
          <div>
            <h1>Your cart is empty...</h1>
            <p className='checkout__paragraph'>
              No items in the cart. Push 'Add to cart' on product page to add
              items to your cart.
            </p>
          </div>
        ) : (
          <div>
            <h1 className='checkout__title'>Your Shopping Cart.</h1>
            {cart?.map(({ id, title, image, price, rating }) => {
              console.log(cart);
              return (
                <CheckoutProduct
                  key={uuid()}
                  price={price}
                  image={image}
                  title={title}
                  rating={rating}
                />
              );
            })}
          </div>
        )}
      </div>
      {cart.length > 0 && (
        <div className='checkout__bottom'>
          <Subtotal />
        </div>
      )}
    </CheckoutWrapper>
  );
};

export default Checkout;
const CheckoutWrapper = styled.section`
  max-width: 1600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background: black;
  border-radius: 6px;
  min-height: calc(100vh - 300px);
  .checkout__img {
    height: 150px;
    width: 100%;
    object-fit: cover;
    margin-bottom: 1rem;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }
  .checkout__title {
    color: white;
    font-size: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .checkout__top {
  }
  .checkout__bottom {
    height: 200px;
    width: 45%;
    background: white;
    margin-bottom: 1rem;
    margin: 0 auto;
    margin-bottom: 1rem;
    border-radius: 6px;
    h1 {
      font-weight: 400;
    }
  }
  h1 {
    color: white;
    display: flex;
    justify-content: center;
    font-weight: 400;
    font-size: 3rem;
  }
  .checkout__paragraph {
    color: white;
    text-align: center;
    margin-top: 3rem;
  }
`;
