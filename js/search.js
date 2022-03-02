import { fetchPokemonInfo } from './api/fetch_pokemon.js';
import { mapPokemon } from './mapppers/pokemon_mapper.js';
import { resetInfoCard } from './UI/info_card.js';
import { renderFullPokemon } from './UI/render_full_pokemon.js';

const getRandomPokemonIndex = () => {
	return Math.ceil(Math.random() * 898);
};

export const handleSearch = async (search = getRandomPokemonIndex()) => {
	resetInfoCard();
	const { pokemon, pokemon_species, evolution_chain } = await fetchPokemonInfo(
		search
	);
	const pokemonAll = mapPokemon(pokemon, pokemon_species, evolution_chain);
	renderFullPokemon(pokemonAll);
};
