import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled/macro';

const AuthLinksContainer = styled.div`
  margin-left: auto;
  font-weight: bold;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;

  &:hover {
    color: #82d21c;
  }
`;

const AuthLinks = () => (
  <AuthLinksContainer>
    <StyledLink to="/login">로그인</StyledLink> |{' '}
    <StyledLink to="/signup">회원가입</StyledLink>
  </AuthLinksContainer>
);

export default AuthLinks;
