import { Link } from 'react-router-dom';
import '../styles/AuthLinks.css';

const AuthLinks = () => (
  <div className="login-container">
    <button className="login-btn">
      <Link to="/login">로그인</Link>
    </button>
    <button className="signup-btn">
      <Link to="/signup">회원가입</Link>
    </button>
  </div>
);

export default AuthLinks;
