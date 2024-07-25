import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router/router';

export const AppContext = React.createContext();
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
    <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <RouterProvider router={router} context={{ isLoggedIn, setIsLoggedIn }} />
    </AppContext.Provider>
  );
};

export default App;
