/**
 * @jest-environment jsdom
 */

import '../index.js';
import { initPokedex } from '../pokedex.js';

jest.mock('../pokedex.js', () => {
	return {
		__esModule: true,
		initPokedex: jest.fn(),
	};
});

test('Initialize pokedex', () => {
	window.addEventListener('DOMContentLoaded', () => {
		expect(initPokedex).toHaveBeenCalled();
	});
});
