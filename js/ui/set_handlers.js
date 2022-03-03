import { resetErrorMsg } from './errors.js';

export const setPaginationHandlers = (handlerCallback, renderCallback) => {
	document.querySelector('#previous-page').onclick = async e => {
		const direction = e.target.parentNode.dataset.direction;
		resetErrorMsg();
		handlerCallback(renderCallback, direction);
	};

	document.querySelector('#next-page').onclick = async e => {
		const direction = e.target.parentNode.dataset.direction;
		resetErrorMsg();
		handlerCallback(renderCallback, direction);
	};
};

export const setSearchHandler = (handlerCallback, renderCallback) => {
	document.querySelector('#main-nav form').onsubmit = async e => {
		const search = e.target.search.value.toLowerCase().trim();
		e.preventDefault();
		resetErrorMsg();
		handlerCallback(renderCallback, search);
	};
};

export const setCloseInfoHandlers = resetInfoCallback => {
	document.querySelector('#pokemon-info').onclick = e => e.stopPropagation();

	document.querySelector('#close-info').onclick = e => resetInfoCallback();

	document.querySelector('body').onclick = e => {
		if (
			e.target !== document.querySelector('#pokemon-info') &&
			!e.target.classList.contains('poke-card') &&
			!document
				.querySelector('#pokemon-info')
				.classList.contains('visually-hidden')
		) {
			resetInfoCallback();
		}
	};
};

export const setRandomPokemonHandler = (handlerCallback, renderCallback) => {
	document.querySelector('#random-pokemon').onclick = async e => {
		resetErrorMsg();
		handlerCallback(renderCallback);
	};
};

export const setMiniatureHandler = (handlerCallback, renderCallback) => {
	document.querySelector('#index').onclick = async e => {
		if (e.target.classList.contains('poke-card')) {
			const clicked = e.target.id;
			resetErrorMsg();
			handlerCallback(renderCallback, clicked);
		}
	};
};

export const setEvolutionHandlers = (handlerCallback, renderCallback) => {
	document.querySelector('#evolves-from').onclick = async e => {
		const clicked = e.target.innerText;
		handlerCallback(renderCallback, clicked);
	};

	document.querySelector('#evolves-to').onclick = async e => {
		const clicked = e.target.innerText;
		handlerCallback(renderCallback, clicked);
	};
};
