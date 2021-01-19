import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useCartValue } from '../CartContext';
import Order from '../components/Order';
import { db } from '../firebase';
import uuid from 'react-uuid';

const Orders = () => {
  const [{ cart, user }, dispatch] = useCartValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    let unmounted = false;
    if (user && !unmounted) {
      db.collection('users')
        .doc(user?.uid)
        .collection('orders')
        .orderBy('created', 'desc')
        .onSnapshot((snapshot) =>
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    } else {
      setOrders([]);
    }
    return () => {
      unmounted = true;
    };
  }, [user]);

  return (
    <OrdersWrapper>
      <h1>your orders</h1>
      <div className='orders__order'>
        {orders?.map((order) => (
          <Order key={uuid()} order={order} />
        ))}
      </div>
    </OrdersWrapper>
  );
};

const OrdersWrapper = styled.section`
  min-height: calc(100vh - 300px);
  background: black;
  padding: 20px 80px;
  @media (max-width: 768px) {
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .orders__order {
  }
  h1 {
    color: white;
    font-size: 3rem;
    font-weight: 400;
    display: flex;
    justify-content: center;
    margin: 30px 0;
  }
`;

export default Orders;
