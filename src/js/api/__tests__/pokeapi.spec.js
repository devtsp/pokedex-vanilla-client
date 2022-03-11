import {
	fetchPokemon,
	fetchPokemonSpecie,
	fetchEvolutionChain,
	fetchPage,
} from '../pokeapi';

const API_URL = 'https://pokeapi.co/api/v2/';

global.fetch = jest.fn(
	() =>
		new Promise(res => res({ ok: true, json: () => new Promise(r => r({})) }))
);

describe('Pokemon requests', () => {
	test('fetchPokemon()', () => {
		expect.assertions(1);
		return fetchPokemon('pikachu').then(pikachuInfo => {
			expect(global.fetch).toHaveBeenCalledWith(API_URL + 'pokemon/pikachu');
		});
	});

	test('fetchPokemonSpecie()', () => {
		expect.assertions(1);
		return fetchPokemonSpecie('pikachu').then(pikachuSpecie => {
			expect(global.fetch).toHaveBeenCalledWith(
				API_URL + 'pokemon-species/pikachu'
			);
		});
	});

	test('fetchEvolutionChain()', () => {
		expect.assertions(1);
		return fetchEvolutionChain('test').then(pikachuEvolution => {
			expect(global.fetch).toHaveBeenCalledWith('test');
		});
	});
	describe('Page request', () => {
		test('fetchPage() builds and fetch proper URL', () => {
			expect.assertions(1);
			return fetchPage(1, 5).then(response => {
				expect(global.fetch).toHaveBeenCalledWith(
					API_URL + 'pokemon?offset=5&limit=5'
				);
			});
		});
	});

	test('Error is thrown when api response is not ok passing 404 as err message', () => {
		global.fetch = jest.fn(
			() => new Promise(res => res({ ok: false, status: 404 }))
		);
		expect.assertions(1);
		return fetchPokemon('test').catch(err => {
			expect(err.toString()).toEqual('Error: 404');
		});
	});
});
