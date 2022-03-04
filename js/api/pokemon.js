import { routeRequest } from '../services/route_request.js';

const API_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemon = pokemonNameOrId => {
	return routeRequest(`${API_URL}/pokemon/${pokemonNameOrId}`);
};

export const fetchPokemonSpecie = pokemonNameOrId => {
	return routeRequest(`${API_URL}/pokemon-species/${pokemonNameOrId}`);
};

export const fetchEvolutionChain = specie_url => {
	return routeRequest(specie_url);
};
