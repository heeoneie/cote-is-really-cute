import request from './axios';
import { handleApiError } from '@utils/apiError';
import { API } from '@utils/endPoint';
import { JoinFormValues } from '@schema/joinSchema';
import {
  CheckNickNameApiResponse,
  JoinApiResponse,
  LoginApiResponse,
  LoginCredentials,
  SignupApiResponse,
  UpdateNickNameApiResponse,
  UpdatePasswordApiResponse,
} from '../types/api/auth';
import { validateRequired } from '@utils/validateRequired';

export const login = async (
  credentials: LoginCredentials,
): Promise<LoginApiResponse> => {
  validateRequired(credentials.email, '이메일');
  validateRequired(credentials.password, '닉네임');
  try {
    const { data } = await request.post<LoginApiResponse>(
      API.AUTH.LOGIN,
      credentials,
    );
    return data;
  } catch (error: unknown) {
    throw handleApiError(error, '로그인 실패');
  }
};

export const join = async (
  user: JoinFormValues,
): Promise<SignupApiResponse> => {
  validateRequired(user.email, '이메일');
  validateRequired(user.nickName, '닉네임');

  try {
    const { data } = await request.post<JoinApiResponse>(API.AUTH.SIGNUP, user);
    return data;
  } catch (error: unknown) {
    throw handleApiError(error, '회원가입');
  }
};

export const checkNickName = async (
  nickName: string,
): Promise<CheckNickNameApiResponse> => {
  validateRequired(nickName, '닉네임');

  try {
    const { data } = await request.get<CheckNickNameApiResponse>(
      API.AUTH.CHECK_NICKNAME(nickName),
    );
    return data;
  } catch (error: unknown) {
    throw handleApiError(error, '닉네임 중복 확인');
  }
};

export const updateNickName = async (
  newNickName: string,
): Promise<UpdateNickNameApiResponse> => {
  validateRequired(newNickName, '닉네임');
  try {
    const { data } = await request.put<UpdateNickNameApiResponse>(
      API.AUTH.UPDATE_NICKNAME,
      { newNickName },
    );
    return data;
  } catch (error: unknown) {
    throw handleApiError(error, '닉네임 변경');
  }
};

export const updatePassword = async (
  newPassword: string,
  confirmPassword: string,
): Promise<UpdatePasswordApiResponse> => {
  validateRequired(newPassword, '새 비밀번호');
  validateRequired(confirmPassword, '확인 비밀번호');
  if (newPassword !== confirmPassword)
    throw new Error('비밀번호와 비밀번호 확인이 일치하지 않습니다.');

  try {
    const { data } = await request.put<UpdatePasswordApiResponse>(
      API.AUTH.UPDATE_PASSWORD,
      {
        newPassword,
        confirmPassword,
      },
    );
    return data;
  } catch (error: unknown) {
    throw handleApiError(error, '비밀번호 변경');
  }
};
