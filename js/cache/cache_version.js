export const handleCacheVersion = localStorage => {
	const key = 'pokedex-cache-version';
	const actualDate = Date.now();
	const dayInMs = 86400000;
	const alreadyStoredCacheVersion = localStorage.getItem(key);
	const isFresh = +alreadyStoredCacheVersion + dayInMs > actualDate;
	!alreadyStoredCacheVersion && localStorage.setItem(key, actualDate);
	if (!isFresh) {
		caches.delete(alreadyStoredCacheVersion);
		localStorage.setItem(key, actualDate);
	}
	return localStorage;
};
