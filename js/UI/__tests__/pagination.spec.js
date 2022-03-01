/**
 * @jest-environment jsdom
 */

import {
	paginationPrevious,
	paginationNext,
	setAllCards,
	setPaginationState,
	FIRST_PAGE,
} from '../pagination';
import { secondPageApiResponse } from './fixtures/secondPageAPIResponse.fixture';
import { body } from './fixtures/DOM.fixture';
import { pokemonsArray } from './fixtures/pokemonsArray.fixture';

describe('setPaginationState', () => {
	test('sets the previous and next page', () => {
		expect(paginationPrevious.url).toBe('');
		expect(paginationNext.url).toBe('');
		setPaginationState(secondPageApiResponse);
		expect(paginationPrevious.url).toBe(
			'https://pokeapi.co/api/v2/pokemon?offset=0&limit=12'
		);
		expect(paginationNext.url).toContain('offset=24');
	});
	test('fallback to first page if previous or next page are null or undefined', () => {
		setPaginationState({ next: null, previous: undefined });
		expect(paginationPrevious.url).toBe(FIRST_PAGE);
		expect(paginationNext.url).toBe(FIRST_PAGE);
	});
});

describe('setAllCards', () => {
	test('set cards with proper name and sprite into the DOM', () => {
		document.body.innerHTML = body;
		const $cards = setAllCards(pokemonsArray);
		document.querySelectorAll('.poke-card').forEach(($card, i) => {
			expect($card.id).toBe(pokemonsArray[i].name);
			expect($card.children[1].innerText).toBe(pokemonsArray[i].name);
			expect($card.children[0].src).toBe(pokemonsArray[i].sprite);
		});
	});
});
