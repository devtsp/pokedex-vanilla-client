const key = 'pokedex-cache-version';

export const checkOnCache = async request => {
	const cacheName = localStorage.getItem(key);
	const cache = await caches.open(cacheName);
	return cache.match(request);
};

export const storeToCache = async (request, clonedResponse) => {
	const cacheName = localStorage.getItem(key);
	const cache = await caches.open(cacheName);
	cache.put(request, clonedResponse);
};

export const getFromCache = async request => {
	const cacheName = localStorage.getItem(key);
	const cache = await caches.open(cacheName);
	return cache.match(request);
};

const checkCacheFreshness = () => {
	const cacheName = localStorage.getItem(key);
	if (!cacheName) {
		localStorage.setItem(key, Date.now());
	}
	const dayInMs = 86400000;
	return Number(cacheName) + dayInMs > Date.now();
};

const refreshCache = () => {
	const cacheName = localStorage.getItem(key);
	caches.delete(cacheName);
	localStorage.setItem(key, Date.now());
};

export const handleCacheVersion = () => {
	const isFresh = checkCacheFreshness();
	if (!isFresh) {
		refreshCache();
	}
};
