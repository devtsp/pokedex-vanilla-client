import { routeRequest } from './cache/cache.js';
import { handleError } from './UI/errors.js';

const API_URL = 'https://pokeapi.co/api/v2/';

export const fetchPagination = async (
	pageOrder = API_URL + 'pokemon?offset=0&limit=12'
) => {
	const pagination = await routeRequest(pageOrder, handleError);
	const pokemons = await Promise.all(
		pagination.results.map(async result => {
			return await routeRequest(result.url);
		})
	);
	return { pagination, pokemons };
};
