import React, { useContext } from 'react';
import { AppContext } from '../App';
import styled from '@emotion/styled/macro';
// eslint-disable-next-line import/no-unresolved
import Spline from '@splinetool/react-spline';
import { searchRival } from '../axios/rival';

const Container = styled.div`
  background-color: #ffffff;
  border: 5px solid #d9d9d9;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 50px;
  text-align: center;
  height: 50vh;
`;

const Title = styled.h2`
  font-weight: lighter;
  font-size: 20px;
  margin: 0;
`;

const PetStatus = () => {
  const { email } = useContext(AppContext);
  const [level, setLevel] = React.useState(1);

  React.useEffect(() => {
    if (email) fetchLevel(email);
  }, [email]);

  const fetchLevel = async (email) => {
    try {
      const response = await searchRival(email);
      setLevel(response.userLevel);
      console.log(response.userLevel);
    } catch (error) {
      console.error('Error fetching rivals', error);
      setLevel(1);
    }
  };

  return (
    <Container>
      <Title>고양이 상태창</Title>
      <div style={{ width: '100%', height: '60%' }}>
        <Spline scene="https://prod.spline.design/QxlBuwJ2HLEZYiRN/scene.splinecode" />
      </div>
      <p>현재 레벨</p>
      <p>Lv: {level}</p>
    </Container>
  );
};

export default PetStatus;
