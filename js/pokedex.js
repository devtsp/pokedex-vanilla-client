import { handleCacheVersion } from './cache/cache.js';
import { handlePagination } from './pagination.js';
import {
	setClickConfig,
	setRandomPokemonEvent,
	setSearchEvent,
	setEvolutionEvents,
	setMiniatureEvent,
	setPaginationEvents,
} from './events.js';
import { renderPage } from './UI/render_page.js';
import { handleSearch } from './pokemon.js';

export const initApp = () => {
	handleCacheVersion();
	setPaginationEvents(handlePagination);
	setSearchEvent(handleSearch);
	setRandomPokemonEvent(handleSearch);
	setMiniatureEvent(handleSearch);
	setEvolutionEvents(handleSearch);
	setClickConfig();
	handlePagination();
};
