import React, { useContext } from 'react';
import { AppContext } from '../App';
import LogoutButton from './LogoutBtn';
import HomeButton from './HomeBtn';
import { logoutUser } from '../axios/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthLinks from '../components/AuthLinks';

const Header = () => {
  const { isLoggedIn, setIsLoggedIn, setEmail } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logoutUser(setEmail);
    setIsLoggedIn(false);
    navigate('/');
  };

  const isAuthPage =
    location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div style={{ display: 'flex' }}>
      {isLoggedIn ? (
        <LogoutButton onLogout={handleLogout} />
      ) : isAuthPage ? (
        <HomeButton onNavigate={() => navigate('/')} /> // 홈 버튼 사용
      ) : (
        <AuthLinks />
      )}
    </div>
  );
};

export default Header;
