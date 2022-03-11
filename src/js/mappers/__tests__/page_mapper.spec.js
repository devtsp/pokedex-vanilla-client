import { mapPage } from '../page_mapper.js';
import { page_3 } from './fixtures/page_3.js';

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

describe('mapPage()', () => {
	test('Selects necessary fields and instanciates a Page', () => {
		const page = mapPage(2, pageResponse);
		expect(page).toEqual(pageMapped);
	});
});
