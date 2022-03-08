/**
 * @jest-environment jsdom
 */

import '../index.js';
import initPokedex from '../pokedex.js';

jest.mock('../pokedex.js', () => jest.fn());

test('Initialize pokedex', () => {
	document.addEventListener('DOMContentLoaded', () => {
		expect(initPokedex).toHaveBeenCalledTimes(1);
	});
});
