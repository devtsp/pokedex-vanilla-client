import { querySelector } from '../UI/utils.js';

export const setAllCards = pokemons => {
	const $cards = querySelector('.poke-card', 'all');
	$cards.forEach(($card, index) => {
		$card.id = pokemons[index].name;
		$card.children[1].innerText = pokemons[index].name;
		$card.children[0].src = pokemons[index].sprite;
		$card.children[0].alt = pokemons[index].sprite;
	});
	return $cards;
};
