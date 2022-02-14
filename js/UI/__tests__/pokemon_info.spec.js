import { setPokemonObject } from '../pokemon_info';
import { info, specie, evolutionChain } from './fixtures/pokemon_info.fixture';

const allInfo = { info, specie, evolutionChain };

describe('setPokemonInfo', () => {
	test('returns proper pokemon object with specific info', () => {
		const { name, type, abilities, habitat, shape, evolvesFrom, evolvesTo } =
			setPokemonObject(allInfo);
		expect(name).toBe('pikachu');
		expect(type).toBe('electric');
		expect(abilities).toBe('static, lightning-rod');
		expect(habitat).toBe('forest');
		expect(shape).toBe('quadruped');
		expect(evolvesFrom).toBe('pichu');
		expect(evolvesTo).toBe('raichu');
	});
	test('returns "-" for empty fields  in pokemon info object', () => {
		const allInfoEmpty = { ...allInfo };
		allInfoEmpty.info.name = null;
		allInfoEmpty.info.types[0].type.name = null;
		allInfoEmpty.info.sprites.other['official-artwork'].front_default = null;
		allInfoEmpty.specie.habitat = null;
		allInfoEmpty.specie.shape.name = null;
		allInfoEmpty.specie.evolves_from_species.name = null;
		allInfoEmpty.evolutionChain.evolvesTo = null;
		const { name, type, imageUrl, habitat, shape, evolvesTo, evolvesFrom } =
			setPokemonObject(allInfoEmpty);
		expect(name).toBe('-');
		expect(type).toBe('-');
		expect(imageUrl).toBe('-');
		expect(habitat).toBe('-');
		expect(shape).toBe('-');
		expect(evolvesTo).toBe('-');
		expect(evolvesFrom).toBe('-');
	});
});
