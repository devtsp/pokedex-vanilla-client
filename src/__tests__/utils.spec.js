/**
 * @jest-environment jsdom
 */

import * as utils from '../utils';

describe('getRandomPokemonIndex', () => {
	test('getRandomPokemonIndex should get a proper random number between 1-898 each time', () => {
		const ret = utils.getRandomPokemonIndex();
		expect(ret).toBeGreaterThan(0);
		expect(ret).toBeLessThan(899);
		expect(ret).toBeLessThanOrEqual(898);
	});
});

describe('UI', () => {
	document.body.innerHTML = `<div id="outter">
      <div class="inner"></div> 
      <div class="inner"></div> 
    </div>`;

	test('querySelector should return the correct DOM single element when second parameter undefined', () => {
		const ret = utils.querySelector('#outter');
		expect(ret.tagName).toBe('DIV');
	});
	test('querySelector should return nodeList when second parameter == "all"', () => {
		const retAll = utils.querySelector('.inner', 'all');
		expect(retAll.length).toBe(2);
	});
	test('querySelector should function as a single query if second parameter is other than "all"', () => {
		const retAllError = utils.querySelector('div', 'error');
		expect(retAllError.tagName).toBe('DIV');
	});
});
