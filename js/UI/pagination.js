import { querySelector } from '../utils.js';
import { API_URL } from './pokemon_info.js';
import { handleRequest } from '../cache/requests.js';

export const paginationPrevious = { url: '' };
export const paginationNext = { url: '' };
export const FIRST_PAGE = API_URL + '/pokemon?limit=12';

const getSprites = async paginationObject => {
	return await Promise.all(
		paginationObject.results.map(async pokemon => {
			const info = await handleRequest(pokemon.url);
			const sprite = info.sprites.front_default;
			return { name: pokemon.name, sprite };
		})
	);
};

const setAllCards = pokemons => {
	const $cards = querySelector('.poke-card', 'all');
	$cards.forEach(($card, index) => {
		$card.id = pokemons[index].name;
		$card.children[1].innerText = pokemons[index].name;
		$card.children[0].src = pokemons[index].sprite;
		$card.children[0].alt = pokemons[index].sprite;
	});
	return $cards;
};

const setPaginationState = paginationObject => {
	paginationPrevious.url = paginationObject.previous || FIRST_PAGE;
	paginationNext.url = paginationObject.next || FIRST_PAGE;
	return [paginationNext, paginationPrevious];
};

export const paginatePokemons = paginationObject => {
	setPaginationState(paginationObject);
	getSprites(paginationObject).then(cardsArray => setAllCards(cardsArray));
};
