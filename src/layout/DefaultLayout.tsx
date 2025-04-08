import React from 'react';
import { Outlet } from 'react-router-dom';
import Menubar from '@components/Menubar';
import useAuthStore from '@store/authStore';

const DefaultLayout: React.FC = () => {
  const { isLoggedIn } = useAuthStore();

  const layoutStyle: React.CSSProperties = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  };

  const contentStyle: React.CSSProperties = {
    flex: 1,
  };

  return (
    <div style={layoutStyle}>
      {isLoggedIn && <Menubar />}
      <div style={contentStyle}>
        <Outlet />
      </div>
    </div>
  );
};

export default DefaultLayout;
