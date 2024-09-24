import request from './axios';

export const searchUser = async (user) => {
  try {
    const response = await request.get(`/users/search?nickname=${user}`);
    const result = await response.data;
    const filteredData = result.filter((item) =>
      item.nickname.toLowerCase().includes(user.toLowerCase()),
    );

    return filteredData;
  } catch (error) {
    console.error('Error during user search:', error);
    return [];
  }
};
