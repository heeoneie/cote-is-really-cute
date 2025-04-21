import request from './axios';
import { Rival } from '../types/domain/rival';
import { handleApiError } from '@utils/apiError';
import { API } from '@utils/endPoint';

interface AddRivalRequest {
  userEmail: string;
  rivalNickName: string;
}

interface OperationResponse {
  success: boolean;
  message: string;
}

interface SearchRivalResponse {
  rivals: Rival[];
}

export const addRival = async (
  user: AddRivalRequest,
): Promise<OperationResponse> => {
  if (!user.userEmail.trim() || !user.rivalNickName.trim()) {
    throw new Error('이메일과 라이벌 닉네임을 모두 입력해주세요.');
  }

  try {
    const { data } = await request.post<OperationResponse>(
      API.RIVAL.REGISTER,
      user,
    );
    return data;
  } catch (error: unknown) {
    throw handleApiError(error, '라이벌 등록');
  }
};

export const deleteRival = async (
  userEmail: string,
  rivalNickName: string,
): Promise<OperationResponse> => {
  if (!userEmail.trim() || !rivalNickName.trim()) {
    throw new Error('이메일과 라이벌 닉네임을 모두 입력해주세요.');
  }

  try {
    const { data } = await request.delete<OperationResponse>(API.RIVAL.DELETE, {
      params: {
        userEmail: userEmail,
        rivalNickName: rivalNickName,
      },
    });
    return data;
  } catch (error: unknown) {
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
      API.RIVAL.SEARCH(userEmail),
    );
    return data;
  } catch (error: unknown) {
    throw handleApiError(error, '라이벌 검색');
  }
};
