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
