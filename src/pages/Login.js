import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import { loginUser } from '../axios/auth';
import './Login.css'; // CSS 파일 임포트
const Login = () => {
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = React.useState({});
  const [loginError, setLoginError] = React.useState('');
  const { setIsLoggedIn } = React.useContext(AppContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validate = () => {
    const validationErrors = {};
    if (!formData.email) validationErrors.email = 'Email is required';
    if (!formData.password) validationErrors.password = 'Password is required';
    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await loginUser(formData);
      const { token } = response.data;
      localStorage.setItem('token', token);
      setIsLoggedIn(true);
      navigate('/');
    } catch (error) {
      setLoginError('Invalid email or password');
    }
  };
  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <div className="container">
      <div className="title2">
        <h1 className="Login_title">로그인</h1>
      </div>
      <form onSubmit={handleSubmit} className="form">
        <div className="input-group">
          <input
            placeholder="Email"
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input"
            required
          />
          {errors.email && <div className="error">{errors.email}</div>}
          <div className="v-line"></div>
        </div>
        <div className="input-group">
          <input
            placeholder="Pw"
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="input"
            required
          />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>
        {loginError && <div className="alert">{loginError}</div>}
        <button type="submit" className="btn">
          로그인
        </button>
        <button onClick={handleSignUpClick} className="btn2">
          회원가입
        </button>
        <div className="signup_pharse">
          <p>계정이 없으신가요?</p>
        </div>
        <div className="phrase">
          <p>코딩테스트에 도전해보세요!</p>
        </div>
      </form>
    </div>
  );
};

export default Login;
