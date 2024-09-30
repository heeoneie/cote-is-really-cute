import React from 'react';
import '../styles/AccountEdit.css';
import { updateNickname, updatePassword, checkNickname } from '../axios/auth';

const AccountEdit = () => {
  const [nickName, setNickname] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [isNicknameAvailable, setIsNicknameAvailable] = React.useState(null);

  const handleNicknameCheck = async () => {
    try {
      const response = await checkNickname(nickName);
      if (response.available) {
        setIsNicknameAvailable(true);
      } else {
        setIsNicknameAvailable(false);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nickName && isNicknameAvailable) {
      try {
        await updateNickname(nickName);
        alert('닉네임이 성공적으로 변경되었습니다.');
        setNickname('');
      } catch (error) {
        alert(error.message);
      }
    } else if (nickName && !isNicknameAvailable) {
      alert('사용할 수 없는 닉네임입니다.');
      setNickname('');
    }

    if (newPassword && newPassword === confirmPassword) {
      try {
        await updatePassword(newPassword, confirmPassword);
        alert('비밀번호가 성공적으로 변경되었습니다.');
        setNewPassword('');
        setConfirmPassword('');
      } catch (error) {
        alert(error.message);
      }
    } else if (newPassword !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <div className="info-section">
      <h2>정보수정</h2>
      <form className="info-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="닉네임"
          value={nickName}
          onChange={(e) => setNickname(e.target.value)}
        />
        <button
          type="button"
          onClick={handleNicknameCheck}
          className="btn-check"
        >
          닉네임 중복 체크
        </button>
        {isNicknameAvailable !== null && (
          <p
            className={`nickNmCheck ${isNicknameAvailable ? 'Nm_available' : ''}`}
          >
            {isNicknameAvailable
              ? '사용 가능한 닉네임입니다.'
              : '이미 사용 중인 닉네임입니다.'}
          </p>
        )}
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
          <button type="submit" className="Edit_completed_btn">
            수정 완료
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountEdit;
