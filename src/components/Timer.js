import React from 'react';
import Countdown from 'react-countdown';
import { Box, Button, Typography } from '@mui/material';

const Timer = ({ initialMinutes, onComplete }) => {
  const [timerMinutes, setTimerMinutes] = React.useState(initialMinutes);
  const [isTimerActive, setIsTimerActive] = React.useState(false);

  const startTimer = () => setIsTimerActive(true);

  const adjustTimer = (adjustment) =>
    setTimerMinutes((prev) => Math.max(10, prev + adjustment));

  const renderer = ({ hours, minutes, seconds }) => {
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return (
      <Typography variant="h4">
        {formattedHours}:{formattedMinutes}:{formattedSeconds}
      </Typography>
    );
  };

  return (
    <Box
      sx={{
        mb: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => adjustTimer(-10)}
          disabled={timerMinutes <= 10}
        >
          -10분
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => adjustTimer(10)}
        >
          +10분
        </Button>
      </Box>

      {!isTimerActive && (
        <Typography variant="h6" sx={{ alignSelf: 'center' }}>
          {Math.floor(timerMinutes / 60)}시간 {timerMinutes % 60}분 00초
        </Typography>
      )}

      {isTimerActive && (
        <Countdown
          date={Date.now() + timerMinutes * 60000}
          renderer={renderer}
          onComplete={onComplete}
        />
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={startTimer}
        sx={{ mt: 2 }}
      >
        타이머 시작
      </Button>
    </Box>
  );
};

export default Timer;
