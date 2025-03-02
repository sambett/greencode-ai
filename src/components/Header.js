import React from 'react';
import styled from 'styled-components';

const HeaderStyled = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 24px;
  font-weight: bold;
  color: var(--primary-dark);
`;

function Header() {
  return (
    <HeaderStyled>
      <Logo>
        <span>GreenCode AI</span>
      </Logo>
    </HeaderStyled>
  );
}

export default Header;