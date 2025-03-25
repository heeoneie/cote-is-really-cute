import React from 'react';
import Countdown from 'react-countdown';
import { Box } from '@mui/material';
import iphone_alarm from '../assets/iphone_alarm.mp3';
import '../styles/Timer.css';

const Timer = ({ initialMinutes }) => {
  const [timerMinutes, setTimerMinutes] = React.useState(
    initialMinutes * 60 * 1000,
  );
  const [isTimerActive, setIsTimerActive] = React.useState(false);
  const [isAlarmActive, setIsAlarmActive] = React.useState(false);
  const [audio] = React.useState(new Audio(iphone_alarm));

  React.useEffect(() => {
    if (isAlarmActive) audio.play();
    else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [isAlarmActive, audio]);

  const startTimer = () => {
    setIsTimerActive(true);
    setIsAlarmActive(false);
  };

  const stopTimer = () => {
    setIsTimerActive(false);
    setIsAlarmActive(false);
    audio.pause();
    audio.currentTime = 0;
  };

  const adjustTimer = (adjustment) =>
    setTimerMinutes((prev) =>
      Math.max(10 * 60 * 1000, prev + adjustment * 60 * 1000),
    );

  const renderer = ({ hours, minutes, seconds }) => {
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return (
      <h6 className="t-num">
        {formattedHours}:{formattedMinutes}:{formattedSeconds}
      </h6>
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
      <img
        src="/img/timer.png"
        alt="타이머"
        style={{ width: '200px', margin: '10px' }}
      />
      <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
        <button
          className="t-btn"
          onClick={() => adjustTimer(-10)}
          disabled={timerMinutes <= 10 * 60 * 1000}
        >
          -10분
        </button>
        <button className="t-btn" onClick={() => adjustTimer(10)}>
          +10분
        </button>
      </Box>
      {!isTimerActive && (
        <h6 className="t-num">
          {String(Math.floor(timerMinutes / 3600000)).padStart(2, '0')}:
          {String(Math.floor((timerMinutes % 3600000) / 60000)).padStart(
            2,
            '0',
          )}
          :{String(Math.floor((timerMinutes % 60000) / 1000)).padStart(2, '0')}
        </h6>
      )}

      {isTimerActive && (
        <Countdown
          date={Date.now() + timerMinutes}
          renderer={renderer}
          onComplete={() => setIsAlarmActive(true)}
        />
      )}

      {isAlarmActive && (
        <button onClick={stopTimer} className="tend-btn">
          STOP
        </button>
      )}

      {!isTimerActive && (
        <button onClick={startTimer} className="tstart-btn">
          START
        </button>
      )}
    </Box>
  );
};

export default Timer;
