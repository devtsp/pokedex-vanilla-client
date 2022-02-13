import { querySelector } from '../utils.js';
import { API_URL } from './pokemon_info.js';
import { handleRequest } from '../cache/requests.js';

export const paginationPrevious = { url: '' };
export const paginationNext = { url: '' };
export const FIRST_PAGE = API_URL + '/pokemon?limit=12';

export const paginatePokemons = data => {
	paginationPrevious.url = data.previous || FIRST_PAGE;
	paginationNext.url = data.next || FIRST_PAGE;
	const pokemons = data.results;
	const $cards = querySelector('.poke-card', 'all');
	for (const index in pokemons) {
		const name = pokemons[index].name;
		const pokemonData = pokemons[index].url;
		const $card = $cards[index];
		$card.id = name;
		$card.children[1].innerText = name;
		$card.children[0].alt = name;
		handleRequest(pokemonData).then(
			response => ($card.children[0].src = response.sprites.front_default)
		);
	}
	return {
		cards: $cards,
		nextPage: paginationNext,
		previousPage: paginationPrevious,
	};
};
