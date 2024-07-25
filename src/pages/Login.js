import React from 'react';
import { AppContext } from '../App';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { setIsLoggedIn } = React.useContext(AppContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate('/');
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
