import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const DefaultLayout = () => {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
    </div>
  );
};

export default DefaultLayout;
