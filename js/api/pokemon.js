import { routeRequest } from '../services/route_request.js';

const API_URL = 'https://pokeapi.co/api/v2';

const fetchPokemon = pokemonNameOrId => {
	return routeRequest(`${API_URL}/pokemon/${pokemonNameOrId}`);
};

const fetchPokemonSpecie = pokemonNameOrId => {
	return routeRequest(`${API_URL}/pokemon-species/${pokemonNameOrId}`);
};

const fetchEvolutionChain = specie_url => {
	return routeRequest(specie_url);
};

export const fetchPokemonInfo = async pokemonNameOrId => {
	const pokemon = await fetchPokemon(pokemonNameOrId);
	const pokemon_species = await fetchPokemonSpecie(pokemonNameOrId);
	const urlToEvolutionChain = pokemon_species?.evolution_chain?.url;
	const evolution_chain = await fetchEvolutionChain(urlToEvolutionChain);
	const allInfo = { pokemon, pokemon_species, evolution_chain };
	return allInfo;
};
