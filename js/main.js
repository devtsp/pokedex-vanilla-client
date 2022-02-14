import { querySelector, getRandomPokemonIndex } from './utils.js';
import { checkCacheVersion } from './cache/cache_version.js';
import { handleRequest } from './cache/requests.js';
import { setInfoCard, resetInfoCard } from './UI/info_card.js';
import { fetchPokemonInfo, setPokemonObject } from './UI/pokemon_info.js';
import { resetErrorMsg } from './UI/errors.js';
import {
	FIRST_PAGE,
	paginationNext,
	paginationPrevious,
	setPaginationState,
	getSprites,
	setAllCards,
} from './UI/pagination.js';

const setInitialCards = async () => {
	const paginationObject = await handleRequest(FIRST_PAGE);
	setPaginationState(paginationObject);
	const cardsArray = await getSprites(paginationObject);
	setAllCards(cardsArray);
};

const initApp = () => {
	checkCacheVersion();

	setInitialCards();

	querySelector('#previous-page').onclick = async e => {
		resetErrorMsg();
		const paginationObject = await handleRequest(paginationPrevious.url);
		setPaginationState(paginationObject);
		const cardsArray = await getSprites(paginationObject);
		setAllCards(cardsArray);
	};

	querySelector('#next-page').onclick = async e => {
		resetErrorMsg();
		const paginationObject = await handleRequest(paginationNext.url);
		setPaginationState(paginationObject);
		const cardsArray = await getSprites(paginationObject);
		setAllCards(cardsArray);
	};

	querySelector('#main-nav form').onsubmit = async e => {
		const search = e.target.search.value.toLowerCase().trim();
		e.preventDefault();
		resetErrorMsg();
		resetInfoCard();
		const infoObject = await fetchPokemonInfo(search);
		setInfoCard(setPokemonObject(infoObject));
	};

	querySelector('#random-pokemon').onclick = async e => {
		const randomPokemon = getRandomPokemonIndex();
		resetErrorMsg();
		const infoObject = await fetchPokemonInfo(randomPokemon);
		setInfoCard(setPokemonObject(infoObject));
	};

	querySelector('#index').onclick = async e => {
		if (e.target.classList.contains('poke-card')) {
			const clicked = e.target.id;
			resetErrorMsg();
			const infoObject = await fetchPokemonInfo(clicked);
			setInfoCard(setPokemonObject(infoObject));
		}
	};

	querySelector('#evolves-from').onclick = async e => {
		const clicked = e.target.innerText;
		const infoObject = await fetchPokemonInfo(clicked);
		setInfoCard(setPokemonObject(infoObject));
	};

	querySelector('#evolves-to').onclick = async e => {
		const clicked = e.target.innerText;
		const infoObject = await fetchPokemonInfo(clicked);
		setInfoCard(setPokemonObject(infoObject));
	};

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

window.addEventListener('DOMContentLoaded', () => {
	initApp();
});
