import React from 'react';
import styled from '@emotion/styled/macro';

const StyledButton = styled.button`
  margin-left: auto;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
  border: none;
  background-color: white;

  &:hover {
    color: #82d21c;
  }
`;

const HomeButton = ({ onNavigate }) => (
  <StyledButton onClick={onNavigate}>홈으로 가기</StyledButton>
);

export default HomeButton;
