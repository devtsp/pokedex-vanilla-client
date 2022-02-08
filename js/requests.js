import { resetErrorMsg, handleError } from './errors.js';

export const handleRequest = async (request, callback) => {
	const cache = await caches.open(localStorage.getItem('cache-version'));
	const match = await cache.match(request);
	if (!match) {
		const response = await fetch(request);
		if (response.ok) {
			resetErrorMsg();
			cache.put(request, response.clone());
			const data = await response.json();
			callback(data);
		} else {
			handleError(response.status);
		}
	} else {
		resetErrorMsg();
		const response = await cache.match(request);
		const data = await response.json();
		callback(data);
	}
};
