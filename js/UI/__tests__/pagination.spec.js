import {
	paginatePokemons,
	paginationPrevious,
	paginationNext,
} from '../pagination';
import { getSprites } from '../get_Sprites';
import { secondPageApiResponse } from './fixtures/secondPageAPIResponse.fixture';
import { body } from './fixtures/DOM.fixture';
import { handleRequest } from '../../cache/requests';

jest.mock('../get_Sprites', () => {
	const mockReturn = [
		{
			'name': 'weedle',
			'sprite':
				'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/13.png',
		},
		{
			'name': 'kakuna',
			'sprite':
				'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/14.png',
		},
		{
			'name': 'beedrill',
			'sprite':
				'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/15.png',
		},
		{
			'name': 'pidgey',
			'sprite':
				'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png',
		},
		{
			'name': 'pidgeotto',
			'sprite':
				'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/17.png',
		},
		{
			'name': 'pidgeot',
			'sprite':
				'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/18.png',
		},
		{
			'name': 'rattata',
			'sprite':
				'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png',
		},
		{
			'name': 'raticate',
			'sprite':
				'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/20.png',
		},
		{
			'name': 'spearow',
			'sprite':
				'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/21.png',
		},
		{
			'name': 'fearow',
			'sprite':
				'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/22.png',
		},
		{
			'name': 'ekans',
			'sprite':
				'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/23.png',
		},
		{
			'name': 'arbok',
			'sprite':
				'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/24.png',
		},
	];
	return mockReturn;
});

describe('paginatePokemons', () => {
	test('sets the previous and next page', () => {
		expect(paginationPrevious.url).toBe('');
		expect(paginationNext.url).toBe('');
		paginatePokemons(secondPageApiResponse).then(f => {
			expect(paginationPrevious).toBe(
				'https://pokeapi.co/api/v2/pokemon?limit=12'
			);
			expect(paginationNext).toInclude('offset=24');
		});
		// document.body.innerHTML = body;
	});
});
