import http from './http';

/**
 * @returns {Promise<Array<{boardId: number, title: string, writer: string, createdAt: string}>>}
 */
export const getBoards = () => {
	return http.get('/boards').then(response => response.data);
};

/**
 * @param {number | string} id
 * @returns {Promise<{boardId: number, title: string, content: string, comments: any[]}>}
 */
export const getBoardById = id => {
	return http.get(`/boards/${id}`).then(response => response.data);
};

/**
 * @param {{ title: string, content: string }} boardData
 */
export const createBoard = boardData => {
	return http.post('/boards', boardData);
};

/**
 * @param {number | string} id
 */
export const likeBoard = id => {
	return http.post(`/boards/${id}/like`).then(response => response.data);
};

/**
 * @returns {Promise<Array<{boardId: number, title: string, writer: string, createdAt: string}>>}
 */
export const getMyBoards = () => {
	return http.get('/boards/me').then(response => response.data);
};
