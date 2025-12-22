import http from './http';

/**
 * 시/도 목록을 조회합니다.
 * @returns {Promise<string[]>}
 */
export const getSido = () => {
	return http.get('/zipcheck/map/sido');
};

/**
 * 구/군 목록을 조회합니다.
 * @param {string} sido 시/도 이름
 * @returns {Promise<string[]>}
 */
export const getGugun = sido => {
	return http.get('/zipcheck/map/gugun', { params: { sido } });
};

/**
 * 동 목록을 조회합니다.
 * @param {string} sido 시/도 이름
 * @param {string} gugun 구/군 이름
 * @returns {Promise<string[]>}
 */
export const getDong = (sido, gugun) => {
	return http.get('/zipcheck/map/dong', { params: { sido, gugun } });
};

/**
 * 매물을 검색합니다.
 * @param {Object} params 검색 필터
 * @param {string} [params.sidoName] 시/도 이름
 * @param {string} [params.gugunName] 구/군 이름
 * @param {number} [params.dongName] 동 이름
 * @param {string} [params.aptName] 아파트 이름
 * @param {number} [params.minArea] 최소 전용면적
 * @param {number} [params.maxArea] 최대 전용면적
 * @param {number} [params.minPrice] 최소 거래금액
 * @param {number} [params.maxPrice] 최대 거래금액
 * @param {number} [params.page] 페이지 번호
 * @param {number} [params.size] 페이지 크기
 * @returns {Promise<Array<{
 *   no: number,
 *   aptSeq: string,
 *   aptDong: string,
 *   floor: string,
 *   dealYear: number,
 *   dealMonth: number,
 *   dealDay: number,
 *   excluUseAr: number,
 *   dealAmount: string,
 *   aptName: string,
 *   jibun: string,
 *   roadNm: string,
 *   buildYear: string,
 *   latitude: string,
 *   longitude: string
 * }>>}
 */
export const searchProperties = params => {
	return http.post('/zipcheck/map/search', params);
};

/**
 * 매물 상세 정보를 조회합니다.
 * @param {number} id 매물 번호 (no)
 * @returns {Promise<Object>}
 */
export const getPropertyDetail = id => {
	return http.get(`/zipcheck/map/${id}`);
};

/**
 * 특정 아파트의 상세 매물 목록을 조회합니다.
 * @param {string} aptSeq 아파트 고유 식별자
 * @param {number} page 페이지 번호
 * @param {number} size 페이지 크기
 * @returns {Promise<Object>}
 */
export const getApartmentDeals = (aptSeq, page = 1, size = 20) => {
    return http.get(`/zipcheck/map/apartment/${aptSeq}/deals`, {
        params: { page, size }
    });
};

/**
 * 특정 매물의 AI 요약 정보를 조회합니다.
 * @param {number} dealId 매물 고유 번호 (getPropertyDetail의 no와 동일)
 * @returns {Promise<{ answer: string, score: number }>}
 */
export const getAiSummary = async (dealId) => {
    try {
        // 백엔드 응답이 { status, message, data: { answer, score } } 형태이므로 data.data를 반환
        const response = await http.get(`/api/ai/deals/${dealId}/summary`);
        return response.data; // 여기서 response.data는 백엔드의 { "answer": ..., "score": ... }
    } catch (error) {
        console.error('Failed to fetch AI summary:', error);
        throw error; // 에러를 다시 던져서 호출하는 쪽에서 처리할 수 있도록 함
    }
};

/**
 * 아파트 단지 AI 요약 정보를 조회합니다.
 * @param {string} aptSeq 아파트 고유 식별자
 * @returns {Promise<{ answer: string, score: number }>}
 */
export const getApartmentAiSummary = async (aptSeq) => {
    try {
        const response = await http.get(`/api/ai/apartments/${aptSeq}/summary`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch Apartment AI summary:', error);
        throw error;
    }
};