/**
 * @jest-environment jsdom
 */

import { paginatePokemons } from '../pagination';
import { secondPage } from './fixtures/pagination.fixture';

describe('paginatePokemons', () => {
	test('sets the previous and nex page', () => {
		document.body.innerHTML = `
<div class="poke-card">
  <img class="img-fluid" />
  <span>Pokemon</span>w
</div>
<div class="poke-card">
  <img class="img-fluid" />
  <span>Pokemon</span>
</div>
`;
		expect(true).toBe(true);
		const { previousPage, nextPage } = paginatePokemons(secondPage);
		expect(previousPage.url).toBe('https://pokeapi.co/api/v2/pokemon?limit=12');
		expect(nextPage.url).toContain('offset=24');
	});
});
