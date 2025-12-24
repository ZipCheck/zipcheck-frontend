import http from './http';

/**
 * 감정지도용 스티커 데이터를 조회합니다.
 * @param {Object} params
 * @param {number} params.minLatitude
 * @param {number} params.maxLatitude
 * @param {number} params.minLongitude
 * @param {number} params.maxLongitude
 * @param {number} [params.zoomLevel]
 * @returns {Promise<{ success: boolean, data: Array }>}
 */
export const getStickerMap = params => {
	return http.get('/api/stickers/map', { params });
};

/**
 * 특정 아파트의 스티커 목록을 조회합니다.
 * @param {string | number} aptId 아파트 ID
 * @returns {Promise<Array>}
 */
export const getStickersByAptId = aptId => {
	return http.get(`/api/stickers`, { params: { aptId } });
};