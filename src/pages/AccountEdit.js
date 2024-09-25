import React, { useState } from 'react';
import './AccountEdit.css'; // CSS 파일로 별도 관리

const AccountEdit = () => {
    const [nickname, setNickname] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // 수정 완료 로직
        console.log('정보 수정:', { nickname, currentPassword, newPassword });
    };

    const handleDeleteAccount = () => {
        // 회원 탈퇴 로직
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
                    <button type="submit" className="btn4">수정 완료</button>
                    <button type="button" className="btn5" onClick={handleDeleteAccount}>회원 탈퇴</button>
                </div>
            </form>
        </div>
    );
};

export default AccountEdit;
