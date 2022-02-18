import { handleError } from '../UI/errors.js';

/* istanbul ignore next */
export const handleRequest = async request => {
	const freshCacheName = localStorage.getItem('pokedex-cache-version');
	const cacheObject = await caches.open(freshCacheName);
	const matchedRequest = await cacheObject.match(request);
	if (!matchedRequest) {
		try {
			const response = await fetch(request);
			if (!response.ok) throw Error(response.status);
			cacheObject.put(request, response.clone());
			return response.json();
		} catch (error) {
			handleError(error);
		}
	} else {
		const response = await cacheObject.match(request);
		return response.json();
	}
};
