import api from './apiClient';

export const getNotices = () => api.get('/notices');
