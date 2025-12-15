import api from './apiClient';

export const getBoards = () => api.get('/boards');
