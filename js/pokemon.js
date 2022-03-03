import { mapPokemon } from './mapppers/pokemon_mapper.js';
import { resetInfoCard, renderFullPokemon } from './UI/render_full_pokemon.js';
import { handleError } from './UI/errors.js';
import { handleRequest } from './services/requests.js';

const getRandomPokemonIndex = () => {
	return Math.ceil(Math.random() * 898);
};

const fetchPokemon = pokemonNameOrId => {
	return handleRequest(`${API_URL}/pokemon/${pokemonNameOrId}`, handleError);
};

const fetchPokemonSpecie = pokemonNameOrId => {
	return handleRequest(
		`${API_URL}/pokemon-species/${pokemonNameOrId}`,
		handleError
	);
};

const fetchEvolutionChain = specie_url => {
	return handleRequest(specie_url, handleError);
};

const fetchPokemonInfo = async pokemonNameOrId => {
	const pokemon = await fetchPokemon(pokemonNameOrId);
	const pokemon_species = await fetchPokemonSpecie(pokemonNameOrId);
	const urlToEvolutionChain = pokemon_species.evolution_chain.url;
	const evolution_chain = await fetchEvolutionChain(urlToEvolutionChain);
	const allInfo = { pokemon, pokemon_species, evolution_chain };
	return allInfo;
};

export const handleSearch = async (search = getRandomPokemonIndex()) => {
	resetInfoCard();
	const { pokemon, pokemon_species, evolution_chain } = await fetchPokemonInfo(
		search
	);
	const pokemonAll = mapPokemon(pokemon, pokemon_species, evolution_chain);
	renderFullPokemon(pokemonAll);
};
