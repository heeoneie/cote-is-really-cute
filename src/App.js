import React from 'react';
import './app.css';
import { RouterProvider } from 'react-router-dom';
import router from './router/router';

export const AppContext = React.createContext();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(
    !!localStorage.getItem('token'),
  );
  const [email, setEmail] = React.useState('');
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

  const [userExp, setUserExp] = React.useState(() => {
    const storedExp = localStorage.getItem('userExp');
    return storedExp ? JSON.parse(storedExp) : 0;
  });

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

  React.useEffect(() => {
    localStorage.setItem('userExp', JSON.stringify(userExp));
  }, [userExp]);

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        email,
        setEmail,
        problems,
        setProblems,
        currentProblemIndex,
        setCurrentProblemIndex,
        userExp,
        setUserExp,
      }}
    >
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
};

export default App;
