import React, { useContext } from 'react';
import { AppContext } from '../App';
import LogoutBtn from './LogoutBtn';
import { logoutUser } from '../axios/auth';
import { useNavigate } from 'react-router-dom';
import AuthLinks from '../components/AuthLinks';

const Header = () => {
  const { isLoggedIn, setIsLoggedIn, setEmail } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser(setEmail);
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div style={{ display: 'flex' }}>
      {isLoggedIn ? <LogoutBtn onLogout={handleLogout} /> : <AuthLinks />}
    </div>
  );
};

export default Header;
