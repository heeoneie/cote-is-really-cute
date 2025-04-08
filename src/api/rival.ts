import request from './axios';
import { Rival } from '../@types/rival';
import { handleApiError } from '@utils/apiError';

interface AddRivalRequest {
  userEmail: string;
  rivalNickName: string;
}

interface AddRivalResponse {
  success: boolean;
  message: string;
}

interface DeleteRivalResponse {
  success: boolean;
  message: string;
}

interface SearchRivalResponse {
  rivals: Rival[];
}

export const addRival = async (
  user: AddRivalRequest,
): Promise<AddRivalResponse> => {
  if (!user.userEmail.trim() || !user.rivalNickName.trim()) {
    throw new Error('이메일과 라이벌 닉네임을 모두 입력해주세요.');
  }

  try {
    const { data } = await request.post<AddRivalResponse>(
      '/rival/register',
      user,
    );
    return data;
  } catch (error: any) {
    throw handleApiError(error, '라이벌 등록');
  }
};

export const deleteRival = async (
  userEmail: string,
  rivalNickName: string,
): Promise<DeleteRivalResponse> => {
  if (!userEmail.trim() || !rivalNickName.trim()) {
    throw new Error('이메일과 라이벌 닉네임을 모두 입력해주세요.');
  }

  try {
    const { data } = await request.delete<DeleteRivalResponse>(
      '/rival/remove',
      {
        params: {
          userEmail: encodeURIComponent(userEmail),
          rivalNickName: encodeURIComponent(rivalNickName),
        },
      },
    );
    return data;
  } catch (error: any) {
    throw handleApiError(error, '라이벌 삭제');
  }
};

export const searchRival = async (
  userEmail: string,
): Promise<SearchRivalResponse> => {
  if (!userEmail.trim()) {
    throw new Error('이메일을 입력해주세요.');
  }

  try {
    const { data } = await request.get<SearchRivalResponse>(
      `/rival/get-info?userEmail=${encodeURIComponent(userEmail)}`,
    );
    return data;
  } catch (error: any) {
    throw handleApiError(error, '라이벌 검색');
  }
};
