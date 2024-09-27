import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { useContext } from 'react';
import { AppContext } from '../App';
import Menubar from '../components/Menubar';

const DefaultLayout = () => {
  const { isLoggedIn } = useContext(AppContext);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Header />
      {isLoggedIn ? <Menubar /> : ''};
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
    </div>
  );
};

export default DefaultLayout;
