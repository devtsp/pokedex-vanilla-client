import {
	getPokemonFromStorage,
	savePokemonToStorage,
	getPageFromStorage,
	savePageToStorage,
} from '../storage/storage.js';

import {
	fetchPokemon,
	fetchPokemonSpecie,
	fetchEvolutionChain,
	fetchPage,
} from '../api/pokeapi.js';

import { mapPokemon } from '../mappers/pokemon_mapper.js';
import { mapPage } from '../mappers/page_mapper.js';

export const getPokemon = async pokemonNameOrId => {
	const pokemonStored = getPokemonFromStorage(pokemonNameOrId);
	if (!pokemonStored) {
		const pokemon_info = await fetchPokemon(pokemonNameOrId);
		const pokemon_species = await fetchPokemonSpecie(pokemonNameOrId);
		const evolutionEndpoint = pokemon_species.evolution_chain.url;
		const evolution_chain = await fetchEvolutionChain(evolutionEndpoint);
		const pokemon = mapPokemon(pokemon_info, pokemon_species, evolution_chain);
		savePokemonToStorage(pokemon);
	}
};

export const getPage = async (pageNumber, numberOfPokemons) => {
	const pageStored = getPageFromStorage(pageNumber, numberOfPokemons);
	if (!pageStored) {
		const pageContents = await fetchPage(pokemonNameOrId);
		const page = mapPage(pageNumber, pageContents);
		savePageToStorage(page);
	}
};
