import { querySelector } from './UI/utils.js';
import { resetErrorMsg } from './UI/errors.js';
import { resetInfoCard } from './UI/render_full_pokemon.js';

export const setPaginationEvents = handlerCallback => {
	querySelector('#previous-page').onclick = async e => {
		const direction = e.target.parentNode.dataset.direction;
		resetErrorMsg();
		handlerCallback(direction);
	};

	querySelector('#next-page').onclick = async e => {
		const direction = e.target.parentNode.dataset.direction;
		resetErrorMsg();
		handlerCallback(direction);
	};
};

export const setSearchEvent = handlerCallback => {
	querySelector('#main-nav form').onsubmit = async e => {
		const search = e.target.search.value.toLowerCase().trim();
		e.preventDefault();
		resetErrorMsg();
		handlerCallback(search);
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

export const setRandomPokemonEvent = handlerCallback => {
	querySelector('#random-pokemon').onclick = async e => {
		resetErrorMsg();
		handlerCallback();
	};
};

export const setMiniatureEvent = handlerCallback => {
	querySelector('#index').onclick = async e => {
		if (e.target.classList.contains('poke-card')) {
			const clicked = e.target.id;
			resetErrorMsg();
			handlerCallback(clicked);
		}
	};
};

export const setEvolutionEvents = handlerCallback => {
	querySelector('#evolves-from').onclick = async e => {
		const clicked = e.target.innerText;
		handlerCallback(clicked);
	};

	querySelector('#evolves-to').onclick = async e => {
		const clicked = e.target.innerText;
		handlerCallback(clicked);
	};
};
