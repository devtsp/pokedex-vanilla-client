/*
 *  @jest-environment jsdom
 */

import { getPokemon, getPage } from '../pokedex_service.js';
import {
	getPokemonFromStorage,
	savePokemonToStorage,
	getPageFromStorage,
	savePageToStorage,
} from '../../storage/storage.js';

import {
	fetchPokemon,
	fetchPokemonSpecie,
	fetchEvolutionChain,
	fetchPage,
} from '../../api/pokeapi.js';

import { mapPokemon } from '../../mappers/pokemon_mapper.js';
import { mapPage } from '../../mappers/page_mapper.js';

// jest.mock('../../storage/storage.js', () => {
// 	return {
// 		__esModule: true,
// 		getPageFromStorage: jest.fn(),
// 		savePageToStorage: jest.fn(),
// 		// getPokemonFromStorage: jest.fn(),
// 		savePokemonToStorage: jest.fn(),
// 	};
// });

jest.mock('../../api/pokeapi.js', () => {
	return {
		__esModule: true,
		fetchPokemon: jest.fn(),
		fetchPokemonSpecie: jest.fn(() => {
			return { evolution_chain: { url: 'test' } };
		}),
		fetchEvolutionChain: jest.fn(),
		fetchPage: jest.fn(),
	};
});

jest.mock('../../mappers/pokemon_mapper.js', () => {
	return {
		__esModule: true,
		mapPokemon: jest.fn(),
	};
});

jest.mock('../../mappers/page_mapper.js', () => {
	return {
		__esModule: true,
		mapPage: jest.fn(),
	};
});

const fakeLocalStorage = (function () {
	let store = {};

	return {
		getItem(key) {
			return store[key] || null;
		},
		setItem(key, value) {
			store[key] = value;
		},
		removeItem(key) {
			delete store[key];
		},
		store,
	};
})();

describe('getPokemon()', () => {
	beforeEach(() => {
		Object.defineProperty(window, 'localStorage', {
			value: fakeLocalStorage,
		});
	});
	test('Tries to get from storage, then goes to API, calls mapper and saves to storage', () => {
		getPokemon('pikachu');
		expect(fetchPokemon).toHaveBeenCalled();
		expect(fetchPokemonSpecie).toHaveBeenCalled();
		expect(fetchEvolutionChain).toHaveBeenCalled();
		expect(mapPokemon).toHaveBeenCalled();
	});
});
