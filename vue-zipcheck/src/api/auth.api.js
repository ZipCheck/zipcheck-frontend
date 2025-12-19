import http from './http';

/**
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<{accessToken: string, refreshToken:string}>}
 */
export const login = credentials => {
	return http.post('/auth/login', credentials).then(response => response.data);
};

export const logout = () => {
	return http.post('/auth/logout');
};

/**
 * @param {object} signupData
 * @returns {Promise<any>}
 */
export const signup = signupData => {
	return http.post('/auth/signup', signupData);
};

/**
 * @param {string} email
 */
export const sendPasswordResetCode = email => {
	return http.post('/auth/password/reset', { email });
};

/**
 * @param {string} email
 * @param {string} authCode
 */
export const resetPassword = (email, code) => {
	return http.post('/auth/password/reset-confirm', { email, code });
};
