import { checkOnCache, getFromCache, storeToCache } from '../cache/cache.js';

export const routeRequest = async request => {
	const existsOnCache = await checkOnCache(request);
	if (existsOnCache) {
		const response = await getFromCache(request);
		return response.json();
	} else {
		const response = await fetch(request);
		if (!response.ok) {
			throw Error(response.status);
		}
		storeToCache(request, response.clone());
		return response.json();
	}
};
