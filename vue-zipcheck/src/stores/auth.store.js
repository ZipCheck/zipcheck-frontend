import { ref } from 'vue';

const TOKEN_KEY = 'accessToken';

export const user = ref(null);

// Reactive state for authentication
export const isAuthenticated = ref(!!localStorage.getItem(TOKEN_KEY));

export const authStore = {
	/**
	 * @returns {string | null}
	 */
	getToken() {
		return localStorage.getItem(TOKEN_KEY);
	},

	/**
	 * @param {string} token
	 */
	setToken(token) {
		localStorage.setItem(TOKEN_KEY, token);
		isAuthenticated.value = true;
	},

	clearToken() {
		localStorage.removeItem(TOKEN_KEY);
		isAuthenticated.value = false;
		user.value = null; // Also clear the user data
	},
};
