import React from 'react';
import { AppContext } from '../App';
import { Link } from 'react-router-dom';
import CategoryBtn from '../components/CategoryBtn';

const Home = () => {
  const { isLoggedIn } = React.useContext(AppContext);
  return (
    <div>
      {isLoggedIn ? (
        <CategoryBtn />
      ) : (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </div>
  );
};

export default Home;
