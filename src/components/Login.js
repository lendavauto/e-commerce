import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { auth } from '../firebase';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const login = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        // redirect after login
        history.push('/');
      })
      .catch((e) => alert(e.message));
  };
  const register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        // redirect after register
        history.push('/');
      })
      .catch((e) => alert(e.message));
  };
  return (
    <LoginWrapper>
      <Link to='/'>
        <img
          src='https://logosbynick.com/wp-content/uploads/2019/03/Step-5.png'
          alt='login logo'
          className='login__logo'
        />
      </Link>
      <div className='login__container'>
        <h1>Sign in</h1>
        <form action='submit'>
          <h5>E-mail</h5>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='email'
          />
          <h5>Password</h5>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
          />
          <button onClick={login} className='login__singInButton' type='submit'>
            Sign In
          </button>
        </form>
        <p>
          By continuing, you agree to BOOM's Conditions of Use and Privacy
          Notice.
        </p>
        <button onClick={register} className='login__registerButton'>
          Create a BOOM Account
        </button>
      </div>
    </LoginWrapper>
  );
};

export default Login;

const LoginWrapper = styled.div`
  background: #f7f7f7;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 150px);

  h1 {
    font-weight: 400;
  }
  h5 {
    font-family: 'Signika', sans-serif;
    font-weight: 400;
    font-size: 0.9rem;
  }
  p {
    margin-bottom: 1rem;
    margin-top: 1rem;
  }
  .login__logo {
    height: 100px;
    object-fit: contain;
  }
  .login__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid black;
    border-radius: 6px;
    padding: 2rem;
    background: white;
    margin: 0 auto;
    margin-top: 1rem;
    max-width: 400px;
    form {
      display: flex;
      flex-direction: column;
    }
    input {
      padding: 6px;
      margin-bottom: 6px;
      border-radius: 6px;
      border: none;
      outline: none;
      background: lightgray;
    }
    button {
      background: #f11713;
      color: white;
      padding: 0.5rem;
      font-size: 1rem;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      margin: 0 auto;
      width: 50%;
      &:hover {
        background: #f33936;
      }
    }
  }
  .login__singInButton {
  }
  .login__registerButton {
  }
`;
