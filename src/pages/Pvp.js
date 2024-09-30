import React from 'react';
import BattleBtn from '../components/BattleBtn';
import { Grid, Box } from '@mui/material';
import Timer from '../components/Timer';
import styled from '@emotion/styled/macro';
// eslint-disable-next-line import/no-unresolved
import Spline from '@splinetool/react-spline';

const Ment = styled.h5`
  font-size: 30px;
  text-align: center;
  margin-top: 0;
  margin-bottom: 10px;
`;

const Pvp = () => {
  return (
    <Grid
      container
      style={{
        width: 'calc(100vw - 290px)',
        marginLeft: '290px',
        height: '90vh',
      }}
    >
      <Grid
        item
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}
      >
        <Ment>
          코딩 능력을 시험해볼 기회!
          <br />
          다른 유저와의 대결에서 승리하고 경험치를 쌓아보세요!
        </Ment>
        <Spline
          scene="https://prod.spline.design/HMPTMU1jPmnbwett/scene.splinecode"
          style={{ height: '70%' }}
        />
        <BattleBtn />
      </Grid>
      <Grid
        item
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Box
          sx={{
            width: '290px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderLeft: '5px solid #00000027',
            height: '100%',
          }}
        >
          <Timer initialMinutes={30} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Pvp;
