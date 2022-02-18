export const handleCacheVersion = localStorage => {
	const cacheName = 'pokedex-cache-version';
	const actualDate = Date.now();
	const alreadyStoredCacheVersion = localStorage.getItem(cacheName);
	const dayInMs = 86400000;
	const isFresh = alreadyStoredCacheVersion + dayInMs > actualDate;
	if (!alreadyStoredCacheVersion) {
		localStorage.setItem(cacheName, actualDate);
		return localStorage;
	}
	if (!isFresh) {
		localStorage.removeItem(cacheName);
		localStorage.setItem(cacheName, actualDate);
	}
	return localStorage;
};
