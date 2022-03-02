import { handleCacheVersion } from './cache/cache.js';
import { handlePagination } from './pagination.js';
import { setSearchEvent } from './event_handlers.js';

const initApp = () => {
	handleCacheVersion();
	handlePagination();
	setSearchEvent();
};

window.addEventListener('DOMContentLoaded', () => {
	initApp();
});
