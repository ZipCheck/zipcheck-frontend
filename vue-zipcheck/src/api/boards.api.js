import http from './http';

/**
 * 게시글 목록을 조회합니다.
 * @param {'latest' | 'likes'} order 정렬 기준
 * @returns {Promise<Array<{
 *   boardId: number,
 *   title: string,
 *   category: 'FREE' | 'REVIEW' | 'QUESTION' | 'INFO',
 *   hit: number,
 *   createdAt: string,
 *   nickname: string,
 *   likeCount: number,
 *   isLiked: boolean,
 *   commentCount: number // Added for comment count
 * }>>}
 */
export const getBoards = (order = 'latest') => {
	return http.get('/boards', { params: { order } });
};

/**
 * 특정 ID의 게시글을 상세 조회합니다.
 * @param {number | string} id 게시글 ID
 * @returns {Promise<{
 *   boardId: number,
 *   title: string,
 *   category: 'FREE' | 'REVIEW' | 'QUESTION' | 'INFO',
 *   content: string,
 *   hit: number,
 *   createdAt: string,
 *   updatedAt: string | null,
 *   nickname: string,
 *   userId: number, // Added userId
 *   likeCount: number,
 *   isLiked: boolean,
 *   commentCount: number // Added for comment count
 * }>}
 */
export const getBoardById = id => {
	return http.get(`/boards/${id}`);
};

/**
 * 새로운 게시글을 등록합니다.
 * @param {{ title: string, category: 'FREE' | 'REVIEW' | 'QUESTION' | 'INFO', content: string }} boardData
 * @returns {Promise<void>}
 */
export const createBoard = boardData => {
	return http.post('/boards', boardData);
};

/**
 * 특정 ID의 게시글을 수정합니다.
 * @param {number | string} id 게시글 ID
 * @param {{ title: string, category: 'FREE' | 'REVIEW' | 'QUESTION' | 'INFO', content: string }} boardData
 * @returns {Promise<void>}
 */
export const updateBoard = (id, boardData) => {
	return http.put(`/boards/${id}`, boardData);
};

/**
 * 특정 ID의 게시글을 삭제합니다.
 * @param {number | string} id 게시글 ID
 * @returns {Promise<void>}
 */
export const deleteBoard = id => {
	return http.delete(`/boards/${id}`);
};

/**
 * 게시글 좋아요를 토글합니다.
 * @param {number | string} id
 * @returns {Promise<{
 *   success: boolean,
 *   data: boolean
 * }>} API 응답에서 좋아요 적용 여부를 나타내는 boolean 값
 */
export const likeBoard = id => {
	return http.post(`/boards/${id}/like`);
};

/**
 * 내가 작성한 게시글 목록을 조회합니다.
 * @returns {Promise<{
 *   success: boolean,
 *   data: Array<{
 *     boardId: number,
 *     title: string,
 *     category: 'FREE' | 'REVIEW' | 'QUESTION' | 'INFO',
 *     hit: number,
 *     createdAt: string,
 *     nickname: string,
 *     likeCount: number,
 *     isLiked: boolean
 *   }>
 * }>}
 */
export const getMyBoards = () => {
	return http.get('/boards/my');
};
