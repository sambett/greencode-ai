import React from 'react';
import styled from 'styled-components';

const FooterStyled = styled.footer`
  text-align: center;
  padding: 20px 0;
  color: #777;
`;

function Footer() {
  return (
    <FooterStyled>
      <p>© 2025 GreenCode AI</p>
    </FooterStyled>
  );
}

export default Footer;