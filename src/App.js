import React from 'react';
import './app.css';
import { RouterProvider } from 'react-router-dom';
import router from './router/router';

export const AppContext = React.createContext();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(
    !!localStorage.getItem('token'),
  );

  const [problems, setProblems] = React.useState(() => {
    const storedProblems = localStorage.getItem('problems');
    return storedProblems
      ? JSON.parse(storedProblems)
      : { beginner: [], intermediate: [], advanced: [] };
  });

  const [currentProblemIndex, setCurrentProblemIndex] = React.useState(() => {
    return localStorage.getItem('currentProblemIndex')
      ? JSON.parse(localStorage.getItem('currentProblemIndex'))
      : 0;
  });

  //유저레벨추가
  const [userLevel, setUserLevel] = React.useState(1);

  React.useEffect(() => {
    if (
      problems &&
      (problems.beginner.length > 0 ||
        problems.intermediate.length > 0 ||
        problems.advanced.length > 0)
    ) {
      localStorage.setItem('problems', JSON.stringify(problems));
    }
  }, [problems]);

  React.useEffect(() => {
    localStorage.setItem(
      'currentProblemIndex',
      JSON.stringify(currentProblemIndex),
    );
  }, [currentProblemIndex]);

  //유저레벨
  React.useEffect(() => {
    localStorage.setItem('userLevel', JSON.stringify(userLevel));
  }, [userLevel]);

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        problems,
        setProblems,
        currentProblemIndex,
        setCurrentProblemIndex,
        userLevel,
        setUserLevel,
      }}
    >
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
};

export default App;
