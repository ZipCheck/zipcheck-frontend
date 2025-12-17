import http from './http';

/**
 * @param {number | string} boardId
 * @param {{ content: string }} commentData
 */
export const createComment = (boardId, commentData) => {
  return http.post(`/boards/${boardId}/comments`, commentData);
};

/**
 * @param {number | string} commentId
 */
export const deleteComment = (commentId) => {
  return http.delete(`/comments/${commentId}`);
};
