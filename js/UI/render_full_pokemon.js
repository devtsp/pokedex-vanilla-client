import { querySelector } from './utils.js';

const getElements = () => {
	return {
		$pokemonInfo: querySelector('#pokemon-info'),
		$name: querySelector('#name'),
		$type: querySelector('#type'),
		$mainPic: querySelector('#main-pic'),
		$flavorText: querySelector('#flavor-text'),
		$abilities: querySelector('#abilities'),
		$evolvesFrom: querySelector('#evolves-from'),
		$evolvesTo: querySelector('#evolves-to'),
		$habitat: querySelector('#habitat'),
		$shape: querySelector('#shape'),
	};
};

export const renderFullPokemon = pokemon => {
	const elements = getElements();

	elements.$pokemonInfo.classList.remove('visually-hidden');
	elements.$name.innerText = pokemon.name;
	elements.$type.innerText = pokemon.type;
	elements.$mainPic.src = pokemon.imageUrl;
	elements.$mainPic.alt = pokemon.name;
	elements.$flavorText.innerText = pokemon.flavorText;
	elements.$abilities.innerText = pokemon.abilities;
	elements.$evolvesFrom.innerText = pokemon.evolvesFrom;
	elements.$evolvesTo.innerText = pokemon.evolvesTo;
	elements.$habitat.innerText = pokemon.habitat;
	elements.$shape.innerText = pokemon.shape;

	for (let key in elements) {
		const $el = elements[key];
		if ($el.innerText == 'undefined' || !$el.innerText) {
			$el.innerText = '-';
		}
	}

	elements.$evolvesFrom.innerText == '-'
		? elements.$evolvesFrom.classList.remove('linked-text')
		: elements.$evolvesFrom.classList.add('linked-text');
	elements.$evolvesTo.innerText == '-'
		? elements.$evolvesTo.classList.remove('linked-text')
		: elements.$evolvesTo.classList.add('linked-text');

	return elements;
};
