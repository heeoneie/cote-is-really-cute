import React, { useContext } from 'react';
import { AppContext } from '../App';
import { useNavigate } from 'react-router-dom';
import CategoryBtn from '../components/CategoryBtn';
import LogoutBtn from '../components/LogoutBtn';
import AuthLinks from '../components/AuthLinks';
import { logoutUser } from '../axios/auth';
import BattleBtn from '../components/BattleBtn';
import useLoginStreak from '../components/useLoginStreak'; // 로그인 연속 일수 훅

const Home = () => {
  const { isLoggedIn, setIsLoggedIn, setEmail } = useContext(AppContext);
  const { days } = useLoginStreak(); // 출석일 가져오기
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
          <p>현재 연속 출석일: {days}일</p> {/* 출석일 표시 */}
        </>
      ) : (
        <AuthLinks />
      )}
    </div>
  );
};

export default Home;
