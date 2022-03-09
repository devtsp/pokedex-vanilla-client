/**
 * @jest-environment jsdom
 */

import { renderPage } from '../render_page.js';
import { page0 } from '../../__fixtures__/page0.js';
import { page3 } from '../../__fixtures__/page3.js';
import { index } from '../../__fixtures__/index.js';

document.body.innerHTML = index;

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
