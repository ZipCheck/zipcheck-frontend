const TOKEN_KEY = 'accessToken';

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
  },

  clearToken() {
    localStorage.removeItem(TOKEN_KEY);
  },

  /**
   * @returns {boolean}
   */
  isAuthenticated() {
    return !!this.getToken();
  },
};
