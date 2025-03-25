import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp, checkNickName } from '@api/auth';
import '../styles/SignUp.css';
import HomeBtn from '@components/HomeBtn';

interface SignUpFormData {
  nickName: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const [formData, setFormData] = React.useState<SignUpFormData>({
    nickName: '',
    email: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = React.useState<string>('');
  const [nicknameMessage, setNickNameMessage] = React.useState<string>('');
  const [passwordMessage, setPasswordMessage] = React.useState<string>('');
  const [nicknameAvailable, setNickNameAvailable] =
    React.useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(e.target.value);
  };

  const validateNickName = () => {
    if (!nicknameAvailable) {
      setNickNameMessage('닉네임 중복 확인을 해주세요!');
      return false;
    }
    setNickNameMessage('');
    return true;
  };

  const validatePassword = (password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      setPasswordMessage('Password가 일치하지 않습니다');
      return false;
    }
    setPasswordMessage('');
    return true;
  };

  const handleNickNameCheck = async () => {
    try {
      const rsf = await checkNickName(formData.nickName);
      if (rsf.available) {
        setNickNameAvailable(true);
        setNickNameMessage('사용 가능한 닉네임입니다!');
      } else {
        setNickNameAvailable(false);
        setNickNameMessage('이미 사용 중인 닉네임입니다.');
      }
    } catch (error) {
      setNickNameAvailable(false);
      if (error instanceof Error) setNickNameMessage(error.message);
      else setNickNameMessage('알 수 없는 오류가 발생했습니다.');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isNickNameValid = validateNickName();
    const isPasswordValid = validatePassword(
      formData.password,
      confirmPassword,
    );

    if (!isNickNameValid || !isPasswordValid) return;

    const signupFormData = { ...formData };

    try {
      await signUp(signupFormData);
      alert('회원가입이 성공적으로 완료되었습니다!');
      navigate('/login');
    } catch (error) {
      if (error instanceof Error) setNickNameMessage(error.message);
      else setNickNameMessage('알 수 없는 오류가 발생했습니다.');
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="signup_container">
      <div className="signup_mainContainer">
        <HomeBtn />
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
              onClick={handleNickNameCheck}
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
          <div className="signup_btn_and_msg">
            <div className="signup_error_messages">
              {passwordMessage && (
                <span className="signup_passwordMessage">
                  {passwordMessage}
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
