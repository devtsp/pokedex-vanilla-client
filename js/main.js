import { routeRequest, handleCacheVersion } from './cache/cache.js';
import { setEventHandlers } from './UI/event_handlers.js';
import { handleError } from './UI/errors.js';

const setInitialCards = async () => {
	const FIRST_PAGE = 'https://pokeapi.co/api/v2/pokemon?limit=12';
	const { results } = await routeRequest(FIRST_PAGE, handleError);
	const pokemons = await Promise.all(
		results.map(async result => {
			return await routeRequest(result.url);
		})
	);
	console.log(results);
	console.log(pokemons);
};

const initApp = () => {
	handleCacheVersion();
	setInitialCards();
	setEventHandlers();
};

window.addEventListener('DOMContentLoaded', () => {
	initApp();
});
