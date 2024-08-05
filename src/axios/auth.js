import request from './axios';

export const loginUser = async (credentials) => {
  return request.post('/auth/login', credentials);
};

export const signUp = async (userData) => {
  try {
    const { data } = await request.post('/auth/signup', userData);
    return data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Sign up failed';
    throw new Error(errorMessage);
  }
};
