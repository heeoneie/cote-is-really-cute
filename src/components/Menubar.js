import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/Menubar.css';
import { AppContext } from '../App';
import { logoutUser } from '../axios/auth';
import LogoutButton from './LogoutBtn';

const MenuItem = ({ to, imgSrc, alt, label, isActive }) => (
  <li>
    <Link to={to} className={`menubar-link ${isActive ? 'active' : ''}`}>
      <img src={imgSrc} alt={alt} className="menubar-icon" />
      <span>{label}</span>
    </Link>
  </li>
);

const Menubar = () => {
  const { setIsLoggedIn, setEmail } = React.useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logoutUser(setEmail);
    setIsLoggedIn(false);
    navigate('/');
  };

  const menuItems = [
    { to: '/', imgSrc: '/img/studymode.png', alt: 'studymode', label: '학습' },
    { to: '/pvp', imgSrc: '/img/pvpmode.png', alt: 'pvpmode', label: '대결' },
    {
      to: '/mypage',
      imgSrc: '/img/mypage.png',
      alt: 'mypage',
      label: '마이페이지',
    },
    {
      to: '/petroom',
      imgSrc: '/img/catroom.png',
      alt: 'petroom',
      label: '고양이방',
    },
  ];

  return (
    <div className="menubar">
      <p>코테는 정말 귀여워</p>
      <ul>
        {menuItems.map(({ to, imgSrc, alt, label }) => (
          <MenuItem
            key={to}
            to={to}
            imgSrc={imgSrc}
            alt={alt}
            label={label}
            isActive={location.pathname === to}
          />
        ))}
      </ul>
      <LogoutButton onLogout={handleLogout} />
    </div>
  );
};

export default Menubar;
