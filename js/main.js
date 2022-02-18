import { handleCacheVersion } from './cache/cache_version.js';
import { handleRequest } from './cache/requests.js';
import {
	FIRST_PAGE,
	setPaginationState,
	getSprites,
	setAllCards,
} from './UI/pagination.js';
import { setEventHandlers } from './set_event_handlers.js';

const setInitialCards = async () => {
	const paginationObject = await handleRequest(FIRST_PAGE);
	setPaginationState(paginationObject);
	const cardsArray = await getSprites(paginationObject);
	setAllCards(cardsArray);
};

const initApp = () => {
	handleCacheVersion(localStorage);
	setInitialCards();
	setEventHandlers();
};

window.addEventListener('DOMContentLoaded', () => {
	initApp();
});
