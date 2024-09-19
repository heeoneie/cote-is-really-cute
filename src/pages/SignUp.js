import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../axios/auth';
import './SignUp.css';
const SignUp = () => {
  const [formData, setFormData] = React.useState({
    nickname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [signUpError, setSignUpError] = React.useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validate = () => {
    const validationErrors = [];
    if (!formData.nickname) validationErrors.push('닉네임을 입력해주세요!');
    if (!formData.email) validationErrors.push('Email을 입력해주세요');
    if (!formData.password) validationErrors.push('Password 입력해주세요');
    if (!formData.confirmPassword)
      validationErrors.push('Password 일치하게 재입력해주세요');
    if (formData.password !== formData.confirmPassword)
      validationErrors.push('Password가 일치하지 않습니다');

    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (validationErrors.length > 0) {
      alert(validationErrors.join('\n')); // alert으로 오류 메시지 표시
      return;
    }

    try {
      await signUp(formData);
      navigate('/login');
    } catch (error) {
      setSignUpError(error.message);
      alert(error.message); // alert으로 오류 메시지 표시
    }
  };
  const handleloginClick = () => {
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
            id="nickname"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            placeholder="닉네임 입력"
            aria-label="닉네임"
          />
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
        </div>
        <div>
          <input
            className="input_group"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="PW 재입력"
            aria-label="PW 재입력"
          />
          <div className="middle-line"></div>
        </div>
        {signUpError && <p className="error_message">{signUpError}</p>}
        <button type="submit" className="singup_btn">
          회원가입
        </button>
        <button onClick={handleloginClick} className="Singup_login_btn">
          로그인
        </button>
        <p className="Sing_up_under_phrase">
          입문자도 쉽게 도전 할 수 있습니다!
        </p>
        <p className="Sing_up_middle_phrase2">
          코딩테스트에 도전하러 가시겠어요?
        </p>
      </form>
    </div>
  );
};

export default SignUp;
