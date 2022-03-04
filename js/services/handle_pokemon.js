import {
	fetchEvolutionChain,
	fetchPokemon,
	fetchPokemonSpecie,
} from '../api/pokemon.js';
import { mapPokemon } from '../mappers/pokemon_mapper.js';
import { resetInfoCard } from '../ui/render_full_pokemon.js';
import { resetErrorMsg } from '../ui/render_errors.js';
import { handleLoading } from '../ui/render_loading.js';
import { handleError } from '../ui/render_errors.js';

const getRndmPokeId = () => {
	return Math.ceil(Math.random() * 898);
};

export const handlePokemon = async (renderCB, search = getRndmPokeId()) => {
	handleLoading();
	resetErrorMsg();
	resetInfoCard();
	try {
		const pokemon = await fetchPokemon(search);
		const pokemon_species = await fetchPokemonSpecie(search);
		const evolution_chain = await fetchEvolutionChain(
			pokemon_species.evolution_chain.url
		);
		const pokemonAll = mapPokemon(pokemon, pokemon_species, evolution_chain);
		renderCB(pokemonAll);
	} catch (error) {
		handleError(error);
		return;
	} finally {
		handleLoading();
	}
};
