import {
	getMainInfo,
	getSpecieDetails,
	getEvolutionDetails,
	Pokemon,
} from '../pokemon_info';
import {
	info,
	specie,
	evolutionChain,
} from '../ui/__tests__/fixtures/pokemon_info.fixture';

describe('getMainInfo()', () => {
	test('returns name, type, abilities and pic', () => {
		const { name, type, abilities, imgUrl } = getMainInfo(info);
		expect(name).toBe('pikachu');
		expect(type).toBe('electric');
		expect(abilities).toBe('static, lightning-rod');
		expect(imgUrl).toBe(
			'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png'
		);
	});
});

describe('getSpecieDetails()', () => {
	test('returns falvor text, habitat and shape', () => {
		const { flavorText, habitat, shape } = getSpecieDetails(specie);
		expect(flavorText).toBe(
			'When several of these POKéMON gather, their electricity could build and cause lightning storms.'
		);
		expect(habitat).toBe('forest');
		expect(shape).toBe('quadruped');
	});
});

describe('getEvolutionDetails()', () => {
	test('returns previous and next evolutions', () => {
		const { evolvesFrom, evolvesTo } = getEvolutionDetails(
			'pikachu',
			evolutionChain
		);
		expect(evolvesFrom).toBe('pichu');
		expect(evolvesTo).toBe('raichu');
		const pokeB = getEvolutionDetails('pichu', evolutionChain);
		expect(pokeB.evolvesFrom).toBe(undefined);
		expect(pokeB.evolvesTo).toBe('pikachu');
		const pokeC = getEvolutionDetails('raichu', evolutionChain);
		expect(pokeC.evolvesFrom).toBe('pikachu');
		expect(pokeC.evolvesTo).toBe(undefined);
	});
});

describe('class Pokemon()', () => {
	test('returns al gathered info in a single pokemon object', () => {
		const mainInfo = getMainInfo(info);
		const specieDetails = getSpecieDetails(specie);
		const evolutionDetails = getEvolutionDetails('pikachu', evolutionChain);
		const pokemon = new Pokemon(mainInfo, specieDetails, evolutionDetails);
		expect(pokemon.name).toBe('pikachu');
		expect(pokemon.type).toBe('electric');
		expect(pokemon.imageUrl).toBe(
			'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png'
		);
		expect(pokemon.abilities).toBe('static, lightning-rod');
		expect(pokemon.flavorText).toBe(
			'When several of these POKéMON gather, their electricity could build and cause lightning storms.'
		);
		expect(pokemon.habitat).toBe('forest');
		expect(pokemon.shape).toBe('quadruped');
		expect(pokemon.evolvesFrom).toBe('pichu');
		expect(pokemon.evolvesTo).toBe('raichu');
	});
});
