import React from 'react';
import styled from '@emotion/styled/macro';

const StyledButton = styled.button`
  width: 85%;
  padding: 10px 20px;
  border: 4px solid #82d21c;
  border-radius: 25px;
  background-color: white;
  color: black;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  position: absolute;
  bottom: 30px;

  &:hover {
    background-color: #83d21c71;
  }
`;

const LogoutButton = ({ onLogout }) => (
  <StyledButton onClick={onLogout}>로그아웃</StyledButton>
);

export default LogoutButton;
