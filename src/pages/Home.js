import React from 'react';
import styled from 'styled-components';
import img from '../images/hero-img.png';
import Product from '../components/Product';
import uuid from 'react-uuid';

const Home = () => {
  return (
    <HomeWrapper>
      <img src={img} alt='hero image' className='home__heroImg' />
      <article className='home__productContainer1'>
        <Product
          id={uuid()}
          title='Batman: Year One'
          price={15.99}
          rating={4}
          image='https://m.media-amazon.com/images/I/71OEX4Y3zJL._AC_UY218_.jpg'
        />
        <Product
          id={uuid()}
          title='Batman: The Golden Age Vol. 1'
          price={19.99}
          rating={5}
          image='https://m.media-amazon.com/images/I/91sEk-3MGHL._AC_UL320_.jpg'
        />
      </article>
      <article className='home__productContainer2'>
        <Product
          id={uuid()}
          title='Batman: The War Years 1939-1945: Presenting over 20 classic full length Batman tales from the DC comics vault! (DC Comics: The War Years)'
          price={19.99}
          rating={5}
          image='https://m.media-amazon.com/images/I/715N4VMr3zL._AC_UY218_.jpg'
        />
        <Product
          id={uuid()}
          title='Amazing Spider-Man Masterworks Vol. 8 (Amazing Spider-Man (1963-1998))'
          price={17.99}
          rating={4}
          image='https://m.media-amazon.com/images/I/81XKHIUOQAL._AC_UY218_.jpg'
        />
        <Product
          id={uuid()}
          title='Batman: The War Years 1939-1945: Presenting over 20 classic full length Batman tales from the DC comics vault! (DC Comics: The War Years)'
          price={13.99}
          rating={5}
          image='https://m.media-amazon.com/images/I/91gYU8DH7JL._AC_UY218_.jpg'
        />
      </article>
      <article className='home__productContainer3'>
        <Product
          id={uuid()}
          title='Invincible Iron Man #1 (Phantom Variant)'
          price={17.99}
          rating={5}
          image='https://m.media-amazon.com/images/I/61Tav8dlVoL._AC_UL320_.jpg'
        />
      </article>
      <div className='hero__backgroundColor'></div>
      {/* product id,title,price,rating,image*/}
      {/* product */}
    </HomeWrapper>
  );
};

export default Home;

const HomeWrapper = styled.section`
  max-width: 1600px;
  margin: 0 auto;

  .home__productContainer1,
  .home__productContainer2,
  .home__productContainer3 {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-right: 1rem;
    margin-left: 1rem;
    margin-bottom: 10px;
    object-fit: contain;
    max-width: 1580px;
    z-index: 1;
    @media (max-width: 1170px) {
      background: black;
      margin: 0 auto;
    }
  }
  .home__productContainer1 {
    @media (max-width: 1170px) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      background: black;
    }
    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
    }
  }
  .home__productContainer2 {
    @media (max-width: 1170px) {
      flex-direction: column;
      height: 80%;
    }
  }
  .home__heroImg {
    box-sizing: border-box;
    height: calc(100vh - 150px);
    width: 100%;
    border-radius: 6px;
    background-image: linear-gradient(
      to top,
      #000000,
      #3f111c,
      #7a0d27,
      #b70326,
      #f11713
    );
    margin-bottom: -750px;
    z-index: -1;
    @media (max-width: 768px) {
      margin-bottom: -950px;
      
    }
  }
  .hero__backgroundColor {
    z-index: -1;
    background-image: linear-gradient(
      to bottom,
      #000000,
      #3f111c,
      #7a0d27,
      #b70326,
      #f11713
    );
    height: 800px;
    margin-top: -750px;
  }
`;
