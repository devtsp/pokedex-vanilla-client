/**
 * @jest-environment jsdom
 */

import { body } from './fixtures/DOM.fixture';
import { setInfoCard, resetInfoCard } from '../info_card';

const pikachuObject = {
	'name': 'pikachu',
	'type': 'electric',
	'imageUrl': 'https://google.com',
	'flavorText': 'Test flavor text',
	'habitat': 'forest',
	'abilities': 'static, lighting-rod',
	'shape': 'quadruped',
	'evolvesFrom': 'pichu',
	'evolvesTo': 'raichu',
};

document.body.innerHTML = body;

const $pokemonInfo = document.querySelector('#pokemon-info');
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
		setInfoCard(pikachuObject);
		expect($pokemonInfo.classList).toEqual(
			expect.not.stringContaining('visually-hidden')
		);
		expect($name.innerText).toBe('pikachu');
		expect($type.innerText).toBe('electric');
		expect($mainPic.src).toBe('https://google.com/');
		expect($abilities.innerText).toBe('static, lighting-rod');
		expect($flavorText.innerText).toBe('Test flavor text');
		expect($habitat.innerText).toBe('forest');
		expect($shape.innerText).toBe('quadruped');
		expect($evolvesFrom.innerText).toBe('pichu');
		expect($evolvesTo.innerText).toBe('raichu');
	});
});

describe('resetInfoCard', () => {
	test('correctly displays contents of info object to the DOM', () => {
		resetInfoCard();
		expect($pokemonInfo.classList).toContain('visually-hidden');
		expect($name.innerText).toBe('Pokemon');
		// expect($type.innerText).toBe('type');
		expect($mainPic.src).toBe('http://localhost/');
		expect($abilities.innerText).toBe('-');
		expect($flavorText.innerText).toBe('');
		expect($habitat.innerText).toBe('-');
		expect($shape.innerText).toBe('-');
		expect($evolvesFrom.innerText).toBe('-');
		expect($evolvesTo.innerText).toBe('-');
	});
});
