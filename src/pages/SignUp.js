import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Grid,
} from '@mui/material';

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

    navigate('/login');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormInput
                label="Nickname"
                type="text"
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
                error={errors.nickname}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInput
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInput
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInput
                label="Baekjoon Tier"
                type="text"
                name="tier"
                value={formData.tier}
                onChange={handleChange}
                error={errors.tier}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

const FormInput = ({ label, type, name, value, onChange, error }) => (
  <Box sx={{ mb: 2 }}>
    <TextField
      variant="outlined"
      fullWidth
      label={label}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      error={Boolean(error)}
      helperText={error}
    />
  </Box>
);

export default SignUp;
