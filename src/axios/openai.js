import axios from './axios';

export const getAlgorithmCourse = async (category) => {
  return await axios.post('/recommendation', { category });
};
