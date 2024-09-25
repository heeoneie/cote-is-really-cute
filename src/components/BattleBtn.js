import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { checkMatchingStatus, joinBattle } from '../axios/battle';

const BattleBtn = () => {
  const [isWaiting, setIsWaiting] = React.useState(false);
  const [matchId, setMatchId] = React.useState(null);
  const navigate = useNavigate();

  const handleJoinBattle = async () => {
    setIsWaiting(true);
    try {
      const userEmail = localStorage.getItem('email');
      console.log(userEmail);
      const response = await joinBattle(userEmail);
      setMatchId(response.matchId);
    } catch (error) {
      console.error('배틀 참여 중 오류가 발생했습니다:', error);
      setIsWaiting(false);
    }
  };

  React.useEffect(() => {
    let interval;
    if (isWaiting && matchId) {
      interval = setInterval(async () => {
        try {
          const status = await checkMatchingStatus(matchId);
          console.log(status);
          if (status.isMatched) {
            setIsWaiting(false);
            navigate(`/battle/${matchId}`);
          }
        } catch (error) {
          alert(error);
          setIsWaiting(false);
        }
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isWaiting, matchId]);

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
