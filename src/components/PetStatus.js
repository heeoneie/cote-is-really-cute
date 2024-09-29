import React from 'react';
import { AppContext } from '../App';
import styled from '@emotion/styled/macro';
// eslint-disable-next-line import/no-unresolved
import Spline from '@splinetool/react-spline';

const Container = styled.div`
  background-color: #ffffff;
  border: 5px solid #d9d9d9;
  padding: 10px 10px 10px 20px;
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
  const [level, setLevel] = React.useState(1);
  const { userExp, setUserExp } = React.useContext(AppContext);

  // 임시 경험치 증가 함수
  const increaseExp = () => {
    const expUp = userExp + 10;
    setUserExp(expUp);

    const levelUp = Math.floor(expUp / 100) + 1;
    setLevel(levelUp);
  };

  return (
    <Container className="status">
      <Title>Lv.{level} 냐옹이</Title>
      <div style={{ width: '100%', height: '60%' }}>
        <Spline scene="https://prod.spline.design/QxlBuwJ2HLEZYiRN/scene.splinecode" />
      </div>
      <p>현재 경험치</p>
      <p>EXP: {userExp % 100}%</p>
      <button onClick={increaseExp}>경험치 증가</button>
      <button onClick={() => setUserExp(0)}>경험치 리셋</button>
    </Container>
  );
};

export default PetStatus;
