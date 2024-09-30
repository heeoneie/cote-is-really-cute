import React from 'react';
import styled from '@emotion/styled/macro';
import { keyframes } from '@emotion/react';
import { useContext } from 'react';
import { AppContext } from '../App';
import { checkConsecutiveAttendance } from '../axios/user';

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
  margin: 0;
`;

const PetStatus = () => {
  const { email } = useContext(AppContext);
  const [consecutiveDays, setConsecutiveDays] = React.useState(() => {
    return localStorage.getItem('consecutiveDays') || 0;
  });

  const fetchConsecutiveAttendance = async (userEmail) => {
    console.log(`Fetching attendance for email: ${userEmail}`);
    try {
      const days = await checkConsecutiveAttendance(userEmail);
      setConsecutiveDays(days);
      localStorage.setItem('consecutiveDays', days);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    }
  };

  React.useEffect(() => {
    if (email) fetchConsecutiveAttendance(email);
    console.log(consecutiveDays);
  }, [email]);

  return (
    <Container>
      <AttendText>Excellent!</AttendText>
      <FireImageSmallLeft src="/img/fire.png" alt="출석" />
      <br />
      <FireImage src="/img/fire.png" alt="출석" />
      <br />
      <FireImageSmallRight src="/img/fire.png" alt="출석" />
      <Title>{consecutiveDays}일 연속 공부 중!</Title>
    </Container>
  );
};

export default PetStatus;
