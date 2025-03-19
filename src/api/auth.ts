import request from './axios';

interface User {
  email: string;
  password: string;
  nickname: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

interface ApiResponse<T> {
  data: T;
}

type LoginApiResponse = ApiResponse<LoginResponse>;
type SignupApiResponse = ApiResponse<{ user: User }>;
type UpdateNickNameResponse = ApiResponse<{ nickname: string }>;
type UpdatePasswordResponse = ApiResponse<{ message: string }>;

const handleApiError = (error: any, defaultMessage: string): never => {
  throw new Error(error.response?.data?.message || defaultMessage);
};

export const loginUser = async (
  credentials: LoginCredentials,
): Promise<LoginApiResponse> => {
  try {
    const response = await request.post('/auth/login', credentials);
    return response.data;
  } catch (error: any) {
    throw handleApiError(error, '로그인 실패');
  }
};

export const signUp = async (user: User): Promise<SignupApiResponse> => {
  try {
    const { data } = await request.post('/auth/signup', user);
    return data;
  } catch (error: any) {
    throw handleApiError(error, '회원가입 실패');
  }
};

export const checkNickName = async (
  nickName: string,
): Promise<UpdateNickNameResponse> => {
  try {
    const { data } = await request.get(`/auth/check?nickName=${nickName}`);
    return data;
  } catch (error: any) {
    throw handleApiError(error, '응답이 없습니다');
  }
};

export const updateNickName = async (
  newNickName: string,
): Promise<UpdateNickNameResponse> => {
  try {
    const { data } = await request.put('/users/update-nickName', {
      newNickName,
    });
    return data;
  } catch (error: any) {
    throw handleApiError(error, '닉네임 변경 실패');
  }
};

export const updatePassword = async (
  newPassword: string,
  confirmPassword: string,
): Promise<UpdatePasswordResponse> => {
  try {
    const { data } = await request.put('/users/update-password', {
      newPassword,
      confirmPassword,
    });
    return data;
  } catch (error: any) {
    throw handleApiError(error, '비밀번호 변경 실패');
  }
};
