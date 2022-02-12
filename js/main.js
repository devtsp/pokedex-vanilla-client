import { querySelector, getRandomPokemonIndex } from './utils.js';
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

	querySelector('#previous-page').onclick = e => {
		resetErrorMsg();
		handleRequest(paginationPrevious.url).then(data => paginatePokemons(data));
	};

	querySelector('#next-page').onclick = e => {
		resetErrorMsg();
		handleRequest(paginationNext.url).then(data => paginatePokemons(data));
	};

	querySelector('#main-nav form').onsubmit = async e => {
		const search = e.target.search.value.toLowerCase().trim();
		e.preventDefault();
		resetErrorMsg();
		resetInfoCard();
		const pokemonInfo = await getPokemonInfo(search);
		setInfoCard(pokemonInfo);
	};

	querySelector('#random-pokemon').onclick = async e => {
		const randomPokemon = getRandomPokemonIndex();
		resetErrorMsg();
		const pokemonInfo = await getPokemonInfo(randomPokemon);
		setInfoCard(pokemonInfo);
	};

	querySelector('#index').onclick = async e => {
		if (e.target.classList.contains('poke-card')) {
			const clicked = e.target.id;
			resetErrorMsg();
			const pokemonInfo = await getPokemonInfo(clicked);
			setInfoCard(pokemonInfo);
		}
	};

	querySelector('#evolves-from').onclick = async e => {
		const clicked = e.target.innerText;
		const pokemonInfo = await getPokemonInfo(clicked);
		setInfoCard(pokemonInfo);
	};

	querySelector('#evolves-to').onclick = async e => {
		const clicked = e.target.innerText;
		const pokemonInfo = await getPokemonInfo(clicked);
		setInfoCard(pokemonInfo);
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
