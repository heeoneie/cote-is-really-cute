import request from './axios';

const addRival = async (user) => {
  try {
    const { data } = await request.post('/rival/register', user);
    return data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || 'Error during rival add';
    throw new Error(errorMessage);
  }
};

const deleteRival = async (userEmail, rivalNickName) => {
  try {
    const { data } = await request.delete('/rival/remove', {
      params: { userEmail, rivalNickName },
    });
    return data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || 'Error during rival delete';
    throw new Error(errorMessage);
  }
};

const searchRival = async (userEmail) => {
  try {
    const { data } = await request.get(
      `/rival/get-info?userEmail=${userEmail}`,
    );
    return data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || 'Error during rival search';
    throw new Error(errorMessage);
  }
};

export { addRival, deleteRival, searchRival };
