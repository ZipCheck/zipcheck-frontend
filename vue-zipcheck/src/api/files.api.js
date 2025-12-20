import http from './http';

/**
 * Uploads a profile image file.
 * @param {File} file The image file to upload.
 * @returns {Promise<{profileImageUrl: string}>} A promise that resolves with the URL of the uploaded image.
 */
export const uploadProfileImage = file => {
	const formData = new FormData();
	formData.append('file', file);

	return http
		.post('/files/profile', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
		.then(response => response.data);
};
