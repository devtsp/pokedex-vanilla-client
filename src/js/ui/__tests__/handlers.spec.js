/**
 * @jest-environment jsdom
 */

import { setPokemonHandlers, setPaginationHandlers } from '../handlers.js';
import { initPokedex } from '../../pokedex';
import { body } from './fixtures/document_body.js';
import { page0 } from './fixtures/page0.js';
import { page1 } from './fixtures/page1.js';
import { page25 } from './fixtures/page25.js';
import { pokemons } from './fixtures/pokemons';
import * as services from '../../services/pokedex_service';

document.body.innerHTML = body;

const fakeLocalStorage = (function () {
	let store = {
		'pokedex-cache': JSON.stringify({
			version: Date.now(),
			pages: [JSON.parse(page0), JSON.parse(page1), JSON.parse(page25)],
			pokemons: JSON.parse(pokemons),
		}),
	};
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

Object.defineProperty(window, 'localStorage', {
	value: fakeLocalStorage,
});

const delayQuery = (selector, delay) =>
	new Promise(res =>
		setTimeout(() => res(document.querySelector(selector)), delay)
	);

describe('setPaginationHandlers()', () => {
	test('Set all necesary event handlers to page navigation controls', () => {
		expect(document.querySelector('#previous-page').onclick).toBeNull();
		expect(document.querySelector('#next-page').onclick).toBeNull();
		const { $previousButton, $nextButton } = setPaginationHandlers();
		expect($previousButton.onclick).not.toBeNull();
		expect($nextButton.onclick).not.toBeNull();
	});
});

describe('setPokemonHandlers()', () => {
	test('Set all necesary event handlers to display pokemon info', () => {
		expect(document.querySelector('#main-nav form').onsubmit).toBeNull();
		expect(document.querySelector('#random-pokemon'.onclick)).toBeNull();
		expect(document.querySelector('#index'.onclick)).toBeNull();
		expect(document.querySelector('#evolves-from'.onclick)).toBeNull();
		expect(document.querySelector('#evolves-to'.onclick)).toBeNull();
		expect(document.querySelector('#close-info'.onclick)).toBeNull();
		const {
			$searchForm,
			$randomButton,
			$index,
			$evolvesFromButton,
			$evolvesToButton,
			$closeButton,
		} = setPokemonHandlers();
		expect($searchForm.onsubmit).not.toBeNull();
		expect($randomButton.onclick).not.toBeNull();
		expect($index.onclick).not.toBeNull();
		expect($evolvesFromButton.onclick).not.toBeNull();
		expect($evolvesToButton.onclick).not.toBeNull();
		expect($closeButton.onclick).not.toBeNull();
	});
});

describe('Pagination buttons', () => {
	test('Next-page button', async () => {
		await initPokedex();
		document.querySelector('#next-page i').click();
		const $pagination = await delayQuery('#pagination', 2000);
		expect($pagination.dataset.page).toBe('1');
	});

	test('Previous-page button', async () => {
		await initPokedex();
		document.querySelector('#previous-page i').click();
		const $pagination = await delayQuery('#pagination', 2000);
		expect($pagination.dataset.page).toBe('25');
	});
});

describe('Search form', () => {
	test('On submit', async () => {
		await initPokedex();
		document.querySelector('#main-nav form').search = { value: 'pikachu' };
		document.querySelector('#main-nav form').submit();
		const $pokemonName = await delayQuery('#name', 3000);
		expect($pokemonName.innerText).toBe('pikachu');
	});
});

describe('Index name', () => {
	test('On click', async () => {
		await initPokedex();
		document.querySelectorAll('.poke-card')[25].click();
		const name = await delayQuery('#name', 3000);
		expect(name.innerText).toBe('raichu');
	});
});

describe('Random button', () => {
	test('On click', async () => {
		await initPokedex();
		const getPokemonSpy = jest.spyOn(services, 'getPokemon');
		document.querySelector('#random-pokemon').click();
		expect(getPokemonSpy).toHaveBeenCalled();
	});
});

describe('Pokemon Info', () => {
	test('Close info', async () => {
		await initPokedex();
		document.querySelector('#pokemon-info').classList.remove('visually-hidden');
		expect(
			document
				.querySelector('#pokemon-info')
				.classList.contains('visually-hidden')
		).toBe(false);
		document.querySelector('#close-info').click();
		expect(
			document
				.querySelector('#pokemon-info')
				.classList.contains('visually-hidden')
		).toBe(true);
	});
	test('Go to preevolution', async () => {
		await initPokedex();
		document.querySelectorAll('.poke-card')[25].click();
		const name = await delayQuery('#name', 2000);
		expect(name.innerText).toBe('raichu');
		document.querySelector('#evolves-from').click();
		const nameB = await delayQuery('#name', 2000);
		expect(nameB.innerText).toBe('pikachu');
	});
	test('Go to evolution', async () => {
		await initPokedex();
		document.querySelectorAll('.poke-card')[24].click();
		const name = await delayQuery('#name', 2000);
		expect(name.innerText).toBe('pikachu');
		document.querySelector('#evolves-to').click();
		const nameB = await delayQuery('#name', 2000);
		expect(nameB.innerText).toBe('raichu');
	});
});
