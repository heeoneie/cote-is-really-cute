import React from 'react';
import { Box, Grid } from '@mui/material';
import styled from '@emotion/styled';
import AccountEdit from '@components/AccountEdit';
import SearchBar from '@components/SearchBar';
import RivalList from '@components/RivalList';

const RivalListContainer = styled(Box)`
  height: 100%;
  border: 5px solid #d9d9d9;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 10px;
  text-align: center;
`;

const MyPage: React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <AccountEdit />
      </Grid>

      <Grid item xs={12} md={4}>
        <SearchBar />
        <RivalListContainer>
          <RivalList />
        </RivalListContainer>
      </Grid>
    </Grid>
  );
};

export default MyPage;
