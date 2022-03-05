import { routeRequest } from '../services/route_request.js';

const API_URL = 'https://pokeapi.co/api/v2';

const buildPageRequest = (pageNumber = 0) => {
	const offset = pageNumber * 33;
	return `${API_URL}/pokemon?offset=${offset}&limit=33`;
};

export const fetchPage = async pageNumber => {
	const paginationUrl = buildPageRequest(pageNumber);
	const paginationResponse = await routeRequest(paginationUrl);
	return paginationResponse;
};

export const fetchPokemon = pokemonNameOrId => {
	return routeRequest(`${API_URL}/pokemon/${pokemonNameOrId}`);
};

export const fetchPokemonSpecie = pokemonNameOrId => {
	return routeRequest(`${API_URL}/pokemon-species/${pokemonNameOrId}`);
};

export const fetchEvolutionChain = specie_url => {
	return routeRequest(specie_url);
};
