if (!localStorage.getItem('cache-version')) {
	localStorage.setItem('cache-version', Date.now());
} else {
	if (localStorage.getItem('cache-version') <= Date.now() - 86400000) {
		caches.delete(localStorage.getItem('cache-version'));
		localStorage.removeItem('cache-version');
		localStorage.setItem('cache-version', Date.now());
	}
}

const handleError = err => {
	if (err == 404) {
		getElement('#error-msg').innerText = 'Pokemon not found.';
	}
};

const handleMatch = (request, match, cache, callback) => {
	if (!match) {
		fetch(request)
			.then(response => {
				if (response.ok) {
					getElement('#error-msg').innerText = '';
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
		getElement('#error-msg').innerText = '';
		cache
			.match(request)
			.then(response => {
				return response.json();
			})
			.then(response => callback(response));
	}
};

const handleRequest = (request, callback) => {
	caches.open(localStorage.getItem('cache-version')).then(cache => {
		cache
			.match(request)
			.then(match => handleMatch(request, match, cache, callback));
	});
};
