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

jest.mock('../../storage/storage.js', () => {
	return {
		__esModule: true,
		getPageFromStorage: jest.fn(() => {
			throw new Error();
		}),
		savePageToStorage: jest.fn(),
		getPokemonFromStorage: jest.fn(() => {
			throw new Error();
		}),
		savePokemonToStorage: jest.fn(),
	};
});

jest.mock('../../api/pokeapi.js', () => {
	return {
		__esModule: true,
		fetchPokemon: jest.fn(),
		fetchPokemonSpecie: jest.fn(() => {
			return { evolution_chain: { url: '123' } };
		}),
		fetchEvolutionChain: jest.fn(),
		fetchPage: jest.fn(() => {}),
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

describe('getPokemon()', () => {
	test('Tries to get from storage, then goes to API, calls mapper and saves to storage', () => {
		expect.assertions(6);
		return getPokemon('pikachu').then(x => {
			expect(getPokemonFromStorage).toHaveBeenCalled();
			expect(fetchPokemon).toHaveBeenCalled();
			expect(fetchPokemonSpecie).toHaveBeenCalled();
			expect(fetchEvolutionChain).toHaveBeenCalled();
			expect(mapPokemon).toHaveBeenCalled();
			expect(savePokemonToStorage).toHaveBeenCalled();
		});
	});
});

describe('getPage()', () => {
	test('Tries to get from storage, then goes to API, calls mapper and saves to storage', () => {
		expect.assertions(4);
		return getPage('2', '10').then(x => {
			expect(getPageFromStorage).toHaveBeenCalled();
			expect(fetchPage).toHaveBeenCalled();
			expect(mapPage).toHaveBeenCalled();
			expect(savePageToStorage).toHaveBeenCalled();
		});
	});
});
