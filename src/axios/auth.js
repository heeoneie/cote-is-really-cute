import request from './axios';

export const loginUser = async (credentials) => {
  return await request.post('/auth/login', credentials);
};
