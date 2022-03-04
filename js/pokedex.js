import { handleCacheVersion } from './cache/cache.js';
import { handlePagination } from './ui/handle_pagination.js';
import { handleSearch } from './ui/handle_search.js';
import { renderPage } from './ui/render_page.js';
import { renderFullPokemon, resetInfoCard } from './ui/render_full_pokemon.js';
import {
	setPaginationHandlers,
	setSearchHandler,
	setRandomPokemonHandler,
	setMiniatureHandler,
	setEvolutionHandlers,
	setCloseInfoHandlers,
} from './ui/set_handlers.js';

export const initApp = () => {
	handleCacheVersion();
	setPaginationHandlers(handlePagination, renderPage);
	setSearchHandler(handleSearch, renderFullPokemon);
	setRandomPokemonHandler(handleSearch, renderFullPokemon);
	setMiniatureHandler(handleSearch, renderFullPokemon);
	setEvolutionHandlers(handleSearch, renderFullPokemon);
	setCloseInfoHandlers(resetInfoCard);
	handlePagination(renderPage);
};
