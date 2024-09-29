import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../App';

import CategoryBtn from '../components/CategoryBtn';
import LogoutBtn from '../components/LogoutBtn';
import AuthLinks from '../components/AuthLinks';
import { logoutUser } from '../axios/auth';
import BattleBtn from '../components/BattleBtn';
import useLoginStreak from '../components/useLoginStreak';

const Home = () => {
  const { isLoggedIn, setIsLoggedIn, setEmail } = useContext(AppContext);
  const { days } = useLoginStreak();
  const navigate = useNavigate();

  const email = localStorage.getItem('email');

  const baekjoonLevel = localStorage.getItem(`baekjoonLevel_${email}`);

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
          <p>현재 연속 출석일: {days}일</p> {}
          <p>
            백준 레벨: {baekjoonLevel} {}
          </p>
          <button>
            <Link to="/AccountEdit">정보 수정</Link>
          </button>
        </>
      ) : (
        <AuthLinks />
      )}
    </div>
  );
};

export default Home;
