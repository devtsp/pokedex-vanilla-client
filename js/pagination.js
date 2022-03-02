import { routeRequest } from './cache/cache.js';
import { handleError } from './UI/errors.js';
import { mapMiniature } from './mapppers/miniature_mapper.js';
import { mapPage } from './mapppers/page_mapper.js';
import { renderPage } from './UI/render_page.js';

const API_URL = 'https://pokeapi.co/api/v2/';

export const handlePagination = async (
	pageOrder = API_URL + 'pokemon?offset=0&limit=12'
) => {
	const pagination = await routeRequest(pageOrder, handleError);
	const pokemons = await Promise.all(
		pagination.results.map(async result => {
			return await routeRequest(result.url);
		})
	);
	const page = mapPage(pagination);
	const miniatures = pokemons.map(pokemon => mapMiniature(pokemon));
	renderPage(page, miniatures);
};
