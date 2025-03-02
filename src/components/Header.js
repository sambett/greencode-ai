import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeaderStyled = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: bold;
  font-size: 24px;
  color: var(--primary-dark);
`;

const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  background-color: var(--primary);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const Nav = styled.nav`
  display: flex;
  gap: 25px;
  a {
    text-decoration: none;
    color: var(--dark);
    font-weight: 500;
    transition: color 0.2s;
    &:hover {
      color: var(--primary);
    }
  }
`;

function Header() {
  return (
    <HeaderStyled as={motion.header} initial={{ y: -50 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}>
      <Logo>
        <LogoIcon>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 3v19" />
            <path d="M5 8l14 8" />
            <path d="M19 8L5 16" />
          </svg>
        </LogoIcon>
        <span>GreenCode AI</span>
      </Logo>
      <Nav>
        <a href="#">Home</a>
        <a href="#features">Features</a>
        <a href="#docs">Docs</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </Nav>
    </HeaderStyled>
  );
}

export default Header;