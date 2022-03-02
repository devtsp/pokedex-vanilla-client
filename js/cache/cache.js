const keyToCacheName = 'pokedex-cache-version';
const cacheName = localStorage.getItem(keyToCacheName);

export const routeRequest = async (request, handleError) => {
	const cache = await caches.open(cacheName);
	const existsOnCache = await checkRequestOnCache(request);
	let data;
	if (existsOnCache) {
		const response = await cache.match(request);
		data = response.json();
	} else {
		try {
			const response = await fetch(request);
			if (!response.ok) {
				throw Error(response.status);
			}
			cache.put(request, response.clone());
			data = response.json();
		} catch (error) {
			handleError(error);
		}
	}
	return data;
};

const checkRequestOnCache = async request => {
	const cache = await caches.open(cacheName);
	return cache.match(request);
};

const checkCacheFreshness = () => {
	const dayInMs = 86400000;
	return Number(cacheName) + dayInMs > Date.now();
};

const refreshCache = () => {
	caches.delete(cacheName);
	localStorage.setItem(keyToCacheName, Date.now());
};

export const handleCacheVersion = () => {
	const isFresh = checkCacheFreshness();
	if (!isFresh) {
		refreshCache();
	}
};
