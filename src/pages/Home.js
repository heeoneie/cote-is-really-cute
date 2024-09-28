import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../App';

import CategoryBtn from '../components/CategoryBtn';
import LogoutBtn from '../components/LogoutBtn';
import AuthLinks from '../components/AuthLinks';
import { logoutUser } from '../axios/auth';
import BattleBtn from '../components/BattleBtn';
import useLoginStreak from '../components/useLoginStreak'; // 로그인 연속 일수 훅

const Home = () => {
  const { isLoggedIn, setIsLoggedIn, setEmail, baekjoonLevel } =
    useContext(AppContext); // baekjoonLevel 추가
  const { days } = useLoginStreak(); // 출석일 가져오기
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser(setEmail);
    setIsLoggedIn(false);
    navigate('/');
  };

  // 컴포넌트가 마운트될 때 baekjoonLevel을 콘솔에 출력
  useEffect(() => {
    if (isLoggedIn) {
      console.log('현재 Baekjoon 레벨:', baekjoonLevel); // Baekjoon 레벨 콘솔 로그
    }
  }, [isLoggedIn, baekjoonLevel]); // 의존성 배열에 isLoggedIn과 baekjoonLevel 추가

  return (
    <div>
      {isLoggedIn ? (
        <>
          <CategoryBtn />
          <LogoutBtn onLogout={handleLogout} />
          <BattleBtn />
          <p>현재 연속 출석일: {days}일</p> {/* 출석일 표시 */}
          <p>현재 백준 레벨: {baekjoonLevel}</p> {/* 백준 레벨 표시 */}
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
