import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router/router';

export const AppContext = React.createContext();
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(
    !!localStorage.getItem('token'),
  );
  const [problems, setProblems] = React.useState({
    beginner: [],
    intermediate: [],
    advanced: [],
  });

  return (
    <AppContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, problems, setProblems }}
    >
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
};

export default App;
