import { handleCacheVersion } from './storage/storage.js';
import { getPage, getPokemon } from './services/pokedex_service.js';
import { renderPage } from './ui/render_page.js';
import { renderPokemon, resetPokemon } from './ui/render_pokemon.js';
import { renderError, resetError, toggleLoading } from './ui/render_utils.js';
import { setPaginationHandlers, setPokemonHandlers } from './ui/handlers.js';

const showPage = async destinationPage => {
	resetError();
	const POKEMONS_PER_PAGE = 33;
	try {
		const page = await getPage(destinationPage, POKEMONS_PER_PAGE);
		renderPage(page);
	} catch (error) {
		renderError(error);
	}
};

const showPokemon = async pokemonNameOrId => {
	resetError();
	toggleLoading();
	try {
		const pokemon = await getPokemon(pokemonNameOrId);
		renderPokemon(pokemon);
	} catch (error) {
		renderError(error);
	} finally {
		toggleLoading();
	}
};

export const initPokedex = () => {
	handleCacheVersion();
	setPaginationHandlers(showPage);
	setPokemonHandlers(showPokemon, resetPokemon);
	showPage(0);
};
