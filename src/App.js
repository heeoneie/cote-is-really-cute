import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router/router';

export const AppContext = React.createContext();
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(
    !!localStorage.getItem('token'),
  );

  return (
    <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
};

export default App;
