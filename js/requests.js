export const handleRequest = async request => {
	const cache = await caches.open(localStorage.getItem('cache-version'));
	const match = await cache.match(request);
	if (!match) {
		const response = await fetch(request).catch(err => err);
		if (response.ok) {
			cache.put(request, response.clone());
			return response.json();
		}
		return response;
	}
	const response = await cache.match(request);
	return response.json();
};
