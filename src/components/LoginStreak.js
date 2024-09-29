import React from 'react';
import styled from '@emotion/styled/macro';
import { keyframes } from '@emotion/react';
import { AppContext } from '../App';

const slideUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  30% {
    opacity: 1;
    transform: translateY(0);
  }
  70% {
    opacity: 1; /* 잠시 머무름 */
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(20px);
  }
`;

const float = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border: 5px solid #d9d9d9;
  padding: 10px;
  border-radius: 50px;
  text-align: center;
  height: 30vh;
  overflow: hidden;
  align-items: center;
  justify-content: center;
`;
const FireImage = styled.img`
  width: 50px;
  animation: ${float} 2s ease-in-out infinite;
`;

const FireImageSmallLeft = styled(FireImage)`
  position: relative;
  top: 20px;
  left: 30px;
  width: 20px;
`;

const FireImageSmallRight = styled(FireImage)`
  position: relative;
  bottom: 30px;
  right: 35px;
  width: 20px;
`;
const AttendText = styled.p`
  margin: 0;
  font-weight: bold;
  color: #f28434;
  opacity: 0;
  animation: ${slideUp} 2s ease-in-out forwards;
`;

const Title = styled.h2`
  font-weight: lighter;
  font-size: 20px;
  margin: 0;
`;

const PetStatus = () => {
  const days = 1; //임시 변수 지정
  //   const { days } = useLoginStreak();
  const [day, setDay] = React.useState(days);
  const { userExp, setUserExp } = React.useContext(AppContext);
  const [plusExp, setPlusExp] = React.useState(0);

  React.useEffect(() => {
    if (days > day) {
      increaseExp();
      setDay(days);
    }
  }, [days]);

  const increaseExp = () => {
    const expUp = userExp + 20;
    setUserExp(expUp);
    setPlusExp((prevKey) => prevKey + 1);
  };

  return (
    <Container>
      <AttendText key={plusExp}>+20XP</AttendText>
      <FireImageSmallLeft src="/img/fire.png" alt="출석" />
      <br />
      <FireImage src="/img/fire.png" alt="출석" />
      <br />
      <FireImageSmallRight src="/img/fire.png" alt="출석" />
      <Title>{day}일 연속 공부 중!</Title>
    </Container>
  );
};

export default PetStatus;
