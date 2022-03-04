import { handleCacheVersion } from './cache/cache.js';
import { handlePagination } from './services/handle_pagination.js';
import { handlePokemon } from './services/handle_pokemon.js';
import { renderPage } from './ui/render_page.js';
import { renderFullPokemon, resetInfoCard } from './ui/render_full_pokemon.js';
import {
	setPaginationHandlers,
	setSearchHandler,
	setIndexHandler,
	setRandomPokemonHandler,
	setEvolutionHandlers,
	setCloseInfoHandlers,
} from './ui/set_handlers.js';

export const initApp = () => {
	handleCacheVersion();
	setPaginationHandlers(handlePagination, renderPage);
	setSearchHandler(handlePokemon, renderFullPokemon);
	setIndexHandler(handlePokemon, renderFullPokemon);
	setRandomPokemonHandler(handlePokemon, renderFullPokemon);
	setEvolutionHandlers(handlePokemon, renderFullPokemon);
	setCloseInfoHandlers(resetInfoCard);
	handlePagination(renderPage);
};
