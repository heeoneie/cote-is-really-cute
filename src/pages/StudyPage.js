import React, { useEffect, useState } from 'react';
import './StudyPage.css'; // CSS 파일 임포트

const StudyPage = () => {
  const [exp, setExp] = useState(0);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://unpkg.com/@splinetool/viewer@1.9.27/build/spline-viewer.js';
    script.type = 'module';
    document.body.appendChild(script);
  }, []);

  // 임시 경험치 증가 함수
  const increaseExp = () => {
    const expUp = exp + 10;
    setExp(expUp);

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
            <spline-viewer url="https://prod.spline.design/QxlBuwJ2HLEZYiRN/scene.splinecode"></spline-viewer>
          </div>
          <p>현재 경험치</p>
          <p>EXP: {exp % 100}%</p>
          <button onClick={increaseExp}>경험치 증가</button>
        </div>
      </div>
    </div>
  );
};

export default StudyPage;
