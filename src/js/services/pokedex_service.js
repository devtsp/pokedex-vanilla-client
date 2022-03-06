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
	let pokemonStored;
	try {
		pokemonStored = getPokemonFromStorage(pokemonNameOrId);
	} catch (error) {
		pokemonStored = null;
	}
	let pokemon;
	if (!pokemonStored) {
		const pokemon_info = await fetchPokemon(pokemonNameOrId);
		const pokemon_species = await fetchPokemonSpecie(pokemonNameOrId);
		const evolutionEndpoint = pokemon_species.evolution_chain.url;
		const evolution_chain = await fetchEvolutionChain(evolutionEndpoint);
		pokemon = mapPokemon(pokemon_info, pokemon_species, evolution_chain);
		savePokemonToStorage(pokemon);
	} else {
		pokemon = pokemonStored;
	}
	return pokemon;
};

export const getPage = async (pageNumber, numberOfPokemons) => {
	let pageStored;
	try {
		pageStored = getPageFromStorage(pageNumber);
	} catch (error) {
		pageStored = null;
	}
	let page;
	if (!pageStored) {
		const pagination = await fetchPage(pageNumber, numberOfPokemons);
		page = mapPage(pageNumber, pagination);
		savePageToStorage(page);
	} else {
		page = pageStored;
	}
	return page;
};
