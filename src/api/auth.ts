import request from './axios';
import { User } from '../@types/user';
import { handleApiError } from '@utils/apiError';
import { API } from '@utils/endPoint';

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
type UpdateNickNameResponse = ApiResponse<{ nickName: string }>;
type UpdatePasswordResponse = ApiResponse<{ message: string }>;

export const loginUser = async (
  credentials: LoginCredentials,
): Promise<LoginApiResponse> => {
  if (!credentials.email.trim()) throw new Error('이메일을 입력해주세요.');
  if (!credentials.password.trim()) throw new Error('비밀번호를 입력해주세요.');
  try {
    const response = await request.post(API.AUTH.LOGIN, credentials);
    return response.data;
  } catch (error: unknown) {
    throw handleApiError(error, '로그인 실패');
  }
};

export const signUp = async (user: User): Promise<SignupApiResponse> => {
  if (!user.email.trim()) throw new Error('이메일을 입력해주세요.');
  if (!user.nickName.trim()) throw new Error('닉네임을 입력해주세요.');

  try {
    const { data } = await request.post(API.AUTH.SIGNUP, user);
    return data;
  } catch (error: unknown) {
    throw handleApiError(error, '회원가입');
  }
};

export const checkNickName = async (
  nickName: string,
): Promise<{ available: boolean; message?: string }> => {
  if (!nickName.trim()) throw new Error('닉네임을 입력해주세요.');

  try {
    const { data } = await request.get(API.AUTH.CHECK_NICKNAME(nickName));
    return {
      available: true,
      message: data.message || '사용 가능한 닉네임입니다.',
    };
  } catch (error: unknown) {
    throw handleApiError(error, '닉네임 중복 확인');
  }
};

export const updateNickName = async (
  newNickName: string,
): Promise<UpdateNickNameResponse> => {
  if (!newNickName.trim()) throw new Error('새 닉네임을 입력해주세요.');
  try {
    const { data } = await request.put(API.AUTH.UPDATE_NICKNAME, {
      newNickName,
    });
    return data;
  } catch (error: unknown) {
    throw handleApiError(error, '닉네임 변경');
  }
};

export const updatePassword = async (
  newPassword: string,
  confirmPassword: string,
): Promise<UpdatePasswordResponse> => {
  if (!newPassword.trim()) throw new Error('새 비밀번호를 입력해주세요.');
  if (!confirmPassword.trim()) throw new Error('비밀번호 확인을 입력해주세요.');
  if (newPassword !== confirmPassword)
    throw new Error('비밀번호와 비밀번호 확인이 일치하지 않습니다.');

  try {
    const { data } = await request.put(API.AUTH.UPDATE_PASSWORD, {
      newPassword,
      confirmPassword,
    });
    return data;
  } catch (error: unknown) {
    throw handleApiError(error, '비밀번호 변경');
  }
};
