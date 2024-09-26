import request from './axios';

export const joinBattle = async (userEmail) => {
  try {
    const response = await request.post('/battle/join', { userEmail });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
