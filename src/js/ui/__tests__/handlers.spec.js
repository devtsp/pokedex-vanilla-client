/**
 * @jest-environment jsdom
 */

import { setPokemonHandlers, setPaginationHandlers } from '../handlers.js';
import { body } from './fixtures/document_body.js';

document.body.innerHTML = body;

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
