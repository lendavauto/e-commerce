import moment from 'moment';
import React from 'react';
import styled from 'styled-components';
import CheckoutProduct from './CheckoutProduct';
import CurrencyFormat from 'react-currency-format';

const Order = ({ order }) => {
  return (
    <OrderWrapper>
      <h2>order</h2>
      <p className='order__idColor'>
        {moment.unix(order.data.created).format('MMMM Do YYY, h:mma')}
      </p>
      <p className='order__id'>
        <small>{order.id}</small>
      </p>
      {order.data.cart?.map((item) => (
        <CheckoutProduct
          key={item.id}
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
          hideButton
        />
      ))}
      <CurrencyFormat
        renderText={(value) => (
          <h3 className='order__total'>Order Total: {value}</h3>
        )}
        decimalScale={2}
        value={order.data.amount / 100}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'€'}
      />
    </OrderWrapper>
  );
};

const OrderWrapper = styled.div`
  padding: 40px;
  margin: 20px;
  position: relative;
  @media (max-width: 768px) {
    display: grid;
    width: 70%;
  }
  h2 {
    color: white;
  }
  small {
    color: white;
  }
  .order__id {
    position: absolute;
    top: 40px;
    right: 20px;
  }
  .order__idColor {
    color: white;
  }
  .order__total {
    color: white;
    font-size: 2rem;
    text-align: right;
  }
`;

export default Order;
