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
