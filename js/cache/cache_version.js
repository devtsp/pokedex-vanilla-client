export const checkCacheVersion = () => {
	const cacheName = 'pokedex-cache-version';
	const actualDate = Date.now();
	const actualCache = localStorage.getItem(cacheName);
	if (!actualCache) {
		localStorage.setItem(cacheName, actualDate);
	} else {
		const dayInMs = 86400000;
		const isFresh = actualCache + dayInMs < actualDate;
		if (!isFresh) {
			caches.delete(actualCache);
			localStorage.removeItem(cacheName);
			localStorage.setItem(cacheName, actualDate);
		}
	}
};
