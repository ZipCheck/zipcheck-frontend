import http from './http';

/**
 * @returns {Promise<any[]>}
 */
export const getNotices = () => {
  return http.get('/notices').then(response => response.data);
};
