import { getElement } from '../utils.js';
import { API_URL } from './pokemon_info.js';
import { handleRequest } from '../cache/requests.js';

export const paginationPrevious = { url: '' };
export const paginationNext = { url: '' };
export const FIRST_PAGE = API_URL + '/pokemon?limit=12';

export const paginatePokemons = async data => {
	paginationPrevious.url = data.previous || FIRST_PAGE;
	paginationNext.url = data.next || FIRST_PAGE;
	const pokemons = data.results;
	for (const index in pokemons) {
		const name = pokemons[index].name;
		const pokemonData = pokemons[index].url;
		const card = getElement('.poke-card', true)[index];
		card.id = name;
		card.children[1].innerText = name;
		card.children[0].alt = name;
		const response = await handleRequest(pokemonData);
		card.children[0].src = response.sprites.front_default;
	}
};
