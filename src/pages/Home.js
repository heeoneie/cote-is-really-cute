import React, { useContext } from 'react';
import { AppContext } from '../App';
import { useNavigate } from 'react-router-dom';
import CategoryBtn from '../components/CategoryBtn';
import LogoutBtn from '../components/LogoutBtn';
import AuthLinks from '../components/AuthLinks';
import { logoutUser } from '../axios/auth';
import BattleBtn from '../components/BattleBtn';

const Home = () => {
  const { isLoggedIn, setIsLoggedIn, setEmail } = useContext(AppContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logoutUser(setEmail);
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div>
      {isLoggedIn ? (
        <>
          <CategoryBtn />
          <LogoutBtn onLogout={handleLogout} />
          <BattleBtn />
        </>
      ) : (
        <AuthLinks />
      )}
    </div>
  );
};

export default Home;
