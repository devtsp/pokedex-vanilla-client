import { querySelector } from './UI/utils.js';
import { resetErrorMsg } from './UI/errors.js';

export const setPaginationEvents = (handlerCallback, renderCallback) => {
	querySelector('#previous-page').onclick = async e => {
		const direction = e.target.parentNode.dataset.direction;
		resetErrorMsg();
		handlerCallback(renderCallback, direction);
	};

	querySelector('#next-page').onclick = async e => {
		const direction = e.target.parentNode.dataset.direction;
		resetErrorMsg();
		handlerCallback(renderCallback, direction);
	};
};

export const setSearchEvent = (handlerCallback, renderCallback) => {
	querySelector('#main-nav form').onsubmit = async e => {
		const search = e.target.search.value.toLowerCase().trim();
		e.preventDefault();
		resetErrorMsg();
		handlerCallback(renderCallback, search);
	};
};

export const setClickConfig = resetInfoCallback => {
	querySelector('#pokemon-info').onclick = e => e.stopPropagation();

	querySelector('#close-info').onclick = e => resetInfoCallback();

	querySelector('body').onclick = e => {
		if (
			e.target !== querySelector('#pokemon-info') &&
			!e.target.classList.contains('poke-card') &&
			!querySelector('#pokemon-info').classList.contains('visually-hidden')
		) {
			resetInfoCallback();
		}
	};
};

export const setRandomPokemonEvent = (handlerCallback, renderCallback) => {
	querySelector('#random-pokemon').onclick = async e => {
		resetErrorMsg();
		handlerCallback(renderCallback);
	};
};

export const setMiniatureEvent = (handlerCallback, renderCallback) => {
	querySelector('#index').onclick = async e => {
		if (e.target.classList.contains('poke-card')) {
			const clicked = e.target.id;
			resetErrorMsg();
			handlerCallback(renderCallback, clicked);
		}
	};
};

export const setEvolutionEvents = (handlerCallback, renderCallback) => {
	querySelector('#evolves-from').onclick = async e => {
		const clicked = e.target.innerText;
		handlerCallback(renderCallback, clicked);
	};

	querySelector('#evolves-to').onclick = async e => {
		const clicked = e.target.innerText;
		handlerCallback(renderCallback, clicked);
	};
};
