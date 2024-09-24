import React from 'react';
import { AppContext } from '../App';
import '../styles/PetStatusAndAlarm.css';
import Spline from '@splinetool/react-spline';

const StudyPage = () => {
  const [level, setLevel] = React.useState(1);
  const { userExp, setUserExp } = React.useContext(AppContext);

  React.useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://unpkg.com/@splinetool/viewer@1.9.27/build/spline-viewer.js';
    script.type = 'module';
    document.body.appendChild(script);
  }, []);

  // 임시 경험치 증가 함수
  const increaseExp = () => {
    const expUp = userExp + 10;
    setUserExp(expUp);

    const levelUp = Math.floor(expUp / 100) + 1;
    setLevel(levelUp);
  };

  return (
    <div className="alert-container">
      <div className="bottom-right">
        <div className="notification">
          <h2>알림창</h2>
        </div>
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
      </div>
    </div>
  );
};

export default StudyPage;
