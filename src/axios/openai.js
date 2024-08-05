import request from './axios';

export const getAlgorithmCourse = async (category) => {
  return await request.post('/recommendation', { category });
};
