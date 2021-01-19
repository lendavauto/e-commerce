import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterWrapper>
      <h5>
        &copy;{new Date().getFullYear()}
        <span> BOOM comics</span>
      </h5>
      <h5>All rights reserved.</h5>
    </FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.footer`
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: #010000;
  margin-top: auto;
  h5 {
    color: white;
    font-family: 'Signika', sans-serif;
    font-weight: 300;
  }
`;
