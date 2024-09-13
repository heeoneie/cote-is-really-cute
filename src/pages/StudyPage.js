// src/pages/StudyPage.js
import React from 'react';
import './StudyPage.css'; // CSS 파일 임포트
import SearchBar from '../components/SearchBar';

const StudyPage = () => {
  return (
    <div className="container">
      {/* 왼쪽 상단 검색바 */}
      <div className="top-left">
        <SearchBar />
      </div>

      {/* 오른쪽 상단 로그인/회원가입 링크 */}
      <div className="top-right">
        <a href="/login" className="link">
          로그인
        </a>
        {'  '}|
        <a href="/signup" className="link">
          회원가입
        </a>
      </div>

      {/* 왼쪽 하단 알고리즘 선택 버튼 */}
      <div className="bottom-left">
        <button className="button">
          <img src="/img/gradestar.png" alt="별" className="btn-img" />
          <p>초급</p>
        </button>
        <button className="button">
          <img src="/img/gradestar.png" alt="별" className="btn-img" />
          <img src="/img/gradestar.png" alt="별" className="btn-img" />
          <p>중급</p>
        </button>
        <button className="button">
          <img src="/img/gradestar.png" alt="별" className="btn-img" />
          <img src="/img/gradestar.png" alt="별" className="btn-img" />
          <img src="/img/gradestar.png" alt="별" className="btn-img" />
          <p>고급</p>
        </button>
      </div>

      {/* 오른쪽 하단 메시지 알림창과 상태창 */}
      <div className="bottom-right">
        <div className="notification">
          <h2>알림창</h2>
        </div>
        <div className="status">
          <h2>펫 상태창</h2>
        </div>
      </div>
    </div>
  );
};

export default StudyPage;
