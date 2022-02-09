import { checkCacheVersion } from './cache_version.js';
import { getElement, getRandomPokemonIndex } from './utils.js';
import {
	paginatePokemons,
	setInfoCard,
	resetInfoCard,
	setInitialCards,
} from './dom.js';
import { handleRequest } from './requests.js';
import { paginationNext, paginationPrevious } from './dom.js';
import { handleError, resetErrorMsg } from './errors.js';

const initApp = () => {
	checkCacheVersion();
	setInitialCards();
	getElement('#previous-page').onclick = e => {
		resetErrorMsg();
		handleRequest(paginationPrevious.url)
			.then(data => paginatePokemons(data))
			.catch(err => handleError(err));
	};
	getElement('#next-page').onclick = e => {
		resetErrorMsg();
		handleRequest(paginationNext.url)
			.then(data => paginatePokemons(data))
			.catch(err => handleError(err));
	};
	getElement('#main-nav form').onsubmit = e => {
		e.preventDefault();
		resetErrorMsg();
		resetInfoCard();
		const search = e.target.search.value.toLowerCase().trim();
		setInfoCard(search);
	};
	getElement('#random-pokemon').onclick = e => {
		resetErrorMsg();
		setInfoCard(getRandomPokemonIndex());
	};
	getElement('#index').onclick = e => {
		if (e.target.classList.contains('poke-card')) {
			resetErrorMsg();
			setInfoCard(e.target.id);
		}
	};
	getElement('#pokemon-info').onclick = e => e.stopPropagation();
	getElement('#close-info').onclick = e => resetInfoCard();
	getElement('#evolves-from').onclick = e => setInfoCard(e.target.innerText);
	getElement('#evolves-to').onclick = e => setInfoCard(e.target.innerText);
	getElement('body').onclick = e => {
		if (
			e.target !== getElement('#pokemon-info') &&
			!e.target.classList.contains('poke-card') &&
			!getElement('#pokemon-info').classList.contains('visually-hidden')
		) {
			resetInfoCard();
		}
	};
};

window.addEventListener('DOMContentLoaded', () => {
	initApp();
});
