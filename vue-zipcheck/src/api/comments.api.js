import http from './http';

/**
 * @param {{boardId: number | string, content: string}} commentData
 */
export const createComment = commentData => {
	return http.post('/comments', commentData);
};

/**
 * @param {number | string} boardId
 */
export const getCommentsByBoardId = boardId => {
	return http.get(`/comments/board/${boardId}`);
};

/**
 * @param {number | string} commentId
 */
export const deleteComment = commentId => {
	return http.delete(`/comments/${commentId}`);
};
