import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppContext } from '../App';
import { checkConsecutiveAttendance } from '../axios/user';

const DefaultLayout = () => {
  const { email, isLoggedIn } = React.useContext(AppContext);
  const [consecutiveDays, setConsecutiveDays] = React.useState(() => {
    return localStorage.getItem('consecutiveDays') || 0;
  });

  const fetchConsecutiveAttendance = async (userEmail) => {
    console.log(`Fetching attendance for email: ${userEmail}`);
    try {
      const days = await checkConsecutiveAttendance(userEmail);
      setConsecutiveDays(days);
      localStorage.setItem('consecutiveDays', days);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    }
  };

  React.useEffect(() => {
    if (email) fetchConsecutiveAttendance(email);
  }, [email]);

  return (
    <div style={{ height: '100%' }}>
      <h1>Header</h1>
      {isLoggedIn && <p>연속 출석일: {consecutiveDays}일</p>}
      <Outlet />
      <h1>Footer</h1>
    </div>
  );
};

export default DefaultLayout;
