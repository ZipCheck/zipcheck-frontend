import http from './http';

/**
 * 공지사항 목록을 조회합니다.
 * @param {'IMPORTANT' | 'NORMAL' | 'UPDATE'} [category] - 조회할 카테고리 (선택 사항)
 * @returns {Promise<{
 *   success: boolean,
 *   data: Array<{
 *     noticeId: number,
 *     title: string,
 *     category: 'IMPORTANT' | 'NORMAL' | 'UPDATE',
 *     nickname: string,
 *     hit: number,
 *     createdAt: string
 *   }>
 * }>}
 */
export const getNotices = category => {
	return http.get('/notices', { params: { category } });
};

/**
 * 특정 ID의 공지사항을 상세 조회합니다.
 * @param {number | string} id - 공지사항 ID
 * @returns {Promise<{
 *   success: boolean,
 *   data: {
 *     noticeId: number,
 *     title: string,
 *     category: 'IMPORTANT' | 'NORMAL' | 'UPDATE',
 *     content: string,
 *     nickname: string,
 *     hit: number,
 *     createdAt: string
 *   }
 * }>}
 */
export const getNoticeById = id => {
	return http.get(`/notices/${id}`);
};

/**
 * 새로운 공지사항을 등록합니다. (관리자용)
 * @param {{ title: string, category: 'IMPORTANT' | 'NORMAL' | 'UPDATE', content: string }} noticeData
 * @returns {Promise<{success: boolean, message: string, data: null}>}
 */
export const createNotice = noticeData => {
	return http.post('/notices', noticeData);
};

/**
 * 특정 ID의 공지사항을 수정합니다. (관리자용)
 * @param {number | string} id - 공지사항 ID
 * @param {{ title: string, category: 'IMPORTANT' | 'NORMAL' | 'UPDATE', content: string }} noticeData
 * @returns {Promise<{success: boolean, message: string, data: null}>}
 */
export const updateNotice = (id, noticeData) => {
	return http.put(`/notices/${id}`, noticeData);
};

/**
 * 특정 ID의 공지사항을 삭제합니다. (관리자용)
 * @param {number | string} id - 공지사항 ID
 * @returns {Promise<{success: boolean, message: string, data: null}>}
 */
export const deleteNotice = id => {
	return http.delete(`/notices/${id}`);
};
