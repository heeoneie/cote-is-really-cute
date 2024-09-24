import request from './axios';

export const addRival = async (user) => {
  try {
    const { data } = await request.post('/rival/register', user);
    return data;
  } catch (error) {
    console.error('Error during rival add', error);
  }
};
