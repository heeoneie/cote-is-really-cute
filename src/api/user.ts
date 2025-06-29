import request from './axios';
import { User } from '../types/domain/user';
import { handleApiError } from '@utils/apiError';
import { API } from '@utils/endPoint';

export const searchUser = async (
  input: string,
  email: string,
): Promise<User[]> => {
  if (!input.trim()) throw new Error('검색어를 입력해주세요.');

  try {
    const { data } = await request.get<User[]>(API.USER.SEARCH(input, email));
    return data.filter((user) =>
      user.nickName.toLowerCase().includes(input.toLowerCase()),
    );
  } catch (error: unknown) {
    throw handleApiError(error, '사용자 검색');
  }
};

export const recordAttendance = async (
  userEmail: string,
): Promise<{ success: boolean; message?: string }> => {
  if (!userEmail.trim()) throw new Error('이메일을 입력해주세요.');

  const today = new Date().toISOString().split('T')[0];
  const lastAttendance = localStorage.getItem('lastAttendance');
  if (lastAttendance === today)
    return { success: true, message: '이미 오늘 출석을 완료했습니다.' };

  try {
    await request.post(API.USER.ATTEND, { userEmail, attendanceDate: today });
    localStorage.setItem('lastAttendance', today);
    return { success: true, message: '출석이 완료되었습니다!' };
  } catch (error: unknown) {
    throw handleApiError(error, '출석 체크');
  }
};

export const checkConsecutiveAttendance = async (
  userEmail: string,
): Promise<number | null> => {
  if (!userEmail.trim()) throw new Error('이메일을 입력해주세요.');

  try {
    const { data } = await request.get<{ consecutiveDays: number }>(
      API.USER.CHECK_ATTEND(userEmail),
    );
    return data.consecutiveDays;
  } catch (error: unknown) {
    throw handleApiError(error, '연속 출석 체크');
  }
};

export const getUserLevel = async (userEmail: string): Promise<number> => {
  if (!userEmail.trim()) throw new Error('이메일을 입력해주세요.');
  try {
    const { data } = await request.get<{ level: number }>(
      API.USER.LEVEL(userEmail),
    );
    return data.level;
  } catch (error) {
    throw handleApiError(error, '레벨 조회');
  }
};
