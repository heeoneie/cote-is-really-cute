import request from './axios';

interface User {
  id: string;
  nickName: string;
  email: string;
}

export const searchUser = async (
  input: string,
  email: string,
): Promise<User[]> => {
  if (!input.trim()) throw new Error('검색어를 입력해주세요.');

  try {
    const { data } = await request.get<User[]>(
      `/users/search?type=nickName&value=${input}&userEmail=${email}`,
    );
    return data.filter((user) =>
      user.nickName.toLowerCase().includes(input.toLowerCase()),
    );
  } catch (error: any) {
    console.error('📌 사용자 검색 중 오류 발생:', error);
    return [];
  }
};

export const recordAttendance = async (userEmail: string): Promise<void> => {
  if (!userEmail.trim()) throw new Error('이메일을 입력해주세요.');

  const today = new Date().toISOString().split('T')[0];
  const lastAttendance = localStorage.getItem('lastAttendance');
  if (lastAttendance === today) return;

  try {
    await request.post('/users/attend', { userEmail, attendanceDate: today });
    localStorage.setItem('lastAttendance', today);
    alert('출석이 완료되었습니다!');
  } catch (error: any) {
    console.error('📌 출석 기록 중 오류 발생:', error);
  }
};

export const checkConsecutiveAttendance = async (
  userEmail: string,
): Promise<number | null> => {
  if (!userEmail.trim()) throw new Error('이메일을 입력해주세요.');

  try {
    const { data } = await request.get<{ consecutiveDays: number }>(
      `/users/attend/${userEmail}`,
    );
    return data.consecutiveDays;
  } catch (error: any) {
    console.error('📌 출석 정보 가져오기 중 오류 발생:', error);
    return null;
  }
};
