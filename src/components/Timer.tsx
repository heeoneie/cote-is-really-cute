'use client';

import React, { useState, useEffect, useRef } from 'react';
import Countdown, { CountdownRenderProps } from 'react-countdown';

interface TimerProps {
  initialMinutes: number;
  onTimerEnd?: () => void;
}

const Timer: React.FC<TimerProps> = ({ initialMinutes, onTimerEnd }) => {
  const [timerMinutes, setTimerMinutes] = useState(initialMinutes * 60 * 1000);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isAlarmActive, setIsAlarmActive] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(
    new Audio('/audio/iphone_alarm.mp3'),
  );
  const MIN_TIMER_MINUTES = 10;
  const MILLISECONDS_PER_MINUTE = 60 * 1000;

  useEffect(() => {
    if (isAlarmActive) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    return () => {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    };
  }, [isAlarmActive]);

  const startTimer = () => {
    setIsTimerActive(true);
    setIsAlarmActive(false);
  };

  const stopTimer = () => {
    setIsTimerActive(false);
    setIsAlarmActive(false);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  const adjustTimer = (adjustment: number) => {
    setTimerMinutes((prev) =>
      Math.max(
        MIN_TIMER_MINUTES * MILLISECONDS_PER_MINUTE,
        prev + adjustment * MILLISECONDS_PER_MINUTE,
      ),
    );
  };

  const renderer = ({ hours, minutes, seconds }: CountdownRenderProps) => {
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return (
      <h6 className="text-xl font-semibold font-gsans my-4">
        {formattedHours}:{formattedMinutes}:{formattedSeconds}
      </h6>
    );
  };

  return (
    <div className="flex flex-col items-center mb-4">
      <img src="/timer.png" alt="타이머" className="w-[200px] my-3" />

      <div className="flex gap-2 mb-3">
        <button
          onClick={() => adjustTimer(-10)}
          disabled={timerMinutes <= MIN_TIMER_MINUTES * MILLISECONDS_PER_MINUTE}
          className={`px-3 py-2 text-xs rounded-full font-medium transition ${
            timerMinutes <= MIN_TIMER_MINUTES * MILLISECONDS_PER_MINUTE
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-lime-300 hover:bg-lime-500 text-black'
          }`}
        >
          -10분
        </button>
        <button
          onClick={() => adjustTimer(10)}
          className="px-3 py-2 text-xs rounded-full font-medium bg-lime-300 hover:bg-lime-500 text-black transition"
        >
          +10분
        </button>
      </div>

      {!isTimerActive && (
        <h6 className="text-xl font-semibold font-gsans my-4">
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
          onComplete={() => {
            setIsAlarmActive(true);
            onTimerEnd?.();
          }}
        />
      )}

      {isAlarmActive && (
        <button
          onClick={stopTimer}
          className="mt-2 px-6 py-2 rounded-full border-4 border-orange-400 text-orange-500 hover:bg-orange-200 transition font-semibold"
        >
          STOP
        </button>
      )}

      {!isTimerActive && (
        <button
          onClick={startTimer}
          className="mt-2 px-6 py-2 rounded-full border-4 border-lime-500 text-lime-500 hover:bg-lime-200 transition font-semibold"
        >
          START
        </button>
      )}
    </div>
  );
};

export default Timer;
