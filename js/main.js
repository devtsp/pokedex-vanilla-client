import { routeRequest, handleCacheVersion } from './cache/cache.js';
// import { setEventHandlers } from './UI/event_handlers.js';
import { handleError } from './UI/errors.js';
import { mapMiniature } from './mapppers/miniature_mapper.js';
import { mapPage } from './mapppers/page_mapper.js';
import { renderPage } from './UI/render_page.js';

const API_URL = 'https://pokeapi.co/api/v2/';

const setPage = async (pageOrder = 'pokemon?limit=12') => {
	const pagination = await routeRequest(API_URL + pageOrder, handleError);
	const pokemons = await Promise.all(
		pagination.results.map(async result => {
			return await routeRequest(result.url);
		})
	);
	const page = mapPage(pagination);
	const miniatures = pokemons.map(pokemon => mapMiniature(pokemon));
	// console.log(page);
	// console.log(miniatures);
	// renderPage(page, miniatures);
};

const initApp = () => {
	handleCacheVersion();
	setPage();
	// setEventHandlers();
};

window.addEventListener('DOMContentLoaded', () => {
	initApp();
});
