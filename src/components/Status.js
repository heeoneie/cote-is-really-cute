import React from 'react';
import { AppContext } from '../App';
import '../styles/Status.css';
// eslint-disable-next-line import/no-unresolved
import Spline from '@splinetool/react-spline';

const Status = () => {
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
    <div className="status-container">
      <div className="status">
        <h2>Lv.{level} 냐옹이</h2>
        <div style={{ width: '100%', height: '60%' }}>
          <Spline scene="https://prod.spline.design/QxlBuwJ2HLEZYiRN/scene.splinecode" />
        </div>
        <p>현재 경험치</p>
        <p>EXP: {userExp % 100}%</p>
        <button onClick={increaseExp}>경험치 증가</button>
        <button onClick={() => setUserExp(0)}>경험치 리셋</button>
      </div>
      <div className="attend">
        <p>+20XP</p>
        <img className="fire-sl" src="/img/fire.png" alt="출석" />
        <br />
        <img className="fire" src="/img/fire.png" alt="출석" />
        <br />
        <img className="fire-sr" src="/img/fire.png" alt="출석" />
        <h2>n일 연속 공부 중!</h2>
      </div>
    </div>
  );
};

export default Status;
