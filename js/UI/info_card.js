import { querySelector } from '../utils.js';

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

export const setInfoCard = info => {
	const elements = getElements();

	elements.$pokemonInfo.classList.remove('visually-hidden');
	elements.$name.innerText = info.name;
	elements.$type.innerText = info.type;
	elements.$mainPic.src = info.imageUrl;
	elements.$mainPic.alt = info.name;
	elements.$flavorText.innerText = info.flavorText;
	elements.$abilities.innerText = info.abilities;
	elements.$evolvesFrom.innerText = info.evolvesFrom;
	elements.$evolvesTo.innerText = info.evolvesTo;
	elements.$habitat.innerText = info.habitat;
	elements.$shape.innerText = info.shape;

	elements.$evolvesFrom.innerText == '-'
		? elements.$evolvesFrom.classList.remove('linked-text')
		: elements.$evolvesFrom.classList.add('linked-text');
	elements.$evolvesTo.innerText == '-'
		? elements.$evolvesTo.classList.remove('linked-text')
		: elements.$evolvesTo.classList.add('linked-text');

	return elements;
};

export const resetInfoCard = () => {
	const elements = getElements();

	elements.$pokemonInfo.classList.add('visually-hidden');
	elements.$name.innerText = 'Pokemon';
	elements.$type.innertText = '';
	elements.$mainPic.src = '';
	elements.$mainPic.alt = '';
	elements.$flavorText.innerText = '';
	elements.$abilities.innerText = '-';
	elements.$evolvesFrom.innerText = '-';
	elements.$evolvesTo.innerText = '-';
	elements.$habitat.innerText = '-';
	elements.$shape.innerText = '-';

	return elements;
};
