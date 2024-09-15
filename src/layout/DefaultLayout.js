import { Outlet } from 'react-router-dom';
import Menubar from '../components/Menubar';

const DefaultLayout = () => {
  return (
    <div>
      <Menubar />
      <div style={{ margin: '0px 0px 0px 290px' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default DefaultLayout;
