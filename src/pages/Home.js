import React, { useContext } from 'react';
import { AppContext } from '../App';
import CategoryBtn from '../components/CategoryBtn';
import SearchBar from '../components/SearchBar';
import PetStatus from '../components/PetStatus';
import LoginStreak from '../components/LoginStreak';
import { Grid } from '@mui/material';
import Landing from '../components/Landing';

const Home = () => {
  const { isLoggedIn } = useContext(AppContext);

  return (
    <div>
      {isLoggedIn ? (
        <Grid
          container
          direction="row"
          wrap="nowrap"
          style={{ width: 'calc(100vw - 290px)', marginLeft: '250px' }}
        >
          <Grid item xs>
            <Grid
              item
              xs
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              style={{ width: '100%' }}
            >
              <Grid item xs={12} style={{ width: '80%' }}>
                <SearchBar />
              </Grid>
              <Grid item xs>
                <CategoryBtn />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <Grid item xs container direction="column">
              <Grid item xs>
                <PetStatus />
              </Grid>
              <Grid item xs>
                <LoginStreak />
              </Grid>
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
