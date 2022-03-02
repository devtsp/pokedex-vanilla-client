import { routeRequest } from '../cache/cache.js';
export const API_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemon = pokemon => {
	return routeRequest(`${API_URL}/pokemon/${pokemon}`);
};

const fetchPokemonSpecie = pokemon => {
	return routeRequest(`${API_URL}/pokemon-species/${pokemon}`);
};

const fetchEvolutionChain = specie => {
	return routeRequest(specie.evolution_chain.url);
};

export const fetchPokemonInfo = async pokemon => {
	const info = await fetchPokemon(pokemon);
	const specie = await fetchPokemonSpecie(pokemon);
	const evolutionChain = await fetchEvolutionChain(specie.evolution_chain.url);
	const allInfo = { info, specie, evolutionChain };
	return allInfo;
};
