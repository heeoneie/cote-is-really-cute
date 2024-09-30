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

export const logoutUser = (setEmail) => {
  localStorage.removeItem('token');
  localStorage.removeItem('email');
  setEmail('');
};

export const checkNickName = async (nickName) => {
  try {
    const { data } = await request.get(`/auth/check?nickName=${nickName}`);
    return data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || '응답이 없습니다';
    throw new Error(errorMessage);
  }
};

export const updateNickName = async (newNickName) => {
  try {
    const { data } = await request.put('/users/update-nickName', {
      newNickName,
    });
    return data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || '닉네임 변경 실패';
    throw new Error(errorMessage);
  }
};

export const updatePassword = async (newPassword, confirmPassword) => {
  try {
    const { data } = await request.put('/users/update-password', {
      newPassword,
      confirmPassword,
    });
    return data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || '비밀번호 변경 실패';
    throw new Error(errorMessage);
  }
};
