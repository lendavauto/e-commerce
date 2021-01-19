import React from 'react';
import { IoMdStarOutline } from 'react-icons/io';
import styled from 'styled-components';
import { REMOVE_FROM_CART } from '../actions';
import { useCartValue } from '../CartContext';

const CheckoutProduct = ({ id, title, image, price, rating, hideButton }) => {
  const [{ cart }, dispatch] = useCartValue();
  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      id: id,
    });
  };

  return (
    <CheckoutProductWrapper>
      <img src={image} alt='product image' className='checkoutProduct__image' />
      <div className='checkoutProduct__info'>
        <p className='checkoutProduct__title'>{title}</p>
        <p className='checkoutProduct__price'>
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className='checkoutProduct__rating'>
          {Array(rating)
            .fill()
            .map((_, index) => {
              return (
                <p key={index}>
                  <IoMdStarOutline className='checkoutProduct__ratingIcon' />
                </p>
              );
            })}
        </div>
        {hideButton ? (
          <button onClick={removeFromCart}>Hide item</button>
        ) : (
          <button onClick={removeFromCart}>Remove from cart</button>
        )}
      </div>
    </CheckoutProductWrapper>
  );
};

const CheckoutProductWrapper = styled.article`
  display: flex;
  margin: 0 auto;
  margin-bottom: 1rem;
  margin-top: 1rem;
  background: white;
  padding: 1rem;
  border-radius: 6px;
  width: 90%;
  @media (max-width: 768px) {
    width: 70%;
  }
  .checkoutProduct__info {
    padding-left: 20px;
    button {
      background: #f11713;
      color: white;
      padding: 0.5rem;
      font-size: 1rem;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      &:hover {
        background: #f33936;
      }
    }
  }
  .checkoutProduct__title {
    font-size: 1.2rem;
    font-weight: 500;
    padding: 10px;
    margin-right: 10px;
  }
  .checkoutProduct__price {
    padding: 10px;
  }
  .checkoutProduct__rating {
    display: flex;
    padding: 10px;
  }
  .checkoutProduct__image {
    object-fit: contain;
    width: 180px;
    height: 180px;
  }
  .checkoutProduct__ratingIcon {
    color: #ffc404;
    font-size: 1.5rem;
  }
`;

export default CheckoutProduct;
