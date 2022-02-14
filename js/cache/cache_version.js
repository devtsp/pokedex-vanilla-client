/* istanbul ignore next */
export const checkCacheVersion = () => {
	const date = Date.now();
	if (!localStorage.getItem('cache-version')) {
		localStorage.setItem('cache-version', date);
	} else {
		if (localStorage.getItem('cache-version') <= date - 86400000) {
			caches.delete(localStorage.getItem('cache-version'));
			localStorage.removeItem('cache-version');
			localStorage.setItem('cache-version', date);
		}
	}
};
