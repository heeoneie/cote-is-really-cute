import React, { useContext } from 'react';
import { AppContext } from '../App';
import { useNavigate } from 'react-router-dom';
import CategoryBtn from '../components/CategoryBtn';
import LogoutBtn from '../components/LogoutBtn';
import AuthLinks from '../components/AuthLinks';
import { logoutUser } from '../axios/auth';
import SearchBar from '../components/SearchBar';
import StudyPage from '../components/PetStatusAndAlarm';
import { Grid } from '@mui/material';

const Home = () => {
  const { isLoggedIn, setIsLoggedIn, setEmail } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser(setEmail);
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div>
      {isLoggedIn ? (
        <Grid container spacing={2}>
          <Grid
            item
            xs={10}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <SearchBar />
          </Grid>
          <Grid
            item
            xs={2}
            style={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <LogoutBtn onLogout={handleLogout} />
          </Grid>
          <Grid
            item
            xs={9}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <CategoryBtn />
          </Grid>
          <Grid
            item
            xs={3}
            style={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <StudyPage />
          </Grid>
        </Grid>
      ) : (
        <AuthLinks />
      )}
    </div>
  );
};

export default Home;
