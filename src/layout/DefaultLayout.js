import React from 'react';
import { Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../App';
import Menubar from '../components/Menubar';

const DefaultLayout = () => {
  const { isLoggedIn } = useContext(AppContext);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {isLoggedIn ? <Menubar /> : ''}
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
    </div>
  );
};

export default DefaultLayout;
