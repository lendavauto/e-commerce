import React from 'react';
import styled from 'styled-components';
import { IoMdStarOutline } from 'react-icons/io';
import { useCartValue } from '../CartContext';
import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions';
const Product = ({ id, title, image, price, rating }) => {
  const [{ cart }, dispatch] = useCartValue();

  const addToCart = () => {
    dispatch({
      type: ADD_TO_CART,
      payload: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };

  return (
    <ProductWrapper>
      <div className='product'>
        <div className='product__info'>
          <p>{title}</p>
          <p className='product__price'>
            <small>€</small>
            <strong>{price}</strong>
          </p>
          <div className='product__rating'>
            {Array(rating)
              .fill()
              .map((_, index) => {
                return (
                  <p key={index}>
                    <IoMdStarOutline className='product__ratingIcon' />
                  </p>
                );
              })}
          </div>
        </div>
        <img src={image} alt='product image' />
        <button onClick={addToCart}>Add to cart</button>
      </div>
    </ProductWrapper>
  );
};

export default Product;

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  margin-right: 10px;
  background: white;
  width: 100%;
  min-height: 400px;
  padding: 20px;
  border-radius: 6px;
  @media (max-width: 1170px) {
    width: 80%;
    display: inline-block;
    margin: 1rem auto;
  }
  .product {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      max-height: 200px;
      display: inline-block;
      width: 100%;
      object-fit: contain;
      margin-bottom: 1rem;
    }
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
  .product__price {
    margin-top: 5px;
    strong {
      font-weight: 500;
    }
  }
  .product__rating {
    display: flex;
  }
  .product__ratingIcon {
    color: #ffc404;
    font-size: 1.5rem;
  }
  .product__info {
    margin-bottom: 1rem;
    height: 100px;
  }
`;
