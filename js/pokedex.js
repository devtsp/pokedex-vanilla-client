import { handleCacheVersion } from './cache/cache.js';
import { handlePagination } from './pagination.js';
import { handleSearch } from './pokemon.js';
import { renderPage } from './UI/render_page.js';
import { renderFullPokemon, resetInfoCard } from './UI/render_full_pokemon.js';
import {
	setPaginationEvents,
	setSearchEvent,
	setRandomPokemonEvent,
	setMiniatureEvent,
	setEvolutionEvents,
	setClickConfig,
} from './events.js';

export const initApp = () => {
	handleCacheVersion();
	setPaginationEvents(handlePagination, renderPage);
	setSearchEvent(handleSearch, renderFullPokemon);
	setRandomPokemonEvent(handleSearch, renderFullPokemon);
	setMiniatureEvent(handleSearch, renderFullPokemon);
	setEvolutionEvents(handleSearch, renderFullPokemon);
	setClickConfig(resetInfoCard);
	handlePagination(renderPage);
};
