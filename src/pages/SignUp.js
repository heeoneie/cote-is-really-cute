import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp, checkNickname } from '../axios/auth';
import './SignUp.css';

const SignUp = () => {
  const [formData, setFormData] = React.useState({
    nickName: '',
    email: '',
    password: '',
    baekjoonTier: '',
  });
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [nicknameMessage, setNicknameMessage] = React.useState('');
  const [emailMessage, setEmailMessage] = React.useState('');
  const [passwordMessage, setPasswordMessage] = React.useState('');
  const [baekjoonTierMessage, setBaekjoonTierMessage] = React.useState('');
  const [nicknameAvailable, setNicknameAvailable] = React.useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const validateNickName = (nickName) => {
    if (!nickName) {
      setNicknameMessage('닉네임을 입력해주세요');
      return false;
    }
    if (!nicknameAvailable) {
      setNicknameMessage('닉네임 중복 확인을 해주세요!');
      return false;
    }
    setNicknameMessage('');
    return true;
  };

  const validateEmail = (email) => {
    if (!email) {
      setEmailMessage('Email을 입력해주세요');
      return false;
    }
    setEmailMessage('');
    return true;
  };

  const validatePassword = (password, confirmPassword) => {
    if (!password) {
      setPasswordMessage('Password를 입력해주세요');
      return false;
    }
    if (!confirmPassword) {
      setPasswordMessage('Password를 재입력해주세요');
      return false;
    }
    if (password !== confirmPassword) {
      setPasswordMessage('Password가 일치하지 않습니다');
      return false;
    }
    setPasswordMessage('');
    return true;
  };

  const validateBaekjoonTier = (baekjoonTier) => {
    if (!baekjoonTier) {
      setBaekjoonTierMessage('Baekjoon 티어를 선택해주세요!');
      return false;
    }
    setBaekjoonTierMessage('');
    return true;
  };

  const handleNicknameCheck = async () => {
    try {
      const rsf = await checkNickname(formData.nickName);
      if (rsf.available) {
        setNicknameAvailable(true);
        setNicknameMessage('사용 가능한 닉네임입니다!');
      } else {
        setNicknameAvailable(false);
        setNicknameMessage('닉네임이 이미 사용 중입니다.');
      }
    } catch (error) {
      setNicknameAvailable(false);
      setNicknameMessage(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs before submitting
    const isNickNameValid = validateNickName(formData.nickName);
    const isEmailValid = validateEmail(formData.email);
    const isPasswordValid = validatePassword(
      formData.password,
      confirmPassword,
    );
    const isBaekjoonTierValid = validateBaekjoonTier(formData.baekjoonTier);

    if (
      !isNickNameValid ||
      !isEmailValid ||
      !isPasswordValid ||
      !isBaekjoonTierValid
    ) {
      return;
    }

    try {
      await signUp(formData);
      setNicknameMessage('회원가입이 성공적으로 완료되었습니다!');
      navigate('/login');
    } catch (error) {
      setNicknameMessage(error.message);
    }
  };

  const handleLevelChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      baekjoonLevel: e.target.value,
    }));
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div>
      <h1 className="Signup_title">회원가입</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            className="input_group"
            type="text"
            id="nickName"
            name="nickName"
            value={formData.nickName}
            onChange={handleChange}
            placeholder="닉네임 입력"
            aria-label="닉네임"
          />
          <button
            type="button"
            className="nickname_check_btn"
            onClick={handleNicknameCheck}
          >
            닉네임 확인
          </button>
          {nicknameMessage && (
            <span className="nickname_Message">{nicknameMessage}</span>
          )}
        </div>
        <div>
          <input
            className="input_group"
            type="email"
            id="signup_email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email 입력"
            aria-label="email"
          />
          {emailMessage && <span className="Emailmessage">{emailMessage}</span>}
        </div>
        <div>
          <input
            className="input_group"
            type="password"
            id="signup_password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="PW 입력"
            aria-label="PW"
          />
          {passwordMessage && (
            <span className="passwordMessage">{passwordMessage}</span>
          )}
        </div>
        <div>
          <input
            className="input_group"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="PW 재입력"
            aria-label="PW 재입력"
          />
        </div>

        <div className="tier-section">
          <h2>Baekjoon 티어 선택</h2>
          {['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Ruby'].map(
            (tier) => (
              <label
                key={tier}
                htmlFor={`tier-${tier}`}
                className={`tier-label ${formData.baekjoonTier === tier ? 'selected' : ''} ${tier.toLowerCase()}`}
              >
                <input
                  type="radio"
                  id={`tier-${tier}`}
                  name="baekjoonTier"
                  value={tier}
                  onChange={handleChange}
                  checked={formData.baekjoonTier === tier}
                  style={{ display: 'none' }}
                />
                {tier}
              </label>
            ),
          )}
        </div>
        {baekjoonTierMessage && (
          <span className="baekjoonTier_message">{baekjoonTierMessage}</span>
        )}

        {formData.baekjoonTier && (
          <div className="level-section">
            <h2> 레벨 선택</h2>
            {['I', 'II', 'III', 'IV', 'V'].map((level, index) => (
              <label
                key={level}
                htmlFor={`level-${index + 1}`}
                className={
                  formData.baekjoonLevel === String(index + 1) ? 'selected' : ''
                }
              >
                <input
                  type="radio"
                  id={`level-${index + 1}`}
                  name="baekjoonLevel"
                  value={index + 1}
                  onChange={handleLevelChange}
                  checked={formData.baekjoonLevel === String(index + 1)}
                  style={{ display: 'none' }}
                />
                {level}
              </label>
            ))}
          </div>
        )}

        <div className="middle-line"></div>
        <button type="submit" className="singup_btn">
          회원가입 완료
        </button>
        <button onClick={handleLoginClick} className="Singup_login_btn">
          로그인
        </button>
        <p className="Sing_up_middle_phrase2">
          코딩테스트에 도전하러 가시겠어요?
        </p>
      </form>
    </div>
  );
};

export default SignUp;
