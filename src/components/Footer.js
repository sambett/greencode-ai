import React from 'react';
import styled from 'styled-components';

const FooterStyled = styled.footer`
  margin-top: 50px;
  padding: 20px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  text-align: center;
  color: #777;
`;

function Footer() {
  return (
    <FooterStyled>
      <p>© 2025 GreenCode AI | Write sustainable code for a sustainable future</p>
    </FooterStyled>
  );
}

export default Footer;