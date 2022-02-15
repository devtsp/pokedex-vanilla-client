/**
 * @jest-environment jsdom
 */

import { body } from './fixtures/DOM.fixture';
import { setInfoCard } from '../info_card';

const pikachuObject = {
	'name': 'pikachu',
	'type': 'electric',
	'imageUrl':
		'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
	'flavorText':
		'This forest-dwelling Pokémon stores electricity\nin its cheeks, so you’ll feel a tingly shock\nif you touch it.',
	'abilities': 'static, lightning-rod',
	'habitat': 'forest',
	'shape': 'quadruped',
	'evolvesFrom': 'pichu',
	'evolvesTo': 'raichu',
};

document.body.innerHTML = body;

// const $pokemonInfo = document.querySelector('#pokemon-info');
const $name = document.querySelector('#name');
const $type = document.querySelector('#type');
const $mainPic = document.querySelector('#main-pic');
const $abilities = document.querySelector('#abilities');
const $flavorText = document.querySelector('#flavor-text');
const $habitat = document.querySelector('#habitat');
const $shape = document.querySelector('#shape');
const $evolvesFrom = document.querySelector('#evolves-from');
const $evolvesTo = document.querySelector('#evolves-to');

describe('setInfoCard', () => {
	test('correctly displays contents of info object to the DOM', () => {
		console.log($name.classList);
		setInfoCard(pikachuObject);
	});
});
