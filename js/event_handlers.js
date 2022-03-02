import { querySelector } from './UI/utils.js';
import { resetErrorMsg } from './UI/errors.js';
import { handlePagination } from './pagination.js';
import { handleSearch } from './search.js';
import { resetInfoCard } from './UI/info_card.js';

export const setPaginationEvents = () => {
	querySelector('#previous-page').onclick = async e => {
		const direction = e.target.parentNode.dataset.direction;
		resetErrorMsg();
		handlePagination(direction);
	};

	querySelector('#next-page').onclick = async e => {
		const direction = e.target.parentNode.dataset.direction;
		resetErrorMsg();
		handlePagination(direction);
	};
};

export const setSearchEvent = () => {
	querySelector('#main-nav form').onsubmit = async e => {
		const search = e.target.search.value.toLowerCase().trim();
		e.preventDefault();
		resetErrorMsg();
		handleSearch(search);
	};
};

export const setClickConfig = () => {
	querySelector('#pokemon-info').onclick = e => e.stopPropagation();

	querySelector('#close-info').onclick = e => resetInfoCard();

	querySelector('body').onclick = e => {
		if (
			e.target !== querySelector('#pokemon-info') &&
			!e.target.classList.contains('poke-card') &&
			!querySelector('#pokemon-info').classList.contains('visually-hidden')
		) {
			resetInfoCard();
		}
	};
};

export const setRandomPokemonEvent = () => {
	querySelector('#random-pokemon').onclick = async e => {
		resetErrorMsg();
		handleSearch();
	};
};

export const setMiniatureEvent = () => {
	querySelector('#index').onclick = async e => {
		if (e.target.classList.contains('poke-card')) {
			const clicked = e.target.id;
			resetErrorMsg();
			handleSearch(clicked);
		}
	};
};

export const setEvolutionEvents = () => {
	querySelector('#evolves-from').onclick = async e => {
		const clicked = e.target.innerText;
		handleSearch(clicked);
	};

	querySelector('#evolves-to').onclick = async e => {
		const clicked = e.target.innerText;
		handleSearch(clicked);
	};
};
