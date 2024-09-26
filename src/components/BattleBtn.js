import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { joinBattle } from '../axios/battle';
import { io } from 'socket.io-client';

const BattleBtn = () => {
  const [isWaiting, setIsWaiting] = React.useState(false);
  const navigate = useNavigate();
  const socket = React.useRef(null);

  React.useEffect(() => {
    socket.current = io('http://localhost:8080');

    socket.current.on('connect', () => {
      console.log('Socket connected:', socket.current.id);
    });

    socket.current.on('matchFound', ({ matchId, problem }) => {
      console.log('Match Found:', matchId, problem);
      setIsWaiting(false);
      navigate(`/battle/${matchId}`, {
        state: { problem },
      });
    });

    return () => {
      socket.current.disconnect();
    };
  }, [navigate]);

  const handleJoinBattle = async () => {
    setIsWaiting(true);
    try {
      const userEmail = localStorage.getItem('email');
      console.log(userEmail);
      await joinBattle(userEmail);
    } catch (error) {
      console.error('배틀 참여 중 오류가 발생했습니다:', error);
      setIsWaiting(false);
    }
  };

  return (
    <Box>
      {isWaiting ? (
        <Typography variant="h6">매칭 대기 중...</Typography>
      ) : (
        <Button variant="contained" onClick={handleJoinBattle}>
          대전 참가
        </Button>
      )}
    </Box>
  );
};

export default BattleBtn;
