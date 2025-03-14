import React, { useEffect } from 'react';
import './app.css';
import { RouterProvider } from 'react-router-dom';
import router from './router/router';
import useProblemStore from './store/problemStore';

const App = () => {
  const { problems, currentProblemIndex } = useProblemStore();

  useEffect(() => {
    if (
      problems &&
      (problems.beginner.length > 0 ||
        problems.intermediate.length > 0 ||
        problems.advanced.length > 0)
    ) {
      localStorage.setItem('problems', JSON.stringify(problems));
    }
  }, [problems]);

  useEffect(() => {
    localStorage.setItem(
      'currentProblemIndex',
      JSON.stringify(currentProblemIndex),
    );
  }, [currentProblemIndex]);

  return <RouterProvider router={router} />;
};

export default App;
