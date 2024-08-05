import React, { useContext } from 'react';
import { AppContext } from '../App';
import { Link } from 'react-router-dom';
import CategoryBtn from '../components/CategoryBtn';

const Home = () => {
  const { isLoggedIn } = useContext(AppContext);

  return <div>{isLoggedIn ? <CategoryBtn /> : <AuthLinks />}</div>;
};

const AuthLinks = () => (
  <div>
    <Link to="/login" style={{ marginRight: '10px' }}>
      Login
    </Link>
    <Link to="/signup">Sign Up</Link>
  </div>
);

export default Home;
