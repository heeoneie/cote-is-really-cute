import React from 'react';
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
  const [formData, setFormData] = React.useState({
    nickname: '',
    email: '',
    password: '',
    tier: '',
  });
  const [errors, setErrors] = React.useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const errors = {};
    if (!formData.nickname) errors.nickname = 'Nickname is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.password) errors.password = 'Password is required';
    if (!formData.tier) errors.tier = 'Baekjoon Tier is required';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Implement the sign-up logic here, e.g., sending the data to a server
    console.log('Sign Up Data:', formData);

    // Navigate to another page after sign-up
    navigate('/login');
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Nickname"
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
          error={errors.nickname}
        />
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />
        <FormInput
          label="Baekjoon Tier"
          type="text"
          name="tier"
          value={formData.tier}
          onChange={handleChange}
          error={errors.tier}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};
const FormInput = ({ label, type, name, value, onChange, error }) => (
  <div>
    <label htmlFor={name}>{label}:</label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required
    />
    {error && <div style={{ color: 'red' }}>{error}</div>}
  </div>
);
export default SignUp;
