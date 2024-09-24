import request from './axios';

export const joinBattle = async (userEmail) => {
  try {
    const response = await request.post('/battle/join', { userEmail });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const checkMatchingStatus = async (matchId) => {
  try {
    const response = await request.get(`/battle/status/${matchId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('매칭 상태 확인 중 오류가 발생했습니다.');
  }
};
