/**
 * @jest-environment jsdom
 */

import { renderPokemon, resetPokemon } from '../render_pokemon.js';

import { index } from '../../__fixtures__/index.js';

document.body.innerHTML = index;

const pikachuObject = {
	'name': 'pikachu',
	'number': 26,
	'type': 'electric',
	'imageUrl': 'https://sample.png',
	'flavorText': 'Test flavor text',
	'abilities': 'static, lighting-rod',
	'habitat': 'forest',
	'shape': 'quadruped',
	'evolvesFrom': 'pichu',
	'evolvesTo': 'raichu',
};

describe('renderPokemon()', () => {
	test('Render pokemon properties to DOM and toggles visibility', () => {
		const pokemon = renderPokemon(pikachuObject);
		expect(pokemon.$pokemonInfo.classList).toEqual(
			expect.not.stringContaining('visually-hidden')
		);
		expect(pokemon.$name.innerText).toBe('pikachu');
		expect(pokemon.$type.innerText).toBe('electric');
		expect(pokemon.$mainPic.src).toBe('https://sample.png/');
		expect(pokemon.$abilities.innerText).toBe('static, lighting-rod');
		expect(pokemon.$flavorText.innerText).toBe('Test flavor text');
		expect(pokemon.$habitat.innerText).toBe('forest');
		expect(pokemon.$shape.innerText).toBe('quadruped');
		expect(pokemon.$evolvesFrom.innerText).toBe('pichu');
		expect(pokemon.$evolvesTo.innerText).toBe('raichu');
	});
	test('Fill undefined fields with "-"', () => {
		const pikachuObjectB = JSON.parse(JSON.stringify(pikachuObject));
		pikachuObjectB.habitat = undefined;
		pikachuObjectB.shape = undefined;
		pikachuObjectB.evolvesFrom = undefined;
		pikachuObjectB.evolvesTo = undefined;
		const pokemonB = renderPokemon(pikachuObjectB);
		expect(pokemonB.$habitat.innerText).toBe('-');
		expect(pokemonB.$shape.innerText).toBe('-');
		expect(pokemonB.$evolvesFrom.innerText).toBe('-');
		expect(pokemonB.$evolvesTo.innerText).toBe('-');
	});

	test('Correct the styling of evolution/prevolution field to be linked when it needs to', () => {
		pikachuObject.evolvesFrom = '-';
		pikachuObject.evolvesTo = '-';
		const pokemon = renderPokemon(pikachuObject);
		expect(pokemon.$evolvesFrom.classList).toEqual(
			expect.not.stringContaining('linked-text')
		);
		expect(pokemon.$evolvesTo.classList).toEqual(
			expect.not.stringContaining('linked-text')
		);
	});
});

describe('resetPokemon()', () => {
	test('Empty all pokemon information and toggles visibility', () => {
		const pokemon = renderPokemon(pikachuObject);
		expect(pokemon.$pokemonInfo.classList.contains('visually-hidden')).toBe(
			false
		);
		expect(pokemon.$name.innerText).toBe('pikachu');
		expect(pokemon.$type.innerText).toBe('electric');
		expect(pokemon.$mainPic.src).toBe('https://sample.png/');
		expect(pokemon.$abilities.innerText).toBe('static, lighting-rod');
		expect(pokemon.$flavorText.innerText).toBe('Test flavor text');
		expect(pokemon.$habitat.innerText).toBe('forest');
		expect(pokemon.$shape.innerText).toBe('quadruped');
		const emptyPokemon = resetPokemon();
		expect(emptyPokemon.$pokemonInfo.classList).toContain('visually-hidden');
		expect(emptyPokemon.$name.innerText).toBe('Pokemon');
		expect(emptyPokemon.$mainPic.src).toBe('http://localhost/');
		expect(emptyPokemon.$abilities.innerText).toBe('-');
		expect(emptyPokemon.$flavorText.innerText).toBe('');
		expect(emptyPokemon.$habitat.innerText).toBe('-');
		expect(emptyPokemon.$shape.innerText).toBe('-');
		expect(emptyPokemon.$evolvesFrom.innerText).toBe('-');
		expect(emptyPokemon.$evolvesTo.innerText).toBe('-');
	});
});
