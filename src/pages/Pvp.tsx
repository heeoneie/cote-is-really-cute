import React, { useState } from 'react';
import BattleBtn from '@components/BattleBtn';
import Timer from '@components/Timer';
import Spline from '@splinetool/react-spline';
import { Grid, Box, styled, Skeleton } from '@mui/material';

const PvpHeading = styled('h5')({
  fontSize: '30px',
  textAlign: 'center',
  marginTop: 0,
  marginBottom: '10px',
});

const StyledGridContainer = styled(Grid)(({ theme }) => ({
  width: '100%',
  height: '90vh',
  [theme.breakpoints.up('md')]: {
    width: 'calc(100vw - 290px)',
    marginLeft: '290px',
  },
}));

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

const SplineContainer = styled(Box)({
  height: '70%',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const Pvp: React.FC = () => {
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [splineError, setSplineError] = useState(false);

  return (
    <StyledGridContainer container>
      <StyledMainGrid item>
        <PvpHeading>
          코딩 능력을 시험해볼 기회!
          <br />
          다른 유저와의 대결에서 승리하고 경험치를 쌓아보세요!
        </PvpHeading>
        <SplineContainer>
          {!splineLoaded && !splineError && (
            <Skeleton
              variant="rectangular"
              width="80%"
              height="100%"
              animation="wave"
            />
          )}
          {splineError && <Box>3D 콘텐츠를 불러올 수 없습니다.</Box>}
          <Box
            style={{
              display: splineLoaded ? 'block' : 'none',
              height: '100%',
              width: '100%',
            }}
          >
            <Spline
              scene="https://prod.spline.design/HMPTMU1jPmnbwett/scene.splinecode"
              style={{ height: '100%' }}
              onLoad={() => setSplineLoaded(true)}
              onError={() => setSplineError(true)}
            />
          </Box>
        </SplineContainer>
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
