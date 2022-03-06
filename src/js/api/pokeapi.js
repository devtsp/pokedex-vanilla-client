const API_URL = 'https://pokeapi.co/api/v2';

export const fetchPage = (pageNumber, numberOfPokemons) => {
	const offset = numberOfPokemons * pageNumber;
	const paginationUrl = `${API_URL}/pokemon?offset=${offset}&limit=${numberOfPokemons}`;
	return fetch(paginationUrl);
};

export const fetchPokemon = pokemonNameOrId => {
	return fetch(`${API_URL}/pokemon/${pokemonNameOrId}`);
};

export const fetchPokemonSpecie = pokemonNameOrId => {
	return fetch(`${API_URL}/pokemon-species/${pokemonNameOrId}`);
};

export const fetchEvolutionChain = evolution_endpoint => {
	return fetch(evolution_endpoint);
};
