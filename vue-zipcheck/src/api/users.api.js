import http from './http';

/**
 * @returns {Promise<{userId: number, email: string, nickname: string}>}
 */
export const getMyInfo = () => {
  return http.get('/users/me').then(response => response.data);
};

export const deleteMyAccount = () => {
  return http.delete('/users/me');
};
