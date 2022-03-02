import { fetchPokemonInfo } from './api/fetch_pokemon.js';
import { mapPokemon } from './mapppers/pokemon_mapper.js';

export const handleSearch = async search => {
	const { pokemon, pokemon_species, evolution_chain } = await fetchPokemonInfo(
		search
	);
	const pokemonAll = mapPokemon(pokemon, pokemon_species, evolution_chain);
	console.log(pokemonAll);
	// setInfoCard(pokemonAll);
};
