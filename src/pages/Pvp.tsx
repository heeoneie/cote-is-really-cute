import React from 'react';
import BattleBtn from '@components/BattleBtn';
import Timer from '@components/Timer';
import Spline from '@splinetool/react-spline';
import { Grid, Box, styled } from '@mui/material';

const Ment = styled('h5')({
  fontSize: '30px',
  textAlign: 'center',
  marginTop: 0,
  marginBottom: '10px',
});

const StyledGridContainer = styled(Grid)({
  width: 'calc(100vw - 290px)',
  marginLeft: '290px',
  height: '90vh',
});

const StyledMainGrid = styled(Grid)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
});

const TimerBox = styled(Box)({
  width: '290px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderLeft: '5px solid #00000027',
  height: '100%',
});

const Pvp: React.FC = () => {
  return (
    <StyledGridContainer container>
      <StyledMainGrid item>
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
      </StyledMainGrid>

      <Grid
        item
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <TimerBox>
          <Timer initialMinutes={30} />
        </TimerBox>
      </Grid>
    </StyledGridContainer>
  );
};

export default Pvp;
