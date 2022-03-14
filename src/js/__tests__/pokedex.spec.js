/**
 * @jest-environment jsdom
 */

import { initPokedex } from '../pokedex.js';
import { handleCacheVersion } from '../storage/storage.js';
import { setPaginationHandlers, setPokemonHandlers } from '../ui/handlers.js';
import { body } from './fixtures/document_body.js';

document.body.innerHTML = body;

jest.mock('../ui/handlers.js', () => {
	return {
		__esModule: true,
		setPaginationHandlers: jest.fn(() => {}),
		setPokemonHandlers: jest.fn(() => {}),
	};
});

jest.mock('../storage/storage.js', () => {
	return {
		__esModule: true,
		handleCacheVersion: jest.fn(() => {}),
	};
});

test('Pokedex checks cache version and call handler setters', () => {
	initPokedex();
	expect(handleCacheVersion).toHaveBeenCalled();
	expect(setPaginationHandlers).toHaveBeenCalled();
	expect(setPokemonHandlers).toHaveBeenCalled();
});
