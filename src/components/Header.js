import React from 'react';
import { keyframes } from 'styled-components';
import styled from 'styled-components';
import logo from '../assets/images/AniFlex.png';
import icon from '../assets/images/React-icon.svg.png';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const AnimatedImage = styled.img`
  animation: ${spin} 4s linear infinite;
  max-height: 70px;
  max-width: 70px;
`;

function Header() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <img src={logo} alt="Anime Image" />
      <AnimatedImage src={icon} alt="logo" />
    </div>
  );
}

export default Header;
