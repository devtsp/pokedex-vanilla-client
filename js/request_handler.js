const cacheName = 'v1';

const handleMatch = (request, match, cache, callback) => {
	if (!match) {
		// console.log('Not in cache: ', request);
		fetch(request)
			.then(response => {
				// console.log(response);
				if (response.ok) {
					cache.put(request, response.clone());
					return response.json();
				}
				throw new Error('Response not ok:', response);
			})
			.then(response => {
				callback(response);
			})
			.catch(err => console.log(err));
	} else {
		// console.log('Found in cache: ', match.url);
		cache
			.match(request)
			.then(response => {
				// console.log(response);
				return response.json();
			})
			.then(response => callback(response));
	}
};

const handleRequest = (request, callback) => {
	caches.open(cacheName).then(cache => {
		cache
			.match(request)
			.then(match => handleMatch(request, match, cache, callback));
	});
};
