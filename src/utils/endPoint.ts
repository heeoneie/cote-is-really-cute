export const API = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    CHECK_NICKNAME: (nickName: string) =>
      `/auth/check?nickName=${encodeURIComponent(nickName)}`,
    UPDATE_NICKNAME: '/users/update-nickName',
    UPDATE_PASSWORD: '/users/update-password',
  },
  USER: {
    SEARCH: (input: string, email: string) =>
      `/users/search?type=nickName&value=${encodeURIComponent(input)}&userEmail=${encodeURIComponent(email)}`,
    ATTEND: '/users/attend',
    CHECK_ATTEND: (userEmail: string) =>
      `/users/attend/${encodeURIComponent(userEmail)}`,
  },
  OPENAI: {
    GET_ALGORITHM_COURSE: '/openai/recommendation',
    GRADE: '/openai/grade',
  },
  RIVAL: {
    REGISTER: '/rival/register',
    DELETE: '/rival/remove',
    SEARCH: (userEmail: string) =>
      `/rival/get-info?userEmail=${encodeURIComponent(userEmail)}`,
  },
};
