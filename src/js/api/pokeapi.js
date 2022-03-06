const API_URL = 'https://pokeapi.co/api/v2';

export const fetchPage = async (pageNumber, numberOfPokemons) => {
	const offset = numberOfPokemons * pageNumber;
	const paginationUrl = `${API_URL}/pokemon?offset=${offset}&limit=${numberOfPokemons}`;
	return await fetchApi(paginationUrl);
};

export const fetchPokemon = async pokemonNameOrId => {
	return await fetchApi(`${API_URL}/pokemon/${pokemonNameOrId}`);
};

export const fetchPokemonSpecie = async pokemonNameOrId => {
	return await fetchApi(`${API_URL}/pokemon-species/${pokemonNameOrId}`);
};

export const fetchEvolutionChain = async evolution_endpoint => {
	return await fetchApi(evolution_endpoint);
};

const fetchApi = async request => {
	const response = await fetch(request);
	if (!response.ok) {
		throw Error(response.status);
	}
	return response.json();
};
