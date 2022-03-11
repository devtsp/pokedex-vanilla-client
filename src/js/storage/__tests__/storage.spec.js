/*
 *  @jest-environment jsdom
 */

import {
	handleCacheVersion,
	savePageToStorage,
	getPageFromStorage,
	savePokemonToStorage,
	getPokemonFromStorage,
} from '../storage.js';

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

describe('handleCacheVersion()', () => {
	beforeAll(() => {
		Object.defineProperty(window, 'localStorage', {
			value: fakeLocalStorage,
		});
	});
	test('Creates new pokedex-cache object with timestamp if missing on page first load', () => {
		expect(localStorage.store).not.toHaveProperty('pokedex-cache');
		handleCacheVersion();
		expect(localStorage.store).toHaveProperty('pokedex-cache');
	});
	test('If cache is fresh (< 24hs passed) the storage is not modified', () => {
		handleCacheVersion();
		const cacheStamp = localStorage.getItem('pokedex-cache');
		handleCacheVersion();
		expect(localStorage.getItem('pokedex-cache')).toEqual(cacheStamp);
	});
	test('If cache is outdated (24hs have passed), a new cache is created and the older one deleted', () => {
		localStorage.setItem(
			'pokedex-cache',
			JSON.stringify({ version: 100, pokemons: [], pages: [] })
		);
		const cacheStamp = localStorage.getItem('pokedex-cache');
		handleCacheVersion();
		expect(localStorage.getItem('pokedex-cache')).not.toEqual(cacheStamp);
	});
});

describe('Pokemon storage', () => {
	handleCacheVersion();
	test('savePokemonToStorage()', () => {
		const saved = savePokemonToStorage({ name: 123 });
		expect(saved).toEqual({ name: 123 });
	});
	test('getPokemonFromStorage()', () => {
		const got = getPokemonFromStorage('123');
		expect(got).toEqual({ name: 123 });
	});
});

describe('Page storage', () => {
	handleCacheVersion();
	test('savePageToStorage()', () => {
		const saved = savePageToStorage({ pageIndexes: { actual: 3 } });
		expect(saved).toEqual({ pageIndexes: { actual: 3 } });
	});
	test('getPageFromStorage()', () => {
		const got = getPageFromStorage('3');
		expect(got).toEqual({ pageIndexes: { actual: 3 } });
	});
});
