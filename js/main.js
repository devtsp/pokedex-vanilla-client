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
	paginatePokemons,
} from './UI/pagination.js';

const setInitialCards = () => {
	handleRequest(FIRST_PAGE).then(firstPage => paginatePokemons(firstPage));
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

	querySelector('#main-nav form').onsubmit = e => {
		const search = e.target.search.value.toLowerCase().trim();
		e.preventDefault();
		resetErrorMsg();
		resetInfoCard();
		fetchPokemonInfo(search)
			.then(fetched => setPokemonObject(fetched))
			.then(info => setInfoCard(info));
	};

	querySelector('#random-pokemon').onclick = e => {
		const randomPokemon = getRandomPokemonIndex();
		resetErrorMsg();
		fetchPokemonInfo(randomPokemon)
			.then(fetched => setPokemonObject(fetched))
			.then(info => setInfoCard(info));
	};

	querySelector('#index').onclick = e => {
		if (e.target.classList.contains('poke-card')) {
			const clicked = e.target.id;
			resetErrorMsg();
			fetchPokemonInfo(clicked)
				.then(fetched => setPokemonObject(fetched))
				.then(info => setInfoCard(info));
		}
	};

	querySelector('#evolves-from').onclick = e => {
		const clicked = e.target.innerText;
		fetchPokemonInfo(clicked)
			.then(fetched => setPokemonObject(fetched))
			.then(info => setInfoCard(info));
	};

	querySelector('#evolves-to').onclick = e => {
		const clicked = e.target.innerText;
		fetchPokemonInfo(clicked)
			.then(fetched => setPokemonObject(fetched))
			.then(info => setInfoCard(info));
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
