import React from 'react';
import './AccountEdit.css';

const AccountEdit = () => {
  const [nickname, setNickname] = React.useState('');
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('정보 수정:', { nickname, currentPassword, newPassword });
  };

  const handleDeleteAccount = () => {
    console.log('회원 탈퇴');
  };

  return (
    <div className="info-section">
      <h2>정보수정</h2>
      <form className="info-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <input
          type="password"
          placeholder="기존 비밀번호"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호 변경"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호 재입력"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div className="button-container">
          <button type="submit" className="btn4">
            수정 완료
          </button>
          <button type="button" className="btn5" onClick={handleDeleteAccount}>
            회원 탈퇴
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountEdit;
