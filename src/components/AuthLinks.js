import { Link } from 'react-router-dom';

const AuthLinks = () => (
  <div>
    <Link to="/login" style={linkStyle}>
      Login
    </Link>
    <Link to="/signup" style={linkStyle}>
      Sign Up
    </Link>
  </div>
);

const linkStyle = {
  marginRight: '10px',
};

export default AuthLinks;
