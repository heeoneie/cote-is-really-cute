import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled/macro';

const AuthLinksContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 30px;
  font-weight: bold;
`;

const StyledButton = styled.button`
  width: 150px;
  padding: 10px 20px;
  border: 4px solid #82d21c;
  border-radius: 25px;
  background-color: white;
  color: black;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #83d21c71;
  }
`;

const AuthLinks = () => {
  const navigate = useNavigate();

  return (
    <AuthLinksContainer>
      <StyledButton type="button" onClick={() => navigate('/login')}>
        로그인
      </StyledButton>
      <StyledButton type="button" onClick={() => navigate('/signup')}>
        회원가입
      </StyledButton>
    </AuthLinksContainer>
  );
};

export default AuthLinks;
