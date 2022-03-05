import { handleCacheVersion } from './cache/cache.js';
import { handlePagination, handlePokemon } from './pokedex_helpers.js';

export const initApp = () => {
	handleCacheVersion();

	document.querySelector('#previous-page').onclick = async e => {
		handlePagination(e);
	};

	document.querySelector('#next-page').onclick = async e => {
		handlePagination(e);
	};

	document.querySelector('#main-nav form').onsubmit = async e => {
		const search = e.target.search.value.toLowerCase().trim();
		e.preventDefault();
		handlePokemon(search);
	};

	document.querySelector('#pokemon-info').onclick = e => e.stopPropagation();

	document.querySelector('#close-info').onclick = e => handlePokemon(false);

	document.querySelector('body').onclick = e => {
		if (
			e.target !== document.querySelector('#pokemon-info') &&
			!e.target.classList.contains('poke-card') &&
			!document
				.querySelector('#pokemon-info')
				.classList.contains('visually-hidden')
		) {
			handlePokemon(false);
		}
	};

	document.querySelector('#random-pokemon').onclick = async e => {
		handlePokemon();
	};

	document.querySelector('#index').onclick = async e => {
		if (e.target.classList.contains('poke-card')) {
			const clicked = e.target.id;
			handlePokemon(clicked);
		}
	};

	document.querySelector('#evolves-from').onclick = async e => {
		const clicked = e.target.innerText;
		handlePokemon(clicked);
	};

	document.querySelector('#evolves-to').onclick = async e => {
		const clicked = e.target.innerText;
		handlePokemon(clicked);
	};

	document.querySelector('#next-page i').click();
};
