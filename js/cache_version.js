export const checkCacheVersion = () => {
	if (!localStorage.getItem('cache-version')) {
		const date = Date.now();
		console.log(date);
		localStorage.setItem('cache-version', date);
	} else {
		if (localStorage.getItem('cache-version') <= Date.now() - 86400000) {
			caches.delete(localStorage.getItem('cache-version'));
			localStorage.removeItem('cache-version');
			const date = Date.now();
			console.log(date);
			localStorage.setItem('cache-version', date);
		}
	}
};
