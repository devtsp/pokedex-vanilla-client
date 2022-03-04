import { handleCacheVersion } from './cache/cache.js';
import { handlePagination } from './services/handle_pagination.js';
import { handleSearch } from './services/handle_search.js';
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
	setSearchHandler(handleSearch, renderFullPokemon);
	setIndexHandler(handleSearch, renderFullPokemon);
	setRandomPokemonHandler(handleSearch, renderFullPokemon);
	setEvolutionHandlers(handleSearch, renderFullPokemon);
	setCloseInfoHandlers(resetInfoCard);
	handlePagination(renderPage);
};
