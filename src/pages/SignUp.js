import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp, checkNickname } from '../axios/auth';
import '../styles/SignUp.css';

const SignUp = () => {
  const [formData, setFormData] = React.useState({
    nickName: '',
    email: '',
    password: '',
    baekjoonTier: '',
  });
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [baekjoonLevel, setBaekjoonLevel] = React.useState('');
  const [nicknameMessage, setNicknameMessage] = React.useState('');
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

  const validateNickName = () => {
    if (!nicknameAvailable) {
      setNicknameMessage('닉네임 중복 확인을 해주세요!');
      return false;
    }
    setNicknameMessage('');
    return true;
  };

  const validatePassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      setPasswordMessage('Password가 일치하지 않습니다');
      return false;
    }
    setPasswordMessage('');
    return true;
  };

  const validateBaekjoonTier = (baekjoonTier) => {
    if (!baekjoonTier || !baekjoonLevel) {
      setBaekjoonTierMessage('Baekjoon 티어와 레벨을 모두 선택해주세요!');
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
        setNicknameMessage('이미 사용 중인 닉네임입니다.');
      }
    } catch (error) {
      setNicknameAvailable(false);
      setNicknameMessage(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isNickNameValid = validateNickName();
    const isPasswordValid = validatePassword(
      formData.password,
      confirmPassword,
    );
    const isBaekjoonTierValid = validateBaekjoonTier(formData.baekjoonTier);

    if (!isNickNameValid || !isPasswordValid || !isBaekjoonTierValid) {
      return;
    }

    const signupFormData = {
      ...formData,
      baekjoonTier: `${formData.baekjoonTier} ${baekjoonLevel}`,
    };
    try {
      await signUp(signupFormData);
      alert('회원가입이 성공적으로 완료되었습니다!');
      navigate('/login');
    } catch (error) {
      setNicknameMessage(error.message);
    }
  };

  const handleLevelChange = (e) => {
    setBaekjoonLevel(e.target.value);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="signup_container">
      <div className="signup_mainContainer">
        <h1 className="signup_title">회원가입</h1>
        <form onSubmit={handleSubmit}>
          <div className="signup_nickname_container">
            <input
              className="signup_input_group"
              type="text"
              id="nickName"
              name="nickName"
              value={formData.nickName}
              onChange={handleChange}
              placeholder="닉네임 입력"
              aria-label="닉네임"
              required
            />
            <button
              type="button"
              className="signup_nickname_check_btn"
              onClick={handleNicknameCheck}
            >
              닉네임 확인
            </button>
          </div>
          {nicknameMessage && (
            <span
              className={`signup_nickname_Message ${
                nicknameAvailable ? 'signup_nickname_Message-available' : ''
              }`}
            >
              {nicknameMessage}
            </span>
          )}
          <div>
            <input
              className="signup_input_group"
              type="email"
              id="signup_email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email 입력"
              aria-label="email"
              required
            />
          </div>
          <div>
            <input
              className="signup_input_group"
              type="password"
              id="signup_password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password 입력"
              aria-label="PW"
              required
            />
          </div>
          <div>
            <input
              className="signup_input_group"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="Password 확인"
              aria-label="PW 재입력"
              required
            />
          </div>
          <div className="signup_tier-section">
            <h2>Baekjoon 티어 선택</h2>
            {['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Ruby'].map(
              (tier) => (
                <label
                  key={tier}
                  htmlFor={`tier-${tier}`}
                  className={`signup_tier-label ${formData.baekjoonTier === tier ? 'selected' : ''} ${tier.toLowerCase()}`}
                >
                  <input
                    type="radio"
                    id={`tier-${tier}`}
                    name="baekjoonTier"
                    value={tier}
                    onChange={handleChange}
                    checked={formData.baekjoonTier === tier}
                    required
                  />
                  {tier}
                </label>
              ),
            )}
          </div>
          {formData.baekjoonTier && (
            <div className="signup_level-section">
              <h2> 레벨 선택</h2>
              {['I', 'II', 'III', 'IV', 'V'].map((level, index) => (
                <label
                  key={level}
                  htmlFor={`level-${index + 1}`}
                  className={`signup_level-label ${
                    baekjoonLevel === level ? 'selected' : ''
                  }`}
                >
                  <input
                    type="radio"
                    id={`level-${index + 1}`}
                    name="baekjoonLevel"
                    value={level}
                    onChange={handleLevelChange}
                    checked={baekjoonLevel === level}
                    required
                  />
                  {level}
                </label>
              ))}
            </div>
          )}
          <div className="signup_btn_and_msg">
            <div className="signup_error_messages">
              {passwordMessage && (
                <span className="signup_passwordMessage">
                  {passwordMessage}
                </span>
              )}
              {baekjoonTierMessage && (
                <span className="signup_baekjoonTier_message">
                  {baekjoonTierMessage}
                </span>
              )}
            </div>
            <button type="submit" className="signup_btn">
              가입하기
            </button>
          </div>
        </form>
      </div>
      <div className="signup_divider" />
      <div className="signup_subContainer">
        <h1 className="signup_phrase2">코딩테스트에 도전하러 가시겠어요?</h1>
        <button onClick={handleLoginClick} className="signup_login_btn">
          로그인
        </button>
      </div>
    </div>
  );
};

export default SignUp;
