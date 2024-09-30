import React from 'react';
import styled from '@emotion/styled/macro';
import { useNavigate } from 'react-router-dom';

const StyledButton = styled.button`
  margin-bottom: 20px;
  font-family: 'DNFBitBitv2';
  font-size: 36px;
  cursor: pointer;
  border: none;
  background-color: white;
  color: #82d21c;

  &:hover {
    color: #82d21c95;
  }
`;

const HomeButton = () => {
  const navigate = useNavigate();
  return (
    <StyledButton onClick={() => navigate('/')}>
      코테는 정말 귀여워
    </StyledButton>
  );
};

export default HomeButton;
