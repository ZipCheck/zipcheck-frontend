import http from './http';

/**
 * @returns {Promise<{userId: number, email: string, nickname: string}>}
 */
export const getMyInfo = () => {
	return http.get('/users/me').then(response => response.data);
};

export const deleteMyAccount = () => {
	return http.delete('/users/me');
};

/**
 * @param {string} nickname
 */
export const updateNickname = nickname => {
	return http.patch('/users/me/nickname', { nickname });
};

/**
 * @param {string} currentPassword
 * @param {string} newPassword
 */
export const updatePassword = (currentPassword, newPassword) => {
	return http.patch('/users/me/password', { currentPassword, newPassword });
};

/**
 * @param {FormData} formData
 */
export const uploadProfileImage = formData => {
	return http.post('/users/me/profile-image', formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
};

/**
 * @param {{ commentNotifications: boolean, priceChangeNotifications: boolean }} settings
 */
export const updateNotificationSettings = settings => {
	return http.patch('/users/me/notifications', settings);
};
