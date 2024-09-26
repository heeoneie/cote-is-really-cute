import { Link } from 'react-router-dom';

const AuthLinks = () => (
  <div style={linkStyle}>
    <Link to="/login">로그인</Link> | <Link to="/signup">회원가입</Link>
  </div>
);

const linkStyle = {
  marginLeft: 'auto',
  fontWeight: 'bold',
};

export default AuthLinks;
