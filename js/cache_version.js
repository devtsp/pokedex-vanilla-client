if (!localStorage.getItem('cache-version')) {
	localStorage.setItem('cache-version', Date.now());
} else {
	if (localStorage.getItem('cache-version') <= Date.now() - 86400000) {
		caches.delete(localStorage.getItem('cache-version'));
		localStorage.removeItem('cache-version');
		localStorage.setItem('cache-version', Date.now());
	}
}
