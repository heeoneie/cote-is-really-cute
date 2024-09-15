import React from 'react';
import './StudyPage.css'; // CSS 파일 임포트

const StudyPage = () => {
  return (
    <div className="alert-container">
      {/* 오른쪽 하단 메시지 알림창과 상태창 */}
      <div className="bottom-right">
        <div className="notification">
          <h2>알림창</h2>
        </div>
        <div className="status">
          <h2>펫 상태창</h2>
        </div>
      </div>
    </div>
  );
};

export default StudyPage;
