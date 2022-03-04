import { fetchPokemonInfo } from '../api/pokemon.js';
import { mapPokemon } from '../mappers/pokemon_mapper.js';
import { resetInfoCard } from '../ui/render_full_pokemon.js';
import { resetErrorMsg } from '../ui/render_errors.js';
import { handleLoading } from '../ui/render_loading.js';

const getRandomPokemonIndex = () => {
	return Math.ceil(Math.random() * 898);
};

export const handleSearch = async (
	renderCallback,
	search = getRandomPokemonIndex()
) => {
	handleLoading();
	resetErrorMsg();
	resetInfoCard();
	const { pokemon, pokemon_species, evolution_chain } = await fetchPokemonInfo(
		search
	);
	const pokemonAll = mapPokemon(pokemon, pokemon_species, evolution_chain);
	renderCallback(pokemonAll);
	handleLoading();
};
