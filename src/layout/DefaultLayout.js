import { Outlet } from 'react-router-dom';

const DefaultLayout = () => {
  return (
    <div style={{ height: '100%' }}>
      <h1>Header</h1>
      <Outlet />
      <h1>Footer</h1>
    </div>
  );
};

export default DefaultLayout;
