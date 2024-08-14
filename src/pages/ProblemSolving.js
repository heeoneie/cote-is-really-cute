import React from 'react';
import { AppContext } from '../App';
import { Button, Typography } from '@mui/material';

const ProblemSolving = () => {
  const { problems, currentProblemIndex, setCurrentProblemIndex } =
    React.useContext(AppContext);

  if (!problems || !problems.beginner || problems.beginner.length === 0) {
    return <Typography>No problems available.</Typography>;
  }

  const currentProblem = problems.beginner[currentProblemIndex];

  const handleSolveClick = () => {
    window.open(currentProblem.url, '_blank');
  };

  const handleNextProblem = () => {
    if (currentProblemIndex < problems.beginner.length - 1) {
      setCurrentProblemIndex(currentProblemIndex + 1);
    } else {
      alert('You have completed all the problems in this level!');
    }
  };

  return (
    <div>
      <Typography variant="h5">
        문제 {currentProblemIndex + 1}: {currentProblem.title}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSolveClick}
        style={{ marginRight: '10px' }}
      >
        문제 풀기
      </Button>
      <Button variant="contained" color="secondary" onClick={handleNextProblem}>
        다음 문제
      </Button>
    </div>
  );
};

export default ProblemSolving;
