import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Menubar.css';

const Menubar = () => {
  return (
    <div className="menubar">
      <p>코테는 정말 귀여워</p>
      <ul>
        <li>
          <Link to="/" className="menubar-link">
            <img
              src="/img/studymode.png"
              alt="studymode"
              className="menubar-icon"
            />
            <span>학습</span>
          </Link>
        </li>
        <li>
          <Link to="/pvp" className="menubar-link">
            <img
              src="/img/pvpmode.png"
              alt="pvpmode"
              className="menubar-icon"
            />
            <span>대결</span>
          </Link>
        </li>
        <li>
          <Link to="/mypage" className="menubar-link">
            <img src="/img/mypage.png" alt="mypage" className="menubar-icon" />
            <span>마이페이지</span>
          </Link>
        </li>
        <li>
          <Link to="/petroom" className="menubar-link">
            <img
              src="/img/catroom.png"
              alt="petroom"
              className="menubar-icon"
            />
            <span>고양이방</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Menubar;
