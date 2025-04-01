import React, { useState } from 'react';
import '../styles/AccountEdit.css';
import { updateNickName, updatePassword, checkNickName } from '@api/auth';

const AccountEdit = () => {
  const [nickName, setNickname] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isNicknameAvailable, setIsNicknameAvailable] = useState<
    boolean | null
  >(null);

  const handleNicknameCheck = async (): Promise<void> => {
    try {
      const response = await checkNickName(nickName);
      setIsNicknameAvailable(response.available);
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    if (nickName && isNicknameAvailable) {
      try {
        await updateNickName(nickName);
        alert('닉네임이 성공적으로 변경되었습니다.');
        setNickname('');
      } catch (error) {
        alert((error as Error).message);
      }
    } else if (nickName && isNicknameAvailable === false) {
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
        alert((error as Error).message);
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
