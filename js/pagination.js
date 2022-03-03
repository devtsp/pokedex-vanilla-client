import { mapMiniature } from './mapppers/miniature_mapper.js';
import { mapPage } from './mapppers/page_mapper.js';
import { handleError } from './UI/errors.js';
import { handleRequest } from './services/requests.js';

const API_URL = 'https://pokeapi.co/api/v2/';
const FIRST_PAGE = 'pokemon?offset=0&limit=12';

const fetchPagination = async direction => {
	const pagination = await handleRequest(direction, handleError);
	const pokemons = await Promise.all(
		pagination.results.map(async result => {
			return await handleRequest(result.url, handleError);
		})
	);
	return { pagination, pokemons };
};

export const handlePagination = async (
	renderCallback,
	direction = API_URL + FIRST_PAGE
) => {
	const { pagination, pokemons } = await fetchPagination(direction);
	const page = mapPage(pagination);
	const miniatures = pokemons.map(pokemon => mapMiniature(pokemon));
	renderCallback(page, miniatures);
};
