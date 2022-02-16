import { handleError } from '../UI/errors.js';

export const handleRequest = async request => {
	const cache = await caches.open(localStorage.getItem('cache-version'));
	const match = await cache.match(request);
	if (!match) {
		try {
			const response = await fetch(request);
			if (!response.ok) throw Error(response.status);
			cache.put(request, response.clone());
			return response.json();
		} catch (error) {
			handleError(error);
		}
	} else {
		const response = await cache.match(request);
		return response.json();
	}
};
