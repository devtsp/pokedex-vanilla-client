import { fetchPagination } from './api/fetch_pagination.js';
import { setPaginationEvents } from './event_handlers.js';
import { mapMiniature } from './mapppers/miniature_mapper.js';
import { mapPage } from './mapppers/page_mapper.js';
import { renderPage } from './UI/render_page.js';

const FIRST_PAGE = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=12';

export const handlePagination = async (direction = FIRST_PAGE) => {
	const { pagination, pokemons } = await fetchPagination(direction);
	const page = mapPage(pagination);
	const miniatures = pokemons.map(pokemon => mapMiniature(pokemon));
	renderPage(page, miniatures);
	setPaginationEvents();
};
