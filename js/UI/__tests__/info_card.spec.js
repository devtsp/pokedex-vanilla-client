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
const elements = setInfoCard(pikachuObject);

describe('setInfoCard()', () => {
	test('displays contents of info object to the DOM', () => {
		expect(elements.$pokemonInfo.classList).toEqual(
			expect.not.stringContaining('visually-hidden')
		);
		expect(elements.$name.innerText).toBe('pikachu');
		expect(elements.$type.innerText).toBe('electric');
		expect(elements.$mainPic.src).toBe('https://google.com/');
		expect(elements.$abilities.innerText).toBe('static, lighting-rod');
		expect(elements.$flavorText.innerText).toBe('Test flavor text');
		expect(elements.$habitat.innerText).toBe('forest');
		expect(elements.$shape.innerText).toBe('quadruped');
		expect(elements.$evolvesFrom.innerText).toBe('pichu');
		expect(elements.$evolvesTo.innerText).toBe('raichu');
	});
	test('corrects undefined fields to be "-"', () => {
		const pikachuObjectB = JSON.parse(JSON.stringify(pikachuObject));
		pikachuObjectB.habitat = undefined;
		pikachuObjectB.shape = undefined;
		pikachuObjectB.evolvesFrom = undefined;
		pikachuObjectB.evolvesTo = undefined;
		const elementsB = setInfoCard(pikachuObjectB);
		expect(elementsB.$habitat.innerText).toBe('-');
		expect(elementsB.$shape.innerText).toBe('-');
		expect(elementsB.$evolvesFrom.innerText).toBe('-');
		expect(elementsB.$evolvesTo.innerText).toBe('-');
	});

	test('changes the class of evolution/prevolution field to be linked or not', () => {
		pikachuObject.evolvesFrom = '-';
		pikachuObject.evolvesTo = '-';
		const elements = setInfoCard(pikachuObject);
		expect(elements.$evolvesFrom.classList).toEqual(
			expect.not.stringContaining('linked-text')
		);
		expect(elements.$evolvesTo.classList).toEqual(
			expect.not.stringContaining('linked-text')
		);
	});
});

describe('resetInfoCard()', () => {
	test("reset contents of DOM's pokemon info card", () => {
		resetInfoCard();
		expect(elements.$pokemonInfo.classList).toContain('visually-hidden');
		expect(elements.$name.innerText).toBe('Pokemon');
		expect(elements.$mainPic.src).toBe('http://localhost/');
		expect(elements.$abilities.innerText).toBe('-');
		expect(elements.$flavorText.innerText).toBe('');
		expect(elements.$habitat.innerText).toBe('-');
		expect(elements.$shape.innerText).toBe('-');
		expect(elements.$evolvesFrom.innerText).toBe('-');
		expect(elements.$evolvesTo.innerText).toBe('-');
	});
});
