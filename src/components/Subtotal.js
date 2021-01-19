import React from 'react';
import styled from 'styled-components';
import CurrencyFormat from 'react-currency-format';
import { useCartValue } from '../CartContext';
import { getCartTotal } from '../CartContext';
import { useHistory } from 'react-router-dom';

const Subtotal = () => {
  const history = useHistory();
  const [{ cart }] = useCartValue();

  return (
    <SubtotalWrapper>
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({cart.length} items): <strong>{`${value}`}</strong>
            </p>
            <small className='subtotal__gift'>
              <input type='checkbox' /> This order contains a gift.
            </small>
          </>
        )}
        decimalScale={2}
        value={getCartTotal(cart)}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'$'}
      ></CurrencyFormat>
      <button onClick={(e) => history.push('/payment')}>Proceed to Checkout</button>
    </SubtotalWrapper>
  );
};

export default Subtotal;

const SubtotalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-top: 2.2rem;
  padding: 20px;
  background: #f3f3f3;
  border: 1px solid #dddddd;
  border-radius: 3px;
  .subtotal__gift {
    display: flex;
    align-items: center;
    input {
      margin-right: 6px;
    }
  }
  button {
    margin-top: 6px;
    background: #f11713;
    color: white;
    padding: 0.7rem;
    font-size: 1.2rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    &:hover {
      background: #f33936;
    }
  }
`;
