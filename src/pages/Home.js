import React, { useContext } from 'react';
import { AppContext } from '../App';
import Menubar from '../components/Menubar';
import CategoryBtn from '../components/CategoryBtn';
import SearchBar from '../components/SearchBar';
import StudyPage from '../components/PetStatusAndAlarm';
import { Grid } from '@mui/material';
import Landing from '../pages/Landing';

const Home = () => {
  const { isLoggedIn } = useContext(AppContext);

  return (
    <div>
      {isLoggedIn ? (
        <Grid container direction="row" wrap="nowrap">
          <Grid item style={{ width: '290px' }}>
            <Menubar />
          </Grid>
          <Grid item xs>
            <Grid
              item
              xs
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
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
                <StudyPage />
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
