/*
 *  @jest-environment jsdom
 */

import { handleCacheVersion } from '../cache_version';

const fakeLocalStorage = (function () {
	let store = {};

	return {
		getItem(key) {
			return store[key] || null;
		},
		setItem(key, value) {
			store[key] = value.toString();
		},
		removeItem(key) {
			delete store[key];
		},
		clear() {
			store = {};
		},
		store,
	};
})();

const fakeCache = (function () {
	let caches = {};
	return {
		delete(key) {
			delete caches[key];
		},
	};
})();

let storageGlobal;

describe('ceckCacheVersion()', () => {
	beforeAll(() => {
		Object.defineProperty(window, 'localStorage', {
			value: fakeLocalStorage,
		});
		Object.defineProperty(window, 'caches', {
			value: fakeCache,
		});
	});
	test('sets cache version with a timestamp on local storage when it is missing', () => {
		expect(localStorage.store).toEqual({});
		storageGlobal = handleCacheVersion(localStorage);
		expect(storageGlobal.store).toHaveProperty('pokedex-cache-version');
	});
	test('if the cache stills fresh (less than a day has passed) the local storage keeps the version reference as it is', () => {
		const storagePartial = handleCacheVersion(storageGlobal);
		expect(storagePartial.store).toEqual(storageGlobal.store);
	});
	test('if the cache is outdated (24hs have passed), the reference in storage is updated with the newer timestamp', () => {
		storageGlobal.setItem('pokedex-cache-version', 100);
		const oldVersion = JSON.stringify(storageGlobal.store);
		const storagePartial = handleCacheVersion(storageGlobal);
		const newVersion = JSON.stringify(storagePartial.store);
		expect(oldVersion).not.toEqual(newVersion);
	});
});
