import { getElement, getRandomPokemonIndex } from './utils.js';
import { checkCacheVersion } from './cache/cache_version.js';
import { handleRequest } from './cache/requests.js';
import { setInfoCard, resetInfoCard } from './UI/info_card.js';
import { getPokemonInfo } from './UI/pokemon_info.js';
import { resetErrorMsg } from './UI/errors.js';
import {
	FIRST_PAGE,
	paginationNext,
	paginationPrevious,
	paginatePokemons,
} from './UI/pagination.js';

const setInitialCards = async () => {
	const firstPage = await handleRequest(FIRST_PAGE);
	paginatePokemons(firstPage);
};

const initApp = () => {
	checkCacheVersion();

	setInitialCards();

	getElement('#previous-page').onclick = e => {
		resetErrorMsg();
		handleRequest(paginationPrevious.url).then(data => paginatePokemons(data));
	};

	getElement('#next-page').onclick = e => {
		resetErrorMsg();
		handleRequest(paginationNext.url).then(data => paginatePokemons(data));
	};

	getElement('#main-nav form').onsubmit = async e => {
		const search = e.target.search.value.toLowerCase().trim();
		e.preventDefault();
		resetErrorMsg();
		resetInfoCard();
		const pokemonInfo = await getPokemonInfo(search);
		setInfoCard(pokemonInfo);
	};

	getElement('#random-pokemon').onclick = async e => {
		const randomPokemon = getRandomPokemonIndex();
		resetErrorMsg();
		const pokemonInfo = await getPokemonInfo(randomPokemon);
		setInfoCard(pokemonInfo);
	};

	getElement('#index').onclick = async e => {
		if (e.target.classList.contains('poke-card')) {
			const clicked = e.target.id;
			resetErrorMsg();
			const pokemonInfo = await getPokemonInfo(clicked);
			setInfoCard(pokemonInfo);
		}
	};

	getElement('#evolves-from').onclick = async e => {
		const clicked = e.target.innerText;
		const pokemonInfo = await getPokemonInfo(clicked);
		setInfoCard(pokemonInfo);
	};

	getElement('#evolves-to').onclick = async e => {
		const clicked = e.target.innerText;
		const pokemonInfo = await getPokemonInfo(clicked);
		setInfoCard(pokemonInfo);
	};

	getElement('#pokemon-info').onclick = e => e.stopPropagation();
	getElement('#close-info').onclick = e => resetInfoCard();
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
