import request from './axios';
import { User } from '../@types/user';
import { handleApiError } from '@utils/apiError';

export const searchUser = async (
  input: string,
  email: string,
): Promise<User[]> => {
  if (!input.trim()) throw new Error('검색어를 입력해주세요.');

  try {
    const { data } = await request.get<User[]>(
      `/users/search?type=nickName&value=${encodeURIComponent(input)}&userEmail=${encodeURIComponent(email)}`,
    );
    return data.filter((user) =>
      user.nickName.toLowerCase().includes(input.toLowerCase()),
    );
  } catch (error: any) {
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
    await request.post('/users/attend', { userEmail, attendanceDate: today });
    localStorage.setItem('lastAttendance', today);
    return { success: true, message: '출석이 완료되었습니다!' };
  } catch (error: any) {
    throw handleApiError(error, '출석 체크');
  }
};

export const checkConsecutiveAttendance = async (
  userEmail: string,
): Promise<number | null> => {
  if (!userEmail.trim()) throw new Error('이메일을 입력해주세요.');

  try {
    const { data } = await request.get<{ consecutiveDays: number }>(
      `/users/attend/${encodeURIComponent(userEmail)}`,
    );
    return data.consecutiveDays;
  } catch (error: any) {
    throw handleApiError(error, '연속 출석 체크');
  }
};
