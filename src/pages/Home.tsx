import React from 'react';
import CategoryBtn from '../components/CategoryBtn';
import SearchBar from '../components/SearchBar';
import PetStatus from '../components/PetStatus';
import LoginStreak from '../components/LoginStreak';
import { Grid } from '@mui/material';
import Landing from '../components/Landing';
import useAuthStore from '@store/authStore';

const Home: React.FC = () => {
  const { isLoggedIn } = useAuthStore();

  return (
    <div>
      {isLoggedIn ? (
        <Grid
          container
          wrap="nowrap"
          sx={(theme) => ({
            width: { xs: '100%', md: 'calc(100vw - 290px)' },
            marginLeft: { xs: 0, md: '250px' },
          })}
        >
          <Grid item xs container direction="column" alignItems="center">
            <Grid item xs={12} sx={{ width: '80%' }}>
              <SearchBar />
            </Grid>
            <Grid item xs>
              <CategoryBtn />
            </Grid>
          </Grid>

          <Grid item xs={2} container direction="column">
            <Grid item>
              <PetStatus />
            </Grid>
            <Grid item>
              <LoginStreak />
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Landing />
      )}
    </div>
  );
};

export default Home;
