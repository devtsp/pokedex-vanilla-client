import { handleCacheVersion } from './cache/cache.js';
import { handlePagination } from './pagination.js';
import {
	setClickConfig,
	setRandomPokemonEvent,
	setSearchEvent,
	setEvolutionEvents,
	setMiniatureEvent,
} from './event_handlers.js';

const initApp = () => {
	handleCacheVersion();
	handlePagination();
	setSearchEvent();
	setRandomPokemonEvent();
	setMiniatureEvent();
	setClickConfig();
	setEvolutionEvents();
};

window.addEventListener('DOMContentLoaded', () => {
	initApp();
});
