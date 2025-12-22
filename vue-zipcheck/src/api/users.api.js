import http from './http';

/**
 * @returns {Promise<{userId: number, email: string, nickname: string, profileImageUrl: string, alarmAgree: boolean, createdAt: string}>}
 */
export const getMyInfo = () => {
	return http.get('/users/me').then(response => response.data);
};

/**
 * @param {FormData} formData
 */
export const updateMyProfileImage = formData => {
	return http.patch('/users/me/profile-image', formData);
};

/**
 * @param {string} nickname
 */
export const updateMyNickname = nickname => {
	return http.patch('/users/me', { nickname });
};

/**
 * @param {string} currentPassword
 * @param {string} newPassword
 */
export const updatePassword = (currentPassword, newPassword) => {
	return http.patch('/users/me/password', { currentPassword, newPassword });
};

/**
 * @param {boolean} agree
 */
export const updateAlarmSettings = agree => {
	return http.patch('/users/me/alarm', { agree });
};

export const deleteMyAccount = () => {
	return http.delete('/users/me');
};

/**
 * 찜한 매물 목록을 조회합니다.
 * @param {number} page 페이지 번호
 * @param {number} size 페이지 크기
 * @returns {Promise<any>}
 */
export const getFavoriteProperties = (page = 1, size = 10) => {
    return http.get('/api/interests', { params: { page, size } });
};

/**
 * 찜한 매물을 해제합니다.
 * @param {number} dealNo 매물 번호
 * @returns {Promise<any>}
 */
export const removeFavoriteProperty = (dealNo) => {
    return http.delete(`/api/interests/${dealNo}`);
};

/**
 * 매물을 찜합니다.
 * @param {number} dealNo 매물 번호
 * @returns {Promise<any>}
 */
export const addFavoriteProperty = (dealNo) => {
    return http.post('/api/interests', { dealNo });
};


