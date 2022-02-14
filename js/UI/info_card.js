import { querySelector } from '../utils.js';

const $pokemonInfo = querySelector('#pokemon-info');
const $name = querySelector('#name');
const $type = querySelector('#type');
const $mainPic = querySelector('#main-pic');
const $abilities = querySelector('#abilities');
const $flavorText = querySelector('#flavor-text');
const $habitat = querySelector('#habitat');
const $shape = querySelector('#shape');
const $evolvesFrom = querySelector('#evolves-from');
const $evolvesTo = querySelector('#evolves-to');

/* istanbul ignore next */
export const setInfoCard = info => {
	$pokemonInfo.classList.remove('visually-hidden');
	$name.innerText = info.name;
	$type.innerText = info.type;
	$mainPic.src = info.imageUrl;
	$mainPic.alt = info.name;
	$abilities.innerText = info.abilities;
	$flavorText.innerText = info.flavorText;
	$habitat.innerText = info.habitat;
	$shape.innerText = info.shape;
	$evolvesFrom.innerText = info.evolvesFrom;
	$evolvesTo.innerText = info.evolvesTo;

	$evolvesFrom.innerText == '-'
		? $evolvesFrom.classList.remove('linked-text')
		: $evolvesFrom.classList.add('linked-text');
	$evolvesTo.innerText == '-'
		? $evolvesTo.classList.remove('linked-text')
		: $evolvesTo.classList.add('linked-text');
	return $pokemonInfo;
};

export const resetInfoCard = () => {
	$pokemonInfo.classList.add('visually-hidden');
	$name.innerText = 'Pokemon';
	$type.innertText = 'tpye';
	$mainPic.src = '';
	$mainPic.alt = '';
	$abilities.innerText = '-';
	$flavorText.innerText = '';
	$habitat.innerText = '-';
	$shape.innerText = '-';
	$evolvesFrom.innerText = '-';
	$evolvesTo.innerText = '-';
	return $pokemonInfo;
};
