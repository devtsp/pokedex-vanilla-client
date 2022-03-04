import { routeRequest } from '../services/route_request.js';

const buildPageRequest = (pageNumber = 0) => {
	const offset = pageNumber * 42;
	return `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=42`;
};

export const fetchPage = async pageNumber => {
	const paginationUrl = buildPageRequest(pageNumber);
	const paginationResponse = await routeRequest(paginationUrl);
	return paginationResponse;
};
