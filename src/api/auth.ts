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
  UpdateNickNameResponse,
  UpdatePasswordResponse,
} from '../types/api/auth';

export const loginUser = async (
  credentials: LoginCredentials,
): Promise<LoginApiResponse> => {
  if (!credentials.email.trim()) throw new Error('이메일을 입력해주세요.');
  if (!credentials.password.trim()) throw new Error('비밀번호를 입력해주세요.');
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
  if (!user.email.trim()) throw new Error('이메일을 입력해주세요.');
  if (!user.nickName.trim()) throw new Error('닉네임을 입력해주세요.');

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
  if (!nickName.trim()) throw new Error('닉네임을 입력해주세요.');

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
): Promise<UpdateNickNameResponse> => {
  try {
    const { data } = await request.put<UpdateNickNameResponse>(
      API.AUTH.UPDATE_NICKNAME,
      { newNickName },
    );
    return data;
  } catch (error) {
    throw handleApiError(error, '닉네임 변경');
  }
};

export const updatePassword = async (
  newPassword: string,
  confirmPassword: string,
): Promise<UpdatePasswordResponse> => {
  if (newPassword !== confirmPassword)
    throw new Error('비밀번호와 비밀번호 확인이 일치하지 않습니다.');

  try {
    const { data } = await request.put<UpdatePasswordResponse>(
      API.AUTH.UPDATE_PASSWORD,
      {
        newPassword,
        confirmPassword,
      },
    );
    return data;
  } catch (error) {
    throw handleApiError(error, '비밀번호 변경');
  }
};
