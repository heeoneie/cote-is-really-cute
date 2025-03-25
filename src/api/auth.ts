import request from './axios';

interface User {
  email: string;
  password: string;
  nickName: string;
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
type UpdateNickNameResponse = ApiResponse<{ nickName: string }>;
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
  if (!user.email.trim()) throw new Error('이메일을 입력해주세요.');
  if (!user.password.trim()) throw new Error('비밀번호를 입력해주세요.');
  if (!user.nickName.trim()) throw new Error('닉네임을 입력해주세요.');

  try {
    const { data } = await request.post('/auth/signup', user);
    return data;
  } catch (error: any) {
    throw handleApiError(error, '회원가입 실패');
  }
};

export const checkNickName = async (
  nickName: string,
): Promise<{ available: boolean; message?: string }> => {
  if (!nickName.trim()) throw new Error('닉네임을 입력해주세요.');

  try {
    const { data } = await request.get(
      `/auth/check?nickName=${encodeURIComponent(nickName)}`,
    );
    return {
      available: true,
      message: data.message || '사용 가능한 닉네임입니다.',
    };
  } catch (error: any) {
    if (error.response?.status === 409)
      return { available: false, message: '이미 사용 중인 닉네임입니다.' };

    throw handleApiError(error, '닉네임 확인 중 오류가 발생했습니다');
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
  if (!newPassword.trim()) throw new Error('새 비밀번호를 입력해주세요.');
  if (!confirmPassword.trim()) throw new Error('비밀번호 확인을 입력해주세요.');
  if (newPassword !== confirmPassword)
    throw new Error('비밀번호와 비밀번호 확인이 일치하지 않습니다.');

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
