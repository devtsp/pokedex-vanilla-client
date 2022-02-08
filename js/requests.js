import { resetErrorMsg, handleError } from './errors.js';

export const handleRequest = async (request, callback) => {
	const cache = await caches.open(localStorage.getItem('cache-version'));
	const match = await cache.match(request);
	if (!match) {
		try {
			const response = await fetch(request);
			if (response.ok) {
				resetErrorMsg();
				cache.put(request, response.clone());
				callback(await response.json());
			} else {
				handleError(response.status);
			}
		} catch (err) {
			handleError(err);
		}
	} else {
		resetErrorMsg();
		const response = await cache.match(request);
		callback(await response.json());
	}
};
