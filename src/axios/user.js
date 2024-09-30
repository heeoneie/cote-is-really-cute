import request from './axios';

export const recordAttendance = async (userEmail) => {
  const today = new Date().toISOString().split('T')[0];
  const lastAttendance = localStorage.getItem('lastAttendance');
  if (lastAttendance === today) return;
  try {
    await request.post('/users/attend', { userEmail, attendanceDate: today });
    localStorage.setItem('lastAttendance', today);
    alert('출석이 완료되었습니다!');
  } catch (error) {
    console.error('Failed to record attendance:', error);
  }
};

export const checkConsecutiveAttendance = async (userEmail) => {
  try {
    const response = await request.get(`/users/attend/${userEmail}`);
    return response.data.consecutiveDays;
  } catch (error) {
    console.error('Error fetching attendance:', error);
  }
};
