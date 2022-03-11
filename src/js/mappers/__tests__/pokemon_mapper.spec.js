import { mapPokemon } from '../pokemon_mapper.js';
import { mapPage } from '../page_mapper.js';
import { pikachu_info } from './fixtures/pikachu_info';
import { pikachu_specie } from './fixtures/pikachu_specie';
import { pikachu_evolution_chain } from './fixtures/pikachu_evolution_chain';
import { page_3 } from './fixtures/page_3.js';
describe('mapPokemon()', () => {
	const pikachuMapped = {
		name: 'pikachu',
		number: 26,
		type: 'electric',
		abilities: 'static, lightning-rod',
		imageUrl:
			'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
		flavorText:
			'When several of these POKéMON gather, their electricity could build and cause lightning storms.',
		habitat: 'forest',
		shape: 'quadruped',
		evolvesFrom: 'pichu',
		evolvesTo: 'raichu',
	};

	const info = JSON.parse(pikachu_info);
	const specie = JSON.parse(pikachu_specie.replace(/[\n\f]/g, ' '));
	const evolution_chain = JSON.parse(pikachu_evolution_chain);
	test('Selects necessary fields through helpers and instanciates a Pokemon', () => {
		const pokemon = mapPokemon(info, specie, evolution_chain);
		expect(pokemon).toEqual(pikachuMapped);
	});
});

describe('mapPage()', () => {
	const pageResponse = JSON.parse(page_3);

	const pageMapped = {
		'pageIndexes': { 'previous': 1, 'actual': 2, 'next': 3 },
		'pokemonNames': [
			'machoke',
			'machamp',
			'bellsprout',
			'weepinbell',
			'victreebel',
			'tentacool',
			'tentacruel',
			'geodude',
			'graveler',
			'golem',
			'ponyta',
			'rapidash',
			'slowpoke',
			'slowbro',
			'magnemite',
			'magneton',
			'farfetchd',
			'doduo',
			'dodrio',
			'seel',
			'dewgong',
			'grimer',
			'muk',
			'shellder',
			'cloyster',
			'gastly',
			'haunter',
			'gengar',
			'onix',
			'drowzee',
			'hypno',
			'krabby',
			'kingler',
		],
	};
	test('Selects necessary fields and instanciates a Page', () => {
		const page = mapPage(2, pageResponse);
		expect(page).toEqual(pageMapped);
	});
});
