import request from './axios';

const addRival = async (user) => {
  try {
    const { data } = await request.post('/rival/register', user);
    return data;
  } catch (error) {
    console.error('Error during rival add', error);
  }
};

const deleteRival = async (userEmail, rivalNickName) => {
  try {
    const { data } = await request.delete('/rival/remove', {
      params: { userEmail, rivalNickName },
    });
    return data;
  } catch (error) {
    console.error('Error during rival delete', error);
  }
};

export { addRival, deleteRival };
