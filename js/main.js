import { handleCacheVersion } from './cache/cache.js';
import { setEventHandlers } from './event_handlers.js';
import { handlePagination } from './pagination.js';

const initApp = () => {
	handleCacheVersion();
	handlePagination();
	setEventHandlers();
};

window.addEventListener('DOMContentLoaded', () => {
	initApp();
});
