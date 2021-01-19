import React from 'react';
import styled from 'styled-components';
import logo from '../images/shop-logo.png';
import { Link } from 'react-router-dom';
import { RiSearch2Line } from 'react-icons/ri';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useCartValue } from '../CartContext';
import { auth } from '../firebase';
const Header = () => {
  const [{ cart, user }] = useCartValue();

  const login = () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <HeaderWrapper className='header'>
      <Link to='/'>
        <img src={logo} alt='logo' className='header__logo' />
      </Link>

      <div className='header__search'>
        <input type='text' className='header__searchInput' />
        <RiSearch2Line className='header__searchIcon' />
      </div>

      <div className='header__nav'>
        <Link to={'/login'} className='header__link'>
          <div onClick={login} className='header__option'>
            <span className='header__optionLineOne header__username'>
              <span>Hello</span> {user?.email}
            </span>
            <span className='header__optionLineTwo'>
              {user ? 'Sing Out' : 'Sign In'}
            </span>
          </div>
        </Link>

        <Link to='/' className='header__link'>
          <div className='header__option'>
            <span className='header__optionLineOne'>Featured</span>
            <span className='header__optionLineTwo'>Products</span>
          </div>
        </Link>

        <Link to='/orders' className='header__link'>
          <div className='header__option'>
            <span className='header__optionLineOne'>Returns</span>
            <span className='header__optionLineTwo'>& Orders</span>
          </div>
        </Link>
        
        <Link to='/checkout' className='header__link'>
          <div className='header__optionCart'>
            <AiOutlineShoppingCart className='header__optionCartIcon' />
            <span className='header__CartCount'>{cart.length}</span>
          </div>
        </Link>
      </div>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.nav`
  height: 150px;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
  background: white;
  @media (max-width: 768px) {
    flex-direction: column;
    margin-bottom: 8rem;
    position: static;
    
  }
  .header__logo {
    height: 150px;
    width: 150px;
    object-fit: contain;
  }
  .header__searchInput {
    height: 1rem;
    padding: 1rem;
    border: none;
    background: #f0eeea;
    width: 100%;
    border-radius: 6px;
  }
  .header__searchIcon {
    font-size: 3rem;
    color: #f11713;
    margin-left: 1rem;
    margin-right: 1rem;
  }
  .header__search {
    display: flex;
    align-items: center;
    flex: 1;
  }
  .header__nav {
    display: flex;
    justify-content: space-evenly;
    @media (max-width: 768px) {
      align-items: center;
      margin-top: 10px;
      background: white;
      
    }
  }
  .header__option {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 1rem;
    &:hover {
      color: #ff6703;
    }
  }

  .header__link {
    text-decoration: none;
    color: #f11713;
  }
  .header__optionLineOne {
    font-size: 1rem;
  }
  .header__optionLineTwo {
    font-size: 1.1rem;
    font-weight: 500;
  }
  .header__optionCart {
    display: flex;
    align-items: center;
    span {
      font-size: 1.3rem;
      margin-right: 1rem;
      font-weight: 500;
    }
  }
  .header__optionCartIcon {
    font-size: 2rem;
    font-weight: 300;
    &:hover {
      color: #ff6703;
    }
  }
  .header__CartCount {
  }
  .header__username {
    color: #ff6703;
    span {
      color: #f11713;
    }
  }
`;

export default Header;
