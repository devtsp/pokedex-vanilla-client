const cacheName = 'v1';

const handleError = err => {
	// console.log(err);
	if (err == 404) {
		q('#error-msg').innerText = 'Pokemon not found.';
	}
};

const handleMatch = (request, match, cache, callback) => {
	if (!match) {
		// console.log('Not in cache: ', request);
		fetch(request)
			.then(response => {
				// console.log(request);
				// console.log(response.ok);
				// console.log(response.status);
				if (response.ok) {
					// console.log('response ok');
					q('#error-msg').innerText = '';
					cache.put(request, response.clone());
					response.json().then(body => {
						callback(body);
					});
				} else {
					handleError(response.status);
					return response.json();
				}
			})
			.catch(err => console.log(err));
	} else {
		// console.log('Found in cache: ', match.url);
		q('#error-msg').innerText = '';
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
