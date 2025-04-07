import React, { useState, useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import socket from '@utils/socket';
import styled from '@emotion/styled/macro';
import useUserStore from '@store/userStore';

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

interface MatchFoundData {
  matchId: string;
  problem: string;
}

const BattleBtn: React.FC = () => {
  const [isWaiting, setIsWaiting] = useState<boolean>(false);
  const navigate = useNavigate();
  const { email: userEmail } = useUserStore();

  useEffect(() => {
    const handleMatchFound = ({ matchId, problem }: MatchFoundData) => {
      setIsWaiting(false);
      navigate(`/battle/${matchId}`, { state: { problem } });
    };

    socket.on('matchFound', handleMatchFound);

    return () => {
      socket.off('matchFound', handleMatchFound);
    };
  }, [navigate]);

  const handleJoinBattle = () => {
    setIsWaiting(true);

    if (userEmail) {
      socket.emit('joinBattle', userEmail);
    } else {
      console.error('유저 이메일을 찾을 수 없습니다.');
      setIsWaiting(false);
    }
  };

  const handleCancelWaiting = () => {
    setIsWaiting(false);
    socket.emit('leaveBattle');
  };

  return (
    <Box>
      {isWaiting ? (
        <Box
          onClick={handleCancelWaiting}
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
