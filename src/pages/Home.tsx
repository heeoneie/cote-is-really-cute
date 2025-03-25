import React from 'react';
import CategoryBtn from '../components/CategoryBtn';
import SearchBar from '../components/SearchBar';
import PetStatus from '../components/PetStatus';
import LoginStreak from '../components/LoginStreak';
import { Grid } from '@mui/material';
import Landing from '../components/Landing';
import useAuthStore from '@store/authStore';

/** Auth Store 타입 정의 */
interface AuthStore {
  isLoggedIn: boolean;
}

const Home: React.FC = () => {
  const { isLoggedIn } = useAuthStore() as AuthStore;

  return (
    <div>
      {isLoggedIn ? (
        <Grid
          container
          wrap="nowrap"
          sx={{
            width: 'calc(100vw - 290px)',
            marginLeft: '250px',
          }}
        >
          {/* 왼쪽 검색 및 카테고리 */}
          <Grid item xs container direction="column" alignItems="center">
            <Grid item xs={12} sx={{ width: '80%' }}>
              <SearchBar />
            </Grid>
            <Grid item xs>
              <CategoryBtn />
            </Grid>
          </Grid>

          {/* 오른쪽 펫 상태 및 출석 */}
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
