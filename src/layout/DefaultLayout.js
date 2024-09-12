import { Outlet } from 'react-router-dom';
import Menubar from '../components/Menubar';

const DefaultLayout = () => {
  return (
    <div>
      <Menubar />
      <div style={{ marginLeft: '280px', padding: '20px' }}>
        <h1>Header</h1>
        <Outlet />
        <h1>Footer</h1>
      </div>
    </div>
  );
};

export default DefaultLayout;
