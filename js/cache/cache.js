const keyToCacheName = 'pokedex-cache-version';
const cacheName = localStorage.getItem(keyToCacheName);

export const routeRequest = async (request, handleError) => {
	const cache = await caches.open(cacheName);
	const existsOnCache = await checkRequestOnCache(request);
	let data;
	if (existsOnCache) {
		data = await getFromCache(request, cache);
	} else {
		try {
			const response = await fetch(request);
			if (!response.ok) {
				throw Error(response.status);
			}
			storeToCache(request, response, cache);
			data = response;
		} catch (error) {
			handleError(error);
		}
	}
	return data.json();
};

const storeToCache = async (request, response, cache) => {
	cache.put(request, response.clone());
};

const getFromCache = async (request, cache) => {
	const response = await cache.match(request);
	return response.json();
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
