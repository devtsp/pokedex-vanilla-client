import { handleCacheVersion } from './storage/storage.js';
import { getPage, getPokemon } from './services/pokedex_service.js';
import { renderPage } from './ui/render_page.js';
import { renderPokemon, resetPokemon } from './ui/render_pokemon.js';
import { renderError, resetError, toggleLoading } from './ui/render_utils.js';
import { setPaginationHandlers, setPokemonHandlers } from './ui/handlers.js';

const showPage = async targetPage => {
	resetError();
	const POKEMONS_PER_PAGE = 33;
	switch (targetPage) {
		case -1:
			targetPage = 25;
			break;
		case 26:
			targetPage = 0;
	}
	try {
		const page = await getPage(targetPage, POKEMONS_PER_PAGE);
		renderPage(page);
		return page;
	} catch (error) {
		renderError(error);
		return error;
	}
};

const showPokemon = async pokemonNameOrId => {
	resetError();
	toggleLoading();
	try {
		const pokemon = await getPokemon(pokemonNameOrId);
		renderPokemon(pokemon);
		return pokemon;
	} catch (error) {
		renderError(error);
		return error;
	} finally {
		toggleLoading();
	}
};

export const initPokedex = async () => {
	handleCacheVersion();
	setPaginationHandlers(showPage);
	setPokemonHandlers(showPokemon, resetPokemon);
	return showPage(0);
};
