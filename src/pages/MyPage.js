import { Box, Grid } from '@mui/material';
import React from 'react';
import AccountEdit from '../components/AccountEdit';
import SearchBar from '../components/SearchBar';
import RivalList from '../components/RivalList';

const MyPage = () => {
  return (
    <Grid
      container
      direction="row"
      wrap="nowrap"
      spacing={2}
      style={{ width: '100%' }}
    >
      <Grid item xs>
        <AccountEdit />
      </Grid>
      <Grid item sx={{ width: '20.83%' }}>
        <SearchBar />
        <Box
          sx={{
            width: '100%',
            height: '100%',
            border: '5px solid #d9d9d9',
            borderRadius: '50px',
            display: 'flex',
            flexDirection: 'column',
            boxSizing: 'border-box',
            padding: '10px',
            textAlign: 'center',
          }}
        >
          <RivalList />
        </Box>
      </Grid>
    </Grid>
  );
};

export default MyPage;
