/**
 * @jest-environment jsdom
 */

import '../index.js';
jest.mock('../pokedex.js', () => jest.fn());

test('Initialize pokedex', () => {
	document.addEventListener('DOMContentLoaded', () => {
		expect(initPokedex).toHaveBeenCalledTimes(1);
	});
});
