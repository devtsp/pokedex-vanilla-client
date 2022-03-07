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
	try {
		return getPokemonFromStorage(pokemonNameOrId);
	} catch (error) {
		const pokemon_info = await fetchPokemon(pokemonNameOrId);
		const pokemon_species = await fetchPokemonSpecie(pokemonNameOrId);
		const evolutionEndpoint = pokemon_species.evolution_chain.url;
		const evolution_chain = await fetchEvolutionChain(evolutionEndpoint);
		const pokemon = mapPokemon(pokemon_info, pokemon_species, evolution_chain);
		console.log(pokemon);
		savePokemonToStorage(pokemon);
		return pokemon;
	}
};

export const getPage = async (pageNumber, numberOfPokemons) => {
	try {
		return getPageFromStorage(pageNumber);
	} catch (error) {
		const pagination = await fetchPage(pageNumber, numberOfPokemons);
		const page = mapPage(pageNumber, pagination);
		savePageToStorage(page);
		return page;
	}
};
