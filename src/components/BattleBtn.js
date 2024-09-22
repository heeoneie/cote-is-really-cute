import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const BattleBtn = () => {
  const [isWaiting, setIsWaiting] = React.useState(false);

  const handleJoinBattle = () => {
    setIsWaiting(true);
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
