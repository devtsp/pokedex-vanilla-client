/**
 * @jest-environment jsdom
 */

import { renderPage } from '../render_page.js';
import { page3 } from './fixtures/page3.js';
import { body } from './fixtures/document_body.js';

document.body.innerHTML = body;

const page3parsed = JSON.parse(page3);
describe('renderPage()', () => {
	test('Set previous, actual and next page indexes to the corresponding DOM elements and display all pokemon names to the DOM ', () => {
		const { $paginationElements, $pokemonElements } = renderPage(page3parsed);
		expect($paginationElements.$previousElement.dataset.page).toBe('2');
		expect($paginationElements.$actualElement.dataset.page).toBe('3');
		expect($paginationElements.$nextElement.dataset.page).toBe('4');
		$pokemonElements.forEach(($pokemon, i) => {
			expect($pokemon.children[0].innerText).toBe(page3parsed.pokemonNames[i]);
		});
	});
});
