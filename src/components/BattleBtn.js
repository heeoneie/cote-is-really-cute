import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import socket from '../utils/socket';
import styled from '@emotion/styled/macro';

const BattleButton = styled.button`
  width: 150px;
  padding: 10px 20px;
  border: 4px solid #d9d9d9;
  border-radius: 50px;
  background-color: #ffffff;
  color: #000000;
  cursor: pointer;
  margin-bottom: 10px;

  &:hover {
    background-color: #61ecff78;
    border-color: #61ecff;
  }
`;

const BattleBtn = () => {
  const [isWaiting, setIsWaiting] = React.useState(false);
  const navigate = useNavigate();

  const handleJoinBattle = async () => {
    setIsWaiting(true);
    try {
      socket.on('connect', () => {});
      const userEmail = localStorage.getItem('email');
      socket.emit('joinBattle', userEmail);

      socket.on('matchFound', ({ matchId, problem }) => {
        setIsWaiting(false);
        navigate(`/battle/${matchId}`, {
          state: { problem },
        });
      });
    } catch (error) {
      console.error('배틀 참여 중 오류가 발생했습니다:', error);
      setIsWaiting(false);
    }
  };

  const handleCancleWaiting = () => {
    setIsWaiting(false);
    socket.emit('leaveBattle');
    socket.off('matchFound');
  };

  return (
    <Box>
      {isWaiting ? (
        <Box
          onClick={handleCancleWaiting}
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
          }}
        >
          <CircularProgress size={60} color="primary" />
          <h6>매칭 대기 중...</h6>
        </Box>
      ) : (
        <BattleButton onClick={handleJoinBattle}>대전 참가</BattleButton>
      )}
    </Box>
  );
};

export default BattleBtn;
